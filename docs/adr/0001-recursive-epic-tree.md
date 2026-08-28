# Planning is a recursive Epic tree, not a fixed hierarchy

The planning artifact could have been a fixed ladder of named levels (Initiative, Epic, Spec, Task), each with its own template and rules. We chose a single recursive node type, the Epic, which either splits into child Epics or carries exactly one Spec, never both.

The reason is that splitting is a **resolution** mechanism rather than a work breakdown: a child describes the same subject in sharper detail, so the number of useful levels varies per subject and cannot be fixed in advance. A ladder would force a name and a template per level and would make depth four an error. One node type gives one template, one status machine, and one closing rule ("an Epic is done when all its children are done") that holds at every depth including the root.

**The node is called an Epic even though "Epic" is a size class everywhere else.** Every tracker puts an Epic at one fixed rung, so an Epic containing Epics reads as a category error, and a genuinely size-neutral word would carry no such baggage. It is still the better name: this vocabulary is read far more often than it is defined, and a word with weight and instant recognition beats a neutral one nobody says out loud. The cost is paid by making `Resolution` explicit wherever the tree is described, so a reader learns the node is a level of detail rather than a level of the org chart.

## Consequences

- All buildable work lives at leaves, so listing leaves answers "what is left to build".
- Glue and integration work cannot hide at a parent. It must become an explicit final child, which makes it schedulable and reviewable.
- The rest of the agile ladder stays out. `Story` and `Sub-task` have a canonical position relative to an Epic, and importing the head term pulls on them, so both sit on the `_Avoid_` list alongside roadmap, initiative, theme and milestone. The system knows one node type.
- `sub-Epic` is conversational only. It never enters the glossary or a `SKILL.md`, because two node names in a document thirteen skills read literally is how a ladder gets inferred.
