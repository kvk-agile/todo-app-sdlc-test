# todo-app-sdlc-test 🤖

An experiment in **AI-agent-driven software delivery** — built by a non-developer (Agile Coach background) to understand what "agentic AI in the SDLC" actually looks like in practice, not just in theory.

🔗 **Live app:** https://kvk-agile.github.io/todo-app-sdlc-test/

## What this is

A working To-Do List app (add / delete / complete / filter tasks, persisted via `localStorage`) that was built end-to-end through an automated, AI-driven pipeline — mirroring the same request → code → test → review → merge flow real dev teams use, with Claude acting as both the developer and the reviewer.

No direct pushes to `main`. Every change went through a branch, a Pull Request, automated tests, and an independent AI code review — same discipline as a human team, applied to an AI-written codebase.

## The pipeline

Three GitHub Actions workflows, all in `.github/workflows/`:

| Workflow | Role | What it does |
|---|---|---|
| `claude.yml` | **Developer agent** | Triggered by tagging `@claude` on an issue or PR comment. Reads requirements, writes code, pushes a branch, and provides a link to open a PR (does not auto-create the PR — by design). |
| `test.yml` | **Automated gatekeeper** | Runs on every PR against `main`. Executes the real test suite (Node's built-in test runner) and blocks/reports pass-fail as a check. |
| `claude-review.yml` | **Reviewer agent** | Runs on every PR opened/updated. An independent Claude instance reviews the code against `requirements.md` — checking spec compliance, not just "does it run." |

**Requirements** for the app live in [`requirements.md`](./requirements.md) and are what both the developer agent and reviewer agent work against.

## Why this matters

This wasn't a coding exercise — it was a delivery-process exercise. The interesting part isn't "AI wrote code," it's:

- **Real SDLC discipline enforced automatically** — branch protection, test gates, and independent review, without a human having to remember to run any of it.
- **The reviewer agent caught a real bug** (a broken CSS `:root` variable block) before it reached `main` — proof this is a genuine quality gate, not automation theater.
- **Built by a non-developer**, entirely through prompting and careful instruction-following — no prior coding background required to stand this up.

## Tech notes

- Single-file `index.html` app — no build step, no framework.
- Auth via `CLAUDE_CODE_OAUTH_TOKEN` (Claude Pro/Max subscription credit), not a separate API key.
- Known limitation: the reviewer agent's output doesn't reliably post as a native PR comment — the reliable read path is PR → **Checks tab** → **Claude Code Review** → expand the run log.

## About

Built by [KVK](https://github.com/talktokvk-ship-it) — Senior Agile Coach exploring agentic AI as a lens on modern delivery pipelines.
