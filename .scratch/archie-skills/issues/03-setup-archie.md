# 03 — `/setup-archie`

**What to build:** The user-callable skill that prepares a repo for Archie by recording the facts the skills cannot guess. It records only what genuinely varies per repo, because the conventions are fixed by the framework.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [x] User-callable only (`disable-model-invocation: true`)
- [x] Explores the repo, presents what it found, and confirms with the user before writing anything
- [x] Discovers the lint, typecheck, test and build commands as actually written in the project
- [x] Discovers how to start the real app, including port, seed data and test credentials where discoverable, because `/qa` cannot run without them
- [x] Discovers test prior art locations, the package manager, and branch and commit conventions
- [x] Records any fact it cannot determine as `unknown`, explicitly, and never fabricates a plausible command
- [x] Writes the facts into a delimited section of `AGENTS.md`, leaving hand-written content untouched
- [x] Re-running updates that section in place rather than appending a second copy
- [x] Ensures `.scratch/` is not gitignored, amending the ignore file if it would be caught
- ~~Removes stale `docs/agents/issue-tracker.md`, `triage-labels.md` and `domain.md` from a prior mattpocock install if present~~ — dropped by the user as unnecessary
- [x] Writes no `## Agent skills` section, since the entry skills are user-callable only
- [x] One code path for greenfield, boilerplate and mature repos, with no mode switch
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
