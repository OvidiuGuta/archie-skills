# Where a decision goes, and how it is written

Three destinations, disjoint, so nothing is written twice:

| What it is | Where it goes | Shape |
| --- | --- | --- |
| A domain term | `CONTEXT.md` at the repo root | a glossary entry |
| A decision clearing the ADR bar | `docs/adr/NNNN-<slug>.md` | a title and one to three sentences |
| Every other at-altitude decision | the Epic's own `epic.md` | one line, no reasoning |

Write each one **during** the session that settles it. The Epic tree is disposable and has no close step, so a decision still sitting in the conversation goes when the tree goes.

A decision that will not fit in one line needed its reasoning, which means it clears the ADR bar. That rule is what keeps `epic.md` from growing into a spec.

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

## `docs/adr/`

One directory at the repo root, sequential filenames from `0001-<slug>.md`. Scan for the highest number and add one. Create the directory when the first ADR needs it.

```md
# {Short title of the decision}

{One to three sentences: the context, what was decided, and why.}

## Consequences

- {A non-obvious downstream effect.}
```

An ADR can be a single paragraph. `Consequences` earns its place only when the effects are non-obvious; `Status`, `Considered Options` and the rest are for the rare ADR that genuinely needs them.
