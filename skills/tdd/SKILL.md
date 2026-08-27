---
name: tdd
description: Building one Task test-first in a double loop — one failing integration test at the spec's seam, then unit tests driving each unit the Task modifies — and running the repo's gates. The engineer step of /implement's ready-for-agent pipeline.
---

# TDD

Two loops. The **outer loop** is one integration test at the Spec's seam, red before any implementation exists, and it stays red until the Task's outcome actually works. The **inner loop** is red-green-refactor over each unit the Task modifies, inside that outer red.

The loops are the order of work, not a description of it: a test written after the code it covers passes on the first run, which proves nothing about whether it would have caught the bug.

Read [`../reference/templates/design.md`](../reference/templates/design.md) first: it fixes what the design file you are handed contains. The whole-app journey test is `/qa`'s, not yours.

## 1. Inherit

You are handed a Task reference (`3.2#1`) or its path, and its design. Read, before writing anything:

- The **task file** — its demoable outcome and acceptance criteria are what the outer loop asserts.
- The **`design.md`** beside it — the modules, the seam, the units to pin and the sequence. You build what it designed; it is not an input to reconsider.
- The leaf's **`spec.md`** — the seam, and the Implementation Decisions the design routes to.
- The **test prior art** named in the [facts section](../reference/agents-facts.md), and the code the Task lands in. New tests match the house style rather than importing yours.

Done when you can state the outcome, the seam, and every unit the design says to pin.

## 2. Outer loop: go red at the seam

Write **one** integration test at the Spec's seam, derived from the Task's acceptance criteria, and run it. One test, at the seam the Spec fixed — not a suite, and not at a seam you find more convenient.

Run it and read the failure. Red for the right reason means it fails because the behaviour is missing, not because a path is wrong or a fixture is unwired. A test that errors before it reaches its assertion has not established anything yet.

Done when you have seen it fail, and the failure names the missing behaviour.

## 3. Inner loop: drive each unit

Work the design's sequence. For every unit the Task **modifies** — a service, a controller, a component — take it red-green-refactor with its dependencies mocked, so the test pins that unit and nothing behind it.

**Touches means modified, not merely read.** A unit this Task only calls is already someone else's covered ground; pulling it in metastasises the suite and slows every run after this one.

Assert **behaviour at the unit's boundary**: what it returns, what it emits, what it calls on its collaborators. A test that would break when a symbol is renamed or a helper is extracted is testing implementation, and `/code-review` rejects it.

Done when every unit the design lists as modified has a passing test asserting its boundary behaviour, and the refactor step has been taken rather than skipped.

## 4. Go green

Take the outer loop green. It is the honest signal that the Task's outcome works end to end at the seam, so it passes on real wiring, never on a widened mock or a weakened assertion.

Done when the outer test and every inner test pass together in one run.

## 5. Run the gates

Run the lint, typecheck, test and build commands recorded in the [facts section](../reference/agents-facts.md), exactly as written there. Green tests with a red typecheck is a broken Task.

The facts section is maintained by whoever finds it wrong:

- A command that **no longer exists or has changed** — find the real one in the repo's scripts and config, run that, and rewrite the fact.
- A gate recorded as **`unknown`** — say so in the report and leave it unrun. A guessed `npm test` that passes because the repo has no tests is worse than a stated gap. When the answer comes back, run it and write it into the facts section.

Done when every known gate has been run to a result, and any fact you found wrong has been corrected in `AGENTS.md`.

## 6. Report

```md
_Built:_ {Task reference} — {Task title}
{What you built, in two or three lines: the seam the outer test attaches at, and the units pinned.}
{Gate results, one line each, naming the command and its result.}
```

A failing or unrun gate is reported as exactly that. The orchestrator decides what happens next, and it can only do that on what actually ran — reporting a run as successful over a red gate spends the rest of the pipeline on code that does not build.
