# 04 — Every review ends on a confidence score

**Epic:** trustworthy-review
**Status:** done
**Label:** ready-for-agent
**Blocked by:** #1
**Builds:** The Confidence score bands; the report header; the Spec axis's list of criteria no test reaches

**Demoable outcome:** every review's header carries `Confidence: n/5` with a one-line reason, placed against the five written bands.

- [x] Every review report, first pass, re-review and the re-issued report after a verify pass, carries `Confidence: n/5` and a one-line reason in its header.
- [x] A 🟢 review scores 3 to 5 and a 🔴 review 1 or 2.
- [x] The five bands are written in the review skill, and the reason names what placed the score in its band.
- [x] The Spec axis reports the acceptance criteria no test reaches, beside its findings and not as findings, and the score weighs them.
- [x] A review with the Spec axis skipped has that gap weighed in its score.
- [x] The score gates nothing: the grade alone decides mergeable.
- [x] The `/archie-review` manual page describes the score and its bands.
- [x] The skill validator passes.
