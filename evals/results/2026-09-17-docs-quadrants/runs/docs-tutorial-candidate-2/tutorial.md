# Make your first local release label

We’ll use this package to turn the version `2.4.0` into `v2.4.0`, then change it to `Release 2.4.0`.
A release label here is a string for display. Running this lesson prints text locally; it does not publish a release.

## Before you start

You need Bun installed, a terminal, and a text editor. You only need to know how to save a file and run a command.

Open your terminal in the supplied package directory. It contains `package.json`, `index.ts`, and `release-label.ts`.
Keep all commands and the new lesson file in that directory so the local import works.
No dependency installation or network access is needed.

## 1. Check Bun

Run:

```sh
bun --version
```

You should see a version number. If your terminal reports that `bun` is not found, stop here until Bun is available.

## 2. Write your first label

Create a new file named `label-lesson.ts` beside `index.ts`. Save this code in it:

```ts
import { releaseLabel } from './index.ts';

const label = releaseLabel('2.4.0');
console.log(label);
```

We import `releaseLabel` from the package’s public entry point. The function returns a string, and `console.log` prints it.

## 3. Run the file

Run:

```sh
bun run label-lesson.ts
```

Expected output:

```text
v2.4.0
```

We supplied only the version. The `v` at the start shows that the function adds its default prefix.

## 4. Change the prefix

Replace the contents of `label-lesson.ts` with the following code and save it:

```ts
import { releaseLabel } from './index.ts';

const label = releaseLabel('2.4.0', { prefix: 'Release ' });
console.log(label);
```

The second argument supplies an option named `prefix`. Keep the space after `Release` inside the quotes: it separates the prefix from the version.

## 5. Run the changed file

Run the same command again:

```sh
bun run label-lesson.ts
```

Expected output:

```text
Release 2.4.0
```

The version stays the same, but our supplied prefix replaces `v`. We’ve now made a local release label and changed its prefix.
