import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { parseDocument } from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

export function skillDirectories(root: string): string[] {
  return readdirSync(join(root, 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `skills/${entry.name}`)
    .sort();
}

export function frontmatter(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error('missing YAML frontmatter');
  const doc = parseDocument(match[1]);
  if (doc.errors.length) throw new Error(doc.errors.map((error) => error.message).join('; '));
  const value: unknown = doc.toJS();
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('frontmatter must be a mapping');
  }
  return value as Record<string, unknown>;
}

function markdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['node_modules', '.git', '.jj', '.evals'].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : entry.name.endsWith('.md') ? [path] : [];
  });
}

function links(source: string): string[] {
  const urls: string[] = [];
  const tree = unified().use(remarkParse).parse(source);
  visit(tree, (node) => {
    if (node.type === 'link' || node.type === 'image' || node.type === 'definition') urls.push(node.url);
  });
  return urls;
}

export function catalogErrors(root: string): string[] {
  const errors: string[] = [];
  const directories = skillDirectories(root);
  const plugin = JSON.parse(readFileSync(join(root, '.claude-plugin/plugin.json'), 'utf8'));
  const marketplace = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf8'));
  const listed: unknown = plugin.skills;
  const expected = directories.map((directory) => `./${directory}`);
  if (!Array.isArray(listed) || listed.some((value) => typeof value !== 'string') ||
      JSON.stringify([...listed].sort()) !== JSON.stringify(expected)) {
    errors.push(`plugin skills must match directories exactly: ${expected.join(', ')}`);
  }
  const entries = marketplace.plugins.filter((entry: { source?: string }) => entry.source === './');
  if (entries.length !== 1 || entries[0].name !== plugin.name || entries[0].version !== plugin.version) {
    errors.push('marketplace must have one local plugin with matching name and version');
  }

  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const table = readme.match(/^## Skills\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1] ?? '';
  const readmeSkills = links(table)
    .filter((url) => /^(?:\.\/)?skills\//.test(url))
    .map((url) => url.replace(/^\.\//, '').replace(/\/$/, ''))
    .sort();
  if (JSON.stringify(readmeSkills) !== JSON.stringify(directories)) {
    errors.push('README Skills table must list every skill directory exactly once');
  }

  for (const directory of directories) {
    try {
      const source = readFileSync(join(root, directory, 'SKILL.md'), 'utf8');
      const metadata = frontmatter(source);
      if (metadata.name !== basename(directory)) errors.push(`${directory}: frontmatter name must match directory`);
      if ('disable-model-invocation' in metadata && typeof metadata['disable-model-invocation'] !== 'boolean') {
        errors.push(`${directory}: disable-model-invocation must be a boolean`);
      }
    } catch (error) {
      errors.push(`${directory}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const file of markdownFiles(root)) {
    for (const url of links(readFileSync(file, 'utf8'))) {
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) continue;
      const local = decodeURIComponent(url.split(/[?#]/)[0]);
      if (local && !existsSync(resolve(dirname(file), local))) errors.push(`${file}: broken local link ${url}`);
    }
  }
  return errors;
}
