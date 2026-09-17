# Make your first local release label

In this tutorial, we'll use [`releaseLabel`](README.md#release-label-fixture) to turn a version into a display label. You'll print `v2.4.0`, then change the prefix to print `Release 2.4.0`. This formats text locally; it does not publish a release.

## Start in the package folder

You'll need Bun, a terminal, and a text editor. No package installation or account is needed for this package.

Open your terminal in the supplied package folder. You should see `package.json`, `index.ts`, and `release-label.ts` there. Keep that folder as your terminal's working directory throughout the lesson.

Check that Bun is available:

```sh
bun --version
```

You should see a version number. If the terminal cannot find `bun`, make Bun available before continuing.

## 1. Create your first label

Create a file named `label.ts` beside `index.ts`, and save this code in it:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 '));
```

The import gives your file access to the package's function. The quoted text is our version. We've included spaces around it so you can see what happens to them.

## 2. Run the file

Run this command from the same package folder:

```sh
bun run label.ts
```

You should see:

```text
v2.4.0
```

You've made your first label. The function removed the surrounding spaces and added its default prefix, `v`.

## 3. Change the prefix

Replace the contents of `label.ts` with this code and save it:

```ts
import { releaseLabel } from './index.ts';

console.log(releaseLabel(' 2.4.0 ', { prefix: 'Release ' }));
```

The second argument supplies an option named `prefix`. Keep the space after `Release` inside the quotes. That space separates the prefix from the version.

## 4. Check your changed label

Run the same file again:

```sh
bun run label.ts
```

You should now see:

```text
Release 2.4.0
```

The version stayed the same, and your chosen prefix replaced `v`.

## Next steps

Change `Release ` to `Build ` in `label.ts`. Before running the file again, predict the output. Check that it prints `Build 2.4.0`.
