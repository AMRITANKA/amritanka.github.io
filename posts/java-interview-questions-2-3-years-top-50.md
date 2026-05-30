---
layout: layouts/post.html
title: "Java Interview Questions and Answers for 2 to 3 Years Experienced: Top 50"
date: 2026-05-30
description: "Top 50 Java interview questions with crisp answers for 2–3 years experienced developers (Core Java, OOP, Collections, Concurrency, JVM, and Java 8+)."
tags: ["Java", "Interview", "Core Java", "Collections", "Multithreading", "JVM"]
category: "Interview"
---

This post is a curated list of **50 high-frequency Java interview questions** with practical, to-the-point answers—ideal for **2–3 years experienced** developers.

---

## 1) Method Overloading vs Method Overriding
**Overloading**: Same method name, different parameter list (compile-time / static polymorphism).

**Overriding**: Same method signature in subclass with specific implementation (runtime / dynamic polymorphism).

---

## 2) What is a ClassLoader in Java?
A **ClassLoader** loads `.class` bytecode into the JVM.

Common types:
- **Bootstrap**: loads core Java classes (from the JRE).
- **Extension / Platform**: loads platform extensions.
- **System / Application**: loads classes from the application classpath.

---

## 3) What is inheritance in Java?
Inheritance lets a class **reuse** properties/behaviors of another class (`extends`). It supports:
- **Code reuse**
- **Method overriding**
- **Polymorphism**

---

## 4) Why can’t we override a static method?
Static methods belong to the **class**, not the object. Overriding is based on **runtime polymorphism**, but static method binding happens at **compile time**.

A same-signature static method in child class results in **method hiding**, not overriding.

---

## 5) What is Dynamic Method Dispatch?
It’s runtime selection of an **overridden** method implementation based on the **actual object**, not the reference type.

---

## 6) What is Java Classpath?
Classpath tells the JVM **where to find classes and libraries** (directories/JARs) required for execution.

---

## 7) What does the `volatile` keyword do?
`volatile` ensures **visibility** of changes to a variable across threads (reads/writes go to main memory). It does **not** make compound operations (like `count++`) atomic.

---

## 8) When does `finally` not execute?
`finally` generally executes, except when the JVM exits abruptly, e.g. `System.exit(0)` (or a fatal crash).

---

## 9) StringBuffer vs StringBuilder
- **StringBuffer**: synchronized, thread-safe, slower.
- **StringBuilder**: not synchronized, faster, preferred in single-thread contexts.

---

## 10) Vector vs ArrayList
- **Vector**: synchronized (thread-safe), slower.
- **ArrayList**: not synchronized, faster, most commonly used.

---

## 11) Why is String immutable?
Key reasons:
- **String pool** sharing
- **Security** (classpath, reflection, etc.)
- **Hash caching** (e.g., `HashMap` keys)
- **Thread-safety**

---

## 12) HashMap vs HashSet
- **HashMap** stores **key-value** pairs; keys must be unique.
- **HashSet** stores only **unique values** (internally uses a `HashMap`).

---

## 13) Producer–Consumer problem & benefits
A concurrency pattern where:
- Producer produces items into a buffer
- Consumer consumes items

Typical implementations use **blocking queues** (`BlockingQueue`) or `wait/notify`.

Benefits:
- Decouples producer and consumer
- Improves throughput
- Cleaner concurrent design

---

## 14) How to create an immutable class?
- Make class `final`
- Make fields `private final`
- No setters
- Initialize via constructor
- Return defensive copies for mutable fields

---

## 15) Fail-fast vs Fail-safe iterators
- **Fail-fast**: throws `ConcurrentModificationException` on structural modification (e.g., ArrayList iterator).
- **Fail-safe**: iterates over a copy (e.g., `CopyOnWriteArrayList`), doesn’t throw CME.

---

## 16) What is an interface? Features?
An interface defines a contract.
- Supports **multiple inheritance of type**
- Can have **default** and **static** methods (Java 8+)
- Variables are `public static final` by default

---

## 17) SOLID principles
- **S**RP: one reason to change
- **O**CP: open for extension, closed for modification
- **L**SP: substitutability
- **I**SP: small focused interfaces
- **D**IP: depend on abstractions

---

## 18) What is the difference between `==` and `equals()`?
- `==` compares references (same object?)
- `equals()` compares logical equality (can be overridden)

---

## 19) What is the `instanceof` operator?
Checks if an object is an instance of a class/interface. Helps avoid `ClassCastException` during casting.

---

## 20) `super` keyword use cases
- Access parent members
- Call parent method
- Invoke parent constructor via `super()`

---

## 21) What is `finalize()`? Why discouraged?
`finalize()` may be called by GC before object removal, but it’s unpredictable and deprecated in modern Java. Prefer **try-with-resources** and explicit cleanup.

---

## 22) What are the main Collections Framework interfaces?
- `Collection` → `List`, `Set`, `Queue`
- `Map` (separate hierarchy)

---

## 23) What is a Thread?
A lightweight unit of execution. Java supports multithreading via `Thread` and `Runnable`.

---

## 24) How to create a thread?
- Extend `Thread`
- Implement `Runnable`
- (Modern) Use `ExecutorService`

---

## 25) What is deadlock? How to avoid?
Deadlock happens when threads wait on each other forever.

Avoid using:
- consistent lock ordering
- timeouts (`tryLock`)
- minimizing nested locks

---

## 26) What is synchronization?
Ensures only one thread accesses critical section at a time to prevent data inconsistency.

---

## 27) Shallow copy vs deep copy
- **Shallow**: copies references
- **Deep**: copies nested objects too

---

## 28) What are annotations used for?
Metadata for:
- compiler checks (`@Override`)
- runtime frameworks (Spring/Hibernate)
- documentation

---

## 29) What is the Java Memory Model (JMM)?
Defines rules for **visibility**, **ordering**, and **atomicity** in multi-threaded Java.

---

## 30) What is reflection?
Inspect/modify classes/methods/fields at runtime (`java.lang.reflect`). Useful for frameworks; use carefully due to performance/security.

---

## 31) What does `join()` do?
Makes the current thread wait until the target thread finishes.

---

## 32) Benefits of Java Stream API
- concise functional operations
- lazy evaluation
- easy parallelization

---

## 33) What is try-with-resources?
Introduced in Java 7; automatically closes resources implementing `AutoCloseable`.

```java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
  // use resource
}
```

---

## 34) Comparable vs Comparator
- **Comparable** (`compareTo`) defines natural ordering inside the class
- **Comparator** (`compare`) defines external/custom ordering

---

## 35) What is a Queue?
FIFO data structure (`Queue` interface). Implementations: `LinkedList`, `ArrayDeque`, `PriorityQueue`.

---

## 36) What is `clone()`?
Creates a copy of an object. Default is **shallow copy**; requires `Cloneable` and overriding carefully. Often better to use copy constructors/factories.

---

## 37) What are default methods in interfaces?
Java 8 feature to add new methods to interfaces without breaking existing implementations.

---

## 38) What are checked vs unchecked exceptions?
- **Checked**: must be handled/declared (`IOException`)
- **Unchecked**: runtime (`NullPointerException`)

---

## 39) Difference between `throw` and `throws`
- `throw`: actually throws an exception
- `throws`: declares a method may throw exceptions

---

## 40) What is Optional?
`Optional` is a container to represent presence/absence of value, reducing null handling errors.

---

## 41) What is a functional interface?
An interface with exactly one abstract method (e.g., `Runnable`, `Callable`, `Function`). Used for lambdas.

---

## 42) What are lambda expressions?
A concise way to implement functional interfaces.

---

## 43) What is a marker interface?
An empty interface used to convey metadata (e.g., `Serializable`, historically `Cloneable`).

---

## 44) What is serialization?
Converting object into byte stream for storage/transfer (`Serializable`). Use carefully; consider security implications.

---

## 45) What is the difference between `HashMap` and `ConcurrentHashMap`?
- `HashMap`: not thread-safe
- `ConcurrentHashMap`: thread-safe with better concurrency; avoids locking entire map

---

## 46) What is the difference between `ArrayList` and `LinkedList`?
- `ArrayList`: fast random access, slower middle inserts
- `LinkedList`: faster inserts/removes in middle, slower random access

---

## 47) What is the difference between `map()` and `flatMap()` in streams?
- `map`: one-to-one transform
- `flatMap`: one-to-many then flattens

---

## 48) What is a race condition?
When multiple threads access shared data and the final result depends on timing/order. Prevent using synchronization/locks/atomic classes.

---

## 49) What are atomic classes?
Classes like `AtomicInteger` providing lock-free thread-safe operations using CAS (compare-and-swap).

---

## 50) JVM vs JRE vs JDK
- **JVM**: runs bytecode
- **JRE**: JVM + standard libraries
- **JDK**: JRE + developer tools (javac, debugger, etc.)

---

### Want a printable version?
If you want, I can also generate a **PDF-style** version (clean formatting) or split this into multiple posts (Core Java / Collections / Concurrency).
