---
name: archie-to-spec
description: Writing one Effort's spec.md — synthesise the Architect session that just happened, then fix the integration seams with the user. Run it once the call on an Effort is specify.
disable-model-invocation: true
---

# To spec

The Effort's Architect session reached understanding; this turns that understanding into the `spec.md` a sub-agent can build from. It is also **the last human checkpoint before testability is baked in**: everything after `/archie-to-tasks` runs AFK, and a seam chosen wrong is not retrofitted cheaply.

Read [`references/templates/spec.md`](./references/templates/spec.md) first. It fixes every section of the file and the rules governing them. Also read [`references/altitude.md`](./references/altitude.md), which is what decides how much of the design belongs here rather than in a Task's own design.

You write `spec.md` and nothing else. Slicing it into Tasks is `/archie-to-tasks`.

## 1. Open the Effort

The Effort is the one the session in context just architected, or the reference the user passed (`3.2`, or a root's slug), resolved down the numbered directories — see [`references/effort-tree.md`](./references/effort-tree.md).

A **Split** Effort stops the run. Split and Specified are mutually exclusive, so the Spec belongs to one of its leaves: name the children and ask which one. An Effort that already holds a `spec.md` is being re-specified — say what the existing Spec covers and get the overwrite agreed before touching it.

Done when you hold one Effort that carries an `effort.md`, no child directories, and the user's call to specify it.

## 2. Synthesise, do not re-interview

The answers are already yours. The session settled them question by question, `/archie-domain-modeling` wrote the durable ones down, and `/archie-research` and `/archie-prototype` returned the rest. Asking again spends the user's attention on things they have already decided, and it is the one thing this skill must not do. The seams in step 3 are the only questions you ask.

Assemble the Spec's material from what the session produced: the intent and `Decisions` in `effort.md`, the terms and ADRs the session wrote, the findings under `research/`, and the answers the prototypes provoked.

**When the session is not in context** — a fresh session running `/archie-to-spec 3.2` — read it off disk instead: this Effort's `effort.md`, every ancestor's `effort.md` up the path, `CONTEXT.md`, the ADRs touching this area, the earlier siblings' code, and this Effort's own `research/` and `prototypes/`. A question that genuinely never got answered goes back to the user as a question, one at a time; a gap you can close by reading is not one of them.

Write in the glossary's vocabulary throughout, and respect the ADRs in the area. Where the synthesis contradicts one, **surface the conflict** rather than quietly overriding it — the wording is in [`references/decisions.md`](./references/decisions.md).

Done when every section of the template has its material, and you can say for each one which part of the session it came from.

## 3. Fix the seams, with the user

A **seam** is where the feature's integration tests attach. It spans all of the leaf's Tasks, which is what puts it at altitude for the Spec and leaves each module's internals to that Task's own design.

Propose them under three constraints, in this order:

- **Prefer an existing seam.** The repo's integration test prior art — named in the [facts section](./references/agents-facts.md) of `AGENTS.md` — already shows where this codebase attaches tests. A new seam is test surface the project has to keep working.
- **Sit as high as possible.** A high seam survives the refactors underneath it; a low one pins the internals the per-Task designs are supposed to choose.
- **Use as few as possible.** One is ideal.

Present the proposal with the reasoning, and get it confirmed:

```md
_Seams:_ the HTTP route handler, as in `apps/api-e2e/src/api/shift.spec.ts`. One seam covers all four Tasks, and the scheduling internals stay free to move.
```

Done when the user has confirmed the seams, in their words. This is a checkpoint, not a notification: it does not pass on silence.

## 4. Write the Spec

Write `spec.md` beside the Effort's `effort.md`, following the template exactly, `Effort:` reference included — a sub-agent handed the Spec as bare text has nothing else to tell it what it belongs to.

Two rules earn restating, because they are what keeps a Spec true weeks later:

- **No file paths and no code.** They go stale within the week, and the Task's design and the code itself are where that detail lives. The single exception is a snippet a prototype produced that encodes a decision more precisely than prose can — a state machine, a schema, a type shape. Inline the decision-rich part and say which prototype it came from.
- **`User Stories` is long.** Every aspect of the work, one story each, in the template's `As a … I want … so that …` form. `/archie-to-tasks` slices against this list, so a thin list hides work rather than removing it.

Anything the session settled that reaches past this Effort belongs in `CONTEXT.md` or `docs/adr/`, not only in the Spec: the tree is disposable and the Spec goes with it. Invoke `/archie-domain-modeling` on anything still unrecorded before you finish.

Done when `spec.md` exists, every section carries content, the seams in `Testing Decisions` are the confirmed ones, and no `Implementation Decisions` line names a path.

## 5. Hand off

Report in two lines — the path, and the seams as confirmed — then name `/archie-to-tasks` as the next move and stop. The Effort is now **Specified**, and its Tasks are that skill's to write.
