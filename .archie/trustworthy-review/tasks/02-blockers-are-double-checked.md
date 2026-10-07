# 02 — Blockers are double-checked

**Epic:** trustworthy-review
**Status:** todo
**Label:** ready-for-agent
**Blocked by:** #1
**Builds:** The blocker check

**Demoable outcome:** every 🔴 is confirmed by an independent verifier before it reaches the report, and one the verifier cannot confirm is left out.

- [ ] After both axes return with at least one 🔴, the review dispatches one verifier carrying each 🔴's claim, quoted line and named failure, and none of the axis's reasoning.
- [ ] A 🔴 the verifier confirms appears under Blockers; one it cannot confirm does not appear, and the grade is derived without it.
- [ ] The verifier gives a one-line why for every 🔴 it drops, visible in the review's output.
- [ ] A review with no 🔴 dispatches no verifier, and Suggestions are never sent to it.
- [ ] The verifier is read-only: it may run the suite and writes no files.
- [ ] The `/archie-review` manual page describes the blocker check.
- [ ] The skill validator passes, with the new briefing linked from the review skill.
