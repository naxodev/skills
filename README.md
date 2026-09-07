# skills

Agent skills in the cross-agent `SKILL.md` format. Use them to operate a product community, explain a pull request, or write grounded technical documentation.

## Install

**Any agent**, via the [skills CLI](https://github.com/vercel-labs/skills) (browse the ecosystem at [skills.sh](https://skills.sh)):

```bash
npx skills add naxodev/skills
```

Add `-a <agent>` to target a specific agent, e.g. `-a opencode` or `-a claude-code`.

**Claude Code**, as a plugin:

```text
/plugin marketplace add naxodev/skills
/plugin install skills@naxodev
```

## Skills

| Skill | Use it for | Output | Invocation |
| --- | --- | --- | --- |
| [`discord-community-server`](skills/discord-community-server) | Plan, audit, improve, or launch a product community | Operating plan, approved configuration changes, and verification report | Automatic when relevant |
| [`pr-walkthrough`](skills/pr-walkthrough) | Explain the motivation and mechanics of a PR | One self-contained HTML file, with optional narration | Explicit request |
| [`writing-technical-docs`](skills/writing-technical-docs) | Write or improve how-to guides, tutorials, reference, and explanations | Documentation grounded in source or authoritative evidence, with verification results | Automatic when relevant |

Automatic invocation depends on the host agent. The walkthrough disables implicit invocation in its Claude and Codex metadata.

## Try a skill

- **Discord:** “Audit our beta community's roles and onboarding. Report gaps without changing the server.”
- **PR walkthrough:** “Use pr-walkthrough for PR #42. Make it text-only and explain the trade-offs.”
- **Technical docs:** “Write a how-to for this package's public API. Read the exports and verify the example.”

See the [sample walkthrough](examples/README.md), including downloadable HTML and its editable manifest.
It uses a fictional PR and requires no GitHub account to view.

## Requirements

- **Discord:** repository and product context; official documentation access for current capabilities. Live configuration needs a human-authenticated browser session, approved changes, and human-operated member checks. Offline audits report unavailable checks as untested.
- **PR walkthrough:** Node.js 22+, authenticated GitHub CLI (`gh`), and an agent with subagent support. Install optional rendering and audio dependencies with `bun install` in `skills/pr-walkthrough/scripts/`. Audio also needs `ffmpeg` with `libmp3lame`; the first audio run downloads the model. Missing optional dependencies produce text or plain-code fallbacks.
- **Technical docs:** access to relevant source, configuration, or authoritative external documentation. Verification uses the project's available checks and reports any blocked live-service checks.

## Development setup

Use Node.js 22+ and Bun 1.3.7. Install the contributor dependencies from the repository root:

```bash
bun install --frozen-lockfile
bun install --frozen-lockfile --cwd skills/pr-walkthrough/scripts
npm install --global skills-ref@0.1.5 @anthropic-ai/claude-code@2.1.233
```

The root dependencies provide linting, type checking, and catalog checks. The skill has its own lockfile so installed copies can set up their bundled scripts independently.

Run all required checks:

```bash
bun run check
```

This runs strict JavaScript/TypeScript checking, lint, deterministic tests, catalog and local Markdown link checks, skill metadata validation, and strict plugin validation.
To run metadata and catalog validation alone, use `bash scripts/validate.sh`.

Run `bun run sample` to rebuild the sample HTML. No audio synthesis is needed.
For instruction changes, follow the [behavior evaluation guide](evals/README.md). Those evaluations require fresh agent sessions and evidence-based review; CI does not claim a model behavior pass rate.

## Contributing

Contributors should follow the repository contract in [AGENTS.md](AGENTS.md).
See [conceptual improvement ideas](docs/skill-design-ideas.md) for proposed experiments and ways to measure their value.
