# 0.9.0 local release preparation

This is a bounded release smoke, not a new tuning study or a publication record.
The plugin and matching marketplace entry are prepared as 0.9.0, dated 2026-09-17.
The explicit catalog still contains three skills. The 0.8.0 history is unchanged.
No PR, push, tag, GitHub release, or deployment was performed.

## Frozen scope

[freeze.json](freeze.json) records exact prompts, SHA-256 input hashes, expected
selection answers, workflow criteria, source revision `f7b19c08`, and the model.
[catalog.json](catalog.json) contains the exact three-skill metadata packet,
including explicit walkthrough invocation. Criteria and expected answers were
frozen before model prompts and withheld from evaluated workflow sessions.

- Twelve fresh selection judgments: six prompts, two judgments each.
- Three fresh build-agent workflow parents: defective offline Discord snapshot,
  reader-start documentation how-to, and small text-only PR walkthrough.
- Four native read-only PR child reports planned; these may share source files.
- Maximum concurrency: three selection judgments or two workflow parents.
- Model: `openai/gpt-6-astra#medium`, verified in the configured model catalog.

Selection is a simulated choice from a curated catalog. The host still exposes
its larger catalog; the prompt restricts the judgment to the supplied packet.
This does not test automatic host skill loading. Workflow agents receive local
frozen sources and fixture evidence in individual sibling clones.

## Controller exceptions

The neutral create/wait/export preflight found that a successful wait returns an
empty response. The controller was corrected before launching model trials.
There were no obsolete-endpoint HTTP 404 batches.

The first execution controller compared model objects by JSON key order and
misclassified matching identities. [executions.json](executions.json) preserves
those original statuses. [collect.ts](collect.ts) recovers existing exports and
artifacts with structural equality. No model calls are repeated for this repair.
Raw exports stay in ignored `.evals/release` and the durable archive; public
exports retain only visible text and tool results, never hidden reasoning.

## Results and checks

[Source review](SOURCE-REVIEW.md) records every frozen criterion and all PR stages.
Selection matched **12/12** expected answers, including **6/6 null negatives**,
without tool calls. All **3/3 workflow parents** and **4/4 native PR reports**
completed. All seven workflow sessions read their frozen local instructions.
Documentation replay produced the exact saved card, and the PR rebuild matched
the original HTML byte for byte. See [verification.json](verification.json).

The minimal PR fixture lacked root checker configuration. Its parent attempted
type-check and lint and accurately reported those failures. The complete release
owner has configured checks; its results are separate in checks.json.

Required release checks pass: root and nested frozen installs, `bun run check`
(type-check, lint, 40 tests, catalog, local links, skill metadata, and validation),
strict TypeScript checking of the three new result scripts, explicit
`claude plugin validate . --strict`, and `bash scripts/validate.sh`.
The requested Claude command reports marketplace-manifest validation. A separate
`claude plugin validate .claude-plugin/plugin.json --strict` also passes for the
plugin manifest. The repository validator checks catalog/version consistency.

Tool versions: Bun 1.3.7, Node v24.15.0, Claude Code 2.1.266, OpenCode v2.0.5,
and Glow 3.0.0. README and template rendering were inspected in Glow. That is
terminal Markdown coverage, not site styling or component rendering.

## Review and template clarification

The parent reviewed `0a425f99` (main 0.7.0) through fixed endpoint `f7b19c08`.
Standards review found zero actionable issues. Spec review found one P2 issue:
the how-to template presented an incomplete example as a model runnable guide.

The release preparation resolves it by labeling the example a structural
illustration. Both the surrounding text and copied MDX block state the omitted
credential configuration, request invocation, and real links. Verification is
explicitly a placeholder requiring a source-verified action and expected result.
No provider API or credential configuration was invented. No incoming link used
the old heading anchor.

The workflow packet was frozen before this annotation. Its documentation smoke
therefore tests the pre-annotation template; the exact final annotation remains
model-untested. The final template hash is recorded in collection.json. This
timing is retained rather than hidden by another model batch.

## Coverage limits

One workflow run per skill cannot establish reliability or statistical confidence.
Live Discord behavior, GitHub fetching, synthesized audio, MDX components, browser
rendering, and automatic host invocation remain unrun. The experimental narrative
audit CLI is not part of the default walkthrough and was not added to this smoke.
Its deterministic tests remain part of the root checks.

## Reproduction and archive

Run `bun evals/results/2026-09-17-release/run.ts prepare` in a clean owner clone,
then `bun evals/results/2026-09-17-release/run.ts run`. Preparation refuses an
existing freeze; execution refuses an existing execution record. Review outputs
against the frozen criteria and actual source, not model self-assessments.

Durable archive:
`/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/release-prep-evidence-20260917`.
It retains inputs, API schema, raw exports, output workspaces, and public evidence.
