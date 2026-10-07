# Trustworthy review

**Status:** ready-for-review

Make `/archie-review` converge, so a PR can go green after one review and one fix round, and end every review on a 1-5 Confidence score of how safe the change is to merge. The shape is ADR-0024.

## Decisions

- Every 🔴 finding is confirmed by an independent check before it is reported; Suggestions are not checked.
- The Confidence score is information only: an unattended run marks the PR ready on 🟢 alone.

## Research

- `research/review-convergence.md` — how review tools keep re-reviews quiet
- `research/confidence-score.md` — how review tools score a PR
