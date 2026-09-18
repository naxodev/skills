import assert from 'node:assert/strict';

export const cases = [
  { subject: 'promise rejection', source: 'const events = []; let release; const sibling = new Promise(resolve => { release = () => { events.push("sibling"); resolve(1); }; }); await Promise.all([Promise.reject(new Error("stop")), sibling]).catch(() => events.push("rejected")); release(); await sibling; return events;', claim: 'After the aggregate rejects, releasing the sibling still records its effect.', expected: 'supported', result: ['rejected', 'sibling'], reason: 'Promise.all rejection does not cancel the sibling; release records its effect after rejection.' },
  { subject: 'shallow copy', source: 'const original = { nested: { count: 1 } }; const copy = { ...original }; copy.nested.count = 2; return original.nested.count;', claim: 'Spreading the object isolates the nested counter, so changing the copy leaves the original counter at 1.', expected: 'contradicted', result: 2, reason: 'Both objects reference the same nested object; assigning through the copy changes the original counter.' },
  { subject: 'pagination', source: 'const rows = ["a", "b", "c", "d"]; const offset = 1; const limit = 2; return rows.slice(offset, offset + limit);', claim: 'With offset 1 and limit 2, this page contains b and c.', expected: 'supported', result: ['b', 'c'], reason: 'The slice starts at index 1 and excludes index 3, returning b and c.' },
  { subject: 'nullish fallback', source: 'const count = 0; return count ?? 10;', claim: 'The fallback replaces the zero count with 10.', expected: 'contradicted', result: 0, reason: 'Zero is not null or undefined, so nullish coalescing preserves it.' },
  { subject: 'sort mutation', source: 'const values = [3, 1, 2]; const sorted = values.sort((a, b) => a - b); return { same: sorted === values, values };', claim: 'The sorted result is the same array object, and values now holds 1, 2, 3.', expected: 'supported', result: { same: true, values: [1, 2, 3] }, reason: 'sort mutates the receiver and returns it; identity remains equal.' },
  { subject: 'unicode length', source: 'const text = "😀"; return { units: text.length, points: [...text].length };', claim: 'Both length measurements count the emoji as one element.', expected: 'contradicted', result: { units: 2, points: 1 }, reason: 'String length counts two UTF-16 code units; iteration yields one Unicode code point.' },
] as const;

if (import.meta.main) {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (source: string) => () => Promise<unknown>;
  for (const example of cases) {
    const observed: unknown = await new AsyncFunction(example.source)();
    assert.deepEqual(observed, example.result, example.subject);
    console.log(JSON.stringify({ subject: example.subject, observed, expectedStatus: example.expected, rationale: example.reason }));
  }
}
