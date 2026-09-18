# Visible native-tool preflight

Date: 2026-09-17. Evaluator tool evidence only; no hidden reasoning.

[Exact exported tool inputs and outputs](preflight-tools.json) include timestamps and session identity. The evaluator export confirms agent `general`, model `openai/gpt-6-astra`, variant `medium`. This is not one of the planned build-agent trials.

1. `search({query: 'subagent', limit: 30})` returned only `tools.opencode.models`, with `remaining: 0`.
2. `search({namespace: 'opencode', limit: 100})` returned `tools.opencode.models`, `tools.opencode.session_move`, and `tools.opencode.session_rename`, with `remaining: 0`.
3. `tools.opencode.models({provider: 'openai', query: 'astra'})` returned one active model: `openai/gpt-6-astra`, named GPT-6 Astra, variants `low`, `medium`, `high`, `xhigh`, and `max`.
4. `search({query: 'task', namespace: 'opencode', limit: 100})` returned no items and `remaining: 0`.
5. `search({query: 'dispatch', limit: 100})` returned no items and `remaining: 0`.
6. `search({query: 'subagent', limit: 100})` again returned only `tools.opencode.models`, with `remaining: 0`.

The direct tools available to the evaluator were read, glob, grep, patch, shell, skill, webfetch, websearch, execute, and parallel tool calls. None dispatches a native agent.
Parallel tool calls run existing tools; they are not independent report agents.

`jj status` in the owned sibling clone showed a clean working copy on parent `ba48b5c1` before changes.
All repository reads and writes used the owned clone's explicit absolute path or shell workdir.
The session's default working-directory metadata still points to the caller's repository; it was not used for modifying operations.
No tested parent model identity, child model identity, local skill-read trace, or parallel report timing exists because no trial started.
