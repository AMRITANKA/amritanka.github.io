---
layout: layouts/project.html
title: "Microservices Starter Kit"
date: 2025-11-20
description: "Production-ready Spring Boot microservices template with service discovery, API gateway, and observability"
tags: ["Spring Boot", "Microservices", "Java", "DevOps"]
github: "https://github.com/amritanka/microservices-starter"
featured: true
status: "active"
---

## Overview

A battle-tested **microservices starter kit** providing a complete foundation for building distributed Spring Boot applications. Includes service discovery, API gateway, centralized config, distributed tracing, and CI/CD pipeline — all ready to deploy.

## What's Included

- **API Gateway** — Spring Cloud Gateway with rate limiting and JWT auth
- **Service Discovery** — Eureka server with health-check routing
- **Config Server** — Centralized configuration with Git backend
- **Auth Service** — JWT-based authentication with refresh tokens
- **Order Service** — Example bounded context with full CRUD
- **Notification Service** — Event-driven via Kafka

## Quick Start

```bash
# Clone and start all services
git clone https://github.com/amritanka/microservices-starter
cd microservices-starter
docker-compose up -d
```

## Observability Stack

- **Distributed tracing** — Micrometer + Zipkin
- **Metrics** — Prometheus + Grafana dashboards
- **Logging** — Structured JSON logs with correlation IDs
- **Health checks** — Spring Boot Actuator on every service

## Tech Stack

Spring Boot 3.3 · Spring Cloud 2024 · PostgreSQL · Kafka · Docker · GitHub Actions
