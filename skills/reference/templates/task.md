# Template: a task file

One per Task, at `tasks/{NN}-{slug}.md` inside a Specified Effort. `/to-tasks` writes them; `/implement` consumes one.

```md
# {NN} — {Task title}

**Effort:** {3.2}
**Status:** todo
**Label:** ready-for-agent
**Blocked by:** {#2, or "None — can start immediately"}

**Demoable outcome:** {the one end-to-end behaviour this Task makes work, seen from the outside}

- [ ] {An acceptance criterion, stated as an observable outcome.}
- [ ] {…}
```

- A Task is **one end-to-end demoable outcome**, proven by one E2E journey test. Two outcomes means two Tasks, which makes "is this Task too big" a checkable question.
- Vertical: a narrow but complete path through every layer, never one layer at a time. Prefactoring comes first, as its own Task.
- `Blocked by` carries the Tasks that genuinely gate this one, referenced by number within the leaf.
- Criteria are **outcomes, not instructions**, and name no file paths or code, so they still read true weeks later. A `ready-for-human` Task's steps are derived at guide time, when the third-party UI is whatever it is that day.
- Statuses, labels and numbering: [`../effort-tree.md`](../effort-tree.md).
