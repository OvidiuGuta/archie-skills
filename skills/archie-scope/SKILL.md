---
name: archie-scope
description: Reaching shared understanding of what one Epic covers — inherit, interview at altitude, then recommend splitting it into thin children or specifying it. The what-step of Archie's planning phase.
---

# Scope

One Epic, one session. Reach shared understanding of **what** it covers by interviewing, record the durable decisions as they settle, and end on a recommendation: **split** this Epic into children, or **specify** it. The Epic's own file is written once, at that recommendation, and the call is the user's.

Read [`references/epic-tree.md`](./references/epic-tree.md) first. It fixes the tree on disk, how an Epic's state is read off its own files, identity numbering and the reference syntax.

[`references/reshaping.md`](./references/reshaping.md) is for the three branches that change a tree instead of growing one: **re-scoping** a leaf `/archie-design` sent back, the **size backstop** on a specifiable Epic too big to build as one leaf, and **editing** children that already exist. Read it when one of those fires.

**Requires** `/archie-interview` for the questioning and `/archie-domain-modeling` for anything durable, and it dispatches `/archie-research`. Each carries its own discipline and knows nothing about Epics, altitude or this tree, so everything framework-shaped below is yours. If one is not installed, say which and stop rather than improvising it — a session that asks its questions unbounded, or leaves a decision nobody writes down, produces a tree that reads finished and is not.

You settle the **what**. How it gets built is `/archie-design`'s, on a leaf, after its Spec exists, and you never write `spec.md` or a task file.

## 1. Open the Epic

Nothing about this Epic is written to disk until step 4. The intent is agreed at the moment of least knowledge and the interview reshapes it, so writing it now buys a file that gets rewritten and a directory left behind by a session the user abandons. Hold it in the session instead.

**A loose idea** — no reference, just a subject. Agree a title and a slug. This is the root Epic and carries no number, and its `epic.md` will look like this when step 4 writes it:

```md
# {Title}

{One or two sentences of intent: what this Epic covers, in the project's language.}

## Decisions

- {One at-altitude decision settled at this resolution, in one line.}

## Children

1. `01-{slug}` — {one line of intent}
2. `02-{slug}` — {one line of intent}
```

`## Decisions` is **always written**, because its presence is what marks this Epic as scoped. `Children` appears only on a Split Epic; a Specified Epic has `spec.md` and `tasks/` beside this file instead.

**An Epic reference** (`3.2`, or a root's slug) — resolve it down the numbered directories and open that Epic. A reference that does not resolve stops the session and goes to the user.

An Epic that is already **Split** is not the one to scope: name its children's states and ask which to open. An Epic that already carries a `spec.md` has had its session; re-running here means **re-scoping**, in `references/reshaping.md`.

Done when a loose idea has an agreed title, slug and intent, or a referenced Epic is open and thin — and nothing new has been written either way.

## 2. Inherit before asking anything

An Epic deep in a tree has most of its constraints already settled, in two places. Assemble both before opening your mouth, so the interview neither re-litigates a decision nor plans against a state it could have read.

### What was written down

- **`CONTEXT.md`** — the project's language. Ask in it.
- **The ADRs touching this area** — read the titles, then the bodies of the ones that bear on this subject. A question an ADR already answers is not a question.
- **Every ancestor's `epic.md`**, walking the path from the root down to this Epic's parent. Those `Decisions` lines are inherited, **not copied**: they stay where they were written, because copying them onto children would contradict thin children and would need backfilling every time an ancestor settles something after the split. A decision spanning siblings is settled at the parent, so no sibling inherits one it never weighed in on.

### What was built

A thin child is a deliberate deferral to a moment of **strictly greater knowledge**, and this is where that knowledge gets collected. The siblings ahead of this Epic in the parent's ordered child list are built: their code is on disk, and it is the current state of the thing being sharpened.

Their `spec.md` and their Tasks name what they produced; the code is the authority on what it actually became. Look for the shape the interview has to fit inside: the seams that exist, the models and their names, the patterns already chosen, and the places where the built code diverged from what its Spec said.

Skip this only at a root Epic with nothing built.

Done when you can state, in a few lines, what this Epic has inherited and which of its own questions are already answered.

## 3. Interview

Invoke `/archie-interview` for the questioning discipline — one question a turn, each carrying a recommended answer. It interviews about whatever it is pointed at; the bounding is yours.

### The frontier

The **frontier** is the set of at-altitude questions still open on this Epic. It is the session's whole state, and the session ends when it is empty.

Fill it before asking anything: name every question this Epic raises — from the intent, the inherited decisions, and the code the earlier siblings produced — and put each one through the gate below. Answers open new questions, so the frontier keeps refilling; every newcomer takes the gate before it joins. Done when no question you can currently name is unsorted: each is on the frontier or has been announced as deferred.

### The gate

> **Does this answer's blast radius reach beyond one part of this Epic?**

**At altitude** means the blast radius does reach past one part: settle it here, now. **Below altitude** means it lives inside one part, so it is deferred to the moment that part is worked on — a bet on strictly greater knowledge later, since by then that part's earlier siblings are built and their code is there to read.

**The gate is enforced, not advisory.** A question that fails it is deferred the moment it occurs to you, never asked because the conversation happened to be nearby. Asking below altitude is how a session about a whole application ends up specifying one screen's layout, which is the waterfall Archie exists to replace. Sessions terminate on their own because cross-cutting decisions at any resolution are few, while local ones are many.

**A how-question is not yours either.** Which endpoints exist, which components get built, which package gets added, where the tests attach — those are `/archie-design`'s, one rung down, on a leaf whose Spec exists. Say so and move on:

```md
_Design:_ what the reset endpoint's shape is.
```

That is not a deferral into a child, so it never joins a cluster. It is the same Epic, a later step.

Announce each real deferral in one line, in the turn it happens, so the user watches the child list assemble:

```md
_Deferred:_ how the reset email is templated.
```

The user overrules the gate continuously. When they name a deferred question, it returns to the frontier and gets asked next, with no argument and no re-litigating the altitude.

### Record what settles, the moment it settles

**The durable levels are written now**, before the next question is asked. Invoke `/archie-domain-modeling` for a **domain term** or a decision **clearing the ADR bar**; it owns those two destinations and knows nothing about this tree. Those are the levels that outlive the tree, so a session that dies before step 4 must not take them with it.

**The residue is held in the session** and written in step 4: one line per decision, no reasoning, the list you will put under `## Decisions`. Keep it as you go rather than reconstructing it at the end, restate it in every check-in, and revise a line in place when a later answer sharpens it. The residue is the level defined to die with the tree, so holding it costs the same class of loss a pivot already costs.

If a residue line will not fit in one line, it needed its reasoning — which means it was an ADR, and it goes to `/archie-domain-modeling` now. That test is what keeps `epic.md` from growing into a spec.

### A hard question is not a low one

An at-altitude question about a **fact** — something the user would have to go and read — takes the research exit rather than the user's attention. It runs in a **sub-agent** and comes back as a **pointer**, so the reading never enters this session's context.

Spawn the sub-agent and tell it to use `/archie-research`; the skill is the sub-agent's, and what only you know is the brief: the question in one sentence, what decision is waiting on it, and the destination — `research/<slug>.md` inside this Epic's own directory. One answerable question per sub-agent, since a brief asking three things comes back as three shallow answers.

Carry on down the frontier while it runs, and ask the waiting question when its pointer lands.

That destination is the one thing that reaches disk before step 4, created lazily by the first finding.

### Check in every eight questions

Roughly every eighth question, open the turn with three lines, then ask the next question in the same turn. The check-in is a backstop against your own altitude judgement being wrong, not a decision point, so it never stops for approval:

```md
**Check-in.** Settled: reset is token-based, tokens expire in an hour, all sessions drop.
Deferred: 6, clustering into email delivery and the reset UI.
Leaning: split.
```

The lean is either **split** or **specify**, read off the deferrals as they stand: several clusters lean split, a thin scattering of deferrals leans specify.

Done when the frontier is empty. What it leaves behind is either nothing — every question at this resolution settled — or the deferrals, which cluster in step 4.

## 4. Write the Epic, then recommend

The frontier is empty, so what the Epic is has stopped moving. Write it now, in one go: create `.archie/<path>/` if the research exit did not, and write `epic.md` with the title, the intent as the session actually came to understand it, and `## Decisions` carrying the residue — or `_None at this resolution._` if there is none.

An Epic that already had an `epic.md` is updated in the same single write: the intent sharpened if this session sharpened it, `## Decisions` extended with this session's residue. Its existing lines were settled at this resolution too and are not rewritten away.

That write and the recommendation land in the same turn, so the recommendation **is** the diff — the user reads what was settled and what you propose doing about it together, rather than approving a recommendation about files that already changed under them.

Then cluster the deferrals — each cluster named, with the deferred questions under it — and read the recommendation off them, giving the reasoning with it:

- **An empty frontier and no deferrals** — recommend **specify**. Everything at this resolution is settled and there is nothing left to sharpen — run the size backstop first, so a leaf too big to build as one is sliced before you propose it.
- **Deferrals in clusters** — recommend **split**, one child per cluster, in the build order you would suggest, with a line on why each is a child rather than a question you should have asked.

Then close the turn by saying shared understanding is reached, inviting anything still open, and naming what you will do otherwise — the child Epics on a split, the Spec on a specify:

```md
That's shared understanding as I have it. Anything still open, or shall I write the Spec?
```

**Going deeper is the user's call, always** — they may specify an Epic you wanted to split, split one you wanted to specify, merge two of your clusters or add a child you missed. Do that, do not argue it twice.

The floor is open, so the answer is not a yes. Three shapes carry consequences:

- **A reopened deferral** rejoins the frontier and gets asked next. It can move the recommendation from split to specify or back, so read the recommendation again once it settles.
- **A redirect** to a different step is obeyed. Where it drops work that already exists, say what it drops before running it.
- **Anything else** — a question, a correction, a change of mind about a cluster — is followed as asked.

On the user's call to **split**, that is step 5. On their call to **specify**, invoke `/archie-to-spec` **inline, in this session**: it asks nothing, its whole input is the conversation that just happened, and a fresh window would read that off files instead. You still write no `spec.md` yourself.

## 5. Split, if that is the call

A child is created **thin**: its directory and its position in the parent's list follow `epic-tree.md`, its `epic.md` holds the title and one or two lines of intent, and it has **no `## Decisions` heading** — not even an empty one, which would make it indistinguishable from a scoped Epic. Nothing else goes in it: no decisions, no questions, no notes toward its own session. It gets its own scoping session later, and everything you could write into it now is something that session will know better.

The parent's `epic.md`, written a step ago without one, gains its `Children` section here.

The deferred questions themselves are **not** copied down: they shaped the child's intent, and its own interview will raise the live ones with the siblings' code to read.

Done when every cluster has a directory, an `epic.md` and a position in the parent's list.

Then report the tree as it now stands, name `/archie-architect` on the first child as the next session, and stop. The chain ends here.
