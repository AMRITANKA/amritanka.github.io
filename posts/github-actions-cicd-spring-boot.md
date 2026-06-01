---
layout: layouts/post.html
title: "GitHub Actions CI/CD for Spring Boot — Complete Setup"
date: 2026-01-20
description: "Step-by-step guide to setting up a production CI/CD pipeline for Spring Boot using GitHub Actions."
tags: ["DevOps", "GitHub Actions", "Spring Boot", "Tutorial"]
category: "Tutorial"
---

## Introduction

**Continuous Integration and Continuous Deployment (CI/CD)** is the backbone of modern software delivery. Instead of manually building, testing, and deploying your application every time a change is made, CI/CD automates the entire process — giving you faster feedback, fewer bugs in production, and a repeatable, auditable deployment process.

**GitHub Actions** is GitHub's built-in CI/CD platform. It lets you define workflows as YAML files directly inside your repository. Every time a specific event occurs (like a push or pull request), GitHub spins up a virtual machine, runs your workflow steps, and reports the results — all for free on public repos (with generous free-tier minutes for private repos).

In this guide, we'll go from zero to a **production-ready CI/CD pipeline** for a Spring Boot application. Whether you're a solo developer or working on a team, this setup will save you hours of manual work every week.

### Prerequisites

Before we start, make sure you have:

- A **Spring Boot** project (2.7+ or 3.x) with Maven or Gradle
- A **GitHub** repository for your project
- An **Azure account** (free tier works) — or you can adapt the deployment step for AWS/GCP/Docker Hub
- Basic understanding of Docker concepts
- Java 17 or 21 installed locally for development

---

## What We're Building

A complete CI/CD pipeline that:
1. **Runs tests on every Pull Request** — catches bugs before they reach `main`
2. **Builds a Docker image on merge to `main`** — creates a deployable artifact
3. **Pushes to Azure Container Registry (ACR)** — stores your Docker image securely
4. **Deploys to Azure Container Apps** — makes your app live in production

### Pipeline Architecture Overview

Here's how the full pipeline flows:

```
Developer pushes code
        │
        ▼
  ┌─────────────┐
  │  GitHub      │
  │  Actions     │
  │  Triggered   │
  └──────┬──────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌──────────────┐
│ Test  │ │ Build &      │
│ Job   │ │ Deploy Job   │
│       │ │ (main only)  │
└───┬───┘ └──────┬───────┘
    │            │
    ▼            ▼
  Unit &     Docker Build
  Integration   │
  Tests         ▼
             Push to ACR
                │
                ▼
          Deploy to Azure
          Container Apps
```

### Understanding CI/CD Concepts

| Concept | What It Means | Why It Matters |
|---------|--------------|----------------|
| **Continuous Integration (CI)** | Automatically build and test code on every commit | Catches bugs early, prevents "works on my machine" issues |
| **Continuous Deployment (CD)** | Automatically deploy tested code to production | Reduces manual errors, speeds up delivery |
| **Pipeline** | A series of automated steps from code to production | Ensures consistent, repeatable process |
| **Artifact** | The output of a build (JAR file, Docker image) | What actually gets deployed |
| **Runner** | The virtual machine that executes your workflow | GitHub provides free hosted runners |

---

## Step 1: Understanding GitHub Actions Workflow Syntax

Before jumping into the workflow file, let's understand the key building blocks:

### Workflow File Location

GitHub Actions looks for workflow files in the `.github/workflows/` directory of your repository. Any `.yml` or `.yaml` file placed here will be automatically detected and registered as a workflow.

```
your-spring-boot-project/
├── .github/
│   └── workflows/
│       └── ci-cd.yml       ← Our pipeline lives here
├── src/
├── pom.xml
├── Dockerfile
└── README.md
```

### Key Concepts in GitHub Actions

- **Workflow**: The entire automation file (e.g., `ci-cd.yml`)
- **Event (`on`)**: What triggers the workflow (push, pull_request, schedule, etc.)
- **Job**: A set of steps that run on the same runner (virtual machine)
- **Step**: An individual task within a job (run a command, use an action)
- **Action**: A reusable unit of code (e.g., `actions/checkout@v4`)
- **Runner**: The server that runs your jobs (`ubuntu-latest`, `windows-latest`, etc.)

---

## Step 2: The Complete Workflow File

Create `.github/workflows/ci-cd.yml`:
{% raw %}```yaml
name: CI/CD Pipeline

# ──────────────────────────────────────────────
# TRIGGER CONFIGURATION
# ──────────────────────────────────────────────
on:
  push:
    branches: [main]           # Run on pushes to main
  pull_request:
    branches: [main]           # Run on PRs targeting main

# Cancel in-progress runs when a new commit is pushed
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

# ──────────────────────────────────────────────
# ENVIRONMENT VARIABLES (shared across all jobs)
# ──────────────────────────────────────────────
env:
  JAVA_VERSION: '21'
  JAVA_DISTRIBUTION: 'temurin'

jobs:
  # ════════════════════════════════════════════
  # JOB 1: TEST
  # Runs on every push and PR
  # ════════════════════════════════════════════
  test:
    name: 🧪 Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout source code
        uses: actions/checkout@v4

      - name: ☕ Set up Java ${{ env.JAVA_VERSION }}
        uses: actions/setup-java@v4
        with:
          distribution: ${{ env.JAVA_DISTRIBUTION }}
          java-version: ${{ env.JAVA_VERSION }}
          cache: 'maven'

      - name: 🔍 Run unit & integration tests
        run: mvn verify --batch-mode --no-transfer-progress

      - name: 📊 Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: target/surefire-reports/
          retention-days: 7

      - name: 📈 Upload code coverage report
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: target/site/jacoco/
          retention-days: 7

  # ════════════════════════════════════════════
  # JOB 2: CODE QUALITY (runs in parallel with tests)
  # ════════════════════════════════════════════
  code-quality:
    name: 🔎 Code Quality Check
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout source code
        uses: actions/checkout@v4

      - name: ☕ Set up Java ${{ env.JAVA_VERSION }}
        uses: actions/setup-java@v4
        with:
          distribution: ${{ env.JAVA_DISTRIBUTION }}
          java-version: ${{ env.JAVA_VERSION }}
          cache: 'maven'

      - name: 🧹 Check code style with Checkstyle
        run: mvn checkstyle:check --batch-mode || true

      - name: 🔒 Run OWASP dependency check
        run: mvn org.owasp:dependency-check-maven:check --batch-mode || true

  # ════════════════════════════════════════════
  # JOB 3: BUILD & DEPLOY
  # Only runs on main branch after tests pass
  # ════════════════════════════════════════════
  build-and-deploy:
    name: 🚀 Build & Deploy
    needs: [test, code-quality]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout source code
        uses: actions/checkout@v4

      - name: ☕ Set up Java ${{ env.JAVA_VERSION }}
        uses: actions/setup-java@v4
        with:
          distribution: ${{ env.JAVA_DISTRIBUTION }}
          java-version: ${{ env.JAVA_VERSION }}
          cache: 'maven'

      - name: 📦 Build JAR (skip tests — already passed)
        run: mvn package -DskipTests --batch-mode --no-transfer-progress

      - name: 🐳 Log in to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.ACR_LOGIN_SERVER }}
          username: ${{ secrets.ACR_USERNAME }}
          password: ${{ secrets.ACR_PASSWORD }}

      - name: 🏗️ Build and push Docker image
        run: |
          IMAGE=${{ secrets.ACR_LOGIN_SERVER }}/myapp
          docker build -t $IMAGE:${{ github.sha }} -t $IMAGE:latest .
          docker push $IMAGE:${{ github.sha }}
          docker push $IMAGE:latest

      - name: 🌐 Deploy to Azure Container Apps
        uses: azure/container-apps-deploy-action@v1
        with:
          acrName: ${{ secrets.ACR_NAME }}
          containerAppName: ${{ secrets.CONTAINER_APP_NAME }}
          resourceGroup: ${{ secrets.RESOURCE_GROUP }}
          imageToDeploy: ${{ secrets.ACR_LOGIN_SERVER }}/myapp:${{ github.sha }}
```
{% endraw %}

### Line-by-Line Breakdown

Let's break down every important section:

#### Trigger Configuration (`on`)

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

- **`push` to `main`**: Triggers the full pipeline (test + build + deploy) when code is merged
- **`pull_request` to `main`**: Triggers only the test job when a PR is opened or updated
- You can add more triggers like `schedule` for nightly builds or `workflow_dispatch` for manual triggers

#### Concurrency Control

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This is crucial for efficiency. If you push 3 commits quickly, instead of running 3 separate pipelines, it **cancels the older ones** and only runs the latest. This saves CI minutes and prevents deployment conflicts.

#### Job Dependencies (`needs`)

```yaml
build-and-deploy:
  needs: [test, code-quality]
```

The `needs` keyword creates a dependency chain. The `build-and-deploy` job will **only run after both `test` and `code-quality` complete successfully**. If either fails, deployment is skipped.

#### Conditional Execution (`if`)

```yaml
if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

This ensures we only deploy when code is actually merged to `main`, not when a PR is opened. This prevents accidental deployments from feature branches.

---

## Step 3: Matrix Testing (Test Across Multiple Java Versions)

To ensure compatibility, you can test against multiple Java versions simultaneously:

```yaml
test:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      java-version: ['17', '21']
    fail-fast: false           # Don't cancel other versions if one fails
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: ${{ matrix.java-version }}
        cache: 'maven'
    - run: mvn verify --batch-mode
```

- **`fail-fast: false`** — If Java 17 tests fail, Java 21 tests still run (useful for identifying version-specific issues)
- This creates **2 parallel test runs**, one for each Java version
- The `build-and-deploy` job waits for **all matrix combinations** to pass

---

## Step 4: The Dockerfile (Production-Ready)

A well-crafted Dockerfile is critical for security, performance, and image size. Let's build one step by step.

### Basic Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

This works, but let's make it **production-ready**.

### Optimized Multi-Stage Dockerfile

```dockerfile
# ──────────────────────────────────
# Stage 1: Build the application
# ──────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build

# Copy Maven wrapper and pom.xml first (for dependency caching)
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Download dependencies (cached if pom.xml hasn't changed)
RUN ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src src
RUN ./mvnw package -DskipTests -B

# Extract layered JAR for faster subsequent builds
RUN java -Djarmode=layertools -jar target/*.jar extract --destination extracted

# ──────────────────────────────────
# Stage 2: Production runtime image
# ──────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

# Security: run as non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

WORKDIR /app

# Copy extracted layers (most stable layers first for caching)
COPY --from=builder /build/extracted/dependencies/ ./
COPY --from=builder /build/extracted/spring-boot-loader/ ./
COPY --from=builder /build/extracted/snapshot-dependencies/ ./
COPY --from=builder /build/extracted/application/ ./

# Health check for container orchestrators
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

EXPOSE 8080

# Use the layered JAR launcher
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
```

### Why Multi-Stage Builds?

| Aspect | Single-Stage | Multi-Stage |
|--------|-------------|-------------|
| **Image Size** | ~400MB (includes JDK + build tools) | ~150MB (JRE only) |
| **Security** | Contains build tools (attack surface) | Minimal runtime only |
| **Build Cache** | Re-downloads deps on every change | Caches dependencies separately |
| **Layer Reuse** | Entire JAR rebuilt each time | Only changed layers are rebuilt |

### Understanding Docker Layer Caching

Docker builds images in layers. Each instruction (`COPY`, `RUN`, etc.) creates a new layer. If a layer hasn't changed, Docker reuses the cached version.

By copying `pom.xml` before `src/`, we ensure dependencies are only re-downloaded when `pom.xml` changes — **not** on every code change. This alone can save 3-5 minutes per build.

### Spring Boot Layered JARs

Spring Boot 2.4+ supports **layered JARs**, which split your application into 4 layers:

1. **dependencies** — Third-party libs (changes rarely)
2. **spring-boot-loader** — Spring Boot loader classes (changes rarely)
3. **snapshot-dependencies** — Snapshot versions (changes sometimes)
4. **application** — Your code (changes frequently)

This means when you change only your code, Docker only rebuilds the `application` layer — the other 3 are cached.

### Adding a `.dockerignore` File

Create a `.dockerignore` file to keep your Docker context small:

```
.git
.github
.idea
.vscode
*.md
target/*.jar.original
node_modules
```

---

## Step 5: Setting Up GitHub Secrets

Secrets store sensitive information (passwords, API keys, connection strings) that your workflow needs but should **never** be committed to your repository.

### How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:

| Secret | Value | Description |
|--------|-------|-------------|
| `ACR_LOGIN_SERVER` | `myregistry.azurecr.io` | Your Azure Container Registry URL |
| `ACR_USERNAME` | Service principal app ID | The client ID for authentication |
| `ACR_PASSWORD` | Service principal secret | The client secret for authentication |
| `ACR_NAME` | `myregistry` | The ACR name (without `.azurecr.io`) |
| `CONTAINER_APP_NAME` | `my-spring-app` | Your Azure Container App name |
| `RESOURCE_GROUP` | `my-resource-group` | Azure resource group name |

### Creating an Azure Service Principal

To allow GitHub Actions to push to ACR, create a service principal:

```bash
# Login to Azure CLI
az login

# Create a service principal with ACR push permissions
az ad sp create-for-rbac \
  --name "github-actions-sp" \
  --role AcrPush \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.ContainerRegistry/registries/<ACR_NAME>
```

This outputs:

```json
{
  "appId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",     ← ACR_USERNAME
  "password": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",  ← ACR_PASSWORD
  "tenant": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Using Environment-Specific Secrets

For different environments (staging, production), use **GitHub Environments**:

1. Go to **Settings** → **Environments**
2. Create `staging` and `production` environments
3. Add environment-specific secrets
4. Add required reviewers for production

```yaml
deploy-production:
  environment: production    # Uses production-specific secrets
  needs: deploy-staging
  steps:
    - name: Deploy to production
      run: echo "Deploying with ${{ secrets.PROD_ACR_SERVER }}"
```

---

## Step 6: Preparing Your Spring Boot Application

### Add a Health Check Endpoint

Spring Boot Actuator provides a `/actuator/health` endpoint that container orchestrators and load balancers use to check if your app is running:

```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics
  endpoint:
    health:
      show-details: when-authorized
```

### Add JaCoCo for Code Coverage

Code coverage reports help you track how much of your code is tested:

```xml
<!-- Add to pom.xml in <build><plugins> -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.12</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Configure Maven for CI Environments

Add these flags to your Maven commands in CI:

```bash
mvn verify --batch-mode --no-transfer-progress
```

- **`--batch-mode` (`-B`)** — Disables interactive prompts, makes output cleaner
- **`--no-transfer-progress`** — Hides the download progress bars (reduces log noise by 80%)

---

## Step 7: Adding Notifications

Get notified when your pipeline succeeds or fails.

### Slack Notification

{% raw %}
```yaml
  notify:
    name: 📢 Notify Team
    needs: build-and-deploy
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack notification
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": "${{ needs.build-and-deploy.result == 'success' && '✅' || '❌' }} Deployment ${{ needs.build-and-deploy.result }}: ${{ github.repository }}@${{ github.sha }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```
{% endraw %}

### Adding a Status Badge

Add a badge to your `README.md` to show the pipeline status:

```markdown
![CI/CD](https://github.com/<owner>/<repo>/actions/workflows/ci-cd.yml/badge.svg)
```

This gives your repo a visual indicator of whether the latest build passed or failed.

---

## Step 8: Advanced Patterns

### Caching Strategies

The `cache: 'maven'` option in `actions/setup-java` caches the `~/.m2/repository` directory. Here's how caching works under the hood:

```yaml
- uses: actions/setup-java@v4
  with:
    distribution: 'temurin'
    java-version: '21'
    cache: 'maven'       # Automatically caches ~/.m2/repository
```

**Impact**: First run downloads all dependencies (~2-5 minutes). Subsequent runs restore from cache (~10 seconds).

For more granular cache control:

{% raw %}
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.m2/repository
    key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
    restore-keys: |
      ${{ runner.os }}-maven-
```
{% endraw %}

### Branch Protection Rules

To enforce that all PRs must pass CI before merging:

1. Go to **Settings** → **Branches** → **Add rule**
2. Set **Branch name pattern**: `main`
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
4. Add the `test` job as a required status check

This means **no one can merge to `main`** unless all tests pass.

### Reusable Workflows

If you have multiple Spring Boot services, extract common steps into a reusable workflow:

```yaml
# .github/workflows/reusable-spring-boot-ci.yml
name: Reusable Spring Boot CI

on:
  workflow_call:
    inputs:
      java-version:
        required: false
        type: string
        default: '21'
    secrets:
      ACR_LOGIN_SERVER:
        required: true
      ACR_USERNAME:
        required: true
      ACR_PASSWORD:
        required: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: ${{ inputs.java-version }}
          cache: 'maven'
      - run: mvn verify -B
```

Then call it from any repo:

```yaml
# .github/workflows/ci-cd.yml
jobs:
  ci:
    uses: your-org/.github/.github/workflows/reusable-spring-boot-ci.yml@main
    with:
      java-version: '21'
    secrets: inherit
```

### Scheduled Builds (Nightly)

Run tests automatically every night to catch flaky tests or dependency issues:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'    # Every day at 2:00 AM UTC
  push:
    branches: [main]
```

---

## Step 9: Debugging Failed Pipelines

When your pipeline fails, here's how to debug it efficiently:

### 1. Read the Logs

Click on the failed job in the **Actions** tab. Expand each step to see detailed logs. Failed steps are marked with ❌.

### 2. Enable Debug Logging

Add a repository secret `ACTIONS_RUNNER_DEBUG` set to `true` for verbose logs.

### 3. Common Failures and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `mvn: command not found` | Maven wrapper not committed | Commit `mvnw` and `.mvn/` directory |
| `Test failures` | Flaky tests or environment differences | Check if tests depend on external services |
| `Docker build failed` | Missing Dockerfile or wrong context | Ensure Dockerfile is in the repo root |
| `Permission denied` | Wrong ACR credentials | Verify secrets are correct and not expired |
| `Out of memory` | JVM heap too small for tests | Add `-Xmx1g` to Maven opts |
| `Cache miss` | `pom.xml` changed | Expected behavior — deps will be re-cached |

### 4. SSH into a Runner (for debugging)

Use the `tmate` action to SSH into a failed runner:

```yaml
- name: Debug with tmate
  if: failure()
  uses: mxschmitt/action-tmate@v3
  timeout-minutes: 15
```

> ⚠️ **Remove this before merging to main!** It's only for debugging.

---

## Step 10: Complete Project Structure

Here's what your final repository structure should look like:

```
my-spring-boot-app/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # Our CI/CD pipeline
├── .dockerignore                   # Files to exclude from Docker
├── Dockerfile                      # Multi-stage production Dockerfile
├── mvnw                            # Maven wrapper (commit this!)
├── pom.xml                         # Maven configuration
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/myapp/
│   │   │       ├── MyAppApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       └── repository/
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/
│           └── com/example/myapp/
│               └── MyAppApplicationTests.java
└── README.md                       # With status badge!
```

---

## Pro Tips & Best Practices

- **Cache Maven dependencies** — the `cache: 'maven'` option saves 2-3 minutes per build. On a team pushing 20 PRs/day, that's over an hour saved daily.
- **Use matrix builds** to test on Java 17 and 21 simultaneously — ensures forward compatibility.
- **Add a `concurrency` group** to cancel outdated deployments — prevents wasted CI minutes and deployment conflicts.
- **Never skip tests in CI** — if they're too slow, fix them, don't skip them. Slow tests are a code smell.
- **Tag images with `git SHA`** — makes it trivial to trace a running container back to the exact commit that built it.
- **Use `--batch-mode`** in Maven — reduces log noise and prevents interactive prompts from hanging your pipeline.
- **Set `timeout-minutes`** on jobs — prevents runaway builds from consuming all your free CI minutes:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
```

- **Pin action versions** — always use specific versions like `actions/checkout@v4`, never `@main`, to prevent supply-chain attacks.
- **Separate CI from CD** — the test job runs on every PR (fast feedback), while build-and-deploy only runs on `main` (controlled deployment).
- **Add `CODEOWNERS`** — require specific team members to review changes to the workflow file:

```
# .github/CODEOWNERS
.github/workflows/ @your-team/devops-leads
```

---

## Summary

| What We Built | Why It Matters |
|--------------|----------------|
| Automated testing on every PR | Catches bugs before they reach production |
| Code quality checks | Maintains code standards automatically |
| Multi-stage Docker builds | Small, secure, fast-building images |
| Azure Container Registry push | Secure artifact storage |
| Azure Container Apps deployment | Serverless, auto-scaling hosting |
| Slack notifications | Team stays informed of deployments |
| Branch protection | Enforces quality gates |
| Concurrency control | Saves CI minutes, prevents conflicts |

This pipeline handles 90% of Spring Boot deployment needs. As you scale, consider extending it with:

- **Integration tests** with Testcontainers (spin up real databases in CI)
- **Security scanning** with Trivy or Snyk (scan Docker images for vulnerabilities)
- **Blue-green deployments** (zero-downtime deployments with traffic shifting)
- **Performance testing** with k6 or Gatling (catch performance regressions)
- **Infrastructure as Code** with Terraform (manage Azure resources in Git)

The key principle: **automate everything that can be automated**, so your team can focus on writing great code instead of fighting deployment issues.
