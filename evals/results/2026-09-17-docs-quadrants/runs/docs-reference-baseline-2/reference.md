# releaseLabel API reference

`releaseLabel` formats a display label by concatenating a prefix and a trimmed version string.
It is a named export from `release-label-fixture`, whose public entry point is `index.ts`.

## Import and signature

Local import from the package root:

```ts
import { releaseLabel } from './index.ts';
```

TypeScript signature:

```ts
export function releaseLabel(
  version: string,
  options?: { prefix?: string },
): string;
```

## Parameters and defaults

| Parameter | Type | Default | Behavior |
| --- | --- | --- | --- |
| `version` | `string` | Required | Uses JavaScript `String.prototype.trim()` to remove leading and trailing whitespace. Rejects an empty result. |
| `options` | `{ prefix?: string }` | `{}` | Omission or explicit `undefined` uses the default object. |
| `options.prefix` | `string` | `'v'` | Omission or `undefined` uses `'v'`. An empty string removes the prefix. Other strings are preserved exactly. |

`prefix` is the only declared option. At runtime, a `null` prefix also falls back to `'v'`
because the implementation uses `??`; `null` is not part of the declared prefix type.

## Return value

Returns a string synchronously: the resolved prefix immediately followed by `version.trim()`.
No separator is inserted. Whitespace in the prefix and inside the version is preserved.
The function does not validate semantic versions or remove an existing `v` from the version.

| Version | Options | Result |
| --- | --- | --- |
| `' 2.4.0 '` | Omitted | `'v2.4.0'` |
| `'2.4.0'` | `{ prefix: 'Release ' }` | `'Release 2.4.0'` |
| `'2.4.0'` | `{ prefix: '' }` | `'2.4.0'` |
| `'v2.4.0'` | Omitted | `'vv2.4.0'` |
| `' release candidate '` | Omitted | `'vrelease candidate'` |

## Errors

An empty or whitespace-only `version` throws an `Error` synchronously with the exact message
`version must not be blank`. A nonempty prefix does not make a blank version valid.

## Example

Runnable TypeScript from the package root:

```ts
import { releaseLabel } from './index.ts';

console.assert(releaseLabel(' 2.4.0 ') === 'v2.4.0');
console.assert(releaseLabel('2.4.0', { prefix: 'Release ' }) === 'Release 2.4.0');
console.assert(releaseLabel('2.4.0', { prefix: '' }) === '2.4.0');
```

## Next steps

Return to the [package README](README.md).
