# An interview step carries its own synthesis

[0013](0013-planning-is-a-resumable-router-over-four-steps.md) drew the session boundary at the wrong place. It split on **steps**, so scoping an Epic and writing its Spec were two windows, and designing a leaf and cutting its Tasks were two more. But the thing that needs its own context is an **interview**, and only two of the four steps hold one: `/archie-scope` and `/archie-design`. `/archie-to-spec` asks nothing at all, and `/archie-to-tasks` asks about a breakdown it derived from the Spec itself.

A step with no questions does not earn a window, and giving it one costs the conversation that produced its input. `/archie-to-tasks` quizzing the user on granularity and blocking edges is the clearest case: in its own session it reads the design off a file, when the session that settled the seam knew why the seam sits where it does.

So an interview step now carries its own synthesis to the end, and the four steps run as two sessions: **scope + spec**, then **design + tasks**.

## One step deep, and no further

The chain crosses one boundary at most. A scope session ending on **specify** offers the Spec and stops, because `/archie-design` is a fresh interview that has to read the real code first. A design session offers the Tasks and stops, because `/archie-implement` runs AFK.

What 0013 was right about survives: two interviews in one window is the waterfall re-entering through the front door. What it claimed and this drops is that a **sign-off** is the natural boundary — a chained session ends on one too. `/archie-architect`'s rule is therefore **one interview per invocation**.

## The hand-off is an open floor, not a yes/no

Each interview already ended by writing its files and presenting a recommendation, so the recommendation **is** the diff. That turn now closes by saying shared understanding is reached, inviting anything still open, and naming what it will do otherwise — create the child Epics, write the Spec, cut the Tasks.

Three answers carry mechanical consequences, so each step names them: a **reopened deferral** returns to the frontier and can change the split-or-specify call, a **redirect** to a different step is obeyed with what it drops named first, and *this is actually two features* in a design session is that skill's send-it-back exit rather than a chain. Everything else is followed as asked.

## Consequences

- **`/archie-to-spec` and `/archie-to-tasks` change by nothing.** Both already open on "the Epic the session in context just scoped", and both already hand off one step forward and stop. The chain is stated where the sign-off lives — the hand-off sections of `/archie-scope` and `/archie-design` — which also means it fires when the user types either of those directly, rather than only under the router.
- **The routing table is untouched.** State is still derived from the files ([0003](0003-epic-tree-on-disk.md)), so a chained session simply leaves the Epic two states further on and `/archie-architect` reads it the same way. Its closing report becomes one report covering both steps.
- **Nothing guards the window's size.** A rule that flips the offer to "start a fresh session" when the interview ran long is unmeasurable from inside that session. Declining the offer is free, and compacting is the user's call.
