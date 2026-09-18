import assert from 'node:assert/strict';
import { before, after, read } from './functions.mjs';

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}
async function sequential(fn, fail = false) {
  let stored = 'old';
  const cache = new Map([['key', 'old']]);
  const db = {
    async read() { return stored; },
    async write(key, value) {
      if (fail) throw new Error('write');
      stored = value;
    },
  };
  let error = null;
  await fn(db, cache, 'key', 'new').catch((failure) => { error = failure.message; });
  const cachedAfterUpdate = cache.get('key') ?? null;
  return { stored, cachedAfterUpdate, nextRead: await read(db, cache, 'key'), error };
}
async function overlapping(fn, lateSnapshot) {
  let stored = 'old';
  const cache = new Map();
  const readerStarted = deferred();
  const releaseReader = deferred();
  const writerStarted = deferred();
  const releaseWriter = deferred();
  const db = {
    async read() {
      const snapshot = stored;
      readerStarted.resolve();
      await releaseReader.promise;
      return snapshot;
    },
    async write(key, value) {
      writerStarted.resolve();
      await releaseWriter.promise;
      stored = value;
    },
  };
  let pendingRead;
  let update;
  if (lateSnapshot) {
    pendingRead = read(db, cache, 'key');
    await readerStarted.promise;
    update = fn(db, cache, 'key', 'new');
    await writerStarted.promise;
    releaseWriter.resolve();
    await update;
    releaseReader.resolve();
  } else {
    update = fn(db, cache, 'key', 'new');
    await writerStarted.promise;
    pendingRead = read(db, cache, 'key');
    await readerStarted.promise;
    releaseReader.resolve();
    await pendingRead;
    releaseWriter.resolve();
    await update;
  }
  const overlappingRead = await pendingRead;
  return { stored, overlappingRead, cached: cache.get('key') ?? null, nextRead: await read(db, cache, 'key') };
}
const results = {};
for (const [name, fn] of Object.entries({ before, after })) {
  results[name] = {
    sequential: await sequential(fn),
    failedWrite: await sequential(fn, true),
    fillDuringWrite: await overlapping(fn, false),
    lateSnapshot: await overlapping(fn, true),
  };
}
assert.equal(results.before.fillDuringWrite.nextRead, 'old');
assert.equal(results.after.fillDuringWrite.nextRead, 'new', 'post-write deletion removes a cache fill that completed during the write');
assert.equal(results.after.fillDuringWrite.overlappingRead, 'old');
assert.equal(results.after.failedWrite.cachedAfterUpdate, 'old');
assert.equal(results.before.failedWrite.cachedAfterUpdate, null);
for (const result of Object.values(results)) {
  assert.equal(result.sequential.nextRead, 'new');
  assert.equal(result.failedWrite.stored, 'old');
  assert.equal(result.failedWrite.error, 'write');
  assert.equal(result.lateSnapshot.stored, 'new');
  assert.equal(result.lateSnapshot.cached, 'old', 'an older snapshot can refill the cache after invalidation');
  assert.equal(result.lateSnapshot.nextRead, 'old');
}
console.log(JSON.stringify({ assumptions: 'Explicit promise gates schedule snapshot capture, write commit, and cache fill. One process and one Map; no wall-clock timing.', results }, null, 2));
