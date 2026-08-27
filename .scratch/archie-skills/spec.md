# Spec: Archie Skills

**Status:** ready-for-agent

## Problem Statement

I work with AI agents across two very different modes, and no installed skill set fits either well.

Planning is the worse of the two. `/wayfinder` charts a full map of decision tickets before anything gets built, which is a waterfall: a lot of planning, nothing to show for it, and by the time the third ticket is resolved the first one's assumptions have gone stale. It also assumes a hosted issue tracker and multiple bounded contexts, neither of which I have. Meanwhile `/grilling` asks a whole round of questions at once, which is harder to think about than one question at a time, and nothing bounds how deep it goes, so it will happily specify an entire application in a single sitting.

Implementation has the opposite problem. It's under-structured. There's no single command that takes one piece of work and carries it through design, implementation, review and verification without me sitting in the loop at every handoff.

Underneath both is a modelling problem. Real work does not come in a fixed number of levels. "Build a web app" needs high-level decisions (does it need auth, what are the screens, what's the value proposition), then a level down for how auth actually works, and sometimes a level below that. How many levels depends entirely on the subject, and any tool with a fixed hierarchy either forces ceremony onto small work or runs out of room on large work.

## Solution

A thirteen-skill framework, Archie, organised around one recursive idea.

An **Effort** is a unit of scoped work. It is either **Split**, holding ordered child Efforts, or **Specified**, holding exactly one Spec and its Tasks. Never both, so all buildable work lives at leaves. Splitting is a **resolution** mechanism: a child describes the same subject in sharper detail, not a different subject. Depth is however many times you chose to sharpen.

Planning is a conversation, not a document. `/architect` interviews one question at a time and applies an **altitude test** before each: does this answer have blast radius beyond one part of this Effort? Cross-cutting questions get asked. Local ones get **deferred**, visibly, and the clusters they form become the children. Sessions end quickly because cross-cutting decisions at any resolution are few. When the agent hits a question conversation cannot answer, it takes one of two other exits: `/research` for facts, `/prototype` for "how should this look", both in sub-agents returning pointers so the interview's context stays clean.

Children are created **thin**: a title and a line of intent. They are architected later, one at a time, in order, when the earlier siblings are already built and their code is sitting right there to read. That is the agile part, and it is why a thin child is a deliberate deferral to a moment of strictly greater knowledge rather than a gap.

When an Effort is sharp enough, `/to-spec` writes its Spec and fixes the integration **seams**, the last human checkpoint before testability is baked in. `/to-tasks` slices it into vertical Tasks, each one demoable outcome.

Then `/implement` takes a single Task and runs it AFK: a read-only architect sub-agent writes the design to a file, a TDD engineer implements it, a reviewer checks it, an orchestrator triages the findings and drives bounded fix rounds, and QA proves the outcome against the running app. It reports and stops at `ready-for-review`. The last move is mine.

## User Stories

### Setup

1. As a developer, I want to run `/setup-archie` in any repo, so that the skills know the facts about it they cannot guess.
2. As a developer, I want setup to discover my lint, typecheck, test and build commands, so that `/tdd` and the orchestrator run the right gates.
3. As a developer, I want setup to discover how to start the real app, so that `/qa` can drive it.
4. As a developer, I want setup to discover where my good test prior art lives, so that new tests match the house style.
5. As a developer running setup on a greenfield repo, I want facts it cannot determine recorded as `unknown` rather than guessed, so that no skill acts on a fabricated command.
6. As a developer, I want those facts written into a delimited section of `AGENTS.md`, so that they are already in every agent's context with no file to go and read.
7. As a developer, I want setup to make sure `.scratch/` is not gitignored, so that my planning survives switching laptops.
8. As a developer, I want any skill that discovers a gate has changed to write the correction back, so that the facts section heals itself instead of rotting.

### Architecting

9. As a developer with a loose idea, I want to run `/architect` and get a root Effort, so that I have somewhere for the work to live.
10. As a developer, I want to be asked exactly one question at a time, so that I can actually think about each one.
11. As a developer, I want each question to come with the agent's recommended answer, so that agreeing is cheap and disagreeing is informed.
12. As a developer, I want the agent to refuse to ask me questions that are below the current altitude, so that a session about the whole app does not descend into one screen's layout.
13. As a developer, I want every deferral announced in one line as it happens, so that I watch the child list assemble itself instead of being handed it at the end.
14. As a developer, I want to pull a deferred question back up to the current level, so that I can overrule the altitude test continuously rather than once.
15. As a developer, I want a short check-in roughly every eight questions, so that I can intervene before a misjudged session wastes my time.
16. As a developer, I want questions that are facts rather than decisions dispatched to a `/research` sub-agent, so that I am never asked to go and read documentation for the agent.
17. As a developer facing a "how should this look" question, I want a `/prototype` sub-agent to build something cheap for me to react to, so that we are not agreeing vaguely about a screen neither of us has seen.
18. As a developer, I want research and prototype sub-agents to return a path and a summary rather than their findings inline, so that the interview's context stays clean.
19. As a developer, I want to iterate on a prototype without the sub-agent re-reading the world, so that "make the sidebar narrower" is cheap.
20. As a developer, I want the agent to recommend either splitting or specifying at the end of a session, with its reasoning, so that I am overruling something concrete.
21. As a developer, I want the final call on going deeper to be mine, always, so that the agent never commits me to a resolution I did not choose.
22. As a developer, I want children created thin, so that they are architected later when the earlier siblings are built.
23. As a developer, I want to add, delete, reorder or further split children at any time, so that a split stays a hypothesis rather than a commitment.
24. As a developer, I want reordering or re-scoping an already-specified child surfaced to me explicitly, so that I notice when siblings were scoped around it.
25. As a developer architecting a child, I want its ancestors' decisions inherited by walking up the path, so that I do not re-litigate what the parent already settled.
26. As a developer architecting a child, I want the agent to read the code its built siblings produced, so that the current state genuinely influences the decision.
27. As a developer, I want domain terms captured in `CONTEXT.md` the moment they resolve, so that the glossary is current rather than reconstructed.
28. As a developer, I want to be challenged when I use a term that conflicts with the glossary, so that the language stays sharp.
29. As a developer, I want decisions clearing the ADR bar written to `docs/adr/` during the session, so that they survive the Effort tree being deleted.
30. As a developer, I want a lower resolution to amend an existing ADR in place when it merely sharpens it, so that `docs/adr/` states current truth instead of a chain to follow.
31. As a developer, I want a reversal to write a new superseding ADR rather than an edit, so that a deliberate change of mind stays visible.
32. As a developer, I want at-altitude decisions that do not clear the ADR bar recorded as one line in `effort.md`, so that children inherit them without bloating the durable docs.
33. As a developer, I want an Effort's progress derived from its subtree rather than stored, so that no status line can be stale.
34. As a developer who has changed my mind halfway through, I want to delete an Effort tree and start another, so that pivoting costs nothing and no close ritual stands in the way.

### Handing off

35. As a developer, I want `/to-spec` to synthesise the session I just had rather than interview me again, so that I am not asked the same things twice.
36. As a developer, I want the spec to propose the integration seams and confirm them with me, so that testability is settled while I am still in the loop.
37. As a developer, I want the spec to prefer existing seams, sit as high as possible, and use as few as possible, so that the codebase does not accumulate test surface.
38. As a developer, I want the spec to carry an explicit `Effort:` reference, so that a sub-agent handed it as bare text knows what it belongs to.
39. As a developer, I want `/to-tasks` to slice the spec into vertical Tasks with blocking edges, so that sequencing is expressed rather than assumed.
40. As a developer, I want each Task to be exactly one end-to-end demoable outcome, so that "is this task too big" has a checkable answer.
41. As a developer, I want to be quizzed on granularity and blocking edges before the Tasks are written, so that I can correct the breakdown cheaply.
42. As a developer, I want each Task labelled `ready-for-agent` or `ready-for-human`, so that `/implement` knows which pipeline to run.
43. As a developer, I want Tasks to avoid file paths and code, so that they do not go stale the week after they are written.

### Implementing

44. As a developer, I want to run `/implement 3.2#1` and walk away, so that one task is designed, built, reviewed and verified without me.
45. As a developer, I want a read-only architect sub-agent to write `design.md` beside the task, so that the engineer, the reviewer and I all read the same design.
46. As a developer, I want the design on disk rather than relayed through the orchestrator, so that the orchestrator's context stays small and the design survives the run.
47. As a developer implementing a later task in a leaf, I want its architect to read the earlier tasks' designs, so that it builds inside the structure they intended rather than guessing from the code.
48. As a developer, I want `/tdd` to write one failing integration test at the spec's seam first, so that the outer loop is honest.
49. As a developer, I want `/tdd` to unit test every unit the task modifies, mocking dependencies, so that behaviour is pinned in isolation.
50. As a developer, I want unit tests that assert behaviour at a unit's boundary, so that a rename or an extracted helper does not break the suite.
51. As a developer, I want `/code-review` to check the code against the spec, the task's acceptance criteria and the design it claims to follow, so that all three contracts hold.
52. As a developer, I want at most two review fix rounds, so that the run's cost is bounded and predictable.
53. As a developer, I want the orchestrator to triage every finding before acting, so that it fixes defects and escalates planning problems rather than guessing at an ambiguous criterion.
54. As a developer, I want a finding that is really a planning defect to halt the run and surface to me, so that the agent never invents an answer only I can give.
55. As a developer, I want `/qa` to prove the task's demoable outcome against the running app with one Playwright journey test, so that the pieces are shown to work together.
56. As a developer, I want at most one QA fix round, and no full re-review afterwards, so that the worst case stays seven to nine sub-agent runs.
57. As a developer, I want QA to report each criterion as pinned, verified but not pinned, or unverified, so that I can see where regressions will come from.
58. As a developer, I want `/implement` to stop at `ready-for-review` and never mark a task done, so that the AFK phase never declares its own work finished.
59. As a developer, I want one summary at the end covering design, implementation, review, fixes and QA, so that I can review the whole run in one read.
60. As a developer, I want `/implement` on a `ready-for-human` task to guide me step by step, so that I get the same structure for work an agent cannot do.
61. As a developer, I want those steps derived at guide time rather than read from the task file, so that instructions for third-party UIs are not naming buttons that moved weeks ago.
62. As a developer, I want QA to verify what it can of my human-performed work, such as an env var being present and a key authenticating, so that "done" means something.
63. As a developer, I want criteria nothing observable can confirm listed as unverified in the summary, so that an unattended pass never covers for something nobody checked.
64. As a developer, I want `/qa` to refuse to guess when the run command is `unknown`, so that it asks me instead of trying `npm start`.

### The skills themselves

65. As a developer, I want the five entry skills to be user-callable only, so that no agent invokes a planning phase on its own initiative.
66. As a developer, I want the eight sub-skills reachable only by explicit naming, so that nothing needs advertising in `AGENTS.md`.
67. As a developer, I want the fixed conventions to live in one shared reference inside the skill bundle, so that thirteen skills cannot drift from each other.
68. As a developer, I want each ticket to document what it built in the README while that knowledge is fresh, so that the README is accurate rather than reconstructed at the end.
69. As a developer, I want the validator to fail on a skill missing from the README, so that documenting is enforced rather than remembered.

## Implementation Decisions

### The thirteen skills

| Skill | Callable by | Role |
|---|---|---|
| `/setup-archie` | user only | Record per-repo facts in `AGENTS.md` and ensure `.scratch/` is committed |
| `/architect` | user only | Drive an Effort's session: interview, defer, split or specify |
| `/interview` | model | One question at a time, with the altitude test |
| `/domain-modeling` | model | Maintain `CONTEXT.md` and `docs/adr/` |
| `/research` | model | Resolve a factual question in a sub-agent, return a pointer |
| `/prototype` | model | Build a throwaway artifact in a sub-agent, return a pointer |
| `/to-spec` | user only | Synthesise the session into `spec.md`, fix the seams |
| `/to-tasks` | user only | Slice a spec into vertical Tasks with blocking edges |
| `/implement` | user only | Orchestrate one Task through its pipeline |
| `/software-architecture` | model | Read-only design for one Task, written to `design.md` |
| `/tdd` | model | Double-loop test-first implementation |
| `/code-review` | model | Check code against spec, criteria and design |
| `/qa` | model | Prove the demoable outcome against the running app |

The five entry skills carry `disable-model-invocation: true`.

Skills that name an action are named as **verbs**: `/architect`, `/interview`, `/implement`. Not gerunds, which is why mattpocock's `/grilling` becomes `/interview`.

For parity with mattpocock's bundle, every skill also ships an `agents/openai.yaml` carrying `interface.display_name` and `interface.short_description`.

The **README is written incrementally**, by whichever ticket builds the thing being described, while that knowledge is fresh. There is no final documentation ticket. The validator enforces it by failing on any skill absent from `README.md`.

### On-disk shape

```
.scratch/<root-slug>/                 root Effort, unnumbered
├── effort.md                         title, intent, decisions, ordered child list
├── 01-<slug>/                        child Effort, number is identity
│   └── effort.md
└── 02-<slug>/                        Specified Effort (leaf)
    ├── effort.md
    ├── spec.md
    └── tasks/
        ├── 01-<slug>.md
        └── 01-<slug>.design.md
```

Numbers are identity, assigned per parent on creation, never renumbered. Order lives in the parent's ordered child list. Efforts are referenced `3.2`, Tasks `3.2#1`. Deletions leave gaps and gaps are never backfilled. `.scratch/` is committed and disposable.

### Shared reference files

The conventions are fixed by the framework, so they ship once inside the bundle rather than being copied into each repo: the Effort tree layout and reference syntax, the `effort.md`, `spec.md` and task templates, the four task statuses and two labels, and the `CONTEXT.md` and ADR formats. Every skill points at these rather than restating them.

### Statuses and labels

Four statuses, `todo`, `in-progress`, `ready-for-review`, `done`, stored **only** on Tasks. An Effort's progress is derived from its subtree; its structural state is derived from its files (no children and no spec is thin, children is split, a spec is specified). `/to-tasks` writes `todo`. `/implement` sets `in-progress`, then `ready-for-review`. Only the user sets `done`.

Two labels, `ready-for-agent` and `ready-for-human`, on Tasks only, assigned by `/to-tasks`, selecting the pipeline in `/implement`.

### The altitude test

The single rule the framework reuses in four places. *Does this decision have blast radius beyond one part of the thing at hand?*

- In `/interview`, it decides whether to ask a question now or defer it into a child.
- In `/to-spec`, it puts integration seams in the spec (they span a leaf's tasks) and leaves module internals to the per-task design.
- In `/domain-modeling`, it decides whether a settled decision is durable (ADR) or local (`effort.md`).
- In `/implement`, it separates a code defect the engineer fixes from a planning defect that halts the run.

### The `/implement` pipelines

`ready-for-agent`: `/software-architecture` → `/tdd` → `/code-review` → up to 2 engineer fix rounds → `/qa` → up to 1 engineer fix round → report. Seven to nine sub-agent runs. No re-review after a QA fix.

`ready-for-human`: guide → `/qa` → report.

### Decision durability

Three disjoint destinations, so nothing is written twice: `CONTEXT.md` for domain terms, `docs/adr/` for decisions clearing the standard bar (which is **not** lowered), and the Effort's own `effort.md`, one line each, for every other at-altitude decision. If a decision needs more than a line, it needed its reasoning, which means it clears the ADR bar. ADRs are amended in place when sharpened and superseded only on reversal.

## Testing Decisions

**This repo has no runtime.** It is a bundle of markdown prompt files. The framework's own three-layer model (unit, integration at a seam, E2E) assumes an application, and applying it here literally would mean agent-driven tests that are slow, expensive and non-deterministic for skills whose output is a conversation. So the seam analysis lands somewhere unusual, and this is the one section worth overruling before work starts.

**The one automated seam: a structural validator over the skill bundle.** A single script, run as a gate, asserting:

- every `SKILL.md` has valid frontmatter with `name` and `description`
- `name` matches its directory name
- exactly the five entry skills carry `disable-model-invocation: true`, and none of the eight sub-skills do
- every `/skill-name` referenced in any skill body resolves to a skill that exists in the bundle
- every relative link in any skill body resolves to a file that exists
- every shared reference file is pointed at by at least one skill
- every skill has an `agents/openai.yaml` with a `display_name` and a `short_description`

This is the highest useful seam and the only one. Thirteen skills cross-referencing each other and a set of shared reference files is precisely the structure where links rot silently, and it is the failure mode a reader will not notice until a skill runs and quietly skips a step.

**No agent-driven integration tests.** Running `claude -p` against fixture repos to assert that `/setup-archie` produced the right `AGENTS.md` section is technically possible and deterministic enough for the mechanical skills. It is not worth it: slow, costly, and it would cover the two least interesting skills while the conversational ones stay untestable anyway.

**QA is dogfooding.** Each task's acceptance criteria are verified by running the skill for real against a scratch repo and checking the artifacts it produced. `/qa`'s Playwright journey test has no analogue here and is skipped.

**Prior art:** none. This repo has no tests today, so the validator establishes the pattern.

## Out of Scope

- **A final documentation ticket.** The README is maintained incrementally by every ticket instead.
- **`/implement-effort`**, looping `/implement` over a leaf's whole task list. Deliberately deferred until single-task `/implement` has been used enough to know what the loop should do on failure.
- **`/triage`**. The framework has two labels assigned at task-creation time by `/to-tasks`. There is no inbox of externally-reported issues to move through a state machine.
- **Hosted issue trackers.** Local markdown only. No GitHub, GitLab, Linear or Jira integration.
- **Multi-context repos.** One `CONTEXT.md`, one `docs/adr/`. No `CONTEXT-MAP.md`.
- **Wayfinder's map, fog-of-war and decision tickets.** Replaced wholesale by the Effort tree.
- **Migrating a prior mattpocock install.** Setup neither removes its convention docs nor converts old `.scratch/` efforts into Effort trees. Uninstalling that bundle is the user's own housekeeping.
- **Archie the personal assistant.** This repo is only its engineering skill framework.

## Further Notes

This repo keeps using mattpocock/skills conventions for its own planning until decided otherwise, so this spec and its tickets live under `.scratch/archie-skills/` per `docs/agents/issue-tracker.md`. Archie is the thing being built, not the thing being used to build it.

The design decisions behind this spec are in `CONTEXT.md` and `docs/adr/0001` through `0007`. Those seven ADRs are the reference for anyone implementing this, and any skill contradicting one of them is wrong.

Two things are easy to get subtly wrong and worth calling out to whoever builds this:

**The interview must actually refuse to descend.** The natural failure mode of every agent writing this skill is to make the altitude test advisory. It is not advisory. A skill that asks below-altitude questions produces a waterfall, which is the exact thing this framework exists to prevent.

**Sub-agents return pointers, not findings.** `/research`, `/prototype` and `/software-architecture` all write to disk and return a path plus a couple of lines. Any of them returning its output inline defeats the context hygiene the design depends on.
