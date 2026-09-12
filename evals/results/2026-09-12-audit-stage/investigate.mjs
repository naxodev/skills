import assert from 'node:assert/strict';
import { after } from '../2026-09-09-audit-stage/fixtures/retry/functions.mjs';

for (const budget of [2, 3]) {
  const events = [];
  const failure = { retryable: true };
  await assert.rejects(after(async () => {
    events.push('send');
    throw failure;
  }, async delay => { events.push(delay); }, budget), error => error === failure);
  assert.deepEqual(events, budget === 2 ? ['send', 10, 'send', 20, 'send'] : ['send', 10, 'send', 20, 'send', 40, 'send']);
  console.log(JSON.stringify({ budget, events }));
}
