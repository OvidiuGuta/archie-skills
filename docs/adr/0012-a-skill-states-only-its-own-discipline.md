# A skill states only its own discipline

`/archie-interview` was written as the skill that *enforces* the altitude gate. To do that it had to know what an Epic was, that deferrals cluster into child Epics, that a session leans **split** or **specify**, and the names of three sibling skills it handed work to. The interviewing technique underneath — one question a turn, choices with a recommendation, ask nothing you could go and find out — was a minority of the file, and none of it could be used on anything that was not an Epic.

_Amended by [0013](0013-planning-is-a-resumable-router-over-four-steps.md): the composing skill named throughout below is now `/archie-scope`. `/archie-architect` became a router and holds no discipline at all, which is this principle taken one step further._

A skill now states **only the discipline it owns**. Framework concepts live in the framework skill that composes them: `/archie-architect` loads `/archie-interview` and `/archie-domain-modeling`, so `/archie-architect` holds the Epic tree, the altitude gate and where a decision routes, while the interview holds interviewing and domain modeling holds `CONTEXT.md` and the ADR bar.

## The test

Could the composing skill supply this line? Then it is repetition, and it belongs there rather than here. That is what removed the gate, the frontier, the deferral announcement, the check-in and the cluster report from the interview in one pass.

The inverse is what a skill must keep. Nothing in `/archie-architect` says to order questions by dependency, or to end the turn on the question mark — that is technique, not framework, so it stays in the interview even though the interview is where the cuts came from.

Applied three times now: the interview lost the altitude gate, `/archie-domain-modeling` lost the `epic.md` residue that was its third destination ([0007](0007-three-durability-levels-for-decisions.md)), and `/archie-research` and `/archie-prototype` lost their dispatch sections. Each time the displaced concept landed in the skill that was already writing the file it concerned, which is the tell for where a concept belongs.

The third case adds a corollary about **audience**. Those two skills each mixed instructions to the caller ("one sub-agent, carrying four things", "keep the sub-agent's id") with instructions to the builder (the source bar, the throwaway bar), so whoever read one was being told both to dispatch and to build — and the throwaway bar depended on the caller remembering to restate it in the brief. Each skill is now written to exactly one audience, the sub-agent that does the work, and `/archie-architect` owns dispatch.

## Consequences

- **The composing skill grows.** `/archie-architect` absorbs the gate and the deferral announcement into its interview step, and the check-in and cluster read into its recommendation step. The framework's terminating mechanism is now stated in one file instead of split across two.
- **A general skill is usable on its own.** `/archie-interview` is model-invocable on "grill me" with no Epic in sight, which is also the honest test of whether the coupling is really gone.
- **This is not [0011](0011-each-skill-is-authored-self-contained.md)'s duplication cost inverted.** 0011 accepts a shared *convention* being restated in each skill that reads it. This says a *concept* belongs to exactly one skill — the one whose job it is — and the skills it composes are told nothing about it.
