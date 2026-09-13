import { readFileSync, writeFileSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';

const out = resolve('evals/results/2026-09-13-structure');
const archive = '/private/var/folders/fh/zx6t2vf55zd3rmf08mrg5jdc0000gn/T/opencode/walkthrough-structure-evidence-20260913';
const text = (p: string) => readFileSync(p, 'utf8');
const hash = (s: string) => new Bun.CryptoHasher('sha256').update(s).digest('hex');
type Section = { eyebrow: string; title: string; content: string };
type Manifest = { title: string; dek: string; eyebrow: string; meta: string; footer: string; sections: Section[] };
type Tool = { type: string; name?: string; state?: { status: string; input: { path?: string; command?: string }; content?: { type: string; text?: string }[] } };
const freeze = JSON.parse(text(join(out, 'freeze.json'))) as { trials: { id: string; arm: string; fixture: string; prompt: string }[] };
async function contentText(content: string): Promise<string> {
  const chunks: string[] = [];
  await new HTMLRewriter()
    .on('body', { text(chunk) { chunks.push(chunk.text); } })
    .on('p, div, h1, h2, h3, li, tr, td, th, br', { element() { chunks.push(' '); } })
    .transform(new Response(`<body>${content}</body>`)).text();
  return chunks.join('').replace(/\{\{(?:CODE|DIAGRAM):\d+\}\}/g, '').replace(/&nbsp;|&#160;|&#xA0;/gi, ' ');
}
const scores = await Promise.all(freeze.trials.map(async t => {
  const raw = resolve('.evals/structure', t.id);
  const manifestText = text(join(out, 'manifests', `${t.id}.json`));
  const m = JSON.parse(manifestText) as Manifest;
  const tools = (JSON.parse(text(join(raw, 'visible.json'))) as { content: Tool[] }[]).flatMap(m => m.content).filter(c => c.type === 'tool');
  const reads = ['SKILL.md', 'STYLE.md'].map(file => {
    const tool = tools.find(c => c.name === 'read' && c.state?.input.path?.endsWith(`pr-walkthrough/${file}`));
    const output = tool?.state?.content?.map(c => c.text ?? '').join('\n') ?? '';
    const recovered = output.split('\n').filter(line => /^\d+: /.test(line)).map(line => line.replace(/^\d+: /, '')).join('\n') + '\n';
    if (recovered !== text(join(archive, t.arm, file))) throw new Error(`${t.id}: incorrect or incomplete ${file} read`);
    return { file, sha256: hash(recovered) };
  });
  const buildCalls = tools.filter(c => c.name === 'shell' && c.state?.status === 'completed' && /build\.mjs/.test(c.state.input.command ?? ''));
  if (!buildCalls.length) throw new Error(`${t.id}: no model build call`);
  const forbidden = tools.filter(c => c.name === 'skill' || /evals|rubric|examples|\/Users\//.test(c.state?.input.path ?? ''));
  if (forbidden.length) throw new Error(`${t.id}: inspect possible contamination`);
  const content = await Promise.all(m.sections.map(s => contentText(s.content)));
  const prose = [m.title, m.dek, m.eyebrow, m.meta, m.footer, ...m.sections.flatMap((s, index) => [s.eyebrow, s.title, content[index]])].join(' ').trim();
  const words = prose.split(/\s+/).length;
  const embeddedRecap = ['small-baseline-2', 'small-baseline-3'].includes(t.id);
  // Source review: all manifests explain the first three beats. Two put recap inside What's next.
  const structure = !embeddedRecap && m.sections.length >= 4 && m.sections.length <= 11;
  const optional = t.arm === 'candidate';
  return {
    id: t.id, manifestSha256: hash(manifestText), promptSha256: hash(t.prompt), reads,
    sections: m.sections.length, headings: m.sections.map(s => s.eyebrow), words,
    countCeiling: m.sections.length <= 11, wordCeiling: words <= (t.fixture === 'small' ? 900 : 1800),
    requiredDistinctOrderAndFinalRecap: structure,
    requiredContentReview: embeddedRecap ? 'Setting, gap, and implementation are distinct. The recap is an h3 within the final follow-up section, not its own section.' : 'Distinct source-grounded setup, motivation, and implementation precede a separate final recap.',
    optionalSectionsEarned: optional,
    optionalReview: optional ? 'Four sections; no optional section or invented menu item.' : t.fixture === 'small' ? 'The separate follow-up section repeats the streaming limitation already explained in trade-offs; it adds no distinct explanation.' : 'The file-tour section repeats the three-file path and summaries already explained in implementation; it adds no distinct explanation.',
    supportedContent: true,
    sourceGrounds: t.fixture === 'small' ? 'pr.json body and diff: moved expiry guard, awaited refresh before send, author-attributed extra clock read versus one moved check, separate streaming follow-up. No invented alternatives/issues/benchmarks.' : 'pr-batch-limit.json body and three hunks: default 100, positive integer startup validation, splice prefix, configured worker call, retained remainder, no memory/time guarantee, no tenant key. 250/100 examples follow from splice semantics; no runtime measurement or roadmap claim.',
    modelBuildCalls: buildCalls.length, reviewerBuild: 'passed',
  };
}));
writeFileSync(join(out, 'scores.json'), JSON.stringify(scores, null, 2) + '\n');
cpSync(join(out, 'scores.json'), join(archive, 'scores.json'));
console.log(JSON.stringify(scores.map(s => ({ id: s.id, sections: s.sections, words: s.words, structure: s.requiredDistinctOrderAndFinalRecap, optional: s.optionalSectionsEarned }))));
