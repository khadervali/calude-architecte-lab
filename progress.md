# CCAR-F Progress

| Block | Date | Pre | Post | Weak domains | Notes |
|---|---|---|---|---|---|
| S1 API fundamentals | 2026-10-08 | — (switched to teach-first) | 2/3 | D5 (max_tokens is a per-request output cap; confused it with a session-level limit) | Step 1 done: first call in TS (`labs/s1-hello`). Read the response shape, stop_reason, and usage correctly; saw max_tokens truncation. Step 2 done (`memory.ts`): rebuilt history correctly (user → assistant `a.content` → user). Understood that input tokens grow with history (13 → 112). Fixed misconception: had put the reply before the question and left out the original user turn. Step 3 done (`error.ts`): triggered 404 / 401 / 400 and correctly judged none of them retryable. |
