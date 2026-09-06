# `STANDARDS.md` is the review's control surface

Supersedes the baseline half of the Standards review brief established in [0010](0010-implementing-is-one-build-one-review-one-fix.md), and extends the fourth durability level of [0007](0007-four-durability-levels-for-decisions.md) from a list beside the review into the review's rule set.

`skills/archie-review/references/standards-review.md` carried three rule sets that held "even in a repo that documents nothing": the test rules, five hard checks, and twelve Fowler smells. Only the reviewer ever read that file. `/archie-tdd` and `/archie-verify` build against `STANDARDS.md` and the house style, so an escape hatch with no justifying comment or a swallowed error was invisible while it was being written and blocking once it was reviewed — a round trip through the whole implement → review → fix Task loop for a rule the engineer would have followed had it known it.

Two fixes were open. Copy the rules into the engineer skills, as [0011](0011-each-skill-is-authored-self-contained.md) requires — three hand-maintained copies of one list. Or move them into the one file both sides already read.

## The rules live in the repo

`/archie-setup` sends `/archie-standards` to seed `STANDARDS.md` from `references/BASELINE.md`: the four hard checks as yes-or-no rules, and the twelve smells as one-line fix imperatives. `/archie-standards` stays the file's only writer, so setup gains a dispatch rather than a second owner.

The reviewer's copies go. What remains in the brief is what a repo cannot opt out of — the **secrets** check, already the one thing no standard could override, and the **test rules**, which are the method the engineer skills run rather than rules about how code is written.

This removes a duplication rather than adding one. One list, in the repo, read by the builder before it writes and by the reviewer after.

## Deleted means unchecked

The seeded rules land with no marker and no origin comment, indistinguishable from the user's own, and `/archie-standards`' existing "freely edited, at the user's request" applies to them from the moment they land. A rule the user deletes is a rule the review stops checking.

That is the point, not a leak. A reviewer holding a private list the user can neither see nor edit is a black box; the brief's old promise to hold in a repo that documents nothing was that black box written down. It is retired. Only the secrets check survives it.

## Judgement calls need a marker in the file

The smells are judgement calls, capped by the brief at `mergeable with reservations` and quoted rather than reported as breaches. Flattened into ordinary bullets they would be graded as broken standards, which would make first-review-green worse than before the move.

The marker is the heading: a `STANDARDS.md` heading ending `— judgement calls` carries one framing line, and the reviewer reads the suffix. This gives `STANDARDS.md`'s "write the rule, not the wish" a second tier, reached only where sharpening a rule into a yes-or-no has genuinely failed.

## The seam rule was already wrong

The brief's first test rule read "one integration test, at the Spec's seam" — written before [0019](0019-integration-is-one-closing-task-per-leaf.md) pooled integration into a closing Task that writes one test per user story. The Standards axis is dispatched with the diff and the standards files and never the task files, so it cannot read an `Integration:` line and cannot tell a correctly-deferred Task from one that skipped its seam test. Reviewing a mid-leaf branch, it flagged every tracer bullet.

The rule splits along what each axis can see. **Standards** keeps placement: a seam test parked somewhere more convenient is a finding, and a diff with no seam test is not its call. **Spec** takes presence: it holds the task files, so it reads the `Integration:` line and knows what this diff owed.

## Consequences

- **`STANDARDS.md` now exists in every repo from setup, and rides in every session's context** through the `AGENTS.md` link, for every agent, Archie or not. Around seventeen bullets of always-loaded cost, paid so the builder and the reviewer share one rule set. That is the price of the control.
- **"The first standard creates the plumbing" is untouched.** The seed *is* the first standard, so it creates the file and the link through the rule already written. A repo with no standards still carries no empty file.
- **Seeding is a one-time write, not a sync.** Editing `BASELINE.md` in this bundle changes what new repos get and never reaches a repo already seeded. A user on an older repo asks `/archie-standards` to seed.
- **The bundle no longer ships an opinion it enforces.** It ships one it offers, once, and the repo owns it afterwards.
