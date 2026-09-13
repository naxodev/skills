# Source grounds and reviewer judgments

## Release card

The new [fixture README](../../fixtures/docs-reader/README.md) is the usage
contract. It supplies facts that the older `docs-local-api` fixture does not:
an absent selected config, working-directory-dependent paths, and a dry run
that succeeds without creating the requested artifact.

- “Run commands from this workspace root, the directory containing `card.ts`
  and `configs/`.” The implementation reads the supplied paths directly.
- “Copy `configs/release.example.json` to `configs/release.json` before
  generating a release card.” The selected config is absent in the frozen copy.
- “Without `--write`, generation is a dry run: it prints the planned label but
  creates no artifact.” The [implementation](../../fixtures/docs-reader/card.ts)
  writes only in its `--write` branch.
- “Success prints `verified generated/release.txt: release-2.4.0`.” Verification
  reads the file and compares its complete content to the selected label plus
  a newline. Successful process exit alone is insufficient.

The pre-session probe demonstrated missing-config and wrong-directory failures,
dry-run non-persistence, separate preview output, saved release success, and
mismatch rejection. Each final guide names Bun and the root, copies the release
example, selects the release config, includes `--write` with its reason, and
provides the verifier and expected result. Independent replay started in a
fresh fixture root with Bun available. All six guides needed no hidden setup
and produced exactly `release-2.4.0\n`.

These are source-rich instructions for one small task. The source already gives
the correct recipe. Equal scores here do not establish improved prerequisite
discovery in a larger or poorly documented repository.

## Incident history

The existing [decision record](../../fixtures/operations.md) is unchanged:

> Accepted decision: the issue tracker stores incident timelines and follow-up work.
> Chat carries live coordination and links to the tracker.

> The team needs a timeline that survives channel cleanup and staff changes.
> The decision does not promise a response time or permanent retention by the chat provider.

All six explanations distinguish current coordination from later history and
follow-up. They connect continuity to cleanup and staff changes without adding
setup steps. References to later readers and handover are reasonable implications
of that stated need, not new staffing policies. Pages that say the decision
specifies no tracker retention period accurately describe the record's limit;
they do not guarantee permanent tracker retention. No page invents a response
commitment or retention guarantee.

## Verification limits

The author transcripts, not their closing claims, establish command execution.
All six how-to authors executed the recipe and checked saved content. Two
concept authors rendered both their explanation and README with Glow. Ten
authors left rendered inspection untested and handed off drafts. Glow existed
in the environment, so their claims that no viewer was available were not
established. The reader-contract change did not fix this discovery problem.

One baseline how-to and one candidate how-to hit the unavailable `Bun.markdown`
API. A candidate concept run recovered from that error by using Glow. Another
candidate how-to initially failed to extract indented code fences, corrected
its extraction within the same session, and then executed the recipe. These
were ordinary author workflow errors, not discarded sessions or resamples.

The owner separately checked local links and rendered every page and README.
Those checks do not retroactively count as model workflow compliance. Build,
sidebar, and live-service checks are not applicable to these fixtures. Concept
pages have no procedural examples to execute.
