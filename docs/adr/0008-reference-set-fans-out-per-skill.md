# The reference set is authored once and fanned out into every skill

Supersedes the second half of [`0004-setup-records-facts-in-agents-md.md`](0004-setup-records-facts-in-agents-md.md), which had the conventions living as one copy in the bundle that every skill pointed at.

skills.sh installs **one skill directory at a time**: it copies the chosen directory and its subdirectories, and nothing else. A skill whose first instruction was to read `../reference/altitude.md` therefore arrived with a dangling link, silently, and skipped the gate it was supposed to enforce. `reference/` is now the single **authored** source, never installed, and `scripts/sync-references.mjs` copies each file into the `references/` folder of every skill that links it. Every skill directory is self-contained.

We took the duplication over the alternatives. Restating each convention in the skills that need it drops the single source, and the seventh restatement of the altitude test is where it quietly stops meaning the same thing. Symlinking the copies would be exact and self-maintaining, and `dereference: true` in the installer resolves them into real files, but git on Windows without developer mode checks a symlink out as a text file containing its target path — so a Windows install would land skills whose reference documents are one-line strings, with no error anywhere.

## Consequences

- A skill's copies are the **transitive closure** of what its `SKILL.md` links, not just the direct links, because the reference files link each other. A skill needing `altitude.md` also gets the `decisions.md` that `altitude.md` points at.
- **No link in a `SKILL.md` may leave its own directory**, and no link in a reference file may leave the reference set. Both are gated. This is why `/archie-code-review` reads the three test layers from [`test-layers.md`](../../reference/test-layers.md) rather than from ADR 0006, and why sibling skills are dispatched by name rather than by path.
- The copies are **generated, committed output**. Editing one is a mistake the gate catches, and every reference change means re-running the sync script in the same commit.
- 378 authored lines become roughly 1,100 committed ones. That is noise in a diff and inert at runtime, which is the cheaper failure than a reference file that is not there.
- A skill needing one fact from a long reference file should **inline the fact** instead. `/archie-prototype` and `/archie-research` each pulled in 88 lines of `epic-tree.md` for a single path, and now carry no reference copies at all.
