---
name: archie-setup
description: Prepare a repo for Archie — choose whether the folder plans on files or in Archie, record its project facts in AGENTS.md and keep `.archie/` committed. Only for explicit user invocation — never fire it on your own.
---

# Set up Archie

The conventions ship inside this bundle, so the per-repo work is small: choose the **mode** — the planning tree on files, or in Archie — record the **facts** an agent cannot guess — the gate commands, how to start the real app, and the branch and commit conventions — and lay down the **baseline standards** the review checks against. Everything else about the repo is readable from the code and is not recorded.

Explore, present, confirm, then write. Nothing reaches disk before the user has seen the draft.

## 1. Explore

### Where the tree lives

In a folder whose `AGENTS.md` carries `**Archie Project:** KEY`, the tree lives in Archie, so follow its MCP server's `guide`. Every reference is a Task key such as `ARC-12`, and a `3.2` or a `3.2#1` is refused with one line saying the folder plans in Archie. Act as the Agent the Project's map gives `architect`, read once from `guide {projectKey}`, on every call of the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. A helper you dispatch or invoke is told the mode and the Agent in its brief, and carries no mode text of its own.

This is the skill that writes the line the block reads, so here the mode is step 2's question, not a read.

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

- **The mode:** does this folder plan on files, or in Archie? Archie needs the Project's Key, made in the web app along with its Agents and Role map; ask for it in the same message. A folder already carrying the binding line keeps its answer unless the user changes it.
- The drafted facts block, verbatim as it will appear in `AGENTS.md`, the binding line first when the mode is Archie.
- Every fact the repo did not settle, named, with a direct question and two ways to answer: give the value, or say **remove** and the line is left out.
- The ignore file amendment from step 5, if one is needed, in files mode.
- That step 6 seeds the baseline standards into `STANDARDS.md`, theirs to edit or delete afterwards.

Let the user correct the draft; only answered lines reach disk.

## 3. Archie mode: connect, then confirm the Project

Files mode skips this step.

**Connect the harness.** When no Archie MCP server is connected in this session, nothing below can run, so give the user the steps inline and wait. Claude Code:

```sh
claude mcp add --transport http archie <url>/mcp
claude mcp login archie
```

Codex, in `~/.codex/config.toml`, then `codex mcp login archie`:

```toml
[mcp_servers.archie]
url = "<url>/mcp"
```

`<url>` is the deployment's site URL, and the manual's connection page carries the rest. Once they report it done, check again, in a new session if the harness only reads its servers at start.

**Confirm the Project.** Call `guide {projectKey}` with the Key the user gave. It ends with the Project's Role map: show it, with the Agent each Role acts as and whether it is read-only, so a mistyped Key or an unmapped Role is caught now. An unknown Key is refused by the server: report it and ask again, and write nothing until one is confirmed.

Done when the server answered for the Key and the user has seen the map.

## 4. Write the facts section

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

One line per fact, each command written exactly as it is run. In Archie mode the block opens with the binding line, above the heading:

```md
<!-- archie:facts:start -->
**Archie Project:** ARC

## Project facts
```

Files mode leaves the line out, and a re-run on files mode drops it. **Replace the whole block between the markers** and touch nothing outside them — the file is the user's, and an existing `.archie/`, `docs/adr/` or `CONTEXT.md` is theirs to move or delete, never imported or removed here. No markers means the section does not exist yet: append it at the end, creating the file if the repo has none.

If `CLAUDE.md` is missing, create it containing a single `@AGENTS.md` line; if it exists and does not reach `AGENTS.md`, add that import — so the facts are in context where the user's agent actually reads.

## 5. Files mode: keep `.archie/` committed

Archie mode skips this step: the tree is not on disk.

```sh
git check-ignore -v .archie/probe
```

Silence means the planning tree is already committed. Output names the ignore file, line and pattern that would swallow it: append `!.archie/` and `!.archie/**` to that file and re-run until it prints nothing.

When the pattern comes from a global excludes file, report it to the user instead — that file is theirs to change.

## 6. Seed the standards

Dispatch `/archie-standards` to seed the repo from its baseline. It owns `STANDARDS.md` and the `AGENTS.md` link to it, so it writes both and you write neither — one file, one owner, including where the repo already has standards to merge into.

## 7. Report

One message: the mode, the facts recorded, the lines left out at the user's word, and whether the standards were seeded. In Archie mode, name `/archie-architect` with the Project's Key as the next move.
