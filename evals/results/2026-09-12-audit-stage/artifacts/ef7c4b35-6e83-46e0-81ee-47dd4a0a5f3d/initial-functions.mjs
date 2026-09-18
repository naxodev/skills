export async function before(send, sleep, retries) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await send();
    } catch (error) {
      if (attempt === retries) throw error;
      await sleep(10);
    }
  }
}

export async function after(send, sleep, retries) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await send();
    } catch (error) {
      if (!error.retryable || attempt === retries) throw error;
      await sleep(10 * 2 ** attempt);
    }
  }
}
