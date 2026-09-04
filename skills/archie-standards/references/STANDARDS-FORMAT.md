# The STANDARDS.md format

One `STANDARDS.md` at the repo root, and one only — two competing rule lists is the failure mode. Create the file when the first standard resolves.

## Template

```md
# Coding standards

The user's rules for how code is written in this repo. Binding wherever code is written.

## {Topic}

- {The rule, in one line.} — {optional single clause of why}
```

## Rules

- **Flat bullets under topic headings** — TypeScript, Testing, Seed data, whatever clusters emerge. A rule with no cluster yet sits under `## General` until one does.
- **One rule per bullet**, one line.
- **The why is one clause or nothing.** Reasoning that needs more belongs in an ADR, never as a link — the two files serve different readers.
- **Freely edited, at the user's request**: reword, regroup, delete. `git log` is the history; superseding ceremony belongs to ADRs.
