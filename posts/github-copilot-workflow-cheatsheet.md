---
layout: layouts/post.html
title: "GitHub Copilot Workflow Cheatsheet"
date: 2026-06-02
description: "A comprehensive guide to mastering GitHub Copilot workflows — from chat commands and code completions to custom instructions, agents, and MCP integration."
tags: ["GitHub Copilot", "AI", "VS Code", "Productivity", "Cheatsheet"]
category: "Cheatsheet"
---

## Why This Cheatsheet?

GitHub Copilot has evolved far beyond simple code completions. With chat, inline editing, custom instructions, agents, and MCP servers, it's now a full-fledged AI coding companion. But with so many features, it's easy to miss the ones that could 10x your productivity.

This cheatsheet breaks down the essential Copilot workflows — from basic completions to advanced customization — so you can code faster, smarter, and with better context.

---

## 1. Copilot Architecture & Flow

Understanding how your prompt flows through Copilot helps you debug unexpected output and explain the system to stakeholders.\n
### How Your Prompt Flows Through Copilot

```
💬 User Prompt (Chat · Inline · CLI · Completions)
         ↓
📂 Context Gathering (Open tabs · #file · #codebase · Instructions · Skills)
         ↓
🛡️ Pre-Model Filters (Responsible AI · Content Exclusion)
         ↓
🔀 Proxy Service (Routes to model · Applies policies)
         ↓
🧠 AI Model (GPT · Sonnet · Gemini · Opus · Grok — User-selected or auto)
         ↓
🔍 Post-Model Filters (Duplicate code check · Safety & quality)
         ↓
✅ Response delivered to user
```

### Context Sources

| Source | Description |
|--------|-------------|
| **Open Tabs** | Active editor files |
| **Workspace** | `#codebase` search |
| **Instructions** | `.md` config files |
| **Skills** | `SKILL.md` bundles |
| **MCP Servers** | External tools/data |
| **Selection** | `#selection` context |
| **Web Pages** | `#fetch` URL content |

### Output Types

- **⌨️ Inline Completions** — Real-time ghost text
- **💬 Chat Responses** — Conversational answers
- **🔧 Agent Actions** — Multi-step task execution
- **📝 Code Edits** — Targeted modifications
- **🏗️ Terminal Commands** — Shell command generation

> 💡 **Key Insight:** Your code is never stored or used for training (all plans). Prompts are not retained after the response is delivered.

---

## 2. Chat Experience

The conversational AI panel in VS Code. Use slash commands, context variables (`#`), and participants (`@`) to give Copilot precise context.

### Anatomy of a Copilot Chat Prompt

```
/explain                    ← Slash Command (what to do)
#file:auth.ts               ← Context Variable (what to include)
"How does the login flow work?"  ← Your natural language question
```

### Slash Commands

| Command | Action | Command | Action |
|---------|--------|---------|--------|
| `/explain` | Explain selected code | `/fix` | Fix problems in code |
| `/tests` | Generate unit tests | `/new` | Scaffold new project |
| `/clear` | New chat session | `/help` | Copilot quick reference |
| `/init` | Generate instructions | `/search` | Workspace search |
| `/delegate` | Send to coding agent CLI | `/compact` | Compress context CLI |

### Context Variables (`#`)

| Variable | Purpose | Variable | Purpose |
|----------|---------|----------|---------|
| `#file` | Include file content | `#selection` | Selected text |
| `#codebase` | Full workspace context | `#problems` | Error/warning diagnostics |
| `#changes` | Git changes (diff) | `#fetch` | Fetch a web page |
| `#terminalLastCommand` | Last terminal output | `#block` / `#class` / `#function` | Code scope |

### Chat Participants (`@`)

| Participant | Purpose |
|-------------|---------|
| `@workspace` | Project structure & code |
| `@vscode` | VS Code commands & features |
| `@terminal` | Terminal shell context |
| `@github` | GitHub-specific skills |
| `@azure` | Azure services help |

### Voice Chat

- Install `ms-vscode.vscode-speech`
- Dictate prompts hands-free

> 💡 **Pro Tip:** Use `/explain` + `#file` to onboard to unfamiliar codebase: *"Explain the auth flow in #file:auth.ts"*

---

## 3. Code Completions

Real-time ghost text suggestions as you type. Copilot predicts your next lines of code based on context.

### How Code Completions Work

1. **⌨️ You Type** — Code, comment, function signature, or variable name
2. **👻 Ghost Text Appears** — Greyed-out inline suggestion (multiple alternatives available)
3. **✅ Accept — Tab** — Inserts full suggestion
4. **❌ Dismiss — Esc** — Ghost text disappears
5. **🔄 Cycle — `Alt+]` / `Alt+[`** — Browse alternative suggestions
6. **✂️ Partial — `Ctrl+→`** — Accept word by word

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Accept full suggestion | `Tab` |
| Dismiss suggestion | `Esc` |
| Cycle alternatives | `Alt+]` / `Alt+[` |
| Accept word by word | `Ctrl+→` |

### Enable / Disable

- Toggle from Copilot icon in status bar
- Disable for specific languages in settings
- **Snooze** — temporarily pause suggestions

### Completions Model

- Change model in settings for inline suggestions
- Premium models consume premium requests
- Free plan: 2,000 completions/month

> 💡 **Pro Tip:** Write a descriptive comment first — Copilot uses it as a prompt to generate the function body below.

---

## 4. Next Edit Suggestions (NES)

Predicts your next edit based on recent changes, not just cursor position. Great for repetitive multi-location refactors.

### How NES Works

1. **✏️ You Make an Edit** — Rename, refactor, add code in one location
2. **🧠 NES Detects Pattern** — Analyzes your change and finds similar locations
3. **➡️ Arrow Appears** — Indicator points to the next suggested edit location
4. **✅ Tab → Tab** — Tab navigates to edit, Tab again accepts it
5. **🔁 Repeat** — Tab again for next location

### Example: Rename Across Files

```javascript
// BEFORE (your edit)
const userId = getUser();
console.log(userId);     // ← still old name
fetchData(userId);       // ← still old name

// AFTER (NES applies)
const accountId = getUser();
console.log(accountId);  // ✅ fixed
fetchData(accountId);    // ✅ fixed
```

### Why Use NES

- Rename variables across multiple locations
- Apply consistent pattern changes
- Add missing imports after using a new API

> 💡 **Pro Tip:** NES monitors your editing patterns across files and suggests edits at locations you haven't navigated to yet.

---

## 5. Inline Chat

Chat with Copilot directly inside your editor or terminal without switching to the sidebar.

### In Editor — `⌘I` / `Ctrl+I`

1. 🖱️ **Select Code** (optional — or place cursor)
2. 💬 **`⌘I` → Type Prompt** — e.g., *"Extract into a custom hook"*
3. 📊 **Preview Diff** — Review changes inline
4. ✅ **Accept / Discard** — Apply edits or reject

### In Terminal — `⌘I`

```bash
# ⌘I → "Find all .log files > 100MB and delete them"
# Copilot generates:
find . -name "*.log" -size +100M -delete
# ↑ Run or Copy
```

### Vision Input — Attach Images

- 🖼️ UI mockup → `⌘I` + 📎 image → *"Build this login form using React + Tailwind"*
- Supports image-to-code conversion

### Key Features

- Select code first for targeted edits
- Supports context variables & model selection
- Preview diff before accepting
- Generates and explains terminal commands

> 💡 **Pro Tip:** Use inline chat for targeted in-place edits — select a function, `⌘I` → *"Extract this into a custom hook"*

---

## 6. Model Selection & Premium Requests

Choose from 20+ AI models. Each model has a premium request multiplier — manage your monthly budget accordingly.

### Model Cost Tiers

| Tier | Cost | Models | Best For |
|------|------|--------|----------|
| **🆓 Included** | 0× | GPT-4.1, GPT-4o, GPT-5 mini, Raptor mini | Boilerplate, simple edits |
| **💰 Budget** | 0.25–0.33× | Grok Code Fast 1, Claude Haiku 4.5, Gemini 3 Flash | Fast iteration, tests |
| **⚡ Standard** | 1× | Sonnet 4/4.5/4.6, Gemini 2.5/3/3.1 Pro, GPT-5.1/5.2/5.4 | Complex refactors, agents |
| **🔥 Premium** | 3–30× | Claude Opus 4.5/4.6, Opus 4.6 fast mode | High-complexity tasks |

> 💡 **Pro Tip:** Use included models for routine tasks. Reserve premium models for complex architectural decisions or when you need the highest quality output.

---

## 7. Custom Instructions

Markdown files that automatically inject your coding standards, conventions, and project context into every Copilot request.

### Instruction Priority (High → Low)

1. **👤 Personal** — `~/.copilot/copilot-instructions.md`
2. **📁 Path-Specific** — `.github/instructions/*.instructions.md`
3. **🏢 Repository** — `.github/copilot-instructions.md`
4. **🤖 Agent** — `AGENTS.md`
5. **🏛️ Organization** — Org-wide rules

### Always-On Files

| File | Location | Purpose |
|------|----------|---------|
| `copilot-instructions.md` | Root | Repo-wide coding standards |
| `AGENTS.md` | Root or subfolders | Agent definitions |
| `CLAUDE.md` | Root, `.claude/`, `~/` | Claude-specific instructions |

### Task-Specific Instructions

| Task | File |
|------|------|
| Code review | `reviewSelection.instructions` |
| Commits | `commitMessageGeneration.instructions` |
| PR descriptions | `pullRequestDescription.instructions` |

### Generate Instructions

- `/init` — Auto-generate for workspace
- Chat debug view → verify loaded files

> 💡 **Pro Tip:** Add *"Always use single quotes and 2-space indentation"* to `copilot-instructions.md` to enforce consistent style across all Copilot suggestions.

---

## 8. Instructions.md Files

Targeted instruction files (`.instructions.md`) that apply conditionally based on file glob patterns or semantic matching.

### Conditional Instructions with `applyTo`

```markdown
---
name: 'Python Standards'
description: 'Python conventions'
applyTo: '**/*.py'
---
# Python coding standards
- Follow PEP 8 style guide
- Use type hints for all functions
```

### How It Works

When editing `src/utils/auth.py`:

```
📝 You're editing: src/utils/auth.py
💬 Copilot Prompt (enriched)
System instructions injected:
✅ python.instructions.md      ← matches **/*.py
❌ react.instructions.md      ← skipped
❌ tests.instructions.md      ← skipped
❌ api.instructions.md        ← skipped
```

### Locations

| Scope | Path |
|-------|------|
| Workspace | `.github/instructions/` |
| Claude fmt | `.claude/rules/` |
| User | `~/.copilot/instructions/` |

> 💡 **Pro Tip:** Type `/instructions` in chat to open the Configure menu and manage your instruction files.

---

## 9. Reusable Prompt Files

Saved prompt templates (`.prompt.md`) you invoke as slash commands. Encode frequent tasks like scaffolding components or running reviews.

### How Prompt Files Work

1. 📝 **Create** `.prompt.md`
2. 💬 **Type** `/name` in chat to invoke
3. ⚡ **AI Executes** with tools & model

### Prompt File Anatomy

```markdown
---
description: 'Create React form'
agent: agent
tools: ['editFiles', 'search']
model: GPT-5.2
---
Generate a React form component
with validation for ${input:fields}
```

### Locations

| Scope | Path |
|-------|------|
| Workspace | `.github/prompts/` |
| User | Profile `prompts/` folder |

### Quick Commands

- `/create-prompt` — AI-generate a prompt file
- `/prompts` — Configure prompt files

> 💡 **Pro Tip:** Create a `/create-api` prompt that generates a REST endpoint with controller, service, tests, and OpenAPI spec in one command.

---

## 10. Chat Modes & Custom Agents

Define specialized AI agents with scoped tools, models, and handoff workflows for complex multi-step tasks.

### Agent Frontmatter Fields

| Field | Description |
|-------|-------------|
| `description` | Shown as placeholder text |
| `name` | Display name (defaults to filename) |
| `tools` | List of available tools; omit for all |
| `agents` | Allowed subagents (`*` = all, `[]` = none) |
| `model` | AI model (string or prioritized array) |
| `handoffs` | Sequential workflow transitions |
| `target` | `vscode` or `github-copilot` |
| `mcp-servers` | MCP server configs scoped to this agent |

### Example: Security Review Agent

```markdown
---
description: 'Security review agent'
tools: ['search', 'readFile']
model: Claude Sonnet 4.6
agents: ['*']
handoffs:
  - label: Fix issues
    agent: implementation
    prompt: Fix the issues above.
    send: false
---
Review code for OWASP Top 10 vulnerabilities...
```

### Where Custom Agents Work

- ✅ VS Code
- ✅ JetBrains
- ✅ Eclipse
- ✅ Xcode
- ✅ GitHub.com
- ✅ Copilot CLI
- ✅ Coding Agent
- ✅ Background & Cloud Agents

### Locations

| Scope | Path |
|-------|------|
| Workspace | `.github/agents/` |
| Claude fmt | `.claude/agents/` |
| User | `~/.copilot/agents/` |
| Org/Enterprise | `.github-private` repo → `agents/` |

> 💡 **Pro Tip:** Type `/agents` to configure or `/create-agent` to generate with AI. Create org-wide agents in `.github-private` repo to share across all repos.

---

## 11. Skills (Agent Superpowers)

Portable folders of instructions, scripts & resources that Copilot auto-loads when relevant. Unlike instructions (guidelines), skills teach capabilities.

### How Skills Load — Progressive Context

**Request 1: 📋 Metadata**
- name + description × all skills
- AI matches prompt to skill descriptions
- ✅ Best match selected for loading

**Request 2: 📄 SKILL.md**
- Full instructions loaded into context
- Agent reads: Workflow steps, Patterns & rules

**Request 3+: 📦 Resources**
- Scripts, templates, fixtures loaded
- Agent uses helpers to complete task

### SKILL.md Format

```markdown
---
name: webapp-testing
description: 'Run and debug web app integration tests'
---
# Testing Workflow
- Use describe + it + AAA pattern
- Use factory mocks for fixtures
```

### Key Features

- Invoke via `/skill-name` in chat
- `/create-skill` — AI-generate a skill
- Works across VS Code, CLI & coding agent
- Open standard: [agentskills.io](https://agentskills.io)

### Locations

| Scope | Path |
|-------|------|
| Project | `.github/skills/<name>/` |
| Personal | `~/.copilot/skills/<name>/` |

> 💡 **Pro Tip:** Create a testing skill with `SKILL.md` + test templates + fixture scripts. Copilot auto-loads it when you ask *"help me test"*.

---

## 12. MCP — Model Context Protocol

An open standard that connects Copilot to external tools & services (databases, APIs, browsers). MCP servers expose tools, data resources, and prompt templates that the AI can use during conversations.

### MCP Architecture

```
🧠 Copilot Agent
    ↓ Discovers & calls tools via MCP protocol
🔌 MCP Server (stdio / HTTP transport)
    ↓ Exposes capabilities
🗄️ Databases · 🌐 APIs · 🧭 Browsers · 📁 File Systems · 🐙 GitHub
```

### What MCP Enables

- **🔍 Database Queries** — Query PostgreSQL, MongoDB, etc. directly from chat
- **🌐 API Integration** — Call REST/GraphQL APIs with natural language
- **🧭 Browser Automation** — Scrape web pages, interact with DOM
- **📁 File Operations** — Advanced file system operations
- **🐙 GitHub Integration** — Deep GitHub API integration

### Getting Started with MCP

1. Find or create an MCP server for your tool
2. Configure it in your workspace or user settings
3. Copilot automatically discovers and uses available tools

> 💡 **Pro Tip:** MCP servers turn Copilot from a code generator into a full-stack assistant that can interact with your entire development environment.

---

## Quick Reference: Essential Shortcuts

| Feature | Shortcut | Purpose |
|---------|----------|---------|
| **Inline Chat** | `⌘I` / `Ctrl+I` | Chat inside editor/terminal |
| **Panel Chat** | `⌃⌘I` / `Ctrl+Alt+I` | Open sidebar chat |
| **Accept Completion** | `Tab` | Insert ghost text |
| **Dismiss Completion** | `Esc` | Remove ghost text |
| **Cycle Alternatives** | `Alt+]` / `Alt+[` | Browse suggestions |
| **Accept Word** | `Ctrl+→` | Partial acceptance |
| **Voice Chat** | 🎙️ | Dictate prompts |

---

## Final Thoughts

GitHub Copilot is no longer just an autocomplete tool — it's a comprehensive AI coding platform. The key to getting the most out of it is:

1. **🎯 Be Specific** — Use context variables (`#file`, `#codebase`) to give Copilot the right context
2. **📝 Customize** — Invest time in `copilot-instructions.md` and prompt files for your workflow
3. **🤖 Automate** — Build agents and skills for repetitive tasks
4. **🔌 Extend** — Use MCP servers to connect Copilot to your entire toolchain

The developers who master these workflows will spend less time writing boilerplate and more time solving meaningful problems.

> *"The best Copilot users don't just accept suggestions — they architect the context that produces the right suggestions."*

---

**Happy coding! 🚀**
