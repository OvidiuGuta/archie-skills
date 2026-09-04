---
name: archie-implement
description: Implementing one Task inline or a whole leaf Epic through engineer sub-agents, ending on a summary and a hand-test walkthrough. Run it on a Task or leaf Epic reference. Only for explicit user invocation — never fire it on your own.
---

# Implement

One reference — a Task (`3.2#1`) or a leaf Epic (`3.2`) — built test-first. This phase builds and verifies the acceptance criteria; grading the result is `/archie-review`'s phase, run later on the branch.

A Task reference selects **task mode**: you build it inline and stop dirty for the user to test. An Epic reference selects **epic mode**: you orchestrate an engineer sub-agent per Task, and the engineer writes every line — staying out of the diff is what makes your criteria check honest.

## 1. Resolve and gate

Everything resolves from the reference: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, and `#1` is `tasks/01-<slug>.md` inside it. The leaf's `spec.md` sits beside the `tasks/` folder.

No `.archie/` at all is a repo that has never been planned. Say so and name `/archie-architect` rather than inventing work from the reference. An Epic reference must land on a leaf with `tasks/` populated — a Split Epic or an unsliced leaf halts and names `/archie-architect` too.

Gates before anything runs:

- **The tree is clean enough to read a diff off.** Uncommitted work lands inside every diff this run verifies. Say what is dirty and let the user clear it.
- **Task mode: the Task is runnable.** Every Task on `Blocked by` is `done`, and the label is `ready-for-agent` — a `ready-for-human` Task halts and names `/archie-assist`; any other value, or no `Label` line, halts and names what it found.
- **Epic mode: the branch is the user's move.** On `main` or `master`, halt and say so. Branching is the user's job, and the run commits, so it starts only where commits belong.

Done when the reference resolves and every gate has passed.

## 2. Task mode: build inline

Set the Task's `Status:` to `in-progress` and record the baseline: `git rev-parse HEAD`.

Invoke `/archie-tdd` **inline, in this conversation** — you are the engineer. **A red gate halts the run**: report the failing command and its output.

Then check every acceptance criterion against `git diff <baseline>` plus the untracked files. A criterion the diff does not meet goes back into the loop until it does or the gap is named.

Set `Status:` to `ready-for-review` and **stop dirty** — the user tests from the working tree. Give the step 4 report, then offer to complete: at the user's word, set `done` and commit following the repo's commit conventions.

## 3. Epic mode: orchestrate

Run the `ready-for-agent` Tasks in `Blocked by` order, skipping the `done` ones. The first unblocked `ready-for-human` Task halts the run and names `/archie-assist` — committed work stays committed.

Per Task:

1. Set `Status: in-progress` and record the Task's baseline: `git rev-parse HEAD`.
2. **Dispatch an engineer as a sub-agent, through the sub-agent (Agent) tool**, with one instruction: run `/archie-tdd` on this Task reference.
3. Read the gate results from its report. **A red gate halts the whole run.**
4. Verify every acceptance criterion yourself against `git diff <task baseline>` plus the untracked files. You read; the engineer writes.
5. Criteria unmet: **one fix round**. Dispatch the engineer again with exact instructions — the criterion, the file and line, what to change. Unmet after that, halt the run with a short report — what went wrong and a suggested fix — because the user's read is the faster way out of a loop.
6. Criteria met: set `Status: done`, commit following the repo's commit conventions (default `<reference>: <task title>`), and give a one-line readout — reference, gate results, verdict, commit SHA — before moving on.

After the last Task, write `Status: ready-for-review` into the leaf's `epic.md`, give the step 4 report, offer to create a PR, and name `/archie-review` as the next phase — it runs in its own session.

## 4. Summary and walkthrough

Both modes end on the same report:

```md
_Built:_ {reference} — {title}

{One paragraph: what exists now that did not before, and where it shows.}

### Walkthrough
- {a step through the running app}
- {…}
```

The walkthrough is the criteria the tests cannot reach, written as steps someone follows through the running app without reading the code. Criteria the tests already cover stay out — the suite says so. In epic mode the paragraph covers all Tasks and the walkthrough gets a sub-heading per Task.

The session stays open after the report: the user's review is theirs to run — code, taste, UI — and their change requests are honored inline or written up as a new Task in the epic, at their word.
