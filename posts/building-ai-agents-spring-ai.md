---
layout: layouts/post.html
title: "Building AI Agents with Spring AI"
date: 2026-03-01
description: "A practical guide to building agentic AI applications using Spring AI, tool calling, and conversation memory."
tags: ["Spring AI", "AI", "Java", "Tutorial"]
category: "Tutorial"
---

## Why Spring AI?

If you're a Java developer, you've probably wondered how to integrate LLMs into your Spring Boot applications without switching to Python. **Spring AI** brings first-class AI support to the Spring ecosystem — and it's surprisingly powerful.

In this guide, we'll build a fully functional AI agent that can:
- Answer questions using RAG (Retrieval-Augmented Generation)
- Call external tools (APIs, databases)
- Maintain conversation context across interactions

## Setting Up

Add the Spring AI dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-azure-openai-spring-boot-starter</artifactId>
</dependency>
```

Configure your `application.yml`:

```yaml
spring:
  ai:
    azure:
      openai:
        endpoint: ${AZURE_OPENAI_ENDPOINT}
        api-key: ${AZURE_OPENAI_KEY}
        chat:
          options:
            deployment-name: gpt-4o
            temperature: 0.7
```

## Creating the Chat Service

```java
@Service
public class AgentService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    public AgentService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
            .defaultSystem("You are a helpful technical assistant.")
            .build();
        this.vectorStore = vectorStore;
    }

    public String ask(String question) {
        // Retrieve relevant context
        List<Document> docs = vectorStore.similaritySearch(question);
        String context = docs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\n"));

        return chatClient.prompt()
            .user(u -> u.text("Context: {context}\n\nQuestion: {question}")
                .param("context", context)
                .param("question", question))
            .call()
            .content();
    }
}
```

## Adding Tool Calling

Spring AI supports **function calling** — letting the LLM invoke your Java methods:

```java
@Bean
@Description("Get the current weather for a given city")
public Function<WeatherRequest, WeatherResponse> weatherFunction() {
    return request -> weatherService.getWeather(request.city());
}
```

The model will automatically decide when to call this function based on user queries.

## Key Takeaways

1. **Spring AI makes LLM integration feel native** — no REST client boilerplate
2. **Tool calling is the killer feature** — it turns chat into an agent
3. **RAG is essential for domain-specific accuracy** — don't rely on model knowledge alone
4. **Start simple** — prompt → RAG → tools → memory, in that order

Spring AI is production-ready for enterprise Java teams. If you're building AI features in Spring Boot, this is the way.
