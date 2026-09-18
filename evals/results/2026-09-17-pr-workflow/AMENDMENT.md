# Build-agent capability amendment

Recorded before the capability smoke prompt and before any PR trial.
The initial preflight inspected the evaluator's `general` tool surface. It did not inspect the planned `build` parent. That does not justify blocking the study.
The initial report and unrun scores are preserved in `initial/`; they are historical, not six failed model outcomes.

Create one fresh `build` session through the current local OpenCode API, using `openai/gpt-6-astra#medium` in its own sibling jj clone. Ask it to dispatch two trivial read-only fixture reports concurrently through its own native tool. The controller creates only the parent. Archive parent and native child exports, tool names, timing, and actual models.
No PR evidence, rubric, or answer is supplied to this smoke. No smoke context is reused by the six trials.

If native dispatch succeeds, run the original six fresh parents and 24 native reports under the frozen source and criteria. If the actual build parent lacks native dispatch, report that demonstrated blocker.
Use at most two concurrent walkthrough parents. Initial waits are 15 minutes; extend by 15 minutes only if an exported parent or child is still actively working. Record each extension before waiting. Permit one new session only for a zero-token infrastructure timeout. No semantic retries or feedback.

All original source hashes and review criteria remain in force. This is a harness correction, not a prompt-tuning arm or model comparison.
