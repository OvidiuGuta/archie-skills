# 03 — A re-review remembers

**Epic:** trustworthy-review
**Status:** todo
**Label:** ready-for-agent
**Blocked by:** #1
**Builds:** Data; Memory; the report's Earlier findings list and `[pr]` tag

**Demoable outcome:** a second review of a PR holds to the first: earlier findings carried forward in their wording, new blockers only on changed lines, and the user's PR comments answered.

- [ ] Re-reviewing a PR, both axes read the PR's conversation — earlier reviews, the user's comments, inline threads — and the report lists every earlier finding under **Earlier findings** as resolved, still open or dismissed, in its original wording.
- [ ] Re-reviewing in the same session with no PR comment to read, the review holds to the earlier report in the conversation.
- [ ] A new 🔴 appears only on lines changed since the previous review; code that review saw and passed is not newly blocked.
- [ ] A user comment on the PR, general or inline, that neither axis answered appears as a `[pr]` finding.
- [ ] With no earlier review to read, the review runs in full and its header says it is not a re-review.
- [ ] Outside an Epic run, the review still posts to the PR only on the user's word.
- [ ] The `/archie-review` manual page describes re-review memory.
- [ ] The skill validator passes.
