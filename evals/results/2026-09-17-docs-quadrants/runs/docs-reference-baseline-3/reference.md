# releaseLabel API reference

`releaseLabel` formats a version string for display by trimming its surrounding whitespace and prepending a prefix.

## Import and signature

The named export is available through `index.ts`, the public entry point of `release-label-fixture`.
From a file in this workspace's root:

```ts
import { releaseLabel } from './index.ts';
```

TypeScript signature (declaration only):

```ts
declare function releaseLabel(
  version: string,
  options?: { prefix?: string },
): string;
```

## Parameters and defaults

| Parameter | Type | Default | Behavior |
| --- | --- | --- | --- |
| `version` | `string` | Required | Uses JavaScript `String.prototype.trim()` to remove surrounding whitespace. Rejects an empty result. |
| `options` | `{ prefix?: string }` | `{}` | Omitting the argument or passing `undefined` uses the default object. |
| `options.prefix` | `string` | `'v'` | Prepends the prefix unchanged. An empty string removes the prefix; whitespace in the prefix is preserved. |

`prefix` is the only supported option. An omitted or `undefined` prefix uses `'v'`.
The implementation uses `??`, so a runtime `null` prefix also falls back to `'v'`, although `null` is outside the declared type.

## Return value

Returns a string synchronously: the prefix followed immediately by the trimmed version.
The function inserts no separator and preserves internal whitespace in the version.
It does not validate semantic versions or remove an existing prefix from the version.

## Errors

An empty or whitespace-only `version` throws an `Error` with the exact message `version must not be blank`.
The function throws before returning a label.

## Examples

These calls use the public entry point from the workspace root. Each comment shows the returned string or thrown error.

```ts
import { releaseLabel } from './index.ts';

releaseLabel(' 2.4.0 ');                         // 'v2.4.0'
releaseLabel('2.4.0', { prefix: 'Release ' });   // 'Release 2.4.0'
releaseLabel('2.4.0', { prefix: '' });           // '2.4.0'
releaseLabel('2.4.0', { prefix: undefined });    // 'v2.4.0'
releaseLabel('2.4.0', undefined);               // 'v2.4.0'
releaseLabel(' beta candidate ');               // 'vbeta candidate'
releaseLabel('v2.4.0');                         // 'vv2.4.0'

try {
  releaseLabel(' \t\n ');
} catch (error) {
  console.log(error instanceof Error ? error.message : error);
  // 'version must not be blank'
}
```

## Source

The contract comes from the supplied [implementation](release-label.ts), [public export](index.ts), and [package manifest](package.json).
The [package README](README.md) contains existing usage.
