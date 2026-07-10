# skills

Agent skills in the cross-agent `SKILL.md` format.

## Install

**Any agent**, via the [skills CLI](https://github.com/vercel-labs/skills) (browse the ecosystem at [skills.sh](https://skills.sh)):

```bash
npx skills add naxodev/skills
```

Add `-a <agent>` to target a specific agent, e.g. `-a opencode` or `-a claude-code`.

**Claude Code**, as a plugin:

```
/plugin marketplace add naxodev/skills
/plugin install skills@naxodev
```

## Skills

| Skill | Description |
| --- | --- |
| [`pr-walkthrough`](skills/pr-walkthrough) | Generates a narrative HTML walkthrough of a pull request, with build-time syntax highlighting, palette-themed mermaid diagrams, and optional embedded audio narration. |

`pr-walkthrough`'s optional audio, diagram, and syntax-highlighting features need dependencies installed once: run `bun install` in `skills/pr-walkthrough/scripts/`. Audio narration also requires `ffmpeg` on `PATH`.

## Adding a skill

1. Create `skills/<name>/SKILL.md` with `name` and `description` frontmatter.
2. Reference any bundled files via `${CLAUDE_PLUGIN_ROOT}/skills/<name>/...` for Claude Code, with a fallback note for other agents (skill root = the directory containing the SKILL.md).
3. Bump the version in both `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json`.
