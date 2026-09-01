# UI prototype

Several **radically different** variants of one surface, rendered on the real route and switchable from a floating bar. The user flips between them, picks one — or steals parts of each — and the rest is deleted.

If the question is about logic or state rather than what something looks like, this is the wrong branch: use [`LOGIC.md`](./LOGIC.md).

## Where the variants go

A UI variant is much easier to judge when it is **butting up against the rest of the app** — real header, real sidebar, real data, real density. A route on its own is a vacuum where every variant looks fine.

**Mount them on the existing page.** The route already exists, so keep its data fetching, its params and its auth exactly as they are, and swap only the rendered subtree, gated by a `?variant=` search param. Something that has no page yet but would naturally live inside one — a new section of a dashboard, a new card on a settings screen, a new step in a flow — still mounts inside its host page.

**A new route is the last resort**, for a genuinely new top-level surface with nowhere to embed. Follow the project's routing convention, put `prototype` in the path, and use the same `?variant=` pattern. Before taking it, check again whether some existing page could host this: an empty route hides the design problems a populated one exposes.

## 1. State the question and pick N

**Three variants** by default. Past five they stop being radically different and start being noise, so five is the cap.

Write the plan in one line at the top of the prototype's entry file:

> Three variants of the settings page, switchable via `?variant=`, on the existing `settings` route.

## 2. Make them structurally different

Each variant gets a clear exported name — `VariantA`, `VariantB`, `VariantC` — and each is held to the page's purpose and the data it actually has.

Variants **disagree about structure**: different layout, different information hierarchy, different primary affordance. Three tweaked card grids is not a UI prototype, it is wallpaper. If two drafts come out similar, redo one with an explicit constraint — "this one does not use a card grid".

Share a `Header` if it helps; do not share a `Layout`. Each variant must be free to throw the layout out.

## 3. Wire the switch

One switcher on the route, reading the variant from the URL so the choice is shareable and survives a reload:

```tsx
// pseudo-code — adapt to the project's framework
const variant = searchParams.get('variant') ?? 'A'
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A', 'B', 'C']} current={variant} />
  </>
)
```

Existing data fetching stays above the switcher. Only the subtree below it changes.

## 4. Build the floating bar

Fixed at the bottom centre, three pieces: a left arrow cycling back with wraparound, the current variant key and its name (`B — Sidebar layout`), and a right arrow cycling forward.

- Clicking an arrow updates the search param through the project's router, so the URL always names what is on screen.
- `←` and `→` cycle too, except while an `<input>`, `<textarea>` or `[contenteditable]` has focus.
- Visually obviously **not** part of the design being judged — high contrast, its own shape.
- Gated so it cannot render in a production build, so a stray merge cannot ship it.

## 5. Hand it over

Return the URL and the variant keys. The most useful reaction is usually "the header from B with the sidebar from C" — that is the actual design, and it is a revision, not a verdict.

## 6. Prune to the winner

Once a variant is confirmed: delete the losing variants, delete the switcher, and delete the plan line and any copy explaining what to compare. One variant is left, still gated and still named as a prototype, on a host page that renders exactly what it rendered before.

Do not promote it in the same move. It was written with no tests and no error handling, so the Task that builds the real thing rewrites it properly and points at this as the reference.

## Anti-patterns

- **Variants differing only in colour or copy.** That is a tweak. Real variants disagree about structure.
- **Sharing so much code that no variant can restructure.** A shared layout defeats the exercise.
- **Wiring a variant to a real mutation.** Read-only is fine; point at a stub if it must write. The question is what this should look like, not whether the backend works.
- **Replacing the page's real render** to save the trouble of a param.
