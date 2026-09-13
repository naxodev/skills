# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its saved content against the release configuration.

## Before you start

- Have Bun available on your command path. This workspace has no package dependencies or installation step.
- Open a terminal in the workspace root, the directory containing `card.ts` and `configs/`. Run every command below there. Config and output paths resolve against your current working directory.

## Generate the card

1. **Create the local release configuration.** A fresh copy includes the example but lacks `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-` and version `2.4.0`. The release team uses this configuration; `configs/preview.json` produces a preview card instead.

2. **Write the release card.** Pass the configuration explicitly; the CLI has no default config.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   The command creates the output directory if needed and writes `generated/release.txt`, replacing an existing card. Expect `wrote generated/release.txt: release-2.4.0`.

   Keep `--write`: without it, the command prints a dry-run label but saves no artifact.

## Verify the saved card

Run the verifier with the same configuration:

```sh
bun card.ts verify --config configs/release.json
```

Success exits with code `0` and prints:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and checks its complete content: `release-2.4.0` followed by a newline. A missing or different file causes a nonzero exit.

If the file is missing after a dry run, repeat step 2 with `--write`, then verify again. If verification reports `card differs: generated/release.txt`, check that you kept the supplied release configuration, then repeat step 2 and verify again.

## Next steps

- [CLI usage contract](README.md#cli-usage-contract)
