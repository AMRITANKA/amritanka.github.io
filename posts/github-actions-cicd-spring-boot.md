---
layout: layouts/post.html
title: "GitHub Actions CI/CD for Spring Boot — Complete Setup"
date: 2026-01-20
description: "Step-by-step guide to setting up a production CI/CD pipeline for Spring Boot using GitHub Actions."
tags: ["DevOps", "GitHub Actions", "Spring Boot", "Tutorial"]
category: "Tutorial"
---

## What We're Building

A complete CI/CD pipeline that:
1. Runs tests on every PR
2. Builds a Docker image on merge to `main`
3. Pushes to Azure Container Registry
4. Deploys to Azure Container Apps

## The Workflow File

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
          cache: 'maven'
      - run: mvn verify

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
          cache: 'maven'
      - run: mvn package -DskipTests
      - uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.ACR_LOGIN_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}
      - run: |
          docker build -t ${{ secrets.ACR_LOGIN_SERVER }}/myapp:${{ github.sha }} .
          docker push ${{ secrets.ACR_LOGIN_SERVER }}/myapp:${{ github.sha }}
```

## Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Setting Up Secrets

Go to your repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `ACR_LOGIN_SERVER` | `myregistry.azurecr.io` |
| `ACR_USERNAME` | Service principal app ID |
| `ACR_PASSWORD` | Service principal secret |

## Pro Tips

- **Cache Maven dependencies** — the `cache: 'maven'` option saves 2-3 minutes per build
- **Use matrix builds** to test on Java 17 and 21 simultaneously
- **Add a `concurrency` group** to cancel outdated deployments
- **Never skip tests in CI** — if they're too slow, fix them, don't skip them

This pipeline handles 90% of Spring Boot deployment needs. Extend it with integration tests, security scanning, and blue-green deployments as you scale.
