---
name: archie-standards
description: Record and maintain the repo's coding standards in STANDARDS.md — the user's enforceable rules for how code is written. Use when the user states how they want code written, or asks to add, change or remove a coding standard.
---

# Coding standards

A **coding standard** is a rule of the user's about how code is written, enforceable line by line on a diff: "no `any` in TypeScript". Where an ADR records why something is built the way it is, a standard says whether a line of code is acceptable. You write `STANDARDS.md` and nothing else — a decision that also earns an ADR is the user's to route, not yours.

**A stated preference is the request.** The user saying how they want code written is the instruction to record it, in the moment it is said — a preference still sitting in the transcript when the session closes is one nobody recorded. An existing standard is reworded, regrouped or deleted only when the user asks.

## Write the rule, not the wish

Before a standard enters the file, word it so a reviewer can check a diff against it and answer yes or no. "Prefer clean code" checks nothing; "no `any` in TypeScript" checks itself. A rule that seems to need an example is too fuzzy — sharpen the wording until the example is redundant.

Read [`references/STANDARDS-FORMAT.md`](./references/STANDARDS-FORMAT.md) for the file's shape.

## Interrupt on conflict

A new standard contradicting one already in the file earns an interruption: name the existing rule, say what collides, and settle whether the old rule is replaced, narrowed, or the new one dropped — before anything is written. Two contradicting rules make the whole file unenforceable. A newcomer an existing rule already covers is merged into that rule rather than added beside it.

## The first standard creates the plumbing

`STANDARDS.md` lives at the repo root, created by the first standard — a repo with no standards carries no empty file. In the same write, make sure `AGENTS.md` links it; when no link to the file exists, append one line:

```md
Coding standards live in [STANDARDS.md](STANDARDS.md) — binding for all code written in this repo.
```

`AGENTS.md` is the user's file: append that line, touch nothing else, and create the file with that line alone if the repo has none. The link is what makes the standards bind every agent working in the repo, with or without an Archie skill.

## Say what you wrote

One line, as you write it, so the durable record is visible while the session runs:

```md
_Recorded:_ **no `any` in TypeScript** in `STANDARDS.md`.
```
