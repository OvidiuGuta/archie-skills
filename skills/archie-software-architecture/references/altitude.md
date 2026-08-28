# The altitude test

One rule, reused in four places. Before settling anything, ask:

> **Does this decision's blast radius reach beyond one part of the thing at hand?**

- **At altitude** — it does. Settle it here, now.
- **Below altitude** — it lives inside one part. Defer it to the moment that part is worked on.

The test is a gate the agent applies before every question, not advice it weighs. Settling below-altitude decisions early is the waterfall Archie replaces: it spends the user's attention on answers that go stale before the code depending on them exists. A deferral is a bet on strictly greater knowledge later — by the time a part is reached, its earlier siblings are built and their code is there to read.

Sessions terminate on their own because cross-cutting decisions at any resolution are few, while local ones are many.

## A hard question is not a low one

A question at altitude that conversation resolves badly stays in the session and takes another exit: `/archie-research` when it is a fact, `/archie-prototype` when it is "how should this look". Altitude is about resolution, not difficulty.

## Where it applies

- **`/archie-interview`** — asks the at-altitude questions one at a time and defers the rest, announcing each deferral as it happens. The deferrals cluster, and the clusters become the Epic's children.
- **`/archie-to-spec`** — puts integration **seams** in the Spec, because a seam spans a leaf's Tasks, and leaves a module's internals to the per-Task design.
- **`/archie-domain-modeling`** — sends a durable decision to `docs/adr/` and a local one to the Epic's `epic.md`. See [`decisions.md`](decisions.md).
- **`/archie-implement`** — has the engineer fix a code defect in place, and halts on a planning defect. A wrong or ambiguous acceptance criterion reaches past the Task, and only the user settles it.
