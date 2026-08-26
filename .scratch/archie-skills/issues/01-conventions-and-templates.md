# 01 — Conventions and templates

**What to build:** The shared reference set that ships inside the Archie skill bundle and that every skill points at instead of restating. These conventions are fixed by the framework, not configured per repo, so one copy exists and thirteen skills cannot drift from each other.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] A reference file documents the Effort tree: nested directories under `.scratch/`, one directory per Effort, holding `effort.md`, plus `spec.md` and `tasks/` at a leaf
- [ ] Identity numbering is documented: assigned per parent on creation, never renumbered, gaps never backfilled, and build order living in the parent's ordered child list rather than in the numbers
- [ ] Reference syntax is documented: Efforts as `3.2`, Tasks as `3.2#1`, with the reason the separators differ
- [ ] Split and Specified are documented as mutually exclusive, with an Effort's structural state derived from its files (no children and no spec is thin, children is split, a spec is specified)
- [ ] The four task statuses (`todo`, `in-progress`, `ready-for-review`, `done`) and two labels (`ready-for-agent`, `ready-for-human`) are documented, with statuses stored only on Tasks and Effort progress derived from the subtree
- [ ] The `AGENTS.md` facts section format is documented: delimited so it can be rewritten precisely, with `unknown` as a first-class value that skills must act on rather than guess past
- [ ] Templates exist for `effort.md`, `spec.md`, a task file, and `design.md`
- [ ] The CONTEXT format and ADR format are documented, including the unchanged three-part ADR bar, amend-on-sharpening versus supersede-on-reversal, and the three durability levels for decisions
- [ ] The altitude test is stated once, in a form the other skills reference rather than restate
- [ ] `README.md` documents the conventions and where the reference files live
