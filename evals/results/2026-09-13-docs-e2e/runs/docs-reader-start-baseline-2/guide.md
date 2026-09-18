# Generate the release team's local release card

Generate `generated/release.txt` from the supplied release configuration, then verify the saved card against that configuration.

## Before you start

- Have Bun installed and available as `bun` in your terminal. No package installation is required.
- Open a terminal at this workspace's root, the directory containing `card.ts` and `configs/`. Run every command below there. Configuration and output paths resolve against your current working directory.

## Generate the card

1. **Create the selected release configuration.** A fresh copy does not contain `configs/release.json`. Copy the supplied example and keep its prefix and version unchanged. The release team uses this configuration; `configs/preview.json` produces a preview card instead.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

2. **Write the release card.** Include `--write`: without it, the command only prints a dry-run message and creates no artifact.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   Expect `wrote generated/release.txt: release-2.4.0`. The command creates the output directory if needed and writes the card, replacing any existing file at that path.

## Verify the saved card

Run the verifier with the same selected configuration:

```sh
bun card.ts verify --config configs/release.json
```

Expect a zero exit status and this message:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads `generated/release.txt` and compares its complete content with the configuration. Success confirms the file contains `release-2.4.0` followed by a newline. A missing or different file causes a nonzero exit status. If verification fails, check the selected configuration and repeat the write step before verifying again.

## Next steps

- [Workspace and CLI usage contract](README.md)
