# Implementing is one build, one review, one fix

Supersedes [0005](0005-implement-has-two-pipelines.md) and [0006](0006-three-test-layers-split-by-altitude.md).

_Amended by [0013](0013-planning-is-a-resumable-router-over-four-steps.md): the how came back as `/archie-design`, a HITL planning step writing into `spec.md`. The two-contract rule below is untouched by it._

_Amended by [0016](0016-implementing-splits-into-build-and-review-phases.md): the pipeline is unbundled — review moved out of `/archie-implement` into its own phase, `/archie-review`, and implement gained an epic mode. The two-contract rule and the two-axis review shape survive._

_Amended by [0018](0018-archie-runs-at-three-flows.md): `/archie-tdd` inherits from whatever contract it was handed, so a build can run with no Task file and no `spec.md`. The two-contract rule below holds wherever a Task exists._

`/archie-implement` ran seven to nine sub-agents per Task across design, TDD, review, two fix rounds and QA. The design and QA phases cost more context than they returned: the design was a whole sub-agent run and a file on disk restating what the Spec and the ticket already fixed, and QA stood up a browser to re-derive what the acceptance criteria already said. What is left is deliberately small enough that each skill's whole contract fits on one page. Implementing is now **build → review → one fix round → report**, three sub-agent runs.

## The pipeline

`/archie-tdd` → `/archie-code-review` (invoked inline, fanning out two axis sub-agents) → one fix round, `/archie-tdd` again with the findings, whose diff the orchestrator judges itself → one report. No design phase, no QA phase, no second review.

The fix round is the same skill as the build so that a fix is driven by a test and re-runs the gates. A bare engineer handed findings applies them, which is how untested behaviour lands in a diff that has already been reviewed.

The orchestrator records `git rev-parse HEAD` at the start, so every diff the run reviews — including the fix diff — is measured from one exact baseline.

## The contracts are the Spec and the ticket

A Task's contract is the task file and the leaf's `spec.md`. Those two are what the review judges the diff against, so a diff is never a finding for disagreeing with an ADR or a glossary entry the Spec did not carry.

The implementing skills are told what the contracts are, and nothing about what else they may read. A skill that meets a term it does not know is better off opening `CONTEXT.md` than guessing, and a rule listing the documents it must avoid puts those documents in its context anyway while half-reading as an instruction about them.

## Review is two axes, not three contracts

The three contracts collapsed to two when the design file went, and the remaining two are better run as **parallel sub-agents that never see each other's findings**: **Spec** (does the diff do what the `spec.md` and the ticket asked?) and **Standards** (repo conventions, the test rules, the Fowler smell baseline). They are reported side by side and never merged or reranked, because one ordering lets a clean Standards report bury a missing requirement.

The fan-out happens in the orchestrator's own conversation rather than in a sub-agent, since sub-agents cannot nest.

## Two test layers, and the user walks the third

Unit and integration, both owned by `/archie-tdd`, cut at the Spec's seam. **E2E is the user's**, by hand, outside the pipeline — so `/archie-tdd` reports which acceptance criteria its tests cover and the orchestrator's summary ends in a **test plan**: every criterion marked covered by a test or walk-it-by-hand, the manual ones written as steps through the running app.

## Consequences

- **A planning defect no longer halts the run.** There is no triage step and no planning-defect exit: an ambiguous criterion gets built one way and reported as a Spec finding. By the time a Task is being built it is too late to be cheap about this, and stopping the run cost more than reporting it.
- **A Task can reach `ready-for-review` with unproven criteria.** Nothing drives the app, so the test plan is the only thing standing between the pipeline and a criterion nobody checked. It is the load-bearing section of the report, not an appendix.
- **The hands-on Task moved out.** `ready-for-human` Tasks are `/archie-assist`, a separate user-callable skill, so `/archie-implement` is fully unattended and carries no branch for work that needs a person. The two labels now select a skill rather than a pipeline inside one.
- **The implementing skills carry no `references/`.** Their needs shrank to a paragraph each, so `reference/` now serves the planning skills only, and `test-layers.md` and `templates/design.md` are deleted. The test rules are stated in both `/archie-tdd` and `/archie-code-review` — duplicated meaning, accepted deliberately in exchange for three self-contained skills.
