# A PR is written by one skill

Amends [0023](0023-an-epic-run-ends-reviewed-and-every-criterion-is-proven.md): an Epic run no longer writes its own PR body.

An Epic run opened its PR with the summary paragraph as the body, and the review's fix round then changed the code under it. A reviewer read a body that described neither the change's shape nor the proof behind it.

`/archie-pr` now writes every PR's title and body to one template — **Summary**, **Evidence**, **Merge Danger** — and opens or refreshes the PR. `/archie-implement` dispatches it to open the draft, and `/archie-review` dispatches it after every fix round, unattended or not, so the body always matches the diff being approved. A refresh rewrites the body whole.

## Consequences

- **It is model-invoked, but scoped to repos set up for Archie** — an `AGENTS.md` with `## Project facts`, or an `.archie/` folder. Running `/archie-setup` is the user's word that Archie's conventions apply there, and every other repo keeps its own PR style.
- **Screenshots live with the tree.** In Archie they are Assets on the Task they prove; on files they are committed into the leaf's `.archie/` directory and merge with it. An ad-hoc PR has no leaf to hold them, so its evidence is test runs alone.
- **Draft or ready stays with the caller**, because readiness is a review outcome. Rebasing stays with the user.
