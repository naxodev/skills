# Changelog

This file records notable user-facing changes to the skills collection.

## Unreleased

## 0.9.0 - 2026-09-17

Prepared locally; not published. The 0.8.0 entry below retains its original preparation date.

### Added

- Added an experimental local [narrative audit command](evals/protocols/AUDIT-TOOL.md) for source-linked edits to a separate walkthrough manifest. It is not part of the default workflow.
- Expanded [evaluation tooling and evidence](evals/README.md) with frozen fixtures, isolated sessions, source-based review, and independent replay. Detailed experiment results, rejected candidates, and verification limits remain in the linked history.

### Changed

- PR walkthroughs now require a four-part arc ending in a recap. Optional sections need distinct evidence. Code excerpts scale to the source, with no minimum quota; the reader-facing narrative preserves qualifications without internal review instructions.
- Discord audits now finish with a read-only findings handoff, without setup or launch approval. Findings keep source, impact, priority, unapplied correction, and verification together. Shorter reports group shared limits and distinguish unknown checks from observed failures.
- Technical docs now establish reader prerequisites and promised outcomes, replay procedures from a fresh start, and apply style within the selected quadrant. Verification discovers a capable renderer, inspects its output, and states the limits of terminal Markdown review.

### Fixed

- Labeled the how-to template's incomplete structural illustration and verification placeholder so they cannot be mistaken for a verified runnable guide.

## 0.8.0 - 2026-09-07

### Added

- Added a downloadable PR walkthrough example, usage prompts, and contributor setup instructions.
- Added offline skill evaluation cases, isolated fixture preparation, and evidence-based reviewer reports.
- Added JavaScript type checking, linting, CLI regression tests, and automated catalog and local Markdown link checks to CI.

### Changed

- Made technical documentation evidence and verification fit local APIs, external APIs, conceptual pages, and operational pages.
- Documented PR walkthrough runtime, GitHub CLI, and subagent requirements.

### Fixed

- Passed PR identifiers directly to GitHub CLI arguments instead of interpreting them through a shell.
- Removed stale narration before reruns and skipped the audio toolchain for text-only manifests.
- Preserved dollar-sign replacement patterns in walkthrough text and repaired nested fences in the documentation template.

## 0.7.0 - 2026-08-18

### Changed

- Added explicit plugin catalog metadata and automated validation for skills, strict plugin configuration, and version synchronization.
- Made `pr-walkthrough` explicitly user-invoked in Claude and Codex, with portable relative resource paths and documented runtime compatibility.
- Added checkable workflow completion criteria across the skills.
- Replaced remaining Discord sibling `<skill-root>` placeholders with skill-root-relative references.

## 0.6.0 - 2026-08-16

### Added

- Added the portable `discord-community-server` skill with guarded setup and audit workflows, private-cohort operations, forum and Server Guide guidance, asset handling, and real-member verification.
