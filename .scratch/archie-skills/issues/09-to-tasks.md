# 09 — `/to-tasks`

**What to build:** The skill that slices a spec into the Tasks `/implement` consumes. Each Task is one end-to-end demoable outcome, which is what makes "is this too big" a checkable question.

**Blocked by:** 08 — `/to-spec`.

**Status:** ready-for-review

- [x] User-callable only (`disable-model-invocation: true`)
- [x] Reads the Effort's `spec.md`, and any reference the user passes
- [x] Slices into vertical tracer-bullet Tasks, each cutting a complete path to observable behaviour
- [x] Each Task is exactly one end-to-end demoable outcome; two outcomes means split the Task
- [x] Each Task carries its blocking edges, an acceptance criteria checklist, `Status: todo`, and one of the two labels
- [x] Quizzes the user on granularity and blocking edges, presenting the breakdown as a numbered list, and iterates until approved
- [x] Publishes one file per Task at `tasks/NN-<slug>.md` inside the leaf, numbers being identity and never renumbered
- [x] Looks for prefactoring opportunities and sequences them first
- [x] Avoids file paths and code, except a decision-encoding snippet from a prototype
- [x] Ships `agents/openai.yaml`, and `README.md` documents the skill
