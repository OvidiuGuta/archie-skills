# The Effort tree is committed, disposable, and nested on disk

Efforts live as nested directories under `.archie/`, one directory per Effort, containing `effort.md` and, for a Specified Effort, `spec.md` and `tasks/NN-<slug>.md`. The filesystem is the tree, so there are no parent pointers to maintain and no orphans.

Directory names carry a **stable identity number** assigned per parent on creation and never renumbered, plus a slug: `.archie/new-web-app/03-auth/02-password-reset/`. Build **order** is declared in the parent's child list, not in the numbers, so reordering and inserting children never renames a directory or invalidates a reference. Efforts are referenced in dotted form (`3.2`); tasks use a separate separator (`3.2#1`) so a task reference can never be confused with an Effort's.

The tree is **committed** so work can resume on another machine, and **disposable**: the user removes a root Effort's tree whenever they like, including mid-Effort when they pivot. Nothing is archived and there is no close ritual. Git history retains every version, so removal costs findability, not the content.

## Consequences

- Everything about a leaf sits inside the leaf, so `/archie-implement` reaches the task, its spec, and its Effort from one path with no pointer to resolve. `spec.md` still carries a redundant `Effort:` line so it remains self-describing when handed to a sub-agent as bare text.
- `ls` order stops matching build order after a reorder. The parent's child list is the authority.
- Deletions leave gaps in the numbering. Gaps are never backfilled, because reusing a number would make an old reference resolve to a different Effort.
- Because the tree is disposable and has no close step, anything meant to outlive it must reach `CONTEXT.md` or `docs/adr/` **during** the architect session that decided it. `/archie-domain-modeling` is therefore load-bearing in every architect session, not optional.
- `.archie/` must not be gitignored. A dot-directory reads as generated or disposable to most ignore files, so `/archie-setup` probes for it explicitly rather than assuming.
