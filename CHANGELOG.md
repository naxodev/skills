# Changelog

This file records notable user-facing changes to the skills collection.

## Unreleased

### Added

- Recorded a nine-run PR walkthrough evidence experiment, including failed candidate patches and per-run findings.
- Added a cache-unit conflict fixture and a frozen three-stage walkthrough evaluation protocol, with a twelve-trial comparison and recorded factual and prose-quality defects.
- Added a lock-cleanup fixture, explicit guarantee and reader-facing criteria, and a counterexample/replay protocol with recorded first-pass and quotation-repair results.
- Added a source-linked final narrative audit protocol and local `audit` command, with masked before/after reviews comparing two audit models on identical saved drafts.
- Prepared a same-model final-audit experiment with retry, transaction, and cache fixtures, deterministic probes, and title-only control defects. Recorded external grader authentication failures and unrun model counts.

### Changed

- Clarified evaluation isolation, exact skill-version checks, and reporting of skipped workflow steps after observing rubric leakage in an excluded setup run.
- Added reader-facing walkthrough style rules after an isolated writer comparison: preserve meaningful qualifications while keeping internal review IDs and drafting instructions out of the essay.

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
