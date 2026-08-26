# 12 — `/code-review`

**What to build:** The reviewing sub-agent skill. It holds the diff against all three of its contracts and returns findings without fixing anything.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Model-invocable, spawned by `/implement`'s orchestrator
- [ ] Reviews the code against the spec, the Task's acceptance criteria, and the `design.md` it claims to follow
- [ ] Checks the integration test exists and sits at the spec's seam rather than somewhere more convenient
- [ ] Checks unit test coverage for the units the Task modified
- [ ] Rejects a unit test that asserts implementation detail, specifically one that would break on a rename or an extracted helper
- [ ] Distinguishes a code defect from a planning defect in its findings, so the orchestrator can triage without re-reading everything
- [ ] Returns findings and does not fix them, so the reviewing and the fixing stay separate
- [ ] Ships `agents/openai.yaml`, and `README.md` documents the skill
