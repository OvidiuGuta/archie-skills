# Connecting a harness to Archie

A folder plans in Archie when its `AGENTS.md` carries `**Archie Project:** KEY`, which `/archie-setup` writes. The skills then follow the MCP server's `guide`, so the harness must have the server connected. Connecting is manual, once per machine: the bundle ships no server config, because the deployment URL is yours. The endpoint is the `mcp` path on the deployment's site URL, written `<url>` below.

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

The server answers an unsigned request with a challenge, and the harness opens the browser on Archie's sign-in: the same account as the web app. The harness registers itself as an OAuth client on first sign-in, and the token it holds is the human's. Every call then acts as an Agent the human names, chosen by the skill from the Project's Role map, so the board shows who did the work. A token expires after a day and the harness refreshes it on its own; a revoked grant stops working at that expiry.

## Checking it

In a session, a connected harness lists an `archie` server whose instructions point at `guide`. `/archie-setup` checks for it when a folder chooses Archie mode, and gives the lines above when it is missing.
