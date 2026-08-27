---
name: setup-archie
description: Prepare a repo for Archie — record its project facts in AGENTS.md and keep `.scratch/` committed.
disable-model-invocation: true
---

# Set up Archie

The conventions ship inside this bundle, so the only per-repo work is recording the **facts** an agent cannot guess: the gate commands, how to start the real app, and where the good test prior art lives.

Read [`../reference/agents-facts.md`](../reference/agents-facts.md) first. It fixes the section's delimiters, the fact list, and what `unknown` means to the skills that read it. This skill is how that section gets seeded.

Explore, present, confirm, then write. Nothing reaches disk before the user has seen the draft.

## 1. Explore

Fill in every fact below from the repo. A fact is settled only when you have **read the command or the path in a file**. Everything else is `unknown` — a real answer, and the one that stops `/qa` from trying `npm start` on a repo that has no such script.

| Fact | Where it is written |
| --- | --- |
| Package manager | the lockfile, `packageManager` in `package.json`, the CI workflow |
| Lint, typecheck, test, build | `package.json` scripts, `Makefile`, `justfile`, `nx.json` targets, `turbo.json`, `pyproject.toml`, `Cargo.toml`. The CI workflow is the best source of all four: it shows which ones actually run, and how they are scoped in a monorepo |
| Run the app, and its port | the dev script, `docker-compose.yml`, `Procfile`, the README quickstart; the port in the dev server config, the e2e `baseURL`, or `.env.example` |
| E2E harness | `playwright.config.*`, `cypress.config.*`, and the directory its specs sit in |
| Unit and integration test prior art | the existing specs. Pick one file per layer that a new test should be modelled on: recently touched, and pinning real behaviour rather than smoke-checking. Name the file, not its directory |
| Seed data and test credentials | seed and fixture scripts, `.env.example`, `docker-compose` env, the e2e global-setup file, the README |
| Branch convention | `git branch -a`, the merged branches on the remote, and the default branch's name |
| Commit convention | `git log --oneline -30`, a `commitlint` or `.czrc` config, `CONTRIBUTING.md` |

Done when every row holds either a value read out of the repo or `unknown`.

## 2. Present and confirm

One message, then wait:

- The drafted facts block, verbatim as it will appear in `AGENTS.md`.
- Every `unknown`, named, with a direct question. The user knows the port and the test login even when nothing in the repo says so, and this is the cheapest moment to get them.
- The ignore file amendment from step 4, if one is needed.

Let the user correct the draft before anything is written.

## 3. Write the facts section

Into `AGENTS.md` at the repo root, following the reference: replace between the markers, or append the block if the markers are absent, creating the file if the repo has none. The facts section is the only thing this skill writes there, so re-running it updates that block and leaves every hand-written line as it was.

If `CLAUDE.md` exists and does not reach `AGENTS.md`, add an `@AGENTS.md` import line to it, so the facts are in context where the user's agent actually reads.

## 4. Keep `.scratch/` committed

```sh
git check-ignore -v .scratch/probe
```

Silence means the planning tree is already committed. Output names the ignore file, line and pattern that would swallow it: append `!.scratch/` and `!.scratch/**` to that file and re-run until it prints nothing. Planning lives in `.scratch/` and has to survive switching laptops.

When the pattern comes from a global excludes file, report it to the user instead — that file is theirs to change.

## 5. Report

One message: the facts recorded, and each remaining `unknown` with the skill that will ask for it. The section is living — any skill that later learns a gate command writes it back — so re-running this skill is for a genuine change of stack rather than for filling a gap.
