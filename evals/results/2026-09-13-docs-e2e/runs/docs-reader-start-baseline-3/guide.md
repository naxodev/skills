# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its saved content against the release configuration.

## Before you start

- Have Bun available in your terminal. This workspace has no package dependencies or installation step.
- Run all commands from the workspace root, the directory containing `card.ts` and `configs/`. Config and output paths resolve against your current working directory.

## Generate the card

1. **Create the local release configuration.** A fresh copy does not contain `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-`, version `2.4.0`, and output path `generated/release.txt`. Use this release configuration for the release team's card; `configs/preview.json` produces a preview card.

2. **Write the release card.** Pass the config explicitly because the command has no default config.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   The command creates the output directory if needed and writes the card, replacing any existing file at that path. Expect `wrote generated/release.txt: release-2.4.0`.

   Keep `--write`: without it, the command only prints a dry-run result and creates no artifact.

## Verify the saved card

Run the verifier with the same configuration:

```sh
bun card.ts verify --config configs/release.json
```

Success exits with code `0` and prints:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the configuration. The expected content is `release-2.4.0` followed by a newline. A missing or different file causes a nonzero exit. If verification fails, check the selected configuration, repeat the write step, and verify again.

## Next steps

- [Workspace overview and CLI usage contract](README.md)
