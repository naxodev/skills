# releaseLabel API reference

`releaseLabel` formats a version string as a display label. It is a named export from the package's public entry point, `index.ts`.

## Signature

TypeScript signature (notation):

```ts
releaseLabel(version: string, options?: { prefix?: string }): string
```

## Parameters

| Parameter | Type | Default | Contract |
| --- | --- | --- | --- |
| `version` | `string` | Required | Leading and trailing whitespace is removed with `String.prototype.trim()`. A blank result throws. Internal whitespace is preserved. No semantic-version validation is performed. |
| `options` | `{ prefix?: string }` | `{}` | Optional. Omitting it or passing `undefined` uses the default object. |
| `options.prefix` | `string` | `'v'` | Prepended without trimming or an added separator. An empty string suppresses the prefix. Omitting the property or setting it to `undefined` uses `'v'`. |

`prefix` is the only declared option. At runtime, the implementation uses `options.prefix ?? 'v'`, so a `null` prefix also falls back to `'v'`. The TypeScript contract does not include `null`.

## Returns and effects

Returns a string containing the resolved prefix followed immediately by the trimmed version. The function is synchronous. It does not mutate the options object or perform I/O.

## Errors

An empty or whitespace-only `version` throws an `Error` with the exact message `version must not be blank`. This check runs before the function reads `options.prefix`.

Values outside the declared types have no custom validation. For example, a non-string version without a callable `trim` method throws a native `TypeError`. Passing `null` as `options` with a nonblank version also throws a native `TypeError`.

## Examples

Runnable with Bun from the package root, using the local public entry point:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 '));
console.log(releaseLabel('2.4.0', { prefix: 'Release ' }));
console.log(releaseLabel('2.4.0', { prefix: '' }));
console.log(releaseLabel(' nightly build '));

try {
  releaseLabel(' \t\n ');
} catch (error) {
  if (!(error instanceof Error)) throw error;
  console.log(error.message);
}
```

Output:

```text
v2.4.0
Release 2.4.0
2.4.0
vnightly build
version must not be blank
```
