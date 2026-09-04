---
name: archie-review
description: Grading a PR, the current branch, or an Epic for mergeability on two axes — Spec and Standards — and turning accepted findings into the next fix Task. The review phase, run after /archie-implement. Only for explicit user invocation — never fire it on your own.
---

# Review

One change graded for mergeability, in two parallel axis sub-agents:

- **Spec** — does the diff do what the leaf's `spec.md` and its task files asked? Runs only when an Epic supplies those contracts.
- **Standards** — does it follow the repo's conventions, the test rules and the smell baseline? Runs always.

You find and grade; fixing is work you route. Findings become a Task or a briefed engineer, and the working tree leaves the review exactly as it arrived.

## 1. Resolve the diff

The input is one of three:

- **A PR** — the diff is `gh pr diff <number>`, measured against the PR's base.
- **The current branch** — the diff is `git diff $(git merge-base main HEAD)` plus the untracked files `git status --porcelain` lists.
- **An Epic reference** (`3.2`, resolved down the numbered directories under `.archie/`) — the diff is the branch-or-PR diff above; the Epic adds the contracts, the leaf's `spec.md` and its `tasks/*.md`, which is what turns the Spec axis on.

Confirm the diff is non-empty before going further: a bad ref or an empty diff fails here, not inside two parallel sub-agents.

## 2. The grade

Three tiers, given per axis and overall, where overall is the worse of the two:

- 🟢 **mergeable** — merge as it stands.
- 🟠 **mergeable with reservations** — findings worth fixing, none of which blocks the merge.
- 🔴 **needs work** — at least one finding must land before this merges.

## 3. Dispatch the axes as sub-agents, in parallel

Both go out **through the sub-agent (Agent) tool**, so neither pollutes the other's context. Without an Epic, only Standards goes out, and the header says the Spec axis was skipped and why. Each briefing file below is the whole of its axis's discipline, so each prompt opens with: **read your briefing file in full before reviewing — it carries your rules and your report format.**

**The Spec sub-agent's prompt** carries the diff command, the paths to `spec.md` and the task files, and the path to [`references/spec-review.md`](references/spec-review.md).

**The Standards sub-agent's prompt** carries the diff command, the repo's own standards files — the coding-standards file `AGENTS.md` links first, then `AGENTS.md` itself, `CLAUDE.md`, `CONTRIBUTING.md` — and the path to [`references/standards-review.md`](references/standards-review.md), which also carries the test rules, the hard checks and the smell baseline that hold even in a repo that documents nothing.

## 4. Report

```md
_Reviewed:_ {the PR, branch, or Epic} — {diffed against}

**Overall: {emoji} {tier}** · Spec: {emoji} {tier} · Standards: {emoji} {tier}

- [spec] {file:line} — {the finding, and what to fix}
- [standards] {file:line} — {the same}
```

One flat list, severity order, only the findings needing a fix — a 🟢 review is the header and nothing under it. A skipped Spec axis reads `Spec: skipped — no epic`. The report stays in this session; posting anywhere is a step 5 choice.

## 5. Route the findings

Ask which findings the user wants acted on — all, a sub-list, or none. Then:

**With an Epic**: write **one** new Task at `tasks/<next number>-<slug>.md` in the leaf — numbers are identity, so the next number even across deletions — with the selected findings as its acceptance criteria, `Status: todo`, `Label: ready-for-agent`, no `Blocked by`. Name `/archie-implement <reference>` as the next move: the loop is implement → review → fix Task → implement, until the grade reads 🟢.

**Without an Epic**: ask what to do — **fix now**, **comment on the PR**, or something else.

- **Fix now** — dispatch an engineer sub-agent running `/archie-tdd`, briefed with the selected findings as its criteria: file and line, the expected behaviour, exactly what to fix. Read its gate results, judge the fix diff yourself read-only against the findings it answers, re-issue the grade, and stop dirty offering to commit.
- **Comment on the PR** — post the grade header and the selected findings with `gh pr comment`, worded as the step 4 report.
