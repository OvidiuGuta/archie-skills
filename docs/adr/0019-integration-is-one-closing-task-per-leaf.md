# Integration is one closing Task per leaf

Supersedes the integration-ownership half of [0010](0010-implementing-is-one-build-one-review-one-fix.md): the two layers are still unit and integration, still cut at the Spec's seam, but they are no longer both written inside every Task.

A Task is a tracer bullet, so 0010 gave each one a seam test as `/archie-tdd`'s outer loop. On a leaf whose Tasks are a CRUD surface, the create Task's seam test has nothing to tear down with until the delete Task lands, so it either leaks rows into the next run or asserts less than its story does — and the engineer has no way to tell which, because the rest of the leaf does not exist yet. Every Task paying for a seam test also made the per-Task build the most expensive step in the pipeline, for coverage the leaf would have to revisit anyway.

## The deferral

`/archie-to-tasks` writes an `Integration:` line on every Task. Ordinary Tasks read `deferred to #N`; the leaf ends on a **closing Task**, blocked by every other Task, reading `this Task`.

That line is a switch two skills read. `/archie-tdd` skips its outer loop and runs unit-only — its existing "no seam, no outer loop" escape widened by one case, so nothing about that skill's shape moves. `/archie-implement` routes: `/archie-verify` for the closing Task, `/archie-tdd` for the rest.

Standalone at lite and medium there is no task file and so no line, and `/archie-tdd` runs the double loop exactly as before. The flows below full are untouched.

## `/archie-verify` is a skill, not a mode

The closing Task arrives at a feature that is already built, so its tests pass on the first run and there is no red driving anything. That is verification, not TDD, and [0012](0012-a-skill-states-only-its-own-discipline.md) says a skill states one discipline — folding "write the test after the code" into the skill whose first rule is the opposite would put two opposed disciplines under one name.

Nor does it live inside `/archie-implement`, which holds no testing discipline of its own and borrows one even when it builds inline. Epic mode runs every Task through a sub-agent, and a sub-agent loads a discipline by name: prose inside the orchestrator's own file could only be run in the orchestrator's context — the dirtiest in the pipeline, and the last place to judge whether a leaf holds — or hand-copied into a prompt, which is the copy [0011](0011-each-skill-is-authored-self-contained.md) makes you maintain by hand.

`/archie-verify` covers each user story with a new test, several, an edit to an existing one, or nothing where one already covers it, and proves each test it writes can fail. A red test is then a **bug** (built and wrong — fixed inline, the red test standing in for the outer loop) or a **gap** (never built — reported, never built here, because a feature landing with no Task has no criteria and no review).

Naming stays **integration** and **seam** throughout. What integration means in a given repo — a service-level suite, or Playwright through a browser — is the user's to fix in `STANDARDS.md`, which every engineer skill already reads.

## Consequences

- **Optionality needed no mechanism.** `/archie-design` can already mark a heading not-applicable with a reason, so a leaf with no seam gets no closing Task and no `Integration:` lines, and a repo with no integration harness opts out by saying so once.
- **The deferral is proposed, not imposed.** The closing Task goes to the user at `/archie-to-tasks`' breakdown checkpoint beside granularity and edges. Declined, it and the `Integration:` lines go with it and `/archie-tdd` writes a seam test per Task as before — the deferral is worth its cost on a leaf whose Tasks cannot test themselves in isolation, and the user is the one who can see that from the breakdown.
- **A Task's tracer bullet is no longer proven end to end when it lands.** Until the leaf closes, a Task is held up by unit tests and the hand walkthrough. That is the price of the lean build, and it is why the per-Task walkthrough survives rather than collapsing into one walk per leaf.
- **A gap halts the epic run.** It names behaviour with no Task to build it against, so `/archie-implement` reports it and names `/archie-to-tasks` for a re-slice.
- **The closing Task is identified by role, not position.** Task numbers are identity and are never reused, so a re-slice adds new Tasks to the closing Task's `Blocked by` and renumbers nothing.
