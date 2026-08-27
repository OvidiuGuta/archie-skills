# 07 — `/architect`

**What to build:** The skill that runs an Effort's planning session. It reaches shared understanding through interviewing, records what settles, and ends by recommending either splitting into children or specifying, with the final call always the user's.

**Blocked by:** 04 — `/interview`, 05 — `/domain-modeling`, 06 — `/research` and `/prototype`.

**Status:** ready-for-agent

- [x] User-callable only (`disable-model-invocation: true`)
- [x] Invoked with a loose idea, creates a root Effort directory and its `effort.md`
- [x] Invoked with an Effort reference, opens that Effort
- [x] Before interviewing, reads `CONTEXT.md`, the ADRs touching the area, and every ancestor's `effort.md` by walking up the path
- [x] Before interviewing, explores the code that earlier siblings produced, so the current state genuinely influences the decision
- [x] Invokes `/interview` and `/domain-modeling`, and reaches for `/research` and `/prototype` when a question cannot be resolved by asking
- [x] Ends by recommending split or specify, with its reasoning: an empty frontier means specify, deferral clusters mean split into those children
- [x] The user makes the final call on going deeper, always
- [x] Splitting creates thin children: a title, one or two lines of intent, and an entry in the parent's ordered child list, and nothing else
- [x] Children can be added, deleted, reordered or further split at any time
- [x] Reordering or re-scoping an already-specified child is surfaced to the user explicitly rather than edited silently
- [x] Applies the size backstop after the split decision: specifiable but too large to build means slice it, which is mechanical and not a resolution question
- [x] Never writes `spec.md` or task files; that is `/to-spec` and `/to-tasks`
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
