---
name: archie-implement
description: Implementing one Task inline or a whole leaf Epic through engineer sub-agents, proving every acceptance criterion; an Epic ends on a reviewed draft PR. Run it on a Task or leaf Epic reference. Only for explicit user invocation — never fire it on your own.
---

# Implement

One reference — a Task (`3.2#1`, or its key) or a leaf Epic (`3.2`, or its key) — built test-first, with every acceptance criterion **proven** in the Task's body. An Epic run also opens the PR and runs `/archie-review` on it unattended, so the branch reaches the user already graded and fixed.

A Task reference selects **task mode**: you build it inline and stop dirty for the user to test. An Epic reference selects **epic mode**: you orchestrate an engineer sub-agent per Task, and the engineer writes every line — staying out of the diff is what makes your proof honest.

**Which engineer runs a Task is read off its `Integration:` line** — in Archie, off its Type. `this Task` is the leaf's closing Task and opens `/archie-verify`, which covers the whole leaf at the seam; anything else opens `/archie-tdd`, whose outer loop that Task deferred. Both report the same shape, so nothing after the dispatch changes.

## 1. Resolve and gate

### Where the tree lives

The folder plans in Archie when its `origin` remote clearly matches one Project's repo in the Archie MCP server's `guide` Index. Compare host and path only, so `git@github.com:me/app.git` matches `https://github.com/me/app`. No `origin`, no match or no Archie connection means the tree lives on files, as the steps below describe. Several matches, or an unclear one, means asking the human which Project this is.

In Archie, every reference is a Task key such as `ARC-12`; refuse a `3.2` or a `3.2#1` with one line saying the folder plans in Archie. Act as the Agent whose description in the Index fits **building**, or as the Task's assignee when it is an Agent, chosen once for the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. A Status, marker or Type a step names is the Status or Type whose description fits it; when none clearly fits, or several do, stop and ask the human, naming the step and `/archie-setup`. Brief any helper you dispatch or invoke with the mode and the Agent.

Everything resolves from the reference: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, and `#1` is `tasks/01-<slug>.md` inside it. The leaf's `spec.md` sits beside the `tasks/` folder.

No `.archie/` at all is a repo that has never been planned. Say so and name `/archie-architect` rather than inventing work from the reference. An Epic reference must land on a leaf with `tasks/` populated — a Split Epic or an unsliced leaf halts and names `/archie-architect` too.

Gates before anything runs:

- **The tree is clean enough to read a diff off.** Uncommitted work lands inside every diff this run verifies. Say what is dirty and let the user clear it.
- **Task mode: the Task is runnable.** Every Task on `Blocked by` is `done`, and the label is `ready-for-agent` — a `ready-for-human` Task halts and names `/archie-assist`; any other value, or no `Label` line, halts and names what it found. In Archie the edges are its `blocks` edges and the label its `assignee`, the human halting the same way.
- **Epic mode: the branch is the user's move.** On `main` or `master`, halt and say so. Branching is the user's job, and the run commits, so it starts only where commits belong.
- **Epic mode: the PR can be opened.** An `origin` remote and an authenticated `gh` (`gh auth status`). The run ends on a PR, so a missing one halts here rather than after every Task is built.

Done when the reference resolves and every gate has passed.

## 2. Prove the criteria

Every criteria check in this skill ends on **proof** you write into the Task's body, beneath its checklist. A criterion is ticked only once its proof entry exists.

```md
## Proof

_Built on:_ {baseline SHA}

- {criterion} — test: `{file}` › `{test name}`, passing
- {criterion} — diff: `{file:line}`, {why it holds there} · app: {the steps driven} → {what the screen showed}
```

One entry per acceptance criterion:

- **A test covers it** — the test the engineer's report names, once you have read it assert the criterion, with the gates green.
- **No test reaches it** — the `file:line` that makes it hold and why, plus an app walk.

Paths belong here even though the rest of a Task keeps them out: the proof commits with the code it describes, so its commit pins them. In Archie, where the body lives off the repo, add the commit SHA under `_Built on:_` once it lands.

### Drive the app

Walk every criterion no test reaches through the running app as a user would, when the session carries a browser or device tool — t3's preview and device tools, Claude in Chrome, a Playwright MCP — and AGENTS.md records a **Run the app** fact. Start the app once per run with that command, and stop it when the run ends. Take a screenshot of each outcome into this conversation. A criterion that does not hold on screen is **unmet**, exactly like one the diff misses.

No tool, no fact, or a criterion the tool cannot reach (an email, a push notification) leaves the entry at its diff proof, marked `not driven` with the reason.

Done when every criterion has an entry, and every driven one has its screenshot in the conversation.

## 3. Task mode: build inline

Set the Task's `Status:` to `in-progress` and record the baseline: `git rev-parse HEAD`. In Archie the first Task to go `in-progress` moves the Epic on to being implemented too.

Invoke the Task's engineer **inline, in this conversation** — you are the engineer. **A red gate halts the run**: report the failing command and its output.

Then prove every acceptance criterion (step 2) against `git diff <baseline>` plus the untracked files. A criterion that is unmet goes back into the loop until it holds or the gap is named.

Set `Status:` to `ready-for-review` and **stop dirty** — the user tests from the working tree. Give the step 6 report, then offer to complete: at the user's word, set `done` and commit following the repo's commit conventions.

## 4. Epic mode: orchestrate

Run the `ready-for-agent` Tasks in `Blocked by` order, skipping the `done` ones. The first unblocked `ready-for-human` Task halts the run and names `/archie-assist` — committed work stays committed. In Archie: Tasks assigned to an Agent, in `blocks` order, halting on the first assigned to the human.

Per Task:

1. Set `Status: in-progress` and record the Task's baseline: `git rev-parse HEAD`.
2. **Dispatch an engineer as a sub-agent, through the sub-agent (Agent) tool**, with one instruction: run the Task's engineer skill on this Task reference.
3. Read the gate results from its report. **A red gate halts the whole run.**
4. Prove every acceptance criterion yourself (step 2) against `git diff <task baseline>` plus the untracked files. You read and drive the app; the engineer writes.
5. Criteria unmet: **one fix round**. Dispatch the engineer again with exact instructions — the criterion, the file and line, what to change. Unmet after that, halt the run with a short report — what went wrong and a suggested fix — because the user's read is the faster way out of a loop.
6. A **gap** in a `/archie-verify` report — a user story no Task ever built — halts the run. There is no Task for that behaviour and no criteria to build it against, so a fix round has nothing to bite on. Report what is missing and name `/archie-to-tasks`.
7. Criteria met: set `Status: done`, commit following the repo's commit conventions (default `<reference>: <task title>`), and give a one-line readout — reference, gate results, verdict, commit SHA — before moving on.

## 5. Epic mode: review on the PR

After the last Task:

1. Write `Status: ready-for-review` into the leaf's `epic.md`.
2. Push the branch and open a **draft** PR, `gh pr create --draft`, its title following the repo's PR conventions and its body the step 6 summary paragraph.
3. Invoke `/archie-review` **inline, in this conversation**, on the Epic and the PR, briefed **unattended** — inline because it dispatches sub-agents of its own. Its unattended step owns everything up to its final PR comment.
4. Grade 🟢: mark the PR ready, `gh pr ready`. Anything else leaves it a draft for the user.

Done when the final report is on the PR and the PR's state matches its grade.

## 6. Summary and walkthrough

Both modes end on the same report:

```md
_Built:_ {reference} — {title}

{One paragraph: what exists now that did not before, and where it shows.}

_PR:_ {link} — {grade}, {ready or draft}

### Walkthrough
- ✅ {a step through the running app} — driven
- 🖐 {a step} — not driven: {why}
```

The walkthrough is the criteria the tests cannot reach, written as steps someone follows through the running app without reading the code — the user's own way to test it, so every one of them stays in, driven or not. The mark says which you already walked. Criteria the tests already cover stay out — the suite says so. The `_PR:_` line is epic mode's. In epic mode the paragraph covers all Tasks and the walkthrough gets a sub-heading per Task, the closing Task's section written from its `No test reaches` list — the leaf-level walk.

The session stays open after the report: the user's review is theirs to run — code, taste, UI — and their change requests are honored inline or written up as a new Task in the epic, at their word.
