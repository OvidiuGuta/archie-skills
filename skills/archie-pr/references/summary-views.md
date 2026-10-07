# Summary views

The **smallest view** that makes the change clear: usually one, at most two, picked by what the change is.

- **Logic or an algorithm** — pseudocode.
- **Runtime control flow** — a call tree.
- **UI structure** — a component tree, with the state and module boundaries that matter.
- **File responsibility or a broad refactor** — a shallow file tree, one comment per entry.
- **Interaction or data flow between parts** — Mermaid, kept small.

When the shape already exists and the point is what changed, draw the same view as a `diff` block:

```diff
 submitForm
   createSession
     persistPrompt
+    expandSkillMention
     launchAgent
-  navigateToSession
+  navigateToSession
+    subscribeToEvents
```

Show the whole block when most of it is new, when cutting context would hide ownership or order, or when the reader needs a copyable target shape.

Keep only the calls, files, props, states and boundaries the point needs, with one line of text beside each view.
