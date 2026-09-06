# The baseline seed

The rules a repo gets on day one. Write them into `STANDARDS.md` **verbatim**, under the headings below, in the shape `STANDARDS-FORMAT.md` sets. They land unmarked, as the user's own rules, because a rule they cannot freely reword is not one they own.

---

## Code hygiene

- An escape hatch — a lint or type suppression, a cast, a non-null assertion, an `any`-style value — carries a comment at its site saying why.
- Every caught error and every failure path reports to someone: a log, a rethrow, or a returned failure.
- A change lands with its debug logging, commented-out code and dead branches removed.
- Every comment and doc line beside a change still tells the truth about it.

## Code shape — judgement calls

Each of these is a judgement call: name it, quote the code, and let the Spec override it. None of them alone blocks a merge.

- **Mysterious Name** — name a function, variable or type for what it does or holds; where no honest name comes, the design is murky.
- **Duplicated Code** — extract a logic shape that appears twice and call it from both sites.
- **Feature Envy** — move a method onto the data it reaches into.
- **Data Clumps** — bundle fields that always travel together into one type.
- **Primitive Obsession** — give a domain concept its own type rather than a bare string or number.
- **Repeated Switches** — replace a switch on the same type recurring across sites with polymorphism, or one map they share.
- **Shotgun Surgery** — gather what changes together into one module.
- **Divergent Change** — split a file edited for several unrelated reasons.
- **Speculative Generality** — delete abstraction, parameters and hooks nothing needs yet.
- **Message Chains** — hide a long `a.b().c().d()` walk behind one method on the first object.
- **Middle Man** — cut a class or function that mostly delegates, and call the real target direct.
- **Refused Bequest** — drop inheritance an implementer mostly overrides, and compose instead.
