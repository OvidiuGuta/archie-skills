# Planning is a resumable router over four steps

A planning session reached shared understanding of **what** to build and nothing about **how**. `spec.md` had an `Implementation Decisions` section claiming that ground — modules, interfaces, schema, API contracts — but `/archie-to-spec` synthesises rather than interviews, so the section was filled with whatever a what-altitude conversation happened to drop into it. The only how-decision anyone signed off on was the seam.

Planning is now four steps, each ending on a user sign-off: **scope** (the what) → **spec** → **design** (the how) → **tasks**. `/archie-architect` becomes a **router**: it resolves the Epic reference, reads which step the Epic is at off its own files, dispatches that one step, reports where the Epic now stands, and stops. One step per invocation, so each step gets its own session and its own context, and the user can also call any step directly.

## The state is derived, as the rest of the tree already is

Nothing records which step an Epic is at. `epic.md` exists only once scoping has finished, child directories mean Split, a `spec.md` whose two how-sections still carry their placeholder means undesigned, and a populated `tasks/` means the leaf is ready to build. A `Stage:` line would be the stale status line [0003](0003-epic-tree-on-disk.md) already refuses.

## The how is a section, not a file

`/archie-design` writes `Implementation Decisions` and `Testing Decisions` into the leaf's existing `spec.md` rather than a `design.md` beside it, so [0010](0010-implementing-is-one-build-one-review-one-fix.md)'s **two-contract rule survives untouched**: a Task's contract is still the task file and the Spec, and `/archie-tdd` and `/archie-code-review` change by nothing. What 0010 deleted was an agent restating the Spec per Task, unattended. This is a person fixing, once per leaf, what the Spec was previously forbidden to say.

`spec.md` therefore has two writers. `/archie-to-spec` writes it with both how-sections carrying one literal placeholder line; `/archie-design` replaces them.

## Surfaces yes, locations no

The Spec's ban on file paths and code existed because paths rot. A **surface** does not: an endpoint and its shape, a URL, a CLI flag, an exported API, a module or component name, a package. The rule is now *name surfaces, never file locations*, applied across the whole Spec rather than carved out for one section — a rule with an exception is a rule an agent gets wrong half the time.

## Altitude gains a second rung

`/archie-scope` asks *does this reach beyond one part of this Epic?* `/archie-design` asks the same question one rung down: *does this reach beyond one Task?* What spans Tasks is settled in the design; what lives inside one Task is `/archie-tdd`'s. Without the second rung the how-interview is unbounded, which is the waterfall re-entering through the front door.

## The seam moves, and so does prototyping

Both are how-decisions. The **seam** leaves `/archie-to-spec` for `/archie-design`, which makes `/archie-to-spec` what it always claimed to be — pure synthesis, zero questions — and puts the seam beside the module surface it attaches to, since *sit as high as possible* is unjudgeable until you know what is underneath it. **`/archie-prototype`** is dispatched by `/archie-design` alone: at scope altitude the question is whether to split, and needing to drive a state machine by hand is evidence the Epic is already specifiable rather than input to deciding it.

## Consequences

- **`/archie-architect` holds no discipline of its own.** The what-discipline — inherit, the frontier, the altitude gate, the deferrals, the residue, the check-in, `epic.md`, the recommendation, the split, the size backstop — all moves to `/archie-scope`, which amends [0002](0002-altitude-bounded-interviewing.md). Architect resolves, reads state, dispatches one step, reports. A thin router is not a smell; `/archie-implement` is mostly routing too.
- **The four steps must be model-invoked.** A skill carrying `disable-model-invocation: true` can be fired by nobody but the human, not even by another skill, so a router over user-only skills could hint and never run. `/archie-scope`, `/archie-to-spec`, `/archie-design` and `/archie-to-tasks` therefore drop the flag, which costs four always-loaded descriptions and loses nothing: model-invocation includes user reach, so each is still typeable by name. The doors a human opens are now four — `/archie-setup`, `/archie-architect`, `/archie-implement`, `/archie-assist`. *(The flag mechanics are superseded by [0017](0017-user-only-skills-gate-by-description-not-flag.md): the doors no longer carry `disable-model-invocation` either — a guard sentence in the description reserves them.)*
- **`/archie-design` is the last checkpoint before AFK**, and the first time anyone reads the real codebase for this leaf, so it is where "this is actually two features" surfaces. It names the repair and stops rather than repairing anything itself: a wrong *decision* is revised in place and the session carries on, a leaf that is merely too big goes to `/archie-scope`'s size backstop, and a wrong *boundary* goes back through `/archie-scope` and `/archie-to-spec`. Both of the latter drop `spec.md`, because a Split Epic cannot hold one.
- **Design is mandatory for every leaf.** `/archie-to-tasks` halts on a Spec still carrying the placeholder. An optional checkpoint is the one that gets skipped, and it fails silently: Tasks cut against an imagined surface look exactly like Tasks cut against a real one.
