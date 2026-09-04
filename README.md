# Archie

A three-phase way of working with AI agents: **Setup**, **Planning** (HITL) and **Implementing** (AFK), where Planning and Implementing repeat. This repo is Archie's engineering skill bundle. It replaces mattpocock/skills.

Planning is a conversation rather than a document, and it runs in **four steps**: `/archie-scope` settles what an **Epic** covers, `/archie-to-spec` writes that down, `/archie-design` settles how the leaf gets built, and `/archie-to-tasks` cuts it into Tasks. Each ends on a sign-off, so each is its own session — `/archie-architect` is the **router** that reads which step an Epic is at off its own files and runs that one. Scoping interviews one question at a time and defers everything below altitude into thin children that get scoped later, when their earlier siblings are already built. Then `/archie-implement` takes a single Task through a test-first build, a two-axis review and one fix round unattended, and stops at `ready-for-review` with a test plan for the parts no test covers.

## Install

```bash
npx skills@latest add OvidiuGuta/archie-skills --skill '*'
```

Installs all fourteen skills into whichever agents the installer detects. Upgrade with `npx skills@latest update`.

Archie ships in **two phases you can install separately**. Drop `--skill '*'` and the installer shows them as two groups you can tick whole:

| Phase | Skills | Requires |
| --- | --- | --- |
| **Archie Planning** | `archie-setup`, `archie-architect`, `archie-scope`, `archie-interview`, `archie-domain-modeling`, `archie-research`, `archie-to-spec`, `archie-design`, `archie-prototype`, `archie-to-tasks` | nothing |
| **Archie Implementing** | `archie-implement`, `archie-assist`, `archie-tdd`, `archie-code-review` | Planning, for the Epic tree it consumes |

Planning alone is a coherent install: scope, spec, design and slice into Tasks, then hand them wherever you like. Implementing alone is not fed by anything, so its entry skills say which skill is missing rather than improvising. Whole-framework is the recommended install.

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

The conventions are fixed by the framework rather than chosen per repo, so each skill states the part it uses. A handful of files are big enough to consult on demand rather than carry inline:

| Skill-owned reference | What it settles |
| --- | --- |
| [`archie-architect/references/epic-tree.md`](skills/archie-architect/references/epic-tree.md) | The Epic tree on disk, the derived-state table that says which planning step an Epic is at, identity numbering, and the `3.2` / `3.2#1` reference syntax. `/archie-scope` carries [its own copy](skills/archie-scope/references/epic-tree.md), since each skill installs alone |
| [`archie-domain-modeling/references/CONTEXT-FORMAT.md`](skills/archie-domain-modeling/references/CONTEXT-FORMAT.md) | The `CONTEXT.md` glossary format and the rules on what belongs in it |
| [`archie-domain-modeling/references/ADR-FORMAT.md`](skills/archie-domain-modeling/references/ADR-FORMAT.md) | The ADR file format, and amend-in-place versus supersede |
| [`archie-prototype/references/UI.md`](skills/archie-prototype/references/UI.md) | The UI branch: variants on the real route, the switcher, and pruning to the winner |
| [`archie-prototype/references/LOGIC.md`](skills/archie-prototype/references/LOGIC.md) | The logic branch: the single-file demo, the portable module, and the walkthroughs |
| [`archie-to-spec/references/spec-template.md`](skills/archie-to-spec/references/spec-template.md) | Every section of `spec.md`, including the two the design session writes. The rules governing its content are in the skills' own steps |

Everything else a skill needs — the facts section format, the task file's shape, the ADR bar — is a paragraph in the skill that uses it. A framework concept lives in exactly one skill, the one whose job it is: the altitude gate is `/archie-architect`'s, and the skills it composes are told nothing about it ([ADR 0012](docs/adr/0012-a-skill-states-only-its-own-discipline.md)). A Task's contract is one task file and one `spec.md`, so the implementing skills read no framework conventions at all: see [ADR 0010](docs/adr/0010-implementing-is-one-build-one-review-one-fix.md).

What genuinely varies per repo is **facts**, not conventions: the package manager, the gate commands, how to start the real app, and the branch and commit conventions. `/archie-setup` records those in a delimited block of `AGENTS.md`; anything it cannot read out of the repo is asked of the user, who gives the value or removes the line, so the block only ever carries real answers. The file is the user's — no skill writes to it beyond that block ([ADR 0015](docs/adr/0015-facts-are-user-confirmed-lines.md)).

`CONTEXT.md` and `docs/adr/` are the **repo's** domain docs, not Archie's. Archie reads and writes them, and so does anything else that keeps a glossary and ADRs at the root. That sharing is deliberate: two competing glossaries in one repo is the failure mode, not two frameworks agreeing on one.

The design decisions behind the framework are in [`CONTEXT.md`](CONTEXT.md) and [`docs/adr/`](docs/adr/). A skill contradicting one of those ADRs is wrong.

## Validating the bundle

```
node scripts/validate-skills.mjs
```

Run from the repo root. It exits non-zero on any failure and prints one line per failure naming the file and the problem. Fourteen self-contained skills and a manifest listing every one of them is exactly the structure where things rot silently, and the failure only shows up later as a skill quietly skipping a step. This is the bundle's only automated gate.

It asserts that:

- every `SKILL.md` has frontmatter with a `name` and a `description`, and the name matches its directory
- exactly the four user-only skills carry `disable-model-invocation: true`, and none of the ten model-invoked ones do — the flag makes a skill unreachable by `/archie-architect`, which is the bug that check exists to catch
- every skill directory is one of the fourteen the spec names
- every skill reference in a skill body resolves to a skill in the bundle
- **no link in a `SKILL.md` leaves the skill's own directory**, since that is what makes each one installable alone
- every relative link resolves to a file that exists, across the skills and this README
- `marketplace.json` lists every skill exactly once, in a phase, with a path the installer will not silently drop
- every skill ships an `agents/openai.yaml` carrying a `display_name` and a `short_description`
- every skill is documented in this README

## Skills

Each skill is documented here by the ticket that builds it, while the knowledge is fresh.

### `/archie-setup`

User-callable. Records this repo's facts in `AGENTS.md`, makes sure a `CLAUDE.md` imports them, and keeps `.archie/` out of the ignore file so planning is committed. It explores, shows the draft, and writes only once the user has confirmed it; a fact it cannot read out of the repo is a direct question, answered with a value or with *remove*, so no placeholder is ever written. Re-running rewrites the delimited facts block and leaves the rest of `AGENTS.md` untouched.

### `/archie-interview`

General-purpose interviewing, and the only skill in the bundle that knows nothing about Archie: it is told nothing about Epics, altitude or the tree, so it also works on its own when you want a plan stress-tested. It walks down the design tree resolving dependencies between decisions one at a time, asks one question per turn ending on the question mark, and lays each question's plausible answers out as lettered choices with its recommendation underneath so agreeing costs a letter. Anything it could answer by exploring the codebase it explores instead of asking, and it does not act on its own recommendations until the user confirms shared understanding. `/archie-architect` supplies the bounding — the altitude gate, the deferrals and the frontier are its, not the interview's: see [ADR 0012](docs/adr/0012-a-skill-states-only-its-own-discipline.md).

### `/archie-domain-modeling`

General-purpose domain modeling, told nothing about Epics or the tree, so it also works on its own when you just want a term pinned down. Two disjoint destinations: a term to the `CONTEXT.md` glossary, a decision clearing the [ADR bar](skills/archie-domain-modeling/references/ADR-FORMAT.md) to `docs/adr/`. It writes as things resolve rather than at the end, because a conversation is not storage. A term conflicting with the glossary, or language too fuzzy or overloaded to enter it, interrupts the session rather than being quietly recorded, and a claim about how something works is checked against the code before it is written down — the one check no other skill makes. A decision that contradicts an existing ADR interrupts too, and the skill that noticed hands it here rather than resolving it, so amend-or-supersede is decided once by whoever writes the file: a sharpening amends its ADR in place, a reversal supersedes it. Both files are created lazily, by the first thing that needs them. The third durability level, the residue in `epic.md`, is `/archie-architect`'s ([ADR 0007](docs/adr/0007-three-durability-levels-for-decisions.md)).

### `/archie-research`

Written to the sub-agent that does the looking, and dispatched by `/archie-scope` for a question with an answer that holds whether or not the project likes it. It reads primary sources — the project's own code and lockfile first, then the vendor's docs at the version in use — writes what it found to the file it was given, and returns the path plus the answer in two lines. It never returns the findings themselves, because the pages it read are exactly what the sub-agent exists to keep out of the session's context. Every claim carries its source and version; a question that turns out to be a decision comes back with its options rather than an answer; a question the sources do not settle comes back marked unsettled.

### `/archie-prototype`

Written to the sub-agent that does the building, and dispatched by `/archie-design` for a question the user answers by looking. It is a **how**-question by definition, which is why it sits on the design side: at scope altitude the question is whether to split, and needing to drive a state machine by hand is evidence the Epic is already specifiable. The question picks one of two branches, and picking wrong wastes the prototype: a [UI prototype](skills/archie-prototype/references/UI.md) puts three radically different variants of one surface on the **real route** behind `?variant=` with a floating switcher, because variants are only judgeable against the real header, sidebar, data and density; a [logic prototype](skills/archie-prototype/references/LOGIC.md) is one self-contained HTML file with free-play buttons and tabbed guided walkthroughs, drivable by a designer or a PM, over a pure module that could lift into the real code as it stands. Prototypes live on the current branch next to what they prototype, so three rules keep them from shipping: named as a prototype, gated out of production builds and behind their own switch, and never replacing the page's real render. It builds and stops — it does not judge its own artifact or stand in for the reaction. A revision goes back to the same sub-agent, which still holds the shape, so "the header from B with the sidebar from C" is one edit rather than another read of the world. When a shape is confirmed, that sub-agent prunes it: losing variants, switcher and every word of framing copy deleted, leaving one gated artifact that reads as the agreed shape and that the Spec can point at.

### `/archie-architect`

User-callable, and the **router** over the four planning steps. It resolves a loose idea or a reference like `3.2`, reads which step that Epic is at off its own files — the derived-state table in `epic-tree.md` is the whole of its logic — announces the step in one line so the user can redirect it, fires that **one** step inline, and closes on what the step settled and what running it again will do. The four steps are model-invoked precisely so a router can fire them: `disable-model-invocation: true` would make each reachable by nobody but the human. One step per invocation, because every step is a full session ending on a sign-off and two in one window is the context problem the split exists to solve. It holds no discipline of its own: every judgement belongs to the step it dispatches, and each step is callable directly by name when the user already knows which one they want. A leaf whose Tasks exist is planned, so it names `/archie-implement` and stops. See [ADR 0013](docs/adr/0013-planning-is-a-resumable-router-over-four-steps.md).

### `/archie-scope`

Reached by `/archie-architect`, and typeable by name. The **what**-step, and everything `/archie-architect` used to hold. It opens the Epic, then inherits before asking anything: what was written down (`CONTEXT.md`, the ADRs touching the area, every ancestor's `epic.md` up the path) and what was built (the code the earlier siblings actually produced, which is what makes a thin child a deferral to greater knowledge rather than a gap). It drives [`/archie-interview`](skills/archie-interview/SKILL.md) for the questioning and supplies the bounding the interview knows nothing about: the **frontier**, the **altitude gate**, the one-line deferral announcements, the eight-question check-in, and the residue line in `epic.md`. A question about *how* is not deferred into a child but announced as `/archie-design`'s, one rung down and a later step on the same Epic. A question that is a **fact** goes to a sub-agent told to use [`/archie-research`](skills/archie-research/SKILL.md), briefed with the one thing that skill cannot know — the question, what turns on it, and the destination inside the Epic. Each resolved term or ADR is recorded through [`/archie-domain-modeling`](skills/archie-domain-modeling/SKILL.md) as it resolves. Nothing else about the Epic reaches disk while the session runs: the intent would be written at the moment of least knowledge and rewritten by what the interview learns, so `epic.md` is written once, in the same turn as the recommendation, which makes the recommendation the diff. `## Decisions` is written every time, carrying `_None at this resolution._` when there is no residue, because its **presence is what marks the Epic as scoped** — a thin child has no such heading, and that is the only thing telling the two apart on disk. It ends on a recommendation with its reasoning — an empty frontier means specify, deferral clusters mean split into those children — and the call is the user's. Splitting writes thin children and nothing else. A specifiable Epic too large to build as one leaf gets sliced mechanically, announced as a size backstop rather than a new round of questions. It is also where `/archie-design` sends a leaf back when the boundary turns out wrong. It never writes `spec.md` or a task file.

### `/archie-to-spec`

Reached by `/archie-architect`, and typeable by name. Turns the scoping session that just happened into the Specified Epic's `spec.md`, following [the template](skills/archie-to-spec/references/spec-template.md). It asks **nothing** — the seam checkpoint it used to own moved to `/archie-design`, so it is now what it always claimed to be: pure synthesis. It assembles the intent and decisions in `epic.md`, the terms and ADRs the session wrote and the `research/` findings, and reads the same material off disk when the session is no longer in context. `Implementation Decisions` and `Testing Decisions` are written as the single literal line `_Not yet designed._`, which is the marker every later reader uses to know this leaf has a Spec and no design. It refuses to run against a Split Epic, since Split and Specified are mutually exclusive, and hands any contradiction with an ADR to [`/archie-domain-modeling`](skills/archie-domain-modeling/SKILL.md) rather than resolving it — amending or superseding is that skill's call. The one content rule is **name surfaces, never file locations**: an endpoint and its shape, a URL, a CLI flag, an exported API, a module name, a package are all what was agreed and survive a refactor, while a path rots within the week.

### `/archie-design`

Reached by `/archie-architect`, and typeable by name. The **how**-step: the last human checkpoint before implementation runs unattended, and the first time anyone reads the real code for this leaf. It runs on one Specified, undesigned leaf and writes two sections of the Spec it already has — never a `design.md`, which is what leaves [ADR 0010](docs/adr/0010-implementing-is-one-build-one-review-one-fix.md)'s two-contract rule untouched and `/archie-tdd` and `/archie-code-review` unchanged. It **surveys by precedent** first: for each heading it finds the nearest existing example in the repo and holds it as the default, which turns every question from "how should we build this" into "the repo does it this way, follow or diverge" and puts the burden of a reason on the divergence. Five headings seed the frontier — **data**, **contract**, **structure**, **dependencies**, **seam** — and the session ends when the frontier is empty *and* every heading is settled or excused, because ticking a checklist is not settling one. Its gate is the Spec's altitude test one rung down: *could a Task building this alone get it wrong in a way another Task then has to work around?* If not, it belongs to the engineer. A question answered better by looking goes to a sub-agent told to use [`/archie-prototype`](skills/archie-prototype/SKILL.md), whose id it keeps so a reaction is one edit rather than a rebuild. The **seam** is asked last, because "sit as high as possible" is unjudgeable until the structure is settled, and it does not pass on silence. A new dependency outlives the tree, so it goes to [`/archie-domain-modeling`](skills/archie-domain-modeling/SKILL.md) as an ADR. When the how reveals the boundary is wrong it names the repair and stops rather than repairing anything: a wrong decision is revised in place and the session carries on, a leaf that is merely too big goes to `/archie-scope`'s size backstop, and a wrong boundary goes back through `/archie-scope` and `/archie-to-spec` — the last two dropping `spec.md`, which it says loudly when Tasks already exist.

### `/archie-to-tasks`

Reached by `/archie-architect`, and typeable by name. Cuts a Specified Epic's Spec into the Tasks `/archie-implement` consumes, and writes nothing else. Each Task is a vertical **tracer bullet** — a narrow but complete path through every layer — carrying exactly one end-to-end demoable outcome, which is what makes "is this Task too big" a check rather than a matter of taste. It slices against the Spec's long user story list so no story is dropped, sequences prefactoring ahead of the bullets it makes smaller, and records the blocking edges and the `ready-for-agent` or `ready-for-human` label on each. The breakdown goes to the user as a numbered list, and it asks about granularity and edges through [`/archie-interview`](skills/archie-interview/SKILL.md) until they approve it — this is the last shape a human gives the whole leaf. A Spec still carrying `_Not yet designed._` **halts the run** and names `/archie-design`: that leaf has no settled surface, so every Task cut from it would be sliced against an imagined one, which looks exactly like a Task sliced against a real one until it is built. It does not quiz the acceptance criteria, because they are the demoable outcome decomposed and each one is walked at the end of its own Task's run. Then it publishes one file per Task at `tasks/NN-<slug>.md` inside the leaf, at `Status: todo`, with numbers that are identity: a re-slice never renumbers and a deleted Task's number is never reused. Acceptance criteria are observable outcomes with no file paths and no code, bar a decision-encoding snippet from a prototype.

### `/archie-tdd`

The engineer step of `/archie-implement`, running the [double loop](docs/adr/0010-implementing-is-one-build-one-review-one-fix.md). The outer loop is one integration test at the Spec's seam, derived from the Task's acceptance criteria and red before any implementation exists; the inner loop takes each unit the Task modifies through red-green-refactor with its dependencies mocked. Its contract is two documents — the task file and the leaf's `spec.md` — so what a build is judged on fits on one page. "Touches" means modified, not merely read, so unit testing does not metastasise, and each unit test asserts behaviour at its boundary: one that would break on a rename or an extracted helper is testing implementation. It then finds the repo's lint, typecheck, test and build commands itself and runs each as the repo defines it, reporting an absent gate as absent rather than guessing at a conventional command. The report carries every gate result and, for the orchestrator's test plan, which acceptance criteria the tests cover and which they cannot reach.

### `/archie-code-review`

The reviewer step of `/archie-implement`, and a **two-axis** review run as two parallel sub-agents that never see each other's findings. The **Spec** axis holds the diff against the leaf's `spec.md` and the Task's acceptance criteria: missing or partial requirements, behaviour nobody asked for, and requirements that look built but are built wrong. The **Standards** axis holds it against whatever the repo documents, plus two fixed rule sets pasted into the sub-agent's prompt in full — the **test rules** (one integration test at the Spec's seam, a unit test for every unit the diff modified, boundary assertions that survive a rename) and the **smell baseline** of twelve Fowler smells, each a labelled judgement call the repo or the Spec can suppress and each skipped where tooling already enforces it. It fixes the diff from the run's baseline SHA before dispatching, so both axes measure the same change, and it reports the two side by side without merging or reranking them, because one ordering lets a clean Standards report bury a missing requirement. It returns findings and fixes nothing, which is what keeps the reviewing and the fixing honest.

### `/archie-implement`

User-callable, and the whole unattended phase. Takes **one** `ready-for-agent` Task reference — `3.2#1` or a path — resolves the Task and its Spec from it, records `git rev-parse HEAD` as the run's baseline, and checks three gates before doing anything: the blocking edges are met, the label is `ready-for-agent` (a `ready-for-human` one halts and names [`/archie-assist`](skills/archie-assist/SKILL.md)), and the tree is clean enough to read a diff off. Then [`/archie-tdd`](skills/archie-tdd/SKILL.md) → [`/archie-code-review`](skills/archie-code-review/SKILL.md), invoked **inline** so its two axis sub-agents are top-level rather than nested → **one** fix round, `/archie-tdd` again so each fix arrives driven by a test and re-gated, whose small diff the orchestrator judges itself rather than re-reviewing → one report. Three sub-agent runs. It writes no feature code, which is what keeps its read of the diff honest. Nothing halts mid-pipeline: there is no triage step and no planning-defect exit, so an ambiguous criterion is built one way and reported as a Spec finding. Every dispatch ends in a **readout** — one lead line of triage, then the sub-agent's report verbatim — so an unattended run is legible while it is still running. It sets `in-progress` at the start and `ready-for-review` at the end, never `done`, and the summary ends in the **test plan**: every acceptance criterion marked covered by a test or walk-it-by-hand, the manual ones written as steps through the running app. With no browser-driven E2E in the pipeline, that plan is the only thing standing between the run and a criterion nobody checked.

### `/archie-assist`

User-callable, and the counterpart for the work an agent cannot do: a `ready-for-human` Task — a signup, a secret, a permission — which produces no diff, so the build, the review and the fix round all drop out rather than being no-opped through. It derives the route to the outcome **at guide time** from the service's own documentation rather than replaying instructions stored in the Task, because a third-party UI renames its buttons between the day the Task was written and the day it runs — so the Task's criteria stay outcomes and the guidance is never written back into it. It guides **one step at a time**, confirming each landed before deriving the next from where the user actually is, and treats a screen that is not there or a plan that costs money as the new starting point rather than a step to repeat. Then it verifies the state itself, against the real world: the env var is present where the app reads it, the key authenticates on a live call, the account signs in. Every criterion is graded **verified** or **unverified**, and an unverified one travels into the report as unverified — the state was made by hand and no suite stands behind it. It stops at `ready-for-review` like `/archie-implement`.
