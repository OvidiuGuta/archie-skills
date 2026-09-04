# Template: `spec.md`

Exactly one per Specified Epic, beside its `epic.md`. Its what-sections are written by synthesising the scoping session that just happened, without interviewing again. Its two how-sections, and `## Prototype` when there is one, are written later, by the design session.

```md
# Spec: {Title}

**Epic:** {3.2}

## Problem Statement

The problem, from the user's perspective.

## Solution

The solution, from the user's perspective.

## User Stories

A long, numbered list covering every aspect of the work: `As a {actor}, I want {feature}, so that {benefit}`.

## Prototype

Only when one was built. The design session writes it, in this shape:

**Question it answered:** {the one question}
**Winner:** `{name}` in `{path}`{, on branch `prototype/{slug}` for a UI prototype}
**Authority:** the winner is the agreed shape. Where this Spec and the prototype disagree about what is on the screen, the prototype wins. It carries no tests, no error handling and hardcoded data; those are yours to add.

## Implementation Decisions

The data, the contract, the structure and the dependencies this leaf settles. Written by the design session; `_Not yet designed._` until then.

## Testing Decisions

The **seams** the feature is tested at, and the prior art the new tests should match. Written by the design session; `_Not yet designed._` until then.

## Out of Scope

What this Spec deliberately leaves out.

## Further Notes

Anything the next reader needs and nothing above carries.
```

- `Epic:` keeps the Spec self-describing when a sub-agent is handed it as bare text. It is redundant with the file's own path, deliberately.
- No status line. Statuses live on Tasks alone, so nothing here can go stale.
- Every section carries content. A section with nothing in it means the synthesis is short of material, not that the section does not apply — `Out of Scope` in particular is where a Spec proves it has a boundary.
- `## Prototype` is conditional rather than placeholdered: absent means no prototype was built, and there is no third state to signal. `/archie-to-spec` omits the heading entirely; `/archie-design` inserts it.
- The two how-sections are the exception, and only until they are designed. `_Not yet designed._` standing alone under either of them is the **literal marker** that this leaf is Specified and undesigned, so it is written exactly, never paraphrased.
