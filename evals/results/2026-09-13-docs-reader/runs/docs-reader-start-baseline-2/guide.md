# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its saved content against the release configuration.

## Before you start

- Have Bun available on your machine. This workspace has no package dependencies or installation step.
- Open a terminal in the workspace root, the directory containing `card.ts` and `configs/`. All config and output paths resolve from your current working directory.

## Generate the card

1. **Create the local release configuration.** A fresh copy does not include `configs/release.json`. Copy the supplied release example:

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix, version, and output path. Use this release configuration, rather than `configs/preview.json`, for the release team's card.

2. **Write the release card.** Pass the configuration explicitly; there is no default.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. The command creates the output directory if needed and writes the card, replacing any existing file at that path.

   Keep `--write`: without it, the command prints a dry-run message and creates no artifact.

## Verify the saved card

Run the verifier with the same release configuration:

```sh
bun card.ts verify --config configs/release.json
```

Expect exit code `0` and this message:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads `generated/release.txt` and compares its entire content with the configuration. The expected content is `release-2.4.0` followed by one newline.

If the file is missing or differs, verification exits with a nonzero code. Run the write command in step 2 again, then repeat verification. A successful dry run does not confirm that a saved card exists.

## Next steps

- [CLI usage contract](README.md#cli-usage-contract)
