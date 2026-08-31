---
name: archie-code-review
description: Reviewing one Task's diff on two axes in parallel sub-agents — Spec (does the code do what the spec and the ticket asked?) and Standards (does it follow the repo's conventions, the test rules and the smell baseline?) — and reporting them side by side. The reviewer step of /archie-implement.
---

# Code review

Two-axis review of one Task's diff:

- **Spec** — does the code faithfully implement the leaf's `spec.md` and the Task's acceptance criteria?
- **Standards** — does it follow the repo's conventions, cover its units the way the framework requires, and stay clear of the smell baseline?

Both axes run as **parallel sub-agents** so they do not pollute each other's context, and this skill aggregates what they return. A change can pass one and fail the other, so the two are never merged.

You find; the engineer fixes. Every finding travels back as text and the working tree leaves this run exactly as it arrived — a reviewer who fixes has reviewed its own code by the time it reports.

## 1. Fix the diff

You are handed a Task reference (`3.2#1`) or its path, and the run's **baseline SHA**.

The diff is `git diff <baseline>` plus the untracked files `git status --porcelain` lists. Confirm the baseline resolves and the diff is non-empty before going further: a bad ref or an empty diff should fail here, not inside two parallel sub-agents.

## 2. Find the standards files

The Spec axis already knows its two documents: the task file and the leaf's `spec.md`, which are the only contracts. The Standards axis needs whatever this repo documents about how code is written — `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, a coding-standards file — so find those, and carry the step 3 rule sets whether or not any exist.

## 3. The two rule sets the Standards axis always carries

These hold even in a repo that documents nothing, so they are pasted into the Standards sub-agent's prompt in full — it has no other access to them.

### The test rules

- **One integration test, at the Spec's seam.** A test parked at a lower or more convenient seam — a helper, an internal function, a place that was simply easier to wire — is a finding even when it passes.
- **Every unit the diff modified has a unit test.** A unit merely read is out of scope; pulling it in metastasises the suite.
- **Each unit test asserts behaviour at its unit's boundary** — what it returns, what it emits, what it calls on its collaborators. Apply the **rename test**: a test that would break when a symbol is renamed or a helper extracted is testing implementation, and it is rejected. Assertions on private state, call counts of internal helpers, and snapshots of internal shape fail the same way.

### The smell baseline

Twelve smells from Fowler's _Refactoring_, ch. 3, stated in full below. Two rules bind them:

- **The repo and the Spec override.** Where either endorses the shape a smell would flag, suppress it — they are the authority, this list is the backstop.
- **Always a judgement call**, labelled as one ("possible Feature Envy") rather than reported as a breach, and never blocking. Skip anything the repo's lint and typecheck already enforce, since those ran in `/archie-tdd`.

Each reads *what it is* → *how to fix*:

- **Mysterious Name** — a function, variable or type whose name does not reveal what it does or holds. → rename it; if no honest name comes, the design is murky.
- **Duplicated Code** — the same logic shape in more than one hunk or file of this diff. → extract the shape, call it from both.
- **Feature Envy** — a method reaching into another object's data more than its own. → move the method onto the data it envies.
- **Data Clumps** — the same few fields or params travelling together, a type wanting to be born. → bundle them into one type, pass that.
- **Primitive Obsession** — a primitive or string standing in for a domain concept that deserves its own type. → give the concept its own small type.
- **Repeated Switches** — the same `switch` or `if`-cascade on the same type recurring across the change. → replace with polymorphism, or one map both sites share.
- **Shotgun Surgery** — one logical change forcing scattered edits across many files in the diff. → gather what changes together into one module.
- **Divergent Change** — one file edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters or hooks added for needs the Task does not have. → delete it; inline back until a real need shows.
- **Message Chains** — long `a.b().c().d()` navigation the caller should not depend on. → hide the walk behind one method on the first object.
- **Middle Man** — a class or function that mostly delegates onward. → cut it, call the real target direct.
- **Refused Bequest** — a subclass or implementer ignoring or overriding most of what it inherits. → drop the inheritance, use composition.

## 4. Dispatch both sub-agents in parallel

**The Spec sub-agent's prompt** carries the diff command, the path to the task file and the path to `spec.md`, and this brief:

> Report: (a) acceptance criteria or Spec requirements that are missing or only partly built; (b) behaviour in the diff nobody asked for — scope creep, or work reaching into another Task's territory; (c) requirements that look built but where the implementation looks wrong. Quote the criterion or the Spec line behind each finding, and name the file and line. The task file and the `spec.md` are the contracts, so judge against what they say rather than against anything you infer from elsewhere in the repo. Where a criterion is too ambiguous to judge, say so as a finding and give the reading you reviewed against. Under 400 words.

**The Standards sub-agent's prompt** carries the diff command, the standards files you found, **and both rule sets from step 3 pasted in full**, and this brief:

> Report, per file or hunk: (a) every place the diff breaks a documented repo standard, citing the file and the rule; (b) every place it breaks one of the test rules; (c) any baseline smell you spot, named, quoting the hunk. Documented standards and the test rules can be hard findings; baseline smells are always judgement calls, and a documented repo standard overrides the baseline. Skip anything the repo's tooling enforces. Under 400 words.

## 5. Aggregate

```md
_Reviewed:_ {Task reference} — {Task title}

## Spec
{the Spec sub-agent's report, verbatim or lightly cleaned}

## Standards
{the Standards sub-agent's report, verbatim or lightly cleaned}

_Findings:_ {N} on Spec, {N} on Standards — worst on each axis: {…} / {…}
```

**Report the axes separately, in their own order.** One merged ranking lets a clean Standards report bury a missing requirement, or a pile of smells bury a Spec that is fully met. Name the worst finding *within* each axis and pick no winner between them.
