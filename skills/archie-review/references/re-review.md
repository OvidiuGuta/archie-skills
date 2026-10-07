# Re-review brief

This change was reviewed before, and you hold to that review. Your dispatch names the **memory** — a PR number, or the earlier report as text — and the **since diff**: the lines changed after that review saw the change.

## Read the memory

On PR `N`, read the whole conversation, not only the last report:

- `gh pr view N --comments` — earlier review reports and the user's general comments;
- `gh api repos/{owner}/{repo}/pulls/N/comments` — the inline review threads, replies included.

Handed the earlier report instead, that report is the whole memory.

## Hold to it

- **Carry forward every earlier finding on your axis** — tagged with it, or about what your axis grades — in its original wording, each marked **resolved** (the since diff fixed it), **still open** (the line still does what the finding names), or **dismissed** (the user, or the earlier review's own triage, set it aside — give their reason). A still-open finding keeps its severity.
- **Raise a new 🔴 only on a line in the since diff.** Code the earlier review saw and passed is settled: a new problem there is at most a 🟠.
- **A user's comment is part of the contract.** Where it asks for a change on your axis, report it as a finding of yours, citing the comment.

Report the carried-forward findings below your own, in this form:

```md
- {finding, in its original wording} — resolved | still open | dismissed: {why}
```
