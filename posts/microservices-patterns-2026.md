---
layout: layouts/post.html
title: "Microservices Patterns That Actually Matter in 2026"
date: 2026-02-15
description: "A pragmatic look at which microservices patterns are worth adopting and which ones add unnecessary complexity."
tags: ["Microservices", "Java", "Spring Boot", "Deep Dive"]
category: "Deep Dive"
---

## The Pattern Fatigue Problem

Every microservices article lists 20+ patterns. Most teams need 5. Here's my opinionated take on which patterns deliver real value — and which ones are premature complexity.

## Patterns Worth Adopting Day One

### 1. API Gateway

A single entry point is non-negotiable. Spring Cloud Gateway or Kong give you:
- **Routing** — direct traffic to the right service
- **Rate limiting** — protect your services from abuse
- **Auth** — centralized JWT validation

### 2. Circuit Breaker

Resilience4j is lightweight and effective:

```java
@CircuitBreaker(name = "orderService", fallbackMethod = "fallback")
public Order getOrder(String id) {
    return orderClient.getOrder(id);
}

public Order fallback(String id, Throwable t) {
    return Order.cached(id);
}
```

### 3. Event-Driven Communication

Not everything needs a synchronous REST call. Use Kafka or RabbitMQ for:
- Order placed → Notification service
- User registered → Welcome email
- Payment processed → Inventory update

### 4. Centralized Logging with Correlation IDs

Without this, debugging distributed systems is impossible. Use MDC + structured JSON:

```java
@Component
public class CorrelationFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String correlationId = exchange.getRequest()
            .getHeaders()
            .getFirst("X-Correlation-ID");
        if (correlationId == null) correlationId = UUID.randomUUID().toString();
        MDC.put("correlationId", correlationId);
        return chain.filter(exchange);
    }
}
```

### 5. Health Checks & Readiness Probes

Spring Boot Actuator gives you this for free. Use it.

## Patterns to Defer

- **CQRS** — only when read/write loads are dramatically different
- **Saga orchestration** — start with choreography, upgrade if needed
- **Service mesh** — adds ops overhead; evaluate at 20+ services
- **Database per service** — yes in theory, shared DB is fine for v1

## The Real Advice

Start with a modular monolith. Extract services when you have a clear scaling or team boundary reason. Patterns are tools, not goals.
