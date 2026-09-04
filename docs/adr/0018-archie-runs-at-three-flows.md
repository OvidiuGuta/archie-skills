# Archie runs at three flows

Amends [0010](0010-implementing-is-one-build-one-review-one-fix.md)'s two-contract rule.

The bundle was written as one way of working, and all fifteen skills assumed the whole of it. That makes the framework all-or-nothing: a one-off css change had to enter through `/archie-architect` and come out the far end of a planning tree, or skip Archie entirely. There is value at lower depths, so Archie now names three **Flows** — lite, medium and full — and the same install runs any of them.

Only one thing had to change to make that true. `/archie-tdd` resolved everything from a Task reference under `.archie/` and took its seam from the leaf's `spec.md`, so with no tree it had no contract, no seam and no criteria. It now inherits from **whatever contract it was handed**: a Task reference, findings from a review, or the change itself — a prompt, or the shared understanding an interview closed on in the same session. 0010's rule that a Task's contract is the task file and the leaf's `spec.md` still holds wherever a Task exists; it is no longer the only way in.

Three decisions follow from the third case rather than from the flows:

- **The criteria are restated and confirmed before the outer loop goes red.** They are the whole contract in that mode, and in full flow a human had already signed them off — the checkpoint is being restored where it went missing, not added.
- **A missing outer loop is reported absent.** Absent has to be nameable — no integration harness in the repo, or a change whose whole effect is what a screen looks like — so the escape cannot be reached by finding the seam inconvenient. This is how step 5 already treats a gate the repo does not have.
- **The Spec review axis stays off without an Epic.** It exists to catch a diff drifting from a contract a human signed weeks ago; in lite and medium the person who agreed the criteria is the one reading the report.

## Consequences

- **A Flow is documentation, not an install group.** The phase groups in `marketplace.json` are unchanged, because no flow is a phase: lite needs `archie-interview` from Planning and `archie-tdd` from Implementing. Whether a repo is running lite or full is not readable from disk and is not meant to be.
- **`/archie-tdd` is a door, not only a step.** Its description leads with the general capability so a "build this test-first" prompt reaches it, since lite has no router to fire it.
- **Nothing keeps the flows apart inside one repo.** A lite chore on an in-flight Epic branch shows up in that Epic's Spec axis as behaviour nobody asked for. Accepted: the finding is cheap and the user knows what they did.
