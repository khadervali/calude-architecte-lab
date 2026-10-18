# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal study lab for the CCAR-F (Claude architecture) certification. It is not an application: each folder under `labs/` is a small, standalone TypeScript exercise against the Anthropic API, written by the user as part of a curriculum block. Learning progress is tracked in `progress.md`.

## Tutoring workflow (important)

- The project skill `.claude/skills/architect-tutor/SKILL.md` drives the curriculum (blocks S1–S6, U1–U6; exam domains D1–D5). Use it when the user names a block, asks for a drill, or submits lab code for review.
- **Do not write lab code for the user** unless they type `/solve`. Review, question, and grade instead.
- Teach first, then quiz — no cold pre-tests. Lessons favor real-life analogies and interactive visuals over long text.
- After each block, update the table in `progress.md` (block, date, pre/post score, weak domains, notes). The Notes column records what the lab proved and which misconceptions were fixed; follow its existing style.

## Labs layout

- `labs/s1-hello/` — S1 API basics: first call (`hello.ts`), multi-turn history (`memory.ts`), error status codes (`error.ts`). Has its own `node_modules` with `tsx` and `typescript`.
- `labs/s2-cache/cache.ts` — S2a prompt caching (`cache_control` on a system block; WRITE → HIT → BUST shown through `usage`).
- `labs/s2-json/ticket.ts` — S2b structured output: Zod schema + `client.messages.parse` + `zodOutputFormat`, a code guard (`checkFlight`), per-item error handling, and inline pass/fail checks ("Test A/B") at the bottom of the file.
- Labs without their own `package.json` (e.g. `s2-json`) resolve `@anthropic-ai/sdk` and `zod` from `labs/node_modules`.
- The root `package.json` only holds `playwright`; it is unrelated to the labs.

## Running

Requires `ANTHROPIC_API_KEY` in the environment (the SDK reads it; `new Anthropic()` takes no args). Node is v24 via nvm.

```bash
cd labs && npm install                    # sdk + zod for labs/*
npx tsx s2-json/ticket.ts                 # run one lab (tsx lives in labs/s1-hello)
```

There is no build, lint, or test runner. "Tests" are inline `console.log` PASS/FAIL checks inside a lab file; to verify a test can actually fail, temporarily break the guard it covers and rerun.

Labs use `claude-haiku-4-5` to keep cost low; keep that unless the exercise needs something else.

