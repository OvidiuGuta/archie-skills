---
name: archie-tdd
description: Building one Task test-first in a double loop — one failing integration test at the spec's seam, then unit tests driving each unit the Task modifies — and running the repo's gates. The engineer step of /archie-implement.
---

# TDD

Two loops. The **outer loop** is one integration test at the Spec's seam, red before any implementation exists, and it stays red until the Task's outcome actually works. The **inner loop** is red-green-refactor over each unit the Task modifies, inside that outer red.

The loops are the order of work, not a description of it: a test written after the code it covers passes on the first run, which proves nothing about whether it would have caught the bug.

You own **two layers**, unit and integration. The whole-app walk is the user's, by hand, from a test plan built off your report — which is why step 6 says which criteria your tests already cover.

## 1. Inherit

You are handed a Task reference (`3.2#1`) or its path. Everything resolves from it: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, and `#1` is `tasks/01-<slug>.md` inside it. The **task file**'s demoable outcome and acceptance criteria are what the outer loop asserts; the leaf's **`spec.md`** beside it carries the seam and the Implementation Decisions this Task routes to. Read both before writing anything.

**Handed review findings as well, you are the fix round.** The tests and the code already exist, so the loops narrow to each finding: go red on the behaviour the finding names, fix it, and take the suite green again. Steps 5 and 6 run in full — the gates are exactly what a fix can break — and step 2's one-integration-test rule already holds, so a finding about a missing or misplaced one is fixed by moving or writing that test rather than adding a second.

Then read the code the Task lands in, and the tests nearest it. New tests match the house style around them rather than importing yours.

## 2. Outer loop: go red at the seam

Write **one** integration test at the Spec's seam, derived from the Task's acceptance criteria, and run it. One test, at the seam the Spec fixed — not a suite, and not at a seam you find more convenient. Once baked in, a seam is expensive to move.

Read the failure. **Red for the right reason** means it fails because the behaviour is missing, not because a path is wrong or a fixture is unwired: a test that errors before it reaches its assertion has established nothing.

Done when you have seen it fail, and the failure names the missing behaviour.

## 3. Inner loop: drive each unit

For every unit this Task **modifies** — a service, a controller, a component — take it red-green-refactor with its dependencies mocked, so the test covers that unit and nothing behind it.

**Touches means modified, not merely read.** A unit this Task only calls is already someone else's covered ground; pulling it in metastasises the suite and slows every run after this one.

Assert **behaviour at the unit's boundary**: what it returns, what it emits, what it calls on its collaborators. Then apply the **rename test** — a test that would break when a symbol is renamed or a helper extracted was testing implementation; rewrite it against the boundary. Assertions on private state, call counts of internal helpers, and snapshots of internal shape fail the same way.

Done when every unit this Task modified has a passing test asserting its boundary behaviour, and the refactor step has been taken rather than skipped.

## 4. Go green

Take the outer loop green. It is the honest signal that the Task's outcome works end to end at the seam, so it passes on real wiring, never on a widened mock or a weakened assertion.

## 5. Run the gates

Find the repo's lint, typecheck, test and build commands — `AGENTS.md`, the package manifest, the CI config — and run each exactly as the repo defines it. Green tests with a red typecheck is a broken Task.

A gate the repo genuinely does not have is reported as absent and left unrun. A guessed `npm test` that passes because the repo has no tests is worse than a stated gap.

## 6. Report

```md
_Built:_ {Task reference} — {Task title}
{What you built, in two or three lines: the seam the outer test sits at, and the units covered.}

_Criteria covered by tests:_
- {criterion} — {the test that covers it}
_Criteria no test covers:_
- {criterion} — {why the tests cannot reach it}

_Gates:_
- {command} — {result}
```

The two criteria lists become the user's manual test plan, so a criterion your tests do not reach belongs in the second list rather than quietly in neither.

A failing or unrun gate is reported as exactly that. The orchestrator decides what happens next on what actually ran, and a run reported as successful over a red gate spends the rest of the pipeline on code that does not build.
