# How the skills bind

Every skill finds its row in the human's flows by description, never by name. These are the rows the skills need, what a row's description says for a need to bind to it, and what setup proposes when none does.

## Binding

Each need ends as one of three:

- **Binds**: exactly one row clearly fits. Report it by name.
- **Gap**: no row fits. Propose one.
- **Several**: more than one row fits. Propose the one that should win, keeping its name, with its description sharpened so the others no longer read as fitting, and name the others.

A Status binds through its `**Next:**` line, and a skill named on several Statuses' lines binds to each, since one step can move an Epic on from more than one Status. A Status need is therefore a gap or binds. Beside the needs, flag any Status whose `Next:` line names a skill outside this bundle, since `/archie-architect` stops on an Epic there.

## The needs

### Task Types, from the Index

| Need | A fitting description says it is | Used by | Proposed name |
| --- | --- | --- | --- |
| An Epic | a body of planned work, refined from an intent into child Epics or one Spec sliced into Tasks | `/archie-architect` and the four planning steps | Epic |
| A Task | one demoable slice of a leaf Epic, built and reviewed on its own | `/archie-to-tasks` creates it, `/archie-implement` and `/archie-tdd` build it | Task |
| A leaf's closing Task | the closing Task of a leaf Epic, proving the leaf holds at its seam | `/archie-to-tasks` creates it, `/archie-verify` works it | Verification |

### Statuses, from `get_workflow`

Read `get_workflow {name}` for the Workflow the Index names beside the Epic Type and the Task Type bound above. When either Type is a gap, its Workflow's needs are reported unchecked, since there is no Workflow to read.

| Need: a Status whose `Next:` line names | Read in the Workflow of | Proposed name, Workflow and group |
| --- | --- | --- |
| `/archie-scope` | the Epic Type | Thin, Epic, `to-do` |
| `/archie-to-spec` | the Epic Type | Scoped, Epic, `in-progress` |
| `/archie-design` | the Epic Type | Specified, Epic, `in-progress` |
| `/archie-to-tasks` | the Epic Type | Designed, Epic, `in-progress` |
| `/archie-implement` | the Epic Type or the Task Type | Sliced, Epic, `in-progress` |
| `/archie-review` | the Epic Type or the Task Type | In review, Task, `in-progress` |

### Labels, from the Index

| Need | A fitting description says it holds | Used by | Proposed name |
| --- | --- | --- | --- |
| Decisions | a decision recorded on a Project, one Note per decision | `/archie-domain-modeling`, recording an ADR | adr |
| Terms | a glossary term of a Project, one Note per term | `/archie-domain-modeling`, sharpening a term | term |

### Agents, from the Index

| Need | A fitting description leads with | Used by | Proposed name |
| --- | --- | --- | --- |
| Planning | planning: scoping, specifying, designing and slicing Epics | `/archie-setup`, `/archie-architect`, `/archie-scope`, `/archie-to-spec`, `/archie-design`, `/archie-to-tasks` | Architect |
| Building | building: implementing Tasks test-first | `/archie-implement`, `/archie-tdd`, `/archie-verify`, `/archie-assist` | Engineer |
| Reviewing | reviewing: grading finished work and fixing the findings the human accepts | `/archie-review` | Reviewer |

## Proposing a row

Each proposal carries:

- **Name**: the proposed name above, or the existing row's name for a several.
- **Group**, for a Status only: `to-do`, `in-progress` or `complete`, with the Workflow it joins.
- **Description**: a one-line summary first, since the Index shows only that line, then what the row is for in the words of its need above. A Status's description ends on its `Next:` line, on a line of its own:

```md
**Next:** `/archie-design` designs it, then sets the Status whose description fits a designed Epic.
```

## The report

One row per need, then one proposal per gap or several:

```md
| Need | Binds to | |
| --- | --- | --- |
| Type for an Epic | **Epic** | binds |
| Status naming `/archie-review` | — | gap |
| Agent for reviewing | **Reviewer**, **Engineer** | several |

**Status naming `/archie-review`**: `In review`, group `in-progress`, in the Task Workflow.

> Built and waiting for the human's review.
>
> **Next:** `/archie-review` grades it, then sets the Status whose description fits a reviewed Task.
```
