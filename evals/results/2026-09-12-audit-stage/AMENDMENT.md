# Replacement grader amendment

This amendment preserves the [September 9 design](../2026-09-09-audit-stage/PROTOCOL.md) and blocked historical record.
Only grader admission changes. The final audit protocol and active skills retain their exact bytes.

1. Freeze this plan, qualification prompt, six cases, deterministic witnesses, and reference answers before any model answer.
   Candidate order is `xai/grok-4.6#high`, `xai/grok-4.5#high`, then `opencode/mimo-v2.5-free` (no variant).
   The September 12 local catalog lists all three as enabled; both Grok high variants exist. MiMo lists zero prices and no variants.
   **Complete when:** local witnesses pass and a timestamped SHA-256 lock exists.
2. Smoke each candidate with: “Reply with exactly READY. Do not use tools or read files. This is a neutral availability check.”
   Preserve admission errors. Allow at most one fresh infrastructure retry; no semantic retry.
   Use explicit session locations in fresh stripped sibling clones. Export each session and verify model and location.
   Wait in the foreground for at most 300 seconds, then interrupt and export an expired session.
   **Complete when:** the candidate answers READY or has an exact exclusion.
3. Present each qualification case in its own fresh masked context with only that case's claim, source, witness, and observed result.
   Withhold the key, other examples, benchmark material, and mappings. Use the same prompt for every candidate.
   Require six of six correct statuses, zero false positives, exact claim quotes, and source-consistent rationales.
   Allow one format-only repair with validator feedback. Preserve first-pass responses and every candidate's score.
   Choose the first passing candidate; never choose the best failing score or tune the threshold.
   **Complete when:** a grader is frozen or all candidates are excluded or fail screening.
4. Follow September 9 steps 2–6 only after admission. Independently accept the three correct controls before writers.
   Use unchanged writer, schema, style, fixtures, criteria, and final audit protocol; investigate control disagreements before execution.
   Keep nine writer/audit pairs and six control audits as separate original denominators.
   A screening pass is a small empirical check, not a guarantee of reliable grading.
   **Complete when:** inspectable paired results exist, or a prerequisite failure is reported without an effectiveness claim.
