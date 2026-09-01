---
name: archie-interview
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan, get grilled on their design, or mentions "interview me" or "grill me".
---

# Interview

Interview the user relentlessly about every aspect of the plan until you reach a shared understanding.

Work down the **design tree**: every decision branches into the decisions that hang off it. A question whose answer depends on one you have not asked yet comes later — resolve the dependencies between decisions one at a time, so no answer arrives built on a guess.

**One question per turn**, numbered from `Q1` and running unbroken through the session. Lay the plausible answers out as lettered choices, then recommend one underneath, so the user can answer with a letter:

```md
❓ **Q{n}** - **{Short label}**: {the question, in the project's language.}

- **A. {A live choice.}** {Its consequence, in one line.}
- **B. {A live choice.}** {Its consequence, in one line.}

➡️ **{letter}** — {the one line that would change the user's mind if they disagree.}
```

Every question ends on that recommendation, which is what makes agreeing cheap and disagreeing informed. Give every choice its own line of consequence, so the letters are a real comparison rather than a menu with one live item. Two or three choices is the range; a fourth added to round out the list is noise.

Some answers do not enumerate — a name, a number, a boundary you want in the user's own words. Ask those open, with the same recommendation and no list above it:

```md
❓ **Q{n}** - **{Short label}**: {the question.}

➡️ {the answer you would pick} — {why, in one line.}
```

**End the turn on the question mark.** A recommendation is a proposal awaiting the user's word — decisions are theirs, and an unanswered question is still open. Batching a second question into the turn costs the user the thing this skill exists for: room to think about one thing.

## Never ask for something you could find out

If a question can be answered by exploring the codebase, explore the codebase instead of asking.

A question that needs facts you would have to go and read, or an artifact the user has to see before they can react to it, is not an interview question either — hand it back rather than putting it to the user as a decision.

## Do not act on it

The interview produces shared understanding, not changes. Do not start building on your own recommendations until the user has confirmed you have reached it.
