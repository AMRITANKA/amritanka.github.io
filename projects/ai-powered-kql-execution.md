---
layout: layouts/project.html
title: "AI-Powered KQL Execution Service"
date: 2026-05-10
description: "Natural Language to KQL query conversion and execution service for Azure Application Insights"
tags: ["Node.js", "Azure", "AI", "KQL", "REST API"]
github: "https://github.com/AMRITANKA/AI-Powered-KQLExecutionService"
featured: true
status: "active"
---

## Overview

A production-ready REST API service that lets you query **Azure Application Insights** using **natural language**. Instead of writing complex KQL queries, simply describe what you want in plain English — the AI generates and executes the corresponding KQL query.

**Example:**
- Input: *"Show me recent errors"*
- AI generates: `traces | where severityLevel >= 3 | where timestamp > ago(1h) | take 100`

## Architecture

```
+-----------+    +----------+    +--------+    +--------+
| User      |--->| Express  |--->| LLM    |--->| Azure  |
| Request   |    | API      |    | Service|    | App    |
+-----------+    +----------+    +--------+    +--------+
                 |                |              |
                 +-- Auth Check   +-- System     +-- KQL Execution
                 +-- Rate Limit       Prompt     +-- Results
                                  +-- Few-Shot
                                      Examples
```

### Step-by-Step Flow

1. **Request Received** — API validates the request (auth, rate limit, schema)
2. **Natural Language Processing** — LLM converts English to KQL
3. **Schema Validation** — Query validated against available table schemas
4. **KQL Execution** — Query executed against Azure Application Insights
5. **Response** — Results returned in JSON, CSV, or Table format

## Key Features

- 🤖 **Natural Language to KQL** — Convert plain English queries to KQL using AI
- ⚡ **Direct KQL Execution** — Execute raw KQL queries directly
- 📊 **Multiple Output Formats** — JSON, CSV, or table output
- ✅ **Schema Validation** — Validates queries against table schemas
- 🧠 **Schema Memory** — Caches table schemas for improved performance
- 🔒 **Production Ready** — Rate limiting, authentication, error handling, logging
- 🔌 **Flexible LLM** — Supports OpenAI, Anthropic, and custom OpenAI-compatible APIs

## Tech Stack

- **Runtime:** Node.js 18+ / Express
- **AI Providers:** OpenAI, Anthropic, custom (opencode.ai, MiniMax)
- **Azure:** Application Insights (App ID + API Key)
- **Security:** API key auth, rate limiting
- **Config:** YAML-based configuration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/query` | Execute natural language or KQL query |
| POST | `/api/v1/validate` | Validate a KQL query |
| GET | `/api/v1/schema/:table` | Get schema for a specific table |
| GET | `/api/v1/schema` | List all available table schemas |
| GET | `/health` | Health check |
