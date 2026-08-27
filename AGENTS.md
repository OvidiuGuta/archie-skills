# skills

Skill framework for the way I like to work.

## Working on this bundle

**Edit `reference/`, never `skills/*/references/`.** The latter are generated copies: `scripts/sync-references.mjs` fans each authored file into every skill that links it, so each skill directory installs self-contained. Re-run the script in the same commit as any reference change.

**No link in a `SKILL.md` may leave its own directory**, and none in a reference file may leave the reference set. Sibling skills are dispatched by name, not by path. See [`docs/adr/0008-reference-set-fans-out-per-skill.md`](docs/adr/0008-reference-set-fans-out-per-skill.md).

`node scripts/validate-skills.mjs` gates all of it, plus the phase groups in `.claude-plugin/marketplace.json`. Run it before committing.

## Agent skills

### Issue tracker

Issues live as markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles, each label string equal to its name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
