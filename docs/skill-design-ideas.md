# Conceptual improvements to the skills

These are proposals and recorded experiments for improving the skills. Adopted changes are marked below.
Choose a proposal based on observed evaluation failures before expanding the instructions.

## Start with these three

| Skill | Proposal | User benefit | Evidence of improvement |
| --- | --- | --- | --- |
| PR walkthrough | Track claims back to evidence | Readers can distinguish observed behavior from the author's explanation | Conflicting body and diff claims are attributed, not silently reconciled |
| Discord community | Design around member journeys and staff capacity | Small communities get a manageable plan | The first member can complete a support journey without creating avoidable staff work |
| Technical docs | Define the reader's starting state and success condition | Pages match what the reader actually needs | A fresh reader can complete the intended task with the stated prerequisites |

## PR walkthrough: explain a change with traceable evidence

### Use a claim ledger during synthesis

The workflow already forbids invented alternatives. Extend that principle to every causal claim: record its source, confidence, and any conflicting evidence.
Keep the ledger beside the manifest rather than placing it in the essay. Link key claims to a file hunk, PR body passage, or issue.

This matters when the PR description and code disagree. The initial fixture already exposes this: the author describes an extra clock read, but the diff moves an existing check.
An improved workflow should attribute the author's rationale and explain the observable code separately.

**Experiment result:** a ledger-only revision and a ledger-plus-comparison revision each passed the evidence criterion in 0/3 runs, matching the baseline. Both were reverted. See the [recorded experiment](../evals/results/2026-09-07-pr-grounding/README.md).

**Follow-up result:** [separate extraction, verification, and writing](../evals/results/2026-09-07-verified-walkthrough/README.md) preserved the central conflict in 6/6 completed trials across two fixtures, versus 0/6 direct-writing baselines. The verifier introduced one false runtime guarantee, and writers sometimes copied review instructions into the essay. The workflow remains experimental.

**Adopted improvement:** a [writer-only comparison](../evals/results/2026-09-08-challenged-walkthrough/README.md) reused the earlier verified facts unchanged and improved the reader-facing score from 1/6 to 6/6. The skill now tells writers to translate evidence notes into prose and keep internal review material out of the essay.

**Still experimental:** executed counterexamples exposed limits, but incorrect guarantees reappeared in titles and summaries. Next test an independent check of the final narrative against the source and probe results.

### Scale the analysis to the change

The current workflow always dispatches four reports and asks every file to appear in the tour.
For small changes, one evidence pass may be enough. For large changes, organize reports around behavior boundaries, then check file coverage separately.
Choose the analysis budget using the number of distinct behaviors, not changed-line count alone.

Keep a full walkthrough available when explicitly requested. Replace a fixed section quota with a required explanatory arc and a reading-time budget.
Reconcile the small-PR arc with the mandatory closing summary so the instructions give one answer about the ending.

**Measure:** time, tool calls, and unsupported claims for the same small and large PR fixtures.

### Make the audience an input

A maintainer needs mechanism and consequences. A new contributor needs domain context. A stakeholder needs user-visible effects.
Use one audience and one through-line per walkthrough; preserve the same evidence across all versions.

**Measure:** have a reader answer why the change exists, how it works, and what remains unresolved after one read.

## Discord community: optimize participation and operating cost

### Start from three member journeys

Before choosing channels, map how a new member gets oriented, asks for help, and contributes feedback.
For each journey, name the entry point, action, durable destination, and expected human response.
Derive channels and tags from those journeys instead of starting with a standard channel list.

The skill already uses community jobs. Journeys make those jobs observable and easier to test with a real member.

**Measure:** whether a fresh member reaches the right destination without moderator correction.

### Budget the human work

Treat moderation, office hours, support, and release curation as recurring costs with named owners and available time.
A two-maintainer beta should not inherit the operating plan of a large public community.
Offer a small baseline and expand it only when traffic or a new access boundary requires it.

**Measure:** unanswered support posts, time spent redirecting requests, and inactive channels after a defined review period.
Use those observations to simplify or expand the plan; avoid arbitrary community-growth targets.

### Give audits their own output contract

Audit mode currently travels through a setup workflow whose later steps describe configuration and launch.
A dedicated audit branch could end with evidence, impact, a proposed change, and a verification method for each finding.
It should preserve the existing permission boundaries and distinguish role preview from real-member testing.

**Measure:** fewer requests for irrelevant launch approvals and no claim that an audit applied changes.

## Technical docs: design around reader outcomes

### Write a reader contract before drafting

Record the reader's starting knowledge, prerequisites, intended outcome, and evidence that the outcome happened.
Then choose the Diátaxis quadrant. Quadrant choice is useful, but it does not by itself establish the reader's starting point.
Keep this contract in drafting notes unless part of it belongs in the page's prerequisites or verification section.

**Measure:** missing prerequisites and questions a fresh reader must ask to follow the page.

### Support all four quadrants with equal precision

The current skill has a detailed how-to template, while the other quadrants rely on general guidance.
Add short branch-specific outlines only where evaluations reveal repeated failures:

- Tutorials: a controlled starting state, a learning sequence, and a visible result.
- Reference: exact contracts, defaults, errors, and version scope.
- Explanation: a question, a causal model, evidence, and the boundaries of that model.

Allow short rationale that helps a reader choose the correct action. A useful how-to need not remove every sentence containing “why.”

**Measure:** whether readers can use a page for its intended purpose without needing unrelated exposition.

### Verify factual coverage, not only executable snippets

The updated workflow now handles local APIs, external APIs, conceptual pages, and operational pages.
The next step is a lightweight claim-to-source map for non-obvious statements, especially guarantees and operational advice.
Code execution proves an example ran; it does not prove a retention guarantee or explain why an architectural choice was made.

**Measure:** unsupported claims in conceptual and external-service evaluations, alongside runnable-example success.

## Apply a shared experimental method

Use the [evaluation suite](../evals/README.md) to compare each proposed change with the current skill on the same model and fixtures.
Record quality, human questions, tool calls, and elapsed time. A longer workflow should earn its extra cost.
Promote a proposal into the skill only when its evidence improves outcomes or removes a recurring failure.

Keep model-specific results separate. Passing a routing prompt tests the description; it does not prove a host's automatic skill-loading behavior.
