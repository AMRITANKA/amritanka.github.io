---
layout: layouts/post.html
title: "SOAP Protocol: The Complete Guide"
date: 2026-07-13
description: "A hands-on deep dive into SOAP — from XML envelopes and WSDL contracts to a real Service ↔ Client implementation using Spring Boot and Spring-WS."
tags: ["SOAP", "Web Services", "WSDL", "Spring Boot", "Spring-WS", "Java", "Tutorial"]
category: "Deep Dive"
---

## Introduction

If you've worked in enterprise software — banking, insurance, healthcare, government, telecom — you've almost certainly run into **SOAP** (Simple Object Access Protocol). While the industry's public conversation has moved on to REST, GraphQL, and gRPC, SOAP is still the backbone of an enormous amount of business-critical infrastructure. Payment gateways, core banking systems, airline reservation engines, and government interoperability layers are frequently SOAP-based, and they aren't going anywhere soon — the contracts are too rigid, too regulated, and too expensive to replace.

This guide has two goals:

1. Teach SOAP **properly, from first principles** — what it is, how the messages are structured, how the protocol stack fits together, and how it compares to the alternatives you already know.
2. Walk through a **real, working reference implementation** — a Spring Boot SOAP *service* and a companion SOAP *client* that talk to each other over a shared contract — so the theory is grounded in actual code, actual diagrams, and actual commands you can run.

The companion repositories used in this guide are:

- 🧩 **Customer SOAP Service** → [https://github.com/AMRITANKA/Customer-SOAP-Service](https://github.com/AMRITANKA/Customer-SOAP-Service)
- 📞 **Customer SOAP Client** → [https://github.com/AMRITANKA/Customer-SOAP-Client](https://github.com/AMRITANKA/Customer-SOAP-Client)

By the end, a beginner should be able to explain what a SOAP envelope is and why WSDL matters, and an experienced developer should walk away with a production-grade blueprint for structuring their own SOAP systems — validation, fault handling, correlation IDs, retries, and versioning included.

---

## What Is SOAP?

**SOAP (Simple Object Access Protocol)** is a **messaging protocol specification** for exchanging structured information between systems, standardized by the W3C. It is deliberately:

- **XML-based** — every request and response is a well-formed XML document.
- **Transport-agnostic** — SOAP was designed to run over HTTP, SMTP, JMS, or TCP, though in practice almost everyone uses HTTP(S).
- **Contract-first** — the exact shape of every message is described up front in a machine-readable contract (WSDL + XSD), *before* a single line of business logic is written.
- **Strongly typed** — every element in a SOAP message has a data type defined by an XML Schema (XSD), so a message can be mechanically validated before it's ever processed.

SOAP emerged in the late 1990s (originally from Microsoft and DevelopMentor, later standardized by the W3C in 2003 as SOAP 1.2) specifically to solve a problem: how do two systems, built by different teams, in different languages, on different platforms, reliably agree on what a message means? The answer was to stop guessing and start describing everything formally — hence WSDL (Web Services Description Language) and XSD (XML Schema Definition).

This is the essence of SOAP's philosophy: **the contract is the source of truth**, not the code. Both sides — service and client — generate their internal data models *from* the contract, not the other way around.

---

## Anatomy of a SOAP Message

Every SOAP message is an XML document wrapped in an **Envelope**. Here's a real request from the case study used later in this guide:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:cus="http://www.apal.com/customer/v1">
    <soapenv:Header/>
    <soapenv:Body>
        <cus:getCustomerRequest>
            <cus:customerId>0bfd15e2-80a5-40a9-a84a-20f652a5fbb1</cus:customerId>
        </cus:getCustomerRequest>
    </soapenv:Body>
</soapenv:Envelope>
```

Breaking this down:

| Element | Purpose |
|---|---|
| **`Envelope`** | The root element. Everything in a SOAP message lives inside it. It declares the SOAP namespace (`soapenv`) and any application-specific namespaces (`cus` here). |
| **`Header`** *(optional)* | Carries metadata that isn't part of the core business payload — authentication tokens, correlation IDs, transaction context, routing info. Intermediary systems can inspect and act on headers without touching the body. |
| **`Body`** *(mandatory)* | Contains the actual application payload — the request or response data, defined by your XSD. |
| **`Fault`** *(inside Body, on errors)* | A special, standardized structure for reporting errors — covered in depth in the **Error Handling** section below. |

A **response** mirrors the same structure:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <cus:getCustomerResponse xmlns:cus="http://www.apal.com/customer/v1">
      <cus:customer>
        <cus:customerId>0bfd15e2-80a5-40a9-a84a-20f652a5fbb1</cus:customerId>
        <cus:firstName>Amritanka</cus:firstName>
        <cus:lastName>Pal</cus:lastName>
        <cus:email>apal@example.com</cus:email>
      </cus:customer>
    </cus:getCustomerResponse>
  </soapenv:Body>
</soapenv:Envelope>
```

Every field here — `customerId`, `firstName`, `email` — has a type, a cardinality, and validation rules defined once, centrally, in the XSD. Neither side is free to improvise the shape of the message.

---

## The SOAP Ecosystem: WSDL, XSD, and SOAPAction

SOAP is rarely used alone — it's one piece of a small stack of standards that work together:

### WSDL (Web Services Description Language)

The WSDL is the **service's public contract**. It answers: *what operations exist, what do they accept, what do they return, and where do I send the request?* Conceptually, a WSDL has four layers:

| WSDL Section | Answers |
|---|---|
| `types` | What are the data shapes? (usually just imports an XSD) |
| `message` | What does a request/response message look like, in terms of those types? |
| `portType` / `interface` | What operations exist? (e.g., `GetCustomer`, `CreateCustomer`) |
| `binding` | How is each operation transmitted? (SOAP over HTTP, which `SOAPAction` header, encoding style) |
| `service` | Where do I actually send requests? (the endpoint URL) |

A client (human or machine) can point any SOAP tool at a WSDL URL and auto-generate a fully typed client — this is why tools like SoapUI, Postman, and JAX-WS/JAXB code generators exist. The contract *is* the API documentation.

### XSD (XML Schema Definition)

The XSD defines the **data types** referenced by the WSDL — field names, data types (`string`, `int`, `date`), required vs. optional fields, and validation constraints (e.g., an email pattern, a max string length). This is what allows a request to be **rejected automatically, before any business code runs**, if it doesn't conform to the contract.

### SOAPAction

An HTTP header (`SOAPAction: http://www.apal.com/customer/v1/GetCustomer`) that tells the server, at the transport level, *which operation* this request represents — before the server even needs to parse the XML body. It's essentially SOAP's answer to REST's combination of HTTP verb + URL path.

### Contract-First vs Code-First

There are two ways to build a SOAP service:

- **Contract-first (WSDL-first):** You hand-write the WSDL/XSD first, then generate Java (or C#, or Python) classes from it, and implement the business logic against those generated classes. This is the **recommended, production-grade approach** — it guarantees the contract never silently drifts from the code, and it lets you design the API deliberately instead of accidentally leaking implementation details.
- **Code-first:** You write your service classes first and let a framework auto-generate the WSDL from annotations. This is faster to prototype but risks producing contracts that are awkward, unstable across refactors, or tightly coupled to your internal object model.

The case study in this guide uses **contract-first / WSDL-first design** — the gold standard for real-world SOAP services.

---

## How a SOAP Call Actually Works, Step by Step

Here's the mechanical sequence of what happens when *any* SOAP client calls *any* SOAP service over HTTP:

1. The client builds a plain Java/C#/Python object representing the request (e.g., a `GetCustomerRequest` object with a `customerId` field).
2. A **marshaller** (in Java, typically JAXB) converts that object into XML, according to the XSD-generated bindings.
3. The XML is wrapped in a SOAP `Envelope`/`Body`.
4. The client issues an HTTP `POST` to the service's endpoint URL, with `Content-Type: text/xml` and a `SOAPAction` header identifying the operation.
5. The server's dispatcher receives the request and, typically, **validates it against the XSD** before any business logic runs.
6. The server **unmarshals** the XML body back into a strongly typed object.
7. The server's endpoint layer delegates to business/service logic, which may hit a database, call other services, apply business rules, etc.
8. The response object is marshalled back into XML and returned as the HTTP response body — still `200 OK` even if it's a *business* error at this layer (only transport-level and SOAP Fault errors typically use non-200 status).
9. The client unmarshals the XML response back into a typed object it can work with in code.

Notice that steps 2, 3, 6, and 9 — marshalling and unmarshalling — are entirely mechanical and **generated from the shared XSD**. This is the payoff of contract-first design: neither team hand-writes XML parsing code, and both sides are provably speaking the same "language."

---

## SOAP vs REST vs gRPC vs GraphQL — In-Depth Comparison

| Dimension | SOAP | REST | gRPC | GraphQL |
|---|---|---|---|---|
| **Message format** | XML only | Usually JSON (but format-agnostic) | Binary (Protocol Buffers) | JSON |
| **Contract** | WSDL + XSD (mandatory, strict) | OpenAPI/Swagger (optional, often added after the fact) | `.proto` files (mandatory, strict) | GraphQL Schema (mandatory, strict) |
| **Transport** | Transport-agnostic (HTTP, SMTP, JMS...) — usually HTTP | HTTP only, by definition | HTTP/2 only | HTTP only |
| **Style** | Operation/RPC-oriented (`GetCustomer`, `CreateCustomer`) | Resource-oriented (`GET /customers/{id}`) | RPC-oriented, code-generated stubs | Query-oriented — client specifies exactly which fields it wants |
| **Type safety** | Strong, enforced by XSD validation server-side | Weak by default; relies on external tools (OpenAPI, JSON Schema) for validation | Very strong, compiled types on both ends | Strong, enforced by the schema |
| **Built-in standards** | WS-Security, WS-ReliableMessaging, WS-AtomicTransaction, WS-Addressing | None built-in; conventions only (HATEOAS, HAL, JSON:API) | Built-in streaming, deadlines, interceptors | None built-in for security/transactions |
| **Statefulness support** | Designed to support stateful, transactional operations (e.g., distributed transactions via WS-AT) | Stateless by convention | Stateless, but supports streaming | Stateless |
| **Payload size / performance** | Verbose (XML overhead), slower to parse | Lean (JSON), fast | Very lean (binary), fastest | Lean (JSON), but can over/under-fetch without careful design |
| **Browser-friendliness** | Poor — awkward to call directly from JS in a browser | Excellent — native `fetch`/`XMLHttpRequest` support | Poor — needs grpc-web proxy | Excellent — a single POST endpoint |
| **Caching** | Hard — POST-only, operation-based | Easy — GET requests are cacheable by HTTP semantics | Hard — RPC-based | Hard — single endpoint, requires custom caching layers |
| **Tooling maturity for enterprise** | Extremely mature (20+ years) — WSDL-driven code gen in Java, .NET, etc. | Very mature, huge ecosystem | Mature, especially for microservices | Maturing, strong in frontend-heavy orgs |
| **Best fit** | Regulated industries, legacy integration, systems needing formal contracts and transactional guarantees | Public APIs, web/mobile backends, general-purpose CRUD | Internal microservice-to-microservice calls, low-latency systems | Frontend-driven apps needing flexible, aggregated queries |

### The core philosophical difference

- **REST** treats the API as a set of **resources** you manipulate with standard verbs (`GET`, `POST`, `PUT`, `DELETE`). It leans on HTTP semantics itself as the contract.
- **SOAP** treats the API as a set of **operations** (remote procedure calls) with a rigorously typed, self-describing contract. HTTP is just a transport — SOAP doesn't care about HTTP verbs or status codes the way REST does (nearly everything is `POST`).
- **gRPC** is SOAP's spiritual descendant for internal, high-performance service-to-service communication: same RPC style, same idea of a hard contract (just Protobuf instead of XML/WSDL), but optimized for speed over human-readability.
- **GraphQL** flips the model entirely: instead of the server dictating exactly what a response contains, the *client* declares exactly the fields it needs in a single query.

None of these is objectively "better" — they optimize for different things. SOAP optimizes for **formal correctness and interoperability across organizational boundaries**; REST optimizes for **simplicity and web-native ergonomics**; gRPC optimizes for **raw performance between trusted internal services**; GraphQL optimizes for **flexible, client-driven data fetching**.

---

## When to Actually Choose SOAP in 2026

SOAP is not "legacy junk to be avoided" — it's the right tool in specific situations:

**Good fit:**
- Regulated domains (banking, insurance, healthcare, government) where formal, auditable contracts are a compliance requirement.
- Integrating with legacy enterprise systems that only speak SOAP (mainframes, old ERP/ESB systems).
- Scenarios needing **WS-Security** (message-level encryption/signing, not just transport TLS), **WS-ReliableMessaging** (guaranteed delivery), or **distributed transactions**.
- B2B integrations where both parties need an unambiguous, machine-validated contract and neither fully trusts the other's ad-hoc documentation.

**Poor fit:**
- Public, browser-facing APIs — REST or GraphQL will always be more ergonomic for JS clients.
- High-throughput internal microservices — gRPC will out-perform SOAP significantly.
- Rapidly evolving APIs — SOAP's rigidity is a liability when the shape of your data changes every sprint.

A very common — and pragmatic — real-world pattern is exactly what the case study below implements: **keep a legacy or regulated backend on SOAP, but wrap it in a thin REST/JSON facade** so modern consumers (mobile apps, SPAs, other teams) never have to touch XML directly.

---

## Case Study: The APAL Customer Service & Client

To ground everything above, let's look at a real, working two-project system:

| Project | Role | Port | Repo |
|---|---|---|---|
| **customer-soap-service** | The SOAP provider — implements `GetCustomer`, `CreateCustomer`, `UpdateCustomer` against a database | `8080` | [GitHub](https://github.com/AMRITANKA/Customer-SOAP-Service) |
| **customer-soap-client** | The SOAP consumer — calls the service, and also exposes a REST/JSON facade for non-SOAP consumers | `8081` | [GitHub](https://github.com/AMRITANKA/Customer-SOAP-Client) |

Both projects share the **exact same `customer.xsd` contract file**, copied verbatim between them — this is the practical embodiment of "contract-first": the JAXB-generated wire model on both sides is guaranteed to match, because it's generated from the same schema.

### Why split the client into its own deployable app?

This is a deliberate architectural choice worth calling out, because it's a pattern you'll want to reuse:

1. **Independent scaling & deployment** — the client facade can be scaled, versioned, and redeployed without touching the SOAP service itself.
2. **Insulating modern consumers from SOAP entirely** — mobile apps and JS front-ends talk plain JSON over REST; they never see a WSDL or an XML envelope.
3. **A living reference implementation** — the typed Java client (`CustomerSoapClient`) and its tests double as documentation for anyone who needs to write *their own* SOAP client against this contract.

### Technology stack (both projects)

- Java 17, Spring Boot 3.3.2, Spring-WS
- JAXB (generated at build time via `jaxb2-maven-plugin`) for XML ⟷ object marshalling
- H2 (dev/test) / external RDBMS (prod) on the service side
- Docker + multi-stage builds, GitHub Actions CI/CD on both sides

---

## Combined System Architecture

Here's how the two projects fit together end-to-end — from an external caller all the way down to the database:

![Combined System Architecture](/assets/images/CombinedSystemArchitectureSOAP.png)

**Key design notes:**

- The **REST controller is a thin pass-through** — same "thin endpoint" discipline is applied symmetrically on both sides. All SOAP mechanics live in `CustomerSoapClientImpl` (client) and `CustomerEndpoint`/`CustomerServiceImpl` (service).
- A **correlation ID** is generated (or forwarded from an inbound `X-Correlation-Id` HTTP header) and attached as a custom SOAP header on every outbound call — meaning a single ID can be traced across **client logs → SOAP wire → service logs**, which is invaluable for debugging distributed systems.
- The **service never lets JPA entities leak into the wire model** — `CustomerMapper` is the single seam between the JAXB (wire) model and the JPA (persistence) model. This is a critical separation-of-concerns pattern: your database schema is free to evolve independently of your public contract.
- The **client's `CustomerDto` is a plain POJO**, independent of the JAXB classes — REST consumers are insulated from any future SOAP contract changes as long as the DTO shape itself stays stable.

---

## Sequence Diagrams: Real Request Lifecycles

These are the actual request lifecycles implemented in the case study — happy path, a business-level fault, and a transient network failure with automatic retry.

### Happy path — Get Customer via the REST facade

![Happy path — Get Customer via the REST facade](/assets/images/HappyPathSOAP.png)

### Business fault — Get Customer, unknown ID

This shows how a **SOAP Fault** on the wire becomes a clean, typed HTTP error for a REST caller who never has to know SOAP exists:

![Business fault — Get Customer, unknown ID](/assets/images/unknownIDSOAP.png)

### Transient failure with automatic retry

![Transient failure with automatic retry](/assets/images/automaticRetrySOAP.png)

A crucial detail: **SOAP Faults are business responses and are never retried** — only genuine transport-level failures (`WebServiceIOException` — connection refused, timeout) trigger a retry. Retrying a "customer not found" fault would be pointless and could mask real issues; retrying a dropped TCP connection is exactly the right instinct.

---

## End-to-End Request Flow Diagram

Zooming out from any single sequence, here's the general decision flow every request goes through on the client side:

![client side](/assets/images/clientsideSOAPflow.png)

And the mirror image on the **service** side, showing how an inbound SOAP request is processed:

![service side](/assets/images/servicesideSOAPflow.png)

---

## Building the Contract: WSDL & XSD First

If you're building your own SOAP system from scratch, this is the order of operations that the case study follows, and the order any WSDL-first project should follow:

1. **Design the XSD first.** Define your data types (`CustomerType`, request/response elements) with proper types, required/optional markers, and validation constraints (e.g., an email pattern).
2. **Write the WSDL**, referencing that XSD — define the `portType` (operations: `GetCustomer`, `CreateCustomer`, `UpdateCustomer`), the `binding` (SOAP 1.1 over HTTP, one `SOAPAction` per operation), and the `service` (the endpoint URL).
3. **Version everything by directory and URL path** from day one — e.g. `resources/wsdl/v1/customer.wsdl` served at `/ws/v1/customer.wsdl`. This single decision saves enormous pain later: introducing a breaking change becomes "add a `v2` directory and a new endpoint," while `v1` keeps running untouched for existing clients.
4. **Copy the XSD verbatim into the client project.** Both sides generate JAXB classes from the *same file*. This is non-negotiable for keeping the wire model in sync — if the contract changes, both projects must be updated together.
5. **Generate JAXB classes at build time** (via `jaxb2-maven-plugin`), not by hand, and don't check the generated code into source control — regenerate it on every build so it can never silently drift from the XSD.

---

## Building the Service, Step by Step

The service in this case study follows ten production-readiness principles worth adopting in any real SOAP service:

| # | Principle | Why it matters |
|---|---|---|
| 1 | WSDL-first design | The contract is designed deliberately, not accidentally generated from internal classes |
| 2 | Thin SOAP endpoints | `CustomerEndpoint` only receives/delegates/returns — zero business logic, easy to test and reason about |
| 3 | Versioned WSDL/XSD | Breaking changes get a new version; existing clients never break |
| 4 | XSD request/response validation | Invalid XML is rejected automatically, before it ever reaches your business code |
| 5 | Structured logging with correlation IDs | Every log line across the whole distributed call can be tied back to one request |
| 6 | Centralized SOAP Fault handling | One resolver maps all exception types to consistent, well-formed faults |
| 7 | Externalized configuration | `application.yml` + `-dev` / `-test` / `-prod` profiles, no hardcoded environment values |
| 8 | Health checks & metrics | Spring Boot Actuator endpoints for `/health`, `/metrics`, `/prometheus` |
| 9 | Contract & integration testing | Tests that verify the WSDL contract itself is still being honored, not just the business logic |
| 10 | Docker & CI/CD | Multi-stage builds and automated pipelines from day one |

**Layered flow inside the service:**

```
SOAP Client
   │
   ▼
MessageDispatcherServlet (/ws/*)
   │
   ├── PayloadValidatingInterceptor (XSD validation)
   ├── CorrelationIdInterceptor (logging)
   └── CustomerSoapFaultExceptionResolver
   │
   ▼
CustomerEndpoint (thin controller — no business logic)
   │
   ▼
CustomerService (validation, business rules)
   │
   ├── CustomerMapper (JAXB <-> JPA)
   └── Exceptions (Validation / NotFound / Business)
   │
   ▼
CustomerRepository (Spring Data JPA)
   │
   ▼
Database (H2 dev/test, external in prod)
```

The single most important discipline here is that **the endpoint never touches JPA entities directly** — it only ever sees the JAXB wire model. `CustomerMapper` is the one place where wire-model and persistence-model meet, which means your database schema is free to change without breaking your public contract, and vice versa.

---

## Building the Client, Step by Step

The client wraps the raw SOAP contract behind three different entry points, all converging on one implementation:

- A **typed Java client** (`CustomerSoapClient` interface / `CustomerSoapClientImpl`) — inject it anywhere in a Spring app.
- A **REST/JSON facade** (`/api/customers/**`) for consumers who don't want to deal with XML at all.
- A **CLI runner** for one-off manual smoke tests (`mvn spring-boot:run -Pcli`).

**What each concern is responsible for:**

| Concern | Implementation choice |
|---|---|
| Marshalling | `Jaxb2Marshaller`, generated from the shared `customer.xsd` at build time |
| Transport | `WebServiceTemplate` + `HttpComponents5MessageSender` (Apache HttpClient 5), with configurable connect/read timeouts |
| Endpoint URL | Fully externalized (`soap.client.base-url`) — never hardcoded |
| SOAPAction headers | Set explicitly per operation via `SoapActionCallback`, matching the WSDL binding |
| Correlation ID propagation | A `ClientInterceptor` adds a custom SOAP header on every request and logs timing |
| Retry | `@Retryable` around each operation — retries only transport-level failures, **never** business faults |
| Fault translation | Parses the service's `<customerFault>` detail out of any `SoapFaultClientException` into a typed exception |

This is the pattern to copy if you ever need to build a client against *someone else's* SOAP service: typed interface at the core, thin adapters (REST controller, CLI) layered on top, and all XML/fault/retry mechanics isolated inside a single implementation class.

---

## Running Both Projects Together

### Prerequisites

- JDK 17+
- Maven 3.9+
- Docker (optional, for a containerized run)

### Option A — Run natively with Maven

```bash
# 1. Start the service first (it must be up before the client can call it)
git clone https://github.com/AMRITANKA/Customer-SOAP-Service.git
cd Customer-SOAP-Service
mvn clean package
mvn spring-boot:run -Dspring-boot.run.profiles=dev
# Service is now on :8080, WSDL at http://localhost:8080/ws/v1/customer.wsdl

# 2. In a second terminal, start the client
git clone https://github.com/AMRITANKA/Customer-SOAP-Client.git
cd Customer-SOAP-Client
mvn clean package
mvn spring-boot:run -Dspring-boot.run.profiles=dev
# Client is now on :8081, pointing at the service's :8080 endpoint
```

### Option B — Run both with Docker Compose

The client project's `docker-compose.yml` brings up **both** containers together, wired on the same Docker network, with the client waiting on the service's health check before starting:

```bash
cd Customer-SOAP-Client
docker compose up --build
```

### Try it end-to-end

**Create a customer via the REST facade (no XML required):**

```bash
curl --location 'http://localhost:8081/api/customers' \
  --header 'Content-Type: application/json' \
  --header 'X-Correlation-Id: demo-correlation-001' \
  --data '{
    "firstName": "Amritanka",
    "lastName": "Pal",
    "email": "apal@example.com",
    "phone": "555-0007"
  }'
```

**Fetch it back:**

```bash
curl --location 'http://localhost:8081/api/customers/0bfd15e2-80a5-40a9-a84a-20f652a5fbb1' \
  --header 'X-Correlation-Id: demo-correlation-001'
```

**Or bypass the client entirely and talk raw SOAP directly to the service** (useful for understanding what's happening under the hood):

```bash
curl --location 'http://localhost:8080/services/customer/v1' \
  --header 'Content-Type: text/xml;charset=UTF-8' \
  --header 'SOAPAction: http://www.apal.com/customer/v1/GetCustomer' \
  --data '<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:cus="http://www.apal.com/customer/v1">
    <soapenv:Header/>
    <soapenv:Body>
        <cus:getCustomerRequest>
            <cus:customerId>0bfd15e2-80a5-40a9-a84a-20f652a5fbb1</cus:customerId>
        </cus:getCustomerRequest>
    </soapenv:Body>
</soapenv:Envelope>'
```

Comparing these two `curl` calls side by side is genuinely one of the best ways to *feel* the value SOAP-to-REST facades provide: the second call requires you to know the envelope structure, the namespace, the `SOAPAction` header, and the exact element names from the XSD. The first call requires you to know... `firstName`, `lastName`, `email`, `phone`.

### Or embed the typed client directly in another Spring Boot app

```java
@Autowired
private CustomerSoapClient customerSoapClient;

CustomerDto created = customerSoapClient.createCustomer(
        new CustomerDto(null, "Alice", "Smith", "alice@example.com", "555-2222"));

CustomerDto fetched = customerSoapClient.getCustomer(created.getCustomerId());
```

---

## Error Handling: SOAP Faults Done Right

A **SOAP Fault** is the standardized way SOAP represents an error — structurally different from how REST handles errors (which typically just uses HTTP status codes + a JSON error body).

A fault has:

- A **fault code** — conventionally `Client` (the caller did something wrong — bad input, not found) or `Server` (something went wrong on the server's side, unrelated to the caller's input).
- A **fault string** — a human-readable message.
- An optional **fault detail** — a custom XML element (`<customerFault>` in this case study) carrying structured, application-specific error information: an `errorCode`, a `message`, and — critically — the request's `correlationId`, so a fault reported by a caller can be matched directly against server-side logs.

**How the service centralizes this:**

| Exception | Fault Code | Typical Cause |
|---|---|---|
| `ValidationException` | `Client` | Bad email format, duplicate email, business-rule violation |
| `CustomerNotFoundException` | `Client` | Unknown `customerId` |
| `BusinessException` (generic) | `Server` | Unclassified business error |
| Any other exception | `Server` | Unexpected internal error — message is generic, no internals leaked |

Note the last row: **unexpected exceptions are deliberately mapped to a generic message**, never the raw stack trace or exception message. This prevents leaking internal implementation details (class names, SQL fragments, file paths) to external callers — a genuinely important security discipline for public-facing SOAP services.

**How the client translates faults back into something usable:**

| Source | Client-side representation | HTTP status (on the REST facade) |
|---|---|---|
| SOAP Fault, `CUSTOMER_NOT_FOUND` | `CustomerClientException` (clientFault=true) | `404 Not Found` |
| SOAP Fault, `VALIDATION_ERROR` | `CustomerClientException` (clientFault=true) | `400 Bad Request` |
| SOAP Fault, server-side | `CustomerClientException` (clientFault=false) | `502 Bad Gateway` |
| Connection refused / timeout, retries exhausted | `CustomerClientException` (`CLIENT_TRANSPORT_ERROR`) | `503 Service Unavailable` |
| Invalid request body | `MethodArgumentNotValidException` | `400 Bad Request` |

This is the general pattern worth internalizing: **a SOAP Fault is a business-level response, not a transport failure** — it should never trigger a retry, and it should be translated into something meaningful for whatever protocol your consumers actually use (in this case, standard HTTP status codes for the REST facade).

---

## Security, Observability & Resilience

### Security

- **WS-Security** (not implemented yet in this case study, but flagged on both roadmaps) is SOAP's answer to message-level security — signing and encrypting parts of the SOAP body itself, independent of transport-level TLS. This matters when a message might pass through intermediaries (a gateway, a queue) where TLS alone wouldn't protect it.
- Actuator/metrics endpoints are protected with authentication in the service, and **default credentials must always be overridden before any production deployment.**

### Observability

- A **correlation ID** is generated per request (or forwarded, if the caller already supplied one via `X-Correlation-Id` / a custom SOAP header) and placed into the SLF4J MDC, so it appears on every log line — client-side and server-side — for that request.
- Request/response/fault timing is logged **without ever logging the payload body itself**, to avoid leaking PII (personally identifiable information like emails, names, phone numbers) into log aggregators.

### Resilience

- **Retries** are scoped narrowly to transport-level failures (`WebServiceIOException`) with exponential backoff — never to SOAP Faults, which are legitimate business responses.
- The roadmap for both projects calls out **circuit breakers** (Resilience4j) as a natural next step — useful once you need graceful degradation during a sustained outage, rather than every caller independently retrying into a dead service.

---

## Testing Strategy

A robust SOAP system needs tests at multiple layers, because there are multiple things that can silently break: business logic, wire-level marshalling, and the contract itself.

| Layer | What it verifies | Where |
|---|---|---|
| **Unit** | Business rules in isolation (Mockito, no Spring context; or `MockMvc` for controllers with dependencies mocked out) | Both projects |
| **Integration** | The real marshaller/`WebServiceTemplate` (client) or full Endpoint→Service→Repository→DB path (service), exercised end-to-end without a live remote dependency — using `MockWebServiceServer` on the client side | Both projects |
| **Contract** | The WSDL is served at its versioned URL and still exposes the operations clients depend on | Service only |

```bash
mvn test      # unit tests only
mvn verify    # unit + integration (+ contract, on the service) tests
```

The `MockWebServiceServer` pattern is worth calling out specifically: it lets the **client's** integration tests exercise real JAXB marshalling and real fault-translation logic **without needing a live service running** — which is exactly what makes this safe to run in CI.

---

## Common Pitfalls (and How to Avoid Them)

| Pitfall | Why it happens | Fix |
|---|---|---|
| Client and service XSDs drift out of sync | The XSD is copied, not shared via a single source of truth, and one side is updated without the other | Treat the XSD as a versioned artifact; consider publishing it from a shared module/registry instead of copy-pasting |
| Retrying SOAP Faults | Conflating "the network failed" with "the business said no" | Only retry transport-level exceptions; faults are terminal responses |
| Leaking internal exception details in Faults | Letting `.getMessage()` from an internal exception flow straight into the fault string | Centralize fault mapping and always use generic messages for unclassified/server errors |
| Breaking existing clients on a schema change | Editing the `v1` XSD/WSDL directly for a "small" change | Any breaking change gets a new version directory (`v2`); `v1` keeps running unchanged |
| JPA entities leaking into the SOAP wire model | Skipping the mapper layer "just this once" for convenience | Enforce a single mapping seam (`CustomerMapper`) as an architectural rule, not a suggestion |
| Forgetting `SOAPAction` headers | Assuming the XML body alone is enough | Always set `SOAPAction` explicitly per operation, matching the WSDL binding exactly |
| Confusing HttpClient5's timeout types | `RequestConfig.Builder` in Apache HttpClient 5 needs `org.apache.hc.core5.util.Timeout`, not `java.time.Duration` | Double-check timeout types when configuring `HttpComponents5MessageSender` |
| Logging request/response bodies "for debugging" | Convenient during development, dangerous in production | Log timing and correlation IDs; never log payload bodies with PII |

---

## Glossary

- **SOAP** — Simple Object Access Protocol; an XML-based messaging protocol for structured data exchange.
- **WSDL** — Web Services Description Language; the machine-readable contract describing a SOAP service's operations, message shapes, and endpoint.
- **XSD** — XML Schema Definition; defines the data types and validation rules referenced by a WSDL.
- **Envelope / Header / Body** — The three structural parts of every SOAP message.
- **SOAP Fault** — SOAP's standardized structure for representing an error response.
- **SOAPAction** — An HTTP header identifying which operation a SOAP request targets.
- **JAXB** — Java Architecture for XML Binding; generates Java classes from an XSD (and vice versa) for marshalling/unmarshalling.
- **Marshalling / Unmarshalling** — Converting a Java object to XML, and XML back to a Java object, respectively.
- **Contract-first (WSDL-first)** — Designing the WSDL/XSD before writing implementation code, then generating code from the contract.
- **WS-Security / WS-ReliableMessaging / WS-AtomicTransaction** — Optional standards in the broader "WS-*" family for message-level security, guaranteed delivery, and distributed transactions respectively.
- **Correlation ID** — A unique identifier attached to a request and propagated through every system it touches, so logs from all systems can be tied back to a single originating call.

---

## Further Reading

- W3C SOAP 1.2 Specification (the authoritative protocol spec)
- W3C WSDL 1.1 / 2.0 Specifications
- Spring-WS reference documentation, for anyone implementing this stack in Java
- The two companion repositories this guide is based on:
  - **Customer SOAP Service** → [https://github.com/AMRITANKA/Customer-SOAP-Service](https://github.com/AMRITANKA/Customer-SOAP-Service)
  - **Customer SOAP Client** → [https://github.com/AMRITANKA/Customer-SOAP-Client](https://github.com/AMRITANKA/Customer-SOAP-Client)

Both include full project structure breakdowns, configuration profile tables, and CI/CD pipeline details not duplicated here for brevity.

---

*This guide is intended as a living educational reference. If you're building your own SOAP system, the single highest-leverage decision you can make is the one this case study makes from the very first line: design the contract first, generate everything else from it, and never let implementation details leak across that boundary.*
