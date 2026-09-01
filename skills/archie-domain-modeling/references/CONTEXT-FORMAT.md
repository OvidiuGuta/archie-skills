# `CONTEXT.md`

One `CONTEXT.md` at the repo root, and one only. Two competing glossaries in a single repo is the failure mode: there is no context map and no per-package glossary. Create the file when the first term resolves.

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
- **No implementation.** How a term is stored, when it is validated and what it talks to belong in a spec. This file is a glossary and nothing else.
- **Group under subheadings** once natural clusters emerge. A flat list is fine until then.
