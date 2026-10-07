# Planning commits on the call, and a clear Epic plans in one session

Amends [0003](0003-epic-tree-on-disk.md) on when an Epic is created and where research lives, and [0014](0014-an-interview-step-carries-its-own-synthesis.md) on how far a session chains.

Four frictions, one theme: the planning flow paid for ceremony the work did not need.

## The Epic is written on the user's call

A scoping session wrote `epic.md` in the same turn as its recommendation, and research created the Epic's directory before that. But a session may only be testing an idea or answering a question, and it becomes work when the user says so. So nothing in the tree is written until the user calls **split** or **specify**. A session that ends on neither leaves no Epic behind. The recommendation turn shows what the call will write, so the user still decides on the Epic they are about to get.

There is no "park" call. Terms, ADRs and standards are still written the moment they settle, so a session that ends on neither call keeps everything that outlives a tree anyway, and a parked Epic would be the early creation this removes.

## Research lives outside the tree

A finding is written mid-scope, before any Epic exists, so findings move to a flat `.archie/research/<slug>.md`, any Epic's, and an Epic points at the ones it relied on from a `## Research` list written at the call. In Archie a finding is a Project Note, linked to the Epic once the call opens it, rather than the first finding opening the Epic. `research` is reserved and never a root Epic's slug. Findings now outlive a deleted tree; the user cleans them up.

## Design may run inline

0014 stopped a scope session at the Spec, because design is a fresh interview that reads the real code. On clear work with few questions per step, the second window costs more than it saves. After a specify, `/archie-scope` now offers both, recommending inline when the interview was short, the call was specify from the start, and the design headings look answerable by precedent the session already read. 0014's point that a window's weight cannot be measured from inside it still holds, which is why it is an offer the user answers rather than a rule. `/archie-architect`'s rule becomes one interview per invocation, two when the user takes the offer.

## A Task names the design it builds

Design's gate settles only what reaches beyond one Task, so no design decision belongs to one Task, and the decisions stay in the Spec. What was implicit was the routing: every engineer worked out which decisions its Task touched. Each task file now carries a `Builds:` line naming them in the Spec's words. The Spec stays the one place each decision is written.

## Archie mode has five Epic Statuses

One Status per planning step put Thin, Scoped, Specified, Designed and Sliced on the board, two of which the chaining made momentary. The planning steps now share one **Planning** Status whose `Next:` line names a skill per condition, read off what the Epic holds as files mode already does. The Epic Workflow is Planning → Ready → In progress → In review → Done. `/archie-to-tasks` sets Ready, `/archie-implement` sets In progress and In review, and Done is the human's.

At a split the children are created in Planning, each blocked by the sibling before it, so only the first can be opened and finishing one unblocks the next with nothing to promote. The parent's planning ends at the split, so it goes to In progress and waits there for its children.

## Consequences

- The derived-state table is unchanged. The scoped state, decisions and no Spec, is now momentary, reached only by a session that died between the call and the Spec.
- `/archie-setup`'s needs list shrinks to five Epic Statuses, and the planning one carries a conditional `Next:` line.
- `/archie-tdd` and the review's Spec axis read the `Builds:` line rather than inferring the routing.
