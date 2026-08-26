# 06 — `/research` and `/prototype`

**What to build:** The two exits from a question that conversation cannot resolve. `/research` when the question is a fact rather than a decision, `/prototype` when it is "how should this look or behave". Both run in sub-agents and return pointers, so neither pollutes the interview's context.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Both model-invocable
- [ ] `/research` runs in a sub-agent, writes its findings to a file inside the Effort, and returns a path plus a short summary
- [ ] `/research` never returns findings inline, and the skill says why
- [ ] `/research` is for facts only; a question that is a decision goes back to the user
- [ ] `/prototype` runs in a sub-agent, builds a cheap throwaway artifact, and returns a path plus a short summary
- [ ] `/prototype` output is explicitly throwaway and is not to be treated as production code
- [ ] Iterating on a prototype resumes the same sub-agent rather than spawning a new one, so a small change does not re-read the world
- [ ] The user reacts to the prototype at the top level; the sub-agent never stands in for the user's reaction
- [ ] Each ships `agents/openai.yaml`, and `README.md` documents both skills
