# The Epic tree

How the planning tree lives on disk, how its parts are named and referenced, and how its state is read off it.

## Shape

One directory per Epic, nested under `.archie/`. The filesystem is the tree, so there are no parent pointers to maintain and no orphans.

```
.archie/new-web-app/            root Epic, unnumbered
├── epic.md
├── 01-auth/                     Split Epic
│   ├── epic.md
│   └── 01-password-reset/       Specified Epic, a leaf
│       ├── epic.md
│       ├── spec.md
│       └── tasks/
│           └── 01-request-a-reset.md
└── 02-billing/                  thin Epic
    ├── epic.md
    ├── research/                 findings from `/archie-research`, one file per question
    └── prototypes/               single-file logic demos from `/archie-prototype`
```

Everything about a leaf sits inside the leaf, so a Task, its Spec and its Epic are reachable from one path with no pointer to resolve.

`.archie/` is **committed**, so work resumes on another machine, and **disposable**: the user removes a root Epic's tree whenever they pivot, mid-Epic included. Nothing is archived and there is no close ritual — `git log` keeps every version, so removal costs findability rather than content. Anything meant to outlive the tree reaches `CONTEXT.md` or `docs/adr/` during the session that decided it.

## Structural state is derived from the files

Read an Epic's state off its own files rather than off a status line. The same read says which planning step is next, so a session resumes an Epic without being told where it was left:

| Files present | State | Next planning step |
| --- | --- | --- |
| `epic.md` with no `## Decisions` heading | **thin** | scope it |
| child `NN-<slug>` directories | **Split** | none here — its children are scoped in the parent's build order |
| `epic.md` carrying `## Decisions`, no children, no `spec.md` | **scoped** | write its Spec |
| `spec.md` carrying `_Not yet designed._` | **Specified**, undesigned | design it |
| `spec.md` complete, no `tasks/` | **Specified** | slice it into Tasks |
| `tasks/` populated | **Specified** | none — hand a Task to the implementing phase |

Two **literal markers** carry the states a bare file listing cannot:

- `## Decisions` in `epic.md`, written by every scoping session whether or not it produced residue. With no residue it carries the single line `_None at this resolution._`. A thin child has no such heading, which is what tells a scoped Epic apart from one still awaiting its session.
- `_Not yet designed._`, standing alone under both `## Implementation Decisions` and `## Testing Decisions` in a freshly written `spec.md`, until the design session replaces them.

Neither can go stale, because the step that resolves the state is the step that rewrites the marker.

**Split and Specified are mutually exclusive.** An Epic carries child Epics or exactly one Spec, never both, so every Specified Epic is a leaf and listing leaves answers "what is left to build". Glue work therefore cannot hide at a parent: it becomes an explicit final child, which makes it schedulable and reviewable.

An Epic's directory and its `epic.md` are created **once**, when its scoping session's frontier empties — the intent and the decisions stop moving before they are written. The one exception is a session artifact: a `research/` finding or a logic prototype needs somewhere to go mid-session, so the first artifact creates the directory lazily and nothing else goes in it.

Only `NN-<slug>` directories are children. `research/` and `prototypes/` are session artifacts, and an Epic carrying them is still thin.

`prototypes/` holds only what has nowhere else to live: a logic demo is one self-contained HTML file, so it goes here. A **UI** prototype is mounted on the real route in the app source, because variants are only judgeable against the real header, sidebar and data — it lives on its own throwaway `prototype/<slug>` branch, and it is not a session artifact under `.archie/`.

A directory holding both children and a `spec.md` was hand-edited into an invalid state. Stop and surface it to the user.

## Progress is derived too

An Epic's progress is the state of the Tasks in its subtree, counted when it is asked for, and an Epic is complete when every Task beneath it is `done`. No status line lives in `epic.md`, so no status line can be stale.

## Identity numbering

A child directory is `NN-<slug>`, numbered from `01` by its parent at creation. The root Epic has a slug and no number.

- The number is **identity**, not order. It is assigned once and never renumbered, so every reference already written keeps resolving.
- Build **order** lives in the parent's ordered child list in `epic.md`. That list is the authority; `ls` order stops matching build order the moment children are reordered.
- Deleting a child leaves a gap, and gaps are never backfilled. Reusing a number would make an old reference resolve to a different Epic.
- A new child takes the next unused number and a position in the parent's list.

Tasks are numbered the same way inside a leaf's `tasks/` directory: `01-<slug>.md`, per leaf, never renumbered.

## Reference syntax

- **An Epic** is the identity numbers from the root down, dot-separated: `3.2` is child `02` of child `03` of the root. The root is named by its slug.
- **A Task** is its Epic, then `#`, then the Task's number: `3.2#1` is `tasks/01-<slug>.md` inside Epic `3.2`.

The separators differ so the two can never be read for each other: `3.2.1` is an Epic three levels down, while `3.2#1` is a Task inside a leaf two levels down. One separator would make every reference ambiguous about which kind of thing it names.
