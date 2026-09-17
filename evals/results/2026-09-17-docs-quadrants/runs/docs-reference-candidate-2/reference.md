# releaseLabel

Formats a release label by joining a prefix and a trimmed version string.
The public entry point is `index.ts`, as declared by `package.json`.

## Signature

TypeScript declaration (signature notation):

```ts
export function releaseLabel(
  version: string,
  options?: { prefix?: string },
): string;
```

## Parameters

| Parameter | Type | Required | Default | Behavior |
| --- | --- | --- | --- | --- |
| `version` | `string` | Yes | None | Trimmed with JavaScript `String.prototype.trim()`. Must be nonblank after trimming. |
| `options` | `{ prefix?: string }` | No | `{}` | Omission or `undefined` uses the default object. |
| `options.prefix` | `string` | No | `'v'` | Prepended unchanged. Omission or `undefined` uses `'v'`. An empty string removes the prefix. |

`prefix` is the only supported option. The function does not validate semantic
version syntax. Any nonblank string is accepted, including an existing `v`
prefix. Internal whitespace in `version` is preserved.

The implementation uses `options.prefix ?? 'v'`, so a `null` prefix also falls
back to `'v'` at runtime. `null` is outside the declared TypeScript contract.

## Returns and effects

Returns a string containing the resolved prefix immediately followed by the
trimmed version. It inserts no separator and does not remove an existing prefix.
Whitespace in the prefix is preserved.

The call is synchronous. It does not mutate the options object or perform I/O.

## Errors

An empty or whitespace-only `version` throws an `Error` with the exact message
`version must not be blank`. This check runs before the function reads `prefix`.

The function does not coerce `version` to a string or validate argument types.
Arguments outside the declared types can produce JavaScript `TypeError`s;
their messages are not defined by this package.

## Examples

Call expressions below assume `releaseLabel` is imported from the public entry
point. They are lookup examples, not a setup procedure.

Import notation for a TypeScript file in this workspace's root:

```ts
import { releaseLabel } from './index.ts';
```

| Call | Result | Contract illustrated |
| --- | --- | --- |
| `releaseLabel(' 2.4.0 ')` | `'v2.4.0'` | Trims the version and defaults the prefix. |
| `releaseLabel('2.4.0', undefined)` | `'v2.4.0'` | Defaults an explicit `undefined` options argument. |
| `releaseLabel('2.4.0', {})` | `'v2.4.0'` | Defaults an omitted prefix. |
| `releaseLabel('2.4.0', { prefix: undefined })` | `'v2.4.0'` | Defaults an explicit `undefined` prefix. |
| `releaseLabel('2.4.0', { prefix: 'Release ' })` | `'Release 2.4.0'` | Preserves prefix whitespace. |
| `releaseLabel('2.4.0', { prefix: '' })` | `'2.4.0'` | Accepts an empty prefix. |
| `releaseLabel('v2.4.0')` | `'vv2.4.0'` | Does not detect an existing prefix. |
| `releaseLabel(' next build ')` | `'vnext build'` | Accepts non-semantic versions and preserves internal whitespace. |
| `releaseLabel('')` | Throws `Error('version must not be blank')` | Rejects an empty version. |
| `releaseLabel(' \t\n ')` | Throws `Error('version must not be blank')` | Rejects a whitespace-only version. |
