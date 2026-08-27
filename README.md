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

### `/architect`

User-callable. Runs one Effort's planning session. It opens the Effort — creating the root from a loose idea, or resolving a reference like `3.2` — inherits before asking anything (`CONTEXT.md`, the ADRs touching the area, and every ancestor's `effort.md` up the path), then reads the code the earlier siblings actually built, which is what makes a thin child a deferral to greater knowledge rather than a gap. It drives [`/interview`](skills/interview/SKILL.md), records each resolved thing through [`/domain-modeling`](skills/domain-modeling/SKILL.md) as it resolves, and dispatches [`/research`](skills/research/SKILL.md) or [`/prototype`](skills/prototype/SKILL.md) for the questions conversation cannot settle. It ends on a recommendation with its reasoning — an empty frontier means specify, deferral clusters mean split into those children — and the call is the user's. Splitting writes thin children and nothing else. A specifiable Effort too large to build as one leaf gets sliced mechanically, announced as a size backstop rather than a new round of questions. Reordering or re-scoping an already-Specified child is surfaced explicitly. It never writes `spec.md` or task files.

### `/to-spec`

User-callable. Turns the Architect session that just happened into the Specified Effort's `spec.md`, following [the template](skills/reference/templates/spec.md). It synthesises rather than re-interviews — the intent and decisions in `effort.md`, the terms and ADRs the session wrote, the `research/` findings and the prototypes' answers — and reads that same material off disk when the session is no longer in context. The seams are the one thing it does ask about: it proposes where the feature's integration tests attach, preferring an existing seam from the repo's [test prior art](skills/reference/agents-facts.md), sitting as high as possible and using as few as possible, and waits for the user to confirm them, because implementation runs AFK from `/to-tasks` onwards and a seam cannot be retrofitted cheaply. It refuses to run against a Split Effort, since Split and Specified are mutually exclusive, surfaces any contradiction with an ADR instead of overriding it, and keeps file paths and code out of the Spec bar a decision-encoding snippet from a prototype. It writes `spec.md` and nothing else; the Tasks are `/to-tasks`.

### `/to-tasks`

User-callable. Cuts a Specified Effort's [Spec](skills/reference/templates/spec.md) into the [Tasks](skills/reference/templates/task.md) `/implement` consumes, and writes nothing else. Each Task is a vertical tracer bullet — a narrow but complete path through every layer — carrying exactly one end-to-end demoable outcome, which is what makes "is this Task too big" a check rather than a matter of taste. It slices against the Spec's long user story list so no story is dropped, sequences prefactoring ahead of the bullets it makes smaller, and records the blocking edges and the `ready-for-agent` or `ready-for-human` label on each. The breakdown goes to the user as a numbered list and it iterates on granularity and edges until they approve it, because everything after this runs AFK. Then it publishes one file per Task at `tasks/NN-<slug>.md` inside the leaf, at `Status: todo`, with numbers that are identity and are never renumbered. Acceptance criteria are observable outcomes with no file paths and no code, bar a decision-encoding snippet from a prototype.

### `/software-architecture`

The first step of `/implement`'s `ready-for-agent` pipeline. Designs how one Task is built in this codebase and writes that to [`tasks/NN-<slug>.design.md`](skills/reference/templates/design.md) beside the task file, so the engineer, the reviewer and the user all read the same design and a later Task's architect reads what the earlier ones intended. It is read-only on the codebase — the design is the only file it writes — and it returns a path plus two lines rather than the design inline, which is what keeps the orchestrator's context small enough to run the rest of the pipeline. It inherits before designing: the Task's criteria, the leaf's Spec, every earlier design in the leaf, `CONTEXT.md` and the ADRs touching the area, then the real code and test prior art it will name. It designs this Task only, leaving what spans the leaf to the Spec, and treats the Spec's [seam](skills/reference/templates/spec.md) as a constraint it routes to rather than an input to reconsider. A design that cannot hit that seam, an unbuildable criterion or a contradiction between the Spec, an ADR or two earlier designs is a planning defect: it halts and surfaces to the user instead of picking the reading that lets the run continue.

### `/tdd`

The engineer step of `/implement`'s `ready-for-agent` pipeline, running the [double loop](docs/adr/0006-three-test-layers-split-by-altitude.md). The outer loop is one integration test at the Spec's seam, derived from the Task's acceptance criteria and red before any implementation exists; the inner loop takes each unit the Task modifies through red-green-refactor with its dependencies mocked. It reads the Task, its Spec and its [design](skills/reference/templates/design.md) before writing anything, and builds what the design designed rather than reconsidering it. "Touches" means modified, not merely read, so unit testing does not metastasise, and each unit test asserts behaviour at its boundary — one that would break on a rename or an extracted helper is testing implementation. Then it runs the lint, typecheck, test and build gates recorded in the [facts section](skills/reference/agents-facts.md), correcting any command it finds has changed and leaving an `unknown` gate unrun and reported rather than guessing at a conventional command. The report carries what was built and every gate result, and a red gate is never reported as a success.

### `/code-review`

The reviewer step of `/implement`'s `ready-for-agent` pipeline. Holds one Task's diff against all three of its contracts — the leaf's [Spec](skills/reference/templates/spec.md), the Task's acceptance criteria, and the [`design.md`](skills/reference/templates/design.md) the code claims to follow — because a diff can satisfy any two and break the third. It reviews the tests as carefully as the code: the integration test has to exist and sit at the Spec's seam rather than at a lower one that was easier to wire, every unit the Task modified needs a test, and each unit test has to survive the rename test or it is rejected as pinned to implementation. On top of the contracts it carries the **smell baseline**: twelve Fowler smells applied to the diff, each a labelled judgement call the design or the Spec can suppress, and each skipped where lint and typecheck already enforce it. Every finding is labelled a code defect, a [planning defect](skills/reference/altitude.md) or a smell — the distinction being which document has to change for it to go away — so the orchestrator triages without re-reading the diff and never spends a fix round on a heuristic. It returns findings and fixes nothing, which is what keeps the reviewing and the fixing honest.

### `/qa`

The QA step of both of `/implement`'s pipelines, and the only one that runs the real app. It drives the Task's demoable outcome through the front door: one Playwright [journey test](docs/adr/0006-three-test-layers-split-by-altitude.md) per Task, in the harness directory the [facts section](skills/reference/agents-facts.md) names, walking the outcome front to back and asserting the criteria at the points on that path where they become observable. A second journey is added only when the Task genuinely has two distinct user paths, and the report says so, because that usually means it was two Tasks. It starts the app with the recorded run command and asks rather than guessing when that command is `unknown`; unknown seed data or credentials block the journey and the criteria it would have covered come back unverified. A `ready-for-human` Task gets no journey and its observable state is checked instead — the env var is present, the key authenticates against the real service, the account signs in. Then every criterion is graded **pinned**, **verified but not pinned** or **unverified**, so the two grades a green suite hides are visible per criterion, and a criterion the app contradicts is returned as a code or [planning defect](skills/reference/altitude.md) instead. It reports findings, stands the app back down, and fixes nothing.

### `/implement`

User-callable, and the whole AFK phase. Takes **one** Task reference — `3.2#1` or a path — and resolves the Task, its Spec and its Effort from that one reference, then runs the pipeline its [label](skills/reference/effort-tree.md) selects: for a `ready-for-agent` Task, [`/software-architecture`](skills/software-architecture/SKILL.md) → [`/tdd`](skills/tdd/SKILL.md) → [`/code-review`](skills/code-review/SKILL.md) → up to two engineer fix rounds → [`/qa`](skills/qa/SKILL.md) → up to one engineer fix round → one report. An unmet blocking edge halts before any of it, and a missing or unrecognised label halts rather than defaulting to a pipeline. The orchestrator writes no feature code, which is what keeps its read of the diff honest, and sub-agents hand off by path — the design goes to disk and comes back as a pointer, so a nine-run pipeline does not run out of context at run four. It triages every finding before acting: a code defect goes back to the engineer, a [planning defect](skills/reference/altitude.md) halts the run for the user, and a smell is reported rather than spending a round. The fix rounds are bounded, and after the QA fix code review does not re-run — the orchestrator judges that small diff itself, having not written it. It sets `in-progress` at the start and `ready-for-review` at the end, never `done`, and the closing summary carries the design, the build and its gates, the review findings and fixes, and every criterion's QA grade including the verified-but-not-pinned and the unverified ones.

A `ready-for-human` Task — a signup, a secret, a permission — takes the second pipeline: guide → [`/qa`](skills/qa/SKILL.md) → report. The three steps that presuppose a diff drop out rather than being no-opped through by a sub-agent, and the orchestrator does the guiding itself, in the conversation, one step at a time, confirming each before deriving the next. It derives those steps at guide time from the service's own docs rather than replaying instructions stored in the Task, because a third-party UI renames its buttons between the day the Task was written and the day it runs — so the Task's criteria stay outcomes, and the guidance is never written back into it. `/qa` then verifies the observable state the user produced, and any criterion nothing observable can confirm is reported as unverified rather than counted as a pass. It stops at `ready-for-review` like the agent pipeline, and its report replaces the build and review sections with the steps the user actually performed.
