#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

for tool in bun node skills-ref claude; do
  command -v "$tool" >/dev/null || { echo "Missing $tool; see README.md development setup." >&2; exit 1; }
done

bun scripts/validate.ts
claude plugin validate . --strict
