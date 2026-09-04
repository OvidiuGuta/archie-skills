---
name: archie-assist
description: Guiding the user through one ready-for-human Task — a signup, a secret, a permission — one step at a time from the service's live documentation, then verifying the state they produced and reporting. Run it on a single Task reference whose label says it needs a person. Only for explicit user invocation — never fire it on your own.
---

# Assist

One `ready-for-human` Task, from `todo` to `ready-for-review`, **with the user in the room**.

This is the work no agent can do: signing up for a service, provisioning access, obtaining a key, granting a permission. It produces no diff, which is why it is not `/archie-implement`'s job — the build, the review and the fix round all presuppose code. There are no sub-agents either: the user is present, so guiding them is the work.

## 1. Resolve the Task and clear the gates

You are handed **one** reference — `3.2#1` or a path. Everything resolves from it: Epics are numbered directories nested under `.archie/`, so `3.2` is child `02` of child `03` of the root, `#1` is `tasks/01-<slug>.md` inside it, and the leaf's `spec.md` sits beside the `tasks/` folder.

No `.archie/` at all is a repo that has never been planned. Say so and name `/archie-architect`, which walks the planning steps from scoping through to Tasks.

Read the task file — its demoable outcome, its acceptance criteria, its `Blocked by` line and its `Label` — and the leaf's `spec.md`.

Two gates:

- **The blocking edges are met.** Every Task on `Blocked by` is `done`.
- **The label is `ready-for-human`.** A `ready-for-agent` Task halts here and names `/archie-implement`. Any other value, and a task file with no `Label` line, halts and names what it found.

Then set `Status:` to `in-progress`.

## 2. Derive the path now, at guide time

Read the Task's outcome and its criteria to learn *what* has to exist, then work out the current route to it from the service's own documentation as it stands today.

**A third-party UI moves.** A signup flow written down three weeks ago names a button that has been renamed and a settings page that has been split in two, and following it lands the user somewhere that does not match what they are reading. So treat any instructions the task file carries as stale context rather than the script, and leave both them and the criteria exactly as they are. What you derive is guidance for this run and stays in the conversation.

Done when you can state the current route to the outcome and where each acceptance criterion becomes true along it.

## 3. Guide, one step at a time

Give the user a **single action**, wait, and confirm it landed before deriving the next one from where they actually are.

A batch of ten steps pasted at once comes back as one "done" that covers whichever of them happened, and a step that went differently early makes every step after it wrong.

When the user reports something the route does not predict — a screen that is not there, a plan that costs money, a permission they do not hold — **that is the new starting point.** Re-derive from it rather than repeating the step.

## 4. Verify what they produced

The outcome is state rather than behaviour, so check the state yourself, against the real world:

- An env var or config entry is **present where the app actually reads it**.
- A key or token **authenticates on a live call** to the service it belongs to.
- An account **signs in**.

Grade every acceptance criterion **verified** or **unverified**, and say what confirmed each verified one. A criterion nothing observable can confirm stays `unverified` all the way into the report: this state was created by hand and no suite stands behind it, so an unverified criterion counted as a pass is the one thing this skill cannot afford.

A criterion unverified because a step did not take is **one trip back to step 3 for that step alone**, then check again. What is still unverified after that travels into the report as it is.

## 5. Set the status and report once

Set `Status:` to `ready-for-review`. `done` is the user's word and only the user writes it.

```md
_Assisted:_ {Task reference} — {Task title}
_Status:_ ready-for-review

### Steps you performed
1. {the step, and what it produced}
{Any step that could not be completed, and where it stopped.}

### Criteria
- **verified** — {criterion} — {what confirmed it}
- **unverified** — {criterion} — {why nothing could confirm it}

### Left for you
{Every unverified criterion, and anything a later Task now depends on — a key that expires, a plan that will start billing, a permission granted to one account only.}
```
