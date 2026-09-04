# Reshaping a tree that already exists

Three branches change the shape of a tree rather than growing one: **re-scoping** a leaf `/archie-design` sent back, the **size backstop** on a specifiable Epic too big to build as one leaf, and **editing** children that already exist. `epic-tree.md` fixes the mechanics all three run under.

## Re-scope, when you were called to repair

`/archie-design` sends a leaf back here when the how reveals the boundary is wrong. Two shapes, and the user has already chosen which:

- **The leaf is too big.** The understanding holds; the unit does not. Run the size backstop below. No re-interviewing.
- **The understanding is wrong.** Interview from step 2 with the design session's finding on the frontier, and rewrite the intent and `## Decisions` in step 4.

Either way, **`spec.md` is dropped** the moment the Epic gains children, because Split and Specified are mutually exclusive. Say what the Spec covered before deleting it, and if `tasks/` exists say what state its Tasks are in — a Task at `in-progress` or `ready-for-review` was built against the Spec about to disappear.

## The size backstop

Applies only after the call is **specify**. A specifiable Epic can still be too large to build as one leaf — one Spec and a task list nobody wants to run.

Slice it into children on **mechanical** lines: sequence, surface, one deployable step at a time. This is not a resolution question and it does not reopen the interview — the understanding is complete, the unit is just too big. Say that to the user when you propose the slices, so a split arriving after a specify recommendation does not read as a new round of questions.

## Editing the tree

The tree is a hypothesis, so children can be added, deleted, reordered or further split at any time, in this session or a later one.

**A Specified child is different.** Reordering it, or changing its scope, means the siblings scoped around it may no longer hold. Say so explicitly before touching it:

```md
_Heads up:_ `02-password-reset` is Specified. Moving it after `03-sessions` means its Spec was written assuming sessions did not exist yet.
```

Name what was scoped around it and what may now be stale, then let the user decide. Editing it silently hands them a tree that no longer means what they think it does.
