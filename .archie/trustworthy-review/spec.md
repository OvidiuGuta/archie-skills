# Spec: Trustworthy review

**Epic:** trustworthy-review

## Problem Statement

Run `/archie-review`, fix, and run it again, and it always finds something, most often on the Standards axis. A single 🟠 keeps a PR off 🟢, every fresh pass over the same diff can surface a different 🟠, and each review starts with no memory of the last. A PR almost never goes green after one review and one fix round, so the grade cannot be trusted, and nothing tells the user how far to trust a green one either.

## Solution

The review converges. 🟢 means no 🔴 stands; a 🟠 is a **Suggestion**, reported and never graded. On the Standards axis only a hard rule can block. Every 🔴 is confirmed by an independent check before it is reported. A review of a change already reviewed holds to the previous report and raises a new 🔴 only on lines changed since.

Every review ends on a **Confidence score** from 1 to 5: how safe the change is to merge, capped at 2 while a 🔴 stands, and above that placed against a fixed rubric of what the review could not vouch for, with a one-line reason.

An Epic run fixes every finding that is not wrong, then reviews the PR a second time, and that second review's grade and score are where the unattended run stops. Run by the user, every round stays theirs.

## User Stories

1. As a user, I want a review graded 🟢 whenever no 🔴 finding stands, so that a nitpick can never hold a PR off green.
2. As a user, I want 🟠 findings reported as Suggestions in their own part of the report, so that I still see them without reading them as blockers.
3. As a user, I want the grade to have only two tiers, 🟢 mergeable and 🔴 needs work, per axis and overall, so that it answers one question.
4. As a user, I want a Standards finding to be 🔴 only for the secrets check, the test rules, or a clear breach of a yes-or-no rule in my `STANDARDS.md`, so that the file I own decides what can block.
5. As a user, I want any rule under a `— judgement calls` heading reported only ever as a Suggestion, so that taste never blocks a merge.
6. As a user, I want every 🔴 confirmed by an independent check before it reaches the report, so that a wrong blocker does not cost me a fix round.
7. As a user, I want a 🔴 the independent check cannot confirm left out of the report, so that only blockers that survive scrutiny move the grade.
8. As a user, I want Suggestions to skip the independent check, so that its cost goes only where the grade is at stake.
9. As a user re-reviewing a PR, I want the review to read the PR's whole conversation — earlier reviews, my comments, inline threads — and hold to it, so that a second pass does not contradict the first.
10. As a user, I want my own comments on the PR, general or inline, treated as things to fix or answer like any finding, so that the review acts on what I said, not only on what it found.
11. As a user re-reviewing in the same conversation, I want the review to use the earlier report there when the PR has none, so that memory works without posting.
12. As a user, I want a re-review to carry every earlier finding forward as resolved, still open or dismissed, in its original wording, so that I can track each one across rounds.
13. As a user, I want a re-review to raise a new 🔴 only on lines changed since the previous review, so that code passed once is not blocked the next time.
14. As a user, I want a review with no previous report to find to run in full and say so, so that I know memory was not in play.
15. As a user, I want posting a review to a PR to stay my choice outside an Epic run, so that I control what gets published.
16. As a user, I want every review to end on a Confidence score from 1 to 5 of how safe the change is to merge, so that I know how far to trust the grade.
17. As a user, I want the score capped at 2 while any 🔴 stands, so that the score and the grade never disagree.
18. As a user, I want a 🟢 review's score to weigh what the review could not vouch for — acceptance criteria no test covers, a skipped Spec axis, risky code touched without tests — so that the score says what green cannot.
19. As a user, I want the score to carry a one-line reason, so that I can check the judgement rather than take it on faith.
20. As a user, I want the score placed by judgement against five written band descriptions, so that I know what each number means without it becoming a formula.
21. As a user, I want the score to gate nothing, so that a PR is marked ready on 🟢 alone and the score only guides how closely I read it.
22. As a user running an Epic, I want the unattended first round to fix every finding that is not wrong, Suggestions included, so that the PR arrives polished.
23. As a user running an Epic, I want a second review over the fixed PR, holding to the first one's report, so that the run ends on a fresh grade and score rather than a verify pass.
24. As a user running an Epic, I want the second review's grade and score posted on the PR as the run's final word, so that I can read where it stands without opening the session.
25. As a user running an Epic, I want the run to stop after that second review whatever its grade, so that a PR still 🔴 comes to me instead of looping unattended.
26. As a user running an Epic, I want the PR marked ready when the second review is 🟢 and left a draft otherwise, so that the draft state still signals it needs me.
27. As a user running the review myself, I want to keep picking which findings get fixed, so that I control every round.
28. As a user running the review myself, I want my fix round to end on the read-only verify pass as today, so that re-reviewing is my call.
29. As a user, I want the report header to show the grade per axis, overall, and the Confidence score with its reason, so that the verdict reads in one line.
30. As a user, I want the manual pages for `/archie-review` and `/archie-implement` to describe the new grade, score, memory and Epic-run ending, so that the docs match what runs.

## Implementation Decisions

### Data

Nothing persists. A review's memory is the PR's conversation — earlier review comments, the user's comments, inline review threads — read through `gh`, or else the earlier report in the same session. No marker, no numbering scheme, no saved file: the reader is a model told to hold to what it reads, and a fixed format would exclude the user's own comments.

### Contract

**The report** keeps the step-4 shape and changes in three places:

```md
_Reviewed:_ {the PR, branch, or Epic} — {diffed against}{, re-review of {what it held to}}

**Overall: {🟢 mergeable | 🔴 needs work}** · Spec: {emoji} · Standards: {emoji} · **Confidence: {n}/5** — {one-line reason}

**Blockers**
- 🔴 [spec|standards|pr] {file:line} — {the finding, and what to fix}

**Suggestions**
- 🟠 [spec|standards|pr] {file:line} — {the same}

**Earlier findings**
- {finding, in its original wording} — resolved | still open | dismissed: {why}
```

An empty list is left out, so a clean first review is the header alone. `**Earlier findings**` appears only on a re-review. `[pr]` tags a user comment on the PR that neither axis answered.

**The Confidence score bands** are written into the review skill as the reviewer's rubric, and placed by judgement with a one-line reason:

- **5** — safe to merge on the grade alone: every acceptance criterion reached by a test, nothing risky left untested.
- **4** — safe to merge; one area is worth a skim, named in the reason.
- **3** — mergeable, but read it first: something the review could not vouch for — criteria no test covers, a skipped Spec axis, risky code (auth, data, money, migrations, concurrency) touched without a test reaching it.
- **2** — a 🔴 stands and its fix is local.
- **1** — a 🔴 stands that questions the change itself: a failing test, a missing user story, an approach that will not hold.

A 🟢 review scores 3 to 5, a 🔴 review 1 or 2.

**Each axis brief** gains its reporting of the gaps the score weighs: the Spec axis lists the acceptance criteria no test reaches, beside its findings and not as findings.

**The unattended contract** with `/archie-implement` is unchanged in shape: it invokes the review inline, briefed unattended, and reads the final grade — 🟢 marks the PR ready, anything else leaves a draft. The score is reported in its summary's `_PR:_` line and gates nothing.

### Structure

**`/archie-review`**

- **Grade** — two tiers, derived from 🔴 alone; 🟠 is a Suggestion and never moves it.
- **The blocker check** — a new briefing beside the Spec and Standards briefings. After both axes return and only when a 🔴 exists, one verifier sub-agent is dispatched with each 🔴's claim, its quoted line and its named failure, and none of the axis's reasoning. It reads the code, may run the suite, stays read-only, and confirms or drops each 🔴 with a one-line why. Dropped blockers leave the report. Suggestions skip it.
- **Memory** — both axis briefs gain: read the PR's conversation if there is one, carry every earlier finding forward as resolved, still open or dismissed in its original wording, and raise a new 🔴 only on lines changed since the last review. In the same session the review hands them the earlier report instead. After the axes, the orchestrator sweeps the user's PR comments and lists any neither axis answered as `[pr]` findings.
- **The Standards brief's 🔴 bar** — the secrets check, the test rules, and a clear breach of a yes-or-no rule in `STANDARDS.md`. A `— judgement calls` rule is always a Suggestion.
- **Attended** (steps 5 to 7) — unchanged: the user picks, one `/archie-tdd` fix, the read-only verify pass, re-issue the report with grade and score.
- **Unattended** (step 8) — the review owns both passes. Comment 1: the first report plus the triage — what will be fixed and what was dropped as wrong, each drop with its reason. Every finding not wrong is fixed, 🔴 and 🟠. Commit `<reference>: review fixes`, push. Then a full second pass — axes, blocker check, `[pr]` sweep — holding to the PR conversation, which now carries comment 1. Comment 2: its report. The verify pass does not run unattended; the second review replaces it. The run stops there whatever the grade.

**`/archie-implement`** — epic mode's review step reads the grade from the review's second pass, and its summary's `_PR:_` line carries the score.

**Docs** — the `/archie-review` and `/archie-implement` manual pages, the README's Reviewing flowchart (🔴 alone routes to the fix round; the Epic run ends on a second review) and its Implementing one, and an `_Amended by 0024_` line atop ADR-0020, ADR-0021 and ADR-0023.

### Dependencies

None. `gh` is already a dependency of the review.

## Testing Decisions

**No seam.** This bundle is prose with no behaviour harness and no earlier leaf has had one, so the Spec marks the seam not-applicable and the leaf has no closing Task. Convergence is checked by using the review on the next Epic run.

The gate is `node scripts/validate-skills.mjs`, which CI runs: skill roster, frontmatter, relative links, manual pages and the README index. A new briefing file must be linked from `SKILL.md` so the link check covers it. Each Task proves its criteria by the validator passing plus the `file:line` in the skill text that makes each one hold.

## Out of Scope

- A separate risk level beside the score. One number answers "can I merge this?", and risk feeds into it.
- Majority voting across several runs of an axis. Its cost is several times a review's, and the independent 🔴 check buys most of its benefit.
- Checking Suggestions independently.
- Any review state saved to disk. Memory lives in the PR comment or the conversation.
- Posting attended reviews to the PR automatically.
- Gating on the score, unattended or attended.
- A second unattended fix round. The run stops at the second review.
- Changing what the Spec axis may mark 🔴. Its quoted-line-and-named-failure bar from ADR-0021 stands.

## Further Notes

The shape and its reasoning are ADR-0024, *A review converges*, which amends ADR-0020, ADR-0021 and ADR-0023. The terms are **Grade**, **Suggestion** and **Confidence score** in `CONTEXT.md`. The research behind it — how CodeRabbit, Greptile, PR-Agent and Anthropic's Code Review keep re-reviews quiet, and how their scores work — is in the two findings this Epic's `## Research` lists. One finding there shaped the 🔴 check: Greptile found model-rated confidence on individual findings near random, so blockers are confirmed by an independent check rather than filtered by self-rated confidence.
