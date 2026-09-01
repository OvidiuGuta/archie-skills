# /archie-implement takes one task and runs one of two pipelines

**Superseded by [0010](0010-implementing-is-one-build-one-review-one-fix.md).** The design and QA phases are gone, the fix rounds are one, and the `ready-for-human` pipeline moved out into `/archie-assist`.

`/archie-implement` is invoked by the user on a **single task** (`3.2#1` or its path), not on an Epic or a subtree. Running a whole leaf's task list is deferred to a future `/archie-implement-epic` skill that loops this one; the single-task flow is already AFK enough because it designs, implements, reviews and QAs by itself.

The orchestrator never writes feature code. It reads the task and its spec, then runs the pipeline its label selects.

## ready-for-agent

`/archie-software-architecture` (read-only sub-agent, writes `tasks/NN-<slug>.design.md`) → `/archie-tdd` engineer sub-agent → `/archie-code-review` sub-agent → up to **two** engineer fix rounds → `/archie-qa` sub-agent → up to **one** engineer fix round → report. Seven to nine sub-agent runs, bounded and predictable.

The orchestrator triages every finding before acting on it. A code defect goes back to the engineer. A finding that is really a *planning* defect, an ambiguous or wrong acceptance criterion, or a criterion contradicting the spec, halts the run and surfaces to the user, because no amount of engineering resolves it. After a QA fix, code review does not re-run; the fix diff is small and the orchestrator judges it directly, having not written it.

## ready-for-human

Guide → `/archie-qa` → report. The three steps that presuppose a diff drop out. The orchestrator derives the step-by-step instructions **at guide time** rather than reading them from the task file, because instructions for third-party UIs go stale and a task written weeks ago names buttons that have moved. The task's acceptance criteria stay outcomes, not instructions.

`/archie-qa` then verifies what is observable: an env var is present, a key authenticates, an account exists. Criteria nothing observable can confirm are reported as **unverified** in the final summary rather than passed silently.

## Consequences

- `/archie-implement` never marks a task `done`. It stops at `ready-for-review`, and the user makes the last move, so the AFK phase never declares its own work finished.
- The design is a file, not a context handoff, so the orchestrator never holds it, the reviewer can check the code against the design it claims to follow, and designs compound within a leaf: task 2's architect reads what task 1 intended, which the code alone does not say.
- Every `ready-for-agent` task must cut a complete path to observable behaviour, because QA against the running app is the enforcement mechanism. A task delivering only a schema change has no criteria QA can check.
