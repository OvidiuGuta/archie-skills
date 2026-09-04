# Logic prototype

One self-contained HTML file that lets anyone drive a state model by clicking buttons. Use it when the question is about business logic, state transitions or the shape of the data — the kind of thing that reads fine on paper and only feels wrong once real cases go through it.

Because it is one file with nothing to install, it can be handed to a designer, a PM or a domain expert, who will feel the model for themselves. So it speaks their language, not the code's.

If the question is what something should look like, this is the wrong shape: use [`UI.md`](./UI.md).

It is written into the directory you were given, so it stays shareable and disposable with the rest of the planning tree. No branch and no commit: it touches no app source, and it sits uncommitted like every other planning file.

## 1. State the question

Before any code, write what model and what question this demo explores — one paragraph, visible in the page itself rather than buried in a comment. A logic prototype answering the wrong question is pure waste, and stating it makes that checkable later.

## 2. Isolate the logic in a portable module

The part that answers the question goes in a single `<script>` block, written as a small pure module that could be lifted into the real codebase as it stands. The page around it is throwaway; this is not.

Pick the shape that fits the question, not the one that is easiest to wire to a page:

- **A pure reducer**, `(state, action) => state`, when actions are discrete events over one value.
- **A state machine** with explicit states and transitions, when "which actions are even legal right now" is part of the question.
- **A set of pure functions** over a plain data type, when there is no implicit current state.
- **A module with a clear method surface**, when the logic genuinely owns ongoing internal state.

Keep it pure: no DOM, no `document`, no handler reaching inside it. The page calls in; nothing flows back out. That is what makes the validated model liftable once the question is answered.

## 3. Build the file

One file, plain HTML, CSS and JS, everything inline — no framework, no bundler, no server. It opens by double-click and survives being emailed.

Write it for a non-developer. Every label is in domain language, not code: buttons and state read like the business, not like the reducer.

Top to bottom:

1. **Title and one line** on what this demo lets you explore — the question from step 1.
2. **Current state**, as a readable panel of labelled fields rather than a JSON dump, re-rendered after every click, calling out what just changed.
3. **Free-play buttons**, one per action, always available, so the model can be poked at in any order.
4. **Guided walkthroughs**, one scenario per tab. Each tab holds a plain-language description of the situation and what to watch for, and under it the ordered buttons to press — each step a real button that performs its action and advances. Starting a walkthrough resets to a known state, so a scenario runs the same way every time.

Choose scenarios that demonstrate the awkward cases: the happy path, a genuinely tricky edge case, and an attempt at something that should be illegal.

Keep it restrained — clean typography, generous spacing, one accent colour. No animations and no gimmicks: nothing should compete with the state and the buttons.

## 4. Hand it over

Return the block the skill's return section specifies: the question, one line on how to open it, and one line per scenario. The interesting moments are "wait, that should not be possible" and "I assumed X would be different" — those are bugs in the *idea*, which is the entire point. A request for another action or another scenario is a revision, not a verdict.

## 5. Name the confirmed model

Once the model is confirmed, **delete nothing**. The scenarios that were exploring rejected shapes stay, as the record of what was ruled out.

Mark the confirmed module in the file, plainly enough that a reader knows which part is the agreed answer rather than the exploration around it. Then return its name and the file's path.

The validated module lifts into the real code when the work is built; the page around it never does.

## Anti-patterns

- **Tests.** A prototype that needs tests is not a prototype any more.
- **The real database.** In-memory state, unless persistence is the question.
- **Generalising.** No "what if we needed X later". One question.
- **Blurring the module into the page.** If the pure part touches the DOM it is no longer liftable.
- **A framework, bundler or server.** One file, double-clicked. A dev server defeats "shareable".
- **Shipping the page.** The shell is optimised for being clicked through by hand; only the module behind it is worth keeping.
