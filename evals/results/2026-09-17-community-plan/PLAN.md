# Frozen planning-only comparison

Compare ef6f9456 with the frozen candidate on two fictional offline packets: Sprig greenfield and Tideway improvement. Use identical prompts and packets in both arms, three fresh build sessions per arm per case, openai/gpt-6-astra#medium. Total: twelve sessions; maximum three concurrent; fifteen-minute bound per session. Allow at most one zero-token infrastructure retry and no semantic resampling or extra batches. Freeze candidate, packets, prompt, and criteria before running. Preflight the current API with a neutral request.

Each session receives only the local skill and references, packet.md, and a .gitignore excluding .community/. Start from a fresh sibling jj clone, then remove its history and all unrelated files before handing it to the model. Keep reviewer criteria and other outputs outside that workspace. Verify exported model, agent, directory, tool reads, and unchanged input hashes. Archive raw exports privately, without publishing reasoning; publish generated plans and source-reviewed scores. Remove trial clones only after archiving all outputs.

## Source review criteria

1. Three navigable journeys have meaningful entry, action, durable handoff, and human ownership where needed.
2. Applicable recurring duties use supplied human capacity; no invented SLA, measured workload, or committed time. Proposed allocations are clearly estimates; missing coverage remains unknown.
3. Structure serves supplied jobs and privacy boundaries without unjustified channels, roles, events, or expensive integrations.
4. Privacy, role boundaries, and no-Administrator constraints remain intact.
5. Bug, feedback, security, conduct, and contribution routes match the supplied source; preview remains confidential.
6. Confirmed facts, proposed work, and unknowns remain distinguishable; exact-current labels and live behavior stay unverified.
7. A usable draft is delivered as unapproved, with no live actions, configuration claims, or approval invented.
8. Recurring work fits supplied budgets or remains explicitly conditional; supported existing commitments survive. A proposed budget is not proof of sufficient staffing.
9. Review is triggered by observed redirects, unanswered posts, or staff load, not arbitrary membership growth.

Record artifact quotes and tool evidence, not self-grading claims. Word and channel counts are supplementary, not quality gates. Adopt if all six candidate outputs preserve existing constraints (criteria 3–8) and journey/capacity completeness improves over baseline, or a static instruction conflict is resolved. If baseline already performs well, report no uplift. Audits A1–A3 and guardrails must remain byte-identical. This experiment does not test invocation, live permissions, current labels, real members, or actual route delivery; audits are not rerun because their source is unchanged.
