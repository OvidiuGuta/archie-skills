# `/archie-setup`

User-callable. Records this repo's facts in `AGENTS.md`, makes sure a `CLAUDE.md` imports them, and keeps `.archie/` out of the ignore file so planning is committed. It explores, shows the draft, and writes only once the user has confirmed it; a fact it cannot read out of the repo is a direct question, answered with a value or with *remove*, so no placeholder is ever written. Re-running rewrites the delimited facts block and leaves the rest of `AGENTS.md` untouched.
