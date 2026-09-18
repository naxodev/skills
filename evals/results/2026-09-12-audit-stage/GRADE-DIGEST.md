
## 0 retry main-1 original 46136718-bf96-44fc-b965-bf5d26fd7cac
{
  "fields": [],
  "omissions": [
    {
      "limitation": "The concurrent probe never enters a retrying state.",
      "evidence": "concurrentCalls uses outcomes [{ effect: true }] with retries 2; each trace is calls 1, effects 1, delays [].",
      "gap": "The recap pairs \"independent counters\" with \"the concurrent probe records two effects\" without saying those effects are two first-attempt successes. The no-shared-counter contract is still stated, but the probe does not show counter isolation under retries."
    },
    {
      "limitation": "The 40 ms delay step is not a recorded probe result.",
      "evidence": "after.exhausted.delays is [10, 20]; no scenario uses retries greater than 2, so `10 * 2 ** 2` is never pushed.",
      "gap": "The mechanism sentence states \"10, 20, 40 milliseconds, and so on\" from the formula. It later correctly reports the two-retry probe as 10 and 20. A reader could still take 40 ms as observed rather than extrapolated. Not a contradiction of the after source."
    }
  ],
  "attribution": [],
  "code": [
    {
      "pointer": "/sections/2/code/0/source",
      "quote": "for (let attempt = 0; attempt <= retries; attempt++) {\n    try {\n      return await send();\n    }\n    // …\n}",
      "note": "Intended elision of catch, but the try is closed before `// …`, so the snippet is not valid JavaScript (try without catch/finally). The loop bound and `return await send()` match both functions. No diagrams are present."
    },
    {
      "pointer": "/sections/2/code/1/source",
      "quote": "catch (error) {\n      if (!error.retryable || attempt === retries) throw error;\n      await sleep(10 * 2 ** attempt);\n    }",
      "note": "Matches after in functions.mjs / source.after. file is functions.mjs. Not a behavior error."
    }
  ],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "judgment": "clear",
        "quote": "A retryability check stops permanent failures immediately, while exponential delays space later attempts. Neither change guarantees exactly-once delivery."
      },
      {
        "judgment": "clear",
        "quote": "The improvement is a more selective retry policy, not a guarantee of one remote effect."
      },
      {
        "judgment": "audit-voice",
        "quote": "Based on the supplied source and modeled probes. No production timing measurements or verification findings were supplied."
      },
      {
        "judgment": "audit-voice",
        "quote": "Fictional change · Delivery retries"
      }
    ],
    "note": "Section prose names the retry budget, the permanent-failure fork, requested versus measured delays, and the exactly-once overclaim with duplicate and concurrent counterexamples. Header/footer voice still reads as an evidence log. Factual status of the listed fields is not failed; reader-facing voice is not a clean pass."
  }
}

## 0 retry main-1 revised 3ee767dc-be43-4d72-9913-b1f90cc446e2
{
  "fields": [],
  "omissions": [],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      "A retryability check stops retries after permanent failures, while exponential backoff increases requested delays before later attempts. These requests do not establish elapsed time. Neither change guarantees exactly-once delivery.",
      "You supply a nonnegative integer, retries, which counts extra attempts: a budget of two permits at most three sends.",
      "The improvement is a more selective retry policy, not a guarantee of one remote effect."
    ],
    "rationale": "The four beats are setting, gap, mechanism, short version, with lead class only on section 0. Claims that could be over-read as guarantees are scoped to requested delays, modeled probes, or denied exactly-once. Second person appears in the setting. No marketing, emoji, TL;DR-at-top, or checkbox report voice. Probe rows used as examples are labeled as probe records rather than universal production proofs. Leakage of \"supplied\"/\"contracts\" is listed separately and is not enough to fail the prose."
  }
}

## 1 transaction main-1 original aa3badbd-be78-4b59-a1ee-53bf4dd07e73
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional change · Source and supplied in-memory probe",
      "status": "unsupported",
      "rationale": "Nothing in source.json, functions.mjs, probe.mjs, or probe-results.json calls the change fictional. The in-memory probe part matches probe-results.assumptions, but the field as a whole asserts an unevidenced framing."
    }
  ],
  "omissions": [
    {
      "limitation": "No cross-call lock is supplied.",
      "where_in_inputs": "source.json contracts[3]: 'No durable outbox, background retry, or cross-call lock is supplied.'",
      "manifest": "/sections/3/content names outbox and background retry, and reports concurrent duplicate notifications, but never names the missing cross-call lock.",
      "materiality": "The concurrent result already shows duplicate delivery. The omitted lock is the contract's name for the missing serialization, not a separate unseen failure mode. Recorded because the contract lists it with the other absences."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "quote": "Putting publish(id) inside the callback makes the database wait for it, but cannot make a rollback retract it.",
        "rating": "pass"
      },
      {
        "quote": "These operations still cannot succeed or fail as one unit.",
        "rating": "pass"
      },
      {
        "quote": "Both calls report an error, so an error alone cannot tell you whether delivery occurred.",
        "rating": "pass"
      },
      {
        "quote": "This change fixes premature notification, not atomic or exactly-once delivery.",
        "rating": "pass"
      }
    ]
  }
}

## 1 transaction main-1 revised 38e18b39-daa4-4aa2-a6aa-f47ea4e88284
{
  "fields": [],
  "omissions": [
    {
      "limitation": "No cross-call lock is supplied.",
      "quote_from_contract": "No durable outbox, background retry, or cross-call lock is supplied.",
      "where_noted": "Section 3 names process stop, missing durable outbox, and missing background retry, and reports two concurrent notifications. It never states the absent cross-call lock from the same contract sentence."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "quote": "A failed commit could leave you with a notification for an unpaid record.",
        "note": "Concrete original failure, hedged, matches before.commit."
      },
      {
        "quote": "These operations still cannot succeed or fail as one unit.",
        "note": "Rejects the atomic reading without overstating the new code."
      },
      {
        "quote": "This change fixes premature notification, not atomic or exactly-once delivery.",
        "note": "States the remaining delivery limits in the recap."
      },
      {
        "quote": "The probe models staged writes and an external counter, rather than a real database. Its assertions cover ordering and these failure outcomes; it does not simulate a process stopping.",
        "note": "Does not treat probe examples as a real database or as a process-kill test."
      }
    ]
  }
}

## 2 cache main-1 original c9bb4141-8429-4fcc-b125-331c8e66fbc6
{
  "fields": [
    {
      "pointer": "/title",
      "quote": "Invalidate after the write, with a concurrency limit",
      "status": "unsupported",
      "rationale": "source.after and functions.mjs after() delete only after await db.write, which matches “Invalidate after the write”. Neither the contracts, before/after functions, nor probes name or implement a concurrency limiter. lateSnapshot shows a remaining stale refill after invalidation, which is a coverage hole rather than a concurrency limit. No supplied input uses the phrase “concurrency limit”."
    },
    {
      "pointer": "/sections/3/content",
      "quote": "The supplied verification file records no findings; the concrete evidence is the source and these bounded probes.",
      "status": "unsupported",
      "rationale": "No verification file or findings list is among source.json, functions.mjs, probe.mjs, or probe-results.json, so “records no findings” is not evidenced here. The rest of the field is supported: fillDuringWrite after nextRead “new”; source.body’s author claim vs lateSnapshot nextRead “old” in both versions; lateSnapshot order (snapshot old → write commit/delete → cache.set old); contract that read has no generation check or in-flight coordination."
    }
  ],
  "omissions": [
    {
      "limitation": "Overlapping probes start with an empty Map, so they model a miss during the write rather than a pre-write delete of a warm entry.",
      "rationale": "probe.mjs overlapping() uses `const cache = new Map()`, while sequential/failedWrite start from `new Map([['key', 'old']])`. Gap prose attributes the miss to deleting first. In the actual fillDuringWrite probe the miss is the empty Map; before() delete is a no-op. A warm cache with after() would hit “old” during the write and would not produce a fill-during-write. That warm overlapping schedule is not in the supplied probes."
    },
    {
      "limitation": "Only two overlapping interleavings are modeled, both single-reader and single-key.",
      "rationale": "probe.mjs overlapping() has lateSnapshot true/false only, key “key”, values “old”/“new”. Failed writes are sequential only. Other interleavings (two readers, miss after delete of a warm entry, reject during overlap) are untested. Footer scopes process/Map/contracts but does not state these probe bounds."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "rating": "fail",
        "pointer": "/sections/3/content",
        "quote": "The supplied verification file records no findings; the concrete evidence is the source and these bounded probes."
      },
      {
        "rating": "fail",
        "pointer": "/sections/3/content",
        "quote": "It does not support the author's broader claim of removing stale reads for concurrent readers."
      },
      {
        "rating": "fail",
        "pointer": "/title",
        "quote": "Invalidate after the write, with a concurrency limit"
      },
      {
        "rating": "pass",
        "pointer": "/dek",
        "quote": "Moving cache deletion after a successful write clears fills completed during that write. An older read can still refill the cache afterward."
      },
      {
        "rating": "pass",
        "pointer": "/sections/1/content",
        "quote": "The supplied probe reproduces this order with explicit promise gates, rather than elapsed time."
      },
      {
        "rating": "pass",
        "pointer": "/sections/2/content",
        "quote": "If the write rejects, execution skips deletion. The database remains unchanged, and the failed-write probe retains its existing old cache entry. Previously, that entry was removed even though the write failed."
      },
      {
        "rating": "pass",
        "pointer": "/sections/3/content",
        "quote": "In the late-snapshot probe, a reader captures old, the update commits and deletes, then the reader finishes and caches old. The next read is stale in both versions."
      }
    ]
  }
}

## 2 cache main-1 revised cdb67700-c294-471c-946f-2664c2825dd0
{
  "fields": [],
  "omissions": [
    "after() does not delete until db.write fulfills, so a cache that already holds old keeps serving hits for the whole pending write. overlapping() starts from an empty Map, so the probes never show that hit path.",
    "Probes run four gated schedules only (sequential, failedWrite, fillDuringWrite, lateSnapshot), each with one reader. They do not combine a fill-during-write with a later snapshot on the same key. Section 3 calls the probes bounded but does not state that combined schedule."
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "rating": "pass",
        "quote": "Moving cache deletion after a successful write clears fills completed during that write. An older read can still refill the cache afterward."
      },
      {
        "rating": "pass",
        "quote": "In that probe, the overlapping reader still receives old, but the next read receives new."
      },
      {
        "rating": "pass",
        "quote": "The next read is stale in both versions. The unchanged reader has no generation check or coordination with updates."
      },
      {
        "rating": "fail",
        "quote": "It does not support the author's broader claim of removing stale reads for concurrent readers."
      },
      {
        "rating": "fail",
        "quote": "The supplied verification file records no findings; the concrete evidence is the source and these bounded probes."
      }
    ]
  }
}

## 3 retry main-2 original 948a4239-fae8-4977-966a-2f8ec7814e03
{
  "fields": [],
  "omissions": [],
  "attribution": [
    {
      "pointer": "/sections/1/content",
      "quote": "This removes an attempt that the error contract says should not happen.",
      "issue": "Contract 1 only says a send rejection is an object with a boolean retryable property. It does not forbid a later send. Stopping on retryable: false is after() behavior and the author's avoid-permanent-failures claim, not a rule the error contract itself states."
    }
  ],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      "These are requested delays: the probe's sleep resolves immediately and measures no elapsed time.",
      "A zero retry budget still permits one send. If sleep rejects, its error propagates and prevents another send.",
      "There is no deduplication or idempotency contract.",
      "It does not establish the author's claimed exactly-once delivery guarantee.",
      "Retry policy improves, but exactly-once delivery remains unsupported."
    ],
    "rationale": "Named probes, requested-versus-measured delays, zero-budget, sleep rejection, and the duplicate/idempotency contracts are stated in line with source.json and probe-results.json. The same reader-facing copy also uses reviewer vocabulary (unsupported, author's claimed, supplied) and mis-cites the error contract, so the prose is not a clean pass. No field is contradicted by the traces, so it is not a factual fail."
  }
}

## 3 retry main-2 revised d583d809-e116-4580-912f-460a765d3f05
{
  "fields": [],
  "omissions": [],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      "These are requested delays: the probe's sleep resolves immediately and measures no elapsed time.",
      "The concurrent probe records an effect from each modeled call; it does not establish how an unshown delivery implementation coordinates calls.",
      "It does not establish the author's claimed exactly-once delivery guarantee.",
      "Based on the supplied source and probe results. No production timing measurements or separate verification findings are supplied.",
      "Retry policy improves, but exactly-once delivery remains unsupported."
    ],
    "rationale": "No contradicted program claim. Several sentences correctly scope modeled probes and refuse an exactly-once guarantee from passing examples. Footer and recap still leak audit diction ('verification findings', 'unsupported'), so reader-facing prose is not a clean pass or fail."
  }
}

## 4 transaction main-2 original b15da6e3-cbf4-4e62-9694-482b9dcd207f
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional change · Source and supplied in-memory probe results",
      "status": "unsupported",
      "rationale": "'Fictional change' does not appear in source.json, functions.mjs, probe.mjs, or probe-results.json. The second clause matches probe-results.json assumptions (in-memory staged transaction and notification counter)."
    }
  ],
  "omissions": [
    {
      "limitation": "No cross-call lock is supplied.",
      "source": "source.json contracts[3]",
      "rationale": "Contract 4 states no cross-call lock. The recap reports two concurrent notifications and no publication dedup, but it never names the missing lock. The duplication outcome is disclosed; the lock limitation is not."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "quote": "The author's atomicity claim therefore needs a narrower reading",
        "reason": "Reviewer diction in a reader-facing section."
      },
      {
        "quote": "the supplied verification file records no separate findings",
        "reason": "Internal process note, not an explanation of payment or publish."
      },
      {
        "quote": "If publication succeeded and the later commit failed, the original function left the payment unpaid but sent one notification.",
        "reason": "Concrete and accurate; not enough to pass the page while the leakage remains."
      }
    ]
  }
}

## 4 transaction main-2 revised a8a0205f-0702-4255-8d3e-5d16c14e95e5
{
  "fields": [
    {
      "pointer": "/sections/2/content",
      "quote": "These are in-memory observations; the supplied verification file records no separate findings.",
      "status": "unsupported",
      "claims": [
        {
          "quote": "The changed function waits for the transaction itself, rather than publishing inside its callback:",
          "status": "supported",
          "rationale": "CODE:0 / source.after / functions.mjs after: publish is after the transaction await, not inside the callback."
        },
        {
          "quote": "Under the supplied contract, that first await completes successfully only after commit.",
          "status": "supported",
          "rationale": "Contract 1: fulfills with undefined after commit."
        },
        {
          "quote": "A write or commit rejection exits before publish.",
          "status": "supported",
          "rationale": "after.write and after.commit in probe-results.json: notifications 0; events end at rollback; publish is absent."
        },
        {
          "quote": "Publication failure now leaves the payment committed.",
          "status": "supported",
          "rationale": "after.publish-before and after.publish-after: paid true. Contract 2 places publish outside the transaction."
        },
        {
          "quote": "The probe models the two possible publication failures explicitly:",
          "status": "supported",
          "rationale": "Contract 2 names reject-before and reject-after visible notification. CODE:1 matches probe.mjs those two throws around the increment. 'Two possible' is contract-scoped, not every runtime fault."
        },
        {
          "quote": "The counter represents an externally visible notification.",
          "status": "supported",
          "rationale": "probe.mjs increments trace.notifications; probe-results.json assumptions call it an external notification counter."
        },
        {
          "quote": "Recorded results leave the changed payment paid in both cases, with zero notifications before the increment and one afterward.",
          "status": "supported",
          "rationale": "after.publish-before: paid true, notifications 0. after.publish-after: paid true, notifications 1. Matches increment placement in probe.mjs. Scoped to recorded results."
        },
        {
          "quote": "These are in-memory observations",
          "status": "supported",
          "rationale": "probe-results.json assumptions: in-memory staged transaction and counter."
        },
        {
          "quote": "the supplied verification file records no separate findings.",
          "status": "unsupported",
          "rationale": "Supplied review inputs are manifest, fields, source, functions.mjs, probe.mjs, and probe-results.json. None is a verification file or a findings list. The claim is not evidenced by those inputs."
        }
      ],
      "rationale": "Mechanism and probe sentences match source.after, contract 1–2, CODE:0–1, and after.publish-* results. The verification-file sentence has no support in the supplied inputs, so the field is unsupported."
    }
  ],
  "omissions": [
    {
      "limitation": "Contract 4 also supplies no cross-call lock; the article never names that absence.",
      "rationale": "It reports concurrent probe notifications 2 in both versions, which is the modeled effect, but it does not state the lock gap the contract lists beside outbox and retry."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "quote": "Moving a notification past the commit boundary prevents one false signal, but does not make payment and delivery atomic.",
        "rating": "pass",
        "rationale": "Order versus atomicity, hedged as one false signal. Matches after versus before.commit and the remaining split outcomes."
      },
      {
        "quote": "In the supplied probe, the payment starts unpaid and remains unpaid, with one notification recorded. Its event sequence is begin, write, publish, rollback.",
        "rating": "pass",
        "rationale": "Scoped to the probe; sequence matches before.commit exactly. Does not treat that trace as a universal runtime."
      },
      {
        "quote": "No durable outbox or background retry closes that gap. Retrying an ambiguous publication can duplicate delivery: markPaid is idempotent, but publication has no deduplication guarantee. The concurrent probe produces two notifications in both versions.",
        "rating": "pass",
        "rationale": "Contract 3–4 plus the concurrent traces. Probe result is labeled as the concurrent probe."
      },
      {
        "quote": "changing the order prevents this invocation from publishing when its commit fails, but cannot make the two operations succeed together.",
        "rating": "uncertain",
        "rationale": "Correct if it denies atomic joint success. Misleading if it denies the happy path: after.none is paid true with notifications 1."
      },
      {
        "quote": "the supplied verification file records no separate findings.",
        "rating": "fail",
        "rationale": "Reader-facing factual clause with no support in the supplied source, functions, or probe files."
      }
    ]
  }
}

## 5 cache main-2 original 4d45e673-2df4-48be-b0a1-4a110bf64939
{
  "fields": [],
  "omissions": [
    {
      "issue": "Original failed-write clearing is not described",
      "evidence": "probe-results.json before.failedWrite.cachedAfterUpdate is null (probe.mjs asserts that). before() deletes before await, so a rejected write still drops a cache entry while stored stays 'old'. The walkthrough only states that after() preserves the cache on failure."
    },
    {
      "issue": "Contract names generation, cancellation, and TTL; the prose does not",
      "evidence": "source.json contract 4: 'No generation check, cancellation, TTL, or synchronization of in-flight readers is supplied.' Section 3 says in-flight snapshots remain unchecked and section 2 notes unconditional cache.set, but never names TTL, cancellation, or a generation check."
    },
    {
      "issue": "Dek and recap state clearing as a general property of the move",
      "evidence": "probe-results.json and probe.mjs show one gated fillDuringWrite schedule and one gated lateSnapshot schedule in one process and one Map. Passing those examples does not prove every concurrent schedule. Section 2 scopes the overlapping outcome with 'In that probe'; /dek and /sections/3/content do not."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "judgment": "pass",
        "quote": "A cache hit returns immediately. On a miss, the reader asks the database for a snapshot, then caches the result when its promise resolves.",
        "reason": "Names the hit and miss paths in the order read() actually runs."
      },
      {
        "judgment": "pass",
        "quote": "Under the original update, both the overlapping reader and the next reader receive old.",
        "reason": "Concrete probe outcome, not an abstraction."
      },
      {
        "judgment": "pass",
        "quote": "The late-snapshot probe demonstrates this in both versions: storage contains new, yet the next read returns old.",
        "reason": "States the remaining hole with the probe's stored vs nextRead values."
      },
      {
        "judgment": "fail",
        "quote": "The author's broader claim that it removes stale reads, including concurrent readers, exceeds the evidence.",
        "reason": "Skimmer recap reads as a review note instead of restating what the change does and does not do."
      },
      {
        "judgment": "fail",
        "quote": "both versions pass the sequential successful-write case",
        "reason": "Test-report voice in the mechanism section."
      },
      {
        "judgment": "fail",
        "quote": "No separate verification findings were supplied.",
        "reason": "Footer talks about the review pipeline, not the component."
      }
    ]
  }
}

## 5 cache main-2 revised d2aaea11-ee32-4d1e-adab-6cdbbd8be583
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional component study · One process, one shared Map",
      "status": "unsupported",
      "rationale": "One process, one shared Map is in probe-results.assumptions and contract 1 (same Map; no distributed cache shown). Neither source nor probe calls the study fictional."
    }
  ],
  "omissions": [
    {
      "quote": "read is unchanged. No generation check, cancellation, TTL, or synchronization of in-flight readers is supplied.",
      "rationale": "The close says in-flight snapshots remain unchecked and points at unconditional cache.set. It never names generation checks, cancellation, or TTL from contract 4, which are the supplied reasons those late fills are allowed."
    },
    {
      "quote": "const cache = new Map();",
      "rationale": "overlapping() always starts with an empty Map. After the change, a pre-existing cache entry stays in the Map until write fulfills, so a concurrent hit would still return old. The walkthrough never states that remaining hit window, and no probe starts overlapping() with Map([['key','old']])."
    },
    {
      "quote": "Passing examples do not prove universal guarantees.",
      "rationale": "fillDuringWrite and lateSnapshot are two gated orders in one process and one Map. Dek and the close state clearing and preservation as general facts. Section 2 scopes only the overlapping-reader sentence with in that probe."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "pointer": "/sections/3/content",
        "quote": "The author's broader claim that it removes stale reads, including concurrent readers, exceeds the evidence.",
        "rating": "fail",
        "rationale": "Reader-facing close argues like a review instead of stating modeled behavior."
      },
      {
        "pointer": "/sections/2/content",
        "quote": "both versions pass the sequential successful-write case",
        "rating": "fail",
        "rationale": "Test-verdict wording in the mechanism section."
      },
      {
        "pointer": "/footer",
        "quote": "No separate verification findings were supplied.",
        "rating": "fail",
        "rationale": "Input-bundle meta in reader-facing footer."
      },
      {
        "pointer": "/dek",
        "quote": "Moving invalidation clears stale fills completed during a write, but an older read can still refill the cache afterward.",
        "rating": "pass",
        "rationale": "States the fill-during-write effect and the late-refill limit together."
      },
      {
        "pointer": "/sections/2/content",
        "quote": "In that probe, the overlapping reader still receives old, but the next read receives new.",
        "rating": "pass",
        "rationale": "Scoped to the probe and matches after.fillDuringWrite."
      },
      {
        "pointer": "/sections/2/content",
        "quote": "The late-snapshot probe demonstrates this in both versions: storage contains new, yet the next read returns old.",
        "rating": "pass",
        "rationale": "Matches lateSnapshot.stored new and nextRead old for before and after."
      },
      {
        "pointer": "/sections/3/content",
        "quote": "this change does not guarantee fresh reads after an update completes",
        "rating": "pass",
        "rationale": "Correctly refuses a universal freshness guarantee after lateSnapshot."
      }
    ]
  }
}

## 6 retry main-3 original c784bf37-c542-4dd9-a78f-60427b76c967
{
  "fields": [],
  "omissions": [],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      "Neither change guarantees exactly-once delivery.",
      "It does not establish whether a rejected send already changed the remote system.",
      "These are requested delays: the probe resolves sleep immediately.",
      "The exhaustion probe records three sends and delays of 10 and 20 milliseconds, versus 10 and 10 before.",
      "There is no deduplication or idempotency contract."
    ],
    "rationale": "Reader-facing claims are scoped to the loop, requested delays, and named probe recordings. Probe outcomes are reported as records, not as universal production guarantees. Exactly-once is denied using contract 2 and the duplicate traces. Leakage of packet/author-review phrasing is listed separately and does not turn those scoped statements into overclaims."
  }
}

## 6 retry main-3 revised a4864bc6-3551-47b8-af9f-b8968a2e7305
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional change · Source and deterministic probe results",
      "status": "unsupported",
      "rationale": "\"Source and deterministic probe results\" matches probe-results.json assumptions (deterministic modeled outcomes). \"Fictional change\" does not appear in source.json, functions.mjs, probe.mjs, or probe-results.json."
    }
  ],
  "omissions": [],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      "Fictional change · Source and deterministic probe results",
      "Based on the supplied source and modeled probes. No timing or production measurements; no separate verification findings were supplied.",
      "In the supplied permanent-failure probe",
      "The supplied contract does not identify who sets that classification. It does not establish whether a rejected send already changed the remote system.",
      "no lock or cross-call delivery exclusion is supplied",
      "it does not establish the internal state of an unshown send implementation"
    ],
    "rationale": "The through-line is clear and the four beats stay on retry filtering versus exactly-once. Reader-facing prose still fails: meta, footer, gap, and recap keep review-packet phrasing and nearly copy the source contracts instead of translating them."
  }
}

## 7 transaction main-3 original 65cc3147-5eb0-4c1f-898b-d58addf1b7b8
{
  "fields": [],
  "omissions": [
    {
      "limitation": "Contract 4 also states that no cross-call lock is supplied.",
      "where_omitted": "/sections/3/content",
      "note": "The concurrent two-notification result is stated. The missing lock itself is not named, unlike outbox and background retry from the same contract sentence."
    },
    {
      "limitation": "'Failed payment transactions no longer trigger publication' is new for commit failure, not for write failure.",
      "where_omitted": "/sections/3/content",
      "note": "before.write already has notifications=0. The change versus before is the commit-failure path (before.commit.notifications=1 vs after.commit.notifications=0). The recap does not distinguish those fault classes."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "quote": "The author describes payment and notification as atomic, but this code establishes ordering, not an all-or-nothing result.",
        "note": "Corrects the source.json author claim using after.publish-before and after.publish-after, without treating those probes as exactly-once proof."
      },
      {
        "quote": "These results support the ordering change, not exactly-once delivery or atomicity.",
        "note": "States the limit of the in-memory results instead of promoting them into a universal guarantee."
      },
      {
        "quote": "Based on the supplied source and probes. No real database or process-kill simulation was performed.",
        "note": "Discloses the probe.mjs / probe-results.json modeling limit in reader-visible footer text."
      },
      {
        "quote": "Publication, however, is external: placing it inside the callback does not make the notification part of the database transaction.",
        "note": "Explains contract 2 in program terms before the gap section uses the failed-commit probe."
      }
    ]
  }
}

## 7 transaction main-3 revised 174fc77e-cb13-4448-82ef-642c58b04258
{
  "fields": [],
  "omissions": [
    {
      "limitation": "Contract 4 also says no cross-call lock is supplied.",
      "status": "partially covered",
      "rationale": "Section 3 reports two notifications under concurrent calls, which is the observable effect. It never names the missing cross-call lock. Outbox, background retry, process-stop, in-memory probes, and no process-kill simulation are stated."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "verdict": "pass",
        "quote": "Moving publication past the commit prevents notifications for rolled-back payments, but leaves delivery as a separate operation.",
        "rationale": "States the ordering win and keeps delivery separate. Does not promote the author's atomicity claim."
      },
      {
        "verdict": "pass",
        "quote": "A process stop between commit and publication can still leave a paid record without a notification; no durable outbox or background retry is supplied.",
        "rationale": "Names the remaining hole as a possibility. Does not pretend a process-kill probe ran."
      },
      {
        "verdict": "pass",
        "quote": "These results support the ordering change, not exactly-once delivery or atomicity.",
        "rationale": "Keeps passing probe rows from becoming a universal guarantee."
      },
      {
        "verdict": "pass",
        "quote": "The author describes payment and notification as atomic, but this code establishes ordering, not an all-or-nothing result.",
        "rationale": "Attributes the atomicity claim to the author and contradicts it with after() plus publish-before/after probes."
      }
    ]
  }
}

## 8 cache main-3 original 6aad2545-b4fb-4115-8f10-9edcb11b9718
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional change · Single-process cache · Source and supplied probe results",
      "status": "unsupported",
      "rationale": "\"Single-process cache\" matches the Map contract and probe assumptions (\"One process and one Map\"). \"Source and supplied probe results\" matches the provided inputs. Nothing in source.json, functions.mjs, probe.mjs, or probe-results.json states that the change is fictional."
    }
  ],
  "omissions": [
    {
      "limitation": "Contract 4 also says no cancellation or TTL is supplied. The recap names only the missing generation check and synchronization.",
      "whereOmitted": "/sections/3/content"
    },
    {
      "limitation": "Probes cover four gated schedules per implementation (sequential, failedWrite, fillDuringWrite, lateSnapshot), one process, one Map, and one key. The dek and recap state that post-write deletion clears stale fills that finish before invalidation. That outcome is shown for fillDuringWrite, not for other concurrent shapes (multiple readers, multiple writers, or ungated timing).",
      "whereOmitted": "/dek, /sections/3/content"
    },
    {
      "limitation": "overlapping() starts with an empty Map, while sequential() starts with key already cached as \"old\". The after() fill-during-write story assumes a miss that refills during the write. A warm-cache overlapping reader under after() is not in the supplied results.",
      "whereOmitted": "/sections/2/content"
    }
  ],
  "attribution": [
    {
      "pointer": "/sections/3/content",
      "quote": "the author's broader claim that concurrent stale reads disappear",
      "problem": "source.body says the author claims invalidating after the write \"removes stale cache reads, including concurrent readers.\" The recap restates that as concurrent stale reads \"disappear\" and calls it a \"broader claim.\" That is a stronger, narrower paraphrase than the supplied sentence."
    }
  ],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "quote": "It does not support the author's broader claim that concurrent stale reads disappear.",
        "why": "The recap, which is reader-facing, switches into a fact-check of the author instead of stating remaining program behavior."
      },
      {
        "quote": "No separate verification findings were supplied.",
        "why": "Footer talks to the review process, not to a reader of the component study."
      },
      {
        "quote": "In the supplied results, the overlapping reader still receives old, but the next read fetches new.",
        "why": "This sentence is accurate against after.fillDuringWrite and is the kind of concrete, scoped claim the rest of the mechanism section uses."
      }
    ]
  }
}

## 8 cache main-3 revised 70931993-d1ce-48ac-9a35-deb6a2b6cb3b
{
  "fields": [
    {
      "pointer": "/meta",
      "quote": "Fictional change · Single-process cache · Source and supplied probe results",
      "status": "unsupported",
      "rationale": "Single-process cache matches contract 1 and probe.mjs assumptions (one process, one Map). Source and supplied probe results names the listed inputs. Fictional change is not in source.json, functions.mjs, or the probe files."
    }
  ],
  "omissions": [
    {
      "detail": "The fill-during-write clearance is one gated interleaving (writer starts, in-flight read completes, then write commits). Other schedules are not in the results.",
      "evidence": "probe.mjs overlapping(fn, false) and assumptions: Explicit promise gates schedule snapshot capture, write commit, and cache fill. The dek and recap say one race, but section 2 also states deletion removes a cache fill completed during the write as a general because."
    },
    {
      "detail": "A rejected write under before already deleted the entry (cachedAfterUpdate null). The gap never states that failed-write eviction.",
      "evidence": "probe-results.json before.failedWrite.cachedAfterUpdate is null, stored old, nextRead old. Section 3 only credits after with avoiding eviction on failed writes."
    },
    {
      "detail": "Contract 4 also says no cancellation or TTL is supplied. The recap names generation check and synchronization only.",
      "evidence": "source.json contracts[3]: No generation check, cancellation, TTL, or synchronization of in-flight readers is supplied. /sections/3/content omits cancellation and TTL."
    }
  ],
  "attribution": [
    {
      "pointer": "/sections/3/content",
      "quote": "the author's broader claim that concurrent stale reads disappear",
      "detail": "source.body says invalidating after the write removes stale cache reads, including concurrent readers. The author is the right speaker. disappear is tighter than removes and is not in the source sentence."
    }
  ],
  "code": [],
  "prose": {
    "rating": "fail",
    "reason": "The mechanism sentences match the contracts and gated probes. Reader-facing fields still carry audit diction (supplied, verification findings, does not support the author's broader claim) and an unevidenced Fictional change label. Passing examples do not prove universal guarantees; the dek’s one race is the right scope, but leakage in meta, footer, and the recap fails the reader-facing bar.",
    "quotes": [
      {
        "quote": "A cache hit returns immediately; a miss asks the database and saves the result.",
        "verdict": "pass",
        "reason": "States read() without review voice."
      },
      {
        "quote": "Nothing checks whether a write occurred while db.read was pending. Whatever snapshot arrives becomes the cached value.",
        "verdict": "pass",
        "reason": "Matches the unchanged reader and contract 4."
      },
      {
        "quote": "An older read can still repopulate the cache afterward.",
        "verdict": "pass",
        "reason": "Modal can matches lateSnapshot without a universal guarantee."
      },
      {
        "quote": "In the supplied results, the overlapping reader still receives old, but the next read fetches new.",
        "verdict": "pass",
        "reason": "Numbers match after.fillDuringWrite. The sentence is still audit-flavored (see leakage)."
      },
      {
        "quote": "It does not support the author's broader claim that concurrent stale reads disappear.",
        "verdict": "fail",
        "reason": "Reviewer scoring in the recap, with disappear not in source.body."
      },
      {
        "quote": "No separate verification findings were supplied.",
        "verdict": "fail",
        "reason": "Process inventory, not program explanation."
      },
      {
        "quote": "Fictional change · Single-process cache · Source and supplied probe results",
        "verdict": "fail",
        "reason": "Fictional change is unevidenced; the rest is packet labeling."
      }
    ]
  }
}

## 9 retry correct original e6184a5d-3f57-4533-9292-6bc782b14fac
{
  "fields": [
    {
      "pointer": "/sections/0/title",
      "quote": "The old loop retried every rejection",
      "status": "contradicted",
      "rationale": "before retries send rejections until attempt === retries (probe before.permanent.calls is 2 after a permanent send error). It does not retry every rejection: await sleep(10) has no local catch, and the contract says sleep rejection propagates. Probe before.sleepFailure is calls 1, error 'sleep-failed' — the sleep rejection is not retried. Same-section body narrows this to rejected sends."
    }
  ],
  "omissions": [
    {
      "limitation": "Requested delays are not measured wall-clock durations; probe sleeps resolve immediately.",
      "evidence": "Contract: 'Delays are requested milliseconds, not measured wall-clock durations.' Probe assumptions: immediate sleep promises; no timing or production measurement.",
      "coverage": "The dek and section 1 say 'requested delays' / 'request delays of 10 then 20 milliseconds' but never state that elapsed time is unmeasured. A reader can still take 10 and 20 as observed waits.",
      "material": true
    },
    {
      "limitation": "retries is a nonnegative integer precondition; the loop does not validate other values.",
      "evidence": "Contract: 'retries is a nonnegative integer.' Both functions use for (let attempt = 0; attempt <= retries; attempt++). Probe only uses 0 and 2.",
      "coverage": "Unmentioned. Negative retries would skip the loop and fall through with no return value. Not modeled.",
      "material": false
    },
    {
      "limitation": "send rejections are specified as objects with a boolean retryable property.",
      "evidence": "Contract: 'send returns a promise and rejects with an object containing a boolean retryable property.' after reads error.retryable.",
      "coverage": "Unmentioned. Missing retryable is falsy, so after would treat it as non-retryable and throw. Not modeled.",
      "material": false
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      "but the supplied contract permits a send to reject after its effect commits",
      "The modeled lost-acknowledgment example records two effects.",
      "Deterministic modeled examples"
    ],
    "rationale": "Visible copy uses harness terms (supplied contract, modeled example, recorded effects) instead of naming the send/sleep behavior for a reader. Factual density in those sentences does not make the diction reader-facing."
  }
}

## 9 retry correct revised ee6380a7-f39e-4455-99af-5ef5218d3afa
{
  "fields": [],
  "omissions": [
    {
      "limitation": "Delays are requested milliseconds, not measured wall-clock durations; probe sleeps fulfill immediately and there is no timing or production measurement.",
      "status": "partially present",
      "rationale": "Prose uses 'requested' for delays and /meta names deterministic modeled examples. No field states that durations were not measured, or that probe sleeps are immediate promises. Unclear whether that omission is material once 'requested' and 'modeled' are already on the page."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "pointer": "/sections/2/content",
        "quote": "the supplied contract",
        "judgment": "fail",
        "reason": "Review-packet phrasing in a reader-facing section."
      },
      {
        "pointer": "/sections/2/content",
        "quote": "The modeled lost-acknowledgment example records two effects.",
        "judgment": "fail",
        "reason": "Harness/result wording instead of explaining the boundary to a reader."
      },
      {
        "pointer": "/sections/0/content",
        "quote": "The old loop retried rejected sends regardless of their retryable flag, while retry budget remained and sleep fulfilled.",
        "judgment": "pass",
        "reason": "Concrete loop behavior without audit framing."
      },
      {
        "pointer": "/dek",
        "quote": "Permanent failures stop immediately; retryable failures use increasing requested delays without a delivery deduplication guarantee.",
        "judgment": "pass",
        "reason": "Reader-facing through-line that names the filter, the delay policy, and the delivery gap."
      }
    ]
  }
}

## 10 retry flawed original 70e0c08f-f754-4347-90ad-0955ad58ed9f
{
  "fields": [
    {
      "pointer": "/title",
      "quote": "Retry filtering makes every delivery exactly once",
      "status": "contradicted",
      "rationale": "Source body attributes exactly-once delivery to the author, while contract 2 states a send rejection may follow a committed remote effect and supplies no deduplication or idempotency. Probe results.after.duplicate and results.before.duplicate both record effects=2 after a lost acknowledgment ({ effect: true, error: transient } then { effect: true }). Passing that retryable path does not establish a universal exactly-once guarantee; the modeled counterexample contradicts the title."
    }
  ],
  "omissions": [
    {
      "limitation": "Send classification is the boolean retryable property on the rejection object; retries is a nonnegative integer.",
      "source": "Contract 1: 'retries is a nonnegative integer. send returns a promise and rejects with an object containing a boolean retryable property.'",
      "note": "Prose says 'non-retryable error' and uses a two-retry example, but never names retryable or the zero-budget edge. results.after.zeroBudget and results.before.zeroBudget are calls=1, delays=[] when retries=0. That edge is absent from the manifest."
    },
    {
      "limitation": "Modeled sleeps are immediate promises; delays are not measured wall-clock durations and there is no production measurement.",
      "source": "Contract 3 and probe-results.json assumptions: 'Deterministic modeled send outcomes and immediate sleep promises; no timing or production measurement.'",
      "note": "/meta says 'Deterministic modeled examples' and delay prose says 'requested', but the explicit no-timing / no-production-measurement limit is not stated in reader-facing body copy."
    }
  ],
  "attribution": [
    {
      "pointer": "/title",
      "quote": "Retry filtering makes every delivery exactly once",
      "rationale": "Source body attributes exactly-once delivery to the author ('The author says this ... makes delivery exactly once'). The title states that claim as a fact of retry filtering, with no author attribution. /sections/2/content later attributes the same claim correctly, so the title is the attribution error."
    }
  ],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "quote": "Retry filtering makes every delivery exactly once",
        "judgment": "fail",
        "reason": "Reader-facing heading asserts a universal exactly-once guarantee that the dek, footer, contracts, and duplicate probe contradict."
      },
      {
        "quote": "the supplied contract permits a send to reject after its effect commits. The modeled lost-acknowledgment example records two effects.",
        "judgment": "fail",
        "reason": "Correct facts, but reviewer/probe diction rather than reader-facing prose."
      },
      {
        "quote": "Permanent failures stop immediately; retryable failures use increasing requested delays without a delivery deduplication guarantee.",
        "judgment": "pass",
        "reason": "Careful, scoped, and aligned with after(), contracts 2–3, and the exhausted/permanent probes. A passing sentence does not salvage the title."
      },
      {
        "quote": "With a budget of two retries, retryable failures request delays of 10 then 20 milliseconds before the final send. This permits up to three sends.",
        "judgment": "pass",
        "reason": "Example-scoped ('up to', named budget) rather than a universal delivery guarantee. Matches results.after.exhausted."
      }
    ]
  }
}

## 10 retry flawed revised 80e9eafa-b141-4176-b3c4-1a73cf3696cf
{
  "fields": [],
  "omissions": [
    {
      "limitation": "The lost-acknowledgment duplicate is already present in the old loop.",
      "evidence": "probe-results.json results.before.duplicate.effects is 2 and results.after.duplicate.effects is 2. contracts[1] applies to send, not only to after().",
      "whyMaterial": "/sections/2 presents two effects as the boundary of retry filtering. The modeled duplicate does not appear only after the change. Omitting the matching before trace can make the gap look like a consequence of filtering rather than the send contract."
    },
    {
      "limitation": "Modeled sleeps fulfill or reject immediately; delays are not measured durations.",
      "evidence": "probe-results.json assumptions: \"Deterministic modeled send outcomes and immediate sleep promises; no timing or production measurement.\" contracts[2]: delays are requested milliseconds, not measured wall-clock durations.",
      "whyMaterial": "/meta says \"Deterministic modeled examples\" and delay prose says \"requested\", but no reader-facing sentence states that the 10 and 20 figures were not timed and that production sleep duration is unmeasured. That is the remaining half of contracts[2] and the probe assumption."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "quote": "The author describes exactly-once delivery, but the supplied contract permits a send to reject after its effect commits.",
        "role": "fail",
        "reason": "This is published section HTML. It keeps review-packet wording (\"supplied contract\") in the reader-facing body."
      },
      {
        "quote": "The modeled lost-acknowledgment example records two effects.",
        "role": "fail",
        "reason": "Reader-facing prose reports a harness example rather than the send/retry behavior those results stand for."
      },
      {
        "quote": "If the first two sends reject with retryable errors, the loop requests delays of 10 then 20 milliseconds, provided execution reaches each wait.",
        "role": "pass",
        "reason": "Scoped to a concrete budget and qualified so one wait is not treated as a universal delay sequence. Passing this sentence does not make the leaked review diction pass."
      },
      {
        "quote": "It bounds send attempts per invocation, not successful delivery or duplicate effects.",
        "role": "pass",
        "reason": "States the per-call bound and refuses an exactly-once reading. It does not repair section 2's reviewer language."
      }
    ]
  }
}

## 11 transaction correct original 04e4dd5f-592b-4585-aceb-1b6e2993e062
{
  "fields": [],
  "omissions": [],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      "In the modeled commit failure, a notification escaped while the database write rolled back.",
      "A write or commit rejection therefore prevents publication in that invocation.",
      "It may also have delivered a notification before rejecting.",
      "The change prevents publication before a failed commit. It does not make the committed payment and the external notification atomic."
    ],
    "rationale": "Reader-facing sentences scope the old escape to the modeled commit fault, limit the new commit/write guarantee to that invocation, and use 'may' for publish-visible-then-reject. The dek and short version state the commit-ordering win without treating probe traces as a universal payment-plus-notification guarantee. Passing concurrent and happy-path traces are not used to claim atomic delivery."
  }
}

## 11 transaction correct revised 5d4eb988-bc08-4727-afef-d2b583e29b49
{
  "fields": [],
  "omissions": [
    {
      "limitation": "A later sequential retry of after() can publish again after a prior visible notification, because markPaid is idempotent and publish has no delivery dedup.",
      "why_material": "Section 2 names concurrent invocations only. A reader can miss that a single later retry is enough to double-notify.",
      "evidence": "Contract: markPaid is idempotent for a given id; neither transaction nor publish supplies delivery deduplication. Probe after.publish-after: paid true, notifications 1, then error. functions.mjs after() always calls publish after the transaction. No sequential-retry probe is supplied."
    },
    {
      "limitation": "The contract's missing cross-call lock is never named.",
      "why_material": "Weak. Concurrent duplicate publish is already stated. The lock is the mechanism, not a separate reader-facing outcome.",
      "evidence": "Contract: no cross-call lock is supplied. Probe after.concurrent.notifications is 2."
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "verdict": "pass",
        "pointer": "/sections/1/content",
        "quote": "A write or commit rejection therefore prevents publication in that invocation.",
        "why": "States the ordering fact and scopes it to one invocation. Does not treat the probe as a universal guarantee."
      },
      {
        "verdict": "pass",
        "pointer": "/sections/3/content",
        "quote": "The change prevents publication before a failed commit. It does not make the committed payment and the external notification atomic.",
        "why": "Separates the demonstrated commit-order fix from the author's atomicity overclaim."
      },
      {
        "verdict": "pass",
        "pointer": "/sections/2/content",
        "quote": "Its rejection after commit leaves the payment recorded. It may also have delivered a notification before rejecting.",
        "why": "Matches publish-before versus publish-after probes and the external-publish contract. may is required because rejection can precede delivery."
      },
      {
        "verdict": "pass",
        "pointer": "/dek",
        "quote": "A failed commit now prevents publication, while publication failure leaves a committed payment intact.",
        "why": "Accurate for after() order and the commit / publish-before / publish-after probes. Broader than in that invocation, but later sections add the delivery gap."
      }
    ]
  }
}

## 12 transaction flawed original 4ef5c2a4-d9f5-4cb1-912d-8a6d3e2a13ca
{
  "fields": [
    {
      "pointer": "/title",
      "quote": "Payment and notification now commit atomically",
      "status": "contradicted",
      "rationale": "Source body attributes atomicity to the author as a claim, not as a contract. Contract: publish is external, outside the database transaction; its rejection may occur before or after a visible notification; a process can stop between awaited operations; no durable outbox, background retry, or cross-call lock; neither transaction nor publish supplies delivery deduplication. After control flow commits then publishes. Probe after.publish-before: paid true, notifications 0. Probe after.publish-after: paid true, notifications 1, then rejection. Probe after.concurrent: notifications 2 despite idempotent markPaid. Those splits contradict atomic commit of payment and notification. Passing after.none (paid true, notifications 1, events begin/write/commit/publish) does not prove a universal atomic guarantee."
    }
  ],
  "omissions": [
    {
      "limitation": "Contract lists no cross-call lock; the manifest never names that absence.",
      "severity": "low",
      "rationale": "Section 2 already states concurrent invocations can each publish despite idempotent markPaid, which is the observable gap a missing lock would allow. Not naming the lock does not hide the duplicate-publish outcome.",
      "observed_contradiction": false
    }
  ],
  "attribution": [
    {
      "pointer": "/title",
      "quote": "Payment and notification now commit atomically",
      "error": "Source body presents atomicity as what the author says, not as a supplied contract. The title states that claim as the article's fact. Section 2 later attributes the same claim to the author and rejects it.",
      "observed_contradiction": true
    }
  ],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      "Payment and notification now commit atomically",
      "It does not make the committed payment and the external notification atomic.",
      "The supplied code has no durable outbox or delivery deduplication."
    ],
    "rationale": "The headline states atomic commit of payment and notification. Contracts and probes contradict that (external publish, commit-then-publish split, duplicate concurrent publish). The short version later denies atomicity, so the piece disagrees with itself. Footer and boundary sentences leak reviewer vocabulary ('supplied code', 'the contract'). Dek and sections 0–3 are otherwise aligned with before/after control flow and modeled faults. after.none success is a passing example, not a universal atomic guarantee."
  }
}

## 12 transaction flawed revised 50dcc430-ac70-4bfb-a04c-958f60d79cb2
{
  "fields": [],
  "omissions": [
    {
      "limitation": "No cross-call lock is supplied.",
      "source": "Contract 4: 'No durable outbox, background retry, or cross-call lock is supplied.'",
      "note": "The manifest states concurrent invocations can each publish and that there is no delivery deduplication. It never names the missing cross-call lock. The observable duplicate-publish effect is present; the lock itself is omitted."
    },
    {
      "limitation": "Background retry is not supplied, except as the phrase 'no durable retry'.",
      "source": "Contract 4 lists 'background retry' beside durable outbox.",
      "note": "Footer names outbox and deduplication. Section 2 says 'supplies no durable retry.' That paraphrase covers retry absence. It does not separately say there is no background worker."
    }
  ],
  "attribution": [
    {
      "pointer": "/sections/2/content",
      "quote": "The author calls payment and notification atomic",
      "issue": "source.body says the author claims moving publish 'makes payment and notification atomic,' not that payment and notification are atomic in general. The rest of the paragraph treats the claim as false for the after code, which matches the contracts. Compression only; the rebuttal target is still the author atomicity claim."
    }
  ],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "pointer": "/sections/0/content",
        "quote": "In the modeled commit failure, a notification escaped while the database write rolled back.",
        "note": "Concrete and scoped to the modeled fault. Does not present the before.commit row as a universal database law."
      },
      {
        "pointer": "/sections/1/content",
        "quote": "A write or commit rejection therefore prevents publication in that invocation.",
        "note": "The 'in that invocation' bound keeps the claim inside one call."
      },
      {
        "pointer": "/sections/3/content",
        "quote": "It does not make the committed payment and the external notification atomic.",
        "note": "Direct correction of the author claim without turning after.none into a guarantee."
      },
      {
        "pointer": "/sections/2/content",
        "quote": "The author calls payment and notification atomic, but publish remains an external operation. Its rejection after commit leaves the payment recorded. It may also have delivered a notification before rejecting. The contract allows a process to stop between operations and supplies no durable retry. Concurrent invocations can each publish despite idempotent payment writes.",
        "note": "One paragraph stacks author rebuttal, external publish, both rejection timings, process stop, retry absence, and concurrency. Accurate, but it reads as a findings list."
      },
      {
        "pointer": "/footer",
        "quote": "The supplied code has no durable outbox or delivery deduplication.",
        "note": "Limitation is true; the voice is not reader-facing."
      }
    ],
    "rationale": "No field invents a universal guarantee from a passing example. Qualifiers ('modeled commit failure', 'in that invocation', 'may also', 'can each publish') stay inside contracts and modeled probes. Prose still leaks audit diction ('supplied code', 'the contract') and dumps several leftover limits into one paragraph. Rating is uncertain: facts are careful; voice is mixed."
  }
}

## 13 cache correct original 78d89aba-03d3-4171-b8bf-28526a3d741f
{
  "fields": [],
  "omissions": [
    {
      "limitation": "Warm-cache hits during an in-flight successful after() write are not modeled or stated.",
      "evidence": "overlapping() always uses const cache = new Map() (empty). sequential() starts with Map([['key','old']]) but does not overlap a read with the write. read() returns cache.get on hit. after() does not delete until db.write fulfills, so a pre-existing \"old\" entry would remain readable for the whole wait. The artifact discusses miss-path fills and late snapshots, not this hit-path window. source.body's author claim is about concurrent stale reads; this concurrent hit is a remaining stale read on the supplied functions."
    },
    {
      "limitation": "Contract lists cancellation and TTL as absent; the artifact never names them.",
      "evidence": "Contract: no generation check, cancellation, TTL, or synchronization of in-flight readers. Footer and section 2 name generation check and in-flight reader synchronization only. Cancellation is the closest omitted control for the lateSnapshot fill. TTL is less tied to the demonstrated race. Not a contradiction; omitted named limits."
    },
    {
      "limitation": "The remaining late-fill race exists under before as well as after; the title can be read as if it were leftover from this change alone.",
      "evidence": "results.before.lateSnapshot and results.after.lateSnapshot are identical (stored \"new\", cached \"old\", nextRead \"old\"). The body correctly says the change does not prevent late fills. The title's \"remaining reader race\" does not say the race is new, but it also does not say it already existed with early deletion."
    }
  ],
  "attribution": [
    {
      "pointer": "/sections/2/content",
      "quote": "The author says concurrent stale reads are removed",
      "issue": "source.body says the author claims invalidating after the write removes stale cache reads, including concurrent readers. The manifest drops the method qualifier and the \"stale cache reads, including\" framing. The surrounding section is about that change, so the referent is still the same claim. Compression, not a false speaker or invented quote."
    }
  ],
  "code": [],
  "prose": {
    "rating": "pass",
    "quotes": [
      {
        "quote": "In the sequential example, the next read sees the new stored value.",
        "why": "Scopes a probe row (after.sequential.nextRead \"new\") instead of a universal guarantee."
      },
      {
        "quote": "The modeled reader captures the old database value, waits through the update and deletion, then caches that old value.",
        "why": "Follows overlapping(fn, true) and contract snapshot-on-invoke without treating it as production scheduling."
      },
      {
        "quote": "It does not prevent stale results from overlapping readers or late cache fills.",
        "why": "Matches after.fillDuringWrite.overlappingRead \"old\" and after.lateSnapshot nextRead \"old\", and refuses the author's concurrent-reader guarantee."
      },
      {
        "quote": "A cache miss could read and cache the old stored value during that wait.",
        "why": "Modal \"could\" fits before.fillDuringWrite without claiming every interleaving."
      }
    ],
    "notes": "Passing fillDuringWrite and sequential rows do not prove every runtime. Meta \"Deterministic modeled examples\" and footer \"The model uses one shared Map\" keep the unhedged dek/section-3 \"removes\"/\"closes\" sentences inside the supplied model. No diagram or inline code in the manifest to misstate functions.mjs."
  }
}

## 13 cache correct revised f833148c-b925-4c53-8d8a-e37cdda3501c
{
  "fields": [],
  "omissions": [
    {
      "limitation": "Contract 4 also lists no cancellation and no TTL. Reader-facing text names generation check and in-flight reader synchronization, not cancellation or TTL.",
      "whereOmitted": [
        "/footer",
        "/sections/2/content"
      ]
    },
    {
      "limitation": "Probe assumptions include explicit promise gates, one process, and no wall-clock timing. Body sections do not state the single-process or gated-scheduling bounds. /meta and /footer only cover deterministic examples and one shared Map.",
      "whereOmitted": [
        "/sections/0/content",
        "/sections/1/content",
        "/sections/2/content",
        "/sections/3/content"
      ]
    },
    {
      "limitation": "Only two overlapping schedules are modeled (fillDuringWrite and lateSnapshot), plus sequential success and sequential failedWrite with a pre-seeded cache. Concurrent updates, multiple readers, and a failed write overlapped with a reader are not in probe-results.json.",
      "whereOmitted": [
        "/dek",
        "/sections/1/content",
        "/sections/3/content"
      ]
    },
    {
      "limitation": "Contract 2: db.write atomically commits before fulfillment. That commit-before-fulfillment rule is not stated; prose only says deletion follows a successful write.",
      "whereOmitted": [
        "/sections/1/content",
        "/footer"
      ]
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "uncertain",
    "quotes": [
      {
        "rating": "pass",
        "pointer": "/sections/0/content",
        "quote": "The old update deleted the cached entry before awaiting the database write. A cache miss could read and cache the old stored value during that wait."
      },
      {
        "rating": "pass",
        "pointer": "/sections/3/content",
        "quote": "Moving deletion after a successful write closes the window for fills that finish during that write. It does not prevent stale results from overlapping readers or late cache fills."
      },
      {
        "rating": "fail",
        "pointer": "/sections/2/content",
        "quote": "The author says concurrent stale reads are removed, but read is unchanged."
      },
      {
        "rating": "uncertain",
        "pointer": "/sections/1/content",
        "quote": "In the sequential example, the next read sees the new stored value."
      }
    ]
  }
}

## 14 cache flawed original 9829dc01-555d-4dd3-b766-2fefea5b3ea0
{
  "fields": [
    {
      "pointer": "/title",
      "quote": "Post-write invalidation eliminates all stale reads",
      "status": "contradicted",
      "rationale": "Universal guarantee. after.fillDuringWrite.overlappingRead is \"old\" and after.lateSnapshot.nextRead is \"old\". probe.mjs asserts an older snapshot can refill the cache after invalidation. The sequential after.nextRead of \"new\" is one passing schedule and does not prove \"all\" stale reads are gone."
    }
  ],
  "omissions": [
    {
      "limitation": "read supplies no cancellation or TTL",
      "source": "Contract: \"read is unchanged. No generation check, cancellation, TTL, or synchronization of in-flight readers is supplied.\"",
      "manifest": "Footer and /sections/2/content name generation check and in-flight reader synchronization only. Cancellation would bear on the lateSnapshot refill; TTL would bound a stale Map entry. Neither appears in any field."
    },
    {
      "limitation": "after() leaves a pre-existing Map entry readable until db.write fulfills",
      "source": "after() awaits db.write before cache.delete. read() returns cache.get(key) on hit. sequential() seeds Map([['key','old']]).",
      "manifest": "overlapping() starts from new Map(), so probe-results.json never records a hit of \"old\" during an in-flight after() write. No field states that concurrent hits during a successful write still see the old cached value until delete runs."
    },
    {
      "limitation": "model is one process with gated promises, not wall-clock concurrency",
      "source": "probe-results.json assumptions: \"Explicit promise gates schedule snapshot capture, write commit, and cache fill. One process and one Map; no wall-clock timing.\"",
      "manifest": "/meta says \"Deterministic modeled examples\" and /footer says one shared Map. Neither field states one process or that the races are promise-gated rather than timed."
    }
  ],
  "attribution": [
    {
      "pointer": "/title",
      "quote": "Post-write invalidation eliminates all stale reads",
      "problem": "source.json body attributes the overclaim to the author: invalidating after the write removes stale cache reads, including concurrent readers. The title states that guarantee with no author attribution, so it reads as the page's claim. source.json title is only \"Moss Catalog: invalidate a cache entry after writing\"."
    }
  ],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      "Post-write invalidation eliminates all stale reads",
      "Post-write deletion removes cache fills that finish during the write, but an older in-flight snapshot can refill the cache afterward."
    ],
    "rationale": "The heading asserts that all stale reads are gone. The dek, /sections/2, and /sections/3 immediately deny that. A reader who stops at the title is told a guarantee the modeled results contradict. Body paragraphs after the title are concrete and scoped (\"could\", \"in the sequential example\", \"the modeled reader\", \"can\"), but they cannot repair an unattributed false heading. No code or diagram placeholders are present to inspect."
  }
}

## 14 cache flawed revised 989af0b9-3ef4-46a2-8b73-ed12ffa95c85
{
  "fields": [],
  "omissions": [
    {
      "limitation": "The supplied read path also has no cancellation and no TTL.",
      "why_material": "Contract 4 lists generation check, cancellation, TTL, and in-flight reader synchronization together as not supplied. Reader-facing copy names generation checks and in-flight synchronization (footer and /sections/2/content) and omits cancellation and TTL, so a reader can treat the named controls as the full set.",
      "evidence": "source.contracts[3]: \"read is unchanged. No generation check, cancellation, TTL, or synchronization of in-flight readers is supplied.\""
    },
    {
      "limitation": "The model is one process; no distributed cache is shown.",
      "why_material": "Post-write Map.delete is easy to over-read as cache invalidation in general. The footer says \"one shared Map\" but does not state one process or that a distributed cache is not shown.",
      "evidence": "source.contracts[0]: \"no distributed cache is shown.\" probe-results.json assumptions: \"One process and one Map; no wall-clock timing.\""
    },
    {
      "limitation": "Shown schedules are explicit promise gates, not a complete set of interleavings.",
      "why_material": "Meta calls them deterministic modeled examples, which is true, but copy such as \"closes the window for fills that finish during that write\" can still be read as covering every overlapping schedule. Only fillDuringWrite and lateSnapshot are probed.",
      "evidence": "probe.mjs overlapping() has two boolean schedules. assumptions: \"Explicit promise gates schedule snapshot capture, write commit, and cache fill.\""
    }
  ],
  "attribution": [],
  "code": [],
  "prose": {
    "rating": "fail",
    "quotes": [
      {
        "quote": "The author says concurrent stale reads are removed, but read is unchanged.",
        "role": "fail",
        "note": "Reviewer rebuttal in catalog body. A reader of the change is told about \"the author\" rather than the cache/write behavior."
      },
      {
        "quote": "In the sequential example, the next read sees the new stored value.",
        "role": "pass",
        "note": "Scopes a passing probe (after.sequential.nextRead \"new\") to that example. Does not treat it as a universal guarantee."
      },
      {
        "quote": "Post-write deletion removes cache fills that finish during the write, but an older in-flight snapshot can refill the cache afterward.",
        "role": "pass",
        "note": "Pairs the closed fill-during-write window with the remaining late-snapshot window. Modal \"can\" matches after.lateSnapshot."
      },
      {
        "quote": "It does not prevent stale results from overlapping readers or late cache fills.",
        "role": "pass",
        "note": "States remaining modeled failures (after.fillDuringWrite.overlappingRead \"old\"; after.lateSnapshot nextRead \"old\")."
      }
    ]
  }
}
