# The Epic tree is committed, disposable, and nested on disk

Epics live as nested directories under `.archie/`, one directory per Epic, containing `epic.md` and, for a Specified Epic, `spec.md` and `tasks/NN-<slug>.md`. The filesystem is the tree, so there are no parent pointers to maintain and no orphans.

Directory names carry a **stable identity number** assigned per parent on creation and never renumbered, plus a slug: `.archie/new-web-app/03-auth/02-password-reset/`. Build **order** is declared in the parent's child list, not in the numbers, so reordering and inserting children never renames a directory or invalidates a reference. Epics are referenced in dotted form (`3.2`); tasks use a separate separator (`3.2#1`) so a task reference can never be confused with an Epic's.

The tree is **committed** so work can resume on another machine, and **disposable**: the user removes a root Epic's tree whenever they like, including mid-Epic when they pivot. Nothing is archived and there is no close ritual. Git history retains every version, so removal costs findability, not the content.

An Epic's own files are written **once per session, when its frontier empties**, not as the session goes. The intent line would otherwise be written at the moment of least knowledge and rewritten by what the interview learns, and an abandoned session would leave a directory behind. Only the durable levels — `CONTEXT.md` and `docs/adr/` — are written as they settle, and the residue is held in the session until the write, since it is the level defined to die with the tree anyway ([0007](0007-four-durability-levels-for-decisions.md)).

## Consequences

- Everything about a leaf sits inside the leaf, so `/archie-implement` reaches the task, its spec, and its Epic from one path with no pointer to resolve. `spec.md` still carries a redundant `Epic:` line so it remains self-describing when handed to a sub-agent as bare text.
- `ls` order stops matching build order after a reorder. The parent's child list is the authority.
- Deletions leave gaps in the numbering. Gaps are never backfilled, because reusing a number would make an old reference resolve to a different Epic.
- Because the tree is disposable and has no close step, anything meant to outlive it must reach `CONTEXT.md` or `docs/adr/` **during** the architect session that decided it. `/archie-domain-modeling` is therefore load-bearing in every architect session, not optional.
- The write lands in the same turn as the split-or-specify recommendation, so the recommendation is the diff: the user reads what was settled and what is proposed about it together. Children are the exception, written after the call, because which children exist is the user's.
- A session that dies before its frontier empties loses the intent and the residue and keeps the terms and ADRs. That is the same loss a pivot already costs, by design.
- A `research/` finding or a logic prototype still needs a destination mid-session, so the first session artifact creates the Epic's directory lazily. A directory holding artifacts and no `epic.md` is a session in progress.
- `.archie/` must not be gitignored. A dot-directory reads as generated or disposable to most ignore files, so `/archie-setup` probes for it explicitly rather than assuming.
