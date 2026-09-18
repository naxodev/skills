# Generate the release team's local release card

Generate `generated/release.txt` from a fresh copy of this workspace, then verify
its saved content against the release team's config.

## Before you start

- Have Bun installed and available as `bun`. No package installation is required.
- Run all commands from the workspace root, which contains `card.ts` and `configs/`.
  Config and output paths resolve against your current working directory.

The workflow runs offline and needs no credentials or external services.

## Generate the card

1. **Create the release team's local config.** A fresh copy includes the example,
   but not `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-`, version `2.4.0`, and output
   `generated/release.txt`. Use this release config, not `configs/preview.json`.
   The CLI has no default config.

2. **Write the release card.** The command creates the output directory if needed
   and overwrites the card if it already exists.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`.
   Without `--write`, the command only prints a dry-run message and saves no card.

## Verify the saved card

Run the verifier with the same selected config:

```sh
bun card.ts verify --config configs/release.json
```

Expect exit code `0` and this output:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the config.
The release card must contain exactly `release-2.4.0` followed by a newline.
A missing or different card causes a nonzero exit. If verification fails, check
your working directory and selected config, then repeat the write and verify commands.

## Next steps

- [Workspace and CLI entry point](README.md)
