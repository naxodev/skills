# Preview a PR walkthrough

Download [pr-walkthrough.html](pr-walkthrough.html) and open it in a browser.
It is a text-only, self-contained example based on the fictional [PR fixture](../evals/fixtures/pr.json).
It includes the essay layout, a highlighted code excerpt, and a light/dark theme toggle.

The [manifest](pr-walkthrough.json) is the editable source. To regenerate the HTML after development setup, run `bun run sample` from the repository root.
No GitHub account, audio model, or `ffmpeg` is needed for this example.

The fixture deliberately contains a mismatch: the PR body describes an extra clock read, while the diff moves the existing check.
The sample attributes that claim to the author and explains what the code establishes.
