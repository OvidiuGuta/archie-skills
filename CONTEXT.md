# Archie

**Archie** is a personal assistant. This repo holds its engineering skill framework: a three-phase way of working with AI agents, Setup, Planning (HITL) and Implementing (AFK), where Planning and Implementing repeat. It replaces mattpocock/skills.

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

**Test plan**:
The list an implementing run ends on: every one of a Task's acceptance criteria marked either covered by a test or walk-it-by-hand, the manual ones written as steps through the running app. There is no browser-driven E2E in the pipeline, so the test plan is what stands between a finished run and a criterion nobody checked.

**Altitude**:
Whether a question or a decision has blast radius beyond one part of the Epic at hand. At altitude means it is asked and settled now; below altitude means it is deferred, and the deferrals cluster into child Epics.

**Architect**:
The verb for a working session in which the user and the agent scope an Epic together, reaching shared understanding rather than producing a plan document up front.

**Resolution**:
The level of detail at which an Epic is understood. Splitting an Epic lowers resolution: children describe the same subject in sharper detail, not different subjects. An Epic is specified once its resolution is high enough to build from.

**Interviewing**:
The one-question-at-a-time discipline used inside an Architect session to reach shared understanding.
_Avoid_: Grilling
