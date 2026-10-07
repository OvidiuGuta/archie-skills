---
name: archie-to-spec
description: Writing one Epic's spec.md by synthesising the scoping session that just happened, asking nothing. Reached by /archie-architect when a scoped Epic has no Spec, or when the call on an Epic is specify.
---

# To spec

The scoping session reached shared understanding of **what** this Epic covers; this turns that understanding into `spec.md`. It asks **nothing**: every answer it needs has already been given, and the how is `/archie-design`'s, writing into the file this one creates.

Read [`references/spec-template.md`](./references/spec-template.md) first. It fixes every section of the file.

**Requires** `/archie-domain-modeling` for anything durable the synthesis turns up. A scoping session in context has already loaded it; load it if not.

The only file in the tree you write is `spec.md`, and you write two of its sections as placeholders.

## 1. Open the Epic

### Where the tree lives

The folder plans in Archie when its `origin` remote clearly matches one Project's repo in the Archie MCP server's `guide` Index. Compare host and path only, so `git@github.com:me/app.git` matches `https://github.com/me/app`. No `origin`, no match or no Archie connection means the tree lives on files, as the steps below describe. Several matches, or an unclear one, means asking the human which Project this is.

In Archie, every reference is a Task key such as `ARC-12`; refuse a `3.2` or a `3.2#1` with one line saying the folder plans in Archie. Act as the Agent whose description in the Index fits **planning**, or as the Task's assignee when it is an Agent, chosen once for the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. A Status, marker or Type a step names is the Status or Type whose description fits it; when none clearly fits, or several do, stop and ask the human, naming the step and `/archie-setup`. Brief any helper you dispatch or invoke with the mode and the Agent.

The Epic is the one the session in context just scoped, or the reference the user passed — a root's slug, or `3.2`, which is child `02` of child `03` of the root, resolved down the numbered directories under `.archie/`.

A **Split** Epic stops the run. Split and Specified are mutually exclusive, so the Spec belongs to one of its leaves: name the children and ask which one. An Epic that already holds a `spec.md` is being re-specified — say what the existing Spec covers, and what state any Tasks are in, and get the overwrite agreed before touching it.

Done when you hold one Epic that carries an `epic.md`, no child directories, and the user's call to specify it.

## 2. Synthesise, do not interview

The answers are already yours. The session settled them question by question, `/archie-domain-modeling` wrote the durable ones down, and `/archie-research` returned the rest. Asking again spends the user's attention on things they have already decided, and it is the one thing this skill must not do. This step has no checkpoint at all.

Assemble the Spec's material from what the session produced: the intent and `Decisions` in `epic.md`, the terms and ADRs the session wrote, and the findings it pointed at in `.archie/research/`.

**When the session is not in context** — a fresh `/archie-to-spec 3.2` — read the same material off disk: this Epic's `epic.md`, every ancestor's `epic.md` up the path, `CONTEXT.md`, the ADRs touching this area, the earlier siblings' code, and the findings its `## Research` lists. In Archie the ADRs and the terms are the Project's Notes, and the findings are the Notes linked to this Epic. A gap you can close by reading is not a question; one that genuinely never got answered goes back to the user.

Write in the glossary's vocabulary throughout. Where the synthesis **contradicts an ADR**, hand it to `/archie-domain-modeling` rather than quietly overriding it — whether the contradiction amends or supersedes is that skill's call, not yours.

Done when every section of the template has its material, and you can say for each one which part of the session it came from.

## 3. Write the Spec

Write `spec.md` beside the Epic's `epic.md`, following the template exactly, `Epic:` reference included.

`## Implementation Decisions` and `## Testing Decisions` each get the single line `_Not yet designed._` and nothing else, and the template's conditional `## Prototype` heading is omitted — it is `/archie-design`'s to insert. Those two are the **how**, and they are `/archie-design`'s to write.

Two rules govern the rest, and they are what keeps a Spec true weeks later:

- **Name surfaces, never file locations.** A surface is what other code or a person calls: an endpoint and its shape, a URL, a CLI flag, an exported API, a module or component name, a package. Those are what was agreed and they survive a refactor; `apps/api/src/shift/shift.controller.ts` does not, and the code is where that lives.
- **`User Stories` is long.** Every aspect of the work, one story each, in the template's `As a … I want … so that …` form. `/archie-to-tasks` slices against this list, so a thin list hides work rather than removing it.

Anything the session settled that reaches past this Epic belongs in `CONTEXT.md` or `docs/adr/` — in Archie, the Project's Notes — not only in the Spec: the tree is disposable and the Spec goes with it. Invoke `/archie-domain-modeling` on anything still unrecorded before you finish.

Done when `spec.md` exists, every section other than the two placeholders carries content, and no line names a path.

## 4. Hand off

Report in one line — the path, or the Epic's key — then name `/archie-design` as the next step and stop. The Epic is now **Specified** and undesigned, and nothing can be built from it until the how is settled.
