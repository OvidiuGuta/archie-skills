# 02 — Structural validator gate

**What to build:** A single script that validates the skill bundle's structure and is runnable as a gate. Thirteen skills cross-referencing each other and a shared reference set is exactly the structure where links rot silently, and the failure only shows up later as a skill quietly skipping a step.

**Blocked by:** 01 — Conventions and templates.

**Status:** ready-for-agent

- [ ] Runnable from the repo root, exits non-zero on any failure, and prints one message per failure naming the file and the problem
- [ ] Every `SKILL.md` has frontmatter with a `name` and a `description`
- [ ] Every skill's `name` matches its directory name
- [ ] Exactly the five entry skills carry `disable-model-invocation: true`, and none of the eight sub-skills do
- [ ] Every `/skill-name` referenced in any skill body resolves to a skill present in the bundle
- [ ] Every relative link in any skill body resolves to a file that exists
- [ ] Every shared reference file is pointed at by at least one skill
- [ ] Every skill has an `agents/openai.yaml` carrying a `display_name` and a `short_description`
- [ ] Every skill in the bundle is documented in `README.md`
- [ ] The validator passes against the bundle as it stands when this ticket completes
- [ ] `README.md` documents how to run the validator
