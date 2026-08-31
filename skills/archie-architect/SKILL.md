---
name: archie-architect
description: Archie's planning session — architecting one Epic by inheriting, interviewing, then recommending splitting it into thin children or specifying it. Run it on a loose idea or on an Epic reference like 3.2.
disable-model-invocation: true
---

# Architect

One Epic per session. Reach shared understanding by interviewing, write down what settles as it settles, and end on a recommendation: **split** this Epic into children, or **specify** it. The call is the user's.

Read [`references/epic-tree.md`](./references/epic-tree.md) first. It fixes the tree on disk, how an Epic's state is read off its own directory, identity numbering and the reference syntax.

**Requires** `/archie-interview`, `/archie-domain-modeling`, `/archie-research` and `/archie-prototype`. A session dispatches all four. If one is not installed, say which and stop rather than improvising it: an interview that skips the altitude gate, or a decision nobody writes down, produces a tree that reads finished and is not.

You never write `spec.md` or a task file. Those are `/archie-to-spec` and `/archie-to-tasks`, and they run after the user has accepted a recommendation to specify.

## 1. Open the Epic

**A loose idea** — no reference, just a subject. Agree a title and a slug, create `.archie/<slug>/`, and write `epic.md`: title and intent, nothing else. This is the root Epic and carries no number.

```md
# {Title}

{One or two sentences of intent: what this Epic covers, in the project's language.}

## Decisions

- {One at-altitude decision settled at this resolution, in one line.}

## Children

1. `01-{slug}` — {one line of intent}
2. `02-{slug}` — {one line of intent}
```

Each part is written the moment it is known rather than batched at the end. A **thin** Epic is the title and the intent alone; `Decisions` and `Children` appear once it has some. `Decisions` is `/archie-domain-modeling`'s to fill, and `Children` is the **build order** authority — reorder by moving lines, and the directory names stay as they are. A Specified Epic has no `Children`, and its `spec.md` and `tasks/` sit beside this file.

**An Epic reference** (`3.2`, or a root's slug) — resolve it down the numbered directories and open that Epic. A reference that does not resolve, or an Epic holding both children and a `spec.md`, stops the session and goes to the user.

An Epic that is already **Split** is not the one to architect: name its children's states and ask which to open. An Epic that is already **Specified** has had its session; `/archie-to-spec` and `/archie-to-tasks` own what happens next.

Done when the Epic's directory exists, its `epic.md` holds a title and an intent, and the Epic is thin.

## 2. Inherit before asking anything

An Epic deep in a tree has most of its constraints already settled. Read them first, so the interview never re-litigates them:

- **`CONTEXT.md`** — the project's language. Ask in it.
- **The ADRs touching this area** — read the titles, then the bodies of the ones that bear on this subject. A question an ADR already answers is not a question.
- **Every ancestor's `epic.md`**, walking the path from the root down to this Epic's parent. Those `Decisions` lines are inherited, **not copied**: they stay where they were written, because copying them onto children would contradict thin children and would need backfilling every time an ancestor settles something after the split. A decision spanning siblings is settled at the parent, so no sibling inherits one it never weighed in on.

Done when you can state, in a few lines, what this Epic has inherited and which of its own questions are already answered.

## 3. Read what the earlier siblings built

A thin child is a deliberate deferral to a moment of **strictly greater knowledge**, and this step is where that knowledge gets collected. The siblings ahead of this Epic in the parent's ordered child list are built: their code is on disk, and it is the current state of the thing being sharpened.

Find it and read it. Their `spec.md` and their Tasks name what they produced; the code is the authority on what it actually became. Look for the shape the interview has to fit inside: the seams that exist, the models and their names, the patterns already chosen, and the places where the built code diverged from what its Spec said.

Skip this only at a root Epic with nothing built. Everywhere else, opening the interview without it is guessing at a state you could have read, and it turns this session into planning against the tree's assumptions rather than against the repo.

Done when every earlier sibling that produced code has had that code read, and you can name what in it constrains this Epic.

## 4. Interview

Invoke `/archie-interview`. It owns the questioning: one question a turn, each gated by altitude, each deferral announced as it happens.

Two things are yours while it runs:

- **Record what settles, the moment it settles.** Invoke `/archie-domain-modeling` on each resolved thing and let it route. The tree is disposable, so an unrecorded decision goes when the tree goes.
- **Dispatch the hard questions.** An at-altitude question conversation resolves badly takes an exit rather than a deferral: `/archie-research` for a fact, `/archie-prototype` for "how should this look". Dispatch the sub-agent, carry on interviewing while it runs, and ask the waiting question when its pointer lands. Keep a prototype's sub-agent id — revisions go back to it.

The interview ends by handing you either an empty frontier or the clusters its deferrals formed.

## 5. Recommend split or specify

Read the recommendation off what the interview returned, and give the reasoning with it:

- **An empty frontier and no deferrals** — recommend **specify**. Everything at this resolution is settled and there is nothing left to sharpen.
- **Deferrals in clusters** — recommend **split**, one child per cluster, in the build order you would suggest, with a line on why each is a child rather than a question you should have asked.

Present it as a recommendation and stop. **Going deeper is the user's call, always** — they may specify an Epic you wanted to split, split one you wanted to specify, merge two of your clusters or add a child you missed. Do that, do not argue it twice.

## 6. Split, if that is the call

A child is created **thin**: a directory `NN-<slug>` taking the next unused number, an `epic.md` holding the title and one or two lines of intent, and a line in the parent's ordered `Children` list. Nothing else — no decisions, no questions, no notes toward its own session. It gets its own Architect session later, and everything you could write into it now is something that session will know better.

The deferred questions themselves are **not** copied down. They were announced in the session, they shaped the child's intent, and the child's own interview will raise the live ones again with the siblings' code to read.

Done when every cluster has a directory, an `epic.md` and a position in the parent's list, and the parent holds no `spec.md`.

## The size backstop

Applies only after the call is **specify**. A specifiable Epic can still be too large to build as one leaf — one Spec and a task list nobody wants to run.

Slice it into children on **mechanical** lines: sequence, surface, one deployable step at a time. This is not a resolution question and it does not reopen the interview — the understanding is complete, the unit is just too big. Say that to the user when you propose the slices, so a split arriving after a specify recommendation does not read as a new round of questions.

## Editing the tree

The tree is a hypothesis, so children can be added, deleted, reordered or further split at any time, in this session or a later one. Numbers are identity: a deletion leaves a gap, gaps are never backfilled, and reordering moves lines in the parent's `Children` list while the directory names stay put.

**A Specified child is different.** Reordering it, or changing its scope, means the siblings scoped around it may no longer hold. Say so explicitly before touching it:

```md
_Heads up:_ `02-password-reset` is Specified. Moving it after `03-sessions` means its Spec was written assuming sessions did not exist yet.
```

Name what was scoped around it and what may now be stale, then let the user decide. Editing it silently hands them a tree that no longer means what they think it does.
