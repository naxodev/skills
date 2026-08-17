# skills

Agent skills in the cross-agent `SKILL.md` format.

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

| Skill                                                         | Description                                                                                                                                                                      |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`discord-community-server`](skills/discord-community-server) | Plans, configures, audits, and launches a secure, product-specific Discord community server with least-privilege roles, native moderation, onboarding, and bounded integrations. |
| [`pr-walkthrough`](skills/pr-walkthrough)                     | Generates a narrative HTML walkthrough of a pull request with optional embedded audio narration.                                                                                 |
| [`writing-technical-docs`](skills/writing-technical-docs)     | Opinionated playbook for writing documentation pages, anchored in the Diátaxis framework — quadrant choice, a how-to template, style rules, and a verification checklist.        |

`pr-walkthrough`'s optional audio, diagram, and syntax-highlighting features need dependencies installed once: run `bun install` in `skills/pr-walkthrough/scripts/`. Audio narration also requires `ffmpeg` on `PATH`.

## Contributing

Contributors should follow the repository contract in [AGENTS.md](AGENTS.md).
