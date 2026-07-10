#!/usr/bin/env node
/**
 * Fetch PR metadata + diff via `gh`, write a JSON dump for downstream
 * agents to read.
 *
 * Usage:
 *   fetch-pr.mjs <PR-number-or-url> [--out <path>]
 *
 * Prints the output file path on stdout on success.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('-')) {
  console.error(
    'usage: fetch-pr.mjs <pr-number-or-url> [--out <path>]'
  );
  process.exit(2);
}
const prArg = args[0];
const outIdx = args.indexOf('--out');
const outArg = outIdx >= 0 ? args[outIdx + 1] : null;

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

// Verify gh is available and authenticated.
try {
  sh('gh --version');
} catch {
  console.error('gh CLI not found. Install: brew install gh');
  process.exit(2);
}
try {
  sh('gh auth status');
} catch {
  console.error('gh not authenticated. Run: gh auth login');
  process.exit(2);
}

const fields = [
  'number',
  'title',
  'body',
  'state',
  'mergeable',
  'baseRefName',
  'headRefName',
  'baseRefOid',
  'headRefOid',
  'author',
  'labels',
  'files',
  'commits',
  'additions',
  'deletions',
  'changedFiles',
  'createdAt',
  'updatedAt',
  'mergedAt',
  'closedAt',
  'url',
].join(',');

let view;
try {
  view = JSON.parse(sh(`gh pr view ${JSON.stringify(prArg)} --json ${fields}`));
} catch (err) {
  console.error(`gh pr view failed for "${prArg}":`);
  console.error(err.stderr?.toString() ?? err.message);
  process.exit(1);
}

let diff = '';
try {
  diff = sh(`gh pr diff ${JSON.stringify(prArg)}`);
} catch (err) {
  console.error(`gh pr diff failed for "${prArg}":`);
  console.error(err.stderr?.toString() ?? err.message);
  process.exit(1);
}

const outPath = outArg ?? join(tmpdir(), `pr-${view.number}-fetch.json`);
writeFileSync(outPath, JSON.stringify({ ...view, diff }, null, 2));
process.stdout.write(outPath + '\n');
