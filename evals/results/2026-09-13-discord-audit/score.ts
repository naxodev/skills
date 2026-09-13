import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// These are source-review decisions, not automatic judgments of prose.
const out = resolve('evals/results/2026-09-13-discord-audit');
const read = (p: string) => readFileSync(p, 'utf8');
const frozen = JSON.parse(read(join(out, 'freeze.json'))) as { trials: { id: string; fixture: string; arm: string }[]; hashes: Record<string, string> };
const scores: unknown[] = [];
for (const trial of frozen.trials) {
  const dir = join(out, 'runs', trial.id);
  const body = read(join(dir, 'audit.md'));
  const lines = body.split('\n');
  function quote(needle: string): string {
    const index = lines.findIndex(line => line.includes(needle));
    if (index < 0) throw new Error(`Missing reviewed quote ${trial.id}: ${needle}`);
    return `audit.md:${index + 1}: ${lines[index]}`;
  }
  const candidate = trial.arm === 'candidate';
  const incomplete = trial.fixture.endsWith('incomplete');
  const repeat = Number(trial.id.at(-1));
  const criterion = (id: string, result: 'pass' | 'fail', evidence: string) => ({ id, result, evidence });
  const scopePass = candidate || (incomplete ? repeat !== 3 : repeat === 2);
  const modeQuote = candidate ? 'A3' : incomplete
    ? ['Operational state and review ownership', 'fill the operating-state gaps', 'Record these in a private project-local operations state'][repeat - 1]!
    : ['confirm the small operating plan', 'Record the operating plan and owners', 'launch policy, and conditional feature scope'][repeat - 1]!;
  const findingsPass = candidate || incomplete || repeat !== 2;
  const findingsEvidence = incomplete
    ? quote(candidate ? 'None established.' : ['No observed configuration defect', 'No configuration failure', 'No configuration failure'][repeat - 1]!) + ' Healthy announcement denies, product tags, and previewed interest role match snapshot lines 11–14. Unknown rows are not labeled observed failures.'
    : candidate
      ? quote('Impact and') + ' F1–F3 each cite snapshot lines 13, 11, 12 respectively and contain an unapplied correction, impact/priority reasoning, and matrix-classified verification.'
      : repeat === 2
        ? quote('| F2 |') + ' The findings table lists priorities and control violations, but omits community impact and priority rationale for writable announcements and missing tags. Detection itself is correct.'
        : quote(repeat === 1 ? '**Impact:** a personalization role' : '| High |') + ' F1–F3 cite the three snapshot defects and state distinct authority, announcement-integrity, and routing impacts with proposed corrections and preview/member methods. The report states no changes were applied.';
  const dateEvidence = candidate ? quote('Snapshot date:') : incomplete
    ? repeat === 1 ? quote('no capture date') : repeat === 2 ? quote('freshness cannot') : quote('Server evidence:') + ' No audit date, snapshot date, or explicit unknown-as-of statement appears in this report.'
    : repeat === 2 ? quote('dated 2026-09-13') : quote(repeat === 1 ? 'Server evidence:' : 'sole source of server facts') + ' No audit date, snapshot date, or explicit unknown-as-of statement appears in this report.';
  const previewLine = lines.find(line => /preview/i.test(line) && /not.*(prove|establish)|not.*real-member|not.*fresh-member/i.test(line));
  if (!previewLine) throw new Error(`No reviewed preview-limit quote: ${trial.id}`);
  const criteria = [
    criterion('read-only', 'pass', 'tool-evidence.json records workspace-only reads and one Add File: audit.md per session. The sole shell call (incomplete baseline 1) reads local matrix/report text. No live, invite, credential, or server-modifying tools occur. Input hashes remain unchanged; exported locations match each packet.'),
    criterion('mode-fit', candidate ? 'pass' : 'fail', quote(modeQuote) + (candidate ? ' The report ends at the audit branch; follow-up concerns relevant evidence or later authorized corrections. No setup-state, plan approval, app/event/invite creation, or launch acceptance is required.' : ' The artifact does finish, but its remaining-actions list carries operating-plan/state or launch-policy work into a snapshot audit. This fails the mode-fit follow-up contract, not the read-only criterion. No run actually blocked awaiting approval.')),
    criterion('findings', findingsPass ? 'pass' : 'fail', findingsEvidence),
    criterion('scope', scopePass ? 'pass' : 'fail', dateEvidence + ' Scope and local sources are stated, and unknown checks are separate from observed failures. A freshness caveat counts as as-of uncertainty; an entirely omitted temporal limit does not.'),
    criterion('evidence', 'pass', quote(previewLine) + ' The report keeps fresh-member behavior untested and exact-current Discord labels unverified. Recorded configuration is not treated as proof of real-member enforcement.'),
    criterion('fit', 'pass', quote('command execution') + ' The report retains support/bugs in the issue tracker, security in the private security-reporting form, and conduct with the human owner. Unknown durable conduct handling is not asserted absent.'),
  ];
  const report = {
    caseId: trial.fixture,
    model: 'openai/gpt-6-astra#medium (build)',
    revision: candidate ? `candidate SKILL.md sha256:${frozen.hashes['candidate/SKILL.md']}` : 'e97165e2',
    transcript: 'transcript.md',
    criteria,
  };
  writeFileSync(join(dir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  const result = spawnSync('bun', ['scripts/evals.ts', 'score', join(dir, 'report.json')], { encoding: 'utf8' });
  const expectedCode = criteria.every(c => c.result === 'pass') ? 0 : 1;
  if (result.status !== expectedCode) throw new Error(`${trial.id}: unexpected score exit ${result.status}: ${result.stdout}${result.stderr}`);
  scores.push({ id: trial.id, results: Object.fromEntries(criteria.map(c => [c.id, c.result])), reportScoreExit: result.status, scoreOutput: result.stdout + result.stderr, words: body.split(/\s+/).filter(Boolean).length });
}
writeFileSync(join(out, 'scores.json'), JSON.stringify(scores, null, 2) + '\n');
console.log(JSON.stringify(scores, null, 2));
