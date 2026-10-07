# 01 — Green when nothing blocks

**Epic:** trustworthy-review
**Status:** todo
**Label:** ready-for-agent
**Blocked by:** None — can start immediately
**Builds:** Grade; the report's Blockers and Suggestions lists; the Standards brief's 🔴 bar; Docs for the Reviewing flow and ADR-0020 and ADR-0021

**Demoable outcome:** a review whose only findings are 🟠 grades 🟢 mergeable and lists them as Suggestions.

- [ ] A review with only 🟠 findings grades 🟢 per axis and overall, with the findings under **Suggestions**.
- [ ] A review with any standing 🔴 grades 🔴 needs work, with those findings under **Blockers**, above Suggestions.
- [ ] No grade reads "mergeable with reservations" anywhere the review reports.
- [ ] A review with no findings is the header alone.
- [ ] The Standards axis marks 🔴 only the secrets check, the test rules, or a clear breach of a yes-or-no rule in `STANDARDS.md`; a breach under a `— judgement calls` heading comes back as a Suggestion.
- [ ] Run by the user, the review still halts for them to pick findings, and its fix round still ends on the read-only verify pass and a re-issued report.
- [ ] The `/archie-review` manual page and the README's Reviewing flowchart describe the two-tier grade, and ADR-0020 and ADR-0021 each carry an amended-by note pointing at ADR-0024.
- [ ] The skill validator passes.
