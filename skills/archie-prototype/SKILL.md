---
name: archie-prototype
description: Build a throwaway prototype that answers one design question — UI variants on a real route, or a single-file logic demo anyone can drive. Use when a design question is answered better by looking at something than by talking about it.
---

# Prototype

A prototype is **throwaway code that answers one question**. It exists so nobody agrees vaguely about a screen or a state model neither party has seen.

You have been given the question, and for a logic demo the directory to write it in. Build the artifact, stop, and return the pointer. You do not judge your own prototype, predict what the user will make of it, or turn a reaction into a settled decision — the reaction happens where the question was asked, in the user's own words.

## Pick the branch

The question decides the shape, and the two shapes produce completely different artifacts. Getting this wrong wastes the whole prototype.

- **"What should this look like?"** → [`references/UI.md`](./references/UI.md). Several radically different variants of one surface, mounted on the real route and switchable from a floating bar.
- **"Does this logic or state model feel right?"** → [`references/LOGIC.md`](./references/LOGIC.md). One self-contained HTML file that pushes the model through the cases that are hard to reason about on paper, drivable by a non-developer.

If the question is genuinely ambiguous, pick off the surrounding code — a backend module leans logic, a page or component leans UI — and state the assumption at the top of the artifact.

## Throwaway is the point

The artifact is **evidence**, not a head start. Build the cheapest thing that provokes a real reaction: hardcoded data, no persistence, no auth, no tests, no abstractions, and no error states beyond the one being asked about. Nothing generalises — "what if we wanted X later" is a question this prototype is not answering.

An agent handed a design question will otherwise reach for the project's real stack, its real data layer and its real conventions, and spend an hour earning a reaction it could have had in ten minutes.

Use the project's component library and styling system, because a variant judged in a foreign visual language is not being judged. Everything else about the project's production standards is suspended.

## It must never ship

Prototypes live **on the current branch**, next to the thing they are prototyping, so nothing but the artifact itself stands between one and production. Three rules, and all three hold:

1. **Named as a prototype.** `prototype` in the file or directory name, so a casual reader can see it is not production. Follow the project's existing routing and file conventions — do not invent a new top-level structure.
2. **Gated.** Anything that renders is behind a production check (`process.env.NODE_ENV !== 'production'` or whatever the project uses) *and* behind its own explicit switch, so it cannot appear in a production build and cannot be reached by accident.
3. **Never replaces the real render.** The host page keeps doing exactly what it did before. A prototype adds a path through the code; it does not take one over.

## Surface the state

Render the full relevant state after every action, and on every variant switch, so what changed is visible rather than inferred. A prototype the user has to reason about has not saved them any reasoning.

## Prune when a shape is confirmed

Once the user confirms which shape they want, the artifact stops being a comparison and becomes the record of the answer. Prune it:

- Delete the variants nobody chose.
- Delete the switcher.
- Delete every word of framing copy — the intro, the "three options" note, the labels explaining what to compare.

What is left is one artifact, still gated and still named as a prototype, that reads as the agreed shape with nothing to interpret. It stays where it is, and the Spec for that work may point at it.

It is still not production code. It was written with no tests and no error handling, so the Task that builds the real thing rewrites it under real constraints rather than promoting it.

## Return a pointer

The session that asked the question needs two lines, not the artifact:

```md
_Prototype:_ {the question it answers} → {path}
{How to look at it, in one line: the command to run, or the file to open.}
```

A prototype the user cannot open in one step has not answered anything.
