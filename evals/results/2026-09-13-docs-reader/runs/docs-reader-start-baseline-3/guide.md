# Generate the release team's local release card

Generate `generated/release.txt` from a fresh copy of this workspace, then verify its saved content against the release configuration.

## Before you start

- Have Bun available in your terminal. This workspace has no package dependencies or installation step.
- Open a terminal at the workspace root: the directory containing `card.ts` and `configs/`. Run every command below there. Config and output paths resolve against your current working directory.

## Generate the card

1. **Create the local release configuration.** The release team uses `configs/release.json`, which is absent in a fresh copy. Copy the supplied example:

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix, version, and output path. The example selects `release-`, `2.4.0`, and `generated/release.txt`. Use this release configuration; `configs/preview.json` produces a preview card. There is no default configuration.

2. **Write the release card.** Include `--write` to save the file:

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. The command creates the output directory if needed and writes the file, replacing any existing content. Without `--write`, it only prints a dry-run message and does not save a card.

## Verify the saved card

Run the verifier with the same release configuration:

```sh
bun card.ts verify --config configs/release.json
```

Expect exit code `0` and this message:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content against the selected configuration. Success confirms that `generated/release.txt` contains exactly `release-2.4.0` followed by a newline.

If the file is missing or its content differs, verification exits with code `1`. Run the write command in step 2, then verify again. A successful dry run is not evidence that the saved card is correct.

## Next steps

- [CLI usage contract](README.md#cli-usage-contract)
