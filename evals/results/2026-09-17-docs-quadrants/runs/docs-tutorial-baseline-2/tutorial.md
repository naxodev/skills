# Make your first local release label

In this tutorial, we’ll print `v2.4.0`, then change its prefix to print
`Release 2.4.0`. A release label here is display text. These steps run locally
and do not create a Git tag or publish a release.

## Before you start

Have Bun available, a terminal, and a text editor. Open the terminal in the
supplied package folder: the folder containing `package.json`, `index.ts`,
and `release-label.ts`. No dependency installation or network access is needed.

You’ll create one TypeScript file beside `index.ts`. You do not need prior
experience with this package; copy each example in order.

## 1. Create a label script

Create `first-label.ts` in the package folder and save this code:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 '));
```

The import loads [`releaseLabel`](README.md#release-label-fixture) from the
package’s public entry point. `console.log` prints the returned text in your
terminal. Keep the spaces around `2.4.0` for now so we can see what happens to them.

## 2. Print your first label

Run this command from the same package folder:

```sh
bun run first-label.ts
```

You should see:

```text
v2.4.0
```

Notice that the spaces around the version are gone. The function trims them
and adds the default prefix, `v`. You have made your first local release label.

If Bun cannot find `first-label.ts`, check that you saved it beside `index.ts`
and opened your terminal in that folder before continuing.

## 3. Change the prefix

Replace the contents of `first-label.ts` with this code and save it:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 ', { prefix: 'Release ' }));
```

The second argument, `{ prefix: 'Release ' }`, selects the text to place before
the version. Keep the space after `Release` inside the quotes. It separates
the word from the version in the result.

## 4. Check the changed label

Run the script again:

```sh
bun run first-label.ts
```

You should now see:

```text
Release 2.4.0
```

Compare this with `v2.4.0`: the version stays the same, but your chosen prefix
replaces `v`. We’ve now printed a label with both the default and a custom prefix.

## Next steps

Try changing `Release ` to `Build ` in `first-label.ts`. Before running the
script, predict the result. You should see `Build 2.4.0`.

Return to the [package README](README.md) to see its existing usage examples.
