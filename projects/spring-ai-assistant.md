---
layout: layouts/project.html
title: "Spring AI Assistant"
date: 2026-03-15
description: "LLM-powered chat assistant built with Spring AI and Azure OpenAI"
tags: ["Spring Boot", "Spring AI", "Azure", "AI"]
github: "https://github.com/amritanka/spring-ai-assistant"
demo: "https://demo-url.com"
featured: true
status: "active"
---

## Overview

A production-ready chat assistant built with **Spring AI** and **Azure OpenAI**, featuring streaming responses, conversation memory, and RAG (Retrieval-Augmented Generation) with vector search.

## Architecture

The system follows a clean layered architecture:

- **Controller Layer** — REST + WebSocket endpoints for chat interaction
- **Service Layer** — Orchestrates LLM calls, memory management, and retrieval
- **Repository Layer** — PostgreSQL for conversations, pgvector for embeddings

## Key Features

- 🔄 **Streaming responses** via Server-Sent Events (SSE)
- 🧠 **Conversation memory** with sliding window + summary compression
- 📚 **RAG pipeline** — upload documents, chunk, embed, retrieve on query
- 🔐 **Azure AD authentication** with role-based access
- 📊 **Token usage tracking** and cost estimation dashboard

## Code Example

```java
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/stream")
    public Flux<ChatResponse> streamChat(@RequestBody ChatRequest request) {
        return chatService.streamResponse(
            request.getMessage(),
            request.getConversationId()
        );
    }
}
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Spring Boot 3.3 |
| AI SDK | Spring AI 1.0 |
| LLM Provider | Azure OpenAI (GPT-4o) |
| Vector DB | PostgreSQL + pgvector |
| Auth | Azure AD / Entra ID |
| Deployment | Azure Container Apps |

## Lessons Learned

Building this project reinforced the importance of prompt engineering as a first-class concern. The RAG pipeline quality depends heavily on chunking strategy — overlapping chunks with semantic boundaries produced significantly better retrieval accuracy than naive fixed-size splitting.
