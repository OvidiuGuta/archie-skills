# Archie

**Archie** is a personal assistant. This repo holds its engineering skill framework: a four-phase way of working with AI agents — Setup, Planning (HITL), Implementing (AFK) and Reviewing — where Implementing and Reviewing loop until an Epic's branch grades mergeable, and Planning restarts the cycle on the next Epic. It replaces mattpocock/skills.

## Language

**Epic**:
A unit of scoped work in the planning tree. The single recursive node type: an Epic may contain child Epics, and those children are themselves Epics at any depth. An Epic here is a level of **Resolution**, not a size class, so unlike an Epic in a tracker it has no fixed rung and nests without limit.
_Avoid_: Effort, Roadmap, roadmap item, initiative, theme, milestone, track, Story, Sub-task

**Split Epic**:
An Epic that has child Epics and no Spec. Its children are built in order.

**Specified Epic**:
An Epic that has exactly one Spec and no children. All buildable work lives here, so every Specified Epic is a leaf of the tree.

**Spec**:
The description of what to build for one Specified Epic. Its own file inside the leaf, never embedded in `epic.md`, and carrying an explicit reference back to its Epic.

**Task**:
One unit of buildable work derived from a Spec, and the unit the implementing skills consume — `/archie-implement` when its label says an agent can build it, `/archie-assist` when it needs a person. Referenced as `3.2#1`.

**Walkthrough**:
The report an implementing run ends on: one summary paragraph, then the acceptance criteria no test reaches written as steps through the running app someone can follow without reading the code. There is no browser-driven E2E in the pipeline, so the walkthrough is what stands between a finished run and a criterion nobody checked. Criteria the tests cover stay out of it.
_Avoid_: test plan

**Grade**:
The mergeability verdict a review ends on, per axis and overall, where overall is the worse of the two: 🟢 mergeable, 🟠 mergeable with reservations, 🔴 needs work. A review's findings list carries only what needs fixing; the grade carries everything else.

**Seam**:
Where a feature's integration tests attach. Fixed in a Specified Epic's Spec, spanning every Task in that leaf, which is what puts it at altitude for the Spec and leaves each module's internals to the Task that builds it. Chosen by preferring one the repo already uses, sitting as high as possible, and using as few as possible — which is unjudgeable until the module surface underneath it is known, so it is confirmed in the Design session rather than alongside the Spec's what. Once baked in it is expensive to move.
_Avoid_: test boundary, integration point, test hook

**Tracer bullet**:
The shape of a Task: a narrow but complete path through every layer, fired end to end so something observable happens at the far end. The reason a Task carries exactly one demoable outcome rather than one layer's worth of work.
_Avoid_: vertical slice, spike, walking skeleton

**Altitude**:
Whether a question or a decision has blast radius beyond one part of the thing at hand. At altitude means it is asked and settled now; below altitude means it is left to whoever works that part. Applied question by question, before the interview asks, at two rungs: Scope asks whether it reaches beyond one part of this Epic, and the deferrals cluster into child Epics; Design asks whether it reaches beyond one Task, and what does not is left to the engineer building that Task.

**Residue**:
An at-altitude decision that does not clear the ADR bar. One line under `## Decisions` in its Epic's own `epic.md`, no reasoning, where child Epics inherit it. Written by the Scope session, and it dies with the tree by design.

**Coding standard**:
A rule of the user's about how code is written in a repo, enforceable line by line on a diff. Where an ADR records why something is built the way it is, a standard says whether a line of code is acceptable; one decision can produce both. Lives in `STANDARDS.md` at the repo root, linked from `AGENTS.md`, and edited only at the user's request.
_Avoid_: convention — Archie's own conventions ship inside the skills; code style

**Architect**:
The router over the four planning steps. It resolves an Epic reference, reads which step that Epic is at off its own files, dispatches that step, reports where the Epic now stands, and stops. One interview per invocation, so a step holding an interview carries its own synthesis to the end and the four steps run as two sessions. It holds no discipline of its own.
_Avoid_: Architect as the name of the interviewing session — that is Scope.

**Scope**:
The verb for the working session that reaches shared understanding of **what** an Epic covers, ending on a recommendation to split or specify. Altitude-bounded, one question a turn.

**Design**:
The verb for the working session that reaches shared understanding of **how** a Specified Epic is built, in this codebase. Runs on a leaf only, after its Spec exists, and writes the Spec's `Implementation Decisions` and `Testing Decisions`. The last human checkpoint before implementation runs unattended.

**Surface**:
What other code or a person calls: an endpoint and its shape, a URL, a CLI flag, an exported API, a module or component name, a package. A Spec names surfaces and never file locations, because a location rots within the week and a surface is the thing that was agreed.
_Avoid_: interface as a synonym, which already means a language construct

**Resolution**:
The level of detail at which an Epic is understood. Splitting an Epic lowers resolution: children describe the same subject in sharper detail, not different subjects. An Epic is specified once its resolution is high enough to build from.

**Interviewing**:
The one-question-at-a-time discipline for reaching shared understanding on a plan or design: work down the design tree, dependencies first, each question carrying a recommended answer. General-purpose, and told nothing about Epics or Altitude — the session composing it supplies those.
_Avoid_: Grilling as the name of the discipline. As a trigger phrase the user types, it is fine.
