# Narrative audit command reference

`bun run audit` prepares text-field coverage and applies a source-linked audit to a copy of a manifest.
It enforces structural, quotation, and input-identity checks. The auditor and independent reviewer remain responsible for factual correctness.

Install the root dependencies using the [development setup](../../README.md#development-setup).
The command is repository evaluation tooling; it does not invoke a model.

## Prepare

```bash
mkdir -p .evals/audit-demo
bun run audit prepare --manifest examples/pr-walkthrough.json --output .evals/audit-demo/fields.json
```

The output file contains the array of editable text-field pointers and their current values.
Standard output contains a JSON object with `inputSha256` and `fieldsPath`.
Use those values for `<MANIFEST_SHA>` and `<FIELDS>` in the [auditor protocol](FINAL-NARRATIVE-AUDIT.md).

The hash binds the audit to the exact manifest bytes, including whitespace.
Editable fields are the existing title, eyebrow, subtitle (`dek`), metadata, footer, narration intro, and section titles, eyebrows, content, and narration.
Code entries, diagrams, and document structure are outside the edit boundary.

## Apply

After an independent auditor produces `audit.json`, supply the actual paths to the audit bundle:

```bash
bun run audit apply \
  --manifest path/to/manifest.json \
  --audit path/to/audit.json \
  --source path/to/source.json \
  --verification path/to/verification.json \
  --probe path/to/probe-results.json \
  --output path/to/audited-manifest.json
```

`--manifest`, `--audit`, `--source`, and `--output` are required.
`--verification` and `--probe` are optional; include them when the audit cites those files.
The `source` input is the original PR JSON, rather than a copy of an earlier review's conclusions.

The command checks:

- The audit hash matches the input manifest.
- Every editable field is declared reviewed exactly once.
- Verdict, findings, edits, and blockers are consistent.
- Finding IDs are unique and refer to editable fields.
- Each edit addresses findings on that same field, and every finding is addressed.
- Every evidence pointer resolves, every quotation is a contiguous source substring, and every `value` citation matches exactly.
- Each finding cites original source or probe evidence, rather than relying only on prior verification.
- Replacements preserve the structured code/diagram placeholder multiset.

`pass` writes the original manifest bytes unchanged. `revise` writes the manifest with validated text replacements.
`blocked` fails with the recorded blockers. Validation and usage failures exit with code 2 and print a diagnostic on standard error.
Validation completes before the output is written. The output must differ from every input, including filesystem aliases.

## Build and review

Use the existing walkthrough builder with the resulting manifest:

```bash
node skills/pr-walkthrough/scripts/build.mjs \
  --manifest path/to/audited-manifest.json \
  --output path/to/audited.html
```

The builder performs its existing manifest and placeholder checks.
Review the resulting prose independently. A structurally valid audit can still introduce or overlook false claims, as the [paired experiment](../results/2026-09-08-final-narrative-audit/README.md) demonstrated.

For narrated output, regenerate the audio sidecar from the revised manifest before supplying it to the builder. Follow the [skill's audio workflow](../../skills/pr-walkthrough/SKILL.md); an earlier sidecar can still contain the earlier claims. The paired experiment used text-only walkthroughs.

## Programmatic interface

`scripts/narrative-audit.ts` exports:

- `prepareNarrativeAudit(manifestText): AuditInput`, returning the hash and editable fields.
- `applyNarrativeAudit(manifestText, audit, sources): string`, returning the output manifest JSON after validation.

The input audit is validated as unknown data. `AuditSources` requires `source` and accepts optional `verification` and `probe` values.
The functions throw on validation errors and perform no filesystem writes; the CLI owns file input and output.
See [the types and implementation](../../scripts/narrative-audit.ts) for the exact contract.
