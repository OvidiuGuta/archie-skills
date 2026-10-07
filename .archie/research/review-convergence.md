# How AI code reviewers stay low-noise and converge on re-review

_Researched 2026-10-07. Question: how do CodeRabbit, Greptile, Graphite Diamond, Cursor Bugbot, Qodo PR-Agent and Anthropic's Claude Code review stop re-reviews after a fix round from surfacing new nitpicks?_

**Decision this feeds:** which mechanisms `archie-review` adopts so a PR graded on Spec and Standards goes green. This file reports what the tools do. Picking among them is the user's call (see "Option space" at the end).

## Short answer

None of them solves convergence with one trick. They layer five mechanisms:

1. **Severity tiers where only the top tier means "fix before merge".** Style and standards findings sit in a lower, non-blocking tier by default.
2. **A narrow default scope.** Correctness only, lines added by this PR only, nothing a linter catches, nothing pre-existing.
3. **A filter pass after finding.** Separate verifier agents, majority voting across parallel passes, or score thresholds drop low-confidence findings before they are shown.
4. **Memory of earlier findings.** The re-review is shown what it already said, what was fixed and what was dismissed. It repeats still-valid findings word for word, does not re-raise fixed or dismissed ones, and does not reword an old finding into a "new" one.
5. **Incremental scope on re-review.** Only the commits since the last review are reviewed. Anthropic documents a stronger rule: after the first review, report new Important findings only and suppress new nits.

The most direct match to the problem is in two places. Anthropic's Code Review docs name "re-review convergence" as a tuning target. PR-Agent's reviewer prompt has a `previous_findings` block with active, resolved and dismissed states.

## Per tool

### Anthropic Claude Code: managed Code Review and the `/code-review` plugin

Source: https://code.claude.com/docs/en/code-review (fetched 2026-10-07; Code Review is in research preview).

- **Tiers.** 🔴 Important: "A bug that should be fixed before merging". 🟡 Nit: "A minor issue, worth fixing but not blocking". 🟣 Pre-existing: "A bug that exists in the codebase but was not introduced by this PR".
- **Nothing blocks.** "The check run always completes with a neutral conclusion so it never blocks merging." Teams that want a gate read a machine-readable count, `{"normal": 2, "nit": 1, "pre_existing": 0}`, and gate on `normal` (the Important count) only.
- **Standards are nits by default.** Code Review "reads your repository's `CLAUDE.md` files and treats newly introduced violations as nit-level findings." It flags only *newly introduced* violations. `REVIEW.md` can raise a class to Important.
- **Default scope is correctness.** "bugs that would break production, not formatting preferences or missing test coverage."
- **Verification pass.** "a verification step checks candidates against actual code behavior to filter out false positives. The results are deduplicated, ranked by severity."
- **Re-review.** In "After every push" mode it re-runs on each push and auto-resolves threads when the flagged issue is fixed. Resolving a thread dismisses its finding. Replying does not.
- **Convergence is a documented tuning knob.** From the `REVIEW.md` guidance:
  - "**Re-review convergence**: ... A rule like 'after the first review, suppress new nits and post Important findings only' stops a one-line fix from reaching round seven on style alone."
  - "**Nit volume**: cap how many 🟡 Nit comments a single review posts. Prose and config files can be polished forever."
  - "**Verification bar**: require evidence before a class of finding is posted ... 'behavior claims need a `file:line` citation'."
  - "**Skip rules**: ... anything your CI already enforces like linting or spellcheck."
- **Local `/code-review`.** Effort trades coverage for confidence: "At `low` and `medium`, the review reports only the findings it's most confident in"; `high` to `max` "may include findings the review is less sure about". `--max-findings` caps the count.

Open-source plugin prompt: https://github.com/anthropics/claude-code/blob/main/plugins/code-review/commands/code-review.md (main, fetched 2026-10-07):
- It skips the review entirely if "Claude has already commented on this PR". This is convergence by not re-reviewing.
- 2 CLAUDE.md-compliance agents and 2 bug agents run in parallel. Then "For each issue found ... launch parallel subagents to validate the issue", and "Filter out any issues that were not validated."
- It flags only compile failures, logic that is wrong "regardless of inputs", and "Clear, unambiguous CLAUDE.md violations where you can quote the exact rule being broken". It does not flag "Code style or quality concerns" or "Subjective suggestions". "If you are not certain an issue is real, do not flag it."
- Its list of false positives includes "Pre-existing issues", "Pedantic nitpicks that a senior engineer would not flag", "Issues that a linter will catch", "General code quality concerns ... unless explicitly required in CLAUDE.md", and violations "explicitly silenced in the code".

### Qodo PR-Agent (open source)

Sources: `qodo-ai/pr-agent` on main, last commit to `docs/docs/tools/review.md` on 2026-10-06. Files: `pr_agent/settings/pr_reviewer_prompts.toml`, `pr_agent/settings/configuration.toml`, `pr_agent/settings/code_suggestions/*.toml`, `docs/docs/tools/review.md`, `docs/docs/tools/improve.mdx`.

- **Finding-state memory across reviews.** This is the most explicit convergence mechanism in any of the sources.
  - `persistent_finding_state` (default true): "persists structured review finding state across complete review runs, so findings can be resolved and reopened ... Incremental and partial reviews do not resolve absent findings."
  - `max_previous_findings_chars` (default 8000): earlier findings "are given to the model so it repeats a still-valid finding with its earlier wording instead of re-raising it reworded, and does not re-raise a resolved one unless the code reintroduces it." On GitLab, a thread resolved by a human "is given as dismissed, with its last reply".
  - Reviewer prompt, `previous_findings` block, verbatim:
    - "active": "If the issue still exists in the current code, report it again with the same issue_header and issue_content, word for word ... Leave it out if the code no longer has the issue."
    - "resolved": "Report it again only if the current code reintroduces it."
    - "dismissed": "a reviewer closed its thread without fixing it (won't fix, by design) ... Do not report it again unless the current code makes it worse."
    - "Earlier findings count toward the limit of {{ num_max_findings }} issues ... do not let an earlier finding take the place of a more serious new one."
    - "Do not report a finding that restates an earlier one in different words."
- **Hard cap.** `num_max_findings = 3` by default.
- **Scope rules in the reviewer prompt.** "focus on new code added in the PR code diff (lines starting with '+'), and only on issues introduced by this PR". "Do not flag intentional design choices or stylistic preferences unless they introduce a clear defect." "For lower-severity concerns, be certain before flagging. If you cannot confidently explain why something is a problem with a concrete scenario, do not flag it." "Only include issues you are confident about."
- **Scored self-reflection for suggestions (`/improve`).** A second "reflect" prompt scores each suggestion from 0 to 10:
  - 8-10 for "major bugs or security concerns"
  - 3-7 for "minor issues, improve code style, enhance readability"
  - 0 for "Adding docstring, type hints, or comments", "Remove unused imports or variables", "more specific exception types", and invalid suggestions
  - Caps: verification-only suggestions at most 7, error handling at most 8
  - `suggestions_score_threshold` drops anything below it. The docs warn "Values above 7-8 may clip relevant suggestions."
  - `focus_only_on_problems = true` by default: "less on style considerations like best practices, maintainability, or readability."
- **Incremental.** `/improve -i` (documented for Azure DevOps) analyzes "only changes made after the latest code-suggestions pass"; "A later run with no new changes exits without calling the model." `persistent_comment = true` edits one comment in place rather than posting a new one.

### CodeRabbit

Sources: config schema https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json (fetched 2026-10-07); docs.coderabbit.ai pages `reference/configuration`, `guides/code-review-overview`, `reference/review-commands`, `guides/learnings`, `overview/pull-request-review`.

- **Profiles** (`reviews.profile`, default `chill`): "quiet for only the most important feedback, chill for balanced feedback, assertive for more feedback (which may feel nitpicky)." Quiet "Posts only the most important comments inline and groups the other review comments in the review summary."
- **Nitpicks exist only in assertive.** Per a secondary source, "Nitpick" is a comment type shown only in Assertive mode. **Unsettled:** I could not reach the official docs page that says so.
- **Severity tiers** (code-review-overview): Critical, Major, Minor, Trivial, Info ("without requiring action"). Each comment is also tagged with one of 6 categories: Security & Privacy, Stability & Availability, Data Integrity & Integration, Functional Correctness, Performance & Scalability, Maintainability & Code Quality.
- **What blocks is separate from what is commented.** Pre-merge checks (title, description, docstrings, linked issue, and custom checks with "Deterministic pass/fail criteria") each have `mode: off | warning | error`, and the default is `warning`. "`error` requires resolution before merging". With `request_changes_workflow`, error checks can block. `request_changes_workflow` (default false) will "Automatically approve when CodeRabbit's comments are resolved, the latest commit has been reviewed, and no pre-merge checks are failing."
- **Incremental review.** `auto_incremental_review` (default true) re-runs on each push. The docs say incremental reviews "track what's new since the last review", give "Fresh insights without repeating resolved comments", and that an incremental review "takes all comments that CodeRabbit has made since its most recent full review into consideration, and generates a review of only the new changes." `@coderabbitai review` is incremental. `@coderabbitai full review` reviews "all files from scratch".
- **A hard stop on churn.** `auto_pause_after_reviewed_commits` (default 5) pauses automatic reviews after N reviewed commits.
- **Learnings.** Preferences stated in PR chat are stored in an org-level vector store, and "Every time CodeRabbit prepares to add a comment ... it loads the learnings that apply". Scope is `local`, `global` or `auto`. `approval_delay` is 0-30 days for an admin to approve or reject a learning. **Unsettled:** the docs do not say whether learnings deterministically suppress a repeated comment. They are context, not a filter.
- **Standards.** `knowledge_base.code_guidelines` is on by default and auto-reads `CLAUDE.md`, `.cursorrules`, `AGENTS.md` and similar files. `path_instructions` adds glob-scoped guidance. **Unsettled:** the docs do not say what severity guideline violations get.

### Greptile

Sources: https://greptile.com/blog/make-llms-shut-up; https://www.greptile.com/docs/how-greptile-works/nitpicks.md; https://www.greptile.com/docs/how-greptile-works/memory-and-learning.md (fetched 2026-10-07; blog undated in fetch).

- **Measured problem.** About 19% of comments were valuable, 2% incorrect, and 79% "nits": "technically accurate but unimportant to developers."
- **What failed:**
  1. Prompting. Few-shot examples "made things worse".
  2. LLM-as-judge, scoring severity 1-10 and blocking below 7. It failed because "the LLMs judgment of its own output was nearly random", and it was slow.
- **What worked: embedding filter on feedback.** Each candidate comment is embedded. It is blocked if it has high cosine similarity to 3 or more downvoted past comments, allowed if similar to 3 or more upvoted ones, and passed otherwise. **Address rate** ("percentage of Greptile's comments that devs address before merging") went from **19% to 55+% within two weeks**.
- **Learned suppression.** Whether a comment was addressed is inferred by comparing "the first and last commit of every PR". Comment types "ignored 3+ times" are suppressed. Suppressible: style and formatting, import order, non-critical docs, naming, code organization. Never suppressed: security, memory leaks, infinite loops, null dereference, missing input validation. Rules are inferred from replies ("we prefer detailed functions") and repeated human comments.
- **Unsettled:** the docs describe no strictness tiers and no specific re-review or incremental behavior.

### Cursor Bugbot

Source: https://cursor.com/blog/building-bugbot (Jon Kaplan, 2026-01-15); also reposted on forum.cursor.com.

- **Majority voting.** "running multiple bug-finding passes in parallel with shuffled diffs, then using 'majority voting' to keep only issues that showed up across several passes."
- **Further filters.** A "validator model to catch false positives". Filtering of "unwanted categories (like compiler warnings or documentation errors)".
- **Cross-run dedup.** "Dedupe against bugs posted from previous runs."
- **The biggest single gain** came from moving to an agentic loop that reasons over the diff, calls tools and decides where to dig.
- **Metric: resolution rate.** An AI judge checks at merge time which reported bugs were fixed in the final diff. It rose from ~52% to over 70% over about 40 experiments. Bugs per run rose from 0.4 to 0.7, and resolved bugs per PR from ~0.2 to ~0.5.
- Bugbot is bug-only by design. Custom rules cover things like unsafe migrations.

### Graphite Diamond / Graphite Reviewer

Sources: https://graphite.com/blog/graphite-reviewer-launch (2024-09-30); AI Engineer World's Fair 2025 talk "AI-powered entomology" (https://www.ai.engineer/talks/TswQeKftnaw-...); https://graphite.com/blog/how-graphite-uses-claude.

- **Claimed numbers.** "<3% false-positive rate across tens of thousands of code changes" at launch. "<4% downvote rate" in the 2025 talk. "96% positive feedback rate" in the Claude case study. The talk itself notes that a downvote rate does not prove a comment helped.
- **Taxonomy from 10k comments.** Bugs, accidentally committed code, performance, security, documentation mismatch, and stylistic deviation from local convention.
- **Key finding.** "A correct comment can still be unwelcome." Developers disliked automated cleanliness advice (add comments, extract functions, write tests). They valued bugs, security and performance. Scope was narrowed to the intersection of "comments that were in its capacity and that humans wanted to receive."
- **Unsettled:** I found no primary documentation of Diamond's re-review or incremental behavior or its filter mechanics.

## Cross-tool patterns, with sources

| Mechanism | Who does it | Evidence of effect |
|---|---|---|
| Only the top tier blocks; style is lower and non-blocking | Claude (Important vs Nit, check always neutral), CodeRabbit (comments separate from `error` pre-merge checks) | n/a |
| Standards violations default to nit, only newly introduced ones | Claude Code Review (CLAUDE.md → nit), plugin (only if exact rule quotable) | n/a |
| Don't flag what a linter or CI enforces | Claude plugin, REVIEW.md guidance, Bugbot (filters compiler warnings) | n/a |
| Only lines added by the PR; pre-existing tracked separately | PR-Agent, Claude (🟣 tier), plugin | n/a |
| Verify each finding with a separate agent | Claude managed and plugin, Bugbot validator | Bugbot: part of the 52→70% resolution gain |
| Majority vote across parallel shuffled passes | Bugbot | same |
| LLM self-score threshold | PR-Agent `/improve` reflect, 0-10 rubric | Greptile reports this **failed** for them ("nearly random") |
| Learned suppression from human feedback | Greptile (embeddings, 3+ votes / 3+ ignores), CodeRabbit learnings | Greptile: 19% → 55%+ address rate |
| Earlier findings fed back with active/resolved/dismissed state; repeat verbatim, never reword | PR-Agent `previous_findings`; Bugbot dedup vs previous runs; Claude auto-resolve on fix | n/a published |
| Incremental re-review of new commits only | CodeRabbit (default), PR-Agent `-i`, Claude per-push | n/a |
| After round 1, only new top-severity findings | Claude REVIEW.md "re-review convergence" rule | n/a published |
| Hard caps (findings per review, nits per review, reviewed commits) | PR-Agent `num_max_findings=3`, Claude nit cap / `--max-findings`, CodeRabbit auto-pause after 5 commits | n/a |
| Deterministic pass/fail criteria for gating checks | CodeRabbit custom pre-merge checks | n/a |

## Unsettled

- **CodeRabbit.** Whether nitpicks appear only in `assertive` (secondary source only). Whether learnings act as a hard suppressor. What severity guideline violations get.
- **Greptile and Graphite.** No primary docs on re-review or incremental behavior.
- **Numbers.** No vendor publishes a convergence metric, such as rounds-to-green or new findings per re-review round. Published metrics are address or resolution rate (Greptile, Bugbot) and false-positive or downvote rate (Graphite). All are self-reported.

## Option space for `archie-review` (not a recommendation)

| Option | What it buys | What it costs |
|---|---|---|
| A. Tier Standards findings so only quotable rule violations in added lines can block; the rest are non-blocking notes | Matches Claude and the plugin; directly targets the Standards axis | A real standards drift in a lower tier never turns the PR red |
| B. Feed previous findings back with active/resolved/dismissed state; repeat verbatim, no rewording, no re-raising dismissed ones | Matches PR-Agent; kills "same issue, new words" churn | Needs a persisted findings file per PR or Epic, plus a matching rule |
| C. Scope re-review to the fix diff and allow only new blocking findings after round 1 | Claude's documented convergence rule; guarantees termination | Can miss a real new issue elsewhere that the earlier round overlooked |
| D. Verify each finding with a separate agent, or majority-vote across N passes | Bugbot and Claude evidence of a precision gain | Multiplies token cost and time |
| E. Self-scored confidence threshold | Cheap | Greptile reports it as near random |
| F. Hard caps (max findings, max nits, max rounds) | Simple termination guarantee | Arbitrary truncation |
