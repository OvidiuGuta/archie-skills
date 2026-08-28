---
name: archie-prototype
description: Building a throwaway artifact in a sub-agent for the user to react to, and revising it in that same sub-agent. Reached by /archie-architect when a question is "how should this look or behave".
---

# Prototype

The exit for a question the user answers by looking rather than by thinking. It exists so a session stops agreeing vaguely about a screen neither party has seen, and it runs in a **sub-agent** returning a **pointer**, so the session's context stays on the interview.

## Throwaway is the point

The artifact is **evidence**, not a head start. Build the cheapest thing that provokes a real reaction: hardcoded data, one screen, no persistence, no auth, no tests, no error states beyond the one being asked about.

It lives in `prototypes/<slug>/` inside the Epic's own directory under `.archie/`, is never imported by the real code, and goes when the tree goes. What survives is the answer, carried into `spec.md` and into whatever `/archie-domain-modeling` records — never the code. Say this to the sub-agent in the brief, because an agent handed a UI question will otherwise reach for the project's real stack, its real data layer and its real conventions, and spend an hour earning a reaction it could have had in ten minutes.

## Dispatch

One sub-agent, carrying:

- **The one question** it is being built to answer — "how should this look" narrowed to the thing actually in doubt.
- **The destination**, `prototypes/<slug>/`, and the throwaway bar above.
- **How the user will look at it** — the command to run it, or a single file to open. A prototype the user cannot open in one step has not answered anything.

Keep the sub-agent's id. The next turn needs it.

## Revise in the same sub-agent

A reaction almost always lands as a small change: narrower sidebar, the total moved above the fold, two states collapsed into one. **Send the change to the sub-agent already holding the prototype** rather than dispatching a fresh one. It still has the artifact's shape in context, so the revision is one edit; a new sub-agent pays the full cost of reading the world again and quietly rebuilds the thing slightly differently, which makes the second reaction incomparable to the first.

## The user reacts

The sub-agent builds and stops. It does not judge its own artifact, predict what the user will make of it, or turn a reaction into a settled decision.

Return the pointer:

```md
_Prototype:_ {the question it answers} → `.archie/{epic path}/prototypes/{slug}/`
{How to look at it, in one line.}
```

The reaction happens at the top level, in the user's own words, and `/archie-architect` records what it settles through `/archie-domain-modeling`. That is the whole product of the exercise; the directory is the receipt.
