import assert from 'node:assert/strict';
import { before, after } from './functions.mjs';

async function scenario(fn, fault, concurrent = false) {
  const trace = { paid: false, notifications: 0, events: [], errors: [] };
  const db = {
    async transaction(callback) {
      let staged = false;
      trace.events.push('begin');
      try {
        await callback({ async markPaid() {
          if (fault === 'write') throw new Error('write');
          staged = true;
          trace.events.push('write');
        } });
        if (fault === 'commit') throw new Error('commit');
        if (staged) trace.paid = true;
        trace.events.push('commit');
      } catch (error) {
        trace.events.push('rollback');
        throw error;
      }
    },
  };
  const publish = async () => {
    trace.events.push('publish');
    if (fault === 'publish-before') throw new Error('publish-before');
    trace.notifications++;
    if (fault === 'publish-after') throw new Error('publish-after');
  };
  const invoke = () => fn(db, publish, 'invoice-7').catch((error) => trace.errors.push(error.message));
  if (concurrent) await Promise.all([invoke(), invoke()]);
  else await invoke();
  return trace;
}
const results = {};
for (const [name, fn] of Object.entries({ before, after })) {
  results[name] = {};
  for (const fault of ['none', 'write', 'commit', 'publish-before', 'publish-after']) {
    results[name][fault] = await scenario(fn, fault);
  }
  results[name].concurrent = await scenario(fn, 'none', true);
}
assert.equal(results.before.commit.notifications, 1, 'a notification can escape before a failed commit');
assert.equal(results.after.commit.notifications, 0, 'a failed commit must prevent publish in the changed function');
assert.equal(results.before['publish-before'].paid, false);
assert.equal(results.after['publish-before'].paid, true, 'publication failure cannot undo an already committed payment');
assert.equal(results.after['publish-before'].notifications, 0);
assert.equal(results.after['publish-after'].paid, true);
assert.equal(results.after['publish-after'].notifications, 1);
assert.equal(results.before['publish-after'].paid, false);
assert.equal(results.before['publish-after'].notifications, 1);
assert.deepEqual(results.after.none.events, ['begin', 'write', 'commit', 'publish']);
for (const result of Object.values(results)) {
  assert.equal(result.write.notifications, 0);
  assert.equal(result.write.paid, false);
  assert.equal(result.commit.paid, false);
  assert.equal(result.concurrent.notifications, 2, 'idempotent payment writes do not deduplicate external publication');
}
console.log(JSON.stringify({ assumptions: 'In-memory staged transaction and external notification counter; no actual database or process-kill simulation.', results }, null, 2));
