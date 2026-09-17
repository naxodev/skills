import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'evals/results/2026-09-17-release');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/release-prep-evidence-20260917';
const replay = join(archive, 'independent-docs-replay');
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (p: string) => new Bun.CryptoHasher('sha256').update(readFileSync(p)).digest('hex');
const logs: unknown[] = [];
async function command(args: string[], cwd: string): Promise<string> {
  const p = Bun.spawn(args, { cwd, stdout: 'pipe', stderr: 'pipe' });
  const [stdout, stderr, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
  logs.push({ args, cwd, code, stdout, stderr });
  if (code) throw new Error(`${args.join(' ')} failed`);
  return stdout;
}
if (existsSync(replay)) throw new Error('Replay already exists');
cpSync(join(root, 'evals/fixtures/docs-reader'), replay, { recursive: true });
const guide = join(out, 'runs/docs-reader-start/guide.md');
const commands = [...text(guide).matchAll(/^[ \t]*```sh\n([\s\S]*?)^[ \t]*```/gm)].map(m => m[1]!.trim());
if (commands.length !== 3 || existsSync(join(replay, 'configs/release.json')) || existsSync(join(replay, 'generated/release.txt'))) throw new Error('Unexpected reader start or procedure');
for (const cmd of commands) await command(['sh', '-c', cmd], replay);
if (text(join(replay, 'generated/release.txt')) !== 'release-2.4.0\n') throw new Error('Reader outcome mismatch');
await command(['glow', '-w', '100', guide], root);
const pr = join(out, 'runs/pr-grounding-quality');
const manifest = join(pr, 'pr-42-manifest.json');
const rebuilt = join(archive, 'pr-42-rebuilt.html');
await command(['node', 'skills/pr-walkthrough/scripts/build.mjs', '--manifest', manifest, '--audio', join(archive, 'absent-audio.json'), '--output', rebuilt], root);
const produced = join(pr, 'pr-42-walkthrough.html');
if (hash(produced) !== hash(rebuilt)) throw new Error('Independent PR rebuild differs');
const parsed = JSON.parse(text(manifest)) as { narrationIntro?: string; sections: { narration?: string; code?: { source: string }[] }[] };
if (parsed.narrationIntro || parsed.sections.some(s => s.narration)) throw new Error('Unexpected narration');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'verification.json'), JSON.stringify({ docs: { guideSha256: hash(guide), commands, artifact: text(join(replay, 'generated/release.txt')) }, pr: { manifestSha256: hash(manifest), htmlSha256: hash(produced), rebuiltSha256: hash(rebuilt), sections: parsed.sections.length, codeBlocks: parsed.sections.flatMap(s => s.code ?? []).length }, logs }, null, 2) + '\n');
cpSync(out, join(archive, 'public'), { recursive: true });
rmSync(replay, { recursive: true });
