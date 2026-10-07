# 02 — Blockers are double-checked

**Epic:** trustworthy-review
**Status:** done
**Label:** ready-for-agent
**Blocked by:** #1
**Builds:** The blocker check

**Demoable outcome:** every 🔴 is confirmed by an independent verifier before it reaches the report, and one the verifier cannot confirm is left out.

- [x] After both axes return with at least one 🔴, the review dispatches one verifier carrying each 🔴's claim, quoted line and named failure, and none of the axis's reasoning.
- [x] A 🔴 the verifier confirms appears under Blockers; one it cannot confirm does not appear, and the grade is derived without it.
- [x] The verifier gives a one-line why for every 🔴 it drops, visible in the review's output.
- [x] A review with no 🔴 dispatches no verifier, and Suggestions are never sent to it.
- [x] The verifier is read-only: it may run the suite and writes no files.
- [x] The `/archie-review` manual page describes the blocker check.
- [x] The skill validator passes, with the new briefing linked from the review skill.
