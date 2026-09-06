# The review fixes what it finds

Supersedes the fix-routing half of [0016](0016-implementing-splits-into-build-and-review-phases.md): its "no fix round inside the review" is reversed and accepted findings no longer become a Task. Amends [0010](0010-implementing-is-one-build-one-review-one-fix.md), narrowing its two-contract rule on the Spec axis. The two-axis parallel shape, the read-only orchestrator and `/archie-tdd` as the one fix path all survive.

Two complaints, one about each axis of the loop's behaviour.

## The Spec axis found problems in diffs that worked

It graded a change the user could run and watch do the right thing. Four causes compounded, and under all of them sat a missing bar: the brief said what `needs work` meant and never said what earned a finding a line at all.

- **It judged runtime behaviour from a static diff.** `/archie-to-tasks` writes acceptance criteria as observable outcomes walked against a running app. The reviewer observes nothing, so it inferred — and inference had no cost, because no finding had to name a failure.
- **The contract carried a design.** `spec.md` holds `## Implementation Decisions` and `## Testing Decisions`, drawn before the code existed, so a sane deviation read as a breach.
- **Ambiguity was minted into findings.** A criterion too vague to judge was reported as a defect, which turned a loose Spec into a red grade on correct work.
- **"Behaviour nobody asked for" caught everything.** No Spec enumerates a diff, so guards, helpers and error paths were always available to a literal reading.

The fixes are the inverses. A finding now carries a quoted contract line **and** a named failure — the path through the diff and what happens there instead. The leaf's tests are the instrument: the axis reads them and runs the suite, a criterion covered by a passing test is silence, and a criterion whose test fails is the strongest finding it can make. The design sections drop to context, reportable only where a deviation costs a user story. Ambiguity drops to a 🟠 note about the contract. Unasked-for behaviour narrows to the two harmful cases — another Task's territory, or user-visible behaviour no story asked for.

## Severity moved onto the finding

Each axis used to end on a tier and a line of justification, which let a sub-agent list three reservations and grade itself red anyway. Now every finding carries **🔴** (must land before this merges) or **🟠** (worth fixing, does not block), and the tier is derived: any 🔴 → 🔴, else any 🟠 → 🟠, else 🟢. One severity call per finding is a sharper question than one tier call per axis, and it gives the two demotions above a precise ceiling. Both briefs lost their tier paragraph in exchange for one line.

## The fix Task is gone

0016 sent accepted findings to a new Task in the leaf, picked up by the next `/archie-implement` session. That round trip is what stopped the loop converging. Round two re-resolved the diff from the merge-base and reviewed the whole branch again with no memory of round one: the fix code was fresh surface, declined findings came back, and two stochastic runs over one diff surface different subsets. The Task compounded it — findings became acceptance criteria, and `/archie-to-tasks` bans paths and code there, so the engineer received a restated complaint rather than somewhere to go.

The loop now closes in one session. The report halts whatever the grade and the user picks the findings; one `/archie-tdd` engineer is briefed with them as **exit criteria** — the complete list of what must be true for the grade to read 🟢, each entry a `file:line`, the behaviour expected there, and what proves it. Paths and code belong in that brief, which is the whole reason it is not a Task.

Then the orchestrator **verifies** read-only, holding the exit criteria, so a fresh sub-agent would only re-derive them: every accepted finding called resolved or surviving, plus the fix diff at a **blocker bar** — the secrets check and 🔴 standards breaches, nothing 🟠. A reservation the fix introduced belongs to the next review; hunting it is how one round becomes three.

## Consequences

- **One fix round, then a human.** Findings that survive the verify pass halt the run, as a second failure already halts epic mode in 0016 — a round the fix could not settle means the contract is the problem.
- **The review leaves the tree dirty**, and offers the commit, matching `/archie-implement` task mode. A 🟢 review, and a review whose findings the user declines, still leaves the tree exactly as it arrived.
- **Nothing about the review reaches disk.** No `review.md`, no fix Task: the accepted findings live in the session that acts on them, and `git log` records the fix. The leaf's `tasks/` no longer shows that a fix happened, which is right — a fix is not a tracer bullet.
- **`/archie-implement` is no longer downstream of a review.** The implement → review → fix Task → implement loop is a single review session, and the phase that follows a 🟢 grade is scoping the next Epic.
