# How AI review tools score a PR

_Question:_ How do AI code-review tools compute and present a PR-level confidence or merge-readiness score (Greptile, CodeRabbit, Qodo/PR-Agent, Graphite), what each level means, what drives it, whether it is per-PR or per-finding, and whether it is deterministic or a model judgement.
_Decision waiting:_ what the 1-5 score in `archie-review` means and how it is derived.
_Researched:_ 2026-10-07.

## Short answer

Every tool that exposes a PR-level number gets it from **model judgement**. None publishes a formula that maps findings to a score. The only open-source example (PR-Agent) is a single LLM output field with a one-sentence rubric. The trust signals vendors add sit around the number: a fixed meaning per level, a separate risk axis, a hidden machine-readable marker, the list of concerns behind it, and an explicit confidence qualifier.

## Greptile: "Confidence Score: N/5"

**Meaning of each level** (source: [Anatomy of a Review](https://www.greptile.com/docs/code-review/first-pr-review.md), fetched 2026-10-07):

| Score | Meaning | Action |
| - | - | - |
| 5/5 | Production ready | Merge |
| 4/5 | Minor polish needed | Merge after small fixes |
| 3/5 | Implementation issues | Address feedback first |
| 2/5 | Significant bugs | Needs rework |
| 0-1/5 | Critical problems | Major rethink needed |

- **Inputs:** "Greptile calculates this based on the severity and quantity of issues found, the complexity of changes, and how well the code aligns with your codebase patterns." The same page says "Scores are contextual. A 3/5 on a payments feature is more serious than a 3/5 on an internal script." (same source)
- **Per-finding severity is separate:** inline comments carry P0 (critical: security, data loss, crashes), P1 (high: bugs, edge cases), P2 (medium: quality, maintainability). (same source)
- **Granularity:** per PR, recomputed on every re-review. The summary comment is edited in place and its footer shows "Reviews (N)" and the last reviewed commit. (Observed in live comments, below.)
- **Deterministic or judged:** not documented. Greptile publishes no formula. "Calculates" plus "contextual" plus the inputs it lists (complexity, codebase alignment) point to a model judgement informed by the findings, not a lookup. **Unsettled:** whether any part is rule-based.
- **Separate risk axis (newer):** Greptile now gives every PR a risk level (Low / Medium / High / Critical), assigned "by reading the diff". It is based on "what the code does, not the file path": Low covers docs, tests, styling and small code changes. Medium covers ordinary business logic. High covers dependencies, build or runtime config and core shared modules. Critical covers auth, secrets, billing, DB migrations, infra/CI and public APIs. Org-level natural-language instructions can raise or lower it. (Source: [Auto-approve PRs](https://www.greptile.com/docs/code-review/auto-approve-prs.md), fetched 2026-10-07.)
- **Score and risk are independent:** auto-approve requires "a clean 5/5 Greptile review" **and** a risk level at or below the configured ceiling. (same source)

**Live presentation** (public PR comments by `greptile-apps[bot]`, fetched 2026-10-07):

- The heading is `Confidence Score: 5/5`. Next comes a risk line such as `**[Critical risk]** Database migration to fix enum column width.`, then a one-line verdict ("The PR appears safe to merge; no actionable issue was found."), then a summary and sometimes a "What we checked:" list of claims it verified. Examples: [onyx#15443](https://github.com/onyx-dot-app/onyx/pull/15443), [onyx#15615](https://github.com/onyx-dot-app/onyx/pull/15615), [opensre#6611](https://github.com/Tracer-Cloud/opensre/pull/6611).
- A 5/5 can sit beside "Critical risk", which confirms the two axes are independent.
- A machine-readable marker, `<!-- greptile_confidence_score:5 -->`, is embedded so tools can parse the score.
- At 4/5 the verdict line names the reason, e.g. "The PR is not ready to merge because sufficiently old scores can still be missing from the task log." ([superplane#8080](https://github.com/superplanehq/superplane/pull/8080)) and "appears safe to merge, with non-blocking tooltip usability regressions worth addressing." ([langfuse#18180](https://github.com/langfuse/langfuse/pull/18180)). Note that the first 4/5 says "not ready to merge", which does not match the docs' "Merge after small fixes". The wording is generated, not templated.
- Search hits for "2/5" and "3/5" later showed 4/5 or 5/5 on the same PRs, so the score moves up as fixes land. I could not capture a live 0-3/5 body.

**Used as a loop target:** Greptile's own `greploop` skill iterates "until Greptile gives it a 5/5 confidence score with zero unresolved comments". It parses `N/5` from the most recently updated summary. ([greptileai/skills greploop/SKILL.md](https://github.com/greptileai/skills/blob/646e2dfad81e5157e97daecc802b68d3d2c4d1e4/greploop/SKILL.md), commit 646e2df.) Its exit condition pairs the score with a count of unresolved findings, so it does not rely on the score alone.

## Qodo / PR-Agent (open source)

Source: `pr_agent/settings/pr_reviewer_prompts.toml` and `configuration.toml` at [qodo-ai/pr-agent](https://github.com/qodo-ai/pr-agent) HEAD `821c6ad`, fetched 2026-10-07.

All of these are **fields in the LLM's structured (YAML/Pydantic) output**. Code only clamps and renders them.

- `estimated_effort_to_review_[1-5]` (on by default, `require_estimate_effort_to_review=true`): "Estimate, on a scale of 1-5 (inclusive), the time and effort required to review this PR by an experienced and knowledgeable developer. 1 means short and easy review, 5 means long and hard review. Take into account the size, complexity, quality, and the needed changes of the PR code diff." This measures **reviewer effort, not quality or readiness**. Rendering (`pr_agent/algo/utils.py`) clamps to 1-5 and draws `3 🔵🔵🔵⚪⚪`. It also feeds an optional effort label (`enable_review_labels_effort=true`).
- `score` 0-100 (off by default, `require_score_review=false`): "0 means the worst possible PR code, and 100 means PR code of the highest quality, without any bugs or performance issues, that is ready to be merged immediately and run in production at scale." No rubric for the middle of the scale.
- `risk_level` low/medium/high (off by default): "high only when the PR introduces a clear bug, security concern, or major logic risk… medium when… not clearly broken but contains non-trivial areas that require careful human verification… low when the PR is small, low-impact, and no important issues are identified."
- `merge_recommendation` safe_to_merge / merge_with_caution / changes_required (off by default): "changes_required when there are clear issues that should be fixed before merge… merge_with_caution when the PR seems acceptable but still deserves focused reviewer attention… safe_to_merge when no important blockers or risks are identified."
- `relevant_tests` Yes/No (on by default): "Does this PR have relevant tests added or updated?"
- `ticket_compliance_check` (when a ticket is linked): lists fully compliant requirements, not compliant requirements, and `requires_further_human_verification`. Each requirement is sorted into one of these three groups. There is no number.
- Finding-level confidence: `key_issues_to_review` says "Only include issues you are confident about. If confidence is limited but the potential impact is high… include it only if you explicitly note what remains uncertain."
- **Per-finding score (code suggestions tool):** a second "reflection" LLM pass gives each suggestion 0-10: 0 if wrong, 8-10 for major bugs or security, 3-7 for minor or style issues, with caps (≤7 for "verify/ensure" suggestions, ≤8 for error handling). (`pr_agent/settings/code_suggestions/pr_code_suggestions_reflect_prompts.toml`.) Code then **buckets it deterministically**: ≥9 High, ≥7 Medium, else Low (`new_score_mechanism_th_high=9`, `_th_medium=7` in `pr_code_suggestions.py`). If reflection fails, it falls back to a fixed score of 7.

So in PR-Agent, every PR-level number is a single model judgement guided by a rubric. The only deterministic step is turning a model's 0-10 into High/Medium/Low.

## CodeRabbit

- **Estimated review effort 1-5** in the walkthrough comment: "A score from 1 (trivial) to 5 (very complex) estimating how much effort the PR requires to review thoroughly. The estimate considers the number of files changed, the nature of the changes, and logic complexity." On by default (`estimate_code_review_effort`). Like PR-Agent's, this measures effort, not quality. ([Walkthroughs](https://docs.coderabbit.ai/pr-reviews/walkthroughs.md), fetched 2026-10-07.)
- **Merge readiness** (Change Stack, preview): "a score placed in a band, a confidence figure for that band, and the individual concerns that drove it." The bands are Ready, Caution ("score warrants caution"), Risky ("material risk") and Blocked ("readiness blockers remain"). The confidence is high, medium or low and "qualifies the claim rather than the change": a low-confidence Ready "says the assessment could not see enough to say much at all". **Drivers** are the concerns behind the score. Each has a severity (critical/major/minor) and a status (open, addressed, superseded, not relevant) that is tracked across review runs. Merge readiness is kept explicitly separate from provider mergeability. ([Understand findings](https://docs.coderabbit.ai/change-stack/findings.md), fetched 2026-10-07.) The docs do not give the underlying score's range or formula. **Unsettled.**
- **Per-finding labels** on four independent axes: type (nitpick / potential issue / refactor), severity (critical, major, minor, trivial, plus info and none), category (six areas) and effort-vs-reward. "They are four separate axes, not one severity ladder." (same source)
- **Pre-merge checks:** each check is pass/fail, or a non-blocking "indeterminate" when it "could not confidently analyze enough". The mode is off, warning or error, and error blocks the merge via the request-changes workflow. Docstring coverage is a measured threshold (80% default). Custom checks are natural-language rules judged by AI. Linked-issue assessment returns Addressed / Not addressed / Unclear. ([Pre-Merge Checks](https://docs.coderabbit.ai/pr-reviews/pre-merge-checks.md), [PR validation](https://docs.coderabbit.ai/issues/pr-validation.md), fetched 2026-10-07.)

## Graphite (Graphite Agent, formerly Diamond)

The docs ([AI Reviews](https://graphite.com/docs/ai-reviews.md), [Review comments](https://graphite.com/docs/ai-review-comments.md), fetched 2026-10-07) describe only inline comments by category (logic bugs, edge cases, security, performance, accidentally committed code), an AI-review status (Running / Completed / Not running), and an org dashboard (issues found and accepted, acceptance rate, downvote rate). **Graphite's docs describe no PR-level confidence or readiness score.**

## Patterns across tools (facts, not a recommendation)

1. **Two different "1-5"s exist.** Greptile's 1-5 is readiness/confidence (5 = merge). CodeRabbit's and PR-Agent's 1-5 is review effort (5 = hardest). The direction of the scale is opposite, so the label must say which one it is.
2. **Readiness and risk are split** by Greptile (score vs. Low-Critical risk), PR-Agent (`risk_level` vs. `merge_recommendation`) and CodeRabbit (band vs. driver severity). A risky change can still score 5/5.
3. **The number is always explained.** Greptile adds a verdict sentence and "What we checked". CodeRabbit lists drivers with status. PR-Agent lists key issues, tests yes/no and ticket compliance.
4. **Uncertainty is shown, not hidden.** CodeRabbit has a confidence qualifier and indeterminate checks. PR-Agent has "requires further human verification" and an uncertainty note on findings.
5. **No vendor documents a deterministic findings-to-score formula.** The only deterministic parts found are threshold bucketing (PR-Agent suggestion scores, CodeRabbit docstring coverage) and gating rules (Greptile auto-approve = 5/5 AND risk ≤ ceiling; greploop = 5/5 AND zero unresolved).

## Options for archie-review (the choice is the user's)

- **A. Derived from findings by a fixed rule** (e.g. any blocking Spec gap → ≤2, only minor Standards nits → 4). Reproducible and checkable, but blind to context the findings miss. No surveyed vendor does this for the headline number.
- **B. Model judgement against a fixed per-level rubric** (Greptile / PR-Agent style). Captures context and risk, but can drift between runs and contradict its own rubric (see superplane#8080).
- **C. Rule-based ceiling plus judgement within it.** The findings cap the score and the model can only score lower, never higher. This combines A's guarantees with B's nuance. It is not documented by any surveyed vendor. It is a hybrid of the gating patterns in point 5.
Whichever is chosen, every tool surveyed shows the drivers next to the number. Several also add a separate risk axis and an explicit uncertainty qualifier.

## Unsettled

- Greptile's exact derivation (model only, or partly rule-based) is not published. The docs say "calculates" from listed inputs and nothing more.
- CodeRabbit's merge-readiness score range and how bands are cut are not documented. The feature is in preview.
- Qodo's commercial product (Qodo Merge) may differ from open-source PR-Agent. Only the OSS prompts were read.
- No live Greptile 0-3/5 comment body was captured. Their wording is known only from the docs table.
