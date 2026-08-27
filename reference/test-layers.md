# The three test layers

Three layers, two owners. Which layer a test belongs to, and who writes it, is fixed by the framework rather than decided per Task. The rationale is ADR 0006, in Archie's own repo.

| Layer | Scope | Owner |
| --- | --- | --- |
| **Unit** | one service, controller or component in isolation, dependencies mocked | `/archie-tdd` |
| **Integration** | the API surface, or a smart component such as one section of a screen, cut at the Spec's seam | `/archie-tdd` |
| **E2E** | the whole app through the front door, driven by a real browser | `/archie-qa` |

## What each layer covers

**Unit.** Every unit the Task *touched*, where touched means modified rather than merely read. Pulling in a unit the Task only read metastasises the suite. A unit test asserts behaviour at its unit's boundary: what it returns, what it emits, what it calls on its collaborators. Apply the **rename test** — a test that would break when a symbol is renamed or a helper extracted was testing implementation, not behaviour, and it is rejected. Assertions on private state, call counts of internal helpers, or snapshots of internal shape fail the same way.

**Integration.** Cut at the Spec's **seams**, which span all of a leaf's Tasks and are therefore at altitude for the leaf: they are settled HITL in the Spec, with the user confirming them. Prefer an existing seam, take the highest seam possible, and use as few as possible. A test parked at a lower or more convenient seam — a helper, an internal function, a place that was simply easier to wire — is a finding even when it passes. Once baked in, a seam is expensive to move, and Implementing is AFK.

**E2E.** Exactly **one journey test per Task**, walking the Task's demoable outcome front to back and asserting the criteria on that path. A second is added only when the Task genuinely has two distinct user paths, which is usually a sign it should have been two Tasks. E2E needs no seam decision because its entry point is fixed by definition, so nothing about it is at altitude for a Spec. What varies is the harness and where its specs live, which is a per-repo fact in the [facts section](agents-facts.md).

A `ready-for-human` Task gets no E2E. There is no behaviour to drive, only state to verify.

## What the layers fix elsewhere

- **Task sizing is checkable.** A Task is one end-to-end demoable outcome, proven by one E2E test. Two demoable outcomes means split the Task.
- **`/archie-tdd` runs double-loop**: one failing integration test at the Spec's seam, derived from the acceptance criteria, then unit tests driving each unit the Task modifies, inside that outer red.
- **The Spec's seam is a constraint on the design**, not an input to reconsider. A design that cannot hit it is a planning defect, surfaced to the user under the same triage rule review and QA findings use.
- **`unknown` blocks E2E rather than being guessed at.** No run command, seed data or test credentials means the affected criteria come back unverified.
