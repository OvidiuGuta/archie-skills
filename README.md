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

## Validating the bundle

```
node scripts/validate-skills.mjs
```

Run from the repo root. It exits non-zero on any failure and prints one line per failure naming the file and the problem. Thirteen skills cross-referencing each other and a shared reference set is exactly the structure where links rot silently, and the failure only shows up later as a skill quietly skipping a step. This is the bundle's only automated gate: see [`docs/adr/0006-three-test-layers-split-by-altitude.md`](docs/adr/0006-three-test-layers-split-by-altitude.md) for why there are no agent-driven tests.

It asserts that:

- every `SKILL.md` has frontmatter with a `name` and a `description`, and the name matches its directory
- exactly the five entry skills carry `disable-model-invocation: true`, and none of the eight sub-skills do
- every skill directory is one of the thirteen the spec names
- every skill reference in a skill body resolves to a skill in the bundle
- every relative link resolves to a file that exists, across the skills, the reference set and this README
- every shared reference file is pointed at by at least one skill
- every skill ships an `agents/openai.yaml` carrying a `display_name` and a `short_description`
- every skill is documented in this README

Two of those are warnings rather than failures while the bundle is still being assembled, because a half-built bundle would otherwise fail on work that has not happened yet: a reference to a skill the spec names but no ticket has built, and a reference file nothing points at. Both become failures once all thirteen skills are present. A reference to a name outside the thirteen is a failure either way, so a typo or a stale skill name is caught immediately.

## Skills

Each skill is documented here by the ticket that builds it, while the knowledge is fresh.

### `/setup-archie`

User-callable. Records this repo's [facts](skills/reference/agents-facts.md) in `AGENTS.md` and keeps `.scratch/` out of the ignore file so planning is committed. It explores, shows the draft, and writes only once the user has confirmed it; anything it cannot read out of the repo is recorded as `unknown` and asked about rather than guessed at. Re-running rewrites the delimited facts block and leaves the rest of `AGENTS.md` untouched.

### `/interview`

Reached by `/architect`. The one-question-at-a-time discipline a planning session runs on: each question numbered, laying its plausible answers out as lettered choices with the agent's recommendation and reasoning underneath, and gated by the [altitude test](skills/reference/altitude.md) before it is asked. Questions below altitude are deferred in one announced line each, so the child list assembles in front of the user, and any deferral can be pulled back up to the current resolution. A check-in every eighth question states what is settled, what is deferred and the current split-or-specify lean without stopping for approval. The session ends when the at-altitude frontier is empty, reporting either that or the clusters the deferrals formed.

### `/domain-modeling`

Reached by `/architect`. Writes a settled thing down the moment it resolves, because the Effort tree is disposable and this is all that survives it: a term to the `CONTEXT.md` glossary, a decision clearing the [ADR bar](skills/reference/decisions.md) to `docs/adr/`, and the residue to the Effort's own `effort.md`, one line each, where the children inherit it. Whether a decision fits in one line is the test that separates the last two. A term conflicting with the glossary, or language too fuzzy or overloaded to enter it, interrupts the session rather than being quietly recorded. A sharpening amends its ADR in place; a reversal supersedes it. `CONTEXT.md` and `docs/adr/` are created lazily, by the first thing that needs them.

### `/research`

Reached by `/architect`. The exit for a question with an answer that holds whether or not the project likes it: a sub-agent reads primary sources, writes what it found to `research/<slug>.md` inside the Effort, and returns the path plus the answer in two lines. It never returns the findings themselves, because the pages it read are exactly what the sub-agent exists to keep out of the session's context. A question that turns out to be a decision goes back to the user with its options rather than being answered, and a question the sources do not settle comes back marked unsettled.

### `/prototype`

Reached by `/architect`. The exit for a question the user answers by looking: a sub-agent builds the cheapest artifact that provokes a real reaction into `prototypes/<slug>/` inside the Effort and returns the path plus how to open it. The artifact is evidence rather than a head start — hardcoded, never imported by the real code, and gone with the tree, while the answer travels on into `spec.md`. A revision goes back to the same sub-agent, which still holds the artifact's shape, so "narrower sidebar" is one edit instead of another read of the world. The reaction itself happens at the top level, in the user's words; the sub-agent never stands in for it.
