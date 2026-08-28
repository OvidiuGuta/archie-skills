# The `AGENTS.md` facts section

What varies per repo is **facts**, not conventions: the commands and locations an agent cannot guess. They live in a delimited section of `AGENTS.md`, which is already in every agent's context, so no skill needs a file to go and read.

`/archie-setup` seeds the section. Any skill that later discovers a fact has changed, or creates a gate itself, writes the correction back — `/archie-implement`'s orchestrator runs the gates every run, so it is the natural healing point.

## Delimiters

The section is everything between these two markers, and nothing outside them is touched:

```md
<!-- archie:facts:start -->
<!-- archie:facts:end -->
```

Rewrite the section by replacing the whole block between the markers, so hand-written content in `AGENTS.md` survives untouched. No markers means the section does not exist yet: append it at the end of `AGENTS.md`, creating the file if the repo has none.

## Facts

```md
<!-- archie:facts:start -->
## Project facts

- **Package manager:** pnpm
- **Lint:** `pnpm lint`
- **Typecheck:** `pnpm typecheck`
- **Test:** `pnpm test`
- **Build:** `pnpm build`
- **Run the app:** `pnpm dev`, served on http://localhost:4200
- **E2E harness:** Playwright, specs in `apps/web-e2e/src/`
- **Unit test prior art:** `libs/scheduling/src/lib/shift.service.spec.ts`
- **Integration test prior art:** `apps/api-e2e/src/api/shift.spec.ts`
- **Seed data and test credentials:** unknown
- **Branch convention:** `feat/<slug>` off `main`
- **Commit convention:** conventional commits, e.g. `feat(ui): users can change their avatar`
<!-- archie:facts:end -->
```

One line per fact, each command written exactly as it is run. Prior art points at real files whose style new tests should match.

## No section at all is different from `unknown`

Absent markers mean `/archie-setup` has never run in this repo, which is a different situation from a fact it could not settle. Say so and name the skill — "no facts section in `AGENTS.md`; run `/archie-setup` first" — rather than exploring the repo to reconstruct the gates yourself. Archie ships in two installable phases and Implementing can be installed without Setup, so this is a real state a skill will meet, not a defensive check.

## `unknown` is a value

A fact exploration cannot settle is recorded as the word `unknown`, rather than guessed at. There is no greenfield mode: every repo takes one code path, and a fresh one simply records more `unknown`s.

`unknown` is a signal to act on:

- `/archie-qa` reading an unknown run command asks the user rather than trying `npm start`.
- `/archie-qa` blocks E2E on unknown seed data or credentials, and reports the affected criteria as unverified.
- `/archie-tdd` reading an unknown gate command asks for it, then writes the answer back into the section.
- A skill that creates a gate the repo lacked replaces the `unknown` with the command it added, in the same run.

On a greenfield repo the stack is not chosen yet, and choosing it is cross-cutting and hard to reverse. It belongs to the root Epic's Architect session and lands as an ADR, not as a setup output.
