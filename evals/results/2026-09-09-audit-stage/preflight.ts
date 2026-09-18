import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const directory = resolve(root, `.evals/audit-stage/preflight-${Date.now()}`);
mkdirSync(directory, { recursive: true });
function api(args: string[]) {
  const result = spawnSync('opencode2', ['api', ...args], { cwd: root, encoding: 'utf8', maxBuffer: 32e6 });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return result.stdout;
}
const catalog = JSON.parse(api(['get', '/api/model'])) as { data: { id: string; providerID: string; enabled: boolean; variants: { id: string }[] }[] };
const ids = ['claude-opus-5', 'claude-opus-4-8'];
writeFileSync(resolve(directory, 'catalog.json'), JSON.stringify(catalog.data.filter((item) => item.providerID === 'anthropic' && ids.includes(item.id)).map(({ id, providerID, enabled, variants }) => ({ id, providerID, enabled, variants: variants.map((variant) => variant.id) })), null, 2));
let available = false;
for (const id of ids) {
  const model = { providerID: 'anthropic', id, variant: 'medium' };
  const created = JSON.parse(api(['post', '/api/session', '--data', JSON.stringify({ model, location: { directory: root }, title: `neutral availability ${id}` })])) as { data: { id: string } };
  writeFileSync(resolve(directory, `${id}-created.json`), JSON.stringify(created, null, 2));
  const sessionID = created.data.id;
  const text = 'Reply with exactly READY. Do not use tools or read files. This is a neutral availability check.';
  const start = Date.now();
  api(['post', `/api/session/${sessionID}/prompt`, '--data', JSON.stringify({ text })]);
  const wait = spawnSync('opencode2', ['api', 'post', `/api/session/${sessionID}/wait`], { cwd: root, encoding: 'utf8', timeout: 120000 });
  writeFileSync(resolve(directory, `${id}-wait.txt`), wait.stdout + wait.stderr);
  const raw = api(['get', `/api/session/${sessionID}/export`]);
  writeFileSync(resolve(directory, `${id}-export.json`), raw);
  const exported = JSON.parse(raw) as { data: { info: { outcome: string; model: typeof model; location: { directory: string } }; messages: { type: string; content?: { type: string; text?: string }[] }[] } };
  const info = exported.data.info;
  const visible = exported.data.messages.flatMap((message) => message.type === 'assistant' ? (message.content ?? []).filter((part) => part.type === 'text').map((part) => part.text ?? '') : []);
  const identity = info.model.id === id && info.model.providerID === model.providerID && info.model.variant === model.variant && info.location.directory === root;
  available = identity && wait.status === 0 && info.outcome === 'succeeded' && visible.join('').trim() === 'READY';
  writeFileSync(resolve(directory, `${id}-status.json`), JSON.stringify({ available, identity, milliseconds: Date.now() - start, info, visible }, null, 2));
  console.log(`${id}: ${available ? 'available' : 'excluded'}; evidence ${directory}`);
  if (available) break;
}
process.exitCode = available ? 0 : 1;
