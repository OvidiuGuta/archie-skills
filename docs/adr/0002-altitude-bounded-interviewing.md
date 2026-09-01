# Architect sessions are bounded by an altitude test, and the split is read off the deferrals

_Amended by [0013](0013-planning-is-a-resumable-router-over-four-steps.md): the gate and the exits below belong to `/archie-scope`, and prototyping moved to `/archie-design`._

A scoping session interviews the user one question at a time. Left unbounded, that interview would descend until the whole subject was specified in a single sitting, which is the waterfall the framework exists to avoid. A question budget would bound it, but arbitrarily.

Instead, before asking a question the agent applies an **altitude test**: does the answer have blast radius beyond one part of this Epic? Cross-cutting questions are asked now. Questions local to one part are **deferred**, announced in one line so the user sees them accumulate, and the clusters they form become the child Epics. Sessions terminate naturally because cross-cutting decisions at any resolution are few, while local ones are many.

The gate belongs to **`/archie-scope`**, not to interviewing. `/archie-interview` is general-purpose interviewing technique and is told nothing about Epics or altitude; `/archie-scope` applies the test to each question before the interview asks it, announces the deferrals and reads the clusters off them. See [0012](0012-a-skill-states-only-its-own-discipline.md).

## Two exits from a question

Interviewing is the default way a scoping session resolves a question, not the only one. A question has two exits:

- **Ask the user.** The default, one question at a time. Reserved for decisions, which are the user's.
- **Research** (AFK). The question is a *fact*, not a decision. A sub-agent looks it up and writes its findings to a file inside the Epic, returning a path and a short summary. The session never asks the user for something it could look up.

The research exit runs in a sub-agent and returns a **pointer, never inline findings**, so the reading never enters the interview's context. The sub-agent is told to use `/archie-research`: that skill is written to the reader, and `/archie-scope` supplies only what it alone knows — the question, what turns on it, and the destination inside the Epic. See [0012](0012-a-skill-states-only-its-own-discipline.md).

There was a third exit, **prototype**, for "how should this look or behave". [0013](0013-planning-is-a-resumable-router-over-four-steps.md) moved it to `/archie-design`: that is a how-question, and at scope altitude the question is whether to split.

This distinguishes two kinds of deferral. A question below altitude is deferred into a child Epic. A question *at* altitude that conversation simply cannot answer becomes a research move inside the current session.

## Consequences

- A Split Epic's session still produces real output: the children, plus the ADRs and glossary entries settled at that resolution. Decisions that span siblings are settled at the parent, so no sibling inherits a decision it never weighed in on.
- The user's override is continuous rather than a single accept-or-reject: any deferred question can be pulled back up to the current resolution.
- A periodic check-in remains as a backstop for when the agent's altitude judgment is simply wrong. It states what is settled, what is deferred and the current lean, and belongs to the step that makes the recommendation.
- Size is a separate check applied after the split decision. An Epic with an empty frontier that is still too big to build is sliced, which is a mechanical job, not a resolution question.
