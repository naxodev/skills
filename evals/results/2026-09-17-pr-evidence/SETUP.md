# Isolation and setup record

The first `run.ts prepare` attempt stopped before creating any model session:

```text
jj new 1ec112284e8abd29db55e2be690de71d2abc6327: 1
Error: Revision `1ec112284e8abd29db55e2be690de71d2abc6327` doesn't exist
```

The source working revision had no bookmark, so the sibling Git clone did not receive it. The controller created `eval/pr-evidence-candidate`, removed its failed disposable clone, and repeated preparation. Preparation then completed before the frozen trial record and first model response. This was a setup correction, not a model retry; no prompt or instruction was changed in response to a model outcome.

Each trial keeps the repository's `tsconfig.json`, `eslint.config.mjs`, root dependencies, and nested builder dependencies. Both installs use `--frozen-lockfile`. The trial package scripts run the retained type-check, lint, and builder tests. Catalog validation is excluded in these disposable clones because catalog and documentation files are withheld. Full repository validation runs separately in the owner clone.

Other skill directories, evaluation material, examples, docs, and release-history working files are removed before launch. The jj/Git stores still contain repository history; the prompt explicitly forbids consulting it. This is working-file isolation plus a prompt boundary, not an operating-system sandbox. The exact adapted package and configuration hashes are recorded per trial.

Parents and children are asked to use local-file instructions only. Host system instructions and the installed skill catalog remain part of the common environment. Actual tool calls and read hashes determine whether an installed guide was loaded; the local-only request alone does not establish compliance.
