# Implementing splits into a build phase and a review phase

Amends [0010](0010-implementing-is-one-build-one-review-one-fix.md): the pipeline it fixed — build → review → one fix round inside one run — is unbundled. Its two-contract rule, the test rules duplication, and the `/archie-assist` split all survive.

`/archie-implement` reviewed every Task the moment it was built, so review context was spent per Task and the user had no say in when it ran. Review is now its own phase, `/archie-review` (renaming `/archie-code-review`), run on a whole branch in its own session — mirroring the normal software cycle, where a PR is reviewed once, not per commit.

## Phase 3: `/archie-implement`, two modes

A Task reference runs **task mode**: `/archie-tdd` inline, gates, a criteria check against the diff, then `ready-for-review` and a dirty stop — the user tests from the working tree and completion (`done` + commit) is offered, not taken.

An Epic reference (a leaf) runs **epic mode**, the autonomous loop 0005 deferred: per Task an engineer sub-agent dispatched through the sub-agent tool runs `/archie-tdd`, the orchestrator stays read-only, verifies the criteria itself, writes `done` and commits. **One fix round per Task**; a second failure halts the run — a round the fix could not settle means the Spec is the problem, and the user's read is the faster way out. The run halts up front on `main`, since branching is the user's job, and ends by stamping the leaf `ready-for-review` and offering a PR.

This amends 0005's consequence that the pipeline never writes `done`: in epic mode the criteria check plus green gates is the completion authority per Task, and the user's checkpoint moves to the epic level, where it matters.

## Phase 4: `/archie-review`

Input is a PR, the current branch against `main`, or an Epic — the Epic adds the contracts and turns the Spec axis on; without one the Spec axis is skipped, stated. The two-axis parallel sub-agent shape from 0010 is kept, but each axis now reads its whole discipline — brief, and for Standards the test rules and smell baseline — from its own briefing file under the skill's `references/`, handed over by path rather than pasted, since sub-agents can read files and the orchestrator never applies those rules itself. And each axis now ends on a **grade** — 🟢 mergeable / 🟠 mergeable with reservations / 🔴 needs work, overall the worse of the two — and the report is the grade header plus only the findings needing a fix, one severity-ordered list with axis tags. What passed is silence: the grade carries it.

**No fix round inside the review.** Accepted findings become **one new Task** in the epic, picked up by the next `/archie-implement` session — implement and review loop until 🟢. Without an epic there is nowhere to write the Task, so the user chooses: fix now (an `/archie-tdd` sub-agent briefed with the findings, judged read-only and re-graded), comment on the PR, or something else.

## Consequences

- **The walkthrough replaces the test plan.** Both implement modes end on one summary paragraph and the uncovered criteria as steps through the running app; covered criteria stay out, since the suite says so. Reports across both phases shrink to what the user acts on.
- **`/archie-review` is user-only.** Nothing dispatches it — it is the fifth door a human opens. *(The flag mechanics are superseded by [0017](0017-user-only-skills-gate-by-description-not-flag.md): it no longer carries `disable-model-invocation` — a guard sentence in the description reserves it.)*
- **The marketplace grows a third phase group**, `archie-reviewing`, requiring Implementing for `/archie-tdd`.
- **An Epic carries one status.** `Status: ready-for-review` on the leaf's `epic.md`, written only by epic mode's last move — the exception to 0003's statuses-on-Tasks-only, accepted because the review session starts from it.
