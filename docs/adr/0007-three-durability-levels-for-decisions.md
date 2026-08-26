# Decisions are recorded at three durability levels

An Architect session settles decisions at its resolution. Where each one is written depends on what it is, and the three destinations are disjoint, so nothing is recorded twice.

- **`CONTEXT.md`** — domain terms. The glossary, and nothing else.
- **`docs/adr/`** — decisions clearing the standard bar: hard to reverse, surprising without context, the result of a real trade-off. The bar is **not** lowered for this framework.
- **The Effort's own `effort.md`** — every other at-altitude decision. One line each, no reasoning.

Child Efforts **inherit** by walking up their path: architecting `3.2` reads `effort.md` at the root, at `3`, and at `3.2`, alongside `CONTEXT.md` and the ADRs touching the area. Inherited decisions are never copied onto children, which would contradict thin children and would need backfilling whenever a decision is settled after the split.

ADRs are **living** documents. A lower resolution sharpening a decision amends the ADR in place, because the earlier statement is still true and a second file would be a fuller copy of the first. Only a *reversal*, where the earlier statement is no longer true, writes a new ADR that supersedes the old one. Amending in place is safe because the ADRs are committed and `git log` is already the audit trail.

## Consequences

- A self-regulating rule keeps `effort.md` from bloating into a spec: if a decision needs more than a line, it needed the reasoning, which means it clears the ADR bar and belongs in `docs/adr/`.
- Sub-bar decisions die with the tree when the user deletes it. That is correct: by then the code encodes them, and nothing durable depended on them.
- `/domain-modeling`'s "offer ADRs sparingly" guidance survives unchanged, because the residue now has somewhere to go.
- `effort.md` holds a title, an intent, the decisions settled at this resolution, and, for a Split Effort, the ordered child list. Everything in it is written at the moment it is known.
