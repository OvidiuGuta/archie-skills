# Structure and conventions

How the bundle is laid out on disk, the conventions its skills share, and the gate that keeps both honest.

## Layout

```
skills/
└── archie-<name>/        SKILL.md, agents/openai.yaml, and its own references/ if it needs one
manual/
├── skills/<name>.md      one page per skill, indexed by the README
└── structure.md          this file
docs/
├── adr/                  the decisions behind the framework
└── agents/               the conventions agents follow while working on this repo
scripts/
└── validate-skills.mjs   the bundle's only gate
.claude-plugin/
└── marketplace.json      the phase groups the installer shows
```

`manual/` is written for a reader: the README is its index, and nothing in the bundle reads it. `docs/` is the repo's own records, written and read by agents.

skills.sh installs **one skill directory at a time**, so every skill is authored self-contained: **no link leaves a skill's own directory**, nothing is generated, and there is no shared folder to sync. A skill that consults material on demand owns that file itself, under its own `references/`, and a skill dispatches its siblings by name rather than by path. The gate enforces the boundary — see [ADR 0011](../docs/adr/0011-each-skill-is-authored-self-contained.md).

## Conventions

The conventions are fixed by the framework rather than chosen per repo, so each skill states the part it uses. A handful of files are big enough to consult on demand rather than carry inline:

| Skill-owned reference | What it settles |
| --- | --- |
| [`archie-architect/references/epic-tree.md`](../skills/archie-architect/references/epic-tree.md) | The Epic tree on disk, the derived-state table that says which planning step an Epic is at, identity numbering, and the `3.2` / `3.2#1` reference syntax. `/archie-scope` carries [its own copy](../skills/archie-scope/references/epic-tree.md), since each skill installs alone |
| [`archie-domain-modeling/references/CONTEXT-FORMAT.md`](../skills/archie-domain-modeling/references/CONTEXT-FORMAT.md) | The `CONTEXT.md` glossary format and the rules on what belongs in it |
| [`archie-domain-modeling/references/ADR-FORMAT.md`](../skills/archie-domain-modeling/references/ADR-FORMAT.md) | The ADR file format, and amend-in-place versus supersede |
| [`archie-standards/references/STANDARDS-FORMAT.md`](../skills/archie-standards/references/STANDARDS-FORMAT.md) | The `STANDARDS.md` format: flat rules under topic headings, each checkable against a diff, and the judgement-call heading a reviewer reads |
| [`archie-standards/references/BASELINE.md`](../skills/archie-standards/references/BASELINE.md) | The rules a repo is seeded with: four hygiene rules, and twelve smells as one-line fixes under a judgement-call heading ([ADR 0020](../docs/adr/0020-standards-md-is-the-review-control-surface.md)) |
| [`archie-prototype/references/UI.md`](../skills/archie-prototype/references/UI.md) | The UI branch: variants on the real route, the switcher, and pruning to the winner |
| [`archie-prototype/references/LOGIC.md`](../skills/archie-prototype/references/LOGIC.md) | The logic branch: the single-file demo, the portable module, and the walkthroughs |
| [`archie-setup/references/bindings.md`](../skills/archie-setup/references/bindings.md) | The rows the skills bind to in Archie: each need, what a fitting description says, and the row `/archie-setup` proposes for a gap |
| [`archie-to-spec/references/spec-template.md`](../skills/archie-to-spec/references/spec-template.md) | Every section of `spec.md`, including the two the design session writes. The rules governing its content are in the skills' own steps |

Everything else a skill needs — the facts section format, the task file's shape, the ADR bar — is a paragraph in the skill that uses it. A framework concept lives in exactly one skill, the one whose job it is: the altitude gate is `/archie-architect`'s, and the skills it composes are told nothing about it ([ADR 0012](../docs/adr/0012-a-skill-states-only-its-own-discipline.md)). A Task's contract is one task file and one `spec.md`, so the implementing skills read no framework conventions at all: see [ADR 0010](../docs/adr/0010-implementing-is-one-build-one-review-one-fix.md). In lite there is no task file either, and `/archie-tdd` builds off the contract it was handed ([ADR 0018](../docs/adr/0018-archie-runs-at-three-flows.md)).

What genuinely varies per repo is **facts**, not conventions: the package manager, the gate commands, how to start the real app, and the branch and commit conventions. `/archie-setup` records those in a plain `## Project facts` section of `AGENTS.md`, found by its heading on a re-run; anything it cannot read out of the repo is asked of the user, who gives the value or removes the line, so the section only ever carries real answers. The file is the user's — no skill writes to it beyond that section ([ADR 0015](../docs/adr/0015-facts-are-user-confirmed-lines.md)).

`CONTEXT.md`, `docs/adr/` and `STANDARDS.md` are the **repo's** domain docs, not Archie's. Archie reads and writes them, and so does anything else that keeps a glossary, ADRs or coding standards at the root. That sharing is deliberate: two competing glossaries in one repo is the failure mode, not two frameworks agreeing on one. `STANDARDS.md` goes one further — it is linked from `AGENTS.md`, so its rules bind any agent in the repo whether or not an Archie skill is running.

The design decisions behind the framework are in [`CONTEXT.md`](../CONTEXT.md) and [`docs/adr/`](../docs/adr/). A skill contradicting one of those ADRs is wrong.

## Validating the bundle

```
node scripts/validate-skills.mjs
```

Run from the repo root. It exits non-zero on any failure and prints one line per failure naming the file and the problem. Fifteen self-contained skills and a manifest listing every one of them is exactly the structure where things rot silently, and the failure only shows up later as a skill quietly skipping a step. This is the bundle's only automated gate.

It asserts that:

- every `SKILL.md` has frontmatter with a `name` and a `description`, and the name matches its directory
- no skill carries `disable-model-invocation` — the flag errors out even the user's own autocompleted invocation — and each of the five user-only skills ends its description with the verbatim guard sentence reserving it for explicit user invocation ([ADR 0017](../docs/adr/0017-user-only-skills-gate-by-description-not-flag.md))
- every skill directory is one of the sixteen the spec names
- every skill reference in a skill body resolves to a skill in the bundle
- **no link in a `SKILL.md` leaves the skill's own directory**, since that is what makes each one installable alone
- every relative link resolves to a file that exists, across the skills, the README and these docs
- `marketplace.json` lists every skill exactly once, in a phase, with a path the installer will not silently drop
- every skill ships an `agents/openai.yaml` carrying a `display_name` and a `short_description`
- every skill has a page under [`manual/skills/`](skills/), linked from the README's index
- every skill that touches the tree carries the `Where the tree lives` block — heading, first sentence binding the folder by its `origin` remote, and an Agent line naming the skill's kind of work, planning, building or reviewing, all pinned verbatim — every copy reads the same apart from that kind of work, and no helper skill carries one
- no file under `skills/` carries the retired binding: the `AGENTS.md` first sentence, a Role line or `guide {projectKey}`
- `/archie-setup` links its `references/bindings.md`, the needs list the seeded `Next:` lines in Archie are written against
