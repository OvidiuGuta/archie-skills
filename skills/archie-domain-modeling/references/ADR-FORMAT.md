# `docs/adr/`

One directory at the repo root, sequential filenames from `0001-<slug>.md`. Scan for the highest number and add one. Create the directory when the first ADR needs it.

```md
# {Short title of the decision}

{One to three sentences: the context, what was decided, and why.}

## Consequences

- {A non-obvious downstream effect.}
```

An ADR can be a single paragraph — the value is in recording *that* a decision was made and *why*, not in filling out sections. `Consequences` earns its place only when the effects are non-obvious; `Status`, `Considered Options` and the rest are for the rare ADR that genuinely needs them.

A decision that will not fit in one line needed its reasoning, which is the same thing as clearing the bar.

## Amend or supersede

ADRs are living documents.

- **A sharpening** — the decision gets more precise and the earlier statement still holds. **Amend that ADR in place.** A second file would be a fuller copy of the first, and `git log` is already the audit trail.
- **A reversal** — the earlier statement is no longer true. **Write a new ADR superseding the old one**, linking it.
