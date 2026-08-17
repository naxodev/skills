# Contributor contract

## Adding a skill

- Keep the catalog flat: create `skills/<name>/SKILL.md`.
- Make the frontmatter `name` exactly match the containing `<name>` directory.
- For a model-invoked skill, make `description` the always-loaded pointer: say what it does and the distinct cases that should trigger it, not its procedure. A deliberately user-invoked skill instead uses a short human-facing summary.
- Keep the ordered workflow and its essential actions in `SKILL.md`. Put material needed only on a workflow branch in a sibling file, and link to it from the condition that needs it.
- Reference bundled files relative to the skill root (the directory containing `SKILL.md`), not through `${CLAUDE_PLUGIN_ROOT}` unless a script genuinely consumes that environment variable.
- End every workflow step with a checkable **Complete when** criterion.

## Catalog and release hygiene

When adding or releasing a skill, synchronize:

- the `README.md` skill table;
- the explicit `skills` list in `.claude-plugin/plugin.json`;
- the user-facing entry in `CHANGELOG.md`;
- the version in `.claude-plugin/plugin.json` and the matching plugin entry in `.claude-plugin/marketplace.json`.

After manifest edits, run `claude plugin validate . --strict` and the repository validation script (`bash scripts/validate.sh`).

Use `jj` when `.jj/` is present. Do not add AI attribution to commits.
