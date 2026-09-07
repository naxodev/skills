import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontmatter, skillDirectories } from './catalog.js';

export interface EvalCase {
  id: string;
  kind: 'workflow' | 'routing';
  skill: string | null;
  fixtures: string[];
  prompt: string;
  criteria: { id: string; expect: string }[];
}

export interface EvalReport {
  caseId: string;
  model: string;
  revision: string;
  transcript: string;
  criteria: { id: string; result: 'pass' | 'fail' | 'untested'; evidence: string }[];
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const cases: EvalCase[] = JSON.parse(readFileSync(join(root, 'evals/cases.json'), 'utf8'));

export function reportErrors(report: EvalReport, scenario: EvalCase): string[] {
  const errors: string[] = [];
  if (report.caseId !== scenario.id) errors.push('caseId does not match the scenario');
  for (const key of ['model', 'revision', 'transcript'] as const) {
    if (typeof report[key] !== 'string' || !report[key].trim()) errors.push(`${key} is required`);
  }
  if (!Array.isArray(report.criteria)) return [...errors, 'criteria must be an array'];
  const expected = scenario.criteria.map((criterion) => criterion.id).sort();
  const actual = report.criteria.map((criterion) => criterion?.id).sort();
  if (JSON.stringify(expected) !== JSON.stringify(actual)) errors.push('score every criterion exactly once');
  for (const criterion of report.criteria) {
    if (!criterion || criterion.result !== 'pass') errors.push(`${criterion?.id}: ${criterion?.result ?? 'missing result'}`);
    if (typeof criterion?.evidence !== 'string' || !criterion.evidence.trim()) {
      errors.push(`${criterion?.id}: provide transcript or artifact evidence`);
    }
  }
  return errors;
}

function prepare(scenario: EvalCase) {
  const runs = join(root, '.evals');
  mkdirSync(runs, { recursive: true });
  const directory = mkdtempSync(join(runs, `${scenario.id}-`));
  const work = join(directory, 'work');
  mkdirSync(work);
  for (const fixture of scenario.fixtures) {
    const destination = join(work, fixture);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(join(root, fixture), destination, { recursive: true });
  }
  let context: string;
  if (scenario.kind === 'routing') {
    const catalog = skillDirectories(root).map((directory) =>
      frontmatter(readFileSync(join(root, directory, 'SKILL.md'), 'utf8')));
    context = `Choose the appropriate skill from this catalog, or none. Return the name and one sentence explaining the choice. Do not execute the request.\n\n${JSON.stringify(catalog, null, 2)}`;
  } else {
    context = `Use the skill at ${join(root, 'skills', scenario.skill!, 'SKILL.md')}. Read its linked resources when the workflow calls for them. Resolve bundled scripts from that skill directory. Write task outputs only under ${work}.`;
  }
  writeFileSync(join(directory, 'prompt.md'), `${context}\n\nTask:\n${scenario.prompt}\n\nWorking directory: ${work}\nSupplied fixtures: ${scenario.fixtures.join(', ') || 'none'}\n`);
  const report: EvalReport = {
    caseId: scenario.id, model: '', revision: '', transcript: 'transcript.md',
    criteria: scenario.criteria.map(({ id }) => ({ id, result: 'untested', evidence: '' })),
  };
  writeFileSync(join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
  writeFileSync(join(directory, 'rubric.md'), scenario.criteria.map(({ id, expect }) => `- **${id}:** ${expect}`).join('\n') + '\n');
  console.log(directory);
}

if (import.meta.main) {
  const [command = 'list', argument] = process.argv.slice(2);
  if (command === 'list') {
    console.log(cases.map((scenario) => `${scenario.id}\t${scenario.kind}`).join('\n'));
  } else if (command === 'prepare') {
    const scenario = cases.find((entry) => entry.id === argument);
    if (!scenario) throw new Error('unknown case; run bun run evals list');
    prepare(scenario);
  } else if (command === 'score' && argument) {
    const report: EvalReport = JSON.parse(readFileSync(argument, 'utf8'));
    const scenario = cases.find((entry) => entry.id === report?.caseId);
    if (!scenario) throw new Error('report has an unknown caseId');
    const errors = reportErrors(report, scenario);
    if (!report.transcript || !existsSync(resolve(dirname(argument), report.transcript))) errors.push('saved transcript does not exist');
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exitCode = 1;
    } else {
      console.log(`${scenario.id}: reviewer marked every criterion passed with evidence. This command validates the report, not the model's behavior.`);
    }
  } else {
    console.error('usage: bun run evals [list | prepare <case-id> | score <report.json>]');
    process.exitCode = 2;
  }
}
