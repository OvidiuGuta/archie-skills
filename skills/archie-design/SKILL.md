---
name: archie-design
description: Settling how one leaf gets built — its data, contract, structure, dependencies and seam — and writing them into the Spec. Reached by /archie-architect when a Spec still reads `_Not yet designed._`.
---

# Design

One leaf, one session. The Spec says **what** to build; this settles **how**, with the user, against the codebase as it actually is. It is the **last human checkpoint before implementation runs unattended**, and the first time anyone reads the real code for this leaf.

**Requires** `/archie-interview` for the questioning and `/archie-domain-modeling` and `/archie-standards` for anything durable, and it dispatches `/archie-prototype`. If one is not installed, say which and stop.

The only thing you write in the tree is two sections of the leaf's existing `spec.md` — never a `design.md` beside it.

## 1. Open the leaf

You are handed a reference — a root's slug, or `3.2`, which is child `02` of child `03` of the root, resolved down the numbered directories under `.archie/` — or the leaf the session in context just specified.

Read its `spec.md` in full, plus its `epic.md`, every ancestor's `epic.md` up the path, `CONTEXT.md` and the ADRs touching this area. The `Problem Statement`, `Solution`, `User Stories` and `Out of Scope` are **settled input**: this session designs against them, it does not reopen them.

Three states stop the run:

- **An Epic with children** is Split, so the Spec belongs to one of its leaves. Name the children and ask which one.
- **No `spec.md`** means this leaf has not been specified. Name `/archie-to-spec` and stop.
- **`Implementation Decisions` no longer carrying `_Not yet designed._`** means this leaf has already been designed. Say what the existing design covers and get the overwrite agreed before touching it — and if `tasks/` exists, say what state its Tasks are in.

Done when you hold one Specified, undesigned leaf and its Spec read end to end.

## 2. Survey by precedent

Read the code this leaf lands in, and the test prior art this repo already has — the integration specs nearest this leaf's area, recently touched and asserting real behaviour rather than smoke-checking. Hold them as the pattern the new tests match.

For each checklist heading below, find the **nearest existing example** in this repo and hold it as the default. That turns every question in step 3 from "how should we build this" into "the repo already does it this way — follow it, or diverge", which is answerable with a letter and puts the burden of a reason where it belongs: on the divergence.

Keep the read bounded to that. The nearest example of five things is not a tour of the repo, and this session is the user's, not a research run.

Done when every heading has either a precedent you have read or a note that this repo has none.

## 3. Interview

Invoke `/archie-interview` for the questioning discipline — one question a turn, each carrying a recommended answer. The bounding is yours.

### The checklist seeds the frontier

The **frontier** is the set of open questions, and the session ends when it is empty. Fill it from five headings, plus anything the Spec or the survey raised:

- **Data** — schema, models, migrations, what persists and what does not.
- **Contract** — what other code or a person calls: endpoints and their shapes, URLs, CLI surface, exported API.
- **Structure** — the modules and components added or changed, and where each sits relative to what exists.
- **Dependencies** — packages added, and what they replace.
- **Seam** — where this leaf's integration tests attach.

Answers open new questions, so the frontier keeps refilling. The session is done when it is empty **and** every heading is either settled or marked not-applicable with a reason. A ticked heading is not a settled one: stopping on the checklist alone is how a session ends with the API surface never named.

### The gate

> **Does this reach beyond one Task?**

Stated as a check anyone can run: **could a Task building this alone get it wrong in a way another Task then has to work around?** If yes, settle it here. If no, it lives inside one Task and belongs to the engineer who builds it — `/archie-tdd` chooses it with the code in front of them, which is a better moment than this one.

That is the Spec's altitude test one rung down, and it is what keeps this session from becoming a waterfall. Function bodies, helper extraction, local naming, the order of statements: all below the line.

### Some questions are answered by looking

A question of the form "how should this look or behave" resolves badly in conversation. Spawn a **sub-agent** and tell it to use `/archie-prototype`; the skill is the sub-agent's, and what only you know is the brief — the question narrowed to what is actually in doubt, and for a **logic** demo a destination, `prototypes/<slug>/` inside this Epic's directory. A **UI** prototype cuts its own throwaway branch and finds its own host page, so give it the question and let it look.

**Relay what it returns verbatim.** It comes back with the question, one line on how to open the artifact and one line per variant, written to be read by the user. Summarising it — "three layouts to compare" — throws away the only thing that gets them to the artifact.

**Keep the sub-agent's id.** A reaction usually lands as a small change, and it goes back to the sub-agent already holding the artifact, which revises in one edit. A fresh one reads the world again and quietly rebuilds the thing slightly differently, which makes the second reaction incomparable to the first. When the user confirms a shape, that same sub-agent names the winner and returns what the Spec's prototype section is written from.

The user reacts in their own words, and you record what the reaction settles like any other answer.

### The seam is the one heading with rules

A **seam** is where this leaf's integration tests attach. It spans every Task in the leaf, and it is expensive to move once implementation has run against it. Choose under three constraints, in this order:

- **Prefer an existing seam** — one the repo's integration tests already attach to. A new seam is test surface the project has to keep working.
- **Sit as high as possible.** A high seam survives the refactors underneath it; a low one pins internals the engineer should be choosing.
- **Use as few as possible.** One is ideal.

Judging "as high as possible" needs the structure heading settled first, so ask the seam last. It does not pass on silence: from `/archie-to-tasks` onwards the pipeline builds what these files say.

### Record what settles, the moment it settles

A **new dependency outlives the tree**, so it clears the ADR bar: hand it to `/archie-domain-modeling` — what was added, what it replaces, and why — rather than leaving it as a line in a Spec that dies with the Epic. The same goes for any term this session coins and any decision that reaches past this leaf. Where the design **contradicts an existing ADR**, hand that over too; amending or superseding is that skill's call, not yours. When the user states how they want code written — a **coding standard**, not a decision about this leaf — invoke `/archie-standards`.

Done when the frontier is empty and every heading is settled or excused.

## 4. Write the sections

Replace `_Not yet designed._` under both `## Implementation Decisions` and `## Testing Decisions` in the existing `spec.md`. Touch nothing else — the what was signed off in its own session — with one exception: if a prototype was built, insert a `## Prototype` section directly above `Implementation Decisions`, written from the sub-agent's second return.

`Implementation Decisions` carries the five headings' answers. `Testing Decisions` carries the seams and the prior art the new tests should match.

Two rules govern the content:

- **Name surfaces, never file locations.** An endpoint and its shape, a URL, a CLI flag, an exported API, a module or component name, a package — all of those are what was agreed, and they survive a refactor. `apps/api/src/shift/shift.controller.ts` does not, and the code is where that lives. The `## Prototype` section is the exception, because a pointer that names no file points at nothing.
- **Do not restate the prototype.** Per decision: would an implementer reading the winning variant arrive at this on their own? If yes, leave it out. The prototype owns what is on the screen; the Spec owns everything behind it, and every decision this session settled that the artifact could not express still has to be here.

Done when neither placeholder remains, every heading has content or a one-line reason it does not, and no line outside `## Prototype` names a path.

## 5. Send it back, if the boundary is wrong

This is where "the Spec is actually two features" surfaces, because it is the first time anyone read the code. Three rungs, cheapest first, and **the exit fires on a wrong boundary, not on a wrong decision**:

1. **A decision is wrong.** Something the scoping session settled cannot be built as settled. Revise it in place — `/archie-domain-modeling` for a term or an ADR, a residue line edited in `epic.md`, a corrected line in `spec.md` — and **carry on**. No exit. This is the common case.
2. **The leaf is too big.** The understanding holds; the unit does not. Name `/archie-scope`'s size backstop and stop.
3. **The understanding is wrong.** The boundary is in the wrong place, or the Spec describes a structure the repo no longer has. Name `/archie-scope`, then `/archie-to-spec`, and stop.

Name the rung, name what gets dropped, and hand it to the user, who re-scopes and deletes. Rungs 2 and 3 both drop `spec.md`, because a Split Epic cannot hold one, and if `tasks/` exists say so loudly:

```md
_Heads up:_ three Tasks exist and `#1` is ready-for-review. Re-scoping drops the Spec they were built against.
```

## 6. Confirm, then cut the Tasks

Report in two lines — the surfaces this leaf adds or changes, and the seam as confirmed — then close the turn by saying shared understanding is reached, inviting anything still open, and naming what you will do otherwise:

```md
That's shared understanding as I have it. Anything still open, or shall I cut the Tasks?
```

The floor is open, so the answer is not a yes. Three shapes carry consequences:

- **A reopened question** rejoins the frontier and gets asked next, and the section it lands in is rewritten in place.
- **A boundary the user now thinks is wrong** — *this is actually two features* — is step 5's exit, not a chain. Name the rung and stop.
- **A redirect** to a different step is obeyed. Where it drops work that already exists, say what it drops before running it.

On their word to carry on, invoke `/archie-to-tasks` **inline, in this session**, and stop when it has reported. It asks about the breakdown's granularity and blocking edges, and that checkpoint is only worth answering where the reasons behind the seam are still in the room — in its own window it reads them off this file. It writes the Tasks; you write none.
