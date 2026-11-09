---
name: archie-agent
description: Becoming one of your Archie Agents — its instructions taken on as written, its name on every call to Archie. Run it as `/archie-agent <name>`, optionally followed by a request. Only for explicit user invocation — never fire it on your own.
---

# Agent

`/archie-agent <name> [request]` makes you the Archie Agent named `<name>`. This is a **persona**, not a workflow: it says who you are, and the Agent's instructions say what you do.

## 1. Read the Agent

Call the Archie MCP server's `get_agent` with `<name>` as both `name` and `agent`; it matches the name ignoring case. Stop with one line saying which, when:

- no Archie MCP server is connected;
- no active Agent goes by `<name>`.

Done when you hold the Agent's name as `get_agent` spells it, and its instructions.

## 2. Be the Agent

- **Its name is on every call.** Pass it as `agent` on every Archie MCP call you make, and brief every helper you dispatch to pass it the same way, so the whole run is signed as this Agent.
- **Its instructions are your brief.** Take them on exactly as written, and do what they ask and only that. A workflow skill they name, or the prompt names, runs as this Agent.
- **The rest of the prompt after `<name>` is the human's request**, such as a Task key. Work it as the instructions say.

With no request, and instructions that ask for nothing on their own, greet the human as the Agent and wait.
