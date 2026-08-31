# Each skill is authored self-contained

Supersedes [0008](0008-reference-set-fans-out-per-skill.md), which had one authored `reference/` set fanned out into every skill by a script.

The fan-out delivered self-contained *installs*, and it worked: no link ever left a skill directory. What it cost was the authoring. Six planning skills carried **18 generated copies — 1,072 lines of text from 342 authored ones**, a 3.1× amplification, because the closure copies whatever a reference file links in turn. Two skills carried `decisions.md` without linking it at all.

`reference/` and `scripts/sync-references.mjs` are gone. Every skill directory is now authored the way it installs.

## Each skill states the slice it uses

The amplification was the signal that the shared files were serving several skills that each needed a different part of them. `agents-facts.md` was 56 lines, of which `/archie-setup` needed the delimiters and the block format while `/archie-to-spec` needed one clause about test prior art. `altitude.md` was already restated almost whole inside `/archie-interview`, which is the skill that enforces it. So the conventions were not centralised and then copied — they were **cut per consumer**, and most of them turned out to be a paragraph.

Three files stayed files, because they are consulted on demand rather than read every run, and each has exactly one owner: the Epic tree's shape and numbering in `/archie-architect`, the decision formats in `/archie-domain-modeling`, and the `spec.md` template in `/archie-to-spec`.

## The boundary is the only thing gated

`validate-skills.mjs` loses the copy-matches-source check, the orphan check and the reference-set closure walk. It keeps the check that makes self-containment true: **no relative link may leave a skill's own directory.** Every reference file inside a skill is checked for dead links on the same pass as its `SKILL.md`.

## Consequences

- **A rule two skills share is stated twice.** The altitude gate lives in `/archie-interview` and in a clause of `/archie-architect`; the reference syntax appears as one sentence in five skills. Both were single-source before and are duplicated now, and a change to either means editing more than one file. This is the cost, taken deliberately: the slices are small, and the alternative was a script and a 3.1× copy amplification to keep 342 lines authoritative.
- **The framework has no single place a human reads it.** The README's conventions table used to be that index; now "how does the Epic tree work" is answered by one skill's reference file, and the rules around it by the skills that use them. `CONTEXT.md` and `docs/adr/` carry the design; the skills carry the behaviour.
- **Adding a skill needs no bundle-level step.** No script to re-run, no closure to reason about, and nothing to keep in sync in the same commit.
