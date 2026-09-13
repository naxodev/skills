# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its
saved content against the release configuration.

## Before you start

- Have Bun available on your `PATH`. This workspace has no package dependencies
  or installation step.
- Open a terminal in the workspace root: the directory containing `card.ts`
  and `configs/`. Run all commands below there. Config and output paths resolve
  against your current working directory.

The process runs offline and needs no credentials or external services.

## Generate the card

1. **Create the local release configuration.** A fresh copy includes the
   example but lacks `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-`, version `2.4.0`, and output path
   `generated/release.txt`. The release team uses this configuration;
   `configs/preview.json` produces a preview card. There is no default config.

2. **Write the release card.** The command creates the output directory if
   needed and writes the card, replacing any existing file at the output path.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. Keep `--write`:
   omitting it prints a dry-run result without saving the card.

## Verify the saved card

Run the verification command with the same configuration:

```sh
bun card.ts verify --config configs/release.json
```

Success exits with code `0` and prints:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the
configuration. The expected content is `release-2.4.0` followed by one newline.
A missing or different card causes a nonzero exit. If verification fails after
a dry run or because the card differs, rerun the write command and verify again.

## Next steps

- [CLI usage contract](README.md#cli-usage-contract)
