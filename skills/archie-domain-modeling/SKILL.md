---
name: archie-domain-modeling
description: Build and sharpen a project's domain model — pin down domain terminology, keep a ubiquitous language honest, and record architectural decisions as ADRs. Use when the user wants to nail down terms or record a decision, or when another skill needs the domain model maintained.
---

# Domain modeling

Actively build and sharpen the domain model as the design happens. This is the active discipline — challenging terms, keeping the model and the code in agreement, and writing things down the moment they crystallise. Merely *reading* `CONTEXT.md` for vocabulary is not this skill; that is a one-line habit any skill can have.

Two destinations, disjoint, so nothing is written twice: a **domain term** goes to `CONTEXT.md`, and a **decision clearing the ADR bar** goes to `docs/adr/`. Read [`references/CONTEXT-FORMAT.md`](./references/CONTEXT-FORMAT.md) and [`references/ADR-FORMAT.md`](./references/ADR-FORMAT.md) for the shape of each. Anything settled that is neither is the caller's to keep.

Create both **lazily** — the first term and the first ADR bring their file into existence. A repo that never needed either does not carry an empty one.

**Write as it resolves, never at the end.** A conversation is not storage: a term or a decision still sitting in the transcript when the session closes is one nobody recorded.

## Terms

Every term goes in the moment it resolves, definition and `_Avoid_` list together.

Two things earn an interruption of the session:

- **A term conflicting with the glossary.** Say so as it is used, name the entry it collides with, and settle which one the project keeps. Drift to a synonym the glossary already lists under `_Avoid_` is the slow way a ubiquitous language stops being one.
- **Fuzzy or overloaded language.** When a word is carrying two meanings or none, propose the precise canonical term and get it agreed before it enters the glossary. "You said *account* — do you mean the Customer or the User? Those are different things."

## Check the model against the code

When someone states how something works, check whether the code agrees, and surface the contradiction rather than recording the claim: "your code cancels whole Orders, but you just said partial cancellation is possible — which is right?"

This is the check no other skill makes. A glossary that quietly disagrees with the codebase is worse than none, because it is read as authority.

## Decisions

Apply the three-part bar, and all three parts hold or it is not an ADR:

1. **Hard to reverse** — changing your mind later costs something real.
2. **Surprising without context** — a future reader will read the code and wonder why.
3. **The result of a real trade-off** — there were genuine alternatives and one was picked for reasons.

Offer ADRs sparingly: an easy-to-reverse decision gets reversed, an unsurprising one raises no questions, and one with no alternative records only that the obvious thing was done. What qualifies is architectural shape, technology choices carrying lock-in, boundary and scope decisions including the explicit no-s, deliberate deviations from the obvious path, constraints invisible in the code, and rejected alternatives whose rejection was subtle.

A decision that will not fit in one line needed its reasoning, which means it clears the bar. That test is self-regulating in both directions: it keeps the ADR set from filling with one-liners, and it stops a real trade-off being filed away as a note.

When the decision touches ground an ADR already covers, whether it sharpens or reverses decides the shape — see [`references/ADR-FORMAT.md`](./references/ADR-FORMAT.md).

**A decision contradicting an existing ADR earns an interruption.** Name the ADR and what it decided, say what the contradiction is, and settle whether the old decision is being sharpened or reversed before anything is written. A skill that noticed the conflict hands it here rather than resolving it, so the choice between amending in place and superseding is made once, by whoever is about to write the file.

## Say what you wrote

One line, as you write it, so the durable record is visible while the session runs rather than discovered afterwards:

```md
_Recorded:_ **Order** in `CONTEXT.md` · ADR-0007 event-sourced orders.
```
