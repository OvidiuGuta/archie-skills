# Architect sessions are bounded by an altitude test, and the split is read off the deferrals

An Architect session interviews the user one question at a time. Left unbounded, that interview would descend until the whole subject was specified in a single sitting, which is the waterfall the framework exists to avoid. A question budget would bound it, but arbitrarily.

Instead, before asking a question the agent applies an **altitude test**: does the answer have blast radius beyond one part of this Effort? Cross-cutting questions are asked now. Questions local to one part are **deferred**, announced in one line so the user sees them accumulate, and the clusters they form become the child Efforts. Sessions terminate naturally because cross-cutting decisions at any resolution are few, while local ones are many.

## Three exits from a question

Interviewing is the default way an Architect session resolves a question, not the only one. A question has three exits:

- **Ask the user.** The default, one question at a time. Reserved for decisions, which are the user's.
- **Research** (AFK). The question is a *fact*, not a decision. A sub-agent looks it up and writes its findings to a file inside the Effort, returning a path and a short summary. The session never asks the user for something it could look up.
- **Prototype** (HITL). The question is "how should this look" or "how should this behave", which conversation resolves badly. A sub-agent builds a throwaway artifact and returns its path; the user reacts to it in the session. Iteration resumes the same sub-agent rather than spawning a new one.

Both non-interview exits run in sub-agents and return **pointers, never inline findings**, so the building and reading never enters the interview's context.

This distinguishes two kinds of deferral. A question below altitude is deferred into a child Effort. A question *at* altitude that conversation simply cannot answer becomes a research or prototype move inside the current session.

## Consequences

- A Split Effort's session still produces real output: the children, plus the ADRs and glossary entries settled at that resolution. Decisions that span siblings are settled at the parent, so no sibling inherits a decision it never weighed in on.
- The user's override is continuous rather than a single accept-or-reject: any deferred question can be pulled back up to the current resolution.
- A periodic check-in remains as a backstop for when the agent's altitude judgment is simply wrong.
- Size is a separate check applied after the split decision. An Effort with an empty frontier that is still too big to build is sliced, which is a mechanical job, not a resolution question.
