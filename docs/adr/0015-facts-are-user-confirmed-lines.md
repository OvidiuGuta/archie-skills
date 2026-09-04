# The facts section is nine user-confirmed lines, and AGENTS.md belongs to the user

Supersedes the `unknown`-as-value and living-section parts of [`0004-setup-records-facts-in-agents-md.md`](0004-setup-records-facts-in-agents-md.md), and the harness-location and `unknown`-blocks-E2E consequences of [`0006-three-test-layers-split-by-altitude.md`](0006-three-test-layers-split-by-altitude.md).

Models infer far more from a repo than they did when 0004 was written: the harness behind an e2e command, the test prior art new specs should match, the seed practice — all of it is readable from the code, so recording it in `AGENTS.md` was a cache of a cheap lookup that goes stale. The facts shrink to what a model cannot reliably infer and skills need every run: package manager, lint, typecheck, test, test-e2e, build, run the app (command and URL, one line), branch convention, commit convention.

`unknown` is retired. A fact the repo does not settle is put to the user at setup's confirm step with two ways to answer: give the value, or remove the line. Only answered lines are written, so the block never carries a placeholder and no skill needs a placeholder's semantics explained — the section is always in context and always literal.

The living section is retired with it. `AGENTS.md` is the user's file: no skill writes to it unless the user explicitly asks. A skill that finds a fact wrong works around it and reports the discrepancy in its final message, and the user applies the fix.

Setup also creates `CLAUDE.md` when it is absent, containing a single `@AGENTS.md` import, so the facts reach agents that read `CLAUDE.md` rather than `AGENTS.md`.

## Consequences

- `/archie-design` and `/archie-tdd` discover test prior art themselves — the nearest recently-touched specs asserting real behaviour — instead of reading a prior-art line out of `AGENTS.md`.
- A removed line has no special meaning. The model infers the fact from the repo or asks at the point of use; the first ask is also where the user establishes the practice, after which it is readable from the code.
- Seed data and test credentials are no longer recorded. E2E work asks for them the first time they matter.
- Re-running setup replaces the whole delimited block, so it re-asks facts the user previously removed — the cost of a genuine stack change, which is the only reason to re-run.
