# Make your first local release label

In this tutorial, we’ll use the supplied package to print `v2.4.0`, then change its prefix to print `Release 2.4.0`. A release label here is a string for display. Running the example does not publish a release or create a version-control tag.

## Before you start

You need Bun installed, a terminal, and a text editor. We’ll create and edit one TypeScript file; no prior knowledge of the package is required.

Open your terminal in the supplied package directory: the folder containing `package.json`, `index.ts`, and `release-label.ts`. Run all commands below from that folder. This example needs no dependency installation or network access.

Check that Bun is available:

```sh
bun --version
```

You should see a version number. If your terminal cannot find `bun`, make Bun available before continuing.

## 1. Create the example file

Create a new file named `label-example.ts` beside `index.ts`, and save this code in it:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 '));
```

The import loads `releaseLabel` through the package’s public entry point. We pass the version as text inside quotes. Keep the spaces around `2.4.0` for now so we can see how the function handles them.

## 2. Print the first label

Run the file:

```sh
bun run label-example.ts
```

You should see:

```text
v2.4.0
```

We did not supply a prefix, so the function used `v`. It also removed the spaces around the version. `console.log` makes the returned string visible in the terminal.

## 3. Change the prefix

Replace the contents of `label-example.ts` with this code and save the file:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 ', { prefix: 'Release ' }));
```

We added a second argument, `{ prefix: 'Release ' }`, to choose the text before the version. Keep the space after `Release` inside the quotes: it separates the prefix from the version.

## 4. Check the changed label

Run the same file again:

```sh
bun run label-example.ts
```

You should now see:

```text
Release 2.4.0
```

The version stayed the same, but our chosen prefix replaced `v`. We’ve now made a local release label and changed its prefix by editing the function call.
