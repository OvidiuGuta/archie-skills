---
name: archie-architect
description: Archie's planning router — read which step an Epic is at, run that one step, report where it now stands. Run it on a loose idea or on an Epic reference like 3.2, as many times as it takes.
disable-model-invocation: true
---

# Architect

Planning is four steps, each ending on a user sign-off: **scope** the what, write the **Spec**, **design** the how, cut the **Tasks**. You are the router over them. Resolve the reference, read which step this Epic is at off its own files, run that one step, say where the Epic now stands, and stop.

Read [`references/epic-tree.md`](./references/epic-tree.md) first. It fixes the tree on disk, the reference syntax and the literal markers the routing table below reads.

**One interview per invocation.** Two interviews in one window is the context problem this design exists to avoid. A step that holds one — `/archie-scope`, `/archie-design` — carries its own synthesis to the end of the same session rather than handing it to a window that would read it off a file, so the four steps run as two sessions: scope and Spec, then design and Tasks. That chaining is the step's own, stated in its hand-off; you dispatch one step and read the state again afterwards.

You hold no discipline of your own. Every judgement below belongs to the step you dispatch, and each step is also callable directly by name when the user already knows which one they want.

## 1. Resolve

**A loose idea** — no reference, just a subject. There is nothing on disk yet, so the step is **scope**, on a new root Epic.

**An Epic reference** — `3.2`, or a root's slug. Resolve it down the numbered directories under `.archie/` and read the files present. A reference that does not resolve goes back to the user rather than being guessed at.

No `.archie/` at all is a repo that has never been planned. That is not an error: it is a loose idea with no name yet.

## 2. Read the state, name the step

Read it off the files, using the table in `epic-tree.md`. Nothing records this, so nothing about it can be stale:

| What you find | The step |
| --- | --- |
| a loose idea, or `epic.md` with no `## Decisions` heading | `/archie-scope` |
| child `NN-<slug>` directories | none here — name the children's states and ask which to open |
| `epic.md` carrying `## Decisions`, no children, no `spec.md` | `/archie-to-spec` |
| `spec.md` carrying `_Not yet designed._` | `/archie-design` |
| `spec.md` complete, no `tasks/` | `/archie-to-tasks` |
| `tasks/` populated | none — the leaf is planned; name `/archie-implement` and the Task to start with |

**Say the step before you run it**, in one line, so the user can redirect you into a different one:

```md
`3.2` has a Spec and no design yet. Running `/archie-design`.
```

The user overrules this freely. Re-scoping a leaf that already has Tasks, re-slicing after a change of mind, designing again after a pivot — all legitimate, and all reached by them naming the step rather than by you inferring it. Where the step they name drops work that already exists, say what it drops and let them confirm.

## 3. Run the step, then stop

Invoke the step **inline, in this conversation**. It is a session with the user, not a sub-agent: hiding it in a sub-agent would hide the interview.

When it returns, close with two lines — what the session settled, chained synthesis included, and what running `/archie-architect` again will do next:

```md
_Designed and sliced:_ `3.2` — three endpoints, one new package, tests at the existing API seam, four Tasks.
_Next:_ `/archie-implement 3.2#1`.
```

Then stop. The next step is the user's to start, in a fresh window if they want one.
