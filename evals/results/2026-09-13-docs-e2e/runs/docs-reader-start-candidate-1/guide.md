# Generate the release team's local release card

Generate `generated/release.txt` from a fresh copy of this workspace, then verify its saved content against the release configuration.

## Before you start

- Have Bun available on your command path. This workspace has no package dependencies or installation step.
- Open a terminal at the workspace root, the directory containing `card.ts` and `configs/`. Run every command below there: configuration and output paths resolve against your current working directory.

## Generate the card

1. **Create the selected release configuration.** A fresh copy does not contain `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix `release-`, version `2.4.0`, and output path `generated/release.txt`. The configuration contains no secrets. Use this release configuration; `configs/preview.json` generates preview cards. The CLI has no default configuration.

2. **Write the release card.** Include `--write`; without it, generation only prints a dry-run label and creates no artifact.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   The command creates the output directory if needed and writes `generated/release.txt`. It replaces the file if it already exists.

## Verify the saved card

Run the verifier with the same selected configuration:

```sh
bun card.ts verify --config configs/release.json
```

Expect exit status `0` and this output:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and compares its complete content with the configuration. Success confirms that `generated/release.txt` contains `release-2.4.0` followed by a newline. A missing or different file fails with a nonzero exit status. If verification fails, check the selected configuration, repeat the write step, and verify again.

## Next steps

- [Workspace overview and CLI usage contract](README.md)
