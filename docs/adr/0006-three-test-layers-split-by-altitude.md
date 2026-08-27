# Tests come in three layers, and ownership splits by altitude

The test pyramid has three layers with two owners.

- **Unit** — each service, controller or component in isolation with dependencies mocked. Covers everything a single task touched ("touches" meaning modified, not merely read), so it is below altitude and belongs to the engineer. Written by `/archie-tdd`.
- **Integration** — the API surface, or a smart component such as one section of a screen. Cut at the Spec's **seams**, which span all of a leaf's tasks, so the seams are at altitude for the leaf and are decided HITL in the Spec with the user confirming them. The tests themselves are written by `/archie-tdd`.
- **E2E** — the whole app through the front door, driven by a real browser. Owned by `/archie-qa`. Exactly **one journey test per task**, walking the task's demoable outcome front to back and asserting the criteria on that path. A second is added only when the task genuinely has two distinct user paths, which is usually a sign it should have been two tasks.

`/archie-to-spec` keeps mattpocock's seam guidance: prefer existing seams, use the highest seam possible, use as few as possible. That is the last human checkpoint before a seam is baked in, which matters because phase 3 is AFK and testability cannot be retrofitted cheaply.

`/archie-tdd` runs **double-loop**: one failing integration test at the spec's seam derived from the task's acceptance criteria, then unit tests driving each unit the task modifies.

E2E needs no seam decision, because its entry point is fixed by definition: the whole app, from the outside. So nothing about it is at altitude for a Spec. What does vary is the harness and where those tests live, which is a per-repo fact and lives in the `AGENTS.md` facts section alongside the command to run the app.

This makes the sizing rule for a task concrete: **a task is one end-to-end demoable outcome, proven by one E2E test.** Two demoable outcomes means split the task. That is checkable in a way "fits in one context window" is not.

## Consequences

- `/archie-software-architecture` receives the spec's seams as a **constraint**, not as an input to reconsider. A design that cannot hit the spec's seam is a planning defect and surfaces to the user under the same triage rule as review and QA findings. One rule, three places.
- A unit test must assert behaviour at its unit's boundary. One that breaks on a rename or an extracted helper was testing implementation, and `/archie-code-review` rejects it.
- `/archie-qa` cannot run at all without the app's run command, seed data and test credentials, so an `unknown` in the facts section blocks E2E rather than being guessed at.
- `/archie-qa` reports three distinct outcomes per criterion: **pinned** in the journey test, **verified but not pinned** (exercised by hand this run, nothing guarding it), and **unverified** (nothing observable to check). The middle one must be visible in the summary, because it is where regressions come from and it is invisible in a green suite.
- A `ready-for-human` task gets no E2E. There is no behaviour to drive, only state to verify.
