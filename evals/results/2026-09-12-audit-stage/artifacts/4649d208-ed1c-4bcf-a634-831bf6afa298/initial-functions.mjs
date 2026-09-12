export async function read(db, cache, key) {
  if (cache.has(key)) return cache.get(key);
  const value = await db.read(key);
  cache.set(key, value);
  return value;
}

export async function before(db, cache, key, value) {
  cache.delete(key);
  await db.write(key, value);
}

export async function after(db, cache, key, value) {
  await db.write(key, value);
  cache.delete(key);
}
