import { expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { cases, reportErrors, type EvalReport } from './evals.js';

test('each evaluation has unique, checkable criteria and available fixture evidence', () => {
  expect(new Set(cases.map((scenario) => scenario.id)).size).toBe(cases.length);
  for (const scenario of cases) {
    expect(scenario.criteria.length).toBeGreaterThan(0);
    expect(new Set(scenario.criteria.map((criterion) => criterion.id)).size).toBe(scenario.criteria.length);
    for (const fixture of scenario.fixtures) expect(existsSync(fixture)).toBe(true);
    if (scenario.skill) expect(existsSync(`skills/${scenario.skill}/SKILL.md`)).toBe(true);
    for (const criterion of scenario.criteria) expect(criterion.expect.trim().length).toBeGreaterThan(0);
  }
});

const scenario = cases[0];
function report(): EvalReport {
  return {
    caseId: scenario.id, model: 'test-model', revision: 'test-revision', transcript: 'transcript.md',
    criteria: scenario.criteria.map(({ id }) => ({ id, result: 'pass', evidence: 'Transcript lines 4–8 contain the observed result.' })),
  };
}

test('an untested criterion cannot become a passing evaluation', () => {
  const result = report();
  result.criteria[0].result = 'untested';
  expect(reportErrors(result, scenario)).toContain(`${result.criteria[0].id}: untested`);
});

test('a claimed pass without evidence or with omitted criteria is rejected', () => {
  const result = report();
  result.criteria[0].evidence = '';
  result.criteria.pop();
  const errors = reportErrors(result, scenario);
  expect(errors).toContain('score every criterion exactly once');
  expect(errors.some((error) => error.includes('provide transcript'))).toBe(true);
});

test('a fully recorded reviewer assessment is accepted', () => {
  expect(reportErrors(report(), scenario)).toEqual([]);
});
