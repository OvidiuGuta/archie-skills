---
name: archie-review
description: Grading a PR, the current branch, or an Epic for mergeability on two axes — Spec and Standards — then fixing the findings the user accepts and verifying that fix, in one round. The review phase, run after /archie-implement. Only for explicit user invocation — never fire it on your own.
---

# Review

One change graded for mergeability, in two parallel axis sub-agents:

- **Spec** — does the diff do what the leaf's `spec.md` and its task files asked, including the seam test its `Integration:` line owed? Runs only when an Epic supplies those contracts.
- **Standards** — does it follow the repo's own `STANDARDS.md` and the test rules? Runs always.

Then **one** fix round, in this same session: the user picks the findings, an engineer fixes them, and you verify that fix read-only and re-grade.

## 1. Resolve the diff

### Where the tree lives

In a folder whose `AGENTS.md` carries `**Archie Project:** KEY`, the tree lives in Archie, so follow its MCP server's `guide`. Every reference is a Task key such as `ARC-12`, and a `3.2` or a `3.2#1` is refused with one line saying the folder plans in Archie. Act as the Agent the Project's map gives `reviewer`, read once from `guide {projectKey}`, on every call of the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. A helper you dispatch or invoke is told the mode and the Agent in its brief, and carries no mode text of its own.

The input is one of three:

- **A PR** — the diff is `gh pr diff <number>`, measured against the PR's base.
- **The current branch** — the diff is `git diff $(git merge-base main HEAD)` plus the untracked files `git status --porcelain` lists.
- **An Epic reference** (`3.2`, resolved down the numbered directories under `.archie/`) — the diff is the branch-or-PR diff above; the Epic adds the contracts, the leaf's `spec.md` and its `tasks/*.md`, which is what turns the Spec axis on. In Archie the reference is the leaf's key.

Confirm the diff is non-empty before going further: a bad ref or an empty diff fails here, not inside two parallel sub-agents.

## 2. Severity carries the grade

Every finding carries a severity, and each axis's tier is derived from the severities it reported:

- 🟢 **mergeable** — the axis reported nothing.
- 🟠 **mergeable with reservations** — every finding it reported is 🟠: worth fixing, and it does not block the merge.
- 🔴 **needs work** — at least one finding is 🔴: it must land before this merges.

Overall is the worse of the two.

## 3. Dispatch the axes as sub-agents, in parallel

Both go out **through the sub-agent (Agent) tool**, so neither pollutes the other's context. Without an Epic, only Standards goes out, and the header says the Spec axis was skipped and why. Each briefing file below is the whole of its axis's discipline, so each prompt opens with: **read your briefing file in full before reviewing — it carries your rules, your severities and your report format.**

**The Spec sub-agent's prompt** carries the diff command, the paths to `spec.md` and the task files, and the path to [`references/spec-review.md`](references/spec-review.md). In Archie it carries the Spec and the Task bodies as text, with the `verification` Task named as the closing Task, since the briefing reads `Integration:` lines.

**The Standards sub-agent's prompt** carries the diff command, the repo's own standards files — `STANDARDS.md` first, then `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` — and the path to [`references/standards-review.md`](references/standards-review.md). Those files stay on disk in Archie mode.

## 4. Report

```md
_Reviewed:_ {the PR, branch, or Epic} — {diffed against}

**Overall: {emoji} {tier}** · Spec: {emoji} {tier} · Standards: {emoji} {tier}

- 🔴 [spec] {file:line} — {the finding, and what to fix}
- 🟠 [standards] {file:line} — {the same}
```

One flat list, 🔴 before 🟠 — a 🟢 review is the header and nothing under it. A skipped Spec axis reads `Spec: skipped — no epic`.

## 5. Halt and offer the fix round

Stop on the report whatever the grade, and ask which findings the user wants fixed — all, a sub-list, or none.

**None** ends the review here. With a PR in play, offer instead to post the grade header and the selected findings with `gh pr comment`, worded as the step 4 report.

Done when the user has named the findings in their words, or declined the round.

## 6. Fix, once

One engineer sub-agent, dispatched through the sub-agent tool, running `/archie-tdd`, so the fix is driven by a test and re-runs the gates. A finding with no behaviour to drive, like a rename or a missing type, is a fix it makes without a test.

Its brief is **exit criteria**: the complete list of what must be true for the grade to read 🟢, and nothing else. One entry per accepted finding — its `file:line`, the behaviour expected there, and what proves it. Paths and code belong here, unlike a Task's acceptance criteria, because the engineer is repairing a named line rather than building an outcome.

Done when every accepted finding has an entry the engineer can check itself against.

## 7. Verify the fix and re-grade

Read the engineer's gate results, then judge its diff yourself, read-only. You hold the exit criteria, so this is a **verify** pass over them and not a second review:

- **Every accepted finding**, called resolved or surviving, one by one.
- **The fix diff at the blocker bar** — the secrets check and 🔴 standards breaches, nothing more. A 🟠 the fix introduced belongs to the next review; hunting it here is how one fix round becomes three.

Re-issue the step 4 report with the new grade. If findings survived, name them and stop: there is no second round, because a round the fix could not settle means the contract is the problem and the user's read is the faster way out.

The tree is dirty and stays that way. Offer the commit and stop.
