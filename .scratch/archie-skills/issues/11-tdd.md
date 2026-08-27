# 11 — `/tdd`

**What to build:** The test-first implementation skill, running double-loop: one failing integration test at the spec's seam, then unit tests driving each unit the Task modifies.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-review

- [x] Model-invocable, spawned by `/implement`'s orchestrator
- [x] Reads the Task, its spec, and its `design.md` before writing anything
- [x] Outer loop first: one failing integration test at the spec's seam, derived from the Task's acceptance criteria, before any implementation
- [x] Inner loop: unit tests for every unit the Task modifies, with dependencies mocked
- [x] "Touches" means modified, not merely read, so unit testing does not metastasise
- [x] Unit tests assert behaviour at a unit's boundary; a test that would break on a rename or an extracted helper is not acceptable
- [x] Runs the verification gates recorded in the `AGENTS.md` facts section
- [x] If a recorded gate command does not exist or has changed, re-discovers it and corrects the facts section
- [x] If a gate is `unknown`, says so rather than guessing at a conventional command
- [x] Reports what it built and the gate results, and does not report success on a failing gate
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
