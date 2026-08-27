# 08 — `/to-spec`

**What to build:** The skill that turns a finished architect session into the Effort's `spec.md`, and that fixes the integration seams. This is the last human checkpoint before testability is baked in, because everything after it is AFK.

**Blocked by:** 01 — Conventions and templates, 07 — `/architect`.

**Status:** ready-for-review

- [x] User-callable only (`disable-model-invocation: true`)
- [x] Synthesises the conversation already in context and does not re-interview the user
- [x] Proposes the integration seams, preferring existing seams, sitting as high as possible, and using as few as possible
- [x] Confirms the seams with the user before writing the spec
- [x] Writes `spec.md` inside the Specified Effort's own directory
- [x] The spec carries an explicit reference to its Effort, so a sub-agent handed it as bare text knows what it belongs to
- [x] Uses the glossary's vocabulary throughout, respects the ADRs in the area, and surfaces any contradiction rather than silently overriding
- [x] Refuses to run against a Split Effort, since Split and Specified are mutually exclusive
- [x] Avoids file paths and code, except a snippet from a prototype that encodes a decision more precisely than prose
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
