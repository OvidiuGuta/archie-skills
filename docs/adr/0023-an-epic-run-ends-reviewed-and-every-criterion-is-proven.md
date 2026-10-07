# An Epic run ends reviewed, and every criterion is proven

_Amended by [0025](0025-a-pr-is-written-by-one-skill.md): the draft PR is opened by `/archie-pr`, and its body is rewritten after every fix round._

_Amended by [0024](0024-a-review-converges.md): the unattended run no longer ends on a verify pass and a Fixed, Surviving and Dropped comment. After the fix round a full second review runs, holding to the first comment, and its grade alone marks the PR ready._

Amends [0016](0016-implementing-splits-into-build-and-review-phases.md): for an Epic, review is no longer a separate session. Amends [0021](0021-the-review-fixes-what-it-finds.md): an unattended review triages its own findings. Amends [0010](0010-implementing-is-one-build-one-review-one-fix.md): driving the app comes back, narrowly.

Two complaints about epic mode.

## The review session was a hand-off nobody needed

Every Epic run ended by offering a PR and naming `/archie-review` for a new session. That session always ran next, and its only human step was picking findings. Most of the time the pick was "all of them".

An Epic run now opens a **draft PR** and invokes `/archie-review` inline, briefed **unattended**. The review posts its report as a PR comment, then **triages** where the user used to pick: a finding is dropped only when it is **wrong** (its quoted line does not say what it claims, its failure cannot happen, or no contract asks for it), and everything else, 🔴 and 🟠, goes to the one fix round. The fix is committed and pushed, and a second comment carries the re-grade with **Fixed**, **Surviving** and **Dropped**, each drop with its reason. A 🟢 grade marks the PR ready. Anything else leaves it a draft, which is the signal that it needs the user.

The review stays the single owner of grading, fixing and verifying: unattended is a branch inside it, not a copy in implement. Sub-agents cannot nest, which is why it runs inline. Implement fans out the axes from its own conversation.

## "Looks fine" was the criteria check

After each Task the orchestrator read the diff and nearly always committed. Nothing showed what it had checked.

Every criteria check now ends on a `## Proof` section in the Task's body, written by the orchestrator, one entry per criterion: the test that asserts it, or the `file:line` that makes it hold and why. A box is ticked only once its entry exists. These entries carry paths, which `/archie-to-tasks` otherwise bans. They are allowed because the proof commits with the code it describes, so it cannot go stale.

Criteria no test reaches are also **driven in the running app** when the session carries a browser or device tool and AGENTS.md records how to run the app, with screenshots in the conversation. 0010 removed QA because standing up a browser to re-derive every criterion cost more than it returned. This drives only the criteria no test reaches, which are the ones the user would otherwise walk unseen. The walkthrough keeps all of them, each marked driven or not driven, because it is the user's own way to test.

Both apply in task mode too, where the implementer checks code it wrote itself.

## Consequences

- **`/archie-review` has a caller.** It stays a user door, and its description names `/archie-implement` as the one skill that runs it.
- **The Implementing install needs Reviewing** for epic mode, and epic mode gates up front on an `origin` remote and an authenticated `gh`.
- **An Epic run publishes.** It pushes the branch and opens a PR without asking, because starting the run on a branch is the user's go-ahead. The PR stays a draft until the review grades it 🟢.
- **Context grows** with the review and the screenshots in one conversation. That is accepted, because the proof is meant to be seen.
