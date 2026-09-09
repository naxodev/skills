# Isolate the final audit stage

This component study estimates the effect of adding one fresh factual audit to an unchanged draft.
Writer and auditor both use `openai/gpt-6-astra#medium`, the build agent, and the same inherited provider settings.
Record settings exposed by the service; do not invent a temperature or seed that it does not expose.
The earlier cross-model comparison cannot answer this question.

## Design fixed before narrative model results

Three new fictional fixtures cover retry behavior, a transaction boundary, and cache invalidation.
Each has three fresh writer sessions and one fresh audit of each exact original: nine writers and nine paired audits.
Six additional fresh audits review one correct and one title-corrupted control per fixture.
The primary denominator is nine pairs. Controls are reported separately, never pooled with drafts.
No active skill or default workflow changes are part of this study.

1. **Check external grading first.** Query the local model catalog and smoke-test `anthropic/claude-opus-5#medium` with the neutral request below. If it fails, try `anthropic/claude-opus-4-8#medium`. Save the requested and exported model, location, outcome, errors, usage, and times. If both fail, stop before control acceptance or the writer batch. Do not use Astra as its own external grader.

   > Reply with exactly READY. Do not use tools or read files. This is a neutral availability check.

   **Complete when:** one permitted grader actually answers READY, or the run is recorded as blocked with exact exclusions.

2. **Verify controls before admission.** Run `bun evals/results/2026-09-09-audit-stage/prepare.ts` from the repository root. Review complete source functions and actual probe results against every control field. Have the external grader review the three correct controls in fresh, masked sessions using the grading request in reviewer/CRITERIA.md. Controls are candidates until accepted. Investigate disagreement against source and probes; revise or remove invalid controls before any writer or audit. A deliberately flawed counterpart must differ in only its title.

   Freeze the inputs, controls, writer prompt, criteria, STYLE.md, schema summary, and existing audit protocol with SHA-256 hashes. `design-lock.json` records the prepared snapshot; record final control acceptance separately before execution. Copy reviewer material to a separate location before preparing model workspaces.

   **Complete when:** probe assertions and six builds pass, three correct controls have inspectable independent acceptance, and the pre-result snapshot is recorded.

3. **Create isolated writer workspaces.** Create one fresh sibling `jj git clone` per modifying session from the tested revision. Retain only that fixture's source.json, verification.json (explicit status `none` and empty findings), functions.mjs, probe.mjs, probe-results.json, a local STYLE.md, and MANIFEST.md in the model workspace. Withhold evals, docs, examples, criteria, controls, prior runs, and mapping. Tell sessions to use only their supplied inputs; inspect transcripts for repository-history or outside-workspace reads and exclude contaminated attempts.

   Create the session with explicit `{model:{providerID:"openai",id:"gpt-6-astra",variant:"medium"},location:{directory:work},title:"component trial"}` through `opencode2 api post /api/session --data ...`. Submit WRITER.md through `/api/session/{id}/prompt`, wait through `/wait`, and retrieve `/export`. Verify actual model and location from exports. Run three sessions per fixture, in round-robin fixture order, saving untouched manifest bytes immediately.

   **Complete when:** all nine planned slots have either a saved original manifest and verified execution identity or a recorded exclusion/failure.

4. **Audit each original independently.** Create another fresh sibling clone per audit. Copy the exact original manifest and the same source, explicit empty verification, and probe code/results. Generate the text-field list and manifest hash with `prepareNarrativeAudit`. Substitute paths and hash in the unchanged [final audit protocol](../../protocols/FINAL-NARRATIVE-AUDIT.md). Launch each audit in fresh context with the same Astra model, variant, and agent. Apply proposals with the existing `applyNarrativeAudit`, only to a copy. Process the six controls the same way in separate sessions.

   Validate input immutability and preserve first-pass exports and files. Allow at most one same-session mechanical JSON/schema/quote repair; provide only the validator error, never factual feedback. A blocked verdict or semantic failure remains a quality result. For admission failure before tokens, retain an infrastructure exclusion and allow at most one fresh rerun. No retries for low quality. Record every attempt and keep original denominators visible.

   **Complete when:** nine paired audit slots and six control audit slots have inspectable outcomes, including blocks and first-pass failures.

5. **Grade masked outputs.** Before grading, randomly shuffle the 18 original/revised draft slots and 12 control slots using a cryptographic shuffle. Assign opaque random labels. Store the mapping outside all grader workspaces. Grade each artifact in a fresh external-family context with only its anonymous manifest, source, probes, field inventory, and generic grading request. Do not disclose stage, pairing, control kind, author model, audit findings, or the reference answer key. If an audit is blocked, grade its existing original and report that no revised artifact exists; do not fabricate a second output.

   Review every finding against exact field quotes and source/probe rationale. Keep model grades and adjudicated judgments separate, including unresolved disagreements. Unmask only after grades are saved. Report repaired defects, remaining defects, new defects, and needless correct-control edits by field. Inspect structured code and diagram entries too; the audit cannot repair them.

   **Complete when:** each available artifact has a saved masked grade and an inspectable evidence review; unavailable artifacts remain untested.

6. **Report the paired result.** Use reviewer/CRITERIA.md for metrics and definitions. Save raw exports under .evals and archive them outside disposable clones. Save visible text/tool transcripts without hidden reasoning. Publish prompts, fixture/probe results, hashes, grading evidence, denominators, exclusions, and uncertainty with the report. Run the repository checks before integration.

   **Complete when:** the report distinguishes preparation, execution, grading, and verification, and every claimed result has durable evidence.
