# Release card workspace

This offline workspace generates one local release card. It uses Bun to run
TypeScript and has no package dependencies or installation step. Run commands
from this workspace root, the directory containing `card.ts` and `configs/`.
No documentation build, sidebar, or external service is configured. Pages are
plain Markdown; link new guides from this README.

## Generate a card

[Generate the release team's local release card](guide.md) for the fresh-copy procedure and saved-file verification.

The release team uses `configs/release.json`; `configs/preview.json` is for
preview cards. There is no default config. Config and output paths resolve
against the current working directory, not the script or config directory.

Copy `configs/release.example.json` to `configs/release.json` before generating
a release card. This local selected config is absent in a fresh copy. It
contains no secrets. Keep its supplied prefix and version for the release.

Run `bun card.ts generate --config configs/release.json --write` to write
`generated/release.txt`. Without `--write`, generation is a dry run: it prints
the planned label but creates no artifact. Use `--write` when updating the
card, rather than mistaking a successful dry run for a saved result.

Run `bun card.ts verify --config configs/release.json` to read the saved file
and compare its complete content with the selected config. Success prints
`verified generated/release.txt: release-2.4.0`. A missing or different card
fails with a nonzero exit. The saved content is `release-2.4.0` and a newline.

`card.ts` is the CLI entry point and implementation. These commands are its
usage contract; it accepts only `generate` or `verify`, a required `--config`
path, and optional `--write` for generation.
