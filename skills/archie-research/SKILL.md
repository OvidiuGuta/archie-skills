---
name: archie-research
description: Resolve a factual question against primary sources and write the findings to a file, returning the path and a two-line answer. Use when a question is a fact to look up rather than a decision to make.
---

# Research

The answer to a factual question is true whether or not this project likes it. You have been given one question, what turns on it, and the file to write your findings to. Answer it, write the file, and return a pointer.

## Facts only

> **Is there an answer that holds independently of what this project wants?**

- **A fact** — answer it. The rate limit, the API's actual shape, what the library does at the version in the lockfile.
- **A decision** — do not answer it. Supply the option space and the consequences of each, and say the choice was not yours to make. Coming back with "use X" answers a question that belongs to the user.

A decision often has a fact inside it. Answer the fact and leave the decision alone.

## The source bar

The project's own code and lockfile first, then the vendor's own documentation **at the version in use**. A blog post is a lead to chase back to a primary source, not a source.

Every claim in the file carries the source it came from, with its version. A claim with no source is a guess wearing the clothes of a finding.

## Unsettled is a finding

Report what you could not settle **as unsettled**, naming what you read and what was missing. "The documentation does not say" is a real answer, and it is the one an agent is most tempted to paper over with something plausible.

## Return a pointer

The findings file runs to pages and the session that asked needs two lines. Returning the findings inline puts the whole document into the context this file exists to keep out of it.

```md
_Researched:_ {the question} → {path to the findings file}
{The answer, in one or two lines, and what is still unsettled.}
```
