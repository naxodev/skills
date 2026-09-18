import assert from 'node:assert/strict';
import { before, after } from './functions.mjs';

async function scenario(fn, outcomes, retries, sleepRejects = false) {
  const trace = { calls: 0, effects: 0, delays: [], result: null, error: null };
  try {
    trace.result = await fn(async () => {
      const outcome = outcomes[trace.calls++];
      assert.ok(outcome, 'the supplied retry budget must bound send calls');
      if (outcome.effect) trace.effects++;
      if (outcome.error) throw outcome.error;
      return 'delivered';
    }, async (delay) => {
      trace.delays.push(delay);
      if (sleepRejects) throw { label: 'sleep-failed' };
    }, retries);
  } catch (error) {
    trace.error = error.label;
  }
  return trace;
}
const transient = { label: 'transient', retryable: true };
const permanent = { label: 'permanent', retryable: false };
const results = {};
for (const [name, fn] of Object.entries({ before, after })) {
  results[name] = {
    permanent: await scenario(fn, [{ error: permanent }, {}], 2),
    exhausted: await scenario(fn, Array(3).fill({ error: transient }), 2),
    zeroBudget: await scenario(fn, [{ error: transient }], 0),
    duplicate: await scenario(fn, [{ effect: true, error: transient }, { effect: true }], 2),
    sleepFailure: await scenario(fn, [{ error: transient }], 2, true),
    concurrentCalls: await Promise.all([1, 2].map(() => scenario(fn, [{ effect: true }], 2))),
  };
}
assert.equal(results.before.permanent.calls, 2);
assert.equal(results.after.permanent.calls, 1);
assert.equal(results.after.permanent.error, 'permanent');
assert.deepEqual(results.before.exhausted.delays, [10, 10]);
assert.deepEqual(results.after.exhausted.delays, [10, 20]);
for (const result of Object.values(results)) {
  assert.equal(result.exhausted.calls, 3, 'retries counts extra attempts, not all attempts');
  assert.equal(result.exhausted.error, 'transient');
  assert.equal(result.zeroBudget.calls, 1);
  assert.deepEqual(result.zeroBudget.delays, []);
  assert.equal(result.duplicate.effects, 2, 'a lost acknowledgment permits duplicate side effects');
  assert.equal(result.sleepFailure.calls, 1, 'a rejected sleep prevents another send');
  assert.equal(result.sleepFailure.error, 'sleep-failed');
  assert.equal(result.concurrentCalls.reduce((sum, item) => sum + item.effects, 0), 2);
}
console.log(JSON.stringify({ assumptions: 'Deterministic modeled send outcomes and immediate sleep promises; no timing or production measurement.', results }, null, 2));
