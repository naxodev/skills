export async function before(db, publish, id) {
  return db.transaction(async (tx) => {
    await tx.markPaid(id);
    await publish(id);
  });
}

export async function after(db, publish, id) {
  await db.transaction(async (tx) => {
    await tx.markPaid(id);
  });
  await publish(id);
}
