# Test counterexamples and reader-facing prose

The [challenged protocol](challenged-walkthrough.json) extends the original [three-stage workflow](README.md).
It retains separate extractor, verifier, and writer sessions while adding executed probes and a reader-facing revision pass.
It remains experimental; see the [comparison report](../results/2026-09-08-challenged-walkthrough/README.md) before adopting it.

## Run the revised stages

1. Prepare isolated stage workspaces and substitute the same placeholders described in the original protocol guide.
   Keep the extractor prompt unchanged. Record the protocol and source hashes before running a held-out case.

   **Complete when:** the model, source fixture, protocol snapshot, and independent session locations are recorded, and reviewer material is withheld.

2. Run the verifier with the extracted facts and original source. In addition to `verification.json`, it must write and execute `counterexample.mjs` and save `probe-results.json`.
   The probe must execute modeled old and new statements with controlled local dependencies and exercise a relevant failure, early-exit, or boundary path.
   Review the assumptions: a stub demonstrates a possible behavior under those assumptions, not the behavior of an unshown production implementation.

   **Complete when:** tool records show the probe ran, the saved results contain computed observations, and challenge decisions narrow the approved claims where necessary.

3. Check quotation validity and fact coverage before admitting the writer. Independently replay the probe in the verifier's isolated workspace and compare its parsed JSON output to the saved results.
   Check that challenge case names refer to actual probe results. Keep the replay command and result with the transcript.

   **Complete when:** the structured handoff is valid, the replay matches locally, and each challenge is linked to a recorded case. This does not prove that the probe modeled the source correctly; review that separately.

4. Run the writer in a fresh workspace. Its prompt asks for a developer-facing explanation rather than a copy of reviewer notes.
   Score the final title, subtitle, body, and recap. Correct qualifications in one paragraph do not cancel a contradictory summary.

   **Complete when:** the builder succeeded, the HTML reflects the final manifest, and an independent reviewer has scored both factual scope and reader-facing quality.

## Handle quotation-format failures explicitly

The comparison found that a model can reconstruct code correctly while citing it as a contiguous quotation from a raw diff.
For example, removed lines can separate two lines that become adjacent in the new function.
The quotation validator should reject that citation rather than silently reinterpret it.

A bounded recovery experiment used this policy for both protocol versions:

1. Preserve the first-pass artifact, transcript, and validation error.
2. Send the originating stage the mechanical quotation error. Explain that each quote must be a contiguous source substring and that separated spans need separate evidence items.
3. Allow one repair response per affected stage, then rerun validation. Admit downstream stages only if the gate passes.

**Complete when:** the repair attempt and outcome are recorded, the corrected quotations pass, and results distinguish first-pass completion from completion after feedback.

This feedback supplies a format rule, not a factual answer or the grading rubric. It is not permission to accept an unsupported claim.
The recovery policy was added after the first-pass failures in this experiment; its results are reported separately from the frozen-prompt comparison.

## What to measure

- Whether the verifier actually exercised the relevant guarantee, not merely whether a probe file exists.
- Whether challenge findings survive in the approved facts and final prose.
- Whether the final text introduces a new guarantee that no probe examined.
- Whether internal fact IDs, reviewer directions, or unfinished text reach the reader.
- First-pass gates, repair attempts, runtime failures, and final scores as separate outcomes.

Use a new unseen case when revising the prompts again. A case used to diagnose a failure has become a regression case.
