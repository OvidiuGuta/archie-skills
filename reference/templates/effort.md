# Template: `effort.md`

One per Effort, at the root of its directory. Each part is written the moment it is known rather than batched at the end of a session.

```md
# {Title}

{One or two sentences of intent: what this Effort covers, in the project's language.}

## Decisions

- {One at-altitude decision settled at this resolution, in one line.}

## Children

1. `01-{slug}` — {one line of intent}
2. `02-{slug}` — {one line of intent}
```

- A **thin** Effort is the title and the intent alone. `Decisions` and `Children` appear once it has some.
- `Decisions` holds the residue: at-altitude decisions that reach neither `CONTEXT.md` nor an ADR, one line each and no reasoning. A decision needing more than a line belongs in `docs/adr/` — see [`../decisions.md`](../decisions.md).
- `Children` is the **build order** authority on a Split Effort. Reorder by moving lines; the directory names stay as they are. A Specified Effort has no `Children` section, and its `spec.md` and `tasks/` sit beside this file.
- No status line. Progress comes from the subtree's Tasks — see [`../effort-tree.md`](../effort-tree.md).
