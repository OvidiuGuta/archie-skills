# Archie

A three-phase way of working with AI agents: **Setup**, **Planning** (HITL) and **Implementing** (AFK), where Planning and Implementing repeat. This repo is Archie's engineering skill bundle. It replaces mattpocock/skills.

Planning is a conversation rather than a document. `/archie-architect` scopes one **Epic** at a time, interviewing one question at a time and deferring everything below altitude into thin children that get architected later, when their earlier siblings are already built. When an Epic is sharp enough, `/archie-to-spec` and `/archie-to-tasks` hand it to `/archie-implement`, which takes a single Task through a test-first build, a two-axis review and one fix round unattended, and stops at `ready-for-review` with a test plan for the parts no test covers.

## Install

```bash
npx skills@latest add OvidiuGuta/archie-skills --skill '*'
```

Installs all twelve skills into whichever agents the installer detects. Upgrade with `npx skills@latest update`.

Archie ships in **two phases you can install separately**. Drop `--skill '*'` and the installer shows them as two groups you can tick whole:

| Phase | Skills | Requires |
| --- | --- | --- |
| **Archie Planning** | `archie-setup`, `archie-architect`, `archie-interview`, `archie-domain-modeling`, `archie-research`, `archie-prototype`, `archie-to-spec`, `archie-to-tasks` | nothing |
| **Archie Implementing** | `archie-implement`, `archie-assist`, `archie-tdd`, `archie-code-review` | Planning, for the Epic tree it consumes |

Planning alone is a coherent install: architect, spec and slice into Tasks, then hand them wherever you like. Implementing alone is not fed by anything, so its entry skills say which skill is missing rather than improvising. Whole-framework is the recommended install.

Archie **replaces mattpocock/skills** rather than complementing it. Both installed is supported — every skill name is prefixed `archie-`, and the Epic tree lives in `.archie/` rather than `.scratch/` — but running both methods on one repo means two ways of working in one head.

## Layout

```
skills/
└── archie-<name>/        SKILL.md, agents/openai.yaml, and its own references/ if it needs one
scripts/
└── validate-skills.mjs   the bundle's only gate
.claude-plugin/
└── marketplace.json      the two phase groups the installer shows
```

skills.sh installs **one skill directory at a time**, so every skill is authored self-contained: **no link leaves a skill's own directory**, nothing is generated, and there is no shared folder to sync. A skill that consults material on demand owns that file itself, under its own `references/`, and a skill dispatches its siblings by name rather than by path. The gate enforces the boundary — see [ADR 0011](docs/adr/0011-each-skill-is-authored-self-contained.md).

## Conventions

The conventions are fixed by the framework rather than chosen per repo, so each skill states the part it uses. Three files are big enough to consult on demand rather than carry inline, and each has exactly one owner:

| Skill-owned reference | What it settles |
| --- | --- |
| [`archie-architect/references/epic-tree.md`](skills/archie-architect/references/epic-tree.md) | The Epic tree on disk, derived structural state and progress, identity numbering, and the `3.2` / `3.2#1` reference syntax |
| [`archie-domain-modeling/references/formats.md`](skills/archie-domain-modeling/references/formats.md) | The three destinations a settled decision routes to, and the `CONTEXT.md` and ADR formats |
| [`archie-to-spec/references/spec-template.md`](skills/archie-to-spec/references/spec-template.md) | Every section of `spec.md` and the rules governing it |

Everything else a skill needs — the altitude gate, the facts section format, the task file's shape, the ADR bar — is a paragraph in the skill that uses it. A Task's contract is one task file and one `spec.md`, so the implementing skills read no framework conventions at all: see [ADR 0010](docs/adr/0010-implementing-is-one-build-one-review-one-fix.md).

What genuinely varies per repo is **facts**, not conventions: the lint, typecheck, test and build commands, how to start the real app, and where the good test prior art lives. `/archie-setup` records those in `AGENTS.md`, writing `unknown` for anything it cannot determine, and any skill that later learns the answer writes it back.

`CONTEXT.md` and `docs/adr/` are the **repo's** domain docs, not Archie's. Archie reads and writes them, and so does anything else that keeps a glossary and ADRs at the root. That sharing is deliberate: two competing glossaries in one repo is the failure mode, not two frameworks agreeing on one.

The design decisions behind the framework are in [`CONTEXT.md`](CONTEXT.md) and [`docs/adr/`](docs/adr/). A skill contradicting one of those ADRs is wrong.

## Validating the bundle

```
node scripts/validate-skills.mjs
```

Run from the repo root. It exits non-zero on any failure and prints one line per failure naming the file and the problem. Twelve self-contained skills and a manifest listing every one of them is exactly the structure where things rot silently, and the failure only shows up later as a skill quietly skipping a step. This is the bundle's only automated gate.

It asserts that:

- every `SKILL.md` has frontmatter with a `name` and a `description`, and the name matches its directory
- exactly the six entry skills carry `disable-model-invocation: true`, and none of the six sub-skills do
- every skill directory is one of the twelve the spec names
- every skill reference in a skill body resolves to a skill in the bundle
- **no link in a `SKILL.md` leaves the skill's own directory**, since that is what makes each one installable alone
- every relative link resolves to a file that exists, across the skills and this README
- `marketplace.json` lists every skill exactly once, in a phase, with a path the installer will not silently drop
- every skill ships an `agents/openai.yaml` carrying a `display_name` and a `short_description`
- every skill is documented in this README

## Skills

Each skill is documented here by the ticket that builds it, while the knowledge is fresh.

### `/archie-setup`

User-callable. Records this repo's facts in `AGENTS.md` and keeps `.archie/` out of the ignore file so planning is committed. It explores, shows the draft, and writes only once the user has confirmed it; anything it cannot read out of the repo is recorded as `unknown` and asked about rather than guessed at. Re-running rewrites the delimited facts block and leaves the rest of `AGENTS.md` untouched.

### `/archie-interview`

Reached by `/archie-architect`. The one-question-at-a-time discipline a planning session runs on: each question numbered, laying its plausible answers out as lettered choices with the agent's recommendation and reasoning underneath, and gated by the **altitude test** before it is asked. Questions below altitude are deferred in one announced line each, so the child list assembles in front of the user, and any deferral can be pulled back up to the current resolution. A check-in every eighth question states what is settled, what is deferred and the current split-or-specify lean without stopping for approval. The session ends when the at-altitude frontier is empty, reporting either that or the clusters the deferrals formed.

### `/archie-domain-modeling`

Reached by `/archie-architect`. Writes a settled thing down the moment it resolves, because the Epic tree is disposable and this is all that survives it: a term to the `CONTEXT.md` glossary, a decision clearing the [ADR bar](skills/archie-domain-modeling/references/formats.md) to `docs/adr/`, and the residue to the Epic's own `epic.md`, one line each, where the children inherit it. Whether a decision fits in one line is the test that separates the last two. A term conflicting with the glossary, or language too fuzzy or overloaded to enter it, interrupts the session rather than being quietly recorded. A sharpening amends its ADR in place; a reversal supersedes it. `CONTEXT.md` and `docs/adr/` are created lazily, by the first thing that needs them.

### `/archie-research`

Reached by `/archie-architect`. The exit for a question with an answer that holds whether or not the project likes it: a sub-agent reads primary sources, writes what it found to `research/<slug>.md` inside the Epic, and returns the path plus the answer in two lines. It never returns the findings themselves, because the pages it read are exactly what the sub-agent exists to keep out of the session's context. A question that turns out to be a decision goes back to the user with its options rather than being answered, and a question the sources do not settle comes back marked unsettled.

### `/archie-prototype`

Reached by `/archie-architect`. The exit for a question the user answers by looking: a sub-agent builds the cheapest artifact that provokes a real reaction into `prototypes/<slug>/` inside the Epic and returns the path plus how to open it. The artifact is evidence rather than a head start — hardcoded, never imported by the real code, and gone with the tree, while the answer travels on into `spec.md`. A revision goes back to the same sub-agent, which still holds the artifact's shape, so "narrower sidebar" is one edit instead of another read of the world. The reaction itself happens at the top level, in the user's words; the sub-agent never stands in for it.

### `/archie-architect`

User-callable. Runs one Epic's planning session. It opens the Epic — creating the root from a loose idea, or resolving a reference like `3.2` — inherits before asking anything (`CONTEXT.md`, the ADRs touching the area, and every ancestor's `epic.md` up the path), then reads the code the earlier siblings actually built, which is what makes a thin child a deferral to greater knowledge rather than a gap. It drives [`/archie-interview`](skills/archie-interview/SKILL.md), records each resolved thing through [`/archie-domain-modeling`](skills/archie-domain-modeling/SKILL.md) as it resolves, and dispatches [`/archie-research`](skills/archie-research/SKILL.md) or [`/archie-prototype`](skills/archie-prototype/SKILL.md) for the questions conversation cannot settle. It ends on a recommendation with its reasoning — an empty frontier means specify, deferral clusters mean split into those children — and the call is the user's. Splitting writes thin children and nothing else. A specifiable Epic too large to build as one leaf gets sliced mechanically, announced as a size backstop rather than a new round of questions. Reordering or re-scoping an already-Specified child is surfaced explicitly. It never writes `spec.md` or task files.

### `/archie-to-spec`

User-callable. Turns the Architect session that just happened into the Specified Epic's `spec.md`, following [the template](skills/archie-to-spec/references/spec-template.md). It synthesises rather than re-interviews — the intent and decisions in `epic.md`, the terms and ADRs the session wrote, the `research/` findings and the prototypes' answers — and reads that same material off disk when the session is no longer in context. The seams are the one thing it does ask about: it proposes where the feature's integration tests attach, preferring an existing seam from the repo's test prior art, sitting as high as possible and using as few as possible, and waits for the user to confirm them, because implementation runs AFK from `/archie-to-tasks` onwards and a seam cannot be retrofitted cheaply. It refuses to run against a Split Epic, since Split and Specified are mutually exclusive, surfaces any contradiction with an ADR instead of overriding it, and keeps file paths and code out of the Spec bar a decision-encoding snippet from a prototype. It writes `spec.md` and nothing else; the Tasks are `/archie-to-tasks`.

### `/archie-to-tasks`

User-callable. Cuts a Specified Epic's Spec into the Tasks `/archie-implement` consumes, and writes nothing else. Each Task is a vertical tracer bullet — a narrow but complete path through every layer — carrying exactly one end-to-end demoable outcome, which is what makes "is this Task too big" a check rather than a matter of taste. It slices against the Spec's long user story list so no story is dropped, sequences prefactoring ahead of the bullets it makes smaller, and records the blocking edges and the `ready-for-agent` or `ready-for-human` label on each. The breakdown goes to the user as a numbered list and it iterates on granularity and edges until they approve it, because everything after this runs AFK. Then it publishes one file per Task at `tasks/NN-<slug>.md` inside the leaf, at `Status: todo`, with numbers that are identity and are never renumbered. Acceptance criteria are observable outcomes with no file paths and no code, bar a decision-encoding snippet from a prototype.

### `/archie-tdd`

The engineer step of `/archie-implement`, running the [double loop](docs/adr/0010-implementing-is-one-build-one-review-one-fix.md). The outer loop is one integration test at the Spec's seam, derived from the Task's acceptance criteria and red before any implementation exists; the inner loop takes each unit the Task modifies through red-green-refactor with its dependencies mocked. Its contract is two documents — the task file and the leaf's `spec.md` — so what a build is judged on fits on one page. "Touches" means modified, not merely read, so unit testing does not metastasise, and each unit test asserts behaviour at its boundary: one that would break on a rename or an extracted helper is testing implementation. It then finds the repo's lint, typecheck, test and build commands itself and runs each as the repo defines it, reporting an absent gate as absent rather than guessing at a conventional command. The report carries every gate result and, for the orchestrator's test plan, which acceptance criteria the tests cover and which they cannot reach.

### `/archie-code-review`

The reviewer step of `/archie-implement`, and a **two-axis** review run as two parallel sub-agents that never see each other's findings. The **Spec** axis holds the diff against the leaf's `spec.md` and the Task's acceptance criteria: missing or partial requirements, behaviour nobody asked for, and requirements that look built but are built wrong. The **Standards** axis holds it against whatever the repo documents, plus two fixed rule sets pasted into the sub-agent's prompt in full — the **test rules** (one integration test at the Spec's seam, a unit test for every unit the diff modified, boundary assertions that survive a rename) and the **smell baseline** of twelve Fowler smells, each a labelled judgement call the repo or the Spec can suppress and each skipped where tooling already enforces it. It fixes the diff from the run's baseline SHA before dispatching, so both axes measure the same change, and it reports the two side by side without merging or reranking them, because one ordering lets a clean Standards report bury a missing requirement. It returns findings and fixes nothing, which is what keeps the reviewing and the fixing honest.

### `/archie-implement`

User-callable, and the whole unattended phase. Takes **one** `ready-for-agent` Task reference — `3.2#1` or a path — resolves the Task and its Spec from it, records `git rev-parse HEAD` as the run's baseline, and checks three gates before doing anything: the blocking edges are met, the label is `ready-for-agent` (a `ready-for-human` one halts and names [`/archie-assist`](skills/archie-assist/SKILL.md)), and the tree is clean enough to read a diff off. Then [`/archie-tdd`](skills/archie-tdd/SKILL.md) → [`/archie-code-review`](skills/archie-code-review/SKILL.md), invoked **inline** so its two axis sub-agents are top-level rather than nested → **one** fix round, `/archie-tdd` again so each fix arrives driven by a test and re-gated, whose small diff the orchestrator judges itself rather than re-reviewing → one report. Three sub-agent runs. It writes no feature code, which is what keeps its read of the diff honest. Nothing halts mid-pipeline: there is no triage step and no planning-defect exit, so an ambiguous criterion is built one way and reported as a Spec finding. Every dispatch ends in a **readout** — one lead line of triage, then the sub-agent's report verbatim — so an unattended run is legible while it is still running. It sets `in-progress` at the start and `ready-for-review` at the end, never `done`, and the summary ends in the **test plan**: every acceptance criterion marked covered by a test or walk-it-by-hand, the manual ones written as steps through the running app. With no browser-driven E2E in the pipeline, that plan is the only thing standing between the run and a criterion nobody checked.

### `/archie-assist`

User-callable, and the counterpart for the work an agent cannot do: a `ready-for-human` Task — a signup, a secret, a permission — which produces no diff, so the build, the review and the fix round all drop out rather than being no-opped through. It derives the route to the outcome **at guide time** from the service's own documentation rather than replaying instructions stored in the Task, because a third-party UI renames its buttons between the day the Task was written and the day it runs — so the Task's criteria stay outcomes and the guidance is never written back into it. It guides **one step at a time**, confirming each landed before deriving the next from where the user actually is, and treats a screen that is not there or a plan that costs money as the new starting point rather than a step to repeat. Then it verifies the state itself, against the real world: the env var is present where the app reads it, the key authenticates on a live call, the account signs in. Every criterion is graded **verified** or **unverified**, and an unverified one travels into the report as unverified — the state was made by hand and no suite stands behind it. It stops at `ready-for-review` like `/archie-implement`.
