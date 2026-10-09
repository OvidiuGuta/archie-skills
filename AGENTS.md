# skills

Skill framework for the way I like to work.

## Working on this bundle

**Every skill, reference and manual change is written by the `archie-writing-for-agents` project skill**, its `SKILL.md` and `SKILL-MECHANICS.md` read in full before the first edit.

**Every skill directory is authored self-contained.** Nothing is generated and there is no shared folder: a skill that consults a reference on demand owns that file under its own `references/`. Two skills needing the same reference each carry a copy, and both are edited by hand in the same commit. See [`docs/adr/0011-each-skill-is-authored-self-contained.md`](docs/adr/0011-each-skill-is-authored-self-contained.md).

**No link in a `SKILL.md` may leave its own directory.** Sibling skills are dispatched by name, not by path.

**Every skill has a page at `manual/skills/<name>.md`**, written by the ticket that builds it, and the README indexes it. The README itself carries only the flows, the install and the index; the layout and conventions live in [`manual/structure.md`](manual/structure.md).

`node scripts/validate-skills.mjs` gates all of it, plus the phase groups in `.claude-plugin/marketplace.json`. Run it before committing.
