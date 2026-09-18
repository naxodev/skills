# Generate the local release card

Generate the release team's saved card at `generated/release.txt` from a fresh
copy of this workspace, then verify its complete content.

## Before you start

- Have Bun installed and available as `bun` in your shell. This workspace has
  no package dependencies or installation step and runs offline.
- Open a shell in the workspace root: the directory containing `card.ts` and
  `configs/`. Run every command below there. Config and output paths resolve
  against your current working directory.

## Steps

1. **Create the release config.** A fresh copy does not contain the selected
   `configs/release.json` file. Copy the supplied example without changing its
   prefix or version. Use this release config, not `configs/preview.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

2. **Write the release card.** Pass the config explicitly; there is no default.
   Include `--write` to save the file. Without it, the command only prints a
   dry-run message and creates no artifact.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect:

   ```text
   wrote generated/release.txt: release-2.4.0
   ```

   The command creates the output directory if needed and writes the card,
   replacing any existing file at that path.

## Verify

Check the saved file against the selected release config:

```sh
bun card.ts verify --config configs/release.json
```

Expect exit code `0` and:

```text
verified generated/release.txt: release-2.4.0
```

The saved file must contain exactly `release-2.4.0` followed by a newline.
Verification reads the file and compares its complete content; a missing or
different card fails with a nonzero exit code. If verification fails, confirm
you are in the workspace root, check the release config against the supplied
example, and repeat the write and verification commands.
