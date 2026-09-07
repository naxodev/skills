import { afterEach, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { catalogErrors } from './catalog.js';

const temporary: string[] = [];
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'catalog-test-'));
  temporary.push(root);
  const write = (path: string, value: string) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), value);
  };
  write('skills/example/SKILL.md', '---\nname: example\ndescription: An example.\n---\nRead [reference](REFERENCE.md).');
  write('skills/example/REFERENCE.md', '# Reference');
  write('README.md', '## Skills\n\n| Skill | Description |\n| --- | --- |\n| [example](skills/example) | Example |\n\n## Contributing\n');
  write('.claude-plugin/plugin.json', JSON.stringify({ name: 'skills', version: '1.0.0', skills: ['./skills/example'] }));
  write('.claude-plugin/marketplace.json', JSON.stringify({ plugins: [{ source: './', name: 'skills', version: '1.0.0' }] }));
  return { root, write };
}
afterEach(() => temporary.splice(0).forEach((root) => rmSync(root, { recursive: true, force: true })));

test('a consistent catalog with resolvable resources passes', () => {
  const { root, write } = fixture();
  write('notes.md', '```md\n[template link](does-not-exist.md)\n```\n[external](https://example.com)');
  expect(catalogErrors(root)).toEqual([]);
});

test('adding a skill without updating the catalog is rejected', () => {
  const { root, write } = fixture();
  write('skills/new-skill/SKILL.md', '---\nname: new-skill\ndescription: New.\n---\n');
  const errors = catalogErrors(root);
  expect(errors.some((error) => error.includes('plugin skills'))).toBe(true);
  expect(errors.some((error) => error.includes('README Skills'))).toBe(true);
});

test('renames must update frontmatter and bundled references', () => {
  const { root, write } = fixture();
  write('skills/example/SKILL.md', '---\nname: old-name\ndescription: Example.\n---\n[missing][guide]\n\n[guide]: moved.md');
  const errors = catalogErrors(root);
  expect(errors.some((error) => error.includes('frontmatter name'))).toBe(true);
  expect(errors.some((error) => error.includes('broken local link moved.md'))).toBe(true);
});

test('a removed skill cannot remain advertised in either catalog', () => {
  const { root } = fixture();
  rmSync(join(root, 'skills/example'), { recursive: true });
  const errors = catalogErrors(root);
  expect(errors.some((error) => error.includes('plugin skills'))).toBe(true);
  expect(errors.some((error) => error.includes('README Skills'))).toBe(true);
});

test('a release cannot publish mismatched plugin versions', () => {
  const { root, write } = fixture();
  write('.claude-plugin/marketplace.json', JSON.stringify({ plugins: [{ source: './', name: 'skills', version: '0.9.0' }] }));
  expect(catalogErrors(root)).toContain('marketplace must have one local plugin with matching name and version');
});

test('portable validation cannot hide an invalid invocation flag', () => {
  const { root, write } = fixture();
  write('skills/example/SKILL.md', '---\nname: example\ndescription: Example.\ndisable-model-invocation: "true"\n---\n');
  expect(catalogErrors(root)).toContain('skills/example: disable-model-invocation must be a boolean');
});
