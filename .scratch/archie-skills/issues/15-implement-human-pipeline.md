# 15 — `/implement`, the `ready-for-human` pipeline

**What to build:** The second pipeline in `/implement`, for a Task a human must perform: signing up for a service, provisioning access, obtaining a key. The three steps that presuppose a diff drop out, leaving guidance and verification.

**Blocked by:** 14 — `/implement`, the `ready-for-agent` pipeline.

**Status:** ready-for-review

- [x] A `ready-for-human` label selects the sequence: guide → `/qa` → report
- [x] `/software-architecture`, `/tdd` and `/code-review` do not run, and no sub-agent is spawned to no-op through them
- [x] The orchestrator derives the step-by-step instructions at guide time rather than reading them from the Task file, because instructions for third-party UIs go stale and name buttons that have moved
- [x] The Task's acceptance criteria stay outcomes, not instructions
- [x] Guides the user interactively, one step at a time, confirming progress before moving on
- [x] `/qa` then verifies what is observable about the state the user produced
- [x] Criteria that nothing observable can confirm are stated as unverified in the final summary rather than passed silently
- [x] Stops at `ready-for-review` like the agent pipeline, and never sets `done`
- [x] `README.md` documents the human pipeline alongside the agent one
