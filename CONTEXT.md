# Archie

**Archie** is a personal assistant. This repo holds its engineering skill framework: a three-phase way of working with AI agents, Setup, Planning (HITL) and Implementing (AFK), where Planning and Implementing repeat. It replaces mattpocock/skills.

## Language

**Effort**:
A unit of scoped work in the planning tree. The single recursive node type: an Effort may contain child Efforts, and those children are themselves Efforts at any depth.
_Avoid_: Roadmap, roadmap item, initiative, epic, theme, milestone, track

**Split Effort**:
An Effort that has child Efforts and no Spec. Its children are built in order.

**Specified Effort**:
An Effort that has exactly one Spec and no children. All buildable work lives here, so every Specified Effort is a leaf of the tree.

**Spec**:
The description of what to build for one Specified Effort. Its own file inside the leaf, never embedded in `effort.md`, and carrying an explicit reference back to its Effort.

**Task**:
One unit of buildable work derived from a Spec, and the unit `/implement` consumes. Referenced as `3.2#1`.

**Altitude**:
Whether a question or a decision has blast radius beyond one part of the Effort at hand. At altitude means it is asked and settled now; below altitude means it is deferred, and the deferrals cluster into child Efforts.

**Architect**:
The verb for a working session in which the user and the agent scope an Effort together, reaching shared understanding rather than producing a plan document up front.

**Resolution**:
The level of detail at which an Effort is understood. Splitting an Effort lowers resolution: children describe the same subject in sharper detail, not different subjects. An Effort is specified once its resolution is high enough to build from.

**Interviewing**:
The one-question-at-a-time discipline used inside an Architect session to reach shared understanding.
_Avoid_: Grilling
