---
name: archie-setup
description: Prepare a repo for Archie — record its project facts in AGENTS.md and keep `.archie/` committed.
disable-model-invocation: true
---

# Set up Archie

The conventions ship inside this bundle, so the only per-repo work is recording the **facts** an agent cannot guess: the gate commands, how to start the real app, and the branch and commit conventions. Everything else about the repo is readable from the code and is not recorded.

Explore, present, confirm, then write. Nothing reaches disk before the user has seen the draft.

## 1. Explore

Fill in every fact below from the repo. A fact is settled only when you have **read the command or the value in a file** — anything else becomes a question for the user in step 2.

| Fact | Where it is written |
| --- | --- |
| Package manager | the lockfile, `packageManager` in `package.json`, the CI workflow |
| Lint, typecheck, test, test-e2e, build | `package.json` scripts, `Makefile`, `justfile`, `nx.json` targets, `turbo.json`, `pyproject.toml`, `Cargo.toml`. The CI workflow is the best source of all five: it shows which ones actually run, and how they are scoped in a monorepo |
| Run the app, and its URL | the dev script, `docker-compose.yml`, `Procfile`, the README quickstart; the port in the dev server config, the e2e `baseURL`, or `.env.example` |
| Branch convention | `git branch -a`, the merged branches on the remote, and the default branch's name |
| Commit convention | `git log --oneline -30`, a `commitlint` or `.czrc` config, `CONTRIBUTING.md` |

A greenfield repo takes the same path and simply records fewer lines — choosing its stack belongs to the root Epic's scoping session, not here.

Done when every fact holds either a value read out of the repo or a question for the user.

## 2. Present and confirm

One message, then wait:

- The drafted facts block, verbatim as it will appear in `AGENTS.md`.
- Every fact the repo did not settle, named, with a direct question and two ways to answer: give the value, or say **remove** and the line is left out.
- The ignore file amendment from step 4, if one is needed.

Let the user correct the draft; only answered lines reach disk.

## 3. Write the facts section

The facts live in a delimited section of `AGENTS.md` at the repo root:

```md
<!-- archie:facts:start -->
## Project facts

- **Package manager:** pnpm
- **Lint:** `pnpm lint`
- **Typecheck:** `pnpm typecheck`
- **Test:** `pnpm test`
- **Test e2e:** `pnpm e2e`
- **Build:** `pnpm build`
- **Run the app:** `pnpm dev`, served on http://localhost:4200
- **Branch convention:** `feat/<slug>` off `main`
- **Commit convention:** conventional commits, e.g. `feat(ui): users can change their avatar`
<!-- archie:facts:end -->
```

One line per fact, each command written exactly as it is run. **Replace the whole block between the markers** and touch nothing outside them — the file is the user's. No markers means the section does not exist yet: append it at the end, creating the file if the repo has none.

If `CLAUDE.md` is missing, create it containing a single `@AGENTS.md` line; if it exists and does not reach `AGENTS.md`, add that import — so the facts are in context where the user's agent actually reads.

## 4. Keep `.archie/` committed

```sh
git check-ignore -v .archie/probe
```

Silence means the planning tree is already committed. Output names the ignore file, line and pattern that would swallow it: append `!.archie/` and `!.archie/**` to that file and re-run until it prints nothing.

When the pattern comes from a global excludes file, report it to the user instead — that file is theirs to change.

## 5. Report

One message: the facts recorded, and the lines left out at the user's word.
