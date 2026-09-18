# Make your first local release label

In this tutorial, we'll use [`releaseLabel`](README.md#release-label-fixture) to turn a version into text for display. You'll print `v2.4.0`, then change the prefix to print `Release 2.4.0`.

This exercise runs locally. It formats text; it does not publish a release or create a version-control tag.

## Before you start

Have Bun available, a terminal, and a text editor. You only need to know how to save a file and run a terminal command.

Open your terminal in the supplied package folder. You should see `package.json`, `index.ts`, and `release-label.ts` there. Keep that folder as your working directory throughout the lesson. No dependency installation is needed.

## 1. Create a file for your first label

Create `first-label.ts` beside `index.ts` and save this code:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel('2.4.0'));
```

The import brings the function into your file through the package's public entry point. The function returns a label, and `console.log` prints it in your terminal.

## 2. Print the label

Run your saved file from the package folder:

```sh
bun run first-label.ts
```

You should see `v2.4.0`. The `v` is the default prefix: the text placed before your version.

If Bun cannot find the file, check that you saved `first-label.ts` beside `index.ts` and opened your terminal in that folder.

## 3. Change the prefix

Replace the contents of `first-label.ts` with this code and save it:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel('2.4.0', { prefix: 'Release ' }));
```

The second argument sets the prefix for this call. Keep the space after `Release` inside the quotes. It separates the word from the version.

## 4. Print the changed label

Run the same file again:

```sh
bun run first-label.ts
```

You should now see `Release 2.4.0`. You kept the version `2.4.0` and changed the text before it by passing the `prefix` option.

## Next steps

Change `'Release '` to `'Preview '` in your file. Before running it, predict the label. Run it again and check for `Preview 2.4.0`.
