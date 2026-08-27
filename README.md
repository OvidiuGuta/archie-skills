# Archie

A three-phase way of working with AI agents: **Setup**, **Planning** (HITL) and **Implementing** (AFK), where Planning and Implementing repeat. This repo is Archie's engineering skill bundle. It replaces mattpocock/skills.

Planning is a conversation rather than a document. `/architect` scopes one **Effort** at a time, interviewing one question at a time and deferring everything below altitude into thin children that get architected later, when their earlier siblings are already built. When an Effort is sharp enough, `/to-spec` and `/to-tasks` hand it to `/implement`, which takes a single Task through design, TDD, review and QA unattended and stops at `ready-for-review`.

## Layout

```
skills/
├── reference/            the shared conventions, one copy, pointed at by every skill
│   └── templates/        effort.md, spec.md, task and design templates
└── <skill-name>/         SKILL.md plus agents/openai.yaml
```

Install by making `skills/`'s contents available as skills — the reference set sits beside the skills, so the relative links between them resolve wherever the bundle lands.

## Conventions

The conventions are fixed by the framework rather than chosen per repo, so they ship once inside the bundle and every skill points at them instead of restating them. Thirteen skills cannot drift from one copy.

| Reference | What it settles |
| --- | --- |
| [`skills/reference/effort-tree.md`](skills/reference/effort-tree.md) | The Effort tree on disk, identity numbering, the `3.2` and `3.2#1` reference syntax, derived structural state and progress, the four task statuses and two labels |
| [`skills/reference/altitude.md`](skills/reference/altitude.md) | The altitude test, and the four places it applies |
| [`skills/reference/decisions.md`](skills/reference/decisions.md) | The three durability levels, the `CONTEXT.md` format, and the ADR format and bar |
| [`skills/reference/agents-facts.md`](skills/reference/agents-facts.md) | The delimited facts section in `AGENTS.md`, and `unknown` as a value |
| [`skills/reference/templates/`](skills/reference/templates/) | The four file templates, each with the rules that govern it |

What genuinely varies per repo is **facts**, not conventions: the lint, typecheck, test and build commands, how to start the real app, and where the good test prior art lives. `/setup-archie` records those in `AGENTS.md`, writing `unknown` for anything it cannot determine, and any skill that later learns the answer writes it back.

The design decisions behind the framework are in [`CONTEXT.md`](CONTEXT.md) and [`docs/adr/`](docs/adr/). A skill contradicting one of those ADRs is wrong.

## Skills

Each skill is documented here by the ticket that builds it, while the knowledge is fresh.
