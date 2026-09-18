# Generate the release team's local release card

Generate `generated/release.txt` from a fresh workspace copy, then verify its saved content against the release configuration.

## Before you start

- Have Bun available in your terminal. This workspace has no package dependencies or installation step.
- Run all commands from the workspace root, which contains `card.ts` and `configs/`. Config and output paths resolve from your current working directory.

## Generate the card

1. **Create the selected release config.** A fresh copy includes the example but lacks `configs/release.json`.

   ```sh
   cp configs/release.example.json configs/release.json
   ```

   Keep the supplied prefix and version. Use this release config for the release team's card; `configs/preview.json` produces a preview card.

2. **Write the release card.** Pass `--write` to save the artifact. Without it, generation only prints a dry-run message.

   ```sh
   bun card.ts generate --config configs/release.json --write
   ```

   The command creates the output directory if needed and writes `generated/release.txt`, replacing any existing content. Expect:

   ```text
   wrote generated/release.txt: release-2.4.0
   ```

## Verify the saved card

Run the verifier with the same release config:

```sh
bun card.ts verify --config configs/release.json
```

Expect an exit code of zero and this message:

```text
verified generated/release.txt: release-2.4.0
```

The verifier reads the saved file and checks its complete content: `release-2.4.0` followed by one newline. A missing or different file fails with a nonzero exit code. If verification fails, check that you used the release config and ran generation with `--write`, then repeat generation and verification.

## Next steps

- [CLI usage contract](README.md#cli-usage-contract)
