# Planning is a recursive Effort tree, not a fixed hierarchy

The planning artifact could have been a fixed ladder of named levels (Initiative, Epic, Spec, Task), each with its own template and rules. We chose a single recursive node type, the Effort, which either splits into child Efforts or carries exactly one Spec, never both.

The reason is that splitting is a **resolution** mechanism rather than a work breakdown: a child describes the same subject in sharper detail, so the number of useful levels varies per subject and cannot be fixed in advance. A ladder would force a name and a template per level and would make depth four an error. One node type gives one template, one status machine, and one closing rule ("an Effort is done when all its children are done") that holds at every depth including the root.

## Consequences

- All buildable work lives at leaves, so listing leaves answers "what is left to build".
- Glue and integration work cannot hide at a parent. It must become an explicit final child, which makes it schedulable and reviewable.
- Agile level vocabulary (roadmap, epic, initiative) survives only as informal conversation. The system knows no such types.
