import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/node_modules/**', '.jj/**', '.evals/**', 'evals/fixtures/**'] },
  js.configs.recommended,
  {
    files: ['**/*.mjs', '**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: { 'no-unused-vars': ['error', { caughtErrors: 'none' }] },
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
  },
);
