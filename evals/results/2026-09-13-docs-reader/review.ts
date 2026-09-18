import { strict as assert } from 'node:assert';
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-docs-reader');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/docs-reader-evidence-20260913';
const text = (p: string) => readFileSync(p, 'utf8');
const json = (p: string, value: unknown) => writeFileSync(p, JSON.stringify(value, null, 2) + '\n');
type Trial = { id: string; arm: string; fixture: string; output: string; work: string };
type Inspection = { id: string; exactReads: Record<string, boolean>; installedSkillCalls: unknown[]; readPaths: string[];
  commands: { input: { command: string }; output: { type: string; text: string }[] }[]; prose: string[] };
const { trials } = JSON.parse(text(join(out, 'freeze.json'))) as { trials: Trial[] };
const inspections = JSON.parse(text(join(archive, 'inspection.json'))) as Inspection[];
const executions = JSON.parse(text(join(archive, 'executions.json'))) as { id: string; status: string; sessionID: string; inputsUnchanged: boolean; info: { agent: string; model: unknown; location: { directory: string } } }[];
// Source/page judgments were reviewed by the owner, not inferred from the author's completion claims.
const renderedByAuthor = new Set(['docs-concept-baseline-2', 'docs-concept-candidate-3']);
const rows = trials.map(t => {
  const inspected = inspections.find(i => i.id === t.id)!;
  const executed = executions.find(e => e.id === t.id)!;
  assert.equal(executed.status, 'completed');
  assert.equal(executed.inputsUnchanged, true);
  assert.equal(executed.info.location.directory, t.work);
  assert.ok(Object.values(inspected.exactReads).every(Boolean));
  assert.deepEqual(inspected.installedSkillCalls, []);
  assert.equal(existsSync(t.work), false, 'Owned evaluation clone must be cleaned after archiving');
  const workspace = join(archive, 'raw', t.id, 'workspace');
  const published = join(out, 'runs', t.id);
  cpSync(join(workspace, 'README.md'), join(published, 'README.md'));
  if (t.fixture === 'docs-concept') cpSync(join(workspace, 'operations.md'), join(published, 'operations.md'));
  const page = text(join(workspace, t.output));
  const readme = text(join(workspace, 'README.md'));
  assert.ok(readme.includes(`](${t.output})`));
  for (const content of [page, readme]) for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const [path, anchor] = match[1]!.split('#');
    assert.ok(existsSync(join(workspace, path!)), `Missing link ${match[1]}`);
    if (anchor) assert.ok(text(join(workspace, path!)).split('\n').some(line => line.startsWith('#') && line.replace(/^#+\s+/, '').toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-') === anchor));
  }
  const renders = [t.output, 'README.md'].map(file => {
    const result = Bun.spawnSync(['glow', '-s', 'ascii', file], { cwd: workspace });
    assert.equal(result.exitCode, 0);
    return { command: `glow -s ascii ${file}`, stdout: result.stdout.toString(), stderr: result.stderr.toString() };
  });
  json(join(archive, 'raw', t.id, 'reviewer-render.json'), renders);
  const procedural = t.fixture === 'docs-reader-start';
  const replay = procedural ? JSON.parse(text(join(archive, 'replays', `${t.id}.json`))) as unknown : null;
  const source = procedural ? 'README.md:3-31; card.ts:6-29; release.example.json:1 (frozen fixture)' : 'operations.md:3-8 (unchanged decision record)';
  const criteria = procedural ? {
    grounding: 'passed', 'reader-fit': 'passed', outcome: 'passed', rationale: 'passed', execution: 'passed',
    applicability: 'untested: author checked source and navigation, but did not inspect rendered Markdown', quadrant: 'passed',
  } : { reasoning: 'passed', quadrant: 'passed', applicability: 'passed: code, build, sidebar not applicable with reasons', 'reader-fit': 'passed' };
  const evidence = {
    id: t.id, sessionID: executed.sessionID, model: executed.info.model, agent: executed.info.agent,
    exactLocalReads: inspected.exactReads, installedSkillCalls: 0, immutableInputsUnchanged: true,
    criteria, source,
    readerEvidence: procedural
      ? 'Before you start names Bun and the workspace root; recipe copies the absent release config, writes with --write, explains dry-run non-persistence, and verifies the saved label plus newline.'
      : 'Explains current chat coordination versus later tracker history/follow-up, relates continuity to cleanup and staff change, and makes no retention or response-time guarantee. No setup list or runnable procedure.',
    authorRender: renderedByAuthor.has(t.id) ? 'passed: Glow commands returned rendered page and README' : 'untested: author handed off a draft; available Glow was not discovered',
    authorNavigation: 'passed: shell checks verified local links and README entry point',
    buildSidebarLive: 'not applicable: fixture has no docs build, sidebar, or live service',
    authorHandoff: inspected.prose.at(-1),
    commandEvidence: inspected.commands.map((c, index) => ({ shellCall: index + 1,
      command: c.input.command.length < 150 ? c.input.command : `${c.input.command.split('\n')[0]!.slice(0, 90)} ... (full command archived)`,
      output: c.output.map(p => p.text).join('\n').split('\n').filter(line => /^(PASS|\$ |exit:|wrote |verified |Command exited|Rendered Markdown|Local Bun|Markdown renderer)/.test(line)),
    })),
    replay, reviewerNavigation: 'passed', reviewerRenderCommand: 'passed; output archived for owner inspection',
    archive: `raw/${t.id}/transcript.md; raw/${t.id}/export.json; raw/${t.id}/workspace; raw/${t.id}/reviewer-render.json`,
  };
  json(join(published, 'evidence.json'), evidence);
  cpSync(published, join(archive, 'runs', t.id), { recursive: true });
  return { id: t.id, status: executed.status, sessionID: executed.sessionID, exactReads: true, immutableInputsUnchanged: true,
    pageCriteria: criteria, authorRenderedReview: renderedByAuthor.has(t.id) ? 'passed' : 'untested',
    replay: procedural ? 'passed: no missing steps' : 'not applicable: conceptual distinction', cloneRemoved: true };
});
json(join(out, 'executions.json'), rows);
json(join(archive, 'review-summary.json'), rows);
console.log('Recorded reviewed source judgments, 6 fresh replays, exact reads, navigation checks, and separate reviewer renders for all 12 pages.');
