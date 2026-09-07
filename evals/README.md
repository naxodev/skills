# Evaluate skill behavior

These cases check whether an agent selects the right skill and follows its workflow.
They complement metadata validation and deterministic code tests.
The runner prepares isolated fixture copies and validates reviewer reports. It does not call a model or grade prose automatically.

## Run a case

1. From the repository root, run `bun run evals list`, then `bun run evals prepare docs-local-api`.
   The command prints a new directory under `.evals/` with a prompt, fixture workspace, rubric, and report template.

   **Complete when:** the run directory exists and its fixture copies are readable.

2. Start a fresh agent session in the generated `work/` directory. Give it only `prompt.md` as the evaluation request.
   Use the named skill and the supplied fixtures. Keep the rubric and previous runs out of the evaluated session.
   For a controlled comparison, use one fresh sibling clone per modifying agent. Move the generated rubric and report template to a reviewer location outside that clone, and withhold repository evaluation cases and reference examples after copying the required fixture.
   Check the session's actual working directory; a launcher may not use its shell directory. Verify that the skill text loaded into the session matches the tested revision, including when the host resolves a skill by name.
   Save the complete conversation and tool results to `transcript.md` in the run directory.
   Workflow cases need file and shell tools; the walkthrough case also needs native subagent support.
   Routing cases need only the catalog included in the prompt.

   **Complete when:** the session has ended, its outputs are saved, the transcript records actions as well as claims, and the tested location and loaded skill version are verified. Exclude a run that reads reviewer material or uses a different skill version, and rerun it before comparing results.

3. Review the transcript and artifacts against `rubric.md` in a separate session or by hand.
   Fill in `report.json` with the model identifier, tested revision, and one result per criterion.
   Evidence should quote a transcript line range or name an artifact and the observed behavior.
   Mark blocked or unavailable checks `untested`. A partial result is not a pass.
   Do not treat the evaluated agent's own completion claim as evidence that a command ran.
   Record prescribed tool calls that were skipped, including subagent dispatch. A successful artifact build does not establish full workflow compliance.

   **Complete when:** every criterion has a result and supporting evidence, including any failure or blocked check.

4. Run `bun run evals score .evals/<run>/report.json` from the repository root.
   Exit zero means the reviewer recorded a pass for every criterion with evidence and a saved transcript.
   The command validates reporting completeness; a human or independent reviewer still judges the evidence.

   **Complete when:** the score command has reported the result, and any failed criterion is recorded for follow-up.

## Compare instruction changes

Run the same relevant cases on the base and changed revisions with the same model and tool access.
Use three fresh sessions per case to expose variation. Report passes over attempts and retain failure transcripts.
For model-invoked descriptions, include both positive and negative routing cases.
For workflow edits, include the affected workflow cases.

CI checks fixture availability, corpus consistency, and scoring logic. Live model evaluations remain an explicit contributor check.
Published results apply only to their recorded models, fixtures, and execution conditions.

The fixtures are fictional and offline. They need no production accounts, credentials, or live server changes.
The PR case supplies the fetched JSON directly; it evaluates analysis and rendering, not GitHub fetching, which has a CLI regression test.

## Cases and results

See [cases.json](cases.json) for prompts and criteria. Run artifacts under `.evals/` are ignored by version control.
When sharing a result, include the case, model, revision, attempts, criterion outcomes, and evidence locations.

- [PR walkthrough evidence experiment](results/2026-09-07-pr-grounding/README.md): baseline and two prompt revisions, three runs each. Neither revision improved the evidence criterion; both were reverted.
