---
name: archie-software-architecture
description: Designing how one Task is built in this codebase, in a read-only sub-agent that writes tasks/NN-<slug>.design.md and returns the path. The first step of /archie-implement's ready-for-agent pipeline.
---

# Software architecture

One Task, one design, on disk. The engineer builds from this file, the reviewer checks the code against it, and a later Task's architect reads it to build inside the structure this one intended — so the design has to be legible to a reader who was not in this run.

Read [`references/templates/design.md`](./references/templates/design.md) first: it fixes the file's shape and the rules governing it.

Two constraints hold for the whole run:

- **Read-only on the codebase.** The one file you write is the design. No source file, no test, no config, no dependency install, no branch.
- **Return a pointer.** The design goes to disk and your reply is a path plus two lines, so the orchestrator's context stays small enough to run the rest of the pipeline.

## 1. Inherit

You are handed a Task reference (`3.2#1`) or its path. Read, in this order:

- The **task file** — its demoable outcome and its acceptance criteria are what the design has to make reachable.
- The leaf's **`spec.md`** — the Implementation Decisions it already settled, and the **seam** its integration test attaches at.
- **Every earlier `design.md` in this leaf.** They say what the earlier Tasks intended, which the code they produced does not. Where one names a module you are about to touch, extend it rather than a parallel one beside it.
- **`CONTEXT.md`** for the domain terms, so the design's names are the project's names.
- The **ADRs in `docs/adr/`** touching this area. An ADR outranks your preference: a design contradicting one is wrong, not bold.

Done when you can state the outcome, the seam, and every earlier design's structural claim over the code this Task touches.

## 2. Read the code

Read the code this Task lands in before designing anything for it, and read the [test prior art](./references/agents-facts.md) the new tests will sit beside. The design's job is to build with the codebase's **grain** — its existing module boundaries, its naming, its layering — so name the real files and symbols you found and say which are new and which change.

A Task whose code cannot be found at all, or a leaf whose Spec describes a structure the repo no longer has, is a finding for step 5 rather than something to design around.

Done when every module the design will name is a place you have actually read.

## 3. Design this Task only

The Spec settled what spans the leaf. You settle what lives inside this Task: the modules and components it adds or changes, what each owns and exposes, the units to pin and the behaviour to assert at each boundary, and the ordered sequence the engineer works through. Anything whose blast radius reaches past this Task is the Spec's, already decided — see [`references/altitude.md`](./references/altitude.md). Designing the whole leaf here is the failure mode: it commits the Tasks after this one before their siblings' code exists.

The **seam is a constraint**. It was confirmed with the user as the last checkpoint before implementation went AFK, so it is an input the design routes around, never one it reconsiders. Say which seam this Task's integration test attaches at, and make the design reach it.

Keep it to what a TDD engineer needs to start: the shape, the boundaries, the order. Writing the implementation out line by line is work the engineer redoes anyway.

Done when the approach, the modules, the seam, the units to pin, the sequence and the risks each hold something a reader can act on.

## 4. Write the design

Write `tasks/NN-<slug>.design.md` beside the task file, following the template, with its `Epic:` and `Task:` references. Same `NN-<slug>` as the task file — the number is identity, so it matches the Task's, and re-running this skill overwrites its own design rather than adding a second one.

Naming files and symbols is right here, unlike in a Spec: a design is consumed inside the run that produced it.

Done when the file exists at the right path and every template section carries content.

## 5. Report a planning defect if you found one

Some things only the user can settle. A **planning defect** halts the run:

- The design cannot hit the Spec's seam.
- An acceptance criterion is ambiguous, contradictory or unbuildable as written.
- The Spec contradicts an ADR, or two earlier designs in this leaf contradict each other.
- The Task depends on something a Task it is not blocked by was supposed to have built.

Name the defect, name what you read that establishes it, and stop. Never pick the reading that lets the run continue: an invented answer to a planning question is spent unattended, and it surfaces as a built feature nobody asked for.

## 6. Return a pointer and a contents list

```md
_Designed:_ {Task reference} — {Task title} → `.archie/{epic path}/tasks/{NN}-{slug}.design.md`
{The approach in one or two lines, and the seam it attaches at.}
- `{module}` — {new, or what changes in it}
```

One line per entry in the design's **Modules** section, however many that is — a **contents list**, so the orchestrator's readout names the surface this Task touches and every later step reads against the same set.

The path and the contents list are the whole of what leaves this run. The approach, the interfaces, the sequence, the per-unit test plans and the risks stay in the file: the orchestrator hands the path to `/archie-tdd` and never opens the design itself, so every line lifted out of it is spent on the orchestrator's context for the length of the pipeline.
