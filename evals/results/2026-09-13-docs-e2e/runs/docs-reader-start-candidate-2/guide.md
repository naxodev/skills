# Generate the release team's local release card

Generate `generated/release.txt` from a fresh copy of this workspace, then
verify its saved content against the release configuration.

## Before you start

- Have Bun installed and available as `bun` in your shell. This workspace has
  no package dependencies or installation step.
- Open a shell in the workspace root, the directory containing `card.ts` and
  `configs/`. Run all commands below there: configuration and output paths
  resolve against your current working directory.

## Generate the card

1. **Create the local release configuration.** A fresh copy does not contain
   `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-` and version `2.4.0`. The release team
   uses this configuration; `configs/preview.json` produces preview cards.
   There is no default configuration.

2. **Write the release card.**

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   The command creates the output directory if needed and writes
   `generated/release.txt`, replacing any existing content. Expect:

   ```text
   wrote generated/release.txt: release-2.4.0
   ```

   Keep `--write`: omitting it prints a dry-run label but creates no artifact.

## Verify the saved card

Run the verifier with the same release configuration:

```sh
bun card.ts verify --config configs/release.json
```

Success exits with code `0` and prints:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the
configuration. The expected content is `release-2.4.0` followed by a newline.
A missing or different card fails with a nonzero exit code. If verification
fails, repeat the write step with `configs/release.json`, then verify again.

## Next steps

- [Release card workspace and CLI contract](README.md#cli-contract)
