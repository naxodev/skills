#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

skills-ref validate skills/writing-technical-docs
skills-ref validate skills/discord-community-server

has_disable_model_invocation() {
  awk '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter && $0 ~ /^disable-model-invocation:/ { found = 1; exit }
    END { exit !found }
  ' skills/pr-walkthrough/SKILL.md
}

if has_disable_model_invocation; then
  temp_dir="$(mktemp -d)"
  trap 'rm -rf "$temp_dir"' EXIT
  mkdir "$temp_dir/pr-walkthrough"
  awk '
    NR == 1 && $0 == "---" { in_frontmatter = 1 }
    in_frontmatter && $0 ~ /^disable-model-invocation:/ { next }
    in_frontmatter && NR > 1 && $0 == "---" { in_frontmatter = 0 }
    { print }
  ' skills/pr-walkthrough/SKILL.md > "$temp_dir/pr-walkthrough/SKILL.md"
  skills-ref validate "$temp_dir/pr-walkthrough"
else
  skills-ref validate skills/pr-walkthrough
fi

claude plugin validate . --strict

node <<'NODE'
const plugin = require("./.claude-plugin/plugin.json");
const marketplace = require("./.claude-plugin/marketplace.json");
const marketplacePlugin = marketplace.plugins.find((entry) => entry.source === "./");

if (!marketplacePlugin) {
  console.error("missing marketplace plugin with source ./");
  process.exit(1);
}

if (plugin.version !== marketplacePlugin.version) {
  console.error(
    `version mismatch: plugin=${plugin.version} marketplace=${marketplacePlugin.version}`,
  );
  process.exit(1);
}
NODE
