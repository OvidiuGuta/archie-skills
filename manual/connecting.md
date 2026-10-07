# Connecting a harness to Archie

A folder plans in Archie when its `origin` remote matches a repo one Project names in its settings, the `git@` and `https://` forms of one remote counting as the same. Nothing is written into the repo, so every clone and worktree binds the same way. No `origin`, no match or no connected server means the skills plan on files, and a remote several Projects name makes them ask which. The skills then follow the MCP server's `guide`, so the harness must have the server connected. Connecting is manual, once per machine: the bundle ships no server config, because the deployment URL is yours. The endpoint is the `mcp` path on the deployment's site URL, written `<url>` below.

## Claude Code

```sh
claude mcp add --transport http archie <url>/mcp
claude mcp login archie
```

`claude mcp list` shows the server and whether it is signed in. Add `--scope user` to the first line to share the server across every folder on the machine.

## Codex

Add the server to `~/.codex/config.toml`, then sign in:

```toml
[mcp_servers.archie]
url = "<url>/mcp"
```

```sh
codex mcp login archie
```

`codex mcp list` shows the server.

## Signing in

The server answers an unsigned request with a challenge, and the harness opens the browser on Archie's sign-in: the same account as the web app. The harness registers itself as an OAuth client on first sign-in, and the token it holds is the human's. Every call then acts as an Agent the human named, so the board shows who did the work. Each skill acts as the Agent whose description in the `guide` Index fits its kind of work, planning, building or reviewing, or as the Task's assignee when that is an Agent, chosen once per session.

The skills find their way in the flows the same way: every Status and Type a step needs is the one whose description fits it. When no row clearly fits, or several do, the skill stops and asks rather than guessing. A token expires after a day and the harness refreshes it on its own; a revoked grant stops working at that expiry.

## Checking it

In a session, a connected harness lists an `archie` server whose instructions point at `guide`. `/archie-setup` checks for it, and gives the lines above when it is missing.
