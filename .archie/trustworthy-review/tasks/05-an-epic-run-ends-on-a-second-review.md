# 05 — An Epic run ends on a second review

**Epic:** trustworthy-review
**Status:** todo
**Label:** ready-for-agent
**Blocked by:** #2, #3, #4
**Builds:** Unattended; the unattended contract with `/archie-implement`; Docs for the Implementing flow and ADR-0023

**Demoable outcome:** an Epic run's PR carries two review comments — the first report with its triage, then a second full review's report with grade and score — and is marked ready only when that second review is 🟢.

- [ ] Unattended, the first comment on the PR is the first report plus the triage: what will be fixed and what was dropped as wrong, each drop with its reason.
- [ ] Every finding not dropped, 🔴 and 🟠 alike, is fixed in one round, committed as `<reference>: review fixes` and pushed.
- [ ] A full second review then runs — both axes, the blocker check and the PR-comment sweep — holding to the PR's conversation, and posts its report as the second comment, with Earlier findings, grade and score.
- [ ] No verify pass runs unattended, and no second fix round follows the second review, whatever its grade.
- [ ] `/archie-implement` marks the PR ready when the second review is 🟢 and leaves it a draft otherwise, and its summary's `_PR:_` line carries the grade and the score.
- [ ] The `/archie-review` and `/archie-implement` manual pages and the README's Implementing flowchart describe the second review, and ADR-0023 carries an amended-by note pointing at ADR-0024.
- [ ] The skill validator passes.
