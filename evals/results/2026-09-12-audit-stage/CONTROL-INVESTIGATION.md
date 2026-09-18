# Investigate first control grades before writers

The selected grader classified all six qualification claims correctly. Its three initial control grades accept most behavior claims,
but reject `/meta` in every control and raise contested prose and omission findings. No writer has run.

## Source packet gap

Every control's metadata says “Fictional source change and deterministic modeled examples”. The source packets establish modeling,
but do not establish fictionality. The experiment documentation does, and it is correctly withheld from graders.
The grader's source-only objection is valid for its packet. Replace only `/meta` with “Deterministic modeled examples”.
This removes an evidence packaging mismatch without changing a behavior claim or the source packet.

## Retry delay ambiguity

The initial grade treats “10, 20, then 40 milliseconds as the attempt index increases” as a claim about the next sentence's
two-retry example. The source accepts any nonnegative retry budget. Its formula can request 40 when the budget is at least three.
The grade's blanket contradiction therefore overstates the evidence, but the paragraph admits that narrower reading.
Make the example explicit: “With a budget of two retries, retryable failures request delays of 10 then 20 milliseconds before the final send.”
Keep the permanent-error and sleep-failure boundaries. The extra local witness checks budgets two and three, including sleep order.

## Findings not used to rewrite controls

- The retry control already says “requested delays”. Demanding a separate wall-clock warning duplicates its stated boundary.
- Transaction prose says publication rejection leaves payment recorded and may also have delivered a notification. Missing notification
  is a possible consequence, not evidence that the supplied prose asserts atomicity. Whether it needs a more explicit sentence is debatable.
- The cache control states the late reader race, one shared Map, and missing generation checks/synchronization. Naming every absent
  mechanism (TTL and cancellation) is not required to explain that boundary under the frozen criteria.
- “The author says” preserves the mandated distinction between the PR body's claim and the implementation. Treating attribution itself
  as reviewer leakage conflicts with the criteria's explicit attribution requirement. Prose judgments still contain subjective uncertainty.

Fresh review will use the exact same generic grading prompt and evidence packet, with only the documented control fields changed.
Initial ratings remain separate. The selected grader and criteria remain frozen; this is not a prompt repair or semantic retry of a grade.

**Complete when:** the revised control hashes, title-only flawed counterparts, local witness, builds, and fresh independent grades are saved.
