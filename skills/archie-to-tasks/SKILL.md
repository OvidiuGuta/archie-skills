---
name: archie-to-tasks
description: Slicing one Epic's spec.md into the Tasks /archie-implement consumes — vertical tracer bullets, one demoable outcome each, sequenced by their blocking edges. Run it once the Spec is written.
disable-model-invocation: true
---

# To tasks

The Spec says what the leaf is. This cuts it into the Tasks `/archie-implement` runs one at a time, unattended. The cut is the last thing a human shapes: from here the pipeline builds whatever these files say, so a Task that hides two outcomes is two half-built features nobody demoed.

Read [`references/templates/task.md`](./references/templates/task.md) first. It fixes the file's shape and the rules governing it. [`references/epic-tree.md`](./references/epic-tree.md) carries the numbering, the statuses and the two labels.

You write task files and nothing else. Their designs are `/archie-implement`'s to produce.

## 1. Open the Epic

The Epic is the one whose Spec the session just wrote, or the reference the user passed (`3.2`, or a root's slug), resolved down the numbered directories.

Read its `spec.md` in full, plus any reference the user passed alongside — a prototype, a research finding, a sibling's code. A **Specified** Epic is the only thing this skill slices: an Epic with children is Split, and its Spec belongs to one of the leaves, so name the children and ask which one. An Epic that already holds a `tasks/` directory is being re-sliced — say what the existing Tasks cover and get the overwrite agreed first. Numbers are identity: a surviving Task keeps the number it has, and a new one takes the next unused number in the leaf.

Done when you hold one Specified Epic, its Spec read end to end, and the user's call to slice it.

## 2. Cut tracer bullets

A Task is a **tracer bullet**: a narrow but complete path through every layer, fired end to end so something observable happens at the far end. One Task is **exactly one end-to-end demoable outcome** — the thing you would show the user when it lands. Two outcomes means two Tasks, and that is what turns "is this Task too big" from taste into a check anyone can run.

Slice against the Spec's `User Stories`, which is long on purpose: every story lands in some Task, and a story with no Task is work you dropped. Several thin stories can share one bullet when they are one outcome seen from different sides.

Two things shape the sequence:

- **Prefactoring first.** Where the existing code has to move before the feature can be threaded through it cheaply, that move is its own Task, sequenced ahead of the bullets that need it. Prefactoring earns its Task by making the Tasks after it smaller.
- **Blocking edges.** A Task blocks another when the second genuinely cannot start until the first lands. Edges are the schedule; anything unblocked can run whenever `/archie-implement` reaches it.

Give each Task its label — `ready-for-agent` when an agent builds it end to end, `ready-for-human` when it needs a third-party UI, a secret or an account that only the user can supply.

Then write the acceptance criteria: **observable outcomes, not instructions**, no file paths, no code. QA checks them against the running app, so a criterion nobody can watch happen is not one.

Done when every user story is covered by a Task, every Task names one outcome, and every Task carries its edges, its label and its criteria.

## 3. Quiz the user on the breakdown

Present the whole breakdown as a numbered list, each line the Task's title, its outcome and its blocking edges, so the shape and the sequence are visible at once:

```md
1. **Store a reset token** — a token row survives a request and expires on schedule. Blocked by: none.
2. **Request a reset** — a user submits their email and receives a reset link. Blocked by: #1.
```

Then ask about the two things the user can judge better than you, one at a time:

- **Granularity** — is any Task hiding a second outcome, and is any pair really one?
- **Edges** — is anything sequenced that could run free, or free that should be blocked?

Iterate on their answers and show the revised list. This is a checkpoint, not a notification: it does not pass on silence.

Done when the user has approved the numbered list in their words.

## 4. Write the Tasks

One file per Task at `tasks/NN-<slug>.md` inside the leaf, following the template exactly, `Epic:` reference and `Status: todo` included. The file numbering is the approved list's order at first slice, and thereafter identity — a re-slice never renumbers.

Keep file paths and code out of them, so a Task still reads true weeks later when the code around it has moved. The single exception is a snippet a prototype produced that encodes a decision more precisely than prose can — a state machine, a schema, a type shape — inlined with the prototype it came from named.

A `ready-for-human` Task states the outcome and what the user must supply; its steps are derived at guide time, when the third-party UI is whatever it is that day.

Done when every approved Task has a file, each with a `Status`, a `Label`, its `Blocked by` line and its criteria checklist.

## 5. Hand off

Report the leaf's path, the Task count, and the first Task by reference (`3.2#1`). Name `/archie-implement` as the next move and stop. The Epic is now sliced, and everything after this runs AFK.
