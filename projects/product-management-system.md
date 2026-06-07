---
layout: layouts/project.html
title: "Product Management System"
date: 2026-06-07
description: "A full-stack web application for managing product inventory — built with Spring Boot 3, React 18, Vite, Tailwind CSS, and Docker."
tags: ["Spring Boot", "Java", "React", "Vite", "Tailwind CSS", "Docker", "REST API"]
github: "https://github.com/AMRITANKA/Product-Management-System"
featured: true
status: "active"
---

## Overview

The **Product Management System** is a self-contained reference application that demonstrates how to build a modern, type-safe, container-ready CRUD application end-to-end. It is intentionally small enough to read in one sitting, and covers validation, mapping, pagination, error handling, observability, and a live CI pipeline.

**What it solves:** A small business or developer needs a no-fuss inventory dashboard with the ability to add, edit, delete, search, filter, and export products. The system exposes a REST API that the React SPA consumes, and is shipped as two containers that talk over a private Docker network.

## Key Features

| Category | Feature |
|---|---|
| **Inventory** | Create, read, update, delete (CRUD) products |
| **Search** | Case-insensitive search by name **or** category |
| **Filtering** | Filter by category, by price range, by low stock |
| **Pagination** | Server-side pagination with configurable page size (5/10/20/50) |
| **Sorting** | Multi-column sortable table (id, name, category, price, quantity, createdAt) |
| **Dashboard** | Real-time KPIs: total products, categories, quantity, inventory value, low-stock alerts |
| **Export** | One-click **CSV export** of the entire catalog |
| **Validation** | Bean Validation (JSR-380) on the server + Zod schemas on the client |
| **Error UX** | Centralized `GlobalExceptionHandler` returns typed error payloads; client surfaces them as toasts |
| **State** | TanStack Query (React Query) with cache invalidation on every mutation |
| **Theming** | Light / Dark mode with `localStorage` persistence and `prefers-color-scheme` detection |
| **Responsive** | Mobile-first layout — sidebar collapses into a hamburger menu on small screens |
| **Observability** | SLF4J logging on every controller, Spring Actuator `/actuator/health` |
| **Docs** | Interactive **Swagger UI** at `/swagger-ui.html` |
| **DevOps** | Multi-stage Dockerfiles, Docker Compose, GitHub Actions CI + Trivy security scan |

## Tech Stack

### Backend
- **Java 17** — LTS release, records, sealed classes, pattern matching
- **Spring Boot 3.2** — Auto-config, starter ecosystem, Actuator
- **Spring Data JPA + Hibernate** — Repository abstraction, derived queries
- **H2 (in-memory)** — Zero-config dev DB; swap to Postgres by changing 4 lines of YAML
- **Hibernate Validator (JSR-380)** — Declarative field-level validation
- **MapStruct 1.5.5** — Compile-time DTO ↔ Entity mappers, zero reflection
- **springdoc-openapi 2.2.0** — Swagger UI from annotations
- **Maven 3 + `mvnw`** — Reproducible builds

### Frontend
- **React 18** — Hooks, concurrent rendering, huge ecosystem
- **Vite 5** — Instant HMR, ESM-native, fast prod builds
- **Tailwind CSS 3** — Utility-first CSS, small minified output
- **shadcn/ui + Radix UI** — Accessible, unstyled primitives — we own the markup
- **TanStack Query 5** — Caching, refetching, optimistic updates, devtools
- **React Hook Form + Zod** — Performant, type-safe form validation
- **React Router 6** — Standard SPA routing
- **Axios** — Interceptors for logging & error normalization
- **Sonner** — Minimal, themeable notifications
- **lucide-react** — Tree-shakeable SVG icons
- **Vitest + Testing Library** — Native Vite test runner

### DevOps
- **Docker** with multi-stage builds (small final images, non-root user)
- **Docker Compose** for local orchestration
- **GitHub Actions** for CI (lint, test, build, docker build, Trivy scan)
- **nginx** as the frontend web server in the Docker image (with gzip, security headers, API proxy)

## System Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                          User's Browser                           │
│  React 18 SPA  (Vite dev server :3000  /  nginx :3000 in prod)    │
└─────────────────────┬──────────────────────────────────────────────┘
                      │  HTTPS / HTTP  (Axios)
                      │  CORS: allowed origin = http://localhost:3000
                      ▼
┌────────────────────────────────────────────────────────────────────┐
│              Frontend  (Docker container : 3000)                   │
│  nginx  ──►  static React build  ──►  /api/* proxied to backend   │
└─────────────────────┬──────────────────────────────────────────────┘
                      │  http://backend:8080
                      ▼
┌────────────────────────────────────────────────────────────────────┐
│            Backend  (Docker container : 8080)                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Spring MVC   →   ProductController (REST)                   │  │
│  │       │                                                      │  │
│  │       ▼                                                      │  │
│  │  ProductService   (business logic, @Transactional)          │  │
│  │       │                                                      │  │
│  │       ▼                                                      │  │
│  │  ProductRepository  (Spring Data JPA)                       │  │
│  │       │                                                      │  │
│  │       ▼                                                      │  │
│  │  Hibernate  ──►  H2 in-memory DB  (jdbc:h2:mem:productdb)   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  Cross-cutting:                                                     │
│   • GlobalExceptionHandler   • MapStruct   • springdoc-openapi      │
│   • SLF4J logging            • Bean Validation   • CORS filter     │
└────────────────────────────────────────────────────────────────────┘
```

**Architectural choices, briefly justified:**
- **Layered architecture** (Controller → Service → Repository) keeps concerns separate and unit-testable.
- **DTOs everywhere** — the entity never leaks to the wire, and vice versa. MapStruct generates the mapping code at compile time.
- **In-memory H2** for the demo, but the entire persistence layer is decoupled behind `JpaRepository`, so swapping to MySQL/Postgres is a 4-line `application.yml` change.
- **The frontend owns no business state**; React Query is the single source of truth, and the cache is invalidated on every successful mutation.

## Project Structure

```
Fulll-Stack-Java-React-Application/
├── backend/                                  # Spring Boot service
│   ├── src/main/java/com/productmanagement/
│   │   ├── ProductManagementApplication.java # @SpringBootApplication entry point
│   │   ├── config/
│   │   │   ├── OpenApiConfig.java            # Swagger metadata
│   │   │   └── WebConfig.java                # CORS mapping
│   │   ├── controller/
│   │   │   └── ProductController.java        # All REST endpoints
│   │   ├── service/
│   │   │   ├── ProductService.java           # Business logic
│   │   │   └── CsvExportService.java         # CSV streaming
│   │   ├── repository/
│   │   │   └── ProductRepository.java        # JPA + custom @Query
│   │   ├── entity/
│   │   │   └── Product.java                  # JPA @Entity
│   │   ├── dto/
│   │   │   ├── ProductDto.java               # Wire format
│   │   │   ├── PagedResponse.java            # Generic paged wrapper
│   │   │   └── DashboardStatsDto.java
│   │   ├── mapper/
│   │   │   └── ProductMapper.java            # MapStruct interface
│   │   └── exception/
│   │       ├── GlobalExceptionHandler.java   # @RestControllerAdvice
│   │       └── ResourceNotFoundException.java
│   ├── src/main/resources/
│   │   ├── application.yml                   # Default profile
│   │   └── application-docker.yml            # Docker profile overrides
│   ├── src/test/                             # JUnit 5 + Spring Boot Test
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd / .mvn/
│   └── Dockerfile                            # Multi-stage build
│
├── frontend/                                 # React SPA
│   ├── src/
│   │   ├── main.jsx                          # ReactDOM root
│   │   ├── App.jsx                           # Router + providers
│   │   ├── index.css                         # Tailwind layers
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx                 # KPIs & low-stock
│   │   │   ├── Products.jsx                  # CRUD table
│   │   │   └── NotFound.jsx                  # 404
│   │   ├── components/
│   │   │   ├── Layout.jsx                    # Header / nav / footer
│   │   │   ├── ProductTable.jsx              # Sortable paged table
│   │   │   ├── ProductDialog.jsx             # Create / edit modal
│   │   │   ├── DeleteConfirmDialog.jsx
│   │   │   ├── TableSkeleton.jsx             # Loading state
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ui/                           # shadcn primitives
│   │   ├── hooks/
│   │   │   └── useProducts.js                # All React Query hooks
│   │   ├── services/
│   │   │   └── api.js                        # Axios + productApi
│   │   ├── contexts/
│   │   │   └── ThemeContext.jsx              # Dark mode provider
│   │   ├── lib/utils.js                      # cn(), formatters, debounce
│   │   └── test/setup.js                     # Vitest setup
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                        # @ → /src alias, proxy
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── nginx.conf                            # Prod nginx config
│   └── Dockerfile                            # Build → nginx
│
├── .github/workflows/build.yml               # CI: test, build, scan
├── docker-compose.yml                        # One-command stack
├── README.md
├── plan.md
└── .gitignore
```

## REST API Reference

Base URL: `http://localhost:8080/api/v1`

| Method | Endpoint | Description | Query Params |
|---|---|---|---|
| `GET` | `/products` | List products (paged) | `page, size, sortBy, sortDir, search` |
| `GET` | `/products/{id}` | Get one product | — |
| `POST` | `/products` | Create product | body: `ProductDto` |
| `PUT` | `/products/{id}` | Update product | body: `ProductDto` |
| `DELETE` | `/products/{id}` | Delete product | — |
| `GET` | `/products/category/{category}` | Filter by category | `page, size, sortBy, sortDir` |
| `GET` | `/products/price-range` | Filter by price | `minPrice, maxPrice, page, size, sortBy, sortDir` |
| `GET` | `/products/categories` | Distinct categories | — |
| `GET` | `/products/low-stock` | Stock under threshold | `threshold` (default 10) |
| `GET` | `/products/dashboard` | KPIs | — |
| `GET` | `/products/export/csv` | CSV download | — |

Interactive docs are auto-generated and live at:
- Swagger UI: <http://localhost:8080/swagger-ui.html>
- OpenAPI JSON: <http://localhost:8080/api-docs>

## Data Model

`products` table:

| Column | Type | Constraints |
|---|---|---|
| `id` | BIGINT | PK, auto-increment |
| `name` | VARCHAR(100) | NOT NULL, length 2–100 |
| `category` | VARCHAR(50) | NOT NULL, length 2–50 |
| `price` | DECIMAL(12,2) | NOT NULL, > 0, ≤ 10 integer digits |
| `quantity` | INT | NOT NULL, ≥ 0 |
| `description` | VARCHAR(500) | nullable |
| `created_at` | TIMESTAMP | NOT NULL, auto-set on insert |
| `updated_at` | TIMESTAMP | NOT NULL, auto-set on update |

## Docker Deployment

### Option A — One command with Docker Compose

```bash
docker-compose up --build
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8080>
- The frontend container's nginx proxies `/api/*` to the backend container, so a single origin is exposed to the browser.

### Option B — Run everything by hand (best for development)

Open two terminals.

**Terminal 1 — Backend**
```bash
cd backend
./mvnw spring-boot:run          # Linux / macOS
# or
mvnw.cmd spring-boot:run        # Windows
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
```

- App opens at <http://localhost:3000>
- Vite's dev server proxies `/api/*` to the backend, so CORS is bypassed in dev.

### Tear down

```bash
docker-compose down            # stop
docker-compose down -v         # stop + remove volumes
```

## CI/CD Pipeline

The GitHub Actions workflow at `.github/workflows/build.yml` runs four jobs:

| Job | Trigger | What it does |
|---|---|---|
| `backend-test` | push to `main`/`develop`, PR to `main` | Sets up JDK 17, caches `~/.m2`, runs `./mvnw clean verify`, generates JaCoCo coverage, uploads to Codecov |
| `frontend-test` | same | Sets up Node 18, `npm ci`, runs `lint` + `vitest`, builds the app, uploads `dist/` artifact |
| `docker-build` | only on push to `main` | Builds both Docker images with `docker/build-push-action` and GHA cache (does not push) |
| `security-scan` | every push/PR | Runs **Trivy** filesystem scan, uploads SARIF to GitHub Code Scanning |

## Environment Variables

### Backend

Override at runtime with standard Spring env vars, e.g.:

| Variable | Default | Purpose |
|---|---|---|
| `SPRING_PROFILES_ACTIVE` | (none) | Switch between `default` and `docker` profiles |
| `SPRING_DATASOURCE_URL` | `jdbc:h2:mem:productdb` | DB connection string |
| `SPRING_DATASOURCE_USERNAME` | `sa` | DB user |
| `SPRING_DATASOURCE_PASSWORD` | `password` | DB password |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `create-drop` | Schema strategy |
| `SPRING_H2_CONSOLE_ENABLED` | `true` | Enable `/h2-console` |

### Frontend

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080/api/v1` | Backend base URL (injected at build time) |

To change it, create `frontend/.env`:

```
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

## Roadmap

Planned enhancements:
- 🔐 Spring Security + JWT auth (user accounts, RBAC)
- 🐘 PostgreSQL profile (persistent DB)
- 📦 Multi-product CSV import
- 🖼️ Image upload per product (S3-compatible storage)
- 📊 Historical charts on the dashboard
- 🌐 i18n (English / Spanish / Hindi)
- ✅ Full E2E tests with Playwright

## Source Code

The full source code is available on GitHub: [github.com/AMRITANKA/Product-Management-System](https://github.com/AMRITANKA/Product-Management-System)

Feel free to fork it, open issues, or submit pull requests. If you build something cool with it, I'd love to hear about it!
