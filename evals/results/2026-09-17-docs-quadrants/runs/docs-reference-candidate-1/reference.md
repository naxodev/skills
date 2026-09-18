# releaseLabel API reference

`releaseLabel` formats a version string for display. It is a named export from the package entry point, `index.ts`.

## Signature

TypeScript signature (declaration notation):

```ts
releaseLabel(version: string, options?: { prefix?: string }): string;
```

## Parameters

| Parameter | Type | Default | Contract |
| --- | --- | --- | --- |
| `version` | `string` | Required | Trimmed with JavaScript `String.prototype.trim()`. An empty result throws. No semantic-version validation applies. |
| `options` | `{ prefix?: string }` | `{}` | May be omitted or passed as `undefined`. |
| `options.prefix` | `string` | `'v'` | Prepended verbatim. An omitted or `undefined` prefix uses `'v'`. An empty string suppresses the prefix. |

`prefix` is the only supported option. The function does not trim the prefix or insert a separator.

## Returns and effects

Returns a string synchronously: the resolved prefix followed by `version.trim()`.
Internal whitespace in the version remains unchanged. Any nonblank string is accepted, including `'next'` or `'1.0 beta'`.

The function performs no I/O and does not mutate the options object.

## Errors and runtime edge cases

- An empty or whitespace-only `version` throws `Error` with the exact message `version must not be blank`.
- Validation of `version` happens before the function reads `options.prefix`.
- The implementation does not check argument types at runtime. A missing, `null`, or numeric version causes a native `TypeError` when `.trim()` is called.
- With a valid string version, passing `null` as `options` causes a native `TypeError` when the function reads `prefix`.
- A `null` prefix resolves to `'v'` at runtime because the implementation uses `??`. `null` is outside the declared string type under TypeScript strict null checking.

Native `TypeError` messages depend on the runtime; the package does not define their text.

## Examples

Runnable with Bun from the package root, using the public entry point:

```sh
bun --eval '
import { releaseLabel } from "./index.ts";

console.log(releaseLabel(" 2.4.0 "));
console.log(releaseLabel("2.4.0", { prefix: "Release " }));
console.log(releaseLabel("2.4.0", { prefix: "" }));
console.log(releaseLabel("next", undefined));
console.log(releaseLabel("1.0 beta", { prefix: undefined }));

try {
  releaseLabel(" \t\n ");
} catch (error) {
  if (!(error instanceof Error)) throw error;
  console.log(`${error.name}: ${error.message}`);
}
'
```

Expected output:

```text
v2.4.0
Release 2.4.0
2.4.0
vnext
v1.0 beta
Error: version must not be blank
```
