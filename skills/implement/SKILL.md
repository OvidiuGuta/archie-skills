---
name: implement
description: Orchestrating one Task through the pipeline its label selects — design, test-first implementation, review, bounded fix rounds and QA for an agent Task, or guiding the user through the work it needs a person for and verifying what they produced — and stopping at ready-for-review. Run it on a single Task reference once the Tasks blocking it are done.
disable-model-invocation: true
---

# Implement

One Task, from `todo` to `ready-for-review`. You dispatch sub-agents, triage what they return, drive bounded fix rounds and report.

The Task's label picks one of two pipelines. A `ready-for-agent` Task is built by sub-agents while you are away: **the engineer writes every line of feature code**, and staying out of the diff is what makes your read of it honest. A `ready-for-human` Task is work only a person can do — signing up for a service, provisioning access, obtaining a key — so you guide the user through it in this conversation and then verify what they produced.

Sub-agents hand off **by path**. The design goes to disk and comes back as a pointer, so your context stays small enough to run the whole pipeline and every reader downstream reads the same file. Passing a design or a research finding onward inline is how a nine-run pipeline runs out of room at run four.

The reference set carries what the files mean: the Task and Effort [reference syntax, the statuses and the labels](../reference/effort-tree.md), the [task file](../reference/templates/task.md), the [design](../reference/templates/design.md).

## 1. Resolve the Task and clear both gates

You are handed **one** reference — `3.2#1` or a path. Everything else resolves from it: the Task's file inside the leaf's `tasks/`, the leaf's `spec.md` beside it, and the Effort path the numbered directories spell out. Read the task file: its demoable outcome, its acceptance criteria, its `Blocked by` line and its `Label`.

Two gates decide whether this run happens at all:

- **The blocking edges are met.** Every Task named on `Blocked by` is `done`. An unmet edge halts here: a Task built out of order is built against code that does not exist yet, and the diff reads as correct until its sibling lands.
- **The label selects the pipeline.** `ready-for-agent` runs steps 2, 3, 4, 6 and 8 — design, build, review, QA, report. `ready-for-human` runs steps 5, 6 and 8 — guide, QA, report. Any other value, and a task file carrying no `Label` line at all, halts and names what it found. The pipeline is chosen from the label rather than defaulted to, because the wrong pipeline runs the wrong sub-agents.

Then set the Task's `Status:` to `in-progress`, so a reader of the tree can see a pipeline holds it.

Done when the Task, its Spec and its Effort path are in hand, both gates have passed, and the status line reads `in-progress`.

## 2. Design, in a read-only sub-agent

Dispatch [`/software-architecture`](../software-architecture/SKILL.md) with the Task reference. It writes `tasks/NN-<slug>.design.md` beside the task file and returns that path plus two lines.

Hold the path and hand it onward. Reading the design yourself buys nothing the engineer and the reviewer do not already read from disk.

Done when you hold a design path that exists, or the sub-agent reported a planning defect and you are at step 7.

## 3. Build, test-first

Dispatch [`/tdd`](../tdd/SKILL.md) with the Task reference and the design path. It goes red at the Spec's seam, drives each unit the design lists, goes green, and runs the repo's lint, typecheck, test and build gates.

Read the gate results before anything else:

- **A red gate halts the run.** Review, QA and three fix rounds spent on a diff that does not build is the whole pipeline spent on nothing. Report the failing command and its output.
- **A gate recorded as `unknown`** stays unrun and travels into the final report as a gap, so the user knows which of the four actually vouched for this diff.

Done when the engineer reports green on every known gate.

## 4. Review, then up to two fix rounds

Dispatch [`/code-review`](../code-review/SKILL.md) with the Task reference. It holds the diff against the Spec, the criteria and the design, and labels every finding.

**Triage before acting.** The label the reviewer gave each finding decides where it goes, and the three destinations are disjoint:

- **Code defect** → a fix round. Dispatch an engineer with the findings and the design path, then dispatch `/code-review` again over the updated diff.
- **Planning defect** → step 7. It halts the run whole, and the rest of this step does not happen.
- **Smell** → the report. A judgement call never spends a fix round of its own; the engineer sees it in the round it happens to share.

**Two rounds is the bound.** Code defects still standing after the second round travel into the report as unresolved, named with their file and line. A third round on a diff two reviews could not settle is a loop, and the user's read is the faster path out.

Done when the review passes clean, or two fix rounds have been spent and every remaining finding is written down.

## 5. Guide the user, one step at a time

This step is the whole build of a `ready-for-human` Task. Design, TDD and code review all presuppose a diff, and this Task produces none — the outcome is an account, a key, a permission — so a `ready-for-agent` run reaches step 6 from step 4 and never arrives here, and this run's only sub-agent is the `/qa` of step 6. You do the guiding yourself, in this conversation, because the user is here.

**Derive the steps now, at guide time.** Read the Task's outcome and its criteria to learn *what* has to exist, then work out the current path to it from the service's own documentation as it stands today. A third-party UI moves: a signup flow written down three weeks ago names a button that has been renamed and a settings page that has been split in two, and following it lands the user somewhere that does not match what they are reading. Instructions the task file happens to carry are stale context rather than the script — leave them, and leave the criteria as the outcomes they are. What you derive is guidance for this run and stays in the conversation.

**One step at a time.** Give the user a single action, wait, and confirm it landed before deriving the next one from where they actually are. A batch of ten pasted at once comes back as one "done" that covers whichever of them happened, and a step that went differently early makes every step after it wrong. When the user reports something the path does not predict — a screen that is not there, a plan that costs money, a permission they do not hold — that is the new starting point, so re-derive from it rather than repeating the step.

Done when the user has confirmed every step and the outcome exists, or a step they cannot complete has stopped the run and you have reported where it stopped and why.

## 6. QA, then one fix round

Dispatch [`/qa`](../qa/SKILL.md) with the Task reference. It stands the real app up, pins the outcome in one journey test, and grades every criterion **pinned**, **verified but not pinned** or **unverified**.

A `ready-for-human` Task has no journey to write, so QA checks the **observable state the user produced** instead: the env var is present where the app reads it, the key authenticates against the real service on a live call, the account signs in. A criterion nothing observable can confirm comes back **unverified**, and it stays unverified through the report of step 8 — the state was created by hand and there is no suite to hide behind, so an unverified criterion silently counted as a pass is the one thing this pipeline cannot afford.

Triage its findings exactly as in step 4: a code defect earns the run's **one** QA fix round, a planning defect halts, a smell is reported. On a `ready-for-human` Task the fix round belongs to the user, not an engineer: a criterion QA cannot see means a step did not take, so go back to step 5 for that step alone and dispatch `/qa` once more. What is still unseen after that pass travels into the report unresolved.

After an engineer's fix round, **you judge the fix diff yourself**. Read it against the finding it answers and the design it lands in. Code review does not re-run here: the diff is small, and you did not write it, so the reason a reviewer exists does not apply. What the fix did and did not resolve goes in the report in your own words.

Done when every criterion carries a grade, and the one fix round is either spent and judged or was not needed.

## 7. Halt on a planning defect

A **planning defect** is a finding no amount of engineering resolves: an ambiguous or unbuildable acceptance criterion, a criterion the Spec contradicts, two contracts that disagree. Its blast radius reaches past this Task, so only the user settles it — see [`../reference/altitude.md`](../reference/altitude.md).

Stop the pipeline where it stands and leave the Task at `in-progress`, because the run did not finish. Report the defect, what established it, and which document has to change. Never pick the reading that lets the run continue: a guessed answer to a planning question is spent unattended and surfaces later as a built feature nobody asked for.

## 8. Set the status and report once

Set the Task's `Status:` to `ready-for-review`. `done` is the user's word and only the user writes it, so the AFK phase never declares its own work finished.

Then one summary, the run in a single read:

```md
_Implemented:_ {Task reference} — {Task title}
_Status:_ ready-for-review
_Design:_ `{path to the design file}`

### Built
{The seam the integration test attaches at, the units pinned, and one line per gate with its result.}

### Review
{Round by round: the findings, and which are fixed. Then the unresolved ones, file and line each.}
{Smells, labelled as judgement calls.}

### QA
_Journey:_ `{path to the journey spec}`
- **pinned** — {criterion}
- **verified, not pinned** — {criterion}
- **unverified** — {criterion} — {why nothing could confirm it}
{The QA fix, and your read of what it resolved.}

### Left for you
{The unresolved findings, the unrun gates, and every criterion that is not pinned.}
```

A `ready-for-human` run has no design, no diff and no gates, so it drops the `_Design:_` line and replaces **Built** and **Review** with one **Guided** section — the steps the user performed, in order, and any step that could not be completed — and carries the rest exactly as written.

The two grades a green suite hides — **verified but not pinned** and **unverified** — are stated per criterion rather than folded into a pass. This report is the last thing between the Task and `done`, and the user's next move is only as good as what it says.
