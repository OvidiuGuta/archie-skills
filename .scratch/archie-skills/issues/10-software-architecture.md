# 10 — `/software-architecture`

**What to build:** The read-only sub-agent skill that designs how one Task is implemented in the codebase, and writes that design to a file beside the Task so the engineer, the reviewer and the user all read the same thing.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Model-invocable, spawned by `/implement`'s orchestrator
- [ ] Read-only with respect to the codebase; the only file it writes is the design
- [ ] Reads the Task, its spec, the glossary, the ADRs touching the area, and every earlier `design.md` in the same leaf
- [ ] Designs module, library and component structure for this Task only, not for the whole leaf
- [ ] Treats the spec's integration seams as a constraint, not as an input to reconsider
- [ ] A design that cannot hit the spec's seam is reported as a planning defect for the orchestrator to surface, never overridden unilaterally
- [ ] Writes `tasks/NN-<slug>.design.md` and returns a path plus a short summary, never the design inline
- [ ] Ships `agents/openai.yaml`, and `README.md` documents the skill
