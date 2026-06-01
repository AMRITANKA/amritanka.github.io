---
layout: layouts/post.html
title: "Microservices Patterns That Actually Matter in 2026"
date: 2026-02-15
description: "A pragmatic look at which microservices patterns are worth adopting and which ones add unnecessary complexity."
tags: ["Microservices", "Java", "Spring Boot", "Deep Dive"]
category: "Deep Dive"
---

## The Pattern Fatigue Problem

Every microservices article lists 20+ patterns. Most teams need 5-7 to start. But here's the catch — **understanding why a pattern exists matters more than knowing how to implement it**. Blindly applying patterns leads to over-engineered systems that are harder to maintain than the monolith you were trying to escape.

In this deep dive, we'll go through each pattern with:
- **What it solves** — the real problem behind the pattern
- **Architecture diagrams** — visual understanding of the flow
- **Code examples** — practical Spring Boot implementations
- **When to use vs. when to avoid** — pragmatic guidance

Let's start with the patterns that deliver real value from day one.

---

## Part 1: Patterns Worth Adopting Day One

### 1. API Gateway Pattern

#### What Problem Does It Solve?

Without an API Gateway, clients must know about every microservice endpoint directly. This creates tight coupling, security nightmares, and makes it impossible to change your internal architecture without breaking clients.

#### Architecture Diagram

```
                        WITHOUT API Gateway
                        ────────────────────
    ┌──────────┐     ┌──────────────────────┐
    │  Mobile   │────▶│  User Service :8081   │
    │  App      │────▶│  Order Service :8082  │
    │           │────▶│  Product Service :8083│
    └──────────┘     │  Payment Service :8084│
    ┌──────────┐────▶│  Notification :8085   │
    │  Web App  │────▶│                      │
    └──────────┘     └──────────────────────┘
    
    ❌ Client knows all service URLs
    ❌ No centralized auth
    ❌ No rate limiting
    ❌ CORS nightmare


                        WITH API Gateway
                        ─────────────────
    ┌──────────┐                              ┌─────────────────┐
    │  Mobile   │──┐                     ┌───▶│  User Service   │
    │  App      │  │    ┌────────────┐   │    └─────────────────┘
    └──────────┘  │    │            │   │    ┌─────────────────┐
                  ├───▶│  API       │───┼───▶│  Order Service  │
    ┌──────────┐  │    │  Gateway   │   │    └─────────────────┘
    │  Web App  │──┘    │            │   │    ┌─────────────────┐
    └──────────┘       │  :443      │───┼───▶│  Product Service│
    ┌──────────┐       │            │   │    └─────────────────┘
    │  3rd Party│──────▶│ ┌────────┐│   │    ┌─────────────────┐
    │  API      │       │ │  Auth  ││───┼───▶│  Payment Service│
    └──────────┘       │ │  Rate  ││   │    └─────────────────┘
                       │ │  Log   ││   │    ┌─────────────────┐
                       │ └────────┘│───┘───▶│  Notification   │
                       └────────────┘        └─────────────────┘
    
    ✅ Single entry point (one URL for clients)
    ✅ Centralized authentication & authorization
    ✅ Rate limiting & throttling
    ✅ Request/response transformation
    ✅ SSL termination
    ✅ Load balancing
```

#### How It Works — Step by Step

1. **Client sends request** to `api.myapp.com/orders/123`
2. **Gateway validates JWT token** — rejects if invalid (401)
3. **Gateway checks rate limit** — rejects if exceeded (429)
4. **Gateway routes request** to `order-service:8082/orders/123`
5. **Gateway transforms response** — strips internal headers, adds CORS
6. **Gateway logs the request** — with correlation ID for tracing

#### Spring Cloud Gateway Implementation

```java
// GatewayConfig.java
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
            // Route: /api/users/** → user-service
            .route("user-service", r -> r
                .path("/api/users/**")
                .filters(f -> f
                    .stripPrefix(1)                    // Remove /api prefix
                    .addRequestHeader("X-Source", "gateway")
                    .circuitBreaker(cb -> cb
                        .setName("userServiceCB")
                        .setFallbackUri("forward:/fallback/users"))
                    .requestRateLimiter(rl -> rl
                        .setRateLimiter(redisRateLimiter())))
                .uri("lb://user-service"))             // Load-balanced URI

            // Route: /api/orders/** → order-service
            .route("order-service", r -> r
                .path("/api/orders/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .retry(config -> config
                        .setRetries(3)
                        .setStatuses(HttpStatus.SERVICE_UNAVAILABLE)))
                .uri("lb://order-service"))

            // Route: /api/products/** → product-service
            .route("product-service", r -> r
                .path("/api/products/**")
                .filters(f -> f.stripPrefix(1))
                .uri("lb://product-service"))
            .build();
    }

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        // 10 requests per second, burst of 20
        return new RedisRateLimiter(10, 20);
    }
}
```

```yaml
# application.yml for Gateway
spring:
  cloud:
    gateway:
      default-filters:
        - DedupeResponseHeader=Access-Control-Allow-Origin
        - name: RequestRateLimiter
          args:
            redis-rate-limiter.replenishRate: 10
            redis-rate-limiter.burstCapacity: 20
      globalcors:
        corsConfigurations:
          '[/**]':
            allowedOrigins: "https://myapp.com"
            allowedMethods: GET, POST, PUT, DELETE
            allowedHeaders: "*"
```

#### Global Authentication Filter

```java
@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    @Autowired
    private JwtUtil jwtUtil;

    // Paths that don't require authentication
    private static final List<String> OPEN_ENDPOINTS = List.of(
        "/api/auth/login",
        "/api/auth/register",
        "/api/products"       // Public product listing
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // Skip authentication for open endpoints
        if (OPEN_ENDPOINTS.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        // Extract and validate JWT
        String authHeader = exchange.getRequest()
            .getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        try {
            Claims claims = jwtUtil.validateToken(token);

            // Forward user info to downstream services
            ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                .header("X-User-Id", claims.getSubject())
                .header("X-User-Roles", claims.get("roles", String.class))
                .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        } catch (JwtException e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }

    @Override
    public int getOrder() {
        return -1; // Run before other filters
    }
}
```

#### When to Use vs. When to Avoid

| ✅ Use When | ❌ Avoid When |
|------------|--------------|
| You have 3+ microservices | You have a monolith or 1-2 services |
| Multiple client types (web, mobile, IoT) | Single internal consumer |
| Need centralized auth/rate limiting | Services communicate only internally |
| Want to version APIs without changing services | Performance is absolutely critical (adds ~5ms latency) |

---

### 2. Circuit Breaker Pattern

#### What Problem Does It Solve?

In a distributed system, when Service A calls Service B and Service B is down, Service A's threads pile up waiting for timeouts. This cascading failure can bring down your entire system — one failing service takes out everything.

The **Circuit Breaker** prevents this by detecting failures and short-circuiting requests to the failing service, returning a fallback response immediately instead of waiting.

#### How Circuit Breaker States Work

```
                    Circuit Breaker State Machine
                    ─────────────────────────────

                         Success threshold met
                    ┌──────────────────────────────┐
                    │                              │
                    ▼                              │
            ┌──────────────┐                ┌─────┴────────┐
            │              │  Failure       │              │
     ──────▶│   CLOSED     │  threshold    │  HALF-OPEN   │
   (normal) │              │  exceeded     │              │
            │  Requests    │───────┐       │  Allows a    │
            │  pass        │       │       │  few test     │
            │  through     │       │       │  requests     │
            └──────────────┘       │       └──────┬───────┘
                                   │              │
                                   ▼              │ Failure occurs
                            ┌──────────────┐      │
                            │              │◀─────┘
                            │   OPEN       │
                            │              │
                            │  Requests    │
                            │  fail-fast   │───── Wait timeout ─────┐
                            │  (fallback)  │                        │
                            └──────────────┘                        │
                                   ▲                                │
                                   │     Goes to HALF-OPEN          │
                                   └────────────────────────────────┘


    Timeline Example:
    ─────────────────
    
    Request 1  ✅ ──▶ CLOSED (1/5 failures)
    Request 2  ✅ ──▶ CLOSED
    Request 3  ❌ ──▶ CLOSED (2/5 failures)
    Request 4  ❌ ──▶ CLOSED (3/5 failures)
    Request 5  ❌ ──▶ CLOSED (4/5 failures)
    Request 6  ❌ ──▶ CLOSED (5/5 failures) → THRESHOLD REACHED!
    Request 7  ⚡ ──▶ OPEN (fail-fast, return fallback)
    Request 8  ⚡ ──▶ OPEN (fail-fast, return fallback)
    ... wait 60 seconds ...
    Request 9  🔍 ──▶ HALF-OPEN (test request sent)
    Request 9  ✅ ──▶ Success! → Back to CLOSED
```

#### Cascading Failure Without Circuit Breaker

```
    ❌ WITHOUT Circuit Breaker — Cascading Failure
    ────────────────────────────────────────────────

    ┌──────────┐     ┌──────────────┐     ┌──────────────┐
    │  Client  │────▶│  Order       │────▶│  Payment     │ ← DOWN!
    │          │     │  Service     │     │  Service     │
    └──────────┘     │              │     │              │
                     │  Thread 1 ⏳ │     │  💀 Dead     │
                     │  Thread 2 ⏳ │     │              │
                     │  Thread 3 ⏳ │     └──────────────┘
                     │  Thread 4 ⏳ │
                     │  ... waiting │     All threads blocked
                     │  for timeout │     waiting for Payment
                     │              │     Service to respond
                     │  💀 Thread   │
                     │  pool        │
                     │  exhausted!  │
                     └──────────────┘
                            │
                            ▼
                     Order Service ALSO dies!
                     Now User Service calls fail too...
                     ENTIRE SYSTEM DOWN 💀💀💀


    ✅ WITH Circuit Breaker — Graceful Degradation
    ─────────────────────────────────────────────────

    ┌──────────┐     ┌──────────────┐     ┌──────────────┐
    │  Client  │────▶│  Order       │──X──│  Payment     │ ← DOWN!
    │          │     │  Service     │     │  Service     │
    └──────────┘     │              │     └──────────────┘
                     │  ┌────────┐  │
                     │  │Circuit │  │     Circuit is OPEN
                     │  │Breaker │  │     → Requests fail-fast
                     │  │ [OPEN] │  │     → Return fallback
                     │  └────────┘  │
                     │              │
                     │  Returns:    │
                     │  "Payment    │
                     │  temporarily │
                     │  unavailable"│
                     │              │
                     │  ✅ Service  │
                     │  stays alive!│
                     └──────────────┘
```

#### Complete Resilience4j Implementation

```java
// OrderService.java — Service with Circuit Breaker, Retry, and Rate Limiter
@Service
@Slf4j
public class OrderService {

    private final PaymentClient paymentClient;
    private final OrderRepository orderRepository;

    public OrderService(PaymentClient paymentClient, OrderRepository orderRepository) {
        this.paymentClient = paymentClient;
        this.orderRepository = orderRepository;
    }

    /**
     * Circuit Breaker protects against cascading failures.
     * Retry handles transient network glitches.
     * Rate Limiter prevents overwhelming the downstream service.
     *
     * Execution order: RateLimiter → Retry → CircuitBreaker → Method
     */
    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    @Retry(name = "paymentService", fallbackMethod = "paymentFallback")
    @RateLimiter(name = "paymentService")
    public PaymentResult processPayment(Order order) {
        log.info("Processing payment for order: {}", order.getId());
        return paymentClient.charge(order.getTotalAmount(), order.getPaymentMethod());
    }

    /**
     * Fallback method — same signature + Throwable parameter.
     * Called when circuit is OPEN or all retries are exhausted.
     */
    public PaymentResult paymentFallback(Order order, Throwable throwable) {
        log.warn("Payment service unavailable. Queuing order {} for retry. Error: {}",
            order.getId(), throwable.getMessage());

        // Queue the payment for async retry
        order.setStatus(OrderStatus.PAYMENT_PENDING);
        orderRepository.save(order);

        return PaymentResult.builder()
            .status(PaymentStatus.QUEUED)
            .message("Payment is being processed. You'll be notified when complete.")
            .orderId(order.getId())
            .build();
    }

    /**
     * Example: Different fallback strategies for different scenarios
     */
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "inventoryFallback")
    public InventoryStatus checkInventory(String productId) {
        return inventoryClient.checkStock(productId);
    }

    public InventoryStatus inventoryFallback(String productId, Throwable t) {
        // Strategy: Return cached data when inventory service is down
        return inventoryCache.getLastKnown(productId)
            .orElse(InventoryStatus.unknown(productId));
    }
}
```

#### Resilience4j Configuration

```yaml
# application.yml
resilience4j:
  circuitbreaker:
    instances:
      paymentService:
        # Number of calls to evaluate before tripping
        slidingWindowSize: 10
        slidingWindowType: COUNT_BASED
        # Trip when 50% of calls fail
        failureRateThreshold: 50
        # Stay OPEN for 60 seconds before trying HALF-OPEN
        waitDurationInOpenState: 60s
        # Allow 3 test requests in HALF-OPEN state
        permittedNumberOfCallsInHalfOpenState: 3
        # Minimum calls before evaluating failure rate
        minimumNumberOfCalls: 5
        # Automatically transition from OPEN to HALF-OPEN
        automaticTransitionFromOpenToHalfOpenEnabled: true
        # Which exceptions count as failures
        recordExceptions:
          - java.io.IOException
          - java.util.concurrent.TimeoutException
          - org.springframework.web.client.HttpServerErrorException
        # Which exceptions to ignore (don't count as failures)
        ignoreExceptions:
          - com.example.BusinessException

      inventoryService:
        slidingWindowSize: 5
        failureRateThreshold: 60
        waitDurationInOpenState: 30s

  retry:
    instances:
      paymentService:
        maxAttempts: 3
        waitDuration: 2s
        # Exponential backoff: 2s, 4s, 8s
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2
        retryExceptions:
          - java.io.IOException

  ratelimiter:
    instances:
      paymentService:
        limitForPeriod: 100        # Max 100 calls...
        limitRefreshPeriod: 1s     # ...per second
        timeoutDuration: 500ms     # Wait max 500ms if limit reached
```

#### Monitoring Circuit Breaker State

```java
// CircuitBreakerMonitor.java — Expose metrics via Actuator
@Component
@Slf4j
public class CircuitBreakerMonitor {

    private final CircuitBreakerRegistry circuitBreakerRegistry;

    public CircuitBreakerMonitor(CircuitBreakerRegistry registry) {
        this.circuitBreakerRegistry = registry;

        // Register event listeners for all circuit breakers
        registry.getAllCircuitBreakers().forEach(cb -> {
            cb.getEventPublisher()
                .onStateTransition(event ->
                    log.warn("⚡ Circuit Breaker '{}' state changed: {} → {}",
                        event.getCircuitBreakerName(),
                        event.getStateTransition().getFromState(),
                        event.getStateTransition().getToState()))
                .onFailureRateExceeded(event ->
                    log.error("🔴 Circuit Breaker '{}' failure rate exceeded: {}%",
                        event.getCircuitBreakerName(),
                        event.getFailureRate()))
                .onSlowCallRateExceeded(event ->
                    log.warn("🟡 Circuit Breaker '{}' slow call rate exceeded: {}%",
                        event.getCircuitBreakerName(),
                        event.getSlowCallRate()));
        });
    }
}
```

#### When to Use vs. When to Avoid

| ✅ Use When | ❌ Avoid When |
|------------|--------------|
| Making synchronous calls between services | Async/event-driven communication (already decoupled) |
| Calling external APIs (payment gateways, etc.) | Calling a database (use connection pool settings instead) |
| Service has a history of intermittent failures | Service is highly reliable and fast |
| You need graceful degradation | Failure of downstream = failure of your feature (no useful fallback) |

---

### 3. Event-Driven Communication Pattern

#### What Problem Does It Solve?

Synchronous communication (REST/gRPC) creates **temporal coupling** — Service A can only work when Service B is online. Event-driven communication removes this dependency. Services publish events when something happens, and interested services subscribe to react.

#### Synchronous vs. Asynchronous Communication

```
    ❌ SYNCHRONOUS — Tight Coupling
    ─────────────────────────────────
    
    ┌──────────┐  POST /orders  ┌──────────┐  POST /payments  ┌──────────┐
    │  Client  │───────────────▶│  Order   │────────────────▶│  Payment │
    │          │                │  Service │                  │  Service │
    │          │                │          │  POST /inventory │          │
    │  Waiting │                │  Waiting │────────────────▶│ ┌────────┤
    │  ...     │                │  ...     │                  │ │Inventory│
    │  ...     │                │  ...     │  POST /notify    │ │Service │
    │  ...     │◀───────────────│  ...     │────────────────▶│ ├────────┤
    └──────────┘   Response     └──────────┘                  │ │Notify  │
                   (slow!)                                    │ │Service │
                                                              └─┴────────┘
    Total time = Order + Payment + Inventory + Notification
    If ANY service is down → entire request fails ❌


    ✅ EVENT-DRIVEN — Loose Coupling
    ──────────────────────────────────
    
    ┌──────────┐  POST /orders  ┌──────────┐
    │  Client  │───────────────▶│  Order   │
    │          │◀───────────────│  Service │
    └──────────┘   202 Accepted └─────┬────┘
    (fast!)                          │
                                     │ Publishes Event:
                                     │ "OrderCreated"
                                     ▼
                           ┌──────────────────┐
                           │                  │
                           │   Message Broker │
                           │   (Kafka/Rabbit) │
                           │                  │
                           └──┬─────┬─────┬───┘
                              │     │     │
                    ┌─────────┘     │     └─────────┐
                    ▼               ▼               ▼
              ┌──────────┐  ┌──────────┐  ┌─────────────┐
              │ Payment  │  │Inventory │  │Notification │
              │ Service  │  │ Service  │  │  Service    │
              │          │  │          │  │             │
              │ Listens: │  │ Listens: │  │  Listens:   │
              │ Order    │  │ Order    │  │  Order      │
              │ Created  │  │ Created  │  │  Created    │
              └──────────┘  └──────────┘  └─────────────┘

    Total time = Order Service only (other services process async)
    If Payment is down → it processes the event when it comes back ✅
```

#### Event-Driven Patterns — Choreography vs. Orchestration

```
    CHOREOGRAPHY (Decentralized) — Each service knows what to do
    ──────────────────────────────────────────────────────────────
    
    ┌────────┐ OrderCreated ┌─────────┐ PaymentProcessed ┌───────────┐
    │ Order  │─────────────▶│ Payment │──────────────────▶│ Inventory │
    │Service │              │ Service │                   │  Service  │
    └────────┘              └─────────┘                   └─────┬─────┘
                                                                │
                                                    InventoryReserved
                                                                │
                                                                ▼
                                                        ┌─────────────┐
                                                        │Notification │
                                                        │  Service    │
                                                        └─────────────┘
    
    ✅ Simple, decentralized
    ❌ Hard to track the full flow
    ❌ Can become spaghetti with many events


    ORCHESTRATION (Centralized) — One service coordinates the flow
    ───────────────────────────────────────────────────────────────
    
                         ┌──────────────┐
                         │  Order Saga  │
                         │ Orchestrator │
                         └──────┬───────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌──────────┐  ┌──────────┐  ┌─────────────┐
          │ Payment  │  │Inventory │  │Notification │
          │ Service  │  │ Service  │  │  Service    │
          └──────────┘  └──────────┘  └─────────────┘
    
    ✅ Clear flow, easy to track
    ✅ Centralized error handling
    ❌ Orchestrator is a single point of failure
    ❌ Can become a "god service"
```

#### Spring Boot + Apache Kafka Implementation

**Producer — Order Service publishes events:**

```java
// OrderEvent.java — The event contract
public record OrderEvent(
    String eventId,
    String eventType,
    LocalDateTime timestamp,
    OrderPayload payload
) {
    public static OrderEvent created(Order order) {
        return new OrderEvent(
            UUID.randomUUID().toString(),
            "ORDER_CREATED",
            LocalDateTime.now(),
            OrderPayload.from(order)
        );
    }

    public static OrderEvent cancelled(Order order, String reason) {
        return new OrderEvent(
            UUID.randomUUID().toString(),
            "ORDER_CANCELLED",
            LocalDateTime.now(),
            OrderPayload.from(order).withCancelReason(reason)
        );
    }
}

// OrderEventPublisher.java — Publishes events to Kafka
@Service
@Slf4j
public class OrderEventPublisher {

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderEventPublisher(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderCreated(Order order) {
        OrderEvent event = OrderEvent.created(order);

        kafkaTemplate.send("order-events", order.getId(), event)
            .whenComplete((result, ex) -> {
                if (ex != null) {
                    log.error("Failed to publish OrderCreated event for order: {}",
                        order.getId(), ex);
                    // Store in outbox table for retry (Transactional Outbox pattern)
                } else {
                    log.info("Published OrderCreated event for order: {} to partition: {}",
                        order.getId(),
                        result.getRecordMetadata().partition());
                }
            });
    }
}
```

**Consumer — Payment Service listens for events:**

```java
// PaymentEventConsumer.java — Listens for order events
@Service
@Slf4j
public class PaymentEventConsumer {

    private final PaymentProcessor paymentProcessor;
    private final PaymentEventPublisher paymentEventPublisher;

    @KafkaListener(
        topics = "order-events",
        groupId = "payment-service",
        containerFactory = "orderEventListenerFactory"
    )
    public void handleOrderEvent(
            @Payload OrderEvent event,
            @Header(KafkaHeaders.RECEIVED_KEY) String key,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("Received event: {} for order: {} [partition={}, offset={}]",
            event.eventType(), key, partition, offset);

        switch (event.eventType()) {
            case "ORDER_CREATED" -> processNewOrder(event);
            case "ORDER_CANCELLED" -> refundOrder(event);
            default -> log.warn("Unknown event type: {}", event.eventType());
        }
    }

    private void processNewOrder(OrderEvent event) {
        try {
            PaymentResult result = paymentProcessor.charge(
                event.payload().totalAmount(),
                event.payload().paymentMethod()
            );

            // Publish result event for downstream services
            paymentEventPublisher.publishPaymentResult(event.payload().orderId(), result);

        } catch (InsufficientFundsException e) {
            log.warn("Insufficient funds for order: {}", event.payload().orderId());
            paymentEventPublisher.publishPaymentFailed(
                event.payload().orderId(), "Insufficient funds");
        }
    }

    private void refundOrder(OrderEvent event) {
        paymentProcessor.refund(event.payload().orderId());
    }
}
```

**Kafka Configuration:**

```yaml
# application.yml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      # Ensure messages are not lost
      acks: all
      retries: 3
      properties:
        enable.idempotence: true
        max.in.flight.requests.per.connection: 5
    consumer:
      group-id: ${spring.application.name}
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest
      # Manual acknowledgment for reliability
      enable-auto-commit: false
      properties:
        spring.json.trusted.packages: "com.example.events"
    listener:
      ack-mode: manual_immediate
```

#### Idempotent Event Processing

Events can be delivered more than once (at-least-once delivery). Your consumers **must be idempotent**:

```java
@Service
public class IdempotentPaymentConsumer {

    private final ProcessedEventRepository processedEventRepo;

    @KafkaListener(topics = "order-events", groupId = "payment-service")
    public void handle(OrderEvent event, Acknowledgment ack) {
        // Check if we already processed this event
        if (processedEventRepo.existsByEventId(event.eventId())) {
            log.info("Skipping already-processed event: {}", event.eventId());
            ack.acknowledge();
            return;
        }

        try {
            // Process the event
            processPayment(event);

            // Record that we processed it
            processedEventRepo.save(new ProcessedEvent(event.eventId(), Instant.now()));

            ack.acknowledge();
        } catch (Exception e) {
            log.error("Failed to process event: {}", event.eventId(), e);
            // Don't acknowledge — Kafka will redeliver
        }
    }
}
```

#### When to Use vs. When to Avoid

| ✅ Use When | ❌ Avoid When |
|------------|--------------|
| Operations can be processed asynchronously | Client needs an immediate, consistent response |
| You need to decouple services | Simple request-response is sufficient |
| Services have different throughput/scaling needs | Only 2 services communicating |
| You want resilience against downstream failures | You need strong consistency (ACID transactions) |
| Fan-out: one event triggers multiple reactions | Event ordering is critical and complex |

---

### 4. Distributed Tracing & Correlation IDs

#### What Problem Does It Solve?

A single user request might pass through 5-10 services. When something goes wrong, how do you trace the request across all of them? Without correlation IDs, you're searching through millions of log lines trying to piece together what happened.

#### Request Flow Without vs. With Correlation IDs

```
    ❌ WITHOUT Correlation IDs — Debugging Nightmare
    ──────────────────────────────────────────────────

    [Order Service]   2026-02-15 10:23:45 ERROR  Payment failed for order
    [Payment Service] 2026-02-15 10:23:44 INFO   Processing payment $99.99
    [Payment Service] 2026-02-15 10:23:44 INFO   Processing payment $45.00  ← Which one?
    [Payment Service] 2026-02-15 10:23:45 ERROR  Card declined
    [Inventory Svc]   2026-02-15 10:23:45 INFO   Checking stock for SKU-123
    [Inventory Svc]   2026-02-15 10:23:45 INFO   Checking stock for SKU-456 ← Which one?

    Which payment log belongs to which order? 🤷


    ✅ WITH Correlation IDs — Clear Request Tracing
    ─────────────────────────────────────────────────

    [Order Service]   2026-02-15 10:23:45 corrId=abc-123 INFO  Creating order
    [Payment Service] 2026-02-15 10:23:44 corrId=abc-123 INFO  Processing $99.99
    [Payment Service] 2026-02-15 10:23:45 corrId=abc-123 ERROR Card declined
    [Inventory Svc]   2026-02-15 10:23:45 corrId=abc-123 INFO  Checking SKU-123

    Search "abc-123" → entire request flow across all services! 🎯
```

#### How Correlation IDs Flow Through Services

```
    Correlation ID Propagation
    ──────────────────────────

    ┌──────────┐   X-Correlation-ID: abc-123   ┌────────────┐
    │  Client  │──────────────────────────────▶│  API       │
    │          │                                │  Gateway   │
    └──────────┘                                │            │
                                                │  Generates │
                                                │  ID if not │
                                                │  present   │
                                                └──────┬─────┘
                                                       │
                                    X-Correlation-ID: abc-123
                                                       │
                               ┌───────────────────────┼──────────────┐
                               │                       │              │
                               ▼                       ▼              ▼
                        ┌────────────┐         ┌────────────┐  ┌────────────┐
                        │  Order     │         │  Payment   │  │  Inventory │
                        │  Service   │         │  Service   │  │  Service   │
                        │            │         │            │  │            │
                        │ MDC.put(   │         │ MDC.put(   │  │ MDC.put(   │
                        │ "corrId",  │         │ "corrId",  │  │ "corrId",  │
                        │ "abc-123") │         │ "abc-123") │  │ "abc-123") │
                        └─────┬──────┘         └────────────┘  └────────────┘
                              │
                              │ Publishes Kafka Event
                              │ Header: correlationId=abc-123
                              ▼
                        ┌────────────┐
                        │  Kafka     │
                        │  Event     │
                        │  Header:   │
                        │  abc-123   │
                        └─────┬──────┘
                              │
                              ▼
                        ┌────────────┐
                        │Notification│
                        │  Service   │
                        │ MDC.put(   │
                        │ "corrId",  │
                        │ "abc-123") │  ← Correlation ID preserved
                        └────────────┘     even through async events!
```

#### Complete Implementation with Spring Boot 3 + Micrometer Tracing

```java
// CorrelationIdFilter.java — Generates/extracts Correlation IDs
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorrelationIdFilter extends OncePerRequestFilter {

    private static final String CORRELATION_ID_HEADER = "X-Correlation-ID";
    private static final String CORRELATION_ID_MDC_KEY = "correlationId";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            // Extract or generate correlation ID
            String correlationId = request.getHeader(CORRELATION_ID_HEADER);
            if (correlationId == null || correlationId.isBlank()) {
                correlationId = UUID.randomUUID().toString();
            }

            // Put in MDC — automatically included in all log statements
            MDC.put(CORRELATION_ID_MDC_KEY, correlationId);

            // Add to response headers (so clients can reference it)
            response.setHeader(CORRELATION_ID_HEADER, correlationId);

            filterChain.doFilter(request, response);
        } finally {
            // Always clean up MDC to prevent thread pool contamination
            MDC.remove(CORRELATION_ID_MDC_KEY);
        }
    }
}
```

```java
// CorrelationIdInterceptor.java — Propagate to outgoing REST calls
@Component
public class CorrelationIdInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(
            HttpRequest request,
            byte[] body,
            ClientHttpRequestExecution execution) throws IOException {

        String correlationId = MDC.get("correlationId");
        if (correlationId != null) {
            request.getHeaders().set("X-Correlation-ID", correlationId);
        }
        return execution.execute(request, body);
    }
}

// Register the interceptor with RestTemplate/RestClient
@Configuration
public class RestClientConfig {

    @Bean
    public RestClient restClient(CorrelationIdInterceptor interceptor) {
        return RestClient.builder()
            .requestInterceptor(interceptor)
            .build();
    }
}
```

```java
// KafkaCorrelationIdConfig.java — Propagate through Kafka events
@Configuration
public class KafkaCorrelationIdConfig {

    // Add correlation ID to outgoing Kafka messages
    @Bean
    public ProducerInterceptor<String, Object> correlationIdProducerInterceptor() {
        return new ProducerInterceptor<>() {
            @Override
            public ProducerRecord<String, Object> onSend(ProducerRecord<String, Object> record) {
                String correlationId = MDC.get("correlationId");
                if (correlationId != null) {
                    record.headers().add("correlationId",
                        correlationId.getBytes(StandardCharsets.UTF_8));
                }
                return record;
            }
            // ... other methods
        };
    }

    // Extract correlation ID from incoming Kafka messages
    @Bean
    public RecordInterceptor<String, Object> correlationIdConsumerInterceptor() {
        return (record, consumer) -> {
            Header header = record.headers().lastHeader("correlationId");
            if (header != null) {
                MDC.put("correlationId", new String(header.value(), StandardCharsets.UTF_8));
            }
            return record;
        };
    }
}
```

#### Structured JSON Logging Configuration

```xml
<!-- logback-spring.xml — JSON format for log aggregation tools -->
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <includeMdcKeyName>correlationId</includeMdcKeyName>
            <includeMdcKeyName>userId</includeMdcKeyName>
            <fieldNames>
                <timestamp>@timestamp</timestamp>
                <version>[ignore]</version>
            </fieldNames>
            <customFields>
                {"service":"${spring.application.name}","env":"${ENVIRONMENT}"} 
            </customFields>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

**Output example:**
```json
{
  "@timestamp": "2026-02-15T10:23:45.123Z",
  "level": "ERROR",
  "logger": "c.e.payment.PaymentService",
  "message": "Card declined for order ORD-789",
  "correlationId": "abc-123",
  "userId": "user-456",
  "service": "payment-service",
  "env": "production",
  "stack_trace": "com.example.CardDeclinedException: Insufficient funds..."
}
```

---

### 5. Health Checks & Readiness/Liveness Probes

#### What Problem Does It Solve?

Container orchestrators (Kubernetes, Azure Container Apps) need to know:
- **Is this container alive?** (Liveness) → If not, restart it
- **Is this container ready to serve traffic?** (Readiness) → If not, don't send requests to it
- **Has this container started?** (Startup) → Give slow-starting apps time to boot

Without proper health checks, you get traffic routed to broken containers.

#### How Kubernetes Uses Health Probes

```
    Kubernetes Health Check Flow
    ────────────────────────────

    ┌─────────────────────────────────────────────────────────┐
    │  Pod Lifecycle                                          │
    │                                                        │
    │  Container Start                                       │
    │       │                                                │
    │       ▼                                                │
    │  ┌─────────────┐  startup probe   ┌──────────────────┐ │
    │  │  STARTING   │  fails →         │  RESTART         │ │
    │  │             │─────────────────▶│  CONTAINER       │ │
    │  │  Startup    │                  └──────────────────┘ │
    │  │  Probe      │                                       │
    │  │  Checking...│  succeeds ↓                           │
    │  └─────────────┘                                       │
    │       │                                                │
    │       ▼                                                │
    │  ┌─────────────┐  liveness probe  ┌──────────────────┐ │
    │  │  RUNNING    │  fails →         │  KILL & RESTART  │ │
    │  │             │─────────────────▶│  CONTAINER       │ │
    │  │  Liveness + │                  └──────────────────┘ │
    │  │  Readiness  │                                       │
    │  │  Probes     │  readiness probe ┌──────────────────┐ │
    │  │  Active     │  fails →         │  REMOVE FROM     │ │
    │  │             │─────────────────▶│  LOAD BALANCER   │ │
    │  └─────────────┘                  │  (don't restart) │ │
    │                                   └──────────────────┘ │
    └─────────────────────────────────────────────────────────┘
```

#### Spring Boot Actuator Configuration

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics, prometheus
  endpoint:
    health:
      show-details: when-authorized
      probes:
        enabled: true    # Enables /actuator/health/liveness & /readiness
      group:
        readiness:
          include:
            - db
            - redis
            - kafka        # Only "ready" when all dependencies are reachable
        liveness:
          include:
            - ping         # Only checks if app process is alive
  health:
    kafka:
      enabled: true
    redis:
      enabled: true
```

#### Custom Health Indicator

```java
// ExternalApiHealthIndicator.java — Check external dependencies
@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final RestClient restClient;

    @Override
    public Health health() {
        try {
            ResponseEntity<Void> response = restClient.get()
                .uri("https://api.payment-gateway.com/health")
                .retrieve()
                .toBodilessEntity();

            if (response.getStatusCode().is2xxSuccessful()) {
                return Health.up()
                    .withDetail("paymentGateway", "Reachable")
                    .withDetail("responseTime", "45ms")
                    .build();
            }
            return Health.down()
                .withDetail("paymentGateway", "Unhealthy")
                .withDetail("status", response.getStatusCode())
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("paymentGateway", "Unreachable")
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

#### Kubernetes Deployment with Probes

```yaml
# k8s-deployment.yml
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      containers:
        - name: order-service
          image: myregistry.azurecr.io/order-service:latest
          ports:
            - containerPort: 8080
          # Startup probe — give the app up to 120s to start
          startupProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            failureThreshold: 24     # 24 × 5s = 120s max startup time
          # Liveness probe — restart if app hangs
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            periodSeconds: 10
            failureThreshold: 3
          # Readiness probe — stop sending traffic if deps are down
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            periodSeconds: 5
            failureThreshold: 3
```

---

## Patterns to Defer (And When to Actually Adopt Them)

The patterns below are genuinely useful — but only in specific contexts. Adopting them prematurely adds complexity without benefit.

### CQRS (Command Query Responsibility Segregation)

**Adopt when**: Your read and write workloads have fundamentally different shapes (e.g., writes go to a normalized relational DB, reads need denormalized search results from Elasticsearch).

```
    CQRS Architecture
    ──────────────────

    ┌─────────────┐   Write (Command)    ┌──────────────┐
    │  Client     │─────────────────────▶│  Command     │
    │             │                       │  Service     │
    │             │                       │              │
    │             │                       │  Validates   │
    │             │                       │  Writes to   │────▶ PostgreSQL
    │             │                       │  Write DB    │      (normalized)
    │             │                       └──────┬───────┘
    │             │                              │
    │             │                              │ Domain Events
    │             │                              │ (async sync)
    │             │                              ▼
    │             │                       ┌──────────────┐
    │             │   Read (Query)        │  Projection  │
    │             │─────────────────────▶│  Service     │
    │             │                       │              │
    │             │◀─────────────────────│  Reads from  │────▶ Elasticsearch
    │             │   Fast response       │  Read DB     │     (denormalized)
    └─────────────┘                       └──────────────┘

    ❌ Premature: Your app has simple CRUD with < 1000 RPM reads
    ✅ Justified: Dashboard queries are slow because they join 10 tables
    ✅ Justified: Read traffic is 100x write traffic, different scaling needed
```

### Saga Pattern (Orchestration)

**Adopt when**: You have multi-step business transactions spanning services that need compensating actions (rollbacks).

```
    Saga Orchestration — Order Fulfillment
    ────────────────────────────────────────

    ┌─────────────────────────────────────────────────────────────┐
    │  Order Saga Orchestrator                                    │
    │                                                            │
    │  Step 1: Reserve Inventory                                 │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │  ✅ Success → Continue to Step 2                     │  │
    │  │  ❌ Failure → End (nothing to compensate)            │  │
    │  └──────────────────────────────────────────────────────┘  │
    │           │                                                │
    │           ▼                                                │
    │  Step 2: Process Payment                                   │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │  ✅ Success → Continue to Step 3                     │  │
    │  │  ❌ Failure → Compensate: Release Inventory          │  │
    │  └──────────────────────────────────────────────────────┘  │
    │           │                                                │
    │           ▼                                                │
    │  Step 3: Schedule Shipping                                 │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │  ✅ Success → Order Complete! 🎉                     │  │
    │  │  ❌ Failure → Compensate: Refund + Release Inventory │  │
    │  └──────────────────────────────────────────────────────┘  │
    └─────────────────────────────────────────────────────────────┘

    ❌ Premature: Start with choreography (event-driven) — simpler
    ✅ Justified: You need guaranteed rollback across 3+ services
    ✅ Justified: Business requires tracking saga state/status
```

### Service Mesh (Istio/Linkerd)

**Adopt when**: You have 20+ services and need uniform mTLS, traffic splitting, and fine-grained observability without changing application code.

```
    Service Mesh — Sidecar Proxy Model
    ────────────────────────────────────

    WITHOUT Service Mesh:
    Each service implements its own retry, TLS, tracing, etc.
    
    ┌─────────────┐                    ┌─────────────┐
    │  Service A  │───── plain HTTP ──▶│  Service B  │
    │  + retries  │                    │  + retries  │
    │  + TLS      │                    │  + TLS      │
    │  + tracing  │                    │  + tracing  │
    │  + circuit  │                    │  + circuit  │
    │    breaker  │                    │    breaker  │
    └─────────────┘                    └─────────────┘
    Duplicated cross-cutting code in every service 😩


    WITH Service Mesh:
    Sidecar proxy handles all networking concerns

    ┌──────────────────┐              ┌──────────────────┐
    │ Pod A            │              │ Pod B            │
    │ ┌──────────────┐ │   mTLS      │ ┌──────────────┐ │
    │ │  Service A   │ │              │ │  Service B   │ │
    │ │  (just       │ │              │ │  (just       │ │
    │ │  business    │ │              │ │  business    │ │
    │ │  logic)      │ │              │ │  logic)      │ │
    │ └──────┬───────┘ │              │ └──────▲───────┘ │
    │        │localhost │              │        │localhost │
    │ ┌──────▼───────┐ │  encrypted   │ ┌──────┴───────┐ │
    │ │  Envoy Proxy │ │─────────────▶│ │  Envoy Proxy │ │
    │ │  (sidecar)   │ │  + retries   │ │  (sidecar)   │ │
    │ │  + mTLS      │ │  + tracing   │ │  + mTLS      │ │
    │ │  + retries   │ │  + metrics   │ │  + retries   │ │
    │ │  + metrics   │ │              │ │  + metrics   │ │
    │ └──────────────┘ │              │ └──────────────┘ │
    └──────────────────┘              └──────────────────┘

    ❌ Premature: < 10 services (use Resilience4j + mTLS at ingress)
    ✅ Justified: 20+ services, multiple teams, polyglot tech stack
    ✅ Justified: Compliance requires mTLS between all services
```

### Database per Service

**Adopt when**: Teams need independent deployment and schema evolution, or services need fundamentally different storage types.

```
    Database per Service — The Spectrum
    ─────────────────────────────────────

    Shared Database (Start here for v1)
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Order    │  │ Payment  │  │ Inventory│
    │ Service  │  │ Service  │  │ Service  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         └─────────────┼─────────────┘
                       │
                 ┌─────▼─────┐
                 │ Shared    │  ✅ Simple, ACID transactions
                 │ PostgreSQL│  ✅ Easy joins across domains
                 │           │  ❌ Schema coupling
                 └───────────┘  ❌ Single point of failure


    Database per Service (When you need independence)
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Order    │  │ Payment  │  │ Inventory│
    │ Service  │  │ Service  │  │ Service  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
    ┌────▼─────┐ ┌─────▼────┐ ┌─────▼────┐
    │PostgreSQL│ │PostgreSQL│ │  Redis   │
    │ (orders) │ │(payments)│ │(inventory│
    │          │ │          │ │  cache)  │
    └──────────┘ └──────────┘ └──────────┘

    ✅ Independent deployment & scaling
    ✅ Best storage type per service
    ❌ No cross-service joins (need API calls or events)
    ❌ Distributed transaction complexity

    ❌ Premature: Small team (< 5 devs), few services
    ✅ Justified: Teams need independent release cycles
    ✅ Justified: Different data access patterns per service
```

---

## The Decision Framework

Before adopting any pattern, run it through this checklist:

```
    Pattern Adoption Decision Tree
    ───────────────────────────────

    "Should I adopt pattern X?"
    
           │
           ▼
    ┌──────────────────────┐
    │ Do I have a concrete │     NO
    │ problem that X       │──────────▶ STOP. Don't adopt it.
    │ solves?              │
    └──────────┬───────────┘
               │ YES
               ▼
    ┌──────────────────────┐
    │ Can I solve it with  │     YES
    │ a simpler approach?  │──────────▶ Use the simpler approach.
    │                      │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │ Does my team have    │     NO
    │ the expertise to     │──────────▶ Invest in learning first.
    │ operate it?          │           Don't adopt in production
    └──────────┬───────────┘           while learning.
               │ YES
               ▼
    ┌──────────────────────┐
    │ Can I adopt it       │     NO
    │ incrementally?       │──────────▶ Be cautious. Big-bang
    │                      │           migrations are risky.
    └──────────┬───────────┘
               │ YES
               ▼
        ✅ ADOPT IT.
        Start small, measure impact,
        expand if value is proven.
```

## Summary — The Pragmatic Adoption Ladder

```
    Complexity & Team Size ──────────────────────────────────────▶

    Solo/Small Team           Growing Team           Large Org
    (1-5 services)            (5-15 services)        (15+ services)
    
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │ ✅ API Gateway    │  │ + CQRS (if       │  │ + Service Mesh   │
    │ ✅ Circuit Breaker│  │   needed)        │  │ + Saga           │
    │ ✅ Event-Driven   │  │ + DB per Service │  │   Orchestration  │
    │ ✅ Correlation IDs│  │ + Distributed    │  │ + Event Sourcing │
    │ ✅ Health Checks  │  │   Tracing (Jaeger│  │ + Advanced       │
    │                  │  │   /Zipkin)       │  │   Observability  │
    │ Start here.      │  │ + Schema Registry│  │   (OpenTelemetry)│
    │ Master these     │  │                  │  │                  │
    │ before adding    │  │ Add when pain    │  │ At this scale,   │
    │ complexity.      │  │ points emerge.   │  │ you need these.  │
    └──────────────────┘  └──────────────────┘  └──────────────────┘
```

## The Real Advice

Start with a **modular monolith**. Extract services when you have a clear scaling or team boundary reason. Every service boundary is a network call — and network calls fail, have latency, and need monitoring. Don't pay that tax until you have to.

**Patterns are tools, not goals.** The best architecture is the simplest one that solves your current problems while leaving room to evolve. Ship features, not frameworks.
