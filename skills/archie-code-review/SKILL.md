---
name: archie-code-review
description: Reviewing one Task's diff against its three contracts — the Spec, the Task's acceptance criteria, and the design.md it claims to follow — plus the Fowler smell baseline, and returning triaged findings. The reviewer step of /archie-implement's ready-for-agent pipeline.
---

# Code review

One Task's diff, held against **three contracts**: the leaf's Spec, the Task's acceptance criteria, and the `design.md` the code claims to follow. A diff can satisfy any two and break the third, so all three are checked every run, and the **smell baseline** in step 5 catches what no contract speaks to.

You find; the engineer fixes. Every finding travels back to the orchestrator as text, and the working tree leaves this run exactly as it arrived — a reviewer who fixes has reviewed its own code by the time it reports.

## 1. Inherit

You are handed a Task reference (`3.2#1`) or its path. Read, before looking at any code:

- The **task file** — the demoable outcome and the [acceptance criteria](./references/templates/task.md), which are the contract the outcome is judged against.
- The **`design.md`** beside it — the modules, the seam, and the [units to pin](./references/templates/design.md). This is what the code claims to have done.
- The leaf's **`spec.md`** — the [seam](./references/templates/spec.md) and the Implementation Decisions.
- The **test prior art** named in the [facts section](./references/agents-facts.md), so house style is what you measure against rather than your own.

Done when you can state the outcome, the seam, every criterion, and every unit the design listed as modified.

## 2. Read the diff

Read the whole diff for this Task — every changed file, tests included. Read the surrounding code where the diff lands, because a change is correct or wrong only in the context it sits in.

Done when every changed file has been read and you can name what each one contributes to the outcome.

## 3. Hold the diff against the three contracts

Take them one at a time, and name the specific line or file for each finding:

- **Against the Spec** — does the change respect the Implementation Decisions, the interfaces and the contracts the leaf fixed? Work that reaches past this Task into another Task's territory belongs here too.
- **Against the acceptance criteria** — is each criterion actually met by code in this diff? A criterion nothing in the diff addresses is a finding, whether or not the tests are green.
- **Against the design** — did the code build the modules the design named, in the structure it intended? A divergence is a finding even when the code works, because the next Task's architect reads that design as the state of the world.

Done when every criterion has a verdict and each contract has been walked in full.

## 4. Hold the tests against their layers

The [three test layers](./references/test-layers.md) are what makes the outcome hold tomorrow, so they are reviewed as carefully as the code:

- **The integration test exists, and sits at the Spec's seam.** One test, at that seam. A test parked at a lower or more convenient seam — a helper, an internal function, a place that was simply easier to wire — is a finding even when it passes.
- **Every unit the Task modified has a unit test.** Walk the design's modified units and the diff's changed units; a modified unit with no test is a finding. A unit merely read is out of scope, and pulling it in metastasises the suite.
- **Each unit test asserts behaviour at its unit's boundary** — what it returns, what it emits, what it calls on its collaborators. Apply the rename test: a test that would break when a symbol is renamed or a helper is extracted is pinned to implementation rather than behaviour, and it is rejected. A test asserting on private state, call counts of internal helpers, or a snapshot of internal shape fails the same way.

Done when the integration test's seam is confirmed against the Spec, every modified unit is accounted for, and every unit test in the diff has passed or failed the rename test.

## 5. Match the diff against the smell baseline

Twelve [Fowler smells](https://martinfowler.com/books/refactoring.html) (_Refactoring_, ch. 3), which apply on top of the three contracts and hold even where nothing is documented. Two rules bind them:

- **The design and the Spec override.** Where either endorses the shape a smell would flag, the smell is suppressed — the contracts are the authority, this list is the backstop.
- **Every smell is a judgement call**, labelled as one ("possible Feature Envy") rather than reported as a breach, and it never blocks. Skip anything the repo's lint and typecheck gates already enforce, since those ran in `/archie-tdd`.

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

Done when all twelve have been matched against the diff, each one you name quotes its hunk, and anything the design or the Spec endorses has been suppressed rather than reported.

## 6. Triage every finding

Each finding is one of three kinds, and the label decides what the orchestrator does with it, so it is your job rather than the reader's:

- **Code defect** — the contracts are sound and the code missed them. The engineer fixes it in place.
- **Planning defect** — the contracts themselves are the problem: an ambiguous or unbuildable acceptance criterion, code that is right against the Spec and wrong against the design, or two contracts that contradict each other. Its blast radius reaches past this Task, so only the user settles it. See [`references/altitude.md`](./references/altitude.md).
- **Smell** — the contracts hold and the shape is worth a second look. A judgement call, reported for the user's eye and the engineer's discretion, and never worth a fix round on its own. A smell that also breaks a contract is a code defect, and belongs there instead.

For the first two, the distinction is which document has to change for the finding to go away: this Task's code, or something above it.

Done when every finding carries one of the three labels.

## 7. Report

```md
_Reviewed:_ {Task reference} — {Task title}
_Verdict:_ {pass, or N findings — X code, Y planning, Z smells}

### Code defects
- {file:line} — {what breaks which contract, and what the fix has to achieve.}

### Planning defects
- {what contradicts what, and which document has to change.}

### Smells
- {possible {smell name}} — {file:line} — {the hunk, and the refactor it suggests.}
```

Findings only, ordered worst first, each naming its file and line so the engineer does not repeat your reading. A clean diff reports as a pass in the same shape, with the contracts you checked stated — the orchestrator triages on what you report, and an unnamed finding is one nobody acts on.
