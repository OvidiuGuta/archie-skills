# Template: `{NN}-{slug}.design.md`

One per Task, beside its task file, written by `/software-architecture` in a read-only sub-agent. The engineer, the reviewer and the user all read this same file.

It lives on disk rather than being relayed through the orchestrator, so the orchestrator's context stays small, the reviewer can check the code against the design it claims to follow, and a later Task's architect reads what the earlier Tasks intended — which the code alone does not say.

```md
# Design: {NN} — {Task title}

**Effort:** {3.2}
**Task:** {3.2#1}

## Approach

{The shape of the change in two or three sentences.}

## Modules

- {module, component or service} — {what it owns, what it exposes, whether it is new or changed}

## Seam

{The Spec's seam this Task's integration test is written at.}

## Units to pin

- {unit} — {the behaviour to assert at its boundary}

## Sequence

1. {The ordered steps the engineer takes.}

## Risks

- {What could go wrong, and what to watch while building.}
```

- Read the earlier Tasks' designs in this leaf first, and build inside the structure they intended.
- The Spec's seam is a **constraint**, not an input to reconsider. A design that cannot hit it is a planning defect: halt and surface it to the user. See [`../altitude.md`](../altitude.md).
- Naming files and symbols is fine here. A design is consumed within the run that produced it, unlike a Spec, which outlives its paths.
