# 04 — `/interview`

**What to build:** The interviewing discipline that replaces `/grilling`. One question at a time, and bounded by the altitude test so a session cannot descend into specifying the whole subject in one sitting.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Model-invocable, reached by `/architect` naming it
- [ ] Asks exactly one question per turn, numbered, and waits for the answer
- [ ] Every question carries the agent's recommended answer, so agreeing is cheap and disagreeing is informed
- [ ] Applies the altitude test before asking: a question whose answer has no blast radius beyond one part of the Effort is not asked
- [ ] Deferrals are announced in one line as they happen, so the user watches the child list assemble rather than being handed it at the end
- [ ] The user can pull a deferred question back up to the current resolution, overruling the altitude test continuously
- [ ] A check-in roughly every eight questions states what is settled, what is deferred, and the current deeper-or-spec lean, without being a decision point
- [ ] Never answers its own questions; decisions are always the user's
- [ ] The session ends when the at-altitude frontier is empty, reporting either an empty frontier or the clusters the deferrals formed
- [ ] The altitude test is enforced, not advisory, and the skill says so explicitly
- [ ] Ships `agents/openai.yaml`, and `README.md` documents the skill
