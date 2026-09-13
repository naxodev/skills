# Frozen reader-outcome comparison

Compare baseline `640ac4aa` against the candidate's three documentation skill
files. Use `openai/gpt-6-astra#medium`, build agent, three repeats per arm on
two cases: twelve sessions total, at most three concurrent. No tuning or
semantic reruns. At most one zero-token infrastructure retry is allowed.

Freeze before dispatch: exact skill snapshots, fixture contents, prompts,
criteria, and this plan. Hash them in `freeze.json`. Each session gets a fresh
sibling clone stripped of repository files, history, evaluation material,
and instructions except the local skill plus the selected fixture. Explicit
API locations must match the packet. Require direct local skill/reference
reads and inspect the tool evidence; installed-skill substitution invalidates
a run. Archive raw exports and visible text/tool transcripts outside the packet.

## Source judgments fixed before sessions

The procedural request targets a competent developer new to the workspace.
The source README requires Bun, root working directory, and copying the
release example to the absent selected config. It specifies the release
selection, `--write` persistence versus default dry run, and saved artifact
verification. `card.ts` implements those claims. Success requires exactly
`release-2.4.0\n` in `generated/release.txt`, not a printed plan or preview.
The deterministic probe must demonstrate missing-config and wrong-directory
failures, dry-run non-persistence, preview separation, saved success, and
mismatch rejection before dispatch.

Review generated pages against the frozen `cases.json` criteria. Replay each
how-to from its declared context in a fresh fixture copy with no hidden setup.
Inspect commands first; execute only local fixture operations and record any
needed missing step or error. Do not repair a page during replay. Keep page
claims, actual author commands, and independent replay observations separate.

The concept case reuses `operations.md` unchanged. The reader should understand
chat as live coordination and the tracker as incident timeline/follow-up
history that supports handover across channel cleanup and staff changes.
The record promises neither response times nor permanent chat retention.
Success is source-supported understanding of this distinction, not a runnable
recipe. A setup checklist is a mode-fit failure. No new guarantee is permitted.

Inspect Markdown and navigation, record absent build/sidebar/live checks as
not applicable with reasons, and keep failed or blocked verification visible.
No grader model is needed. Publish pages, hashes, source grounds, and per-run
statuses; archive full raw/visible evidence and exact inputs. Remove owned
evaluation clones only after archiving. Equal performance supports instruction
clarification, not demonstrated uplift. Routing, live external APIs, and
tutorial/reference-specific outputs remain outside this bounded comparison.
