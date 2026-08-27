# Setup records discovered project facts in AGENTS.md, and conventions ship inside the skills

`setup-mattpocock-skills` existed to let a repo *choose* its issue tracker, label strings, and domain doc layout, writing those choices into `docs/agents/*.md` for the skills to look up. This framework fixes all of them by design: local markdown under `.scratch/`, two labels, four task statuses, one `CONTEXT.md` and one `docs/adr/`. Nothing is left to choose, so those files were answering questions nobody asks any more and have been deleted. The conventions now live as reference files inside the skill bundle, one copy, referenced by every skill.

What genuinely varies per repo is the set of **facts** an agent cannot guess: the exact lint, typecheck, test and build commands, how to start the real app for `/qa`, where the good test prior art lives, the package manager, and the branch and commit conventions. `/setup-archie` explores, confirms with the user, and records those in a delimited section of **`AGENTS.md`** rather than a separate file, because `AGENTS.md` is already in every agent's context and needs no indirection.

The section is **living**, not a one-time output. Facts it cannot determine are recorded as `unknown`, explicitly, and any skill that later discovers or creates a gate writes it back. `/implement`'s orchestrator runs the gates anyway, so it is the natural self-healing point.

## Consequences

- There is no greenfield/brownfield mode switch. Setup looks, records what it finds, and writes `unknown` for the rest, so a fresh repo, a boilerplate, and a mature codebase all take one code path.
- `unknown` is a signal skills must act on. `/qa` seeing an unknown run command asks the user rather than guessing.
- On greenfield the stack is not yet chosen, and choosing it is a cross-cutting, hard-to-reverse decision. It belongs to the root Effort's architect session and lands as an ADR, not as a setup output.
- Setup's remaining universal job is small: seed the facts section and ensure `.scratch/` is not gitignored. Removing a prior mattpocock install's `docs/agents/*` files is not setup's business — uninstalling that bundle is the user's own housekeeping, and doing it for them would delete files they may still be planning with.
- No `## Agent skills` section is written. The five entry skills are user-callable only, and the eight sub-skills are reached by explicit naming, so neither needs ambient discovery.
