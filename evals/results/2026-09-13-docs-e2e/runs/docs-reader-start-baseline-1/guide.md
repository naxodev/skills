# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its saved content against the release configuration.

## Before you start

- Have Bun available on your command path. This workspace has no package dependencies or installation step.
- Open a terminal at the workspace root, the directory containing `card.ts` and `configs/`. All commands below run there. Config and output paths resolve against your current working directory.

## Generate the card

1. **Create the selected release configuration.** A fresh copy includes the example but lacks `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix and version. The release team uses this configuration; `configs/preview.json` produces a preview card. There is no default configuration.

2. **Write the release card.** The command creates the output directory if needed.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. Without `--write`, the command only prints a dry-run result and creates no artifact.

## Verify the saved card

Run the verifier against the same configuration:

```sh
bun card.ts verify --config configs/release.json
```

Success exits with code `0` and prints:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with `release-2.4.0` followed by a newline. A missing or different file fails with a nonzero exit. If verification fails, repeat the write step with the release configuration, then verify again.

## Next steps

- [Workspace command contract](README.md#generate-a-card)
