---
name: archie-interview
description: Interviewing — one question a turn, gated by the altitude test, with deferrals clustering into child Efforts. Reached by /archie-architect while scoping an Effort.
---

# Interview

The discipline an Architect session reaches understanding through. One question a turn, each carrying your recommended answer, and each one gated by the altitude test before it is asked.

Read [`references/altitude.md`](./references/altitude.md) first. It fixes the gate this skill enforces and names the exit a hard question takes.

## The frontier

The **frontier** is the set of at-altitude questions still open on this Effort. It is the session's whole state, and the session ends when it is empty.

Fill it before asking anything: name every question this Effort raises — from the intent in `effort.md`, the inherited decisions, and the code the earlier siblings produced — and put each one through the gate. Answers open new questions, so the frontier keeps refilling; every newcomer takes the gate before it joins.

Done when no question you can currently name is unsorted: each is on the frontier or has been announced as deferred.

## The gate

> **Does this answer's blast radius reach beyond one part of this Effort?**

**The gate is enforced, not advisory.** A question that fails it is deferred the moment it occurs to you, never asked because the conversation happened to be nearby. Asking below altitude is how a session about a whole application ends up specifying one screen's layout, which is the waterfall Archie exists to replace.

Announce each deferral in one line, in the turn it happens, so the user watches the child list assemble:

```md
_Deferred:_ how the reset email is templated.
```

The user overrules the gate continuously. When they name a deferred question, it returns to the frontier and gets asked next, with no argument and no re-litigating the altitude.

## Asking

One question per turn, numbered from `Q1` and running unbroken through the session. Lay the plausible answers out as lettered choices, then recommend one underneath, so the user can answer with a letter:

```md
**Q{n}.** {The question, in the project's language.}

- **A. {A live choice.}** {Its consequence, in one line.}
- **B. {A live choice.}** {Its consequence, in one line.}
- **C. {A live choice.}** {Its consequence, in one line.}

_Recommend:_ {letter} — {the one line that would change the user's mind if they disagree.}
```

Every question ends on that recommendation line, which is what makes agreeing cheap and disagreeing informed. Give every choice its own line of consequence, so the letters are a real comparison rather than a menu with one live item. Two or three choices is the range; a fourth added to round out the list is noise.

Some answers do not enumerate — a name, a number, a boundary you want in the user's own words. Ask those open, with the same recommendation line and no list above it:

```md
**Q{n}.** {The question.}

_Recommend:_ {the answer you would pick} — {why, in one line.}
```

**End the turn on the question mark.** A recommendation is a proposal awaiting the user's word — decisions are theirs, and an unanswered question is still open. Batching a second question into the turn costs the user the thing this skill exists for: room to think about one thing.

When the answer lands, record it before asking the next question — [`references/decisions.md`](./references/decisions.md) settles where it goes. The Effort tree is disposable, so a decision left in the conversation goes when the tree goes.

## A hard question is not a low one

An at-altitude question that conversation resolves badly stays in the session and takes another exit: a **fact** the user would have to go and read goes to `/archie-research`, and a "how should this look" goes to `/archie-prototype`. Hand it to `/archie-architect`, which dispatches the sub-agent, and carry on with the frontier while it runs.

## Check in every eight questions

Roughly every eighth question, open the turn with three lines, then ask the next question in the same turn. The check-in is a backstop against your own altitude judgement being wrong, not a decision point, so it never stops for approval:

```md
**Check-in.** Settled: reset is token-based, tokens expire in an hour, all sessions drop.
Deferred: 6, clustering into email delivery and the reset UI.
Leaning: split.
```

The lean is either **split** or **specify**, read off the deferrals as they stand: several clusters lean split, a thin scattering of deferrals leans specify.

## Ending

The session ends when the frontier is empty. Report to `/archie-architect` in one message:

- **An empty frontier and no deferrals** — this Effort is understood at its own resolution. `/archie-architect` weighs specifying it.
- **The clusters the deferrals formed** — each cluster named, with the deferred questions under it. These are the candidate children, in the build order you would suggest.

The recommendation on splitting or specifying is `/archie-architect`'s, and the call is the user's.
