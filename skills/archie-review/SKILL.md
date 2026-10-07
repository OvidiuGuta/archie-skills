---
name: archie-review
description: Grading a PR, the current branch, or an Epic for mergeability on two axes — Spec and Standards — then fixing the findings the user accepts and verifying that fix, in one round. The review phase; /archie-implement also runs it unattended on the PR an Epic run opens. Only for explicit user invocation — never fire it on your own.
---

# Review

One change graded for mergeability, in two parallel axis sub-agents:

- **Spec** — does the diff do what the leaf's `spec.md` and its task files asked, including the seam test its `Integration:` line owed? Runs only when an Epic supplies those contracts.
- **Standards** — does it follow the repo's own `STANDARDS.md` and the test rules? Runs always.

An independent verifier confirms every 🔴 before it reaches the report, and a **re-review** holds to the review before it. Then **one** fix round, in this same session: the user picks the findings, an engineer fixes them, and you verify that fix read-only and re-grade. Briefed **unattended** by `/archie-implement`, you run two passes instead — step 9.

## 1. Resolve the diff

### Where the tree lives

The folder plans in Archie when its `origin` remote clearly matches one Project's repo in the Archie MCP server's `guide` Index. Compare host and path only, so `git@github.com:me/app.git` matches `https://github.com/me/app`. No `origin`, no match or no Archie connection means the tree lives on files, as the steps below describe. Several matches, or an unclear one, means asking the human which Project this is.

In Archie, every reference is a Task key such as `ARC-12`; refuse a `3.2` or a `3.2#1` with one line saying the folder plans in Archie. Act as the Agent whose description in the Index fits **reviewing**, or as the Task's assignee when it is an Agent, chosen once for the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. A Status, marker or Type a step names is the Status or Type whose description fits it; when none clearly fits, or several do, stop and ask the human, naming the step and `/archie-setup`. Brief any helper you dispatch or invoke with the mode and the Agent.

The input is one of three:

- **A PR** — the diff is `gh pr diff <number>`, measured against the PR's base.
- **The current branch** — the diff is `git diff $(git merge-base main HEAD)` plus the untracked files `git status --porcelain` lists.
- **An Epic reference** (`3.2`, resolved down the numbered directories under `.archie/`) — the diff is the branch-or-PR diff above; the Epic adds the contracts, the leaf's `spec.md` and its `tasks/*.md`, which is what turns the Spec axis on. In Archie the reference is the leaf's key.

Confirm the diff is non-empty before going further: a bad ref or an empty diff fails here, not inside two parallel sub-agents.

### The earlier review

A review remembers only what it can read: nothing about one reaches disk. Look for an earlier review of this change, in order:

- **On the PR** — the input PR, or the branch's open PR (`gh pr view --json number`): a review report or a GitHub review in its conversation, read with `gh pr view <number> --json comments,reviews,commits`.
- **In this session** — a report this review issued earlier in the conversation.

Found, this is a **re-review**. Its **memory** is the PR, or else that earlier report as text, and its **since diff** is `git diff <commit>` from the last commit the earlier review saw: on a PR, the last commit before the report's date; in the session, the HEAD the report was issued over. Not found, the review runs in full and the step 5 header says it is not a re-review.

## 2. Only a 🔴 moves the grade

Every finding carries a severity:

- 🔴 **Blocker** — it must land before this merges.
- 🟠 **Suggestion** — worth fixing, reported, and never part of the grade.

The **grade** has two tiers, per axis and overall: 🟢 **mergeable** when no 🔴 stands, 🔴 **needs work** otherwise. Overall is 🔴 when either axis is.

## 3. Dispatch the axes as sub-agents, in parallel

Both go out **through the sub-agent (Agent) tool**, so neither pollutes the other's context. Without an Epic, only Standards goes out, and the header says the Spec axis was skipped and why. Each briefing file below is the whole of its axis's discipline, so each prompt opens with: **read your briefing file in full before reviewing — it carries your rules, your severities and your report format.**

**The Spec sub-agent's prompt** carries the diff command, the paths to `spec.md` and the task files, and the path to [`references/spec-review.md`](references/spec-review.md). In Archie it carries the Spec and the Task bodies as text, with the leaf's closing Task named as such, since the briefing reads `Integration:` lines.

**The Standards sub-agent's prompt** carries the diff command, the repo's own standards files — `STANDARDS.md` first, then `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` — and the path to [`references/standards-review.md`](references/standards-review.md). Those files stay on disk in Archie mode.

**On a re-review, both prompts also carry** the memory, the since-diff command and the path to [`references/re-review.md`](references/re-review.md), read in full the same way. With the Spec axis skipped, the Standards axis carries forward every earlier finding.

### The `[pr]` sweep

With a PR in play, once both axes return, read the user's comments on it yourself — general and inline, leaving out the review reports posted there. Each that is still open in its thread and that no axis finding or carried-forward finding answers becomes a `[pr]` finding, quoting the comment: 🔴 when it asks for a change, 🟠 when it asks a question or remarks. On a re-review, carry earlier `[pr]` findings forward the way the axes carry theirs.

## 4. Check every blocker

Once both axes return with a new 🔴, dispatch **one** verifier sub-agent through the sub-agent tool. With none, skip this step.

**Its prompt** carries the diff command, the path to [`references/blocker-check.md`](references/blocker-check.md) with the same read-in-full opening as the axes, and every new 🔴 from both axes as three parts: its **claim** with its `file:line`, its **quoted line**, and its **named failure**. Nothing else from the axes goes in — no Suggestions, and none of their reasoning — because a verifier handed the argument tends to agree with it. In Archie mode, the quoted line's source goes in as text, as it did for the Spec axis. On a re-review it also carries the since-diff command.

A `[pr]` 🔴 is the user's own word, and a still-open earlier 🔴 was checked when first raised: both stand without the verifier.

Each 🔴 it **confirms** stays a Blocker. Each it **drops** leaves Blockers and the grade with it, and is listed only under **Unconfirmed**, with the verifier's one-line why.

Done when every new 🔴 has a verdict and the grade counts only the confirmed ones.

## 5. Report

```md
_Reviewed:_ {the PR, branch, or Epic} — {diffed against}, {re-review of {the PR conversation | the earlier report in this session} | not a re-review}

**Overall: {🟢 mergeable | 🔴 needs work}** · Spec: {🟢 | 🔴} · Standards: {🟢 | 🔴} · **Confidence: {n}/5** — {one-line reason}

**Blockers**
- 🔴 [spec|standards|pr] {file:line} — {the finding, and what to fix}

**Suggestions**
- 🟠 [spec|standards|pr] {file:line} — {the same}

**Earlier findings**
- {finding, in its original wording} — resolved | still open | dismissed: {why}

**Unconfirmed**
- [spec|standards] {file:line} — {the 🔴 as its axis wrote it} — dropped: {the verifier's why}
```

An empty list is left out, so a first review with no findings is the header alone, and Earlier findings appears only on a re-review. A still-open earlier finding is a finding at its original severity — a 🔴 one holds the grade at 🔴 — while resolved and dismissed ones, and Unconfirmed lines, are not findings: nothing in steps 6 to 9 picks, fixes or triages them. A skipped Spec axis reads `Spec: skipped — no epic`.

### The Confidence score

Every report's header ends on a **Confidence score**: how safe the change is to merge, from 1 to 5, placed by judgement against these bands.

- **5** — safe to merge on the grade alone: every acceptance criterion reached by a test, nothing risky left untested.
- **4** — safe to merge; one area is worth a skim, named in the reason.
- **3** — mergeable, but read it first: something the review could not vouch for — criteria no test covers, a skipped Spec axis, risky code (auth, data, money, migrations, concurrency) touched without a test reaching it.
- **2** — a 🔴 stands and its fix is local.
- **1** — a 🔴 stands that questions the change itself: a failing test, a missing user story, an approach that will not hold.

A 🟢 review scores 3 to 5 and a 🔴 review 1 or 2. Within that range, weigh the Spec axis's **Untested** list, a skipped Spec axis, and risky code no test reaches, which you read off the diff yourself. The bands guide a judgement; they are not deductions to count. The reason names what placed the score in its band.

The score gates nothing: the grade alone decides mergeable.

Done when the header carries a score inside its grade's range and a reason naming what placed it there.

## 6. Halt and offer the fix round

Unattended, step 9 replaces this step. Otherwise stop on the report whatever the grade, and ask which findings the user wants fixed — all, a sub-list, or none.

**None** ends the review here. With a PR in play, offer instead to post the grade header and the selected findings with `gh pr comment`, worded as the step 5 report.

Done when the user has named the findings in their words, or declined the round.

## 7. Fix, once

One engineer sub-agent, dispatched through the sub-agent tool, running `/archie-tdd`, so the fix is driven by a test and re-runs the gates. A finding with no behaviour to drive, like a rename or a missing type, is a fix it makes without a test.

Its brief is **exit criteria**: the complete list of what must be true once the fix lands, and nothing else. One entry per accepted finding — its `file:line`, the behaviour expected there, and what proves it. Paths and code belong here, unlike a Task's acceptance criteria, because the engineer is repairing a named line rather than building an outcome.

Done when every accepted finding has an entry the engineer can check itself against.

## 8. Verify the fix and re-grade

Read the engineer's gate results, then judge its diff yourself, read-only. You hold the exit criteria, so this is a **verify** pass over them and not a second review:

- **Every accepted finding**, called resolved or surviving, one by one.
- **The fix diff at the blocker bar** — the secrets check and 🔴 standards breaches, nothing more. A 🟠 the fix introduced belongs to the next review; hunting it here is how one fix round becomes three.

Re-issue the step 5 report with the new grade and score. If findings survived, name them and stop: there is no second round, because a round the fix could not settle means the contract is the problem and the user's read is the faster way out.

The tree is dirty and stays that way. Offer the commit, and with a PR in play the posting of the report, and stop.

## 9. Unattended, from `/archie-implement`

An Epic run ends by invoking you inline on its Epic and its draft PR, with nobody there to pick the findings. You own **two passes**, and the run stops after the second whatever its grade: a PR still 🔴 then goes to the user, which is faster than a loop nobody watches.

1. **First pass.** Run steps 1 to 5. A report with no findings is posted with `gh pr comment` as the only comment, and the run ends there.
2. **Triage, in place of step 6.** Drop a finding only when it is **wrong**, a fact you can check: its quoted contract line does not say what the finding claims, the failure it names cannot happen on the path it gives, or it asks for something no contract or standard asks for. Every other finding, 🔴 and 🟠 alike, is kept — disagreeing with its wording or weight keeps it in.
3. **Comment 1.** Post the step 5 report and the triage with `gh pr comment`, an empty list left out:

```md
{the step 5 report}

**To fix**
- {finding}

**Dropped**
- {finding} — {why it is wrong}
```

4. **Fix, once.** Run step 7 with every kept finding in the brief, then commit the fix as `<reference>: review fixes` and push it. With every finding dropped, skip to the second pass. Step 8 does not run: the second pass replaces it.
5. **Second pass.** Run steps 1 to 5 again. Step 1 finds comment 1, so this is a re-review, and comment 1's drops carry forward as dismissed.
6. **Comment 2.** Post its step 5 report as the run's final word.

Done when the PR carries the final report. `/archie-implement` resumes from that report's grade.
