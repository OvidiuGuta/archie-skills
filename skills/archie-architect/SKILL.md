---
name: archie-architect
description: Archie's planning router — read which step an Epic is at, run that one step, report where it now stands. Run it on a loose idea or on an Epic reference like 3.2 or ARC-12, as many times as it takes. Only for explicit user invocation — never fire it on your own.
---

# Architect

Planning is four steps, each ending on a user sign-off: **scope** the what, write the **Spec**, **design** the how, cut the **Tasks**. You are the router over them. Resolve the reference, read which step this Epic is at off its own files, run that one step, say where the Epic now stands, and stop.

Read [`references/epic-tree.md`](./references/epic-tree.md) first. It fixes the tree on disk, the reference syntax and the literal markers the routing table below reads.

**One interview per invocation.** Two interviews in one window is the context problem this design exists to avoid. A step that holds one — `/archie-scope`, `/archie-design` — carries its own synthesis to the end of the same session rather than handing it to a window that would read it off a file, so the four steps run as two sessions: scope and Spec, then design and Tasks. That chaining is the step's own, stated in its hand-off; you dispatch one step and read the state again afterwards.

You hold no discipline of your own. Every judgement below belongs to the step you dispatch, and each step is also callable directly by name when the user already knows which one they want.

## 1. Resolve

### Where the tree lives

The folder plans in Archie when its `origin` remote clearly matches one Project's repo in the Archie MCP server's `guide` Index. Read the remote with `git remote get-url origin`. Two remotes are the same repo when their host and path match, ignoring the scheme, the user and a trailing `.git`, so `git@github.com:me/app.git` matches `https://github.com/me/app`. No `origin`, no match or no Archie connection means the tree lives on files, as the steps below describe. Several matches, or a match you are unsure of, means stopping to ask the human which Project the folder belongs to.

In Archie, follow the `guide`. Every reference is a Task key such as `ARC-12`, and a `3.2` or a `3.2#1` is refused with one line saying the folder plans in Archie. Act as the Agent whose description in the Index fits **planning**, or as the Task's assignee when it is an Agent, chosen once for the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. Where a step sets a `Status:`, reads or writes a marker, or names a Type, use the Status or Type whose description fits it. When none clearly fits, or several do, stop and ask the human, naming the step you were on and `/archie-setup`, which reports every such gap. A helper you dispatch or invoke is told the mode and the Agent in its brief, and carries no mode text of its own.

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

In Archie, the step is the skill the Epic's Status names on its `**Next:**` line, whatever that Status is called, so a card the human drags is an instruction to the next run. A line naming one skill per condition, such as "with Epic children, `/archie-scope` each child in build order; with none, `/archie-to-spec`", routes to the skill whose condition holds for this Epic. A skill past planning, such as `/archie-implement` or `/archie-review`, is named rather than run, as the table's last row names `/archie-implement`. When the Status has no `Next:` line, its line names no skill in this bundle, or no condition clearly holds, stop and ask the human which step to run, naming the Status and `/archie-setup`.

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
