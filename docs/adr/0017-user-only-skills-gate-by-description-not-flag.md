# User-only skills gate by description, not by flag

Supersedes the flag mechanics in [0013](0013-planning-is-a-resumable-router-over-four-steps.md) and [0016](0016-implementing-splits-into-build-and-review-phases.md): the five user-only skills carried `disable-model-invocation: true`. In practice the harness refuses a flagged skill even when the user themself put its name in the prompt — autocomplete inserts the name, the model relays the invocation, and the run dies on a permission error instead of starting. The flag is dropped from the whole bundle; each of the five now ends its description with the verbatim guard sentence `Only for explicit user invocation — never fire it on your own.`, which the validator pins.

## Consequences

- **User-only survives as a convention, not a mechanism.** The five are still the doors a human opens — nothing dispatches them — but the reservation is a sentence the model obeys, not a wall the harness enforces.
- **Five more always-loaded descriptions.** User-only skills no longer ride free on context load; their descriptions sit in the window every turn like everyone else's.
- **The validator's check inverts**: the flag anywhere is now a failure, and the five user-only descriptions must carry the guard sentence exactly.
