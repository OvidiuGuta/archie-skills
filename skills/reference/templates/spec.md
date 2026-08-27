# Template: `spec.md`

Exactly one per Specified Effort, beside its `effort.md`. `/to-spec` writes it by synthesising the Architect session that just happened rather than interviewing again.

```md
# Spec: {Title}

**Effort:** {3.2}

## Problem Statement

The problem, from the user's perspective.

## Solution

The solution, from the user's perspective.

## User Stories

A long, numbered list covering every aspect of the work: `As a {actor}, I want {feature}, so that {benefit}`.

## Implementation Decisions

The modules built or changed and the interfaces they expose, schema changes, API contracts, specific interactions, and the technical clarifications the session produced.

## Testing Decisions

The **seams** the feature is tested at, and the prior art the new tests should match.

## Out of Scope

What this Spec deliberately leaves out.

## Further Notes

Anything the next reader needs and nothing above carries.
```

- `Effort:` keeps the Spec self-describing when a sub-agent is handed it as bare text.
- **No file paths and no code snippets** in `Implementation Decisions` — they go stale within the week. The one exception is a snippet a prototype produced that encodes a decision more precisely than prose can (a state machine, a schema, a type shape): inline the decision-rich part and say where it came from.
- **Seams are the last human checkpoint before testability is baked in**, because implementation runs AFK and a seam cannot be retrofitted cheaply. Prefer existing seams, sit as high as possible, and use as few as possible — one is ideal. Confirm them with the user before writing the Spec.
- Seams span all of a leaf's Tasks, which is what puts them at altitude for the Spec and leaves module internals to each Task's design. See [`../altitude.md`](../altitude.md).
- No status line. Statuses live on Tasks — see [`../effort-tree.md`](../effort-tree.md).
