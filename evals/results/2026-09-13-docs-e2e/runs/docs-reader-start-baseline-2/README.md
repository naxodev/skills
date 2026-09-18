# Release card workspace

This offline workspace generates one local release card. It uses Bun to run
TypeScript and has no package dependencies or installation step. Run commands
from this workspace root, the directory containing `card.ts` and `configs/`.
No documentation build, sidebar, or external service is configured. Pages are
plain Markdown; link new guides from this README.

## Generate a card

Follow [Generate the release team's local release card](guide.md) to set up
the selected configuration in a fresh copy, write the card, and verify it.

## CLI usage contract

`card.ts` is the CLI entry point and implementation. It accepts only
`generate` or `verify`, a required `--config` path, and optional `--write`
for generation. There is no default config. The local selected release
configuration contains no secrets.
