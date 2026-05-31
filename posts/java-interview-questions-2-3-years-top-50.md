---
layout: layouts/post.html
title: "Java Interview Questions and Answers for 2–3 Years Experienced Developers: Most Frequently Asked Questions"
date: 2026-05-30
description: "Most frequently asked Java interview questions and answers for 2–3 years experienced developers, covering Core Java, OOP, Collections, Concurrency, JVM, and Java 8+ features."
tags: ["Java", "Interview", "Core Java", "Collections", "Multithreading", "JVM"]
category: "Interview"
---
This guide contains the most frequently asked Java interview questions and answers for developers with 2–3 years of experience. It covers Core Java, OOP Concepts, Collections Framework, Exception Handling, Multithreading, JVM Architecture, Class Loading, Java 8 Features, and other key topics commonly asked in technical interviews.
---

<h1 style="text-decoration: underline;">1) Method Overloading vs Method Overriding in Java</h1>

## Introduction

Method Overloading and Method Overriding are two important concepts in Java that support **Polymorphism**. Although their names sound similar, they serve different purposes and work differently.

---

# Method Overloading

## Definition

Method Overloading occurs when multiple methods in the same class have the **same name** but **different parameter lists**.

This is also known as **Compile-Time Polymorphism** because the compiler determines which method to call during compilation.

---

## Rules for Method Overloading

✅ Method name must be the same

✅ Parameters must be different:

* Different number of parameters
* Different data types
* Different order of parameters

✅ Return type may be different

❌ Changing only the return type is not considered overloading

---

## Example

```java
class Calculator {

    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

### Output

```java
Calculator calc = new Calculator();

System.out.println(calc.add(10, 20));        // 30
System.out.println(calc.add(10.5, 20.5));    // 31.0
System.out.println(calc.add(10, 20, 30));    // 60
```

---

## Advantages of Overloading

* Improves code readability
* Increases code reusability
* Allows methods to perform similar operations with different inputs

---

# Method Overriding

## Definition

Method Overriding occurs when a child class provides its own implementation of a method that already exists in the parent class.

This is also known as **Runtime Polymorphism** because the method call is resolved during execution.

---

## Rules for Method Overriding

✅ Requires inheritance

✅ Method name must be the same

✅ Parameters must be exactly the same

✅ Return type must be same or covariant

✅ Access modifier cannot be more restrictive

❌ Static methods cannot be overridden

❌ Final methods cannot be overridden

❌ Private methods cannot be overridden

---

## Example

```java
class Animal {

    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Test {

    public static void main(String[] args) {

        Animal animal = new Dog();
        animal.sound();
    }
}
```

### Output

```text
Dog barks
```

---

## Why Runtime Polymorphism?

```java
Animal animal = new Dog();
animal.sound();
```

Although the reference type is `Animal`, the actual object is `Dog`.

At runtime, Java determines which method implementation should be executed.

This process is called **Dynamic Method Dispatch**.

---

# Comparison Table

| Feature              | Method Overloading                         | Method Overriding                                   |
| -------------------- | ------------------------------------------ | --------------------------------------------------- |
| Definition           | Same method name with different parameters | Same method implementation redefined in child class |
| Inheritance Required | No                                         | Yes                                                 |
| Method Name          | Same                                       | Same                                                |
| Parameters           | Must be different                          | Must be same                                        |
| Return Type          | Can differ                                 | Same or Covariant                                   |
| Binding              | Compile Time                               | Runtime                                             |
| Polymorphism Type    | Static Polymorphism                        | Dynamic Polymorphism                                |
| Performance          | Faster                                     | Slightly slower due to runtime resolution           |
| Annotation           | Not required                               | @Override recommended                               |

---

# Interview Questions

## 1.1 Can we overload a method by changing only the return type?

No.

```java
int add(int a, int b)
double add(int a, int b) // Compilation Error
```

The parameter list must be different.

---

## 1.2 Can static methods be overridden?

No.

Static methods belong to the class rather than objects.

```java
class Parent {
    static void show() {}
}

class Child extends Parent {
    static void show() {}
}
```

This is called **Method Hiding**, not Overriding.

---

## 1.3 Can final methods be overridden?

No.

```java
class Parent {

    final void display() {
    }
}

class Child extends Parent {

    // Compilation Error
    void display() {
    }
}
```

---

## 1.4 Can private methods be overridden?

No.

Private methods are not inherited by child classes.

---

## 1.5 Can constructors be overloaded?

Yes.

```java
class Employee {

    Employee() {
    }

    Employee(int id) {
    }

    Employee(int id, String name) {
    }
}
```

Constructors support overloading but not overriding.

---

# Real-World Example

Consider a payment application.

### Method Overloading

```java
class PaymentService {

    void pay(double amount) {
    }

    void pay(double amount, String couponCode) {
    }

    void pay(double amount, String couponCode, boolean useWallet) {
    }
}
```

Same operation with different inputs.

---

### Method Overriding

```java
class Payment {

    void processPayment() {
        System.out.println("Generic Payment");
    }
}

class CreditCardPayment extends Payment {

    @Override
    void processPayment() {
        System.out.println("Credit Card Payment");
    }
}

class UpiPayment extends Payment {

    @Override
    void processPayment() {
        System.out.println("UPI Payment");
    }
}
```

Same method with different implementations.

---

# Key Takeaways

### Method Overloading

* Same method name
* Different parameters
* Same class
* Compile-time polymorphism
* No inheritance required

### Method Overriding

* Same method signature
* Child class redefines parent method
* Requires inheritance
* Runtime polymorphism
* Supports dynamic behavior

---

# Easy Way to Remember

**Overloading = Same Method + Different Inputs**

**Overriding = Same Method + Different Behavior**

Example:

```text
Overloading → One person speaking multiple languages.

Overriding → Son follows his own way instead of his father's way.
```

Both concepts are fundamental to writing flexible, reusable, and object-oriented Java applications.


---

<h1 style="text-decoration: underline;">2) What is a ClassLoader in Java?</h1>

## Introduction

A **ClassLoader** in Java is a part of the Java Runtime Environment (JRE) responsible for **loading Java classes into memory dynamically at runtime**.

When a Java program starts, classes are not loaded into memory all at once. Instead, the JVM loads classes only when they are needed. This process is handled by the ClassLoader subsystem.

In simple terms:

> A ClassLoader is a JVM component that loads `.class` files into memory and makes them available for execution.

---

# Why Do We Need a ClassLoader?

Consider the following code:

```java
public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
    }
}
```

Before the JVM can create the `Employee` object:

1. It must locate the `Employee.class` file.
2. Load the bytecode into memory.
3. Verify the bytecode.
4. Link the class.
5. Initialize the class.

The ClassLoader performs these tasks automatically.

---

# Class Loading Process

The JVM loads classes in three major phases:

## 1. Loading

The JVM reads the `.class` file and creates a corresponding `Class` object.

```java
Class<?> cls = Employee.class;
```

At this stage, the bytecode is loaded into memory.

---

## 2. Linking

Linking consists of three steps:

### Verification

Checks whether the bytecode is valid and secure.

### Preparation

Allocates memory for static variables.

```java
static int count;
```

Memory is allocated and initialized with default values.

### Resolution

Converts symbolic references into direct memory references.

---

## 3. Initialization

Static variables and static blocks are executed.

```java
class Employee {

    static {
        System.out.println("Class Initialized");
    }
}
```

Output:

```text
Class Initialized
```

---

# Types of ClassLoaders in Java

Java uses a hierarchy of ClassLoaders.

```text
Bootstrap ClassLoader
        ↑
Platform ClassLoader
        ↑
Application ClassLoader
```

---

## 1. Bootstrap ClassLoader

### Responsibility

Loads core Java classes.

Examples:

```java
java.lang.String
java.lang.Object
java.util.ArrayList
java.util.HashMap
```

### Location

Loads classes from:

```text
<JAVA_HOME>/lib
```

### Example

```java
System.out.println(String.class.getClassLoader());
```

Output:

```text
null
```

Why null?

Bootstrap ClassLoader is implemented in native code and is not represented as a Java object.

---

## 2. Platform ClassLoader

Introduced in Java 9.

### Responsibility

Loads Java platform modules and extension libraries.

### Example

```java
System.out.println(
    java.sql.Driver.class.getClassLoader()
);
```

Typical Output:

```text
jdk.internal.loader.ClassLoaders$PlatformClassLoader
```

---

## 3. Application ClassLoader

Also known as:

```text
System ClassLoader
```

### Responsibility

Loads classes available in:

```text
Classpath
```

Examples:

* User-created classes
* Third-party libraries
* Maven dependencies
* Spring Boot classes

### Example

```java
System.out.println(
    Employee.class.getClassLoader()
);
```

Output:

```text
jdk.internal.loader.ClassLoaders$AppClassLoader
```

---

# Parent Delegation Model

Java ClassLoaders follow the **Parent Delegation Principle**.

Before loading a class, a ClassLoader asks its parent to load it first.

```text
Application ClassLoader
          |
          V
Platform ClassLoader
          |
          V
Bootstrap ClassLoader
```

---

## Example

When loading:

```java
String str = "Hello";
```

The Application ClassLoader asks:

1. Platform ClassLoader
2. Bootstrap ClassLoader

Bootstrap ClassLoader already knows about `String.class`, so it loads the class.

This prevents duplicate loading and improves security.

---

# How to Check Which ClassLoader Loaded a Class?

```java
public class Test {

    public static void main(String[] args) {

        System.out.println(
            String.class.getClassLoader()
        );

        System.out.println(
            Test.class.getClassLoader()
        );
    }
}
```

Output:

```text
null
jdk.internal.loader.ClassLoaders$AppClassLoader
```

---

# Custom ClassLoader

Java allows developers to create their own ClassLoaders.

Example use cases:

* Application servers
* Plugin architectures
* Hot deployment
* Dynamic module loading
* Security frameworks

Example:

```java
public class MyClassLoader extends ClassLoader {

    @Override
    protected Class<?> findClass(String name)
            throws ClassNotFoundException {

        // Custom loading logic

        return super.findClass(name);
    }
}
```

---

# Real-World Example

## Spring Boot

When a Spring Boot application starts:

1. JVM starts.
2. Application ClassLoader loads Spring classes.
3. Spring scans components.
4. Classes are loaded dynamically.
5. Beans are created.

Without ClassLoaders, dynamic frameworks like Spring would not work efficiently.

---

# Interview Questions

## 2.1 What is a ClassLoader?

A ClassLoader is a JVM component responsible for loading Java classes into memory dynamically during runtime.

---

## 2.2 How many built-in ClassLoaders are there?

Three:

1. Bootstrap ClassLoader
2. Platform ClassLoader
3. Application ClassLoader

---

## 2.3 What is Parent Delegation?

A mechanism where a ClassLoader delegates class-loading requests to its parent before attempting to load the class itself.

---

## 2.4 Why does `String.class.getClassLoader()` return null?

Because `String` is loaded by the Bootstrap ClassLoader, which is implemented in native code and not represented as a Java object.

---

## 2.5 Can we create a custom ClassLoader?

Yes.

By extending the `ClassLoader` class and overriding methods such as:

```java
findClass()
loadClass()
```

---

# ClassLoader vs JVM Memory Areas

| Component         | Responsibility                          |
| ----------------- | --------------------------------------- |
| ClassLoader       | Loads classes into memory               |
| Heap              | Stores objects                          |
| Stack             | Stores method calls and local variables |
| Method Area       | Stores class metadata                   |
| Garbage Collector | Removes unused objects                  |

---

# Key Takeaways

* ClassLoader loads Java classes dynamically at runtime.
* JVM uses lazy loading to improve performance.
* Java provides three built-in ClassLoaders:

  * Bootstrap
  * Platform
  * Application
* ClassLoaders follow the Parent Delegation Model.
* Custom ClassLoaders enable advanced features such as plugins and hot deployment.
* Every Java application relies on ClassLoaders behind the scenes.

---

# Easy Way to Remember

```text
ClassLoader = Librarian of the JVM

Just as a librarian finds and brings the correct book
when requested, the ClassLoader finds and loads the
required class when the JVM needs it.
```


<h1 style="text-decoration: underline;"> 3) What is inheritance in Java?</h1>

## Introduction

**Inheritance** is one of the four fundamental principles of Object-Oriented Programming (OOP).

Inheritance allows one class to acquire the properties and behaviors (fields and methods) of another class.

In simple terms:

> Inheritance is a mechanism through which a child class can reuse the code of an existing parent class.

This promotes:

* Code Reusability
* Maintainability
* Extensibility
* Polymorphism

---

# Real-Life Example

Consider a family relationship:

```text
Parent
   │
   ▼
Child
```

A child inherits characteristics from its parent.

Similarly in Java:

```text
Animal
   │
   ▼
Dog
```

The `Dog` class inherits properties and methods from the `Animal` class.

---

# Syntax of Inheritance

Java uses the `extends` keyword.

```java
class Parent {
    // properties and methods
}

class Child extends Parent {
    // additional properties and methods
}
```

---

# Basic Example

```java
class Animal {

    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {

    void bark() {
        System.out.println("Dog is barking");
    }
}

public class Test {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.eat();
        dog.bark();
    }
}
```

### Output

```text
Animal is eating
Dog is barking
```

---

# How Inheritance Works

## Diagram

```text
        +----------------+
        |    Animal      |
        +----------------+
        | + eat()        |
        +----------------+
                ▲
                │ extends
                │
        +----------------+
        |      Dog       |
        +----------------+
        | + bark()       |
        +----------------+
```

The `Dog` class can use:

* Its own methods
* Methods inherited from `Animal`

---

# Why Use Inheritance?

Without inheritance:

```java
class Dog {

    void eat() {
        System.out.println("Animal is eating");
    }

    void bark() {
        System.out.println("Dog barking");
    }
}

class Cat {

    void eat() {
        System.out.println("Animal is eating");
    }

    void meow() {
        System.out.println("Cat meowing");
    }
}
```

Problem:

* Duplicate code
* Difficult maintenance

With inheritance:

```java
class Animal {

    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
}

class Cat extends Animal {
}
```

Benefit:

* Reusable code
* Cleaner design

---

# Types of Inheritance in Java

Java supports inheritance through classes and interfaces.

---

## 1. Single Inheritance

One child inherits from one parent.

### Diagram

```text
Animal
   │
   ▼
Dog
```

### Example

```java
class Animal {
    void eat() {
    }
}

class Dog extends Animal {
    void bark() {
    }
}
```

---

## 2. Multilevel Inheritance

A class inherits from another child class.

### Diagram

```text
Animal
   │
   ▼
Dog
   │
   ▼
Puppy
```

### Example

```java
class Animal {
    void eat() {
    }
}

class Dog extends Animal {
    void bark() {
    }
}

class Puppy extends Dog {
    void play() {
    }
}
```

---

## 3. Hierarchical Inheritance

Multiple child classes inherit from the same parent.

### Diagram

```text
             Animal
           /    |    \
          /     |     \
         ▼      ▼      ▼
       Dog     Cat    Lion
```

### Example

```java
class Animal {
    void eat() {
    }
}

class Dog extends Animal {
}

class Cat extends Animal {
}

class Lion extends Animal {
}
```

---

## 4. Multiple Inheritance (Through Interfaces)

Java does not support multiple inheritance with classes.

❌ Not Allowed

```java
class A {
}

class B {
}

class C extends A, B {
}
```

Reason:

The Diamond Problem.

---

### Multiple Inheritance Using Interfaces

✅ Allowed

```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {

    public void fly() {
        System.out.println("Flying");
    }

    public void swim() {
        System.out.println("Swimming");
    }
}
```

---

# The Diamond Problem

Imagine:

```text
          Animal
          /    \
         /      \
        ▼        ▼
     Bird      Fish
         \      /
          \    /
           Duck
```

If both `Bird` and `Fish` have the same method:

```java
void move()
```

Which implementation should `Duck` inherit?

To avoid this ambiguity, Java does not allow multiple inheritance with classes.

---

# The super Keyword

The `super` keyword is used to access parent class members.

---

## Access Parent Method

```java
class Animal {

    void sound() {
        System.out.println("Animal Sound");
    }
}

class Dog extends Animal {

    void sound() {
        super.sound();
        System.out.println("Dog Bark");
    }
}
```

Output:

```text
Animal Sound
Dog Bark
```

---

## Call Parent Constructor

```java
class Animal {

    Animal() {
        System.out.println("Animal Constructor");
    }
}

class Dog extends Animal {

    Dog() {
        super();
        System.out.println("Dog Constructor");
    }
}
```

Output:

```text
Animal Constructor
Dog Constructor
```

---

# Inheritance and Method Overriding

Inheritance enables Runtime Polymorphism through Method Overriding.

```java
class Animal {

    void sound() {
        System.out.println("Animal Sound");
    }
}

class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog Bark");
    }
}
```

---

# Real-World Example

## Banking Application

```text
                 Account
                    ▲
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
 SavingsAccount CurrentAccount LoanAccount
```

### Parent Class

```java
class Account {

    void deposit() {
        System.out.println("Deposit Money");
    }

    void withdraw() {
        System.out.println("Withdraw Money");
    }
}
```

### Child Class

```java
class SavingsAccount extends Account {

    void calculateInterest() {
        System.out.println("Calculating Interest");
    }
}
```

Benefit:

* Common functionality remains in one place.
* Child classes add specialized behavior.

---

# Advantages of Inheritance

### Code Reusability

Write once, use many times.

### Easy Maintenance

Changes in parent class are inherited automatically.

### Better Code Organization

Common functionality stays in the parent class.

### Supports Polymorphism

Allows dynamic method dispatch.

### Extensibility

New child classes can be added easily.

---

# Disadvantages of Inheritance

### Tight Coupling

Child classes depend heavily on parent classes.

### Reduced Flexibility

Changes in parent class may affect all child classes.

### Deep Hierarchies Become Complex

Too many inheritance levels make maintenance difficult.

---

# Interview Questions

## 3.1 What is Inheritance?

Inheritance is a mechanism that allows one class to acquire the properties and methods of another class.

---

## 3.2 Which keyword is used for inheritance?

```java
extends
```

---

## 3.3 Does Java support multiple inheritance?

No, not through classes.

Java supports multiple inheritance using interfaces.

---

## 3.4 What is the advantage of inheritance?

* Code reuse
* Better maintainability
* Supports polymorphism

---

## 3.5 What is the difference between Inheritance and Composition?

### Inheritance

```text
IS-A Relationship
```

Example:

```text
Dog IS-A Animal
```

### Composition

```text
HAS-A Relationship
```

Example:

```text
Car HAS-A Engine
```

---

# Inheritance vs Composition

| Feature                    | Inheritance | Composition |
| -------------------------- | ----------- | ----------- |
| Relationship               | IS-A        | HAS-A       |
| Coupling                   | Tight       | Loose       |
| Reusability                | High        | High        |
| Flexibility                | Less        | More        |
| Preferred in Modern Design | No          | Yes         |

---

# Key Takeaways

* Inheritance is an OOP concept that enables code reuse.
* Java uses the `extends` keyword for inheritance.
* A child class inherits fields and methods from a parent class.
* Java supports:

  * Single Inheritance
  * Multilevel Inheritance
  * Hierarchical Inheritance
* Multiple inheritance is supported through interfaces.
* Inheritance is the foundation for Method Overriding and Runtime Polymorphism.
* Modern application design often prefers Composition over deep inheritance hierarchies.

---

# Easy Way to Remember

```text
Inheritance = "IS-A" Relationship

Dog IS-A Animal
Car IS-A Vehicle
Manager IS-A Employee

Composition = "HAS-A" Relationship

Car HAS-A Engine
House HAS-A Room
Computer HAS-A CPU
```

A simple rule:

> If one object "is a type of" another object, use Inheritance.
>
> If one object "contains" another object, use Composition.


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
