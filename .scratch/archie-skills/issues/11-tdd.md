# 11 — `/tdd`

**What to build:** The test-first implementation skill, running double-loop: one failing integration test at the spec's seam, then unit tests driving each unit the Task modifies.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Model-invocable, spawned by `/implement`'s orchestrator
- [ ] Reads the Task, its spec, and its `design.md` before writing anything
- [ ] Outer loop first: one failing integration test at the spec's seam, derived from the Task's acceptance criteria, before any implementation
- [ ] Inner loop: unit tests for every unit the Task modifies, with dependencies mocked
- [ ] "Touches" means modified, not merely read, so unit testing does not metastasise
- [ ] Unit tests assert behaviour at a unit's boundary; a test that would break on a rename or an extracted helper is not acceptable
- [ ] Runs the verification gates recorded in the `AGENTS.md` facts section
- [ ] If a recorded gate command does not exist or has changed, re-discovers it and corrects the facts section
- [ ] If a gate is `unknown`, says so rather than guessing at a conventional command
- [ ] Reports what it built and the gate results, and does not report success on a failing gate
- [ ] Ships `agents/openai.yaml`, and `README.md` documents the skill
