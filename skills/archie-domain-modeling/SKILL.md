---
name: archie-domain-modeling
description: Writing a settled decision down — a term to CONTEXT.md, a decision clearing the bar to docs/adr/, the residue to effort.md. Reached by /archie-architect the moment something resolves.
---

# Domain modeling

The Effort tree is disposable and has no close ritual. What this skill writes is all that survives the session, so it runs the moment something resolves rather than at the end.

Read [`references/decisions.md`](./references/decisions.md) first. It fixes the three destinations, the `CONTEXT.md` and ADR formats, the ADR bar, and amend-versus-supersede. This skill is how a decision gets through them.

## Route it

One settled thing, one destination — the table in `decisions.md` is the whole routing. The only call it leaves you is between an ADR and the residue, and one test decides it:

> **Does it fit in one line, with no reasoning?**

A decision that will not is a decision that needed its reasoning, which means it clears the bar. That test is self-regulating: it keeps `effort.md` from growing into a spec, and it keeps the ADR set from filling with lines.

Create `CONTEXT.md` and `docs/adr/` **lazily** — the first term and the first ADR bring their file into existence. A repo that never needed either does not carry an empty one.

## Terms

Every term goes in the moment it resolves, definition and `_Avoid_` list together. A term still sitting in the conversation at the end of the session is a term the tree takes with it.

`CONTEXT.md` is a **glossary**: what each term *is*, in one or two sentences, in this project's domain. How it is stored, when it is validated and what it talks to are implementation, and belong in a spec.

Two things earn an interruption of the session:

- **A term conflicting with the glossary.** Say so as it is used, name the entry it collides with, and settle which one the project keeps. Drift to a synonym the glossary already lists under `_Avoid_` is the slow way a ubiquitous language stops being one.
- **Fuzzy or overloaded language.** When a word is carrying two meanings or none, propose the precise canonical term and get it agreed before it enters the glossary.

## Decisions

Apply the three-part bar as it stands in `decisions.md` — hard to reverse, surprising without context, the result of a real trade-off. All three, or it is not an ADR.

When the decision touches ground an ADR already covers, which way it moves decides the shape:

- **It sharpens** — a lower resolution makes the decision more precise and the earlier statement still holds. **Amend that ADR in place.**
- **It reverses** — the earlier statement is no longer true. **Write a new ADR superseding the old one.**

Everything else at altitude is **residue**: one line in this Effort's [`effort.md`](./references/templates/effort.md), under `Decisions`, no reasoning. It goes there so the children inherit it — architecting a child reads every ancestor's `effort.md` on its path.

## Report

Back to `/archie-architect` in one line per thing written, so the user sees the durable record grow as the session runs:

```md
_Recorded:_ **Order** in `CONTEXT.md` · ADR-0007 event-sourced orders · 2 decisions in `effort.md`.
```
