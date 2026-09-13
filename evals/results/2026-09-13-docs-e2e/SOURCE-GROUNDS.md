# Source grounds

The packets and task prompts match the original reader freeze byte for byte.
[freeze.json](freeze.json) records these checks and the tested skill hashes.

## Release card

The [fixture README](../../fixtures/docs-reader/README.md) states:

> Run commands from this workspace root, the directory containing `card.ts`
> and `configs/`.

> Copy `configs/release.example.json` to `configs/release.json` before
> generating a release card.

> Without `--write`, generation is a dry run: it prints the planned label but
> creates no artifact.

The [implementation](../../fixtures/docs-reader/card.ts), lines 10–24, reads
relative paths, constructs the configured label, writes only with `--write`,
and compares the entire saved content during verification. The release example
selects `release-2.4.0` and `generated/release.txt`; preview is a different card.
The fresh packet has no selected release configuration or generated artifact.
Therefore successful generation exit alone cannot prove the user's saved result.

## Incident history

The [decision record](../../fixtures/operations.md) states:

> Accepted decision: the issue tracker stores incident timelines and follow-up work.
> Chat carries live coordination and links to the tracker.

> The team needs a timeline that survives channel cleanup and staff changes.
> The decision does not promise a response time or permanent retention by the chat provider.

This supports an explanation of continuity and the different roles of chat and
the tracker. It does not support invented retention periods, response guarantees,
or configuration instructions. A conceptual page requires no runnable recipe.

## Renderer and applicability

The controller recorded the installed Glow binary, version, and help before
dispatch. Plain Markdown has an available terminal renderer in both arms.
An author must inspect actual formatted output to receive rendering credit.
Independent reviewer output is recorded separately and cannot repair author
verification evidence. Terminal output does not establish browser or site UI
behavior. The packets configure no documentation build or sidebar, so those
checks are not applicable with that reason. README navigation remains applicable.
