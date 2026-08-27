# 05 — `/domain-modeling`

**What to build:** The skill that maintains the durable decision record: `CONTEXT.md` for terms, `docs/adr/` for decisions clearing the bar, and the Effort's own `effort.md` for the residue. Because the Effort tree is disposable and has no close ritual, whatever is written here is all that survives.

**Blocked by:** 01 — Conventions and templates.

**Status:** done

- [x] Model-invocable, reached by `/architect` naming it
- [x] Maintains `CONTEXT.md` as a glossary and nothing else, with no implementation detail
- [x] Challenges a term that conflicts with the existing glossary, and proposes a precise canonical term for fuzzy or overloaded language
- [x] Captures a term the moment it resolves rather than batching to the end of the session
- [x] Applies the unchanged three-part ADR bar: hard to reverse, surprising without context, the result of a real trade-off
- [x] A lower resolution sharpening an existing decision amends that ADR in place
- [x] A reversal, where the earlier statement is no longer true, writes a new ADR that supersedes the old one
- [x] An at-altitude decision failing the ADR bar is recorded as one line in the Effort's `effort.md`, so children inherit it
- [x] States the self-regulating rule: a decision needing more than a line needed its reasoning, so it clears the ADR bar
- [x] Creates `CONTEXT.md` and `docs/adr/` lazily, only when there is something to write
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
