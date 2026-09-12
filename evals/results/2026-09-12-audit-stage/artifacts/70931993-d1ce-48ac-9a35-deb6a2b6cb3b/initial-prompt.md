
Review the anonymous manifest against the supplied source contracts, complete before/after functions, and exact modeled probe code/results. Review every listed text field. For each field return its JSON pointer, a concrete quote, factual status (supported, contradicted, unsupported, or nonfactual), and source/probe rationale. Identify missing material limitations, attribution errors, reviewer-language leakage, and code/diagram errors separately. Rate reader-facing prose as pass, fail, or uncertain, with quotes. Passing examples do not prove universal guarantees. Save the review as grade.json, including unresolved uncertainty. Use only the supplied inputs. Do not infer who wrote the artifact or whether it was edited.

**Complete when:** every field is accounted for with evidence, and the review separates observed contradictions from uncertainty.


Read manifest.json, fields.json, source.json, functions.mjs, probe.mjs and probe-results.json in this directory. Use these supplied files directly. Save grade.json. Do not invoke skills or delegate.