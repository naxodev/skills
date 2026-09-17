# releaseLabel API reference

`releaseLabel` formats a version string for display by trimming it and prepending a prefix.
It is a named export from the package's public entry point, `index.ts`.

## Import and signature

Import from the workspace root:

```ts
import { releaseLabel } from './index.ts';
```

TypeScript signature (the implementation defaults `options` to `{}`):

```ts
export declare function releaseLabel(
  version: string,
  options?: { prefix?: string },
): string;
```

## Parameters and defaults

| Parameter | Type | Required | Behavior |
| --- | --- | --- | --- |
| `version` | `string` | Yes | Removes leading and trailing whitespace with `String.prototype.trim()`. Rejects an empty result. |
| `options` | `{ prefix?: string }` | No | Defaults to `{}` when omitted or `undefined`. |
| `options.prefix` | `string` | No | Defaults to `'v'` when omitted or `undefined`. An empty string suppresses the prefix. |

`prefix` is the only option. Its whitespace is preserved. The function inserts no separator between the prefix and version.

## Return value

Returns a string containing the prefix followed by the trimmed version. Interior whitespace in the version is preserved.
The function does not validate semantic-version syntax or remove an existing prefix from the version.

## Errors

If `version.trim()` is empty, the function throws an `Error` with the exact message `version must not be blank`.
This includes both `''` and whitespace-only strings.

The TypeScript contract requires a string version and an options object when supplied. The implementation does not perform general runtime type validation.

## Examples

These calls use the public entry point from the workspace root:

```ts
import { releaseLabel } from './index.ts';

releaseLabel(' 2.4.0 ');                       // 'v2.4.0'
releaseLabel('2.4.0', { prefix: 'Release ' }); // 'Release 2.4.0'
releaseLabel('2.4.0', { prefix: '' });         // '2.4.0'
releaseLabel('2.4.0', { prefix: undefined });  // 'v2.4.0'
releaseLabel(' nightly build ');              // 'vnightly build'
releaseLabel('v2.4.0');                       // 'vv2.4.0'
releaseLabel(' \t\n ');                      // throws Error: version must not be blank
```

## Next steps

See the [package overview](README.md) for the supplied package context.
