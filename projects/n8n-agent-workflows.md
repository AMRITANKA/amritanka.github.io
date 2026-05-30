---
layout: layouts/project.html
title: "n8n Agent Workflows"
date: 2026-02-10
description: "Agentic AI workflows built with n8n for automated code review and deployment"
tags: ["AI", "n8n Workflow", "DevOps", "Agentic AI"]
github: "https://github.com/amritanka/n8n-agent-workflows"
featured: true
status: "active"
---

## Overview

A collection of **agentic AI workflows** built on [n8n](https://n8n.io) that automate repetitive developer tasks — from PR code review to deployment notifications and incident triage.

## Workflows Included

### 1. Automated Code Review Agent
- Triggers on GitHub Pull Request events
- Sends diff to GPT-4o for analysis
- Posts structured review comments directly on the PR
- Flags security issues, performance concerns, and style violations

### 2. Deploy & Notify Pipeline
- Watches `main` branch for merged PRs
- Triggers Azure deployment pipeline
- Sends Slack/Teams notification with deployment status
- Auto-rolls back on health check failure

### 3. Incident Triage Bot
- Monitors application logs via webhook
- Classifies severity using LLM analysis
- Creates Jira tickets with suggested resolution steps
- Escalates critical issues to on-call via PagerDuty

## Architecture

```yaml
trigger: GitHub Webhook (PR opened)
steps:
  - fetch_diff: GitHub API
  - analyze: Azure OpenAI (GPT-4o)
  - format_review: Template node
  - post_comments: GitHub API (PR review)
  - notify: Slack webhook
```

## Why n8n?

Self-hosted, open-source, and perfect for AI-augmented workflows. No vendor lock-in, full control over data flow, and easy to extend with custom nodes.
