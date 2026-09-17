# Release label fixture

This fictional package formats release labels. Its public entry point is `index.ts`.
It has no `src/`, documentation build, or sidebar.

The only option is `prefix`, a string that defaults to `v`.

Existing usage:

```ts
import { releaseLabel } from './index.ts';

console.assert(releaseLabel(' 2.4.0 ') === 'v2.4.0');
console.assert(releaseLabel('2.4.0', { prefix: 'Release ' }) === 'Release 2.4.0');
```

[releaseLabel API reference](reference.md)
