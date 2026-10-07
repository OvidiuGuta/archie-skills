# A review converges

Amends [0021](0021-the-review-fixes-what-it-finds.md): the grade is no longer derived from every finding. Amends [0023](0023-an-epic-run-ends-reviewed-and-every-criterion-is-proven.md): an Epic run ends on a second review rather than a verify pass. Amends [0020](0020-standards-md-is-the-review-control-surface.md): judgement calls stop being capped at a tier that no longer exists.

Run a review, fix, and review again, and it always found something, most often on the Standards axis. 0021 put severity on the finding and derived the tier from it, so a single 🟠 kept a PR off 🟢. A model reading the same diff again can always find one more 🟠, so a PR almost never went green after one review and one fix round, and the grade stopped meaning anything.

## Green when nothing blocks

The grade now has two tiers. **🟢 mergeable** when no 🔴 finding stands, **🔴 needs work** otherwise. A 🟠 is a **Suggestion**: still reported, never part of the grade. `mergeable with reservations` is gone.

This is how the reviewers that converge do it: only the top severity tier blocks, and a standards breach is a nit that cannot.

## A re-review remembers the last one

Every review started from the merge-base with no memory, so two stochastic passes over one diff surfaced different subsets and a line passed once could block the next time. A review of a change already reviewed now reads the previous report and holds to it: every earlier finding carried forward as resolved, still open or dismissed, in its original wording, and a new 🔴 raised only on lines changed since. The memory is the PR's whole conversation — earlier reviews, the user's comments and inline threads — or else the earlier report in the same conversation; with neither, the review runs in full. It is read as a conversation, with no anchor or numbering scheme: a comment the user added is something to fix or answer, the same as a finding, and a fixed format would only exclude it. Nothing about a review reaches disk, and posting stays the user's choice outside an Epic run, so a user who wants memory across sessions posts the report.

## An Epic run ends on a re-review

Unattended, the first round still fixes every finding that is not wrong, 🟠 included: the polish is wanted and nobody is there to pick. A second review then runs over the fixed PR, holding to the first one's report, and its grade and score are the run's final word on the PR. That is where AFK stops. A PR still 🔴 goes to the user, who picks what to fix and re-reviews after each fix, as often as they like. Run by the user, the review keeps 0021's read-only verify pass after its fix round: there the user controls every round, and a re-review is theirs to start.

## A confidence score says what green cannot

Every review ends on a **Confidence score** from 1 to 5: how safe the change is to merge. A standing 🔴 caps it at 2, so the score and the grade never disagree. Within that, it is the reviewer's judgement against five written bands, with a one-line reason. The bands name what the review could not vouch for — acceptance criteria no test covers, a skipped Spec axis, risky code touched without tests — as guidance, not as deductions. A fixed points rubric was weighed and rejected: the score exists to say what the grade cannot, and a formula over checkable gaps only restates them. The written bands and the cap are what keep the judgement from drifting.

## Consequences

- **The 🔴 bar carries the whole grade.** What a reviewer may mark 🔴 is now the load-bearing rule in both briefs. On Standards it is the secrets check, the test rules, and a clear breach of a yes-or-no rule in `STANDARDS.md`; a `— judgement calls` rule is always a Suggestion. The user's file still decides what can block.
