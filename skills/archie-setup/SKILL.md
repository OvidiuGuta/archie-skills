---
name: archie-setup
description: Prepare a repo for Archie — record its project facts in AGENTS.md, seed its standards and keep `.archie/` committed, and in Archie confirm the folder's Project and report how the skills bind to its flows. Only for explicit user invocation — never fire it on your own.
---

# Set up Archie

The conventions ship inside this bundle, so the per-repo work is small: show the **mode** the folder's remote gives it — the planning tree on files, or in Archie — record the **facts** an agent cannot guess — the gate commands, how to start the real app, and the branch and commit conventions — and lay down the **baseline standards** the review checks against. In Archie, it also reports how every skill step **binds** to a row of the human's flows. Everything else about the repo is readable from the code and is not recorded.

Explore, present, confirm, then write. Nothing reaches disk before the user has seen the draft, and nothing is ever written in Archie: every Archie call here is a read, and the rows are the human's to create in Settings.

## 1. Explore

### Where the tree lives

The folder plans in Archie when its `origin` remote clearly matches one Project's repo in the Archie MCP server's `guide` Index. Read the remote with `git remote get-url origin`. Two remotes are the same repo when their host and path match, ignoring the scheme, the user and a trailing `.git`, so `git@github.com:me/app.git` matches `https://github.com/me/app`. No `origin`, no match or no Archie connection means the tree lives on files, as the steps below describe. Several matches, or a match you are unsure of, means stopping to ask the human which Project the folder belongs to.

In Archie, follow the `guide`. Every reference is a Task key such as `ARC-12`, and a `3.2` or a `3.2#1` is refused with one line saying the folder plans in Archie. Act as the Agent whose description in the Index fits **planning**, or as the Task's assignee when it is an Agent, chosen once for the session. The steps below name the tree's files and markers, and the `guide` says how each is read and written in Archie. Where a step sets a `Status:`, reads or writes a marker, or names a Type, use the Status or Type whose description fits it. When none clearly fits, or several do, stop and ask the human, naming the step you were on and `/archie-setup`, which reports every such gap. A helper you dispatch or invoke is told the mode and the Agent in its brief, and carries no mode text of its own.

Read the mode as the block says, and keep what decided it for step 3: the Project the remote matched, an `origin` no Project names, no `origin`, or no Archie server connected.

Fill in every fact below from the repo. A fact is settled only when you have **read the command or the value in a file** — anything else becomes a question for the user in step 3.

| Fact | Where it is written |
| --- | --- |
| Package manager | the lockfile, `packageManager` in `package.json`, the CI workflow |
| Lint, typecheck, test, test-e2e, build | `package.json` scripts, `Makefile`, `justfile`, `nx.json` targets, `turbo.json`, `pyproject.toml`, `Cargo.toml`. The CI workflow is the best source of all five: it shows which ones actually run, and how they are scoped in a monorepo |
| Run the app, and its URL | the dev script, `docker-compose.yml`, `Procfile`, the README quickstart; the port in the dev server config, the e2e `baseURL`, or `.env.example` |
| Branch convention | `git branch -a`, the merged branches on the remote, and the default branch's name |
| Commit convention | `git log --oneline -30`, a `commitlint` or `.czrc` config, `CONTRIBUTING.md` |

A greenfield repo takes the same path and simply records fewer lines — choosing its stack belongs to the root Epic's scoping session, not here.

Done when the mode and its reason are known, and every fact holds either a value read out of the repo or a question for the user.

## 2. Archie mode: check how the flows bind

Files mode skips this step.

Walk every need in [`references/bindings.md`](./references/bindings.md) against the `guide` Index. Read the Statuses through `get_workflow {name}` for the Workflow the Index names beside each Task Type, so a flow with no Tasks yet is checked as fully as one in use. Each need ends as one of three: the row it **binds** to, a **gap** where no row fits, or **several** rows that fit. Draft a proposed row for every gap and every several, as the reference describes.

The report is computed from what Archie holds now and kept nowhere, so a re-run after the human edits the flows checks them afresh.

Done when every need in `bindings.md` names its row or carries a proposal.

## 3. Present and confirm

One message, then wait:

- **The mode, and what decided it.** In Archie, the Project's Key and name, and the remote that matched it. An `origin` no Project names plans on files; to plan it in Archie, the human adds that remote to the Project's repos in its settings in the web app, then re-runs setup. No `origin` plans on files. No Archie server connected plans on files, with the lines below for planning in Archie.
- In Archie, the bindings report from step 2.
- The drafted facts section, verbatim as it will appear in `AGENTS.md`.
- Every fact the repo did not settle, named, with a direct question and two ways to answer: give the value, or say **remove** and the line is left out.
- An old `**Archie Project:**` line or old `archie:facts` markers in `AGENTS.md`, named, with the question whether to remove them. They stay unless the user agrees.
- The ignore file amendment from step 5, if one is needed, in files mode.
- That step 6 seeds the baseline standards into `STANDARDS.md`, theirs to edit or delete afterwards.

Let the user correct the draft; only answered lines reach disk.

**Connecting a harness.** When the user wants Archie and no Archie MCP server is connected, give them the lines inline. Claude Code:

```sh
claude mcp add --transport http archie <url>/mcp
claude mcp login archie
```

Codex, in `~/.codex/config.toml`, then `codex mcp login archie`:

```toml
[mcp_servers.archie]
url = "<url>/mcp"
```

`<url>` is the deployment's site URL, and the manual's connection page carries the rest. Once they report it done, run setup again, in a new session if the harness only reads its servers at start.

## 4. Write the facts section

The facts live in a plain `## Project facts` section of `AGENTS.md` at the repo root, the same in both modes:

```md
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
```

One line per fact, each command written exactly as it is run. **Find the section by its heading and replace it whole**: it runs from `## Project facts` to the next heading at its level or above, an old end marker, or the end of the file, whichever comes first. Touch nothing outside it — the file is the user's, and an existing `.archie/`, `docs/adr/` or `CONTEXT.md` is theirs to move or delete, never imported or removed here. An old binding line or old markers go only when the user agreed in step 3. No heading means the section does not exist yet: append it at the end, creating the file if the repo has none.

If `CLAUDE.md` is missing, create it containing a single `@AGENTS.md` line; if it exists and does not reach `AGENTS.md`, add that import — so the facts are in context where the user's agent actually reads.

## 5. Files mode: keep `.archie/` committed

Archie mode skips this step: the tree is not on disk.

```sh
git check-ignore -v .archie/probe
```

Silence means the planning tree is already committed. Output names the ignore file, line and pattern that would swallow it: append `!.archie/` and `!.archie/**` to that file and re-run until it prints nothing.

When the pattern comes from a global excludes file, report it to the user instead — that file is theirs to change.

## 6. Seed the standards

In both modes, dispatch `/archie-standards` to seed the repo from its baseline. It owns `STANDARDS.md` and the `AGENTS.md` link to it, so it writes both and you write neither — one file, one owner, including where the repo already has standards to merge into.

## 7. Report

One message: the mode and what decided it, the facts recorded, the lines left out at the user's word, and whether the standards were seeded. In Archie mode, add every gap or several still open from step 2, with re-running setup as the check once the human has created the rows, and name `/archie-architect` on a loose idea or an Epic's Task key as the next move.
