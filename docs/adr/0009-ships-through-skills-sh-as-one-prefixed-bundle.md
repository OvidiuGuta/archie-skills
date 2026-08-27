# Archie ships through skills.sh as one `archie-` prefixed, phase-grouped bundle

Archie is distributed through **skills.sh only** — `npx skills@latest add OvidiuGuta/archie-skills --skill '*'` — and not as a Claude Code plugin. The CLI reaches Codex and every other Agent-Skills harness, which is what the per-skill `agents/openai.yaml` files were already a bet on, and it installs editable files the user owns. A plugin would be Claude Code only. `main` is the release: nothing downstream resolves a version, so there is no changelog, no changesets and no tag.

Three decisions follow from that one channel and are recorded here together, because separately each looks arbitrary.

**Every skill name is prefixed `archie-`.** skills.sh installs flat into a single shared `skills/` directory, keyed by the frontmatter `name`, and an existing directory is **overwritten** with nothing but a one-line warning. Six of Archie's thirteen names — `tdd`, `code-review`, `domain-modeling`, `research`, `prototype`, `to-spec` — collide exactly with mattpocock/skills, the bundle Archie replaces and the one its users are most likely to already have. Bare names would silently delete six of them. The prefix is paid on every invocation the user ever types, which is the real cost, and it buys a bundle that cannot destroy its predecessor's install.

**The bundle is grouped into two installable phases**, Planning and Implementing, via `.claude-plugin/marketplace.json`. The CLI reads that manifest for grouping and renders each entry as a group the user can tick whole. Planning alone is coherent: architect, spec, slice into Tasks, hand them off. Implementing alone has nothing to consume, so its entry skills name the missing skill rather than improvising. Whole-framework stays the documented install.

## Consequences

- `marketplace.json` and `plugin.json` must not both exist. The CLI reads `plugin.json` **after** `marketplace.json` and overwrites the groupings for the same directories, collapsing both phases into one group.
- Manifest paths must start with `./` or the CLI drops them without saying so. Gated.
- The manifest is a second list of every skill, so the gate compares it against the directories on disk.
- The Effort tree moved to `.archie/` (see [`0003`](0003-effort-tree-on-disk.md)) for the same reason as the prefix: `.scratch/` is mattpocock's local-tracker convention, and one directory holding either an Effort or a bag of issue files is a tree `/archie-architect` will walk into. `CONTEXT.md` and `docs/adr/` are deliberately **not** namespaced — a repo should have one glossary, and two competing ones is the actual failure mode.
- Because Implementing installs without Setup, "no facts section in `AGENTS.md`" is a real state a skill will meet, distinct from a fact recorded as `unknown`, and it names `/archie-setup` rather than reconstructing the gates.
- The Claude Code plugin channel stays available at no cost: `marketplace.json` already makes the repo its own marketplace. It is not documented to users.
