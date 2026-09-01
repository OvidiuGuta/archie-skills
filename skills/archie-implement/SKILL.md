---
name: archie-implement
description: Orchestrating one agent Task from todo to ready-for-review — test-first build, two-axis review, one fix round, and a report carrying the manual test plan. Run it on a single Task reference once the Tasks blocking it are done.
disable-model-invocation: true
---

# Implement

One Task, from `todo` to `ready-for-review`, unattended. You dispatch sub-agents, read what they return, drive one fix round and report.

**The engineer writes every line of feature code.** Staying out of the diff is what makes your read of it honest, so the one diff you judge yourself is the fix round's, which you did not write. **Requires** `/archie-tdd` and `/archie-code-review`, and a missing one halts the run and is named — absorbing its step would put the reviewer's context and the engineer's diff in the same head.

## Readouts

Every dispatch ends in a **readout** — one lead line in your words, then the sub-agent's report verbatim beneath it:

```md
**{step} — {the verdict, where each finding lands, and what you dispatch next}**

{the sub-agent's report, unaltered}
```

The lead line is the only part you write. Leave the body exactly as it arrived: a `file:line`, a criterion's wording and a gate's command are what the user acts on, and a tidied paraphrase is where they go missing. Step 5's summary is for the user coming back to a finished run; readouts are for the user watching one.

## 1. Resolve the Task, record the baseline, clear the gates

You are handed **one** reference — `3.2#1` or a path. Everything resolves from it: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, `#1` is `tasks/01-<slug>.md` inside it, and the leaf's `spec.md` sits beside the `tasks/` folder.

No `.archie/` at all is a repo that has never been planned. Say so and name `/archie-architect`, which walks the planning steps from scoping through to Tasks, rather than inventing a Task from the reference. Implementing installs without Planning, so this is a state you will meet.

Read the task file — its demoable outcome, its acceptance criteria, its `Blocked by` line and its `Label` — and the leaf's `spec.md`.

**Record the run's baseline**: `git rev-parse HEAD`. Every diff this run reviews is measured from it, including the fix diff you judge yourself.

Three gates decide whether this run happens at all:

- **The blocking edges are met.** Every Task on `Blocked by` is `done`. A Task built out of order is built against code that does not exist yet, and the diff reads as correct until its sibling lands.
- **The label is `ready-for-agent`.** A `ready-for-human` Task halts here and names `/archie-assist`. Any other value, and a task file with no `Label` line, halts and names what it found.
- **The tree is clean enough to read a diff off.** Uncommitted work already in the tree lands inside every diff this run reviews. Say what is dirty and let the user clear it.

Then set the Task's `Status:` to `in-progress`.

Done when the Task and its Spec are in hand, the baseline SHA is recorded, all three gates have passed, and the status line reads `in-progress`.

## 2. Build, test-first

Dispatch `/archie-tdd` with the Task reference. It goes red at the Spec's seam, drives each unit it modifies, goes green, and runs the repo's lint, typecheck, test and build gates.

Read the gate results first. **A red gate halts the run** — a review and a fix round spent on a diff that does not build is the whole pipeline spent on nothing — so report the failing command and its output. A gate the engineer could not find travels into the final report as a gap, so the user knows which of the four vouched for this diff.

Hold the engineer's list of which acceptance criteria its tests cover. Step 5's test plan is built from it.

## 3. Review, on two axes

Invoke `/archie-code-review` **inline, in this conversation** — not as a sub-agent. It fans out two sub-agents of its own, one per axis, and sub-agents cannot nest, so the fan-out has to happen at your level. Hand it the Task reference and the baseline SHA.

It returns two reports, Spec and Standards, side by side and unmerged. Relay both verbatim in one readout.

Every finding goes to the fix round or to the report — those are the only two destinations, so the pipeline runs to the end from here. Where a criterion was too ambiguous to judge, the reviewer says so as a finding and the run continues on the reading it reviewed against.

## 4. One fix round

Dispatch `/archie-tdd` again, with the Task reference and both axis reports. **One round, and only one.** A second round on a diff one review and one fix could not settle is a loop, and the user's read is the faster way out.

The same skill fixes as built, so each fix arrives driven by a test and the gates run again over it — a fix merely applied is how untested behaviour lands in a diff that has already been reviewed. Spec and Standards findings are what the round is for; smells are the engineer's discretion inside it, being labelled judgement calls that never earn a round of their own.

Then **you judge the fix diff yourself** — `git diff` from the baseline, read against the findings it answers. Review does not re-run: the diff is small, and you did not write it, so the reason a reviewer exists does not apply. What the fix did and did not resolve goes in the report in your own words, and anything still standing is named with its file and line. A gate the fix round turned red is reported red.

Skip this step when both axes came back clean.

Done when the fix round is spent and judged, or was not needed, and its readout is out with your own read of the diff as the lead line.

## 5. Set the status and report once

Set the Task's `Status:` to `ready-for-review`. `done` is the user's word and only the user writes it, so the unattended phase never declares its own work finished.

Then one summary, the run in a single read:

```md
_Implemented:_ {Task reference} — {Task title}
_Status:_ ready-for-review

### Built
{The seam the integration test sits at, the units it covers, and one line per gate with its result.}

### Review
_Spec:_ {the findings, and which the fix round resolved}
_Standards:_ {the same, with smells marked as judgement calls}
{Then the unresolved ones, file and line each.}

### Test plan
{One line per acceptance criterion:}
- **covered by tests** — {criterion} — {the test that covers it}
- **walk it by hand** — {criterion} — {the steps through the running app that show it, in order}

### Left for you
{The unresolved findings, any gate that did not run, and every criterion needing a manual walk.}
```

**The test plan is the point of the report.** No browser drives this app during the run, so a criterion the unit and integration tests do not cover has been proven by nobody until the user walks it. Give the manual ones as steps someone can follow through the running app without reading the code.
