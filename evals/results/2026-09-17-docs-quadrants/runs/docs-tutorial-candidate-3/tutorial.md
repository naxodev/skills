# Make your first local release label

We’ll use this package to print `v2.4.0`, then change the prefix to print `Release 2.4.0`.
A release label here is text for display. Running this example does not publish a release or create a version-control tag.

## Before you start

You need Bun installed, a terminal, and a text editor. No prior TypeScript knowledge is required.
Start with a local copy of the supplied package and open your terminal in its root folder.
This folder contains `package.json`, `index.ts`, and `release-label.ts`.
We’ll add one file, `label-example.ts`; start with that filename unused.
The example needs no dependency installation or network access.

## 1. Check Bun

Run this in the package root:

```sh
bun --version
```

You should see a version number. If the terminal cannot find `bun`, make Bun available before continuing.

## 2. Write your first label

Create `label-example.ts` in the package root and save this content:

```ts
import { releaseLabel } from './index.ts';

const label = releaseLabel(' 2.4.0 ');
console.log(label);
```

The import loads the function from the package’s public entry point.
We pass the version as text inside quotes. Keep the spaces around `2.4.0` for this first run.
`console.log` prints the returned label so we can inspect it.

## 3. Run the example

From the same folder, run:

```sh
bun label-example.ts
```

Expected output:

```text
v2.4.0
```

We supplied no prefix, so the function used `v`.
Notice that the spaces around the version disappeared: the function trims the version before adding the prefix.

## 4. Change the prefix

Replace the content of `label-example.ts` with this and save it:

```ts
import { releaseLabel } from './index.ts';

const label = releaseLabel(' 2.4.0 ', { prefix: 'Release ' });
console.log(label);
```

We kept the version the same and added a second argument, `{ prefix: 'Release ' }`.
This sets the text placed before the version. Keep the space after `Release` inside the quotes; it separates the words and number.

## 5. Run the changed example

Run the same command again:

```sh
bun label-example.ts
```

Expected output:

```text
Release 2.4.0
```

The new prefix replaced `v`, while the version stayed `2.4.0`.
We’ve now made a local release label and changed its prefix by passing an option to the same function.
