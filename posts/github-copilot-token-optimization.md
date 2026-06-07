---
layout: layouts/post.html
title: "GitHub Copilot Token Optimization: 10 Tips to Slash Your AI Bill"
date: 2026-06-07
description: "A practical guide to cutting GitHub Copilot token usage by 40-70% — covering output rules, terse prompting, instruction files, model routing, and usage monitoring."
tags: ["GitHub Copilot", "AI", "Developer Productivity", "Cost Optimization", "VS Code"]
category: "AI Tooling"
---

GitHub Copilot has moved into the **usage-based billing era**. Every prompt, every chat thread, every open tab, and every line in your `copilot-instructions.md` is metered and billed. Most developers have no idea how much waste they're paying for.

This guide walks through **10 concrete tips** that recover 40–70% of your monthly token spend — without sacrificing output quality. Each tip includes a quick diagnostic you can run right now, plus the exact config or shortcut to fix it.

> Combined potential savings: 40–70% output + 30–50% input + 60–90% on simple queries = significant monthly bill reduction.

---

## 1. Control Your Output First

Output tokens cost **5× more** than input tokens. One instruction in your settings file compounds on every single interaction — forever. Set it once and it saves on every call.

Add this to `.github/copilot-instructions.md`:

```markdown
# Output Rules
- Code only. No explanation unless I explicitly ask.
- No markdown preamble.
- No 'Here is the code:' intro.
- No closing summaries.
```

**How to check:** Open your last 5 Copilot chat responses. Count lines of explanation vs actual code. If explanation > code lines, you're overpaying on every developer call, every day.

**Expected savings:** 40–70% output reduction.

---

## 2. Terse Prompting — Caveman Speak

Long, polite prompts waste tokens. The model understands compressed, code-centric shorthand just as well as full sentences. Think like a terminal command, not an email.

**Before (~45 tokens):**
> "Could you please help me write a Python function that reads a CSV file and returns a filtered dataframe where status=active?"

**After (~14 tokens):**
> "Python fn: read CSV, return df where status='active'"

That's a **69% reduction in input tokens** for the same result.

**How to check:** Paste your last 3 prompts into a token counter. Rewrite each in under 8 words. Compare token counts — aim for 60% reduction. Use [platform.openai.com/tokenizer](https://platform.openai.com/tokenizer) as a free reference tool.

**Expected savings:** 30–50% input token reduction.

---

## 3. Trim `copilot-instructions.md`

Every single line in this file is injected into **every** model request — interactions AND every agent step. A 60-line instructions file for a 10-dev team = **600 lines billed per call**.

**Before (50+ lines of LLM boilerplate):**
```
You are a helpful AI assistant...
Always follow best practices...
Add comments to your code...
[35 more lines of generic advice]
```

**After (9 lines — essentials only):**
```
Stack: TypeScript, Playwright, Azure
Rules: async/await, const/let only
Output: code only, no explanation
Tests: Playwright + MSTest
```

**How to check:** Open `.github/copilot-instructions.md` now. Count total lines. **Over 20 lines = a daily token leak billing your entire team on every interaction.**

**Expected savings:** Billed on EVERY request from EVERY dev.

---

## 4. Scope Context with `applyTo`

A single global instructions file fires for **every** file you open. Playwright rules loading for a SQL file? Python rules loading for YAML? All charged as wasted input tokens.

Create `.github/instructions/playwright.instructions.md`:

```markdown
---
applyTo: "**/*.spec.ts"
---
Use page object model.
Locators: data-testid only.
No hard waits.
```

Create `.github/instructions/python.instructions.md`:

```markdown
---
applyTo: "**/*.py"
---
Use type hints. Follow PEP-8.
```

**How to check:** Check each `.instructions.md` file you have. Does it have an `applyTo:` front matter header? If not, all your rules fire for every file — sql, yaml, py, ts — simultaneously.

**Expected savings:** Pay only for relevant rules per file type.

---

## 5. Close Unused Editor Tabs

Copilot automatically scans nearby open files as context for every prompt. You pay for context you never asked for — from files entirely unrelated to your current work.

Add to `.github/copilot-instructions.md`:

```markdown
# Context Discipline
- Max 5 editor tabs open at once.
- Open only files for current task.
```

Use these VS Code shortcuts:
- `Ctrl+K W` → Close ALL tabs
- `Ctrl+W` → Close current tab

**Team rule:** close tabs before each session.

**How to check:** Count your open VS Code tabs right now. If you have **more than 5**, you are silently leaking tokens on every single Copilot interaction in this session.

**Expected savings:** Every open tab = hidden input tokens.

---

## 6. Match the Model to the Task

Premium models like Claude Opus and GPT-5 cost significantly more per token. Using them for routine tasks is like hiring a principal engineer to fix a typo — pure expensive waste.

**Model routing guide — match complexity to cost:**

| Tier | Model | Use For |
|---|---|---|
| **Routine** | Haiku / GPT-4o mini | Rename a variable, format code, explain a simple error message |
| **Standard** | Sonnet / GPT-4o | Write a unit test, review a function, debug logic |
| **Premium** | Opus / GPT-5 (justified) | Architect a system design, multi-file refactor, agent tasks |

**How to check:** Open Copilot Chat → model selector dropdown. What model are you currently on? **If it's Opus or GPT-5 for a simple bug fix, switch to Sonnet or GPT-4o immediately.**

**Expected savings:** Opus costs 10–20× more than Haiku.

---

## 7. Never Paste Large Files into Chat

Pasting full files sends every line as input tokens — even parts completely unrelated to your question. Use file references instead. Copilot fetches selectively, only what's needed.

**AVOID** (2,000+ input tokens wasted):
```
[pastes 500-line PySpark script]
"What's wrong with this code?"
```

**BETTER** (focused ~200 tokens):
```
@workspace /explain #file:pipeline.py --focus error-handling
```

**BEST** (highlight 20 lines only):
- Select suspect block → `Ctrl+I`
- Ask inline Copilot directly

**How to check:** Search your Copilot chat history right now. Did you paste a full file and ask 'review this'? **That one action may have cost more than 50 normal inline completions.**

**Expected savings:** 500 lines ≈ 2,000 input tokens at once.

---

## 8. Ask Mode vs Agent Mode

Agent mode loads tool definitions, workspace indexes, and replays full conversation history on every step it takes. For a simple question, this overhead is pure, measurable waste.

**Use ASK MODE for:**
- "What does this function do?"
- "Fix the bug on line 42"
- "Explain this stack trace"
- "Review this small function"

**Use AGENT MODE for:**
- "Refactor auth across 6 files"
- "Build a new Playwright test suite"
- "Set up CI/CD pipeline from scratch"

**How to check:** Look at the mode toggle in Copilot Chat. Are you in Agent mode right now? **If your question fits in one response, Ask mode saves 60–90% of the token cost.**

**Expected savings:** Wrong mode = 60–90% unnecessary overhead.

---

## 9. Start Fresh Conversations

Long chat threads are silent token sinks. **Every message re-transmits every prior message.** A 20-exchange thread means message 20 pays 20× the base cost for the same new content.

**Rule:** One chat thread = One task

**DO NOT mix in one thread:**
- Login bug fix
- Then: write test for it
- Then: unrelated DB question

**INSTEAD** — `Ctrl+L` for each new task:
- Fresh context window
- No stale history overhead
- Faster, cleaner responses

**How to check:** Count exchanges in your current chat thread. **If over 15 exchanges** — every new message is re-sending thousands of stale tokens from tasks you completed hours ago.

**Expected savings:** Every message resends the full history.

---

## 10. Monitor Your Usage Dashboard

GitHub now provides real-time AI credit tracking per user and per organisation. Most developers have never opened this page. Under usage-based billing — this is your bill.

**For Individuals:**
```
github.com → Settings
  → Billing & Plans → Usage
  → GitHub AI Credits section
```

**For Org Admins:**
```
Org Settings → Billing → Copilot
  → Set per-user budgets
  → $0 budget = disables seat fully
```

**Target:** stay under 70% of monthly.

**How to check:** When did you last check your GitHub Copilot AI credits usage? If the answer is 'never' — check it before your next session. You may already be close to your monthly limit.

**Expected savings:** You can't optimise what you don't measure.

---

## Your Immediate Action Plan

### 🔵 Do Now (10 minutes)
- [ ] Add 'Code only, no explanation' to `copilot-instructions.md`
- [ ] Trim instructions file to under 20 lines
- [ ] Close all unnecessary editor tabs (max 5)

### 🟢 This Week
- [ ] Add `applyTo` scoping to all instruction files
- [ ] Switch to Ask mode for all simple questions
- [ ] Start fresh chat per task — use `Ctrl+L` habit

### 🟠 Ongoing
- [ ] Check GitHub AI Credits dashboard weekly
- [ ] Review & update model selection per task type
- [ ] Audit `copilot-instructions.md` monthly for bloat

---

