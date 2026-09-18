# Read-only audit comparison

Compare baseline `e97165e2` with the frozen candidate on `discord-audit` and `discord-audit-incomplete`.
Run three fresh sessions per fixture and arm: twelve sessions total, at most three concurrent.
Use `openai/gpt-6-astra#medium`, build agent, with an explicit API location and local skill-file instructions.
The task is the complete offline audit workflow from a supplied snapshot, ending in `audit.md`.

Freeze the same prompt and snapshot for both arms. Freeze all Discord skill files per arm.
Each model gets a fresh sibling jj clone reduced to the snapshot and local Discord skill files.
Remove VCS metadata, evaluation material, examples, and project history before session creation.
Keep reviewer criteria and reference observations outside model directories.
Verify exported identity, unchanged input hashes, and actual local file reads; inspect every visible tool call for scope leakage.

Review actual audit outputs against `cases.json`, with source quotes rather than model self-grades.
The existing snapshot supports three observed failures. The new snapshot is authored from local control invariants and supports no observed failure.
Missing evidence stays unknown. Recorded configuration and role preview do not prove fresh-member behavior.
Judge finding completeness, mode fit, evidence limits, project terms, and durable routes independently.
Do not retry semantic failures or tune the candidate after the batch.
Allow at most one infrastructure rerun for a zero-token attempt; interrupt this harness's sessions on timeout.

Publish prompts, hashes, outputs, visible tool transcripts, and source-reviewed scores.
Keep raw exports under ignored `.evals/` and in the durable temporary archive, excluding hidden reasoning from public artifacts.
The score command validates reviewer report completeness, not prose truth.
Live Discord permissions, exact-current labels, greenfield/improvement behavior, and routing evaluations remain unrun.
