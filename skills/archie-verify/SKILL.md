---
name: archie-verify
description: Proving a leaf Epic holds at its seam — the integration tests its Tasks deferred, written once the feature exists, bugs fixed inline and gaps reported rather than built. The closing Task in a sliced leaf, reached by /archie-implement.
---

# Verify

Every Task in this leaf built its units and deferred integration to here. The Spec is a **claim** about what now works; the seam is where that claim gets tested.

This is test-after by design, which is what the deferral bought: a CRUD leaf can seed and tear down through its own delete, where a test written at Task two had nothing to clean up with.

You add tests at one seam; behaviour that is missing is a Task's work, not yours.

## 1. Inherit

**Handed a Task reference (`3.2#1`) or its path**, everything resolves from it: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, and `#1` is `tasks/01-<slug>.md` inside it.

Read the leaf's **`spec.md`** in full — its `User Stories` are the claim you test, and its `Testing Decisions` name the seam and the prior art your tests match. Read every **task file** beside it for the acceptance criteria each Task landed. Then read the repo's existing tests at that seam: they are both the house style and, often, coverage you are about to duplicate.

Read **`STANDARDS.md`** — or whichever coding-standards file `AGENTS.md` links, in a repo Archie did not set up. Its rules bind every line you write, including what "integration test" means in this repo, and they are the same rules `/archie-review` grades this change against. A repo with neither has no standards.

**No seam** — the Spec marked it not-applicable, or there is no integration harness — and this Task should not exist. Say so and stop.

Done when you hold the claim, the seam, and the tests already sitting on it.

## 2. Cover the claim at the seam

Walk the user stories. For each, the honest answer is one of four: a new test, several, an edit to an existing one, or nothing because a test already covers it. Write what the gap needs and no more — a story already covered is covered.

A test written after the code it covers passes on the first run, which proves nothing about whether it would have caught the bug. So every test you write **proves it can fail**: flip its expected value, watch it go red, flip it back.

Tests pass on real wiring, never on a widened mock or an assertion weakened to fit what the code does.

Done when every user story is either covered by a test at the seam or named in step 5 as something no test reaches.

## 3. Fix bugs, report gaps

A red test is one of two things, and telling them apart is the whole judgement here:

- **A bug** — the behaviour was built and is wrong. Fix it: the red test is your outer loop, and each unit you modify getting there takes a unit test asserting its boundary behaviour, so the fix is covered rather than merely applied.
- **A gap** — the behaviour was never built, because a Task missed a story. Leave the code alone and carry it to step 5 as a finding. Building it here means a feature landing with no Task, no criteria and no review, which is the run this Task exists to catch.

Done when every red test is green or named as a gap.

## 4. Run the gates

Find the repo's lint, typecheck, test and build commands — `AGENTS.md`, the package manifest, the CI config — and run each exactly as the repo defines it. A gate the repo genuinely does not have is reported as absent and left unrun.

## 5. Report

```md
_Verified:_ {the leaf reference and title}
{Two or three lines: the seam, what you added or edited there, and what you found.}

_No test reaches:_
- {story or criterion} — {why the seam cannot reach it}

_Gaps:_
- {story} — {the behaviour that was never built}

_Gates:_
- {command} — {result}
```

The first list becomes the user's walkthrough, so a story your tests do not reach belongs there rather than quietly in neither. An empty list is written as empty: "nothing was missing" is a result.
