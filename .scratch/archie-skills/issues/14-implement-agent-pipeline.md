# 14 — `/implement`, the `ready-for-agent` pipeline

**What to build:** The orchestrator skill for a single Task carrying the `ready-for-agent` label. It designs, implements, reviews, drives bounded fix rounds, verifies, and reports, without writing any feature code itself.

**Blocked by:** 10 — `/software-architecture`, 11 — `/tdd`, 12 — `/code-review`, 13 — `/qa`.

**Status:** ready-for-agent

- [ ] User-callable only (`disable-model-invocation: true`)
- [ ] Takes a single Task reference, either `3.2#1` or a path, and resolves the Task, its spec and its Effort from that one reference
- [ ] Halts if the Task's blocking edges are unmet, rather than proceeding out of order
- [ ] The orchestrator never writes feature code; staying out of the implementation keeps its review of the diff honest
- [ ] Runs the sequence: `/software-architecture` → `/tdd` → `/code-review` → up to two engineer fix rounds → `/qa` → up to one engineer fix round → report
- [ ] Triages every finding before acting: a code defect goes back to the engineer, a planning defect halts the run and surfaces to the user
- [ ] A finding that is an ambiguous or wrong acceptance criterion, or one contradicting the spec, is treated as a planning defect and never guessed at
- [ ] Code review does not re-run after a QA fix; the orchestrator judges the fix diff directly
- [ ] Sub-agents hand off by path; the orchestrator never relays the design or research findings inline
- [ ] Sets the Task's status to `in-progress` at the start and `ready-for-review` at the end, and never sets `done`
- [ ] Presents one summary at the end covering design, implementation, review findings, fixes applied, and QA results including the verified-but-not-pinned and unverified criteria
- [ ] Selects the pipeline from the Task's label, so an unrecognised or missing label stops rather than defaulting
- [ ] Ships `agents/openai.yaml`, and `README.md` documents the skill
