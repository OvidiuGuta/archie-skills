---
name: archie-qa
description: Proving one Task's demoable outcome against the running app — one Playwright journey test walking it front to back — and grading every acceptance criterion as pinned, verified but not pinned, or unverified. The QA step of both of /archie-implement's pipelines.
---

# QA

The Task's demoable outcome, driven through the real app's front door. Unit tests say each piece behaves and the integration test says the seam holds; the **journey** is the only thing that says the pieces work together, from where a user stands.

Every criterion leaves this run with one of three grades — **pinned**, **verified but not pinned**, **unverified** — and the last two are the point. A green suite hides both, and the user reads your report to know where tomorrow's regressions live.

You prove; the engineer fixes. Findings travel back to the orchestrator as text.

## 1. Inherit

You are handed a Task reference (`3.2#1`) or its path. Read, before touching the app:

- The **task file** — the [demoable outcome](./references/templates/task.md) is the journey, and the acceptance criteria are what you grade. Its **label** decides your run: `ready-for-agent` walks every step below, `ready-for-human` skips step 3.
- The **`design.md`** beside it — the modules and the seam, so you know what the app is supposed to do now that it did not do before.
- The leaf's **`spec.md`** — the outcome in its context, and the Implementation Decisions.
- The [facts section](./references/agents-facts.md) — the run command and its port, the seed data and test credentials, the **E2E harness** and where its specs live. That directory is your prior art: a new journey matches the house style there.

Done when you can state the outcome as a walk through the app, every criterion, and the command that starts it.

## 2. Stand the app up

Start the app with the run command recorded in the facts section, exactly as written, and wait until it actually serves on the recorded port. An app that has not finished booting fails a journey for reasons that have nothing to do with the Task.

`unknown` is an answer to act on rather than a gap to fill:

- **An unknown run command** — ask the user for it, then write it into the facts section. `npm start` guessed right is luck, and guessed wrong burns the run on an app that was never up.
- **Unknown seed data or test credentials** where the journey needs a signed-in user or existing records — ask. If the answer does not come, the journey is blocked: grade the criteria it would have covered as unverified and say the block is what stopped you.

Done when the app answers on its port, or you have reported the block and stopped.

## 3. Pin the outcome in one journey test

**One** journey test per Task, in the recorded E2E harness, walking the demoable outcome **front to back** — entering where a user enters, through every screen and step the outcome needs, to the state that proves it happened. Assert the acceptance criteria at the points on that path where they become observable, so the walk and the assertions are one test rather than a walk followed by a checklist.

Run it against the standing app. Green on the real thing is the whole signal, so it stays on real wiring: a journey that passes because a route was stubbed or an assertion was loosened to match what the app happens to do has pinned nothing.

A second journey is added **only** when the Task genuinely has two distinct user paths to its outcome. When it does, add it, and note in your report that a Task with two paths was usually two Tasks — the user reads that as a signal about the breakdown, not about your test.

A `ready-for-human` Task has no journey: its outcome is state a person created by hand, and there is no code path to walk. Go to step 4.

Done when the journey exists in the harness's directory, runs against the real app, and passes for the right reason.

## 4. Prove what the journey did not

Walk the criteria the journey does not assert, by hand against the standing app, and drive the app to see each one rather than reading the code and reasoning that it holds.

A `ready-for-human` Task is entirely this step, and its criteria are **observable state** rather than clicks: the env var is present in the environment the app reads, the key authenticates against the real service with a live call, the account exists and can sign in. Check the thing itself, and a criterion whose truth lives somewhere you cannot observe stays unverified.

Done when every criterion the journey does not cover has been driven to a result or established as unobservable.

## 5. Grade every criterion

Each criterion gets exactly one grade, and the grade is a claim about what guards it tomorrow:

- **Pinned** — asserted by the journey test. It fails the suite when it breaks.
- **Verified but not pinned** — you saw it work this run, and nothing is watching it. This is where regressions come from, so it is stated per criterion rather than folded into a pass.
- **Unverified** — nothing observable could confirm it: no surface in the app, an unknown that blocked you, or a criterion written as an instruction rather than an outcome. An unattended pass never covers for something nobody checked.

A criterion the app **contradicts** is a finding rather than a grade. Label it as `/archie-code-review` does: a **code defect** when the contracts are sound and the app missed them, a **planning defect** when the criterion itself cannot be built or checked as written, whose blast radius reaches past this Task and only the user settles. See [`references/altitude.md`](./references/altitude.md).

Done when every criterion carries one grade or one labelled finding.

## 6. Report and stand the app down

Stop the app and any harness process you started, then report:

```md
_Verified:_ {Task reference} — {Task title}
_Journey:_ {path to the spec you wrote, or "none — ready-for-human"}
_Verdict:_ {outcome proven, or N findings}

### Criteria
- **pinned** — {criterion}
- **verified, not pinned** — {criterion} — {what you did to see it}
- **unverified** — {criterion} — {why nothing could confirm it}

### Findings
- {code defect | planning defect} — {what the app does, what the criterion asked for, and what the fix has to achieve.}
```

Findings only. The orchestrator has one fix round to spend on what you return, so a finding names what it saw and where — and an unproven outcome reports as exactly that, because the run stops at `ready-for-review` and the user's read of this report is the last thing between the Task and done.
