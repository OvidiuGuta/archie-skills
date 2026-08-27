---
name: archie-research
description: Resolving a factual question in a sub-agent that writes its findings to a file and returns the path. Reached by /archie-architect when a question in a session is a fact rather than a decision.
---

# Research

The exit for a question whose answer is true whether or not this project likes it. It runs in a **sub-agent** and comes back as a **pointer**, so the session spends a sentence of context on documentation it is never going to reread.

## The gate

> **Is there an answer that holds independently of what this project wants?**

- **A fact** — dispatch it. The rate limit, the API's actual shape, what the library does at the version in the lockfile.
- **A decision** — hand it back to the user. Research supplies option spaces and their consequences; picking one is the user's move, and a sub-agent that comes back with "use X" has answered a question that was never its to answer.

A decision often hides a fact inside it. Split it: dispatch the fact, and put the decision back on the frontier for the moment the finding lands.

Sharpen before dispatching. One answerable question per dispatch — a brief asking three things comes back as three shallow answers.

## Dispatch

One sub-agent, carrying four things:

- **The question**, in one sentence.
- **What turns on it** — the decision waiting on the answer, so the sub-agent knows when it has enough.
- **The destination**: `research/<slug>.md` inside the Effort's own directory under `.archie/`. It is committed and disposable with the rest of the tree, so anything that must outlive the tree reaches `CONTEXT.md` or `docs/adr/` through `/archie-domain-modeling`.
- **The source bar** — the project's own code and lockfile first, then the vendor's own documentation *at the version in use*. A blog post is a lead to chase back to a primary source, not a source. Every claim in the file carries the source it came from, with its version.

Tell it to report a question it cannot settle **as unsettled**, naming what it read and what is missing. "The docs do not say" is a finding, and it is the one finding an agent is most tempted to paper over.

## Return a pointer

The findings file runs to pages and the session needs two lines. Returning the findings inline puts the whole document into the context this skill exists to protect, which is the whole reason the work happens in a sub-agent at all.

```md
_Researched:_ {the question} → `.archie/{effort path}/research/{slug}.md`
{The answer, in one or two lines, and what is still unsettled.}
```

`/archie-architect` reads those two lines, asks the question that was waiting on them, and opens the file only if the answer turns out to be contested.
