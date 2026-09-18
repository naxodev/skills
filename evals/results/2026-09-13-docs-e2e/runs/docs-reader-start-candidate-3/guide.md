# Generate the release team's local release card

Generate `generated/release.txt` from the supplied release configuration, then verify the saved content. Run this procedure from a fresh copy of the workspace.

## Before you start

- Have Bun available on your command path. This workspace has no package dependencies or installation step.
- Open a terminal in the workspace root, the directory containing `card.ts` and `configs/`. Config and output paths resolve against your current working directory.

## Generate the card

1. **Create the local release config.** A fresh copy has no `configs/release.json`. Copy the supplied example and keep its prefix and version:

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Use this release config for the release team's card. `configs/preview.json` produces a preview card instead; the CLI has no default config.

2. **Write the release card.** The command creates the output directory if needed and writes the selected card:

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. Keep `--write`: without it, the command prints a dry run and saves no artifact. Rerunning this command overwrites the card with the selected configuration's content.

## Verify the saved card

Run the verifier against the same config:

```sh
bun card.ts verify --config configs/release.json
```

Expect an exit status of zero and this message:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the selected config. For the supplied release config, the file must contain `release-2.4.0` followed by one newline. A missing or different file fails with a nonzero exit status. If verification fails, rerun the write step from the workspace root, then verify again.

## Next steps

- [Workspace and CLI usage contract](README.md#cli-usage-contract)
