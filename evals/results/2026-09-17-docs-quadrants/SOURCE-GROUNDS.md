# Source grounds

All authors receive the same four files from `evals/fixtures/docs-package`.
The fixture's `package.json` declares `"exports": "./index.ts"`.
The entire public barrel is:

```ts
export { releaseLabel } from './release-label.ts';
```

The implementation is:

```ts
/** Format a release label for display. Blank versions are rejected. */
export function releaseLabel(version: string, options: { prefix?: string } = {}): string {
  if (!version.trim()) throw new Error('version must not be blank');
  return `${options.prefix ?? 'v'}${version.trim()}`;
}
```

The README identifies the public entry point and provides two actual usage
assertions: a whitespace-padded version produces `v2.4.0`; a `Release ` prefix
produces `Release 2.4.0`. It states that no `src/`, docs build, or sidebar exists.

## Contract distinctions

- The required version is a string. Trimming happens before the blank check
  and in the return expression. Internal whitespace and version syntax receive
  no extra validation.
- The options argument can be omitted or undefined because it defaults to `{}`.
  Its only field is the optional string `prefix`.
- Missing or undefined `prefix` gives `v`. An empty prefix remains empty.
  Prefix whitespace is preserved; trimming applies to the version only.
- The function returns a string. It does not write a file, publish a release,
  change the supplied options, or contact a service.
- Empty and whitespace-only versions throw `Error` with the exact message
  `version must not be blank`, even with a nonempty prefix.
- Runtime `??` also falls back for a null prefix, but the declared field is
  `string | undefined`. This does not make null part of the supported contract.
  A null options object is also outside the declared contract.

The pre-session probe imports from the public `index.ts`, rather than copying
the implementation. [source-probe.json](source-probe.json) records thirteen
observations checked against independently specified expected results. These
are experimental source checks, not permanent implementation-mirroring tests.

Frozen author inputs, both instruction sets, and exact prompts are hashed in
[freeze.json](freeze.json). The runner checks each immutable file after drafting.
