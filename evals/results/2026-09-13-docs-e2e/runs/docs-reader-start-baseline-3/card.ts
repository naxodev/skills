import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

try {
  const [action, flag, configPath, write, ...extra] = process.argv.slice(2);
  if (!['generate', 'verify'].includes(action ?? '') || flag !== '--config' || !configPath ||
      extra.length || (write !== undefined && (action !== 'generate' || write !== '--write'))) {
    throw new Error('usage: bun card.ts <generate|verify> --config <path> [--write]');
  }
  const config: unknown = JSON.parse(readFileSync(configPath, 'utf8'));
  if (!config || typeof config !== 'object' || !('prefix' in config) || typeof config.prefix !== 'string' ||
      !('version' in config) || typeof config.version !== 'string' ||
      !('output' in config) || typeof config.output !== 'string') throw new Error('invalid card config');
  const label = `${config.prefix}${config.version}`;
  const expected = `${label}\n`;
  if (action === 'verify') {
    if (readFileSync(config.output, 'utf8') !== expected) throw new Error(`card differs: ${config.output}`);
    console.log(`verified ${config.output}: ${label}`);
  } else if (write === '--write') {
    mkdirSync(dirname(config.output), { recursive: true });
    writeFileSync(config.output, expected);
    console.log(`wrote ${config.output}: ${label}`);
  } else {
    console.log(`dry run ${config.output}: ${label}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
