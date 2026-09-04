---
name: archie-prototype
description: Build a throwaway prototype that answers one design question — UI variants on a real route, or a single-file logic demo anyone can drive. Use when a design question is answered better by looking at something than by talking about it.
---

# Prototype

A prototype is **throwaway code that answers one question**. It exists so nobody agrees vaguely about a screen or a state model neither party has seen.

You have been given the question, and for a logic demo the directory to write it in. Build the artifact, stop, and return the pointer. You do not judge your own prototype, predict what the user will make of it, or turn a reaction into a settled decision — the reaction happens where the question was asked, in the user's own words.

## Pick the shape

The question decides the shape, and the two shapes produce completely different artifacts. Getting this wrong wastes the whole prototype.

- **"What should this look like?"** → [`references/UI.md`](./references/UI.md). Several radically different variants of one surface, mounted on the real route and switchable from a floating bar.
- **"Does this logic or state model feel right?"** → [`references/LOGIC.md`](./references/LOGIC.md). One self-contained HTML file that pushes the model through the cases that are hard to reason about on paper, drivable by a non-developer.

If the question is genuinely ambiguous, pick off the surrounding code — a backend module leans logic, a page or component leans UI — and state the assumption at the top of the artifact.

## Throwaway is the point

The artifact is **evidence**, not a head start. Build the cheapest thing that provokes a real reaction: hardcoded data, no persistence, no auth, no tests, no abstractions, and no error states beyond the one being asked about. Nothing generalises — "what if we wanted X later" is a question this prototype is not answering.

An agent handed a design question will otherwise reach for the project's real stack, its real data layer and its real conventions, and spend an hour earning a reaction it could have had in ten minutes.

Use the project's component library and styling system, because a variant judged in a foreign visual language is not being judged. Everything else about the project's production standards is suspended.

## It lives on a throwaway branch

A **UI** prototype edits real app source, so it is built on its own branch and never on the one you are working from. First thing, record the branch you are on, then cut `prototype/<slug>` off it. Nothing is gated, nothing is hidden, and nothing has to survive contact with production — the branch is what makes that safe.

Put `prototype` in the file or directory name anyway, and follow the project's routing and file conventions, so the artifact is findable later by someone who only has its path.

Commit **once, at the end**, after the winner exists — only the files you touched, never the Spec or anything else uncommitted in the tree — then switch back to the branch you started on and say which branch that is. Do not push it, do not open a PR, do not delete it: the Spec points at this branch, so it has to stay. If the session ends without a confirmed winner, stay on the prototype branch with the work uncommitted and say so, rather than stranding it.

A **logic** prototype has no branch and no commit. It is one HTML file in the directory you were given, and it sits with the rest of the uncommitted planning tree.

## Surface the state

Render the full relevant state after every action, and on every variant switch, so what changed is visible rather than inferred. A prototype the user has to reason about has not saved them any reasoning.

## Name the winner

Once the user confirms a shape, the artifact stops being a comparison and becomes the record of the answer. **Nothing is deleted.** The variants nobody chose stay exactly where they are, as the record of what was ruled out.

Instead, make one variant unambiguously *the* one. The confirmed shape is usually not any single variant as built — "the header from B with the sidebar from C" is the common reaction — so write it as its own variant, named for what it is rather than `VariantD`, and leave the others untouched.

It is still not production code. It was written with no tests and no error handling, so the Task that builds the real thing rewrites it under real constraints rather than promoting it.

## Return, twice

**When the artifact is ready**, return this and nothing else — the parent relays it to the user verbatim, so it has to stand on its own:

```md
_Prototype:_ {the question it answers}

**Look at it:** {one line — the URL to open, or the file to double-click}

- **A — {name}:** {one line on what makes it different}
- **B — {name}:** {one line}
- **C — {name}:** {one line}
```

For a logic demo the list is the scenarios rather than the variants.

**When the winner is written and committed**, return the winner's name, the file it is in, and — for a UI prototype — the branch it is on and the branch you switched back to. That is what the Spec's prototype section is written from.
