# Recording decisions

An Architect session settles decisions at its resolution. Three destinations, disjoint, so nothing is written twice:

| What it is | Where it goes | Shape |
| --- | --- | --- |
| A domain term | `CONTEXT.md` at the repo root | a glossary entry |
| A decision clearing the ADR bar | `docs/adr/NNNN-<slug>.md` | a title and one to three sentences |
| Every other at-altitude decision | the Effort's own `effort.md` | one line, no reasoning |

Write each one **during** the session that settles it. The Effort tree is disposable and has no close step, so a decision still sitting in the conversation goes when the tree goes.

A decision that will not fit in one line needed its reasoning, which means it clears the ADR bar. That rule is what keeps `effort.md` from growing into a spec. Sub-bar decisions die with the tree, which is correct: by then the code encodes them, and nothing durable depended on them.

## `CONTEXT.md`

One `CONTEXT.md` at the repo root. This framework is single-context: there is no context map and no per-package glossary. Create the file when the first term resolves.

```md
# {Context name}

{One or two sentences on what this context is and why it exists.}

## Language

**Order**:
{One or two sentences on what the term is.}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request
```

- **Be opinionated.** Where several words name one concept, pick the best and list the rest under `_Avoid_`.
- **Keep definitions tight** — one or two sentences, saying what the term *is* rather than what it does.
- **Include only terms specific to this project's domain.** General programming concepts stay out, however heavily the project uses them.
- **Group under subheadings** once natural clusters emerge. A flat list is fine until then.
- **Challenge a conflicting term the moment it is used**, so the language stays sharp instead of drifting to synonyms the glossary avoids.

## `docs/adr/`

One directory at the repo root, sequential filenames from `0001-<slug>.md`. Scan for the highest number and add one. Create the directory when the first ADR needs it.

```md
# {Short title of the decision}

{One to three sentences: the context, what was decided, and why.}

## Consequences

- {A non-obvious downstream effect.}
```

An ADR can be a single paragraph. `Consequences` earns its place only when the effects are non-obvious; `Status`, `Considered Options` and the rest are for the rare ADR that genuinely needs them.

### The bar

The standard bar, unchanged for this framework. All three hold:

1. **Hard to reverse** — changing your mind later costs something real.
2. **Surprising without context** — a future reader will read the code and wonder why.
3. **The result of a real trade-off** — there were genuine alternatives and one was picked for reasons.

Offer ADRs sparingly. An easy-to-reverse decision gets reversed, an unsurprising one raises no questions, and one with no alternative records only that the obvious thing was done.

Work that qualifies: architectural shape, technology choices carrying lock-in, boundary and scope decisions including the explicit no-s, deliberate deviations from the obvious path, constraints invisible in the code, and rejected alternatives whose rejection was subtle.

### Amend on sharpening, supersede on reversal

ADRs are living documents.

- **Sharpening** — a lower resolution makes an existing decision more precise and the earlier statement still holds. **Amend the ADR in place**, so `docs/adr/` states current truth instead of a chain to follow. The ADRs are committed, so `git log` is already the audit trail.
- **Reversal** — the earlier statement is no longer true. **Write a new ADR that supersedes the old one**, so a deliberate change of mind stays visible.

## Inheritance

Architecting a child reads `effort.md` at every ancestor on its path, alongside `CONTEXT.md` and the ADRs touching the area. Inherited decisions stay where they were written: copying them onto children would contradict thin children and would need backfilling every time an ancestor settles something after the split.

A decision that spans siblings is settled at the parent, so no sibling inherits a decision it never weighed in on.

## When output contradicts an ADR

Surface the conflict rather than quietly overriding it:

> _Contradicts ADR-0007 (event-sourced orders), and worth reopening because…_
