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

## Table of Contents

<div class="toc">

1. [Method Overloading vs Method Overriding in Java](#method-overloading-vs-method-overriding-in-java)
2. [What is a ClassLoader in Java?](#what-is-a-classloader-in-java)
3. [What is inheritance in Java?](#what-is-inheritance-in-java)
4. [Why can't we override a static method?](#why-cant-we-override-a-static-method)
5. [What is Dynamic Method Dispatch?](#what-is-dynamic-method-dispatch)
6. [What is Java Classpath?](#what-is-java-classpath)
7. [What does the `volatile` keyword do?](#what-does-the-volatile-keyword-do)
8. [When does `finally` not execute?](#when-does-finally-not-execute)
9. [StringBuffer vs StringBuilder](#stringbuffer-vs-stringbuilder)
10. [Vector vs ArrayList](#vector-vs-arraylist)
11. [Why is String immutable?](#why-is-string-immutable)
12. [HashMap vs HashSet](#hashmap-vs-hashset)
13. [Producer–Consumer problem & benefits](#producer-consumer-problem-benefits)
14. [How to create an immutable class?](#how-to-create-an-immutable-class)
15. [Fail-fast vs Fail-safe iterators](#fail-fast-vs-fail-safe-iterators)
16. [What is an interface? Features?](#what-is-an-interface-features)
17. [SOLID principles](#solid-principles)
18. [What is the difference between `==` and `equals()`?](#what-is-the-difference-between-and-equals)
19. [What is the `instanceof` operator?](#what-is-the-instanceof-operator)
20. [`super` keyword use cases](#super-keyword-use-cases)
21. [What is `finalize()`? Why discouraged?](#what-is-finalize-why-discouraged)
22. [What are the main Collections Framework interfaces?](#what-are-the-main-collections-framework-interfaces)
23. [What is a Thread? How to Create a Thread in Java?](#what-is-a-thread-how-to-create-a-thread-in-java)
24. [What is a Virtual Thread in Java? How to Create It? When to Use It?](#what-is-a-virtual-thread-in-java-how-to-create-it-when-to-use-it)
25. [What is deadlock? How to avoid?](#what-is-deadlock-how-to-avoid)
26. [What is synchronization?](#what-is-synchronization)
27. [Shallow Copy vs Deep Copy in Java](#shallow-copy-vs-deep-copy-in-java)
28. [What Are Annotations in Java? How to Create a Custom Annotation?](#what-are-annotations-in-java-how-to-create-a-custom-annotation)
29. [What is the Java Memory Model (JMM)?](#what-is-the-java-memory-model-jmm)
30. [What is Reflection in Java?](#what-is-reflection-in-java)
31. [What Does `join()` Do in Java?](#what-does-join-do-in-java)
32. [Benefits of Java Stream API](#benefits-of-java-stream-api)
33. [What is Try-With-Resources in Java?](#what-is-try-with-resources-in-java)
34. [Comparable vs Comparator in Java](#comparable-vs-comparator-in-java)
35. [What is a Marker Interface in Java?](#what-is-a-marker-interface-in-java)
36. [What is `clone()` in Java?](#what-is-clone-in-java)
37. [What Are Default Methods in Interfaces?](#what-are-default-methods-in-interfaces)
38. [What Are Checked vs Unchecked Exceptions in Java?](#what-are-checked-vs-unchecked-exceptions-in-java)
39. [Difference between `throw` and `throws`](#difference-between-throw-and-throws)
40. [What is `Optional` in Java?](#what-is-optional-in-java)
41. [What is a functional interface?](#what-is-a-functional-interface)
42. [What Are Lambda Expressions in Java?](#what-are-lambda-expressions-in-java)
43. [When to Use Abstract Class and When to Use Interface in Java?](#when-to-use-abstract-class-and-when-to-use-interface-in-java)
44. [What is Serialization in Java?](#what-is-serialization-in-java)
45. [Difference Between `HashMap` and `ConcurrentHashMap` in Java](#difference-between-hashmap-and-concurrenthashmap-in-java)
46. [Difference Between `ArrayList` and `LinkedList` in Java](#difference-between-arraylist-and-linkedlist-in-java)
47. [Difference Between `map()` and `flatMap()` in Java Streams](#difference-between-map-and-flatmap-in-java-streams)
48. [What is a Race Condition in Java?](#what-is-a-race-condition-in-java)
49. [What Are Atomic Classes in Java?](#what-are-atomic-classes-in-java)
50. [JVM vs JRE vs JDK in Java](#jvm-vs-jre-vs-jdk-in-java)

</div>

---

<h1 id="method-overloading-vs-method-overriding-in-java" style="text-decoration: underline;">1) Method Overloading vs Method Over recognizer</h1>

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

<h1 id="what-is-a-classloader-in-java" style="text-decoration: underline;">2) What is a ClassLoader in Java?</h1>

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


<h1 id="what-is-inheritance-in-java" style="text-decoration: underline;"> 3) What is inheritance in Java?</h1>

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


<h1 id="why-cant-we-override-a-static-method" style="text-decoration: underline;">4) Why can’t we override a static method?</h1>

Static methods belong to the **class**, not to an **object (instance)**. Method overriding is a runtime polymorphism feature that depends on the actual object being created.

Since static methods are resolved at **compile time** using the reference type, Java does not allow true overriding of static methods.

## Example

```java
class Parent {
    static void show() {
        System.out.println("Parent Static Method");
    }
}

class Child extends Parent {
    static void show() {
        System.out.println("Child Static Method");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}
```

### Output

```text
Parent Static Method
```

## Why?

When the compiler sees:

```java
p.show();
```

it checks the type of `p`, which is `Parent`, and binds the method call at compile time.

Equivalent to:

```java
Parent.show();
```

Therefore, the `Child` version is not called.

## What Happens Instead?

The static method in the child class **hides** the parent's static method rather than overriding it. This is called **Method Hiding**.

## Key Interview Point

| Static Method | Instance Method |
|--------------|----------------|
| Belongs to class | Belongs to object |
| Resolved at compile time | Resolved at runtime |
| Cannot be overridden | Can be overridden |
| Supports method hiding | Supports runtime polymorphism |

## One-Line Interview Answer

**Static methods cannot be overridden because they belong to the class and are resolved at compile time, whereas overriding requires runtime polymorphism based on the actual object instance. Static methods are hidden, not overridden.**

---

<h1 id="what-is-dynamic-method-dispatch" style="text-decoration: underline;"> 5) What is Dynamic Method Dispatch?</h1>

**Dynamic Method Dispatch** is the mechanism by which a call to an **overridden method** is resolved at **runtime** rather than at compile time.

It enables **runtime polymorphism**, where a superclass reference variable can refer to a subclass object, and the method that gets executed is determined by the actual object type.

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
        Animal animal = new Dog(); // Upcasting
        animal.sound();
    }
}
```

### Output

```text
Dog barks
```

## How It Works

In the statement:

```java
Animal animal = new Dog();
```

- The reference type is `Animal`.
- The actual object type is `Dog`.

When:

```java
animal.sound();
```

is executed, the JVM checks the actual object type (`Dog`) at runtime and invokes:

```java
Dog.sound();
```

This runtime decision-making process is called **Dynamic Method Dispatch**.

## Key Points

- Supports **Runtime Polymorphism**.
- Applicable only to **overridden instance methods**.
- Method call is resolved at **runtime**.
- Based on the **actual object type**, not the reference type.
- Static, private, and final methods do not participate in Dynamic Method Dispatch.

## Real-World Example

```java
List<String> list = new ArrayList<>();
list.add("Java");
```

Although the reference type is `List`, the actual object is `ArrayList`. The JVM invokes the implementation provided by `ArrayList` at runtime.

## Dynamic Method Dispatch vs Static Binding

| Dynamic Method Dispatch | Static Binding |
|------------------------|----------------|
| Runtime decision | Compile-time decision |
| Uses overridden methods | Uses static, private, final methods |
| Supports polymorphism | Does not support polymorphism |
| Based on object type | Based on reference type |

## One-Line Interview Answer

**Dynamic Method Dispatch is the JVM mechanism that resolves calls to overridden methods at runtime based on the actual object type, enabling runtime polymorphism in Java.**

---

<h1 id="what-is-java-classpath" style="text-decoration: underline;">6) What is Java Classpath?</h1>

**Classpath** is a parameter used by the Java Virtual Machine (JVM) and Java compiler (`javac`) to locate and load **compiled `.class` files**, **JAR files**, and other resources required by a Java application.

In simple terms, the classpath tells Java **where to look for classes and libraries**.

## Why is Classpath Needed?

When a Java program uses a class, the JVM must know where that class is located.

For example:

```java
import com.company.service.UserService;
```

The JVM searches the configured classpath to find:

```text
com/company/service/UserService.class
```

If the class is not found, Java throws:

```text
java.lang.ClassNotFoundException
```

or

```text
java.lang.NoClassDefFoundError
```

## Setting Classpath

### Using Command Line

#### Windows

```bash
java -cp .;lib/* Main
```

#### Linux/Mac

```bash
java -cp .:lib/* Main
```

Where:

- `.` = Current directory
- `lib/*` = All JAR files inside the `lib` folder

## Example

Project Structure:

```text
project/
│
├── Main.class
└── lib/
    └── mysql-connector.jar
```

Run the application:

```bash
java -cp .:lib/mysql-connector.jar Main
```

The JVM can now locate both:

- `Main.class`
- `mysql-connector.jar`

## Ways to Configure Classpath

### 1. Command Line

```bash
java -cp classes;lib/*
```

### 2. Environment Variable

#### Windows

```bash
set CLASSPATH=.;C:\libs\*
```

#### Linux/Mac

```bash
export CLASSPATH=.:/libs/*
```

### 3. Manifest File in JAR

```text
Class-Path: lib/mysql.jar lib/log4j.jar
```

### 4. Build Tools

Modern tools manage classpaths automatically:

- Maven
- Gradle
- Spring Boot

Example Maven dependency:

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

## Classpath vs PATH

| Classpath | PATH |
|------------|------|
| Used by JVM to find classes and JARs | Used by OS to find executables |
| Java-specific | Operating System specific |
| Contains `.class` and `.jar` locations | Contains executable locations |
| Example: `lib/mysql.jar` | Example: `C:\Java\bin` |

## Common Errors

### ClassNotFoundException

Occurs when JVM cannot find a class during runtime.

```text
java.lang.ClassNotFoundException
```

### NoClassDefFoundError

Occurs when a class was available during compilation but is missing at runtime.

```text
java.lang.NoClassDefFoundError
```

## Java 9+ Module System

Starting with Java 9, the **Module Path** was introduced as an alternative to the traditional Classpath for modular applications.

```bash
java --module-path mods
```

However, Classpath is still widely used in most Java applications.

## Key Interview Points

- Classpath specifies where Java should search for classes and JAR files.
- Used by both `javac` and JVM.
- Includes directories, JAR files, and resource files.
- Incorrect classpath configuration leads to `ClassNotFoundException` and `NoClassDefFoundError`.
- Build tools like Maven and Gradle manage classpaths automatically.

## One-Line Interview Answer

**Classpath is a JVM and compiler setting that specifies the locations of `.class` files, JAR files, and resources required for compiling and running a Java application.**

---

<h1 id="what-does-the-volatile-keyword-do" style="text-decoration: underline;">7) What does the `volatile` keyword do?</h1>

The `volatile` keyword is used to indicate that a variable's value may be modified by multiple threads.

It ensures that:

1. **Visibility** – Changes made by one thread are immediately visible to all other threads.
2. **Ordering** – Prevents certain instruction reordering by the JVM and CPU.

However, `volatile` **does not provide atomicity**.

## Why Do We Need `volatile`?

In a multithreaded environment, each thread may keep a local copy of variables in its CPU cache.

Without `volatile`:

```text
Thread A updates a variable
        ↓
Main Memory
        ↓
Thread B may still read an old cached value
```

With `volatile`:

```text
Thread A updates a variable
        ↓
Main Memory
        ↓
Thread B immediately sees the latest value
```

## Example

### Without `volatile`

```java
class SharedData {
    boolean running = true;
}

public class VolatileDemo {
    public static void main(String[] args) {

        SharedData data = new SharedData();

        Thread t1 = new Thread(() -> {
            while (data.running) {
                // Busy waiting
            }
            System.out.println("Stopped");
        });

        Thread t2 = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
            }
            data.running = false;
        });

        t1.start();
        t2.start();
    }
}
```

### Problem

Thread `t1` may never see the updated value because it can keep reading a cached copy.

### Solution

```java
class SharedData {
    volatile boolean running = true;
}
```

Now, when Thread `t2` updates `running`, Thread `t1` immediately sees the change.

## What `volatile` Guarantees

### 1. Visibility Guarantee

```java
volatile boolean flag;
```

If one thread writes:

```java
flag = true;
```

all other threads immediately see:

```java
flag == true
```

### 2. Happens-Before Relationship

A write to a volatile variable happens-before every subsequent read of that variable.

```java
volatile boolean ready = false;
```

```java
ready = true;   // Write
```

```java
if (ready) {    // Read
    // Guaranteed to see latest value
}
```

### 3. Prevents Reordering

The JVM and CPU cannot reorder memory operations around a volatile variable in a way that would break visibility guarantees.

## What `volatile` Does NOT Guarantee

### No Atomicity

Consider:

```java
volatile int count = 0;

count++;
```

The operation is actually:

```java
Read count
Increment
Write count
```

Multiple threads can interfere between these steps.

Therefore:

```java
count++;
```

is **not thread-safe**, even if `count` is volatile.

### Incorrect

```java
volatile int count = 0;

public void increment() {
    count++;
}
```

### Correct

```java
AtomicInteger count = new AtomicInteger();

count.incrementAndGet();
```

or

```java
synchronized void increment() {
    count++;
}
```

## `volatile` vs `synchronized`

| volatile | synchronized |
|-----------|-------------|
| Provides visibility | Provides visibility + atomicity |
| Lightweight | Heavier due to locking |
| No thread blocking | Threads may block |
| No mutual exclusion | Provides mutual exclusion |
| Good for status flags | Good for critical sections |

## Common Use Cases

### 1. Shutdown Flag

```java
volatile boolean stop = false;
```

### 2. Configuration Refresh

```java
volatile String configValue;
```

### 3. Singleton with Double-Checked Locking

```java
private static volatile Singleton instance;
```

```java
public static Singleton getInstance() {
    if (instance == null) {
        synchronized (Singleton.class) {
            if (instance == null) {
                instance = new Singleton();
            }
        }
    }
    return instance;
}
```

## Memory Visibility Example

```java
class Example {
    private volatile boolean flag = false;

    public void writer() {
        flag = true;
    }

    public void reader() {
        if (flag) {
            System.out.println("Updated");
        }
    }
}
```

The reader thread is guaranteed to see the latest value of `flag`.

## Key Interview Points

- `volatile` ensures visibility of changes across threads.
- Prevents instruction reordering around the variable.
- Does not provide atomicity.
- Suitable for flags, status indicators, and configuration values.
- Cannot replace `synchronized` when multiple operations must execute atomically.

## One-Line Interview Answer

**The `volatile` keyword ensures that changes made to a variable by one thread are immediately visible to all other threads and prevents instruction reordering, but it does not provide atomicity or thread synchronization.**

---

<h1 id="when-does-finally-not-execute" style="text-decoration: underline;">8) When does `finally` not execute?</h1>

The `finally` block is designed to execute regardless of whether an exception occurs or not. It is commonly used for resource cleanup such as closing files, database connections, and streams.

However, there are a few exceptional situations where the `finally` block may **not execute**.

## Normal Behavior

```java
try {
    System.out.println("Inside try");
} finally {
    System.out.println("Inside finally");
}
```

### Output

```text
Inside try
Inside finally
```

The `finally` block executes even if:

- An exception occurs
- A `return` statement is executed
- A `break` or `continue` statement is used

---

## Case 1: `System.exit()` is Called

If the JVM is explicitly terminated using `System.exit()`, the `finally` block will not execute.

```java
public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try");
            System.exit(0);
        } finally {
            System.out.println("Inside finally");
        }
    }
}
```

### Output

```text
Inside try
```

The JVM shuts down immediately.

---

## Case 2: JVM Crash or Forced Termination

If the JVM crashes due to:

- Native code failure
- JVM internal error
- Operating system crash
- Forceful process termination (`kill -9` on Linux)

the `finally` block may never execute.

```text
JVM Crash
   ↓
Program Ends Immediately
   ↓
finally Not Executed
```

---

## Case 3: Power Failure / System Shutdown

If the machine loses power or the operating system shuts down unexpectedly before reaching the `finally` block, it cannot execute.

```text
Power Failure
   ↓
Application Stops
   ↓
finally Skipped
```

---

## Case 4: Infinite Loop Before Reaching `finally`

If control never exits the `try` block, the `finally` block is never reached.

```java
try {
    while (true) {
        // Infinite loop
    }
} finally {
    System.out.println("finally");
}
```

### Output

```text
(No Output)
```

The loop never ends, so execution never reaches `finally`.

---

## `finally` Executes Even with `return`

Many interviewers ask this question.

```java
public int test() {
    try {
        return 10;
    } finally {
        System.out.println("finally");
    }
}
```

### Output

```text
finally
```

The `finally` block executes before the method actually returns.

---

## `finally` Executes Even with Exception

```java
try {
    int x = 10 / 0;
} finally {
    System.out.println("finally");
}
```

### Output

```text
finally
Exception in thread "main" java.lang.ArithmeticException
```

The exception is propagated only after the `finally` block completes.

---

## Common Interview Trick

```java
try {
    return 10;
} finally {
    return 20;
}
```

### Output

```text
20
```

The `finally` return overrides the `try` return.

**Best Practice:** Avoid returning from a `finally` block.

---

## Summary Table

| Scenario | Does `finally` Execute? |
|-----------|------------------------|
| Normal execution | ✅ Yes |
| Exception occurs | ✅ Yes |
| `return` statement | ✅ Yes |
| `break` / `continue` | ✅ Yes |
| `System.exit()` | ❌ No |
| JVM crash | ❌ No |
| Forceful process kill | ❌ No |
| Power failure | ❌ No |
| Infinite loop in `try` | ❌ No (never reached) |

---

## Key Interview Points

- `finally` almost always executes.
- Used for resource cleanup.
- Executes even when exceptions occur or methods return.
- Does **not** execute if the JVM terminates abruptly.
- `System.exit()` is the most commonly cited interview answer.

## One-Line Interview Answer

**The `finally` block executes in almost all situations, except when the JVM terminates abruptly (e.g., `System.exit()`, JVM crash, forceful process termination, power failure) or when control never leaves the `try` block, such as an infinite loop.**

---

<h1 id="stringbuffer-vs-stringbuilder" style="text-decoration: underline;"> 9) StringBuffer vs StringBuilder</h1>
# StringBuffer vs StringBuilder in Java

Both **StringBuffer** and **StringBuilder** are mutable classes used to create and modify strings without creating new objects repeatedly.

The main difference is **thread safety**.

## Why Do We Need Them?

`String` objects are immutable.

```java
String str = "Java";
str += " Programming";
```

A new String object is created every time the string changes, which impacts performance.

To avoid this, Java provides:

- StringBuffer
- StringBuilder

Both allow modifying the same object.

---

## StringBuffer Example

```java
StringBuffer sb = new StringBuffer("Java");
sb.append(" Programming");

System.out.println(sb);
```

### Output

```text
Java Programming
```

---

## StringBuilder Example

```java
StringBuilder sb = new StringBuilder("Java");
sb.append(" Programming");

System.out.println(sb);
```

### Output

```text
Java Programming
```

---

## Key Difference: Synchronization

### StringBuffer

All major methods are synchronized.

```java
public synchronized StringBuffer append(String str)
```

This makes it:

- Thread-safe
- Slower due to locking overhead

### StringBuilder

Methods are not synchronized.

```java
public StringBuilder append(String str)
```

This makes it:

- Not thread-safe
- Faster

---

## Comparison Table

| Feature | StringBuffer | StringBuilder |
|----------|-------------|--------------|
| Introduced In | Java 1.0 | Java 5 |
| Thread Safe | ✅ Yes | ❌ No |
| Synchronized | ✅ Yes | ❌ No |
| Performance | Slower | Faster |
| Suitable For | Multi-threaded applications | Single-threaded applications |
| Mutable | ✅ Yes | ✅ Yes |
| Inheritance | Extends AbstractStringBuilder | Extends AbstractStringBuilder |

---

## Performance Example

```java
StringBuffer buffer = new StringBuffer();

for(int i = 0; i < 100000; i++) {
    buffer.append("A");
}
```

```java
StringBuilder builder = new StringBuilder();

for(int i = 0; i < 100000; i++) {
    builder.append("A");
}
```

Typically:

```text
StringBuilder > StringBuffer
```

because synchronization adds extra overhead.

---

## Internal Hierarchy

```text
Object
   │
   └── AbstractStringBuilder
            │
      ┌─────┴─────┐
      │           │
StringBuffer  StringBuilder
```

Both share most of their implementation through `AbstractStringBuilder`.

---

## Common Methods

```java
append()
insert()
delete()
replace()
reverse()
length()
capacity()
```

Example:

```java
StringBuilder sb = new StringBuilder("Java");

sb.append(" 8");
sb.insert(4, " SE");
sb.reverse();
```

---

## When to Use Which?

### Use StringBuilder

When:

- Single-threaded application
- Local method variables
- Better performance is required

Example:

```java
StringBuilder query = new StringBuilder();
query.append("SELECT * FROM EMPLOYEE");
```

### Use StringBuffer

When:

- Multiple threads access the same object
- Thread safety is required

Example:

```java
StringBuffer sharedBuffer = new StringBuffer();
```

---

## Interview Trick Question

### Is StringBuilder Faster Than StringBuffer?

**Yes.**

Because StringBuilder does not perform synchronization, it generally provides better performance.

---

## String vs StringBuffer vs StringBuilder

| Feature | String | StringBuffer | StringBuilder |
|-----------|---------|-------------|--------------|
| Mutable | ❌ No | ✅ Yes | ✅ Yes |
| Thread Safe | ✅ Yes (Immutable) | ✅ Yes | ❌ No |
| Performance | Slow for modifications | Medium | Fastest |
| Memory Usage | Higher for repeated changes | Lower | Lower |
| Use Case | Fixed text | Multi-threaded modifications | Single-threaded modifications |

---

## Key Interview Points

- Both StringBuffer and StringBuilder are mutable.
- StringBuffer is synchronized and thread-safe.
- StringBuilder is not synchronized and faster.
- StringBuilder was introduced in Java 5 to improve performance.
- Prefer StringBuilder unless thread safety is specifically required.

## One-Line Interview Answer

**StringBuffer is a thread-safe, synchronized mutable string class, whereas StringBuilder is a non-synchronized mutable string class that provides better performance and is preferred in single-threaded environments.**

---

<h1 id="vector-vs-arraylist" style="text-decoration: underline;"> 10) Vector vs ArrayList </h1>
# Vector vs ArrayList in Java

Both **Vector** and **ArrayList** are dynamic array implementations that store elements in insertion order and allow duplicate values.

The primary difference is **thread safety and synchronization**.

---

## Similarities

Both:

- Implement the `List` interface
- Maintain insertion order
- Allow duplicate elements
- Allow random access using indexes
- Store heterogeneous objects (if generics are not used)
- Automatically grow when capacity is exceeded

Example:

```java
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Spring");
```

```java
List<String> vector = new Vector<>();
vector.add("Java");
vector.add("Spring");
```

---

## ArrayList Example

```java
ArrayList<String> list = new ArrayList<>();

list.add("Java");
list.add("Spring");

System.out.println(list);
```

### Output

```text
[Java, Spring]
```

---

## Vector Example

```java
Vector<String> vector = new Vector<>();

vector.add("Java");
vector.add("Spring");

System.out.println(vector);
```

### Output

```text
[Java, Spring]
```

---

## Key Difference: Synchronization

### ArrayList

Not synchronized.

```java
ArrayList<String> list = new ArrayList<>();
```

- Faster
- Not thread-safe
- Preferred in modern applications

---

### Vector

Synchronized.

```java
Vector<String> vector = new Vector<>();
```

- Thread-safe
- Slower due to locking overhead
- Legacy collection class

---

## Comparison Table

| Feature | ArrayList | Vector |
|----------|-----------|---------|
| Introduced In | Java 1.2 | Java 1.0 |
| Thread Safe | ❌ No | ✅ Yes |
| Synchronized | ❌ No | ✅ Yes |
| Performance | Faster | Slower |
| Part of Collection Framework | ✅ Yes | Originally Legacy, later adapted |
| Capacity Growth | 50% increase | Doubles by default |
| Recommended Today | ✅ Yes | ❌ Rarely |
| Iterator Support | Iterator, ListIterator | Iterator, ListIterator, Enumeration |

---

## Capacity Growth

### ArrayList

When full, capacity increases approximately by:

```text
New Capacity = Old Capacity + (Old Capacity / 2)
```

Example:

```text
10 → 15 → 22 → 33 ...
```

---

### Vector

When full, capacity typically doubles.

```text
10 → 20 → 40 → 80 ...
```

Or a custom increment can be specified:

```java
Vector<Integer> vector = new Vector<>(10, 5);
```

Growth:

```text
10 → 15 → 20 → 25 ...
```

---

## Iteration Mechanisms

### ArrayList

```java
Iterator<String> itr = list.iterator();
```

### Vector

Supports both:

```java
Iterator<String> itr = vector.iterator();
```

and legacy:

```java
Enumeration<String> e = vector.elements();
```

---

## Thread Safety Example

### ArrayList (Not Safe)

```java
ArrayList<Integer> list = new ArrayList<>();
```

Multiple threads modifying the list can cause:

```text
ConcurrentModificationException
```

or inconsistent data.

---

### Vector (Safe)

```java
Vector<Integer> vector = new Vector<>();
```

Methods are synchronized:

```java
public synchronized boolean add(E e)
```

Only one thread can modify the Vector at a time.

---

## Modern Alternative

Instead of using Vector:

```java
List<String> list =
    Collections.synchronizedList(new ArrayList<>());
```

Or:

```java
CopyOnWriteArrayList<String> list =
    new CopyOnWriteArrayList<>();
```

These are preferred in modern Java applications.

---

## Internal Hierarchy

```text
Iterable
   │
Collection
   │
List
   │
 ┌───────┴────────┐
 │                │
ArrayList      Vector
```

---

## Performance

For single-threaded applications:

```text
ArrayList > Vector
```

because Vector synchronizes every operation.

---

## Interview Trick Question

### Is Vector Deprecated?

**No.**

Vector is not deprecated, but it is considered a **legacy collection** and is rarely used in modern applications.

---

## ArrayList vs Vector vs LinkedList

| Feature | ArrayList | Vector | LinkedList |
|----------|-----------|---------|------------|
| Thread Safe | ❌ No | ✅ Yes | ❌ No |
| Random Access | Fast | Fast | Slow |
| Insert/Delete Middle | Slow | Slow | Fast |
| Performance | Best | Slower | Moderate |
| Modern Usage | Most Common | Rare | Specific Use Cases |

---

## Key Interview Points

- Both are dynamic arrays and maintain insertion order.
- ArrayList is not synchronized and offers better performance.
- Vector is synchronized and thread-safe.
- Vector is a legacy class introduced before the Collections Framework.
- ArrayList is the preferred choice in modern Java applications.
- Vector supports both Iterator and Enumeration.

## One-Line Interview Answer

**ArrayList is a non-synchronized, high-performance dynamic array implementation, whereas Vector is a synchronized, thread-safe legacy collection class with additional synchronization overhead.**

---

<h1 id="why-is-string-immutable" style="text-decoration: underline;"> 11) Why is String immutable?</h1>
# Why is String Immutable in Java?

A **String** in Java is immutable, which means once a String object is created, its value cannot be changed.

Any operation that appears to modify a String actually creates a **new String object**.

## Example

```java
String str = "Java";

str.concat(" Programming");

System.out.println(str);
```

### Output

```text
Java
```

The original String remains unchanged.

To store the modified value:

```java
str = str.concat(" Programming");
```

Output:

```text
Java Programming
```

---

## How is String Made Immutable?

The `String` class is declared as:

```java
public final class String
```

Key reasons:

- `final` class → Cannot be subclassed.
- Internal value storage is private.
- No setter methods are provided.
- Any modification creates a new object.

Simplified implementation:

```java
public final class String {
    private final char[] value;
}
```

---

# Why Did Java Make String Immutable?

This is one of the most frequently asked Java interview questions.

There are several important reasons.

---

## 1. Security

Strings are widely used for:

- Database URLs
- File paths
- Network connections
- Usernames and passwords
- Class loading

Example:

```java
String path = "/secure/config.txt";
```

If Strings were mutable:

```java
path = "/hack/config.txt";
```

A malicious change could compromise application security.

Immutability prevents such modifications.

---

## 2. String Constant Pool Optimization

Java maintains a special memory area called the **String Pool**.

```java
String s1 = "Java";
String s2 = "Java";
```

Both references point to the same object:

```text
s1 ----\
         --> "Java"
s2 ----/
```

This memory optimization is only possible because Strings are immutable.

If one reference could modify the value:

```java
s1 = "Python";
```

it would affect all references sharing the same object.

---

## 3. Thread Safety

Immutable objects are naturally thread-safe.

```java
String message = "Hello";
```

Multiple threads can safely access the same String object without synchronization.

```java
Thread-1 → Reads "Hello"
Thread-2 → Reads "Hello"
Thread-3 → Reads "Hello"
```

No thread can modify the value.

---

## 4. HashCode Caching

Strings are commonly used as keys in:

```java
HashMap
HashSet
Hashtable
```

Example:

```java
Map<String, String> map = new HashMap<>();
```

Since Strings are immutable, their hash code never changes.

Java can cache the hash code:

```java
private int hash;
```

This improves performance.

If Strings were mutable:

```java
String key = "user";
```

and later changed to:

```java
"user123"
```

the object could no longer be found in the HashMap.

---

## 5. Class Loading Safety

Class names are represented as Strings.

```java
Class.forName("com.example.UserService");
```

If Strings were mutable, attackers could alter class names and load unintended classes.

Immutability prevents this risk.

---

## Memory Example

```java
String s1 = "Java";
String s2 = s1.concat(" 8");
```

Memory:

```text
s1 --> "Java"

s2 --> "Java 8"
```

The original object remains unchanged.

---

## Mutable Alternative

If frequent modifications are required:

```java
StringBuilder sb = new StringBuilder("Java");

sb.append(" 8");
```

Output:

```text
Java 8
```

`StringBuilder` and `StringBuffer` are mutable.

---

## String vs StringBuilder

| Feature | String | StringBuilder |
|----------|---------|--------------|
| Mutable | ❌ No | ✅ Yes |
| Thread Safe | ✅ Yes (Immutable) | ❌ No |
| Performance for Modifications | Slower | Faster |
| Memory Optimization | String Pool | No String Pool |
| HashCode Stability | Fixed | Changes |

---

## Interview Trick Question

### Does `concat()` Modify the Existing String?

```java
String s = "Java";
s.concat(" 8");
```

**No.**

A new String object is created, but the reference `s` still points to the original String.

Output:

```text
Java
```

---

## Key Interview Points

- String is immutable because its value cannot be changed after creation.
- Immutability provides security, thread safety, and memory optimization.
- Enables String Pool sharing.
- Allows hash code caching for better performance.
- Makes Strings safe for use as HashMap keys.
- Any modification creates a new String object.

## One-Line Interview Answer

**String is immutable in Java to provide security, thread safety, String Pool optimization, hash code caching, and reliable behavior when used as keys in collections such as HashMap.**

---

<h1 id="hashmap-vs-hashset" style="text-decoration: underline;"> 12) HashMap vs HashSet</h1>
# HashMap vs HashSet in Java

Both **HashMap** and **HashSet** are part of the Java Collections Framework and use a hash-based data structure internally for fast storage and retrieval.

The main difference is:

- **HashMap stores key-value pairs**
- **HashSet stores only unique values**

---

## HashMap Overview

A `HashMap` stores data in the form of:

```text
Key → Value
```

Example:

```java
Map<Integer, String> map = new HashMap<>();

map.put(101, "John");
map.put(102, "David");
map.put(103, "Smith");
```

### Output

```text
101 → John
102 → David
103 → Smith
```

### Characteristics

- Stores key-value pairs
- Keys must be unique
- Values can be duplicated
- Allows one null key
- Allows multiple null values
- Unordered

---

## HashSet Overview

A `HashSet` stores only unique elements.

Example:

```java
Set<String> set = new HashSet<>();

set.add("Java");
set.add("Spring");
set.add("Java");
```

### Output

```text
[Java, Spring]
```

Duplicate values are automatically ignored.

### Characteristics

- Stores only values
- No duplicate elements
- Allows one null value
- Unordered

---

## Comparison Table

| Feature | HashMap | HashSet |
|----------|----------|----------|
| Stores | Key-Value Pairs | Unique Values |
| Duplicate Keys | ❌ Not Allowed | N/A |
| Duplicate Values | ✅ Allowed | ❌ Not Allowed |
| Null Handling | One null key, multiple null values | One null value |
| Interface | Map | Set |
| Data Retrieval | By Key | By Value Search |
| Internal Structure | Hash Table | Uses HashMap Internally |
| Ordering | Not Guaranteed | Not Guaranteed |

---

## Internal Working

### HashMap

```java
Map<Integer, String> map = new HashMap<>();

map.put(1, "Java");
```

Internally:

```text
1 → Java
```

Stored as:

```java
Node<K, V>
```

containing:

```text
hash
key
value
next
```

---

### HashSet

```java
Set<String> set = new HashSet<>();

set.add("Java");
```

Internally, HashSet uses a HashMap:

```java
private transient HashMap<E,Object> map;
```

When:

```java
set.add("Java");
```

Internally:

```java
map.put("Java", PRESENT);
```

Where:

```java
private static final Object PRESENT = new Object();
```

Internal representation:

```text
Java → PRESENT
Spring → PRESENT
```

---

## Example: Duplicate Handling

### HashMap

```java
Map<Integer, String> map = new HashMap<>();

map.put(1, "Java");
map.put(1, "Spring");
```

### Output

```text
{1=Spring}
```

The new value replaces the old value because keys must be unique.

---

### HashSet

```java
Set<String> set = new HashSet<>();

set.add("Java");
set.add("Java");
```

### Output

```text
[Java]
```

Duplicate values are ignored.

---

## Time Complexity

| Operation | HashMap | HashSet |
|------------|---------|---------|
| Insert | O(1) Average | O(1) Average |
| Search | O(1) Average | O(1) Average |
| Delete | O(1) Average | O(1) Average |
| Worst Case | O(n) | O(n) |

Since Java 8, heavy collisions use a Red-Black Tree, improving worst-case performance to:

```text
O(log n)
```

for affected buckets.

---

## Iteration Example

### HashMap

```java
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() +
                       " : " +
                       entry.getValue());
}
```

### HashSet

```java
for (String value : set) {
    System.out.println(value);
}
```

---

## When to Use HashMap?

Use HashMap when:

- Data must be stored as key-value pairs
- Fast lookup by key is needed
- Caching is required

Example:

```java
Employee ID → Employee Object
```

```java
Map<Integer, Employee> employees;
```

---

## When to Use HashSet?

Use HashSet when:

- Only unique values are required
- Duplicate removal is needed
- Fast membership checking is required

Example:

```java
Set<String> uniqueEmails;
```

---

## Interview Trick Question

### Does HashSet Use HashMap Internally?

**Yes.**

Internally:

```java
private transient HashMap<E,Object> map;
```

Each element in a HashSet is stored as a key in an internal HashMap with a dummy value (`PRESENT`).

---

## HashMap vs HashSet vs Hashtable

| Feature | HashMap | HashSet | Hashtable |
|----------|----------|----------|----------|
| Stores | Key-Value | Values Only | Key-Value |
| Thread Safe | ❌ No | ❌ No | ✅ Yes |
| Null Key | ✅ One | N/A | ❌ No |
| Null Value | ✅ Yes | ✅ One Null Element | ❌ No |
| Performance | Fast | Fast | Slower |

---

## Key Interview Points

- HashMap stores key-value pairs; HashSet stores only unique values.
- HashMap allows duplicate values but unique keys.
- HashSet does not allow duplicate elements.
- HashSet is internally backed by a HashMap.
- Both provide O(1) average-time complexity for insert, search, and delete operations.
- Neither guarantees insertion order.

## One-Line Interview Answer

**HashMap stores data as unique keys and associated values, whereas HashSet stores only unique elements and internally uses a HashMap to maintain uniqueness.**
---

<h1 id="producer-consumer-problem-benefits" style="text-decoration: underline;"> 13) Producer–Consumer problem & benefits </h1>
# Producer–Consumer Problem & Benefits in Java

The **Producer–Consumer Problem** is a classic multithreading problem where:

- **Producer** threads generate data and place it into a shared buffer (queue).
- **Consumer** threads take data from the shared buffer and process it.

The challenge is to ensure that producers and consumers work safely without causing data inconsistency, race conditions, or buffer overflow/underflow.

---

## Real-Life Example

Imagine an online food delivery system:

```text
Restaurant (Producer)
        ↓
     Order Queue
        ↓
Delivery Partner (Consumer)
```

- Restaurant prepares orders and adds them to the queue.
- Delivery partners pick orders from the queue.
- If the queue is full, the restaurant must wait.
- If the queue is empty, delivery partners must wait.

---

## Problem Statement

Consider a shared buffer with capacity 5.

```text
Buffer Capacity = 5
```

### Scenario 1: Buffer Full

```text
[1][2][3][4][5]
```

Producer tries to add:

```text
[1][2][3][4][5][6]
```

❌ Not allowed.

Producer must wait until a consumer removes an item.

---

### Scenario 2: Buffer Empty

```text
[]
```

Consumer tries to remove an item.

❌ Not allowed.

Consumer must wait until a producer adds data.

---

## Solution Using `wait()` and `notify()`

### Shared Buffer

```java
class Buffer {

    private Queue<Integer> queue = new LinkedList<>();
    private final int CAPACITY = 5;

    public synchronized void produce(int value)
            throws InterruptedException {

        while (queue.size() == CAPACITY) {
            wait();
        }

        queue.add(value);
        System.out.println("Produced: " + value);

        notifyAll();
    }

    public synchronized int consume()
            throws InterruptedException {

        while (queue.isEmpty()) {
            wait();
        }

        int value = queue.poll();
        System.out.println("Consumed: " + value);

        notifyAll();

        return value;
    }
}
```

---

## Producer Thread

```java
class Producer implements Runnable {

    private Buffer buffer;

    Producer(Buffer buffer) {
        this.buffer = buffer;
    }

    @Override
    public void run() {
        try {
            int value = 1;

            while (true) {
                buffer.produce(value++);
                Thread.sleep(500);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## Consumer Thread

```java
class Consumer implements Runnable {

    private Buffer buffer;

    Consumer(Buffer buffer) {
        this.buffer = buffer;
    }

    @Override
    public void run() {
        try {
            while (true) {
                buffer.consume();
                Thread.sleep(1000);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

## Main Class

```java
public class ProducerConsumerDemo {

    public static void main(String[] args) {

        Buffer buffer = new Buffer();

        new Thread(new Producer(buffer)).start();
        new Thread(new Consumer(buffer)).start();
    }
}
```

---

## Modern Java Solution

Instead of manually using:

```java
wait()
notify()
notifyAll()
```

Java provides `BlockingQueue`.

### Example

```java
BlockingQueue<Integer> queue =
        new ArrayBlockingQueue<>(5);
```

Producer:

```java
queue.put(10);
```

Consumer:

```java
int value = queue.take();
```

The queue automatically handles synchronization.

---

## Workflow Diagram

```text
            Producer
                │
                ▼
        ┌─────────────┐
        │ Shared Queue│
        └─────────────┘
                ▲
                │
            Consumer
```

### Rules

```text
Queue Full  → Producer Waits
Queue Empty → Consumer Waits
```

---

## Benefits of Producer–Consumer Pattern

### 1. Decouples Components

Producer and consumer work independently.

```text
Producer → Queue → Consumer
```

Neither needs to know the internal implementation of the other.

---

### 2. Improves Throughput

Multiple producers and consumers can work concurrently.

```text
Producer-1
Producer-2
Producer-3
     ↓
 Shared Queue
     ↓
Consumer-1
Consumer-2
```

This improves overall system performance.

---

### 3. Better Resource Utilization

Threads remain busy processing tasks instead of waiting unnecessarily.

---

### 4. Handles Traffic Spikes

During sudden load increases:

```text
Requests
   ↓
 Queue
   ↓
 Processing
```

The queue acts as a buffer and prevents system overload.

---

### 5. Scalability

Additional producers or consumers can be added easily.

```text
1 Producer → 5 Consumers
5 Producers → 10 Consumers
```

without changing core business logic.

---

### 6. Prevents Data Loss

A bounded queue ensures:

- No buffer overflow
- No buffer underflow
- Controlled data processing

---

## Real-World Applications

### Message Queues

```text
Apache Kafka
RabbitMQ
ActiveMQ
Amazon SQS
```

---

### Web Applications

```text
HTTP Request
      ↓
    Queue
      ↓
 Background Processing
```

---

### Logging Systems

```text
Application
      ↓
 Logging Queue
      ↓
 Log Writer Thread
```

---

### Order Processing Systems

```text
Customer Orders
       ↓
      Queue
       ↓
 Payment / Shipping Services
```

---

## Interview Questions

### Why use `while` instead of `if` with `wait()`?

```java
while(queue.isEmpty()) {
    wait();
}
```

Because after waking up, the condition must be checked again to handle:

- Spurious wakeups
- Multiple waiting threads

---

### Which Java class is preferred today?

```java
BlockingQueue
```

because it provides built-in synchronization and is simpler than using `wait()` and `notify()` manually.

---

## Key Interview Points

- Producer creates data; Consumer processes data.
- Shared buffer/queue is used for communication.
- Synchronization prevents race conditions.
- `wait()` is used when buffer is full or empty.
- `notify()`/`notifyAll()` wakes waiting threads.
- `BlockingQueue` is the preferred modern solution.
- Widely used in messaging systems, order processing, logging, and task scheduling.

## One-Line Interview Answer

**The Producer–Consumer Problem is a synchronization pattern where producer threads add data to a shared buffer and consumer threads remove data from it, ensuring safe, efficient, and scalable communication between concurrent threads.**
-

---

<h1 id="how-to-create-an-immutable-class" style="text-decoration: underline;"> 14) How to create an immutable class?</h1>
# How to Create an Immutable Class in Java?

An **immutable class** is a class whose objects cannot be modified after they are created.

Once an object is initialized, its state remains unchanged throughout its lifetime.

Examples of immutable classes in Java:

```java
String
Integer
Long
BigDecimal
LocalDate
```

---

# Rules to Create an Immutable Class

To make a class immutable:

### 1. Declare the Class as `final`

This prevents inheritance and method overriding.

```java
public final class Employee {
}
```

---

### 2. Make All Fields `private` and `final`

```java
private final int id;
private final String name;
```

This ensures:

- Fields cannot be accessed directly.
- Fields can be assigned only once.

---

### 3. Initialize Fields Through Constructor

```java
public Employee(int id, String name) {
    this.id = id;
    this.name = name;
}
```

---

### 4. Do Not Provide Setter Methods

❌ Avoid:

```java
public void setName(String name) {
    this.name = name;
}
```

Without setters, state cannot be modified.

---

### 5. Return Defensive Copies for Mutable Objects

If a field contains a mutable object like:

```java
Date
List
Map
Set
```

return a copy instead of the original object.

---

# Simple Immutable Class Example

```java
public final class Employee {

    private final int id;
    private final String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

### Usage

```java
Employee emp = new Employee(101, "John");

System.out.println(emp.getName());
```

Output:

```text
John
```

The object's state cannot be changed after creation.

---

# Immutable Class with Mutable Field

Consider:

```java
private final Date joiningDate;
```

`Date` is mutable.

### Wrong Implementation

```java
public Date getJoiningDate() {
    return joiningDate;
}
```

Problem:

```java
Date date = emp.getJoiningDate();

date.setTime(0);
```

The internal state of the object changes.

---

# Correct Implementation (Defensive Copy)

```java
import java.util.Date;

public final class Employee {

    private final int id;
    private final Date joiningDate;

    public Employee(int id, Date joiningDate) {
        this.id = id;

        this.joiningDate =
            new Date(joiningDate.getTime());
    }

    public int getId() {
        return id;
    }

    public Date getJoiningDate() {
        return new Date(joiningDate.getTime());
    }
}
```

---

# Why Defensive Copy?

Without defensive copying:

```text
Outside Code
      ↓
Modifies Returned Object
      ↓
Internal State Changes
```

With defensive copying:

```text
Outside Code
      ↓
Receives Copy
      ↓
Original Object Remains Safe
```

---

# Immutable List Example

### Wrong

```java
private final List<String> skills;

public List<String> getSkills() {
    return skills;
}
```

Client code can modify:

```java
emp.getSkills().add("Spring");
```

---

### Correct

```java
import java.util.Collections;

public List<String> getSkills() {
    return Collections.unmodifiableList(skills);
}
```

or

```java
return new ArrayList<>(skills);
```

---

# Benefits of Immutable Classes

## 1. Thread Safety

Immutable objects are naturally thread-safe.

```java
Employee emp = new Employee(101, "John");
```

Multiple threads can access the object safely.

---

## 2. Simplicity

No synchronization required.

```text
No Locks
No Race Conditions
```

---

## 3. Security

Object state cannot be modified accidentally or maliciously.

---

## 4. Safe HashMap Keys

Immutable objects make excellent keys.

```java
Map<Employee, String> map = new HashMap<>();
```

Hash codes remain stable.

---

## 5. Easy Caching

Since state never changes:

```java
Cache
Pool
Singleton
```

implementations become simpler.

---

# Immutable Object Flow

```text
Create Object
      ↓
Initialize State
      ↓
No Further Changes Allowed
      ↓
Read Only Access
```

---

# Java Record (Java 16+)

Modern Java provides records that are inherently immutable.

```java
public record Employee(
        int id,
        String name) {
}
```

Usage:

```java
Employee emp =
    new Employee(101, "John");
```

Records automatically generate:

- Constructor
- Getters
- equals()
- hashCode()
- toString()

---

# Interview Trick Question

### Is `final` Enough to Make a Class Immutable?

❌ No.

```java
final class Employee {
    private List<String> skills;
}
```

If the list can still be modified, the class is not truly immutable.

You must also protect mutable fields using defensive copies.

---

# Immutable Class Checklist

✅ Class should be `final`

✅ Fields should be `private` and `final`

✅ No setter methods

✅ Initialize fields through constructor

✅ Return defensive copies for mutable fields

✅ Protect mutable collections

---

# Key Interview Points

- Immutable objects cannot change after creation.
- Declare the class as `final`.
- Make fields `private final`.
- Do not provide setters.
- Use defensive copies for mutable fields.
- Immutable objects are naturally thread-safe.
- String is a classic example of an immutable class.

## One-Line Interview Answer

**To create an immutable class in Java, make the class `final`, declare all fields as `private final`, initialize them through the constructor, provide only getter methods, and use defensive copies for any mutable objects or collections.**

---

<h1 id="fail-fast-vs-fail-safe-iterators" style="text-decoration: underline;"> 15) Fail-fast vs Fail-safe iterators </h1>
# Fail-Fast vs Fail-Safe Iterators in Java

When iterating over a collection, modifying the collection simultaneously can lead to unexpected behavior.

Java provides two types of iterator behaviors:

1. **Fail-Fast Iterators**
2. **Fail-Safe Iterators**

The key difference is how they react when the underlying collection is modified during iteration.

---

# Fail-Fast Iterator

A **Fail-Fast Iterator** immediately throws a:

```java
ConcurrentModificationException
```

if it detects that the collection has been structurally modified after the iterator was created.

Examples:

```java
ArrayList
HashMap
HashSet
LinkedList
TreeMap
TreeSet
```

---

## Example

```java
import java.util.*;

public class Test {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();

        list.add("Java");
        list.add("Spring");

        Iterator<String> itr = list.iterator();

        while (itr.hasNext()) {

            String value = itr.next();

            if (value.equals("Java")) {
                list.add("Hibernate");
            }
        }
    }
}
```

### Output

```text
Exception in thread "main"
java.util.ConcurrentModificationException
```

---

## How Fail-Fast Works Internally

Collections maintain a modification count:

```java
modCount
```

When an iterator is created:

```java
expectedModCount = modCount;
```

During iteration:

```java
if(expectedModCount != modCount)
    throw ConcurrentModificationException;
```

Any structural modification changes `modCount`.

---

## Structural Modifications

These modify collection size:

```java
add()
remove()
clear()
```

Example:

```java
list.add("Java");
list.remove("Java");
```

These trigger Fail-Fast behavior.

---

## Safe Removal Using Iterator

Allowed:

```java
Iterator<String> itr = list.iterator();

while (itr.hasNext()) {

    String value = itr.next();

    if (value.equals("Java")) {
        itr.remove();
    }
}
```

No exception occurs because the iterator itself performs the modification.

---

# Fail-Safe Iterator

A **Fail-Safe Iterator** works on a copy (snapshot) of the collection rather than the original collection.

Therefore, modifications during iteration do not throw exceptions.

Examples:

```java
CopyOnWriteArrayList
ConcurrentHashMap
```

---

## Example

```java
import java.util.concurrent.CopyOnWriteArrayList;

public class Test {

    public static void main(String[] args) {

        CopyOnWriteArrayList<String> list =
                new CopyOnWriteArrayList<>();

        list.add("Java");
        list.add("Spring");

        for (String value : list) {

            if (value.equals("Java")) {
                list.add("Hibernate");
            }

            System.out.println(value);
        }

        System.out.println(list);
    }
}
```

### Output

```text
Java
Spring
[Java, Spring, Hibernate]
```

No exception occurs.

---

# How Fail-Safe Works

```text
Original Collection
        │
        ▼
 Create Snapshot Copy
        │
        ▼
 Iterator Reads Snapshot
```

Changes happen in the original collection.

The iterator continues reading from the snapshot.

---

# Comparison Table

| Feature | Fail-Fast | Fail-Safe |
|----------|-----------|------------|
| Works On | Original Collection | Copy/Snapshot |
| Concurrent Modification | ❌ Not Allowed | ✅ Allowed |
| Exception Thrown | ConcurrentModificationException | No Exception |
| Memory Usage | Lower | Higher |
| Performance | Faster | Slightly Slower |
| Thread Safety | Not Thread Safe | Generally Used in Concurrent Collections |
| Collection Changes Visible During Iteration | No | No (Iterator sees snapshot) |

---

# Examples of Each

## Fail-Fast Collections

```java
ArrayList
LinkedList
HashMap
HashSet
TreeMap
TreeSet
Vector
```

---

## Fail-Safe Collections

```java
CopyOnWriteArrayList
CopyOnWriteArraySet
ConcurrentHashMap
ConcurrentSkipListMap
```

---

# Visualization

## Fail-Fast

```text
ArrayList
    │
Iterator Created
    │
Collection Modified
    │
ConcurrentModificationException
```

---

## Fail-Safe

```text
CopyOnWriteArrayList
       │
 Snapshot Created
       │
Collection Modified
       │
Iterator Continues Normally
```

---

# Real-World Use Cases

## Fail-Fast

Used when:

- Concurrent modifications should be detected immediately.
- Single-threaded applications.
- Data consistency is critical.

Example:

```java
ArrayList
HashMap
```

---

## Fail-Safe

Used when:

- Multiple threads read and modify data simultaneously.
- High-read, low-write systems.

Example:

```java
CopyOnWriteArrayList
```

Common in:

- Caching systems
- Event listeners
- Configuration data
- Concurrent applications

---

# Interview Trick Question

### Does Fail-Fast Guarantee Detection of Every Modification?

❌ No.

The Java documentation states that Fail-Fast behavior is:

```text
Best Effort Basis
```

It tries to detect concurrent modifications but does not provide a guaranteed mechanism in all cases.

---

# Iterator vs Enumeration

| Feature | Iterator | Enumeration |
|----------|-----------|------------|
| Remove Support | ✅ Yes | ❌ No |
| Fail-Fast | ✅ Yes | ❌ No |
| Modern API | ✅ Yes | Legacy |

---

# Key Interview Points

- Fail-Fast iterators throw `ConcurrentModificationException` when the collection is modified during iteration.
- They work on the original collection.
- Fail-Safe iterators operate on a snapshot/copy of the collection.
- Fail-Safe iterators do not throw `ConcurrentModificationException`.
- `ArrayList` and `HashMap` use Fail-Fast iterators.
- `CopyOnWriteArrayList` and `ConcurrentHashMap` use Fail-Safe behavior.
- Fail-Safe iterators require additional memory because they maintain a copy.

## One-Line Interview Answer

**Fail-Fast iterators work on the original collection and throw `ConcurrentModificationException` if the collection is modified during iteration, whereas Fail-Safe iterators work on a snapshot of the collection and allow concurrent modifications without throwing exceptions.**

---

<h1 id="what-is-an-interface-features" style="text-decoration: underline;"> 16) What is an interface? Features?</h1>
# What is an Interface in Java?

An **Interface** is a blueprint of a class that defines a set of behaviors (methods) that implementing classes must provide.

It is used to achieve:

- Abstraction
- Multiple Inheritance
- Loose Coupling
- Polymorphism

An interface specifies **what a class should do**, not **how it should do it**.

---

# Syntax

```java
interface Vehicle {

    void start();

    void stop();
}
```

Implementation:

```java
class Car implements Vehicle {

    @Override
    public void start() {
        System.out.println("Car Started");
    }

    @Override
    public void stop() {
        System.out.println("Car Stopped");
    }
}
```

Usage:

```java
Vehicle vehicle = new Car();

vehicle.start();
vehicle.stop();
```

Output:

```text
Car Started
Car Stopped
```

---

# Key Features of Interface

## 1. Supports Abstraction

Interfaces hide implementation details and expose only behavior.

```java
interface Payment {
    void pay();
}
```

The user only knows:

```java
pay();
```

not how payment is processed internally.

---

## 2. Supports Multiple Inheritance

Java does not allow multiple inheritance with classes:

```java
class A {}
class B {}

// Not Allowed
class C extends A, B {}
```

But it allows multiple inheritance through interfaces:

```java
interface A {
    void methodA();
}

interface B {
    void methodB();
}

class C implements A, B {

    public void methodA() {}

    public void methodB() {}
}
```

---

## 3. Enables Runtime Polymorphism

```java
interface Animal {
    void sound();
}
```

Implementations:

```java
class Dog implements Animal {
    public void sound() {
        System.out.println("Bark");
    }
}

class Cat implements Animal {
    public void sound() {
        System.out.println("Meow");
    }
}
```

Usage:

```java
Animal animal = new Dog();
animal.sound();
```

Output:

```text
Bark
```

The actual method is decided at runtime.

---

## 4. Promotes Loose Coupling

Bad Design:

```java
class PaymentService {

    CreditCardPayment payment =
            new CreditCardPayment();
}
```

Tightly coupled.

Better Design:

```java
class PaymentService {

    private Payment payment;
}
```

Any implementation can be injected:

```java
CreditCardPayment
UPIPayment
PayPalPayment
```

This is heavily used in Spring Framework.

---

## 5. Supports Functional Interfaces

Java 8 introduced Functional Interfaces.

```java
@FunctionalInterface
interface Calculator {

    int add(int a, int b);
}
```

Used with Lambda Expressions:

```java
Calculator c =
    (a, b) -> a + b;
```

---

## 6. Default Methods (Java 8)

Before Java 8:

```java
interface Vehicle {
    void start();
}
```

After Java 8:

```java
interface Vehicle {

    default void start() {
        System.out.println("Vehicle Started");
    }
}
```

Implementing classes may use or override it.

---

## 7. Static Methods (Java 8)

```java
interface Utility {

    static void print() {
        System.out.println("Utility Method");
    }
}
```

Usage:

```java
Utility.print();
```

---

## 8. Private Methods (Java 9)

```java
interface Vehicle {

    private void log() {
        System.out.println("Logging");
    }
}
```

Used internally within default methods.

---

# Interface Rules

### Variables

All interface variables are implicitly:

```java
public static final
```

Example:

```java
interface AppConfig {

    int MAX_USERS = 100;
}
```

Equivalent to:

```java
public static final int MAX_USERS = 100;
```

---

### Methods

Abstract methods are implicitly:

```java
public abstract
```

Example:

```java
void execute();
```

Equivalent to:

```java
public abstract void execute();
```

---

# Why Use Interfaces?

## 1. Achieve Abstraction

Expose only behavior.

```java
interface Payment {
    void pay();
}
```

Hide implementation details.

---

## 2. Enable Loose Coupling

Switch implementations easily.

```java
Payment payment = new UpiPayment();
```

Later:

```java
payment = new CreditCardPayment();
```

No code changes in the client.

---

## 3. Support Dependency Injection

Spring commonly injects interfaces.

```java
@Autowired
private UserService userService;
```

Implementation can be changed without affecting the client.

---

## 4. Improve Testability

Mock implementations can be created.

```java
UserService mockService =
    new MockUserService();
```

Useful in unit testing.

---

## 5. Standardize Behavior

Example:

```java
List
Set
Map
Runnable
Comparable
Comparator
```

These define contracts that multiple classes implement.

---

# Real-World Example

```java
interface NotificationService {

    void send(String message);
}
```

Implementations:

```java
EmailNotification
SMSNotification
WhatsAppNotification
```

Client:

```java
NotificationService service =
        new EmailNotification();

service.send("Hello");
```

The client remains independent of the implementation.

---

# Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|----------|-----------|---------------|
| Multiple Inheritance | ✅ Yes | ❌ No |
| Constructor | ❌ No | ✅ Yes |
| Instance Variables | ❌ No | ✅ Yes |
| Abstract Methods | ✅ Yes | ✅ Yes |
| Concrete Methods | ✅ (Java 8+) | ✅ Yes |
| State Management | ❌ No | ✅ Yes |
| Purpose | Contract | Partial Implementation |

---

# Common Java Interfaces

```java
Runnable
Callable
Comparable
Comparator
List
Set
Map
Serializable
Cloneable
AutoCloseable
```

---

# Interview Trick Question

### Can an Interface Have a Method Body?

✅ Yes.

Since Java 8:

```java
default methods
static methods
```

Since Java 9:

```java
private methods
```

---

# Key Interview Points

- Interface defines a contract that implementing classes must follow.
- Used to achieve abstraction and multiple inheritance.
- Supports runtime polymorphism.
- Promotes loose coupling and dependency injection.
- All variables are `public static final`.
- Abstract methods are `public abstract`.
- Java 8 introduced default and static methods.
- Java 9 introduced private methods.

## One-Line Interview Answer

**An Interface is a contract that defines a set of behaviors without specifying their implementation, enabling abstraction, multiple inheritance, loose coupling, polymorphism, and flexible application design in Java.**

---

<h1 id="solid-principles" style="text-decoration: underline;"> 17) SOLID principles </h1>
# SOLID Principles in Java

**SOLID** is a set of five object-oriented design principles introduced by
**Robert C. Martin (Uncle Bob)** to create software that is:

- Easy to maintain
- Easy to extend
- Easy to test
- Flexible and scalable
- Less tightly coupled

---

# What Does SOLID Stand For?

| Letter | Principle |
|----------|-----------|
| S | Single Responsibility Principle (SRP) |
| O | Open/Closed Principle (OCP) |
| L | Liskov Substitution Principle (LSP) |
| I | Interface Segregation Principle (ISP) |
| D | Dependency Inversion Principle (DIP) |

---

# 1. Single Responsibility Principle (SRP)

## Definition

**A class should have only one reason to change.**

In other words:

```text
One Class = One Responsibility
```

---

## Bad Example

```java
class Employee {

    public void calculateSalary() {
        // Salary logic
    }

    public void saveToDatabase() {
        // Database logic
    }

    public void generateReport() {
        // Reporting logic
    }
}
```

Problems:

- Salary change affects class.
- Database change affects class.
- Report change affects class.

Multiple responsibilities.

---

## Good Example

```java
class Employee {
    private String name;
}
```

```java
class SalaryService {

    public void calculateSalary(Employee emp) {
    }
}
```

```java
class EmployeeRepository {

    public void save(Employee emp) {
    }
}
```

```java
class ReportService {

    public void generateReport(Employee emp) {
    }
}
```

Each class has a single responsibility.

---

## Benefit

✅ Easier maintenance

✅ Better readability

✅ Easier testing

---

# 2. Open/Closed Principle (OCP)

## Definition

**Software entities should be open for extension but closed for modification.**

```text
Extend Existing Code
Don't Modify Existing Code
```

---

## Bad Example

```java
class PaymentService {

    public void pay(String type) {

        if(type.equals("CARD")) {
            // Card payment
        }
        else if(type.equals("UPI")) {
            // UPI payment
        }
    }
}
```

Every new payment type requires modification.

---

## Good Example

```java
interface Payment {

    void pay();
}
```

```java
class CardPayment implements Payment {

    public void pay() {
        System.out.println("Card Payment");
    }
}
```

```java
class UpiPayment implements Payment {

    public void pay() {
        System.out.println("UPI Payment");
    }
}
```

```java
class PaymentService {

    public void processPayment(Payment payment) {
        payment.pay();
    }
}
```

New payment methods can be added without changing existing code.

---

## Benefit

✅ Easy extensibility

✅ Lower risk of bugs

✅ Better maintainability

---

# 3. Liskov Substitution Principle (LSP)

## Definition

**Subclasses should be replaceable with their parent classes without breaking the application.**

```text
Child Should Behave Like Parent
```

---

## Bad Example

```java
class Bird {

    public void fly() {
    }
}
```

```java
class Penguin extends Bird {

    @Override
    public void fly() {
        throw new UnsupportedOperationException();
    }
}
```

Penguin cannot fly.

LSP is violated.

---

## Good Example

```java
interface Bird {
}
```

```java
interface FlyingBird extends Bird {

    void fly();
}
```

```java
class Sparrow implements FlyingBird {

    public void fly() {
        System.out.println("Flying");
    }
}
```

```java
class Penguin implements Bird {
}
```

Each class behaves correctly.

---

## Benefit

✅ Reliable inheritance

✅ Better polymorphism

✅ Fewer runtime surprises

---

# 4. Interface Segregation Principle (ISP)

## Definition

**Clients should not be forced to depend on methods they do not use.**

```text
Many Small Interfaces
Instead of One Large Interface
```

---

## Bad Example

```java
interface Worker {

    void work();

    void eat();

    void sleep();
}
```

```java
class Robot implements Worker {

    public void work() {}

    public void eat() {
        throw new UnsupportedOperationException();
    }

    public void sleep() {
        throw new UnsupportedOperationException();
    }
}
```

Robot doesn't eat or sleep.

---

## Good Example

```java
interface Workable {

    void work();
}
```

```java
interface Eatable {

    void eat();
}
```

```java
class Human implements Workable, Eatable {

    public void work() {}

    public void eat() {}
}
```

```java
class Robot implements Workable {

    public void work() {}
}
```

---

## Benefit

✅ Smaller interfaces

✅ Better flexibility

✅ Reduced coupling

---

# 5. Dependency Inversion Principle (DIP)

## Definition

**High-level modules should not depend on low-level modules. Both should depend on abstractions.**

```text
Depend On Interfaces
Not Concrete Classes
```

---

## Bad Example

```java
class MySQLDatabase {

    public void save() {
    }
}
```

```java
class UserService {

    private MySQLDatabase db =
            new MySQLDatabase();
}
```

Tightly coupled.

Changing database requires code changes.

---

## Good Example

```java
interface Database {

    void save();
}
```

```java
class MySQLDatabase
        implements Database {

    public void save() {
        System.out.println("MySQL Save");
    }
}
```

```java
class OracleDatabase
        implements Database {

    public void save() {
        System.out.println("Oracle Save");
    }
}
```

```java
class UserService {

    private Database database;

    public UserService(Database database) {
        this.database = database;
    }
}
```

Usage:

```java
Database db =
        new MySQLDatabase();

UserService service =
        new UserService(db);
```

---

## Benefit

✅ Loose coupling

✅ Easy testing

✅ Easy replacement of implementations

✅ Foundation of Spring Dependency Injection

---

# Real-World Example in Spring Boot

```java
@Service
public class UserService {

    @Autowired
    private UserRepository repository;
}
```

Here:

```text
UserService
      ↓
UserRepository Interface
      ↓
JpaRepository Implementation
```

This follows DIP.

---

# Quick Summary Table

| Principle | Meaning |
|------------|---------|
| SRP | One class should have one responsibility |
| OCP | Open for extension, closed for modification |
| LSP | Child objects should replace parent objects safely |
| ISP | Prefer small focused interfaces |
| DIP | Depend on abstractions, not implementations |

---

# SOLID Benefits

### Better Maintainability

Changes affect fewer classes.

---

### Better Scalability

New features can be added easily.

---

### Better Testability

Mock implementations become simple.

---

### Loose Coupling

Components remain independent.

---

### Cleaner Code

Improves readability and design.

---

# Interview-Friendly Mnemonic

```text
S → Single Responsibility
O → Open/Closed
L → Liskov Substitution
I → Interface Segregation
D → Dependency Inversion
```

Remember:

```text
One Responsibility
Extend, Don't Modify
Replace Safely
Small Interfaces
Depend on Abstractions
```

---

# One-Line Interview Answer

**SOLID is a set of five object-oriented design principles (SRP, OCP, LSP, ISP, and DIP) that help developers build maintainable, scalable, loosely coupled, and extensible software systems.**

---

<h1 id="what-is-the-difference-between-and-equals" style="text-decoration: underline;"> 18) What is the difference between `==` and `equals()`?</h1>
# What is the Difference Between `==` and `equals()` in Java?

One of the most frequently asked Java interview questions is:

> What is the difference between `==` and `equals()`?

The short answer is:

- `==` compares **references (memory addresses)** for objects.
- `equals()` compares **contents (logical equality)** of objects.

---

# `==` Operator

The `==` operator checks whether two references point to the **same object in memory**.

## Example

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);
```

### Output

```text
false
```

Why?

```text
s1 ----> "Java" (Object 1)

s2 ----> "Java" (Object 2)
```

Different objects, different memory locations.

Therefore:

```java
s1 == s2
```

returns:

```text
false
```

---

# `equals()` Method

The `equals()` method checks whether two objects have the **same content/state**.

## Example

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1.equals(s2));
```

### Output

```text
true
```

Because:

```text
Content = "Java"
Content = "Java"
```

The values are identical.

---

# Memory Visualization

```java
String s1 = new String("Java");
String s2 = new String("Java");
```

```text
Heap Memory

s1 ──► Object1("Java")

s2 ──► Object2("Java")
```

Comparison:

```java
s1 == s2
```

```text
Object1 == Object2
```

Result:

```text
false
```

Comparison:

```java
s1.equals(s2)
```

```text
"Java".equals("Java")
```

Result:

```text
true
```

---

# Special Case: String Pool

```java
String s1 = "Java";
String s2 = "Java";
```

Memory:

```text
String Pool

s1 ──┐
      ├──► "Java"
s2 ──┘
```

Now:

```java
System.out.println(s1 == s2);
```

Output:

```text
true
```

because both references point to the same pooled object.

---

# Primitive Types

For primitive values, `==` compares actual values.

```java
int a = 10;
int b = 10;

System.out.println(a == b);
```

Output:

```text
true
```

Because:

```text
10 == 10
```

---

# Custom Object Example

## Without Overriding `equals()`

```java
class Employee {

    int id;

    Employee(int id) {
        this.id = id;
    }
}
```

```java
Employee e1 = new Employee(101);
Employee e2 = new Employee(101);

System.out.println(e1.equals(e2));
```

Output:

```text
false
```

Why?

Default implementation from `Object`:

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

It compares references.

---

# Overriding `equals()`

```java
class Employee {

    int id;

    Employee(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {

        if (this == obj)
            return true;

        if (!(obj instanceof Employee))
            return false;

        Employee other = (Employee) obj;

        return this.id == other.id;
    }
}
```

Now:

```java
Employee e1 = new Employee(101);
Employee e2 = new Employee(101);

System.out.println(e1.equals(e2));
```

Output:

```text
true
```

---

# Comparison Table

| Feature | `==` | `equals()` |
|----------|-------|-----------|
| Type | Operator | Method |
| Defined In | Java Language | Object Class |
| Compares | References (Objects) / Values (Primitives) | Logical Content |
| Can Be Overridden | ❌ No | ✅ Yes |
| Works With Primitives | ✅ Yes | ❌ No |
| Works With Objects | ✅ Yes | ✅ Yes |
| Used For | Identity Comparison | Equality Comparison |

---

# Example Summary

```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);
System.out.println(s1.equals(s2));
```

Output:

```text
false
true
```

Explanation:

```text
==       → Different Objects
equals() → Same Content
```

---

# Common Interview Questions

## Q1: Why Does String Override `equals()`?

Because logical comparison is more useful than reference comparison.

```java
"Java".equals("Java")
```

should return:

```text
true
```

even if objects are different.

---

## Q2: What Happens If `equals()` Is Not Overridden?

The implementation from `Object` is used:

```java
public boolean equals(Object obj) {
    return this == obj;
}
```

In that case:

```java
equals() behaves like ==
```

---

## Q3: Should `hashCode()` Also Be Overridden?

✅ Yes.

Whenever `equals()` is overridden, `hashCode()` must also be overridden.

```java
@Override
public int hashCode() {
    return Objects.hash(id);
}
```

Required for:

```java
HashMap
HashSet
Hashtable
```

---

# Interview Trick Question

```java
String s1 = "Java";
String s2 = "Java";

System.out.println(s1 == s2);
```

Output:

```text
true
```

Because String literals are stored in the String Pool.

However:

```java
String s1 = new String("Java");
String s2 = new String("Java");
```

Output:

```text
false
```

because two separate objects are created.

---

# Key Interview Points

- `==` compares references for objects and values for primitives.
- `equals()` compares object content (logical equality).
- String overrides `equals()` to compare character sequences.
- Default `equals()` implementation behaves like `==`.
- When overriding `equals()`, always override `hashCode()`.
- Use `equals()` when comparing object values.

## One-Line Interview Answer

**The `==` operator compares object references (or primitive values), whereas the `equals()` method compares the logical content of objects and can be overridden to define custom equality behavior.**

---

<h1 id="what-is-the-instanceof-operator" style="text-decoration: underline;"> 19) What is the `instanceof` operator?</h1>
# What is the `instanceof` Operator in Java?

The `instanceof` operator is used to check whether an object is an instance of a particular class, subclass, or interface at runtime.

It returns:

```java
true
```

if the object belongs to the specified type, otherwise:

```java
false
```

---

# Syntax

```java
object instanceof ClassName
```

Example:

```java
String str = "Java";

System.out.println(str instanceof String);
```

Output:

```text
true
```

---

# Why Use `instanceof`?

It helps:

- Check an object's type at runtime.
- Prevent `ClassCastException`.
- Perform safe type casting.
- Implement polymorphic behavior.

---

# Basic Example

```java
String str = "Java";

System.out.println(str instanceof String);
System.out.println(str instanceof Object);
```

Output:

```text
true
true
```

Explanation:

```text
String extends Object
```

Therefore, a String object is also an Object.

---

# Example with Inheritance

```java
class Animal {
}

class Dog extends Animal {
}
```

```java
Animal animal = new Dog();

System.out.println(animal instanceof Dog);
System.out.println(animal instanceof Animal);
System.out.println(animal instanceof Object);
```

Output:

```text
true
true
true
```

Memory:

```text
Animal animal = new Dog();
                  ↑
              Actual Object
```

`instanceof` checks the actual object type at runtime.

---

# Example with Interface

```java
interface Vehicle {
}

class Car implements Vehicle {
}
```

```java
Car car = new Car();

System.out.println(car instanceof Vehicle);
```

Output:

```text
true
```

Because:

```text
Car implements Vehicle
```

---

# Preventing ClassCastException

## Unsafe Cast

```java
Object obj = "Java";

Integer num = (Integer) obj;
```

Runtime Error:

```text
ClassCastException
```

---

## Safe Cast Using `instanceof`

```java
Object obj = "Java";

if (obj instanceof String) {

    String str = (String) obj;

    System.out.println(str);
}
```

Output:

```text
Java
```

---

# `instanceof` with `null`

```java
String str = null;

System.out.println(str instanceof String);
```

Output:

```text
false
```

Important Rule:

```java
null instanceof AnyClass
```

always returns:

```text
false
```

---

# Java 16 Pattern Matching for `instanceof`

Before Java 16:

```java
if (obj instanceof String) {

    String str = (String) obj;

    System.out.println(str.length());
}
```

---

Java 16+:

```java
if (obj instanceof String str) {

    System.out.println(str.length());
}
```

Output:

```text
4
```

Benefits:

- No explicit casting.
- Cleaner code.
- Less boilerplate.

---

# Runtime Type Checking Example

```java
class Animal {
}

class Dog extends Animal {
}

class Cat extends Animal {
}
```

```java
public void identify(Animal animal) {

    if (animal instanceof Dog) {
        System.out.println("Dog");
    }
    else if (animal instanceof Cat) {
        System.out.println("Cat");
    }
}
```

Usage:

```java
identify(new Dog());
identify(new Cat());
```

Output:

```text
Dog
Cat
```

---

# Common Use Case in `equals()`

```java
@Override
public boolean equals(Object obj) {

    if (!(obj instanceof Employee))
        return false;

    Employee other = (Employee) obj;

    return this.id == other.id;
}
```

Used to ensure safe type comparison.

---

# Comparison with `getClass()`

## Using `instanceof`

```java
obj instanceof Employee
```

Returns:

```text
true
```

for:

- Employee
- Any subclass of Employee

---

## Using `getClass()`

```java
obj.getClass() == Employee.class
```

Returns:

```text
true
```

only for exact Employee objects.

---

# Example

```java
class Employee {
}

class Manager extends Employee {
}
```

```java
Employee emp = new Manager();
```

```java
emp instanceof Employee
```

Output:

```text
true
```

```java
emp.getClass() == Employee.class
```

Output:

```text
false
```

because actual type is `Manager`.

---

# Comparison Table

| Feature | `instanceof` | `getClass()` |
|-----------|-------------|--------------|
| Checks Subclasses | ✅ Yes | ❌ No |
| Checks Interfaces | ✅ Yes | ❌ No |
| Runtime Type Check | ✅ Yes | ✅ Yes |
| Supports Pattern Matching | ✅ Yes | ❌ No |
| Exact Class Match | ❌ No | ✅ Yes |

---

# Interview Trick Questions

## Q1: What is the Output?

```java
String str = null;

System.out.println(str instanceof String);
```

Output:

```text
false
```

---

## Q2: Can `instanceof` Check Interfaces?

✅ Yes.

```java
car instanceof Vehicle
```

returns:

```text
true
```

if `Car` implements `Vehicle`.

---

## Q3: Does `instanceof` Work at Compile Time?

❌ No.

It performs a **runtime type check**.

---

# Key Interview Points

- `instanceof` checks whether an object belongs to a specific class, subclass, or interface.
- Returns `true` or `false`.
- Used for safe casting and runtime type checking.
- Prevents `ClassCastException`.
- `null instanceof AnyClass` always returns `false`.
- Java 16 introduced pattern matching with `instanceof`.
- Works with inheritance and interfaces.

## One-Line Interview Answer

**The `instanceof` operator is used to determine at runtime whether an object is an instance of a specified class, subclass, or interface, returning `true` if the relationship exists and `false` otherwise.**
---

<h1 id="super-keyword-use-cases" style="text-decoration: underline;"> 20) `super` keyword use cases </h1>
# `super` Keyword Use Cases in Java

The `super` keyword is a reference variable used to refer to the **immediate parent class object**.

It is primarily used in inheritance to access parent class members that are hidden or overridden in the child class.

---

# What Does `super` Refer To?

```text
Parent Class Object
```

Example:

```java
class Animal {
}

class Dog extends Animal {
}
```

Inside `Dog`, the `super` keyword refers to the `Animal` part of the object.

---

# Main Use Cases of `super`

The `super` keyword is commonly used for:

1. Accessing parent class variables
2. Calling parent class methods
3. Calling parent class constructors

---

# 1. Access Parent Class Variable

When both parent and child classes have variables with the same name, `super` is used to access the parent's variable.

## Example

```java
class Animal {

    String type = "Animal";
}

class Dog extends Animal {

    String type = "Dog";

    void display() {

        System.out.println(type);
        System.out.println(super.type);
    }
}
```

```java
public class Test {

    public static void main(String[] args) {

        Dog dog = new Dog();

        dog.display();
    }
}
```

### Output

```text
Dog
Animal
```

### Explanation

```java
type
```

refers to:

```text
Child Class Variable
```

while:

```java
super.type
```

refers to:

```text
Parent Class Variable
```

---

# 2. Call Parent Class Method

When a child class overrides a parent method, `super` can invoke the parent version.

## Example

```java
class Animal {

    void sound() {
        System.out.println("Animal Sound");
    }
}
```

```java
class Dog extends Animal {

    @Override
    void sound() {
        System.out.println("Dog Bark");
    }

    void display() {

        sound();

        super.sound();
    }
}
```

### Output

```text
Dog Bark
Animal Sound
```

### Explanation

```java
sound();
```

calls:

```text
Child Method
```

while:

```java
super.sound();
```

calls:

```text
Parent Method
```

---

# 3. Call Parent Class Constructor

The most common use of `super` is invoking the parent constructor.

## Example

```java
class Animal {

    Animal() {
        System.out.println("Animal Constructor");
    }
}
```

```java
class Dog extends Animal {

    Dog() {

        super();

        System.out.println("Dog Constructor");
    }
}
```

### Output

```text
Animal Constructor
Dog Constructor
```

---

# Constructor Chaining

```java
class Parent {

    Parent() {
        System.out.println("Parent");
    }
}
```

```java
class Child extends Parent {

    Child() {
        System.out.println("Child");
    }
}
```

Output:

```text
Parent
Child
```

Reason:

```java
super();
```

is automatically inserted by the compiler as the first statement.

Equivalent code:

```java
Child() {

    super();

    System.out.println("Child");
}
```

---

# Parameterized Constructor Example

```java
class Employee {

    Employee(int id) {

        System.out.println("Employee Id: " + id);
    }
}
```

```java
class Manager extends Employee {

    Manager() {

        super(101);

        System.out.println("Manager Created");
    }
}
```

### Output

```text
Employee Id: 101
Manager Created
```

---

# Rules of `super`

## Rule 1

`super()` must be the first statement in a constructor.

✅ Valid:

```java
Child() {

    super();

    System.out.println("Hello");
}
```

❌ Invalid:

```java
Child() {

    System.out.println("Hello");

    super();
}
```

Compilation Error:

```text
Call to super must be first statement in constructor
```

---

## Rule 2

`super` cannot be used in a static context.

❌ Invalid:

```java
static void test() {

    super.toString();
}
```

Compilation Error.

Reason:

```text
super belongs to object context
```

---

## Rule 3

`super` refers only to the immediate parent class.

Example:

```java
GrandParent
      ↑
   Parent
      ↑
    Child
```

Inside `Child`:

```java
super
```

refers only to:

```text
Parent
```

not GrandParent.

---

# `this` vs `super`

| Feature | `this` | `super` |
|----------|---------|---------|
| Refers To | Current Class Object | Parent Class Object |
| Access Current Variables | ✅ Yes | ❌ No |
| Access Parent Variables | ❌ No | ✅ Yes |
| Call Current Constructor | ✅ `this()` | ❌ No |
| Call Parent Constructor | ❌ No | ✅ `super()` |

---

# Example: `this` and `super`

```java
class Parent {

    String name = "Parent";
}
```

```java
class Child extends Parent {

    String name = "Child";

    void display() {

        System.out.println(this.name);

        System.out.println(super.name);
    }
}
```

### Output

```text
Child
Parent
```

---

# Real-World Example

```java
class BaseController {

    void log() {
        System.out.println("Logging Request");
    }
}
```

```java
class UserController
        extends BaseController {

    void createUser() {

        super.log();

        System.out.println("Creating User");
    }
}
```

Output:

```text
Logging Request
Creating User
```

Used frequently in:

- Spring Framework
- Servlet APIs
- Custom Frameworks
- Template Method Pattern

---

# Interview Trick Questions

## Q1: Can We Call Both `this()` and `super()` in the Same Constructor?

❌ No.

```java
Child() {

    this();

    super();
}
```

Compilation Error.

Reason:

```text
Both must be the first statement.
```

---

## Q2: Is `super()` Added Automatically?

✅ Yes.

If you do not explicitly call a parent constructor, the compiler inserts:

```java
super();
```

automatically.

---

## Q3: Can We Use `super` to Access Private Members?

❌ No.

Private members are not inherited.

```java
private int id;
```

cannot be accessed using:

```java
super.id;
```

---

# Key Interview Points

- `super` refers to the immediate parent class object.
- Used to access parent variables hidden by child variables.
- Used to call overridden parent methods.
- Used to invoke parent constructors.
- `super()` must be the first statement in a constructor.
- Cannot be used in static methods.
- Refers only to the immediate parent class.

## One-Line Interview Answer

**The `super` keyword is used to refer to the immediate parent class and is commonly used to access parent variables, invoke parent methods, and call parent class constructors in inheritance hierarchies.**

---

<h1 id="what-is-finalize-why-discouraged" style="text-decoration: underline;"> 21) What is `finalize()`? Why discouraged? </h1>
# What is `finalize()` in Java? Why Is It Discouraged?

The `finalize()` method is a special method defined in the `Object` class that was historically used to perform cleanup operations before an object was garbage collected.

```java
protected void finalize() throws Throwable
```

The Garbage Collector (GC) may invoke this method before reclaiming the object's memory.

---

# Purpose of `finalize()`

Before Java introduced modern resource-management mechanisms, developers used `finalize()` to:

- Release native resources
- Close files
- Close database connections
- Perform cleanup activities

Example:

```java
class Employee {

    @Override
    protected void finalize() throws Throwable {

        System.out.println("Object is being garbage collected");
    }
}
```

---

# Example

```java
class Test {

    @Override
    protected void finalize() throws Throwable {

        System.out.println("Finalize Called");
    }

    public static void main(String[] args) {

        Test t = new Test();

        t = null;

        System.gc();
    }
}
```

Possible Output:

```text
Finalize Called
```

---

# How `finalize()` Works

```text
Object Created
      ↓
Object Becomes Unreachable
      ↓
Garbage Collector Detects It
      ↓
finalize() May Be Invoked
      ↓
Object Memory Reclaimed
```

Important:

```text
"May Be Invoked"
```

There is no guarantee that `finalize()` will execute.

---

# Why Is `finalize()` Discouraged?

Starting from Java 9:

```java
@Deprecated
protected void finalize()
```

It was deprecated and is strongly discouraged.

---

# 1. No Guarantee of Execution

Many developers mistakenly believe:

```java
finalize()
```

will always run before object destruction.

This is false.

Example:

```java
Employee emp = new Employee();
emp = null;
```

Even if the object becomes unreachable:

```java
finalize()
```

may never execute.

Reason:

- GC may not run immediately.
- JVM may terminate before GC runs.

---

# 2. Unpredictable Timing

You cannot control when GC executes.

```java
System.gc();
```

is only a request.

The JVM may ignore it.

Therefore:

```text
Object Unreachable
        ↓
Unknown Time
        ↓
finalize() Called (Maybe)
```

---

# 3. Performance Overhead

Objects with a `finalize()` method require extra processing.

Normal object:

```text
Object → Garbage Collected
```

Finalizable object:

```text
Object
   ↓
Finalize Queue
   ↓
Finalizer Thread
   ↓
Garbage Collection
```

Additional work slows down GC.

---

# 4. Resource Leaks

Suppose a file is opened:

```java
FileInputStream fis =
        new FileInputStream("data.txt");
```

and cleanup depends on:

```java
finalize()
```

If GC is delayed:

```text
File Remains Open
```

This can exhaust system resources.

---

# 5. Exceptions Are Ignored

```java
@Override
protected void finalize() throws Throwable {

    throw new RuntimeException();
}
```

The JVM ignores exceptions thrown from `finalize()`.

This makes debugging difficult.

---

# 6. Object Resurrection Problem

Inside `finalize()`, an object can make itself reachable again.

Example:

```java
class Test {

    static Test obj;

    @Override
    protected void finalize() {

        obj = this;
    }
}
```

Flow:

```text
Object Eligible For GC
          ↓
finalize() Executes
          ↓
Object Becomes Reachable Again
```

This creates unpredictable behavior.

---

# Modern Alternative: Try-With-Resources

Instead of:

```java
finalize()
```

use:

```java
try-with-resources
```

---

## Example

```java
try (FileInputStream fis =
         new FileInputStream("data.txt")) {

    // Read file
}
```

The resource is automatically closed.

Benefits:

```text
Deterministic
Reliable
Fast
Safe
```

---

# AutoCloseable Interface

Modern Java resource cleanup uses:

```java
AutoCloseable
```

or

```java
Closeable
```

Example:

```java
class DatabaseConnection
        implements AutoCloseable {

    @Override
    public void close() {

        System.out.println("Connection Closed");
    }
}
```

Usage:

```java
try(DatabaseConnection db =
        new DatabaseConnection()) {

    // Use resource
}
```

Output:

```text
Connection Closed
```

---

# `finalize()` vs `close()`

| Feature | `finalize()` | `close()` |
|-----------|-------------|-----------|
| Invocation | By GC | By Programmer / JVM |
| Guaranteed Execution | ❌ No | ✅ Yes |
| Performance | Slow | Fast |
| Deterministic | ❌ No | ✅ Yes |
| Deprecated | ✅ Yes | ❌ No |
| Resource Cleanup | Not Recommended | Recommended |

---

# Deprecation Status

### Java 9

```java
finalize()
```

was officially deprecated.

### Modern Recommendation

Use:

```java
try-with-resources
```

and

```java
AutoCloseable
```

instead.

---

# Interview Trick Question

## Does Calling `System.gc()` Guarantee `finalize()` Execution?

❌ No.

```java
System.gc();
```

only requests garbage collection.

The JVM is free to ignore the request.

---

## Can `finalize()` Be Called More Than Once?

❌ No.

The JVM guarantees that `finalize()` is invoked at most once per object.

---

## Is `finalize()` Called Immediately When an Object Becomes Unreachable?

❌ No.

Execution timing is completely controlled by the Garbage Collector.

---

# Key Interview Points

- `finalize()` is a method of the `Object` class.
- It was intended for cleanup before garbage collection.
- Invocation is not guaranteed.
- Execution timing is unpredictable.
- Causes performance overhead.
- Can lead to resource leaks and object resurrection issues.
- Deprecated since Java 9.
- Modern Java recommends `try-with-resources` and `AutoCloseable`.

## One-Line Interview Answer

**`finalize()` is a deprecated method that the Garbage Collector may invoke before reclaiming an object’s memory, but because its execution is unpredictable and unreliable, modern Java applications use `try-with-resources` and `AutoCloseable` for resource cleanup instead.**

---

<h1 id="what-are-the-main-collections-framework-interfaces" style="text-decoration: underline;"> 22) What are the main Collections Framework interfaces?</h1>
# What Are the Main Collections Framework Interfaces in Java?

The **Java Collections Framework (JCF)** is a set of interfaces and classes that provide ready-made data structures and algorithms for storing and manipulating groups of objects.

The framework is organized around a few core interfaces that define different ways of storing and accessing data.

---

# Collections Framework Hierarchy

```text
                 Iterable
                     │
               Collection
                     │
      ┌──────────────┼──────────────┐
      │              │              │
     List           Set          Queue
                      │
                 SortedSet
                      │
                 NavigableSet

Map (Separate Hierarchy)
      │
 SortedMap
      │
NavigableMap
```

---

# Main Interfaces of the Collections Framework

The most important interfaces are:

1. Collection
2. List
3. Set
4. Queue
5. Deque
6. Map
7. SortedSet
8. NavigableSet
9. SortedMap
10. NavigableMap

---

# 1. Collection Interface

The root interface of the Collection hierarchy.

```java
public interface Collection<E>
```

Provides common operations:

```java
add()
remove()
contains()
size()
isEmpty()
clear()
```

Example:

```java
Collection<String> collection =
        new ArrayList<>();

collection.add("Java");
```

---

## Important Methods

```java
add(E e)
remove(Object o)
contains(Object o)
size()
iterator()
clear()
```

---

# 2. List Interface

A List is an ordered collection.

Characteristics:

- Maintains insertion order
- Allows duplicates
- Supports index-based access

Example:

```java
List<String> list =
        new ArrayList<>();
```

```java
list.add("Java");
list.add("Spring");
list.add("Java");
```

Output:

```text
[Java, Spring, Java]
```

---

## Implementations

```java
ArrayList
LinkedList
Vector
Stack
```

---

# 3. Set Interface

A Set stores unique elements.

Characteristics:

- No duplicates
- No index-based access
- Unordered (depending on implementation)

Example:

```java
Set<String> set =
        new HashSet<>();

set.add("Java");
set.add("Java");
```

Output:

```text
[Java]
```

---

## Implementations

```java
HashSet
LinkedHashSet
TreeSet
```

---

# 4. Queue Interface

A Queue follows FIFO (First In First Out).

```text
First Added
     ↓
First Removed
```

Example:

```java
Queue<Integer> queue =
        new LinkedList<>();
```

```java
queue.offer(10);
queue.offer(20);

queue.poll();
```

Output:

```text
10
```

---

## Common Methods

```java
offer()
poll()
peek()
```

---

## Implementations

```java
LinkedList
PriorityQueue
ArrayDeque
```

---

# 5. Deque Interface

Deque means:

```text
Double Ended Queue
```

Elements can be inserted and removed from both ends.

Example:

```java
Deque<Integer> deque =
        new ArrayDeque<>();
```

```java
deque.addFirst(10);
deque.addLast(20);
```

---

## Operations

```java
addFirst()
addLast()
removeFirst()
removeLast()
```

---

# 6. Map Interface

Map is not part of the Collection hierarchy.

It stores:

```text
Key → Value
```

Characteristics:

- Unique keys
- Duplicate values allowed

Example:

```java
Map<Integer, String> map =
        new HashMap<>();
```

```java
map.put(101, "John");
```

Output:

```text
101 → John
```

---

## Implementations

```java
HashMap
LinkedHashMap
TreeMap
Hashtable
ConcurrentHashMap
```

---

# 7. SortedSet Interface

A Set that maintains sorted order.

Example:

```java
SortedSet<Integer> set =
        new TreeSet<>();
```

```java
set.add(30);
set.add(10);
set.add(20);
```

Output:

```text
[10, 20, 30]
```

---

## Additional Methods

```java
first()
last()
headSet()
tailSet()
```

---

# 8. NavigableSet Interface

Extends:

```java
SortedSet
```

Provides navigation methods.

Example:

```java
NavigableSet<Integer> set =
        new TreeSet<>();
```

Methods:

```java
higher()
lower()
ceiling()
floor()
```

---

## Example

```java
set.ceiling(15);
```

Output:

```text
20
```

---

# 9. SortedMap Interface

A Map whose keys are automatically sorted.

Example:

```java
SortedMap<Integer, String> map =
        new TreeMap<>();
```

Output:

```text
Keys Sorted Automatically
```

---

## Methods

```java
firstKey()
lastKey()
headMap()
tailMap()
```

---

# 10. NavigableMap Interface

Extends:

```java
SortedMap
```

Provides advanced navigation.

Methods:

```java
higherKey()
lowerKey()
ceilingKey()
floorKey()
```

Example:

```java
NavigableMap<Integer, String> map =
        new TreeMap<>();
```

---

# Quick Comparison

| Interface | Stores | Duplicates | Ordering |
|------------|---------|------------|-----------|
| Collection | Objects | Depends | Depends |
| List | Objects | ✅ Allowed | Insertion Order |
| Set | Objects | ❌ Not Allowed | Depends |
| Queue | Objects | ✅ Allowed | FIFO |
| Deque | Objects | ✅ Allowed | Double Ended |
| Map | Key-Value Pairs | Keys ❌ Values ✅ | Depends |
| SortedSet | Unique Objects | ❌ | Sorted |
| NavigableSet | Unique Objects | ❌ | Sorted |
| SortedMap | Key-Value Pairs | Unique Keys | Sorted Keys |
| NavigableMap | Key-Value Pairs | Unique Keys | Sorted Keys |

---

# Most Common Implementations

| Interface | Common Implementation |
|------------|-----------------------|
| List | ArrayList |
| Set | HashSet |
| SortedSet | TreeSet |
| Queue | LinkedList |
| Deque | ArrayDeque |
| Map | HashMap |
| SortedMap | TreeMap |
| NavigableMap | TreeMap |

---

# Real-World Usage

### List

```java
List<Employee> employees;
```

Store ordered records.

---

### Set

```java
Set<String> uniqueEmails;
```

Remove duplicates.

---

### Queue

```java
Queue<Task> tasks;
```

Task scheduling.

---

### Map

```java
Map<Integer, Employee> employeeMap;
```

Fast lookup by key.

---

# Interview Trick Question

## Is Map Part of the Collection Interface?

❌ No.

```text
Collection Hierarchy
       ↑
      List
      Set
      Queue

Map
(Separate Hierarchy)
```

Map is part of the Collections Framework but does not extend the `Collection` interface.

---

# Key Interview Points

- `Collection` is the root interface for List, Set, and Queue.
- `List` maintains insertion order and allows duplicates.
- `Set` stores unique elements.
- `Queue` follows FIFO ordering.
- `Deque` supports insertion/removal from both ends.
- `Map` stores key-value pairs and is a separate hierarchy.
- `SortedSet` and `SortedMap` maintain sorted order.
- `NavigableSet` and `NavigableMap` provide advanced navigation methods.
- `ArrayList`, `HashSet`, `LinkedList`, and `HashMap` are the most commonly used implementations.

## One-Line Interview Answer

**The main Collections Framework interfaces are Collection, List, Set, Queue, Deque, and Map, along with their sorted and navigable variants, providing standardized ways to store, retrieve, and manipulate groups of objects in Java.**

---

<h1 id="what-is-a-thread-how-to-create-a-thread-in-java" style="text-decoration: underline;"> 23) What is a Thread? How to Create a Thread in Java?</h1>
# What is a Thread? How to Create a Thread in Java?

A **Thread** is the smallest unit of execution within a process.

It represents an independent path of execution that allows multiple tasks to run concurrently within the same application.

---

# What is a Process?

A process is a running instance of a program.

Example:

```text
Chrome Browser
MS Word
IntelliJ IDEA
```

Each running application is a process.

---

# What is a Thread?

A thread is a lightweight sub-process.

```text
Process
   │
 ┌─┴───────────────┐
 │                 │
Thread-1      Thread-2
```

Multiple threads can execute simultaneously within a single process.

---

# Real-Life Example

Consider a web browser:

```text
Browser Process
      │
 ┌────┼─────┐
 │    │     │
UI  Download Rendering
```

Each task runs in a separate thread.

This improves responsiveness and performance.

---

# Benefits of Multithreading

### 1. Better CPU Utilization

Multiple tasks can run concurrently.

---

### 2. Improved Performance

Long-running tasks don't block the application.

---

### 3. Better User Experience

UI remains responsive while background work continues.

---

### 4. Resource Sharing

Threads share:

```text
Heap Memory
Files
Database Connections
```

within the same process.

---

# Ways to Create a Thread

Java provides two traditional ways:

1. Extending the `Thread` class
2. Implementing the `Runnable` interface

Modern Java also supports:

3. Callable & Future
4. Executor Framework
5. Virtual Threads (Java 21+)

---

# Method 1: Extending the Thread Class

Create a class that extends `Thread`.

---

## Example

```java
class MyThread extends Thread {

    @Override
    public void run() {

        System.out.println(
                "Thread is running");
    }
}
```

Usage:

```java
public class Test {

    public static void main(String[] args) {

        MyThread thread = new MyThread();

        thread.start();
    }
}
```

Output:

```text
Thread is running
```

---

# Why `start()` Instead of `run()`?

Correct:

```java
thread.start();
```

Wrong:

```java
thread.run();
```

---

### `start()`

```text
Creates New Thread
Calls run()
```

---

### `run()`

```text
Normal Method Call
No New Thread Created
```

---

# Execution Flow

```text
main()
   │
start()
   │
New Thread Created
   │
run()
```

---

# Method 2: Implementing Runnable Interface

Recommended approach.

---

## Example

```java
class MyTask implements Runnable {

    @Override
    public void run() {

        System.out.println(
                "Runnable Thread Running");
    }
}
```

Usage:

```java
public class Test {

    public static void main(String[] args) {

        MyTask task = new MyTask();

        Thread thread =
                new Thread(task);

        thread.start();
    }
}
```

Output:

```text
Runnable Thread Running
```

---

# Why Runnable Is Preferred?

Using inheritance:

```java
class MyThread extends Thread
```

consumes your only inheritance option.

Java supports:

```text
Single Inheritance
```

only.

With Runnable:

```java
class Employee
        extends Person
        implements Runnable
```

you can still extend another class.

---

# Thread Using Lambda Expression

Since Java 8:

```java
Runnable task = () ->
        System.out.println("Thread Running");
```

```java
new Thread(task).start();
```

---

# Anonymous Thread Example

```java
new Thread(() -> {

    System.out.println(
            "Anonymous Thread");

}).start();
```

---

# Multiple Threads Example

```java
class Task extends Thread {

    @Override
    public void run() {

        for(int i = 1; i <= 5; i++) {

            System.out.println(
                    Thread.currentThread().getName()
                            + " : " + i);
        }
    }
}
```

```java
public class Test {

    public static void main(String[] args) {

        Task t1 = new Task();
        Task t2 = new Task();

        t1.start();
        t2.start();
    }
}
```

Possible Output:

```text
Thread-0 : 1
Thread-1 : 1
Thread-0 : 2
Thread-1 : 2
...
```

Order may vary because thread scheduling is handled by the JVM and OS.

---

# Thread Lifecycle

```text
NEW
 ↓
RUNNABLE
 ↓
RUNNING
 ↓
WAITING / BLOCKED
 ↓
TERMINATED
```

---

# Modern Approach: Executor Framework

Instead of manually creating threads:

```java
ExecutorService executor =
        Executors.newFixedThreadPool(5);

executor.submit(() ->
        System.out.println("Task"));
```

Benefits:

- Thread pooling
- Better performance
- Easier management

---

# Java 21 Virtual Threads

Java 21 introduced lightweight threads.

```java
Thread.startVirtualThread(() -> {

    System.out.println("Virtual Thread");
});
```

Benefits:

```text
Millions of Threads
Low Memory Usage
High Scalability
```

Especially useful for:

- Web Applications
- Microservices
- I/O Operations

---

# Thread vs Process

| Feature | Process | Thread |
|----------|----------|---------|
| Definition | Running Program | Smallest Unit of Execution |
| Memory | Separate Memory | Shared Memory |
| Creation Cost | High | Low |
| Communication | Complex | Easy |
| Performance | Slower | Faster |

---

# Thread Class vs Runnable

| Feature | Thread Class | Runnable Interface |
|-----------|-------------|---------------------|
| Inheritance Required | ✅ Yes | ❌ No |
| Supports Multiple Inheritance | ❌ No | ✅ Yes |
| Recommended | ❌ Less Preferred | ✅ Preferred |
| Reusability | Lower | Higher |

---

# Interview Trick Questions

## Q1: What Happens If We Call `run()` Directly?

```java
thread.run();
```

No new thread is created.

Output executes in the main thread.

---

## Q2: Which Method Actually Creates a New Thread?

```java
start()
```

creates the new thread and internally invokes:

```java
run()
```

---

## Q3: Can We Start a Thread Twice?

```java
thread.start();
thread.start();
```

❌ No.

Throws:

```text
java.lang.IllegalThreadStateException
```

---

# Key Interview Points

- A thread is the smallest unit of execution within a process.
- Multithreading improves performance and responsiveness.
- Threads can be created by extending `Thread` or implementing `Runnable`.
- `Runnable` is the preferred approach.
- Always use `start()` to create a new thread.
- Calling `run()` directly does not create a new thread.
- Modern applications prefer `ExecutorService`.
- Java 21 introduces Virtual Threads for highly scalable concurrency.

## One-Line Interview Answer

**A Thread is the smallest unit of execution in a Java application, enabling concurrent task execution, and it can be created by extending the `Thread` class, implementing the `Runnable` interface, or using modern concurrency APIs such as `ExecutorService` and Virtual Threads.**

---

<h1 id="what-is-a-virtual-thread-in-java-how-to-create-it-when-to-use-it" style="text-decoration: underline;"> 24) What is a Virtual Thread in Java? How to Create It? When to Use It?</h1>
# What is a Virtual Thread in Java? How to Create It? When to Use It?

## Introduction

A **Virtual Thread** is a lightweight thread introduced as a standard feature in **Java 21** (Project Loom).

Unlike traditional platform threads, virtual threads are managed by the JVM rather than being directly tied to operating system (OS) threads.

This allows Java applications to create **millions of concurrent threads** with very low memory overhead.

---

# Why Were Virtual Threads Introduced?

Traditional Java threads are expensive because:

```text
1 Thread = 1 OS Thread
```

Creating thousands of threads leads to:

- High memory consumption
- Context switching overhead
- Reduced scalability

Example:

```java
for(int i = 0; i < 100000; i++) {
    new Thread(task).start();
}
```

This can exhaust system resources.

---

# Platform Thread vs Virtual Thread

## Platform Thread (Traditional Thread)

```text
Java Thread
      │
      ▼
Operating System Thread
```

Characteristics:

- Heavyweight
- Expensive to create
- Limited scalability

---

## Virtual Thread

```text
Virtual Thread
       │
       ▼
JVM Scheduler
       │
       ▼
Few OS Threads
```

Characteristics:

- Lightweight
- Cheap to create
- Highly scalable

---

# Key Features of Virtual Threads

### 1. Lightweight

Thousands or even millions of virtual threads can be created.

---

### 2. JVM Managed

Scheduling is handled by the JVM instead of the OS.

---

### 3. Better Scalability

Ideal for applications with many concurrent tasks.

---

### 4. Simpler Programming Model

Write code in a traditional blocking style without complex asynchronous programming.

---

# How to Create a Virtual Thread?

## Method 1: Using `Thread.startVirtualThread()`

```java
public class Test {

    public static void main(String[] args) {

        Thread.startVirtualThread(() -> {

            System.out.println(
                    "Virtual Thread Running");
        });
    }
}
```

Output:

```text
Virtual Thread Running
```

---

# Method 2: Using Thread Builder

```java
Thread thread =
        Thread.ofVirtual()
              .start(() -> {

                  System.out.println(
                          "Virtual Thread");
              });
```

---

# Method 3: Create and Start Later

```java
Thread thread =
        Thread.ofVirtual()
              .unstarted(() -> {

                  System.out.println(
                          "Virtual Thread");
              });

thread.start();
```

---

# Creating Multiple Virtual Threads

```java
for (int i = 1; i <= 10000; i++) {

    Thread.startVirtualThread(() -> {

        System.out.println(
                Thread.currentThread());
    });
}
```

Creating 10,000 virtual threads is generally feasible.

Creating 10,000 platform threads usually is not.

---

# Using Virtual Threads with ExecutorService

Recommended for enterprise applications.

```java
try (ExecutorService executor =
        Executors.newVirtualThreadPerTaskExecutor()) {

    executor.submit(() -> {

        System.out.println(
                "Task Executed");
    });
}
```

---

# Real-World Example

Suppose a web application receives:

```text
100,000 Requests
```

Traditional Threads:

```text
100,000 Requests
        ↓
100,000 OS Threads
        ↓
High Memory Usage
```

Virtual Threads:

```text
100,000 Requests
        ↓
100,000 Virtual Threads
        ↓
Few OS Threads
        ↓
Efficient Execution
```

---

# When to Use Virtual Threads?

## 1. Web Applications

Example:

```text
Spring Boot
REST APIs
Microservices
```

Each request can run in its own virtual thread.

---

## 2. Database Operations

```java
connection.executeQuery();
```

Database calls are usually blocking.

Virtual threads handle such blocking efficiently.

---

## 3. Network Calls

```java
HttpClient
REST Calls
SOAP Calls
```

Useful when waiting for external services.

---

## 4. File I/O Operations

```java
Read File
Write File
Upload File
```

Most I/O operations spend time waiting.

Virtual threads excel here.

---

## 5. High-Concurrency Systems

Examples:

- Chat Applications
- Payment Systems
- E-commerce Platforms
- API Gateways

---

# When NOT to Use Virtual Threads?

## CPU-Intensive Tasks

Example:

```java
Image Processing
Encryption
Machine Learning
Large Computations
```

Reason:

```text
CPU Bound Work
```

Virtual threads do not make CPU calculations faster.

---

## Tight Computational Loops

```java
while(true) {
    calculate();
}
```

Virtual threads provide little benefit.

---

# Virtual Threads vs Platform Threads

| Feature | Platform Thread | Virtual Thread |
|----------|----------------|---------------|
| Introduced | Java 1.0 | Java 21 |
| Managed By | Operating System | JVM |
| Memory Usage | High | Very Low |
| Creation Cost | Expensive | Cheap |
| Scalability | Thousands | Millions |
| Best For | CPU-Bound Tasks | I/O-Bound Tasks |
| Blocking Operations | Costly | Efficient |

---

# Example Comparison

## Platform Thread

```java
Thread thread =
        new Thread(() -> {

            System.out.println("Hello");
        });

thread.start();
```

---

## Virtual Thread

```java
Thread.startVirtualThread(() -> {

    System.out.println("Hello");
});
```

Much simpler and more scalable.

---

# How Virtual Threads Work Internally

```text
Virtual Thread
       │
       ▼
JVM Scheduler
       │
       ▼
Carrier Thread (OS Thread)
```

When a virtual thread blocks:

```text
Database Call
File Read
Network Call
```

the JVM detaches it from the carrier thread and reuses the OS thread for other work.

This is the key reason virtual threads scale so well.

---

# Benefits of Virtual Threads

### High Scalability

```text
Millions of Concurrent Tasks
```

---

### Lower Memory Usage

Consumes far less memory than platform threads.

---

### Simpler Code

Avoids callback-heavy or reactive programming for many use cases.

---

### Better Resource Utilization

OS threads are reused efficiently.

---

# Interview Trick Questions

## Q1: Does a Virtual Thread Create a New OS Thread?

❌ No.

Multiple virtual threads share a small number of OS threads.

---

## Q2: Are Virtual Threads Faster Than Platform Threads?

❌ Not necessarily.

They improve:

```text
Scalability
Concurrency
Resource Usage
```

but not raw CPU speed.

---

## Q3: Are Virtual Threads Suitable for Database Calls?

✅ Yes.

Database operations are typically I/O-bound and benefit greatly from virtual threads.

---

## Q4: Which Java Version Introduced Virtual Threads?

```text
Preview: Java 19
Preview: Java 20
Standard Feature: Java 21
```

---

# Key Interview Points

- Virtual Threads were introduced as a standard feature in Java 21.
- They are lightweight threads managed by the JVM.
- Millions of virtual threads can run using a small number of OS threads.
- Ideal for I/O-bound workloads such as web requests, database access, file operations, and network calls.
- Not intended to speed up CPU-intensive computations.
- Can be created using `Thread.startVirtualThread()` or `Executors.newVirtualThreadPerTaskExecutor()`.
- Virtual threads simplify concurrent programming while providing massive scalability.

## One-Line Interview Answer

**A Virtual Thread is a lightweight JVM-managed thread introduced in Java 21 that enables highly scalable concurrent applications by allowing millions of threads to run efficiently on a small number of operating system threads, making it ideal for I/O-bound workloads.**

---

<h1 id="what-is-deadlock-how-to-avoid" style="text-decoration: underline;"> 25) What is deadlock? How to avoid?</h1>
# What is Deadlock in Java? How to Avoid It?

## What is Deadlock?

A **Deadlock** is a situation where two or more threads are blocked forever because each thread is waiting for a resource (lock) held by another thread.

As a result:

```text
Thread A waits for Thread B
Thread B waits for Thread A
```

Neither thread can proceed.

---

# Simple Definition

```text
Deadlock = Circular Waiting for Resources
```

---

# Real-Life Example

Imagine:

```text
Person A has Pen
Person B has Notebook
```

Now:

```text
Person A waits for Notebook
Person B waits for Pen
```

Both keep waiting forever.

This is a deadlock.

---

# Deadlock Example in Java

```java
public class DeadlockDemo {

    private static final Object lock1 =
            new Object();

    private static final Object lock2 =
            new Object();

    public static void main(String[] args) {

        Thread t1 = new Thread(() -> {

            synchronized (lock1) {

                System.out.println(
                        "Thread 1 acquired Lock1");

                try {
                    Thread.sleep(100);
                } catch (Exception e) {}

                synchronized (lock2) {

                    System.out.println(
                            "Thread 1 acquired Lock2");
                }
            }
        });

        Thread t2 = new Thread(() -> {

            synchronized (lock2) {

                System.out.println(
                        "Thread 2 acquired Lock2");

                try {
                    Thread.sleep(100);
                } catch (Exception e) {}

                synchronized (lock1) {

                    System.out.println(
                            "Thread 2 acquired Lock1");
                }
            }
        });

        t1.start();
        t2.start();
    }
}
```

---

# Possible Output

```text
Thread 1 acquired Lock1
Thread 2 acquired Lock2
```

Application hangs forever.

---

# Why Does Deadlock Occur?

### Thread-1

```text
Lock1 Acquired
Waiting For Lock2
```

### Thread-2

```text
Lock2 Acquired
Waiting For Lock1
```

Visualization:

```text
Thread-1
   │
   ▼
 Lock1
   │
 Waiting For Lock2
   ▲
   │
 Lock2
   │
Thread-2
```

Circular dependency causes deadlock.

---

# Four Necessary Conditions for Deadlock

Deadlock occurs when all four conditions exist simultaneously.

---

## 1. Mutual Exclusion

Resource can be used by only one thread at a time.

Example:

```java
synchronized(lock)
```

---

## 2. Hold and Wait

A thread holds one resource and waits for another.

```text
Thread-1
  Holds Lock1
  Waits For Lock2
```

---

## 3. No Preemption

Resources cannot be forcibly taken away.

Only the owner thread can release them.

---

## 4. Circular Wait

```text
Thread A → Resource B
Thread B → Resource A
```

Circular dependency exists.

---

# How to Avoid Deadlock?

## 1. Lock Ordering (Most Common Solution)

Always acquire locks in the same order.

---

### Wrong

```java
Thread-1:
Lock1 → Lock2

Thread-2:
Lock2 → Lock1
```

Deadlock possible.

---

### Correct

```java
Thread-1:
Lock1 → Lock2

Thread-2:
Lock1 → Lock2
```

Deadlock impossible.

---

### Example

```java
synchronized(lock1) {

    synchronized(lock2) {

        // Work
    }
}
```

All threads must follow the same sequence.

---

# 2. Use a Single Lock

Instead of multiple locks:

```java
synchronized(lock) {

    // Critical Section
}
```

No circular dependency.

---

# 3. Use `tryLock()`

The `Lock` interface provides:

```java
tryLock()
```

which avoids waiting forever.

---

### Example

```java
ReentrantLock lock =
        new ReentrantLock();

if(lock.tryLock()) {

    try {

        // Work

    } finally {

        lock.unlock();
    }
}
```

If the lock is unavailable:

```text
Thread Continues
No Deadlock
```

---

# 4. Use Timeout with `tryLock()`

```java
lock.tryLock(
        5,
        TimeUnit.SECONDS);
```

The thread waits only for a limited time.

---

### Example

```java
if(lock.tryLock(
        5,
        TimeUnit.SECONDS)) {

    try {

        // Work

    } finally {

        lock.unlock();
    }
}
else {

    System.out.println(
            "Lock Not Acquired");
}
```

---

# 5. Minimize Nested Locks

Bad:

```java
synchronized(lock1) {

    synchronized(lock2) {

        synchronized(lock3) {

        }
    }
}
```

Many nested locks increase deadlock risk.

---

Better:

```java
synchronized(lock1) {

    // Small critical section
}
```

---

# 6. Avoid Unnecessary Synchronization

Only synchronize critical code.

Bad:

```java
public synchronized void process() {

    // Large block of code
}
```

Better:

```java
public void process() {

    synchronized(lock) {

        // Critical section only
    }
}
```

---

# Detecting Deadlock

## Using Thread Dump

Command:

```bash
jstack <pid>
```

Output may show:

```text
Found one Java-level deadlock
```

---

## Using JVisualVM

```text
Monitor Threads
Detect Deadlocks
```

---

## Using Java Mission Control (JMC)

Enterprise-grade monitoring tool.

---

# Deadlock vs Starvation

| Feature | Deadlock | Starvation |
|----------|-----------|------------|
| Threads Block Forever | ✅ Yes | ❌ No |
| Resource Waiting | Circular | Resource Never Allocated |
| Recovery Possible | Difficult | Usually Possible |
| Cause | Circular Dependency | Unfair Scheduling |

---

# Deadlock vs Livelock

### Deadlock

```text
No Thread Moves
```

---

### Livelock

```text
Threads Keep Running
But No Progress Is Made
```

Example:

```text
Person A Moves Left
Person B Moves Right

Both Keep Adjusting Forever
```

---

# Real-World Example

### Banking Application

Thread-1:

```text
Transfer Money
Account A → Account B
```

Locks:

```text
Account A
Account B
```

---

Thread-2:

```text
Transfer Money
Account B → Account A
```

Locks:

```text
Account B
Account A
```

Deadlock can occur if lock ordering is inconsistent.

---

# Interview Trick Questions

## Q1: Can Deadlock Occur with a Single Lock?

❌ No.

Deadlock requires multiple resources and circular waiting.

---

## Q2: Is `synchronized` Responsible for Deadlock?

❌ Not directly.

Incorrect lock usage causes deadlock.

---

## Q3: What Is the Best Way to Avoid Deadlock?

✅ Acquire locks in a consistent order.

Example:

```text
Lock1 → Lock2 → Lock3
```

for every thread.

---

# Key Interview Points

- Deadlock occurs when two or more threads wait indefinitely for resources held by each other.
- Circular waiting is the primary cause.
- Four conditions are required: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.
- The most common prevention technique is consistent lock ordering.
- `tryLock()` with timeout helps avoid indefinite waiting.
- Deadlocks can be detected using `jstack`, JVisualVM, and Java Mission Control.
- Minimizing nested locks reduces deadlock risk.

## One-Line Interview Answer

**Deadlock is a situation where two or more threads wait indefinitely for resources held by each other, and it can be avoided by using consistent lock ordering, minimizing nested locks, and leveraging mechanisms like `tryLock()` with timeouts.**

---

<h1 id="what-is-synchronization" style="text-decoration: underline;"> 26) What is synchronization? </h1>
# What is Synchronization in Java?

## Definition

**Synchronization** is a mechanism in Java that controls access to shared resources by multiple threads.

It ensures that:

```text
Only One Thread
Can Access Critical Code
At A Time
```

This prevents:

- Race Conditions
- Data Inconsistency
- Thread Interference

---

# Why Do We Need Synchronization?

When multiple threads access and modify the same data simultaneously, the result may become unpredictable.

---

## Example Without Synchronization

```java
class Counter {

    int count = 0;

    public void increment() {

        count++;
    }
}
```

Multiple threads:

```java
counter.increment();
```

Internally:

```java
count++;
```

is actually:

```java
1. Read count
2. Increment value
3. Write value back
```

These operations are not atomic.

---

# Race Condition Example

Initial Value:

```text
count = 0
```

---

Thread-1:

```text
Read 0
```

Thread-2:

```text
Read 0
```

Thread-1:

```text
Increment → 1
Write → 1
```

Thread-2:

```text
Increment → 1
Write → 1
```

Expected:

```text
2
```

Actual:

```text
1
```

This is called a:

```text
Race Condition
```

---

# What is a Critical Section?

A critical section is a piece of code that accesses shared resources.

Example:

```java
count++;
```

Only one thread should execute it at a time.

---

# Synchronization Solution

```java
class Counter {

    int count = 0;

    public synchronized void increment() {

        count++;
    }
}
```

Now:

```text
One Thread Enters
Others Wait
```

Result becomes consistent.

---

# How Synchronization Works

Java uses:

```text
Monitor Lock
```

or

```text
Intrinsic Lock
```

Every object has an associated lock.

Example:

```java
synchronized(this) {
}
```

A thread must acquire the lock before entering the synchronized block.

---

# Types of Synchronization

Java supports:

1. Synchronized Method
2. Synchronized Block
3. Static Synchronization

---

# 1. Synchronized Method

Entire method is locked.

```java
public synchronized void increment() {

    count++;
}
```

Equivalent to:

```java
synchronized(this) {

    count++;
}
```

---

## Example

```java
class Printer {

    public synchronized void print() {

        System.out.println(
                Thread.currentThread().getName());
    }
}
```

Only one thread can execute `print()` at a time.

---

# 2. Synchronized Block

Locks only a specific section.

---

## Example

```java
public void increment() {

    synchronized(this) {

        count++;
    }
}
```

---

### Why Preferred?

Bad:

```java
public synchronized void process() {

    // 100 lines of code
}
```

Entire method is locked.

---

Better:

```java
public void process() {

    // Non-critical code

    synchronized(this) {

        count++;
    }

    // Non-critical code
}
```

Only critical code is locked.

Improves performance.

---

# 3. Static Synchronization

Used for static members.

Locks the class object.

---

## Example

```java
public static synchronized void print() {

    System.out.println("Printing");
}
```

Equivalent to:

```java
synchronized(MyClass.class) {

}
```

---

# Example: Synchronization in Action

```java
class Counter {

    private int count = 0;

    public synchronized void increment() {

        count++;
    }

    public int getCount() {

        return count;
    }
}
```

---

```java
public class Test {

    public static void main(String[] args)
            throws Exception {

        Counter counter = new Counter();

        Thread t1 = new Thread(() -> {

            for(int i = 0; i < 1000; i++) {

                counter.increment();
            }
        });

        Thread t2 = new Thread(() -> {

            for(int i = 0; i < 1000; i++) {

                counter.increment();
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println(
                counter.getCount());
    }
}
```

Output:

```text
2000
```

Without synchronization, the result may be less than 2000.

---

# Object Lock vs Class Lock

## Object Lock

```java
synchronized(this)
```

Locks a specific object instance.

---

## Class Lock

```java
synchronized(MyClass.class)
```

Locks the entire class.

---

# Synchronization Visualization

Without Synchronization:

```text
Thread-1 ──► Shared Data
Thread-2 ──► Shared Data
Thread-3 ──► Shared Data

Simultaneous Access
```

---

With Synchronization:

```text
Thread-1 ──► Lock Acquired
                │
                ▼
           Shared Data

Thread-2 Waiting
Thread-3 Waiting
```

---

# Advantages of Synchronization

### Thread Safety

Prevents concurrent modifications.

---

### Data Consistency

Ensures correct results.

---

### Prevents Race Conditions

Shared data remains safe.

---

### Memory Visibility

Changes made by one thread become visible to others.

---

# Disadvantages of Synchronization

### Performance Overhead

Lock acquisition and release take time.

---

### Thread Contention

Threads may spend time waiting.

---

### Deadlock Risk

Improper lock management can cause deadlocks.

---

### Reduced Parallelism

Only one thread can enter the synchronized section.

---

# Synchronization vs Volatile

| Feature | synchronized | volatile |
|----------|-------------|----------|
| Thread Safety | ✅ Yes | ❌ No |
| Mutual Exclusion | ✅ Yes | ❌ No |
| Visibility Guarantee | ✅ Yes | ✅ Yes |
| Atomic Operations | ✅ Yes | ❌ No |
| Locking Required | ✅ Yes | ❌ No |

---

## Example

```java
volatile boolean running = true;
```

Provides visibility but not synchronization.

```java
volatile int count;
count++;
```

is still unsafe.

---

# Modern Alternatives

Instead of heavy synchronization:

```java
ReentrantLock
ReadWriteLock
StampedLock
AtomicInteger
ConcurrentHashMap
```

---

## Example

```java
AtomicInteger count =
        new AtomicInteger();

count.incrementAndGet();
```

Thread-safe without explicit synchronization.

---

# Interview Trick Questions

## Q1: Can Multiple Threads Execute a Synchronized Method?

✅ Yes, if they are using different object instances.

```java
Printer p1 = new Printer();
Printer p2 = new Printer();
```

Each object has its own lock.

---

## Q2: Does Synchronization Improve Performance?

❌ No.

It improves correctness and thread safety, often at the cost of performance.

---

## Q3: Does `volatile` Replace Synchronization?

❌ No.

`volatile` provides visibility but not atomicity.

---

# Key Interview Points

- Synchronization ensures that only one thread accesses a critical section at a time.
- It prevents race conditions and data inconsistency.
- Implemented using intrinsic locks (monitors).
- Can be applied at method, block, or static level.
- Every Java object has an associated monitor lock.
- Synchronization provides both mutual exclusion and memory visibility.
- Excessive synchronization can reduce performance and cause deadlocks.

## One-Line Interview Answer

**Synchronization is a Java mechanism that controls concurrent access to shared resources by allowing only one thread at a time to execute a critical section, thereby ensuring thread safety and data consistency.**

---

<h1 id="shallow-copy-vs-deep-copy-in-java" style="text-decoration: underline;"> 27) Shallow Copy vs Deep Copy in Java</h1>

One of the most frequently asked Java interview questions is:

> What is the difference between Shallow Copy and Deep Copy?

The answer lies in how object references are copied.

---

# What is Object Copying?

Object copying means creating a new object based on an existing object.

Example:

```java
Employee emp1 = new Employee();
```

Create another object with the same data:

```java
Employee emp2 = ?;
```

There are two ways:

1. Shallow Copy
2. Deep Copy

---

# Shallow Copy

A **Shallow Copy** creates a new object, but copies the references of nested objects instead of creating new nested objects.

```text
Parent Object → New Object
Nested Objects → Shared References
```

---

# Example

```java
class Address {

    String city;

    Address(String city) {
        this.city = city;
    }
}
```

```java
class Employee implements Cloneable {

    int id;
    Address address;

    Employee(int id, Address address) {
        this.id = id;
        this.address = address;
    }

    @Override
    protected Object clone()
            throws CloneNotSupportedException {

        return super.clone();
    }
}
```

---

## Usage

```java
Address address =
        new Address("Hyderabad");

Employee emp1 =
        new Employee(101, address);

Employee emp2 =
        (Employee) emp1.clone();
```

Memory:

```text
emp1 ─────┐
          │
          ▼
      Address
      "Hyderabad"
          ▲
          │
emp2 ─────┘
```

Both objects share the same Address object.

---

# Problem with Shallow Copy

```java
emp2.address.city = "Bangalore";
```

Now:

```java
System.out.println(emp1.address.city);
```

Output:

```text
Bangalore
```

Why?

Because both employees point to the same Address object.

---

# Shallow Copy Visualization

```text
Employee-1
   │
   ▼
 Address
   ▲
   │
Employee-2
```

Shared nested object.

---

# Deep Copy

A **Deep Copy** creates a new object and also creates copies of all nested objects.

```text
Parent Object → New Object
Nested Objects → New Copies
```

No references are shared.

---

# Example

```java
class Address {

    String city;

    Address(String city) {
        this.city = city;
    }
}
```

```java
class Employee {

    int id;
    Address address;

    Employee(int id, Address address) {

        this.id = id;
        this.address = address;
    }

    public Employee(Employee other) {

        this.id = other.id;

        this.address =
                new Address(other.address.city);
    }
}
```

---

## Usage

```java
Employee emp1 =
        new Employee(
                101,
                new Address("Hyderabad"));

Employee emp2 =
        new Employee(emp1);
```

Memory:

```text
emp1 ──► Address("Hyderabad")

emp2 ──► Address("Hyderabad")
```

Different Address objects.

---

# Modifying Deep Copy

```java
emp2.address.city = "Bangalore";
```

Now:

```java
System.out.println(emp1.address.city);
```

Output:

```text
Hyderabad
```

Reason:

```text
Separate Address Objects
```

---

# Deep Copy Visualization

```text
emp1 ──► Address("Hyderabad")

emp2 ──► Address("Hyderabad")
```

No shared references.

---

# Comparison Example

## Shallow Copy

```java
Employee emp2 =
        (Employee) emp1.clone();
```

```text
Address Object Shared
```

---

## Deep Copy

```java
Employee emp2 =
        new Employee(emp1);
```

```text
Address Object Copied
```

---

# Using Cloneable for Deep Copy

```java
@Override
protected Object clone()
        throws CloneNotSupportedException {

    Employee cloned =
            (Employee) super.clone();

    cloned.address =
            new Address(this.address.city);

    return cloned;
}
```

Now nested objects are copied too.

---

# Shallow Copy vs Deep Copy

| Feature | Shallow Copy | Deep Copy |
|----------|-------------|------------|
| Parent Object Copied | ✅ Yes | ✅ Yes |
| Nested Objects Copied | ❌ No | ✅ Yes |
| References Shared | ✅ Yes | ❌ No |
| Memory Usage | Low | Higher |
| Performance | Faster | Slower |
| Side Effects | Possible | No |
| Independence | Low | High |

---

# Real-World Example

## Shallow Copy

```text
Employee
   │
   ▼
Address
```

Two employees share one address.

Changing one affects the other.

---

## Deep Copy

```text
Employee-1 → Address-1

Employee-2 → Address-2
```

Changes remain independent.

---

# Common Ways to Create Deep Copies

### Copy Constructor

```java
public Employee(Employee other) {
}
```

Most common approach.

---

### Clone Method

```java
@Override
protected Object clone()
```

Requires manual handling of nested objects.

---

### Serialization

```java
ObjectOutputStream
ObjectInputStream
```

Can create a complete deep copy of an object graph.

---

# Serialization-Based Deep Copy Example

```java
Employee copy =
        SerializationUtils.clone(employee);
```

Useful for complex object structures.

---

# Interview Trick Questions

## Q1: Does `Object.clone()` Perform Deep Copy?

❌ No.

Default implementation performs:

```text
Shallow Copy
```

only.

---

## Q2: Which Copy Type Is Faster?

✅ Shallow Copy

Because it copies references only.

---

## Q3: Which Copy Type Is Safer?

✅ Deep Copy

Because objects are completely independent.

---

## Q4: Does String Need Deep Copy?

❌ Usually No.

```java
String
```

is immutable.

Sharing references is safe.

---

# Common Interview Scenario

```java
Address address =
        new Address("Delhi");

Employee e1 =
        new Employee(101, address);

Employee e2 =
        (Employee) e1.clone();

e2.address.city = "Mumbai";
```

Question:

```text
What happens to e1?
```

Answer:

```text
If clone() is shallow,
e1.address.city becomes Mumbai.
```

---

# Key Interview Points

- Shallow copy creates a new object but shares references of nested objects.
- Deep copy creates a new object and copies all nested objects.
- Default `Object.clone()` performs shallow copy.
- Deep copy prevents unintended side effects.
- Copy constructors are a common way to implement deep copy.
- Deep copy consumes more memory but provides object independence.
- Immutable objects like String do not require deep copying.

## One-Line Interview Answer

**A shallow copy creates a new object while sharing references to nested objects, whereas a deep copy creates a completely independent copy by duplicating both the object and all objects it references.**

---

<h1 id="what-are-annotations-in-java-how-to-create-a-custom-annotation" style="text-decoration: underline;"> 28) What Are Annotations in Java? How to Create a Custom Annotation?</h1>

## What Are Annotations?

Annotations are metadata that provide additional information about classes, methods, variables, parameters, or packages.

They do not directly affect program execution but are used by:

- Compiler
- JVM
- Frameworks
- Tools

to perform special processing.

---

# Simple Definition

```text
Annotation = Metadata About Code
```

Example:

```java
@Override
public String toString() {
    return "Employee";
}
```

Here:

```java
@Override
```

is an annotation.

---

# Why Are Annotations Used?

Annotations help:

- Reduce boilerplate code
- Configure applications
- Perform compile-time checks
- Enable runtime processing
- Support dependency injection
- Simplify framework development

---

# Common Built-in Annotations

## 1. @Override

Indicates a method overrides a parent method.

```java
class Animal {

    void sound() {
    }
}
```

```java
class Dog extends Animal {

    @Override
    void sound() {

        System.out.println("Bark");
    }
}
```

Benefit:

```text
Compiler verifies method overriding.
```

---

## 2. @Deprecated

Marks an element as obsolete.

```java
@Deprecated
public void oldMethod() {
}
```

Usage:

```java
oldMethod();
```

Compiler Warning:

```text
Uses deprecated API
```

---

## 3. @SuppressWarnings

Suppresses compiler warnings.

```java
@SuppressWarnings("unchecked")
List list = new ArrayList();
```

---

## 4. @FunctionalInterface

Indicates an interface contains exactly one abstract method.

```java
@FunctionalInterface
interface Calculator {

    int add(int a, int b);
}
```

---

# Framework Annotations

Popular frameworks heavily use annotations.

Example:

```java
@SpringBootApplication
```

```java
@RestController
```

```java
@Service
```

```java
@Autowired
```

These annotations help frameworks generate behavior automatically.

---

# Annotation Syntax

```java
@AnnotationName
```

Example:

```java
@Override
```

---

# Annotation with Values

```java
@author(name = "Amritanka")
```

---

# Types of Annotations

Java supports:

1. Marker Annotation
2. Single Value Annotation
3. Multi Value Annotation

---

# 1. Marker Annotation

Contains no members.

Example:

```java
@Override
```

Custom Example:

```java
@Important
```

---

# 2. Single Value Annotation

Contains one value.

```java
@author(name = "John")
```

---

# 3. Multi Value Annotation

Contains multiple attributes.

```java
@Employee(
    id = 101,
    name = "John"
)
```

---

# How to Create a Custom Annotation?

Use:

```java
@interface
```

keyword.

---

# Example 1: Simple Marker Annotation

```java
@interface Important {
}
```

Usage:

```java
@Important
class Employee {
}
```

---

# Example 2: Annotation with Fields

```java
@interface Author {

    String name();
}
```

Usage:

```java
@Author(name = "Amritanka")
class Employee {
}
```

---

# Example 3: Multiple Attributes

```java
@interface EmployeeInfo {

    int id();

    String name();

    String department();
}
```

Usage:

```java
@EmployeeInfo(
        id = 101,
        name = "John",
        department = "IT"
)
class Employee {
}
```

---

# Annotation Members

Annotation members look like methods.

Example:

```java
@interface Author {

    String name();

    int version();
}
```

Usage:

```java
@Author(
        name = "John",
        version = 1
)
```

---

# Default Values

You can provide default values.

```java
@interface Author {

    String name();

    int version() default 1;
}
```

Usage:

```java
@Author(name = "John")
```

Output:

```text
version = 1
```

---

# Meta Annotations

Meta annotations define how custom annotations behave.

Most important:

- @Target
- @Retention
- @Documented
- @Inherited

---

# 1. @Target

Specifies where the annotation can be applied.

Example:

```java
@Target(ElementType.METHOD)
```

Annotation can be used only on methods.

---

## Common Targets

```java
TYPE
METHOD
FIELD
PARAMETER
CONSTRUCTOR
PACKAGE
```

Example:

```java
@Target(ElementType.TYPE)
```

```java
@MyAnnotation
class Employee {
}
```

---

# 2. @Retention

Specifies how long the annotation is retained.

---

## SOURCE

```java
@Retention(RetentionPolicy.SOURCE)
```

Available only during compilation.

Example:

```java
@Override
```

---

## CLASS

```java
@Retention(RetentionPolicy.CLASS)
```

Stored in bytecode.

Not available at runtime.

---

## RUNTIME

```java
@Retention(RetentionPolicy.RUNTIME)
```

Available through Reflection.

Most custom framework annotations use this.

---

# Example Custom Annotation

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface Developer {

    String name();

    int experience();
}
```

Usage:

```java
@Developer(
        name = "Amritanka",
        experience = 5
)
class Employee {
}
```

---

# Reading Annotation Using Reflection

```java
Class<Employee> clazz =
        Employee.class;

Developer developer =
        clazz.getAnnotation(
                Developer.class);

System.out.println(
        developer.name());

System.out.println(
        developer.experience());
```

Output:

```text
Amritanka
5
```

---

# Complete Example

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface EmployeeInfo {

    int id();

    String name();
}
```

```java
@EmployeeInfo(
        id = 101,
        name = "John"
)
class Employee {
}
```

```java
public class Test {

    public static void main(String[] args) {

        Class<Employee> clazz =
                Employee.class;

        EmployeeInfo info =
                clazz.getAnnotation(
                        EmployeeInfo.class);

        System.out.println(info.id());
        System.out.println(info.name());
    }
}
```

Output:

```text
101
John
```

---

# Real-World Example (Spring Boot)

```java
@RestController
class UserController {
}
```

Spring scans this annotation at runtime and automatically creates a REST endpoint.

Similarly:

```java
@Service
```

registers a service bean.

```java
@Autowired
```

performs dependency injection.

---

# Annotation Processing Flow

```text
Source Code
     │
     ▼
 Annotation
     │
     ▼
 Compiler / Framework
     │
     ▼
 Additional Behavior
```

Example:

```java
@Service
```

↓

```text
Spring Creates Bean Automatically
```

---

# Annotations vs Comments

| Feature | Annotation | Comment |
|-----------|------------|----------|
| Available at Runtime | ✅ Yes | ❌ No |
| Used by Compiler | ✅ Yes | ❌ No |
| Used by Frameworks | ✅ Yes | ❌ No |
| Affects Behavior | ✅ Indirectly | ❌ No |
| Metadata Support | ✅ Yes | ❌ No |

---

# Interview Trick Questions

## Q1: Can Annotations Change Program Logic?

❌ Not directly.

They provide metadata that frameworks or tools can use.

---

## Q2: Which Retention Policy Is Needed for Reflection?

✅

```java
RetentionPolicy.RUNTIME
```

---

## Q3: How Do You Create a Custom Annotation?

Using:

```java
@interface
```

keyword.

---

## Q4: Can Annotation Members Have Parameters?

❌ No.

Members can only define return types.

Example:

```java
String name();
```

Valid.

```java
String name(String x);
```

Invalid.

---

# Key Interview Points

- Annotations provide metadata about code.
- Common built-in annotations are `@Override`, `@Deprecated`, `@SuppressWarnings`, and `@FunctionalInterface`.
- Custom annotations are created using the `@interface` keyword.
- `@Target` specifies where an annotation can be used.
- `@Retention` specifies how long an annotation is retained.
- `RetentionPolicy.RUNTIME` is required for reflection-based processing.
- Frameworks like Spring heavily rely on annotations for configuration and dependency injection.
- Annotations reduce boilerplate code and improve readability.

## One-Line Interview Answer

**Annotations are metadata used to provide additional information to the compiler, JVM, or frameworks, and custom annotations can be created using the `@interface` keyword along with meta-annotations such as `@Target` and `@Retention`.**
---

<h1 id="what-is-the-java-memory-model-jmm" style="text-decoration: underline;"> 29) What is the Java Memory Model (JMM)?</h1>

## Definition

The **Java Memory Model (JMM)** is a specification that defines how threads interact with memory in Java.

It describes:

- How variables are stored in memory
- How threads read and write shared variables
- How changes made by one thread become visible to other threads
- Rules for synchronization and concurrency

---

# Simple Definition

```text
JMM defines the rules for
communication between threads
through shared memory.
```

Without JMM, multi-threaded programs could behave unpredictably across different CPUs, operating systems, and JVM implementations.

---

# Why Do We Need JMM?

Modern computers have:

- Multiple CPUs/Cores
- CPU Caches
- Main Memory (RAM)

Each thread may work with its own cached copy of variables.

Example:

```java
int counter = 0;
```

Thread-1 updates:

```java
counter = 10;
```

Thread-2 may still see:

```java
counter = 0;
```

because the updated value might remain in Thread-1's cache.

JMM defines rules to ensure correct visibility.

---

# Memory Structure in JMM

```text
                 Main Memory
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼

 Thread-1        Thread-2        Thread-3
 Working         Working         Working
 Memory          Memory          Memory
```

---

# Main Memory

Stores:

```text
Instance Variables
Static Variables
Array Elements
```

Shared by all threads.

---

# Working Memory

Each thread has its own working memory.

Contains:

```text
Local Copies of Variables
CPU Cache Data
```

Threads operate on their local copies first.

---

# Example of Visibility Problem

```java
class SharedData {

    boolean flag = false;
}
```

Thread-1:

```java
flag = true;
```

Thread-2:

```java
while(!flag) {
}
```

Expected:

```text
Loop Stops
```

Possible Reality:

```text
Loop Never Stops
```

because Thread-2 may not see the updated value.

This is called:

```text
Visibility Problem
```

---

# Key Responsibilities of JMM

JMM mainly addresses:

1. Visibility
2. Atomicity
3. Ordering

---

# 1. Visibility

### Problem

One thread updates a variable.

Other threads may not immediately see the update.

---

## Example

```java
boolean running = true;
```

Thread-1:

```java
running = false;
```

Thread-2:

```java
while(running) {
}
```

Without synchronization:

```text
Thread-2 may never see false.
```

---

## Solution

Use:

```java
volatile
```

```java
volatile boolean running = true;
```

Now updates become visible to all threads.

---

# 2. Atomicity

Atomic means:

```text
Complete Operation
Or
No Operation
```

---

## Example

```java
count++;
```

Looks like one operation but actually:

```text
1. Read
2. Increment
3. Write
```

Multiple threads can interfere.

---

### Race Condition

Thread-1:

```text
Read 0
```

Thread-2:

```text
Read 0
```

Thread-1:

```text
Write 1
```

Thread-2:

```text
Write 1
```

Expected:

```text
2
```

Actual:

```text
1
```

---

## Solution

Use:

```java
synchronized
```

or

```java
AtomicInteger
```

---

# 3. Ordering

Compilers and CPUs may reorder instructions for performance.

Example:

```java
int a = 10;
boolean ready = true;
```

May internally execute as:

```java
ready = true;
a = 10;
```

This is called:

```text
Instruction Reordering
```

---

# Why Is Reordering Dangerous?

Thread-1:

```java
a = 10;
ready = true;
```

Thread-2:

```java
if(ready) {
    System.out.println(a);
}
```

Expected:

```text
10
```

Possible output:

```text
0
```

due to instruction reordering.

---

# Happens-Before Relationship

The most important JMM concept.

---

## Definition

A **Happens-Before** relationship guarantees that:

```text
Changes made by Thread-A
Become Visible To
Thread-B
```

---

# Important Happens-Before Rules

---

## Rule 1: Program Order Rule

Within a thread:

```java
a = 10;
b = 20;
```

Execution order is guaranteed.

---

## Rule 2: Monitor Lock Rule

Unlock happens-before subsequent lock.

Example:

```java
synchronized(lock) {
}
```

Changes become visible to the next thread acquiring the same lock.

---

## Rule 3: Volatile Variable Rule

Write to volatile:

```java
flag = true;
```

happens-before

```java
if(flag)
```

read in another thread.

---

## Rule 4: Thread Start Rule

```java
thread.start();
```

happens-before actions inside the thread.

---

## Rule 5: Thread Join Rule

```java
thread.join();
```

guarantees visibility of completed thread actions.

---

# JMM and `volatile`

Example:

```java
volatile boolean running = true;
```

Benefits:

```text
Visibility Guaranteed
Instruction Reordering Prevented
```

---

## What Volatile Does NOT Provide

```java
volatile int count;
count++;
```

Still unsafe.

Because:

```text
Atomicity Not Guaranteed
```

---

# JMM and `synchronized`

Example:

```java
synchronized(lock) {

    count++;
}
```

Provides:

```text
Visibility
Atomicity
Ordering
```

All three.

---

# JMM and Atomic Classes

```java
AtomicInteger count =
        new AtomicInteger();
```

```java
count.incrementAndGet();
```

Provides thread-safe atomic operations without explicit locking.

---

# JMM Visualization

Without Synchronization:

```text
Thread-1 Cache
      │
      ▼
 counter = 10

Thread-2 Cache
      │
      ▼
 counter = 0
```

Inconsistent view.

---

With Synchronization / Volatile:

```text
Thread-1
     │
     ▼
 Main Memory
     ▲
     │
Thread-2
```

Both threads see the latest value.

---

# Common Concurrency Problems Solved by JMM

### Visibility Problem

```text
Thread Cannot See Updates
```

Solved by:

```java
volatile
synchronized
```

---

### Race Condition

```text
Multiple Threads Modify Data
```

Solved by:

```java
synchronized
Atomic Classes
Locks
```

---

### Instruction Reordering

```text
Unexpected Execution Order
```

Solved by:

```java
volatile
synchronized
```

---

# Real-World Example

```java
class Server {

    private volatile boolean running = true;

    public void stop() {

        running = false;
    }
}
```

Without `volatile`:

```text
Server Thread May Never Stop
```

With `volatile`:

```text
All Threads See Latest Value
```

---

# JMM vs JVM Memory Areas

Many developers confuse these concepts.

---

## JMM

Defines:

```text
Thread Communication Rules
Visibility
Atomicity
Ordering
```

---

## JVM Memory Areas

Defines:

```text
Heap
Stack
Method Area
Metaspace
```

---

### Comparison

| Feature | JMM | JVM Memory Areas |
|----------|-----|------------------|
| Purpose | Concurrency Rules | Memory Structure |
| Focus | Threads | Memory Layout |
| Deals With | Visibility & Synchronization | Heap, Stack, Metaspace |
| Part Of | Concurrency Model | JVM Architecture |

---

# Interview Trick Questions

## Q1: Is JMM a Physical Memory Structure?

❌ No.

It is a specification that defines memory interaction rules.

---

## Q2: Does `volatile` Guarantee Atomicity?

❌ No.

```java
count++;
```

remains unsafe even if `count` is volatile.

---

## Q3: Which Keyword Provides Visibility and Atomicity?

✅

```java
synchronized
```

---

## Q4: What Are the Three Main JMM Guarantees?

```text
Visibility
Atomicity
Ordering
```

---

# Key Interview Points

- JMM defines how threads interact through memory.
- It ensures consistent behavior across JVMs and hardware architectures.
- JMM addresses three major concerns: Visibility, Atomicity, and Ordering.
- Each thread has its own working memory and accesses shared data through main memory.
- `volatile` guarantees visibility and prevents instruction reordering.
- `synchronized` guarantees visibility, atomicity, and ordering.
- Happens-Before is the core concept used by JMM to guarantee memory consistency.
- JMM is different from JVM memory areas such as Heap and Stack.

## One-Line Interview Answer

**The Java Memory Model (JMM) is the specification that defines how threads interact with shared memory, ensuring visibility, atomicity, and ordering of operations so that multithreaded Java programs behave consistently across different JVMs and hardware platforms.**

---

<h1 id="what-is-reflection-in-java" style="text-decoration: underline;"> 30) What is Reflection in Java?</h1>

## Definition

**Reflection** is a powerful feature in Java that allows a program to inspect, analyze, and manipulate its own structure at runtime.

Using Reflection, we can:

- Inspect classes
- Access fields and methods
- Create objects dynamically
- Invoke methods dynamically
- Access private members
- Read annotations

without knowing the details at compile time.

---

# Simple Definition

```text
Reflection allows a Java program
to examine and modify classes,
methods, fields, and constructors
at runtime.
```

---

# Why Do We Need Reflection?

Normally, Java code is accessed directly:

```java
Employee emp = new Employee();
emp.display();
```

But sometimes:

- Class name is known only at runtime
- Methods need to be called dynamically
- Frameworks need to create objects automatically

Reflection solves these problems.

---

# Reflection API

Java provides Reflection through:

```java
java.lang.reflect
```

Important classes:

```java
Class
Method
Field
Constructor
Modifier
```

---

# Getting Class Information

Consider:

```java
class Employee {

    private int id;

    public void display() {
        System.out.println("Employee");
    }
}
```

---

## Method 1: Using `.class`

```java
Class<Employee> clazz =
        Employee.class;
```

---

## Method 2: Using Object

```java
Employee emp = new Employee();

Class<?> clazz =
        emp.getClass();
```

---

## Method 3: Using Class Name

```java
Class<?> clazz =
        Class.forName("Employee");
```

Useful when the class name is determined at runtime.

---

# Getting Class Details

```java
Class<?> clazz =
        Employee.class;

System.out.println(
        clazz.getName());
```

Output:

```text
Employee
```

---

# Getting Methods

```java
Method[] methods =
        clazz.getDeclaredMethods();

for(Method method : methods) {

    System.out.println(
            method.getName());
}
```

Output:

```text
display
```

---

# Getting Fields

```java
Field[] fields =
        clazz.getDeclaredFields();

for(Field field : fields) {

    System.out.println(
            field.getName());
}
```

Output:

```text
id
```

---

# Getting Constructors

```java
Constructor<?>[] constructors =
        clazz.getDeclaredConstructors();
```

---

# Creating Objects Dynamically

Normal way:

```java
Employee emp =
        new Employee();
```

Reflection way:

```java
Class<?> clazz =
        Employee.class;

Object obj =
        clazz.getDeclaredConstructor()
             .newInstance();
```

Object is created at runtime.

---

# Invoking Methods Dynamically

Class:

```java
class Employee {

    public void display() {

        System.out.println(
                "Hello Reflection");
    }
}
```

Reflection:

```java
Method method =
        clazz.getMethod(
                "display");

method.invoke(obj);
```

Output:

```text
Hello Reflection
```

---

# Accessing Private Fields

Class:

```java
class Employee {

    private String name =
            "John";
}
```

Reflection:

```java
Field field =
        clazz.getDeclaredField(
                "name");

field.setAccessible(true);

System.out.println(
        field.get(obj));
```

Output:

```text
John
```

---

# Modifying Private Fields

```java
field.setAccessible(true);

field.set(obj, "Amritanka");
```

Now:

```java
System.out.println(
        field.get(obj));
```

Output:

```text
Amritanka
```

---

# Accessing Private Methods

```java
Method method =
        clazz.getDeclaredMethod(
                "privateMethod");

method.setAccessible(true);

method.invoke(obj);
```

Even private methods can be invoked using Reflection.

---

# Reading Annotations

Custom Annotation:

```java
@Retention(
        RetentionPolicy.RUNTIME)
@interface Author {

    String name();
}
```

Usage:

```java
@Author(name = "Amritanka")
class Employee {
}
```

Reading annotation:

```java
Author author =
        clazz.getAnnotation(
                Author.class);

System.out.println(
        author.name());
```

Output:

```text
Amritanka
```

---

# Complete Example

```java
class Employee {

    private String name =
            "John";

    public void display() {

        System.out.println(
                "Employee Method");
    }
}
```

```java
public class Test {

    public static void main(String[] args)
            throws Exception {

        Class<?> clazz =
                Employee.class;

        Object obj =
                clazz.getDeclaredConstructor()
                     .newInstance();

        Method method =
                clazz.getMethod(
                        "display");

        method.invoke(obj);

        Field field =
                clazz.getDeclaredField(
                        "name");

        field.setAccessible(true);

        System.out.println(
                field.get(obj));
    }
}
```

Output:

```text
Employee Method
John
```

---

# How Reflection Works

```text
Class
  │
  ▼
Reflection API
  │
  ├── Fields
  ├── Methods
  ├── Constructors
  └── Annotations
  │
  ▼
Runtime Access & Manipulation
```

---

# Real-World Uses of Reflection

### Spring Framework

```java
@Service
@RestController
@Autowired
```

Spring scans classes and creates beans using Reflection.

---

### Hibernate

```java
@Entity
```

Uses Reflection to map Java objects to database tables.

---

### JUnit

```java
@Test
```

Discovers and executes test methods dynamically.

---

### Jackson

```java
ObjectMapper
```

Uses Reflection to convert:

```text
Java Object ↔ JSON
```

---

# Advantages of Reflection

### Dynamic Object Creation

Classes can be instantiated at runtime.

---

### Dynamic Method Invocation

Methods can be called without compile-time knowledge.

---

### Framework Development

Essential for frameworks like Spring and Hibernate.

---

### Annotation Processing

Enables metadata-driven programming.

---

# Disadvantages of Reflection

### Performance Overhead

Slower than direct method calls.

---

### Breaks Encapsulation

Can access private fields and methods.

---

### Runtime Errors

Errors appear at runtime rather than compile time.

Example:

```java
clazz.getMethod("invalidMethod");
```

Throws:

```text
NoSuchMethodException
```

---

### Security Concerns

Can expose internal implementation details.

---

# Reflection vs Normal Access

| Feature | Normal Access | Reflection |
|----------|--------------|------------|
| Compile-Time Safety | ✅ Yes | ❌ No |
| Performance | Fast | Slower |
| Access Private Members | ❌ No | ✅ Yes |
| Dynamic Behavior | Limited | High |
| Framework Usage | Limited | Extensive |

---

# Interview Trick Questions

## Q1: Which Class Is the Entry Point of Reflection?

```java
java.lang.Class
```

---

## Q2: Can Reflection Access Private Members?

✅ Yes

Using:

```java
setAccessible(true);
```

---

## Q3: Is Reflection Faster Than Direct Method Calls?

❌ No

Reflection introduces runtime overhead.

---

## Q4: Which Package Contains Reflection APIs?

```java
java.lang.reflect
```

---

# Key Interview Points

- Reflection allows runtime inspection and manipulation of Java classes.
- It is implemented using the `java.lang.reflect` package.
- Reflection can access fields, methods, constructors, and annotations.
- Objects can be created dynamically using Reflection.
- Private members can be accessed using `setAccessible(true)`.
- Reflection is heavily used by Spring, Hibernate, JUnit, Jackson, and Mockito.
- Reflection provides flexibility but sacrifices some performance and compile-time safety.

## One-Line Interview Answer

**Reflection is a Java feature that enables a program to inspect and manipulate classes, methods, fields, constructors, and annotations at runtime, making it a core technology behind frameworks like Spring and Hibernate.**

---

<h1 id="what-does-join-do-in-java" style="text-decoration: underline;"> 31) What Does `join()` Do in Java?</h1>

## Definition

The `join()` method is used to make one thread wait for the completion of another thread.

In simple words:

```text
join() tells the current thread
to wait until the target thread
finishes execution.
```

---

# Why Do We Need `join()`?

By default, threads execute independently.

Example:

```java
Thread t1 = new Thread(task);

t1.start();

System.out.println("Main Thread Finished");
```

Possible Output:

```text
Main Thread Finished
Task Executed
```

The main thread does not wait for `t1`.

Sometimes we need:

```text
Complete Child Thread First
Then Continue Main Thread
```

This is where `join()` is useful.

---

# Simple Example

```java
class MyTask extends Thread {

    @Override
    public void run() {

        System.out.println(
                "Task Started");

        try {

            Thread.sleep(2000);

        } catch (InterruptedException e) {

            e.printStackTrace();
        }

        System.out.println(
                "Task Completed");
    }
}
```

---

```java
public class Test {

    public static void main(String[] args)
            throws Exception {

        MyTask thread =
                new MyTask();

        thread.start();

        thread.join();

        System.out.println(
                "Main Thread Completed");
    }
}
```

Output:

```text
Task Started
Task Completed
Main Thread Completed
```

---

# What Happens Internally?

```text
Main Thread
     │
     ▼
thread.start()
     │
     ▼
thread.join()
     │
     ▼
WAIT
     │
     ▼
Thread Finishes
     │
     ▼
Main Thread Resumes
```

---

# Without `join()`

```java
thread.start();

System.out.println(
        "Main Thread Completed");
```

Possible Output:

```text
Main Thread Completed
Task Started
Task Completed
```

Order is unpredictable.

---

# With `join()`

```java
thread.start();

thread.join();

System.out.println(
        "Main Thread Completed");
```

Output:

```text
Task Started
Task Completed
Main Thread Completed
```

Guaranteed order.

---

# Multiple Threads Example

```java
Thread t1 = new Thread(() -> {

    System.out.println("T1");
});

Thread t2 = new Thread(() -> {

    System.out.println("T2");
});
```

---

```java
t1.start();

t1.join();

t2.start();

t2.join();

System.out.println("Done");
```

Output:

```text
T1
T2
Done
```

---

# `join()` with Timeout

Java provides:

```java
join(long millis)
```

The current thread waits only for a specified time.

---

## Example

```java
thread.join(3000);
```

Meaning:

```text
Wait Maximum 3 Seconds
```

If the thread completes earlier:

```text
Continue Immediately
```

If not:

```text
Resume After 3 Seconds
```

---

# Example

```java
thread.start();

thread.join(1000);

System.out.println(
        "Main Continues");
```

The main thread waits for at most 1 second.

---

# Overloaded Versions of `join()`

### Wait Until Thread Completes

```java
join()
```

---

### Wait for Specific Milliseconds

```java
join(long millis)
```

---

### Wait for Milliseconds and Nanoseconds

```java
join(long millis,
     int nanos)
```

---

# Real-World Example

Suppose:

```text
Thread-1
Downloads File
```

Main Thread:

```text
Process File
```

You must wait until download finishes.

```java
downloadThread.start();

downloadThread.join();

processFile();
```

Without `join()`:

```text
Processing may start
before download completes.
```

---

# Common Use Cases

### Task Dependencies

```text
Task-2 depends on Task-1
```

---

### Data Processing Pipelines

```text
Read File
↓
Process File
↓
Generate Report
```

---

### Parallel Computation

Start multiple threads and wait for all results.

---

### Application Shutdown

Wait for worker threads to finish.

---

# Example: Waiting for Multiple Threads

```java
Thread t1 =
        new Thread(() -> {

            System.out.println("T1 Done");
        });

Thread t2 =
        new Thread(() -> {

            System.out.println("T2 Done");
        });
```

---

```java
t1.start();
t2.start();

t1.join();
t2.join();

System.out.println(
        "All Threads Finished");
```

Output:

```text
T1 Done
T2 Done
All Threads Finished
```

---

# Relationship with Thread States

Before `join()`:

```text
Main Thread → RUNNING
Worker Thread → RUNNING
```

During `join()`:

```text
Main Thread → WAITING
Worker Thread → RUNNING
```

After worker finishes:

```text
Main Thread → RUNNABLE
```

---

# `join()` vs `sleep()`

| Feature | join() | sleep() |
|----------|---------|---------|
| Purpose | Wait for another thread | Pause current thread |
| Depends on Other Thread | ✅ Yes | ❌ No |
| Releases CPU | ✅ Yes | ✅ Yes |
| Wait Time | Until thread finishes | Fixed duration |
| Thread Coordination | ✅ Yes | ❌ No |

---

## Example of `sleep()`

```java
Thread.sleep(2000);
```

Meaning:

```text
Pause Current Thread
For 2 Seconds
```

---

## Example of `join()`

```java
thread.join();
```

Meaning:

```text
Wait Until Thread Completes
```

---

# Internal Working

Internally, `join()` uses:

```java
wait()
notifyAll()
```

The calling thread enters a waiting state until the target thread terminates.

---

# Interview Trick Questions

## Q1: Which Thread Waits in `join()`?

Example:

```java
t1.join();
```

The thread that calls `join()` waits.

Typically:

```text
Main Thread Waits
```

---

## Q2: Does `join()` Stop the Target Thread?

❌ No.

It only pauses the calling thread.

---

## Q3: Can `join()` Throw an Exception?

✅ Yes.

```java
InterruptedException
```

must be handled.

Example:

```java
try {

    thread.join();

} catch (InterruptedException e) {

    e.printStackTrace();
}
```

---

## Q4: Does `join()` Guarantee Execution Order?

✅ Yes.

It ensures the calling thread waits until the target thread completes.

---

# Key Interview Points

- `join()` makes the current thread wait for another thread to finish.
- It is commonly used for thread coordination.
- The calling thread enters the WAITING state.
- `join()` does not stop or pause the target thread.
- Overloaded versions support timeouts.
- Internally, `join()` uses `wait()` and `notifyAll()`.
- Frequently used when one task depends on the completion of another.

## One-Line Interview Answer

**The `join()` method is used to make the current thread wait until another thread completes its execution, ensuring proper coordination and execution order between threads.**

---

<h1 id="benefits-of-java-stream-api" style="text-decoration: underline;"> 32) Benefits of Java Stream API</h1>

## What is Stream API?

The **Java Stream API**, introduced in **Java 8**, provides a functional approach to processing collections of data.

It allows developers to perform operations such as:

- Filtering
- Mapping
- Sorting
- Grouping
- Aggregation

in a concise and declarative manner.

Example:

```java
List<String> names =
        Arrays.asList(
                "John",
                "Alex",
                "David");

names.stream()
     .filter(name -> name.startsWith("A"))
     .forEach(System.out::println);
```

Output:

```text
Alex
```

---

# Why Was Stream API Introduced?

Before Java 8, collection processing required:

```java
for loops
nested loops
manual filtering
temporary collections
```

Example:

```java
List<String> result =
        new ArrayList<>();

for(String name : names) {

    if(name.startsWith("A")) {

        result.add(name);
    }
}
```

The Stream API makes the same operation simpler and more readable.

---

# Major Benefits of Stream API

---

# 1. Less Boilerplate Code

Without Streams:

```java
List<Integer> evenNumbers =
        new ArrayList<>();

for(Integer number : numbers) {

    if(number % 2 == 0) {

        evenNumbers.add(number);
    }
}
```

With Streams:

```java
List<Integer> evenNumbers =
        numbers.stream()
               .filter(n -> n % 2 == 0)
               .toList();
```

Benefits:

```text
Less Code
Better Readability
```

---

# 2. Improved Readability

Streams describe:

```text
WHAT to do
```

instead of:

```text
HOW to do it
```

Example:

```java
employees.stream()
         .filter(Employee::isActive)
         .map(Employee::getName)
         .toList();
```

Easy to understand.

---

# 3. Functional Programming Support

Streams work seamlessly with:

```java
Lambda Expressions
Method References
Functional Interfaces
```

Example:

```java
names.stream()
     .forEach(System.out::println);
```

Promotes a functional programming style.

---

# 4. Internal Iteration

Traditional Collection:

```java
for(Employee e : employees) {

}
```

Developer controls iteration.

---

Stream:

```java
employees.stream()
         .forEach(System.out::println);
```

JVM controls iteration.

Benefits:

```text
Cleaner Code
Better Optimization
```

---

# 5. Easy Data Transformation

Using `map()`:

```java
List<String> names =
        employees.stream()
                 .map(Employee::getName)
                 .toList();
```

Transforms:

```text
Employee → String
```

with minimal code.

---

# 6. Powerful Filtering

Using `filter()`:

```java
employees.stream()
         .filter(emp ->
                 emp.getSalary() > 50000)
         .toList();
```

Easy to express business rules.

---

# 7. Efficient Aggregation

Find total salary:

```java
double totalSalary =
        employees.stream()
                 .mapToDouble(
                         Employee::getSalary)
                 .sum();
```

Without loops.

---

# 8. Built-in Sorting

```java
employees.stream()
         .sorted(
                 Comparator.comparing(
                         Employee::getName))
         .toList();
```

Readable and concise.

---

# 9. Easy Grouping

Using `Collectors.groupingBy()`:

```java
Map<String, List<Employee>> result =
        employees.stream()
                 .collect(
                         Collectors.groupingBy(
                                 Employee::getDepartment));
```

Output:

```text
IT      → Employees
HR      → Employees
Finance → Employees
```

Very useful in reporting applications.

---

# 10. Easy Partitioning

```java
Map<Boolean, List<Employee>> result =
        employees.stream()
                 .collect(
                         Collectors.partitioningBy(
                                 emp ->
                                 emp.getSalary() > 50000));
```

Output:

```text
true  → High Salary Employees
false → Others
```

---

# 11. Supports Parallel Processing

One of the biggest advantages.

Traditional loop:

```java
for(Employee e : employees) {

}
```

Runs sequentially.

---

Using Parallel Stream:

```java
employees.parallelStream()
         .forEach(System.out::println);
```

Uses multiple CPU cores automatically.

Benefits:

```text
Better Performance
For Large Data Sets
```

---

# Example

```java
long count =
        employees.parallelStream()
                 .filter(
                         Employee::isActive)
                 .count();
```

Multiple threads process data simultaneously.

---

# 12. Lazy Evaluation

Intermediate operations are not executed immediately.

Example:

```java
Stream<Integer> stream =
        numbers.stream()
               .filter(n -> n > 10);
```

Nothing executes yet.

Execution starts only when a terminal operation is called.

Example:

```java
stream.count();
```

Benefits:

```text
Reduced Processing
Better Performance
```

---

# 13. Pipeline Processing

Streams allow chaining operations.

Example:

```java
List<String> result =
        employees.stream()
                 .filter(Employee::isActive)
                 .sorted(
                         Comparator.comparing(
                                 Employee::getName))
                 .map(Employee::getName)
                 .toList();
```

Processing pipeline:

```text
Filter
  ↓
Sort
  ↓
Map
  ↓
Collect
```

Readable and maintainable.

---

# 14. No Need for Temporary Collections

Without Streams:

```java
List<Employee> active =
        new ArrayList<>();

List<String> names =
        new ArrayList<>();
```

Multiple temporary collections are created.

---

With Streams:

```java
List<String> names =
        employees.stream()
                 .filter(Employee::isActive)
                 .map(Employee::getName)
                 .toList();
```

Cleaner implementation.

---

# 15. Rich Built-in Operations

Common operations:

```java
filter()
map()
flatMap()
sorted()
distinct()
limit()
skip()
count()
findFirst()
findAny()
reduce()
collect()
```

No need to write custom loops repeatedly.

---

# Example of `reduce()`

Find sum:

```java
int sum =
        numbers.stream()
               .reduce(
                       0,
                       Integer::sum);
```

Output:

```text
Total Sum
```

---

# Real-World Example

Find active employee names sorted alphabetically.

Without Streams:

```java
List<String> names =
        new ArrayList<>();

for(Employee emp : employees) {

    if(emp.isActive()) {

        names.add(
                emp.getName());
    }
}

Collections.sort(names);
```

---

With Streams:

```java
List<String> names =
        employees.stream()
                 .filter(Employee::isActive)
                 .map(Employee::getName)
                 .sorted()
                 .toList();
```

Much cleaner and easier to maintain.

---

# Stream API vs Traditional Loops

| Feature | Traditional Loop | Stream API |
|----------|-----------------|------------|
| Readability | Moderate | High |
| Boilerplate Code | More | Less |
| Functional Style | ❌ No | ✅ Yes |
| Parallel Processing | Manual | Built-in |
| Lazy Evaluation | ❌ No | ✅ Yes |
| Data Transformation | Verbose | Simple |
| Maintainability | Moderate | High |

---

# When to Use Streams?

Use Streams when:

- Processing collections
- Filtering data
- Transforming objects
- Aggregating results
- Grouping records
- Sorting collections
- Parallel data processing

---

# When NOT to Use Streams?

Avoid Streams when:

- Complex debugging is required
- Performance-critical code with tiny collections
- Heavy mutation of shared state
- Simple loops are more readable

Example:

```java
for(int i = 0; i < 5; i++) {

    System.out.println(i);
}
```

A loop is often clearer.

---

# Interview Trick Questions

## Q1: Does Stream Store Data?

❌ No.

A Stream processes data from a source such as:

```java
List
Set
Array
File
```

---

## Q2: Can a Stream Be Reused?

❌ No.

After a terminal operation:

```java
stream.count();
```

the stream is closed.

---

## Q3: What Is the Biggest Advantage of Streams?

```text
Declarative Programming
```

Focus on:

```text
What to do
```

instead of:

```text
How to do it
```

---

## Q4: Are Streams Faster Than Loops?

❌ Not always.

For small collections:

```text
Loops may be faster.
```

For large datasets:

```text
Parallel Streams can improve performance.
```

---

# Key Interview Points

- Stream API was introduced in Java 8.
- It provides a functional and declarative approach to data processing.
- Reduces boilerplate code and improves readability.
- Supports filtering, mapping, sorting, grouping, and aggregation.
- Uses lazy evaluation for better performance.
- Supports parallel processing through `parallelStream()`.
- Enables pipeline-based data processing.
- Streams do not store data; they process data from a source.
- A stream cannot be reused after a terminal operation.

## One-Line Interview Answer

**The Java Stream API provides a functional, declarative, and efficient way to process collections by supporting operations such as filtering, mapping, sorting, grouping, aggregation, and parallel processing while reducing boilerplate code and improving readability.**

---

<h1 id="what-is-try-with-resources-in-java" style="text-decoration: underline;"> 33) What is Try-With-Resources in Java? </h1>

## Definition

**Try-With-Resources** is a feature introduced in **Java 7** that automatically closes resources after they are used.

Resources include:

- File streams
- Database connections
- Network sockets
- Readers/Writers
- Input/Output streams

It helps prevent resource leaks and reduces boilerplate code.

---

# Simple Definition

```text
Try-With-Resources automatically
closes resources when execution
exits the try block.
```

---

# Why Was It Introduced?

Before Java 7, resources had to be closed manually.

Example:

```java
BufferedReader reader = null;

try {

    reader = new BufferedReader(
            new FileReader("data.txt"));

    System.out.println(
            reader.readLine());

} catch (IOException e) {

    e.printStackTrace();

} finally {

    if (reader != null) {

        try {

            reader.close();

        } catch (IOException e) {

            e.printStackTrace();
        }
    }
}
```

Problems:

- Verbose code
- Easy to forget `close()`
- Resource leaks possible
- Nested try-catch blocks

---

# Try-With-Resources Solution

```java
try (BufferedReader reader =
         new BufferedReader(
             new FileReader("data.txt"))) {

    System.out.println(
            reader.readLine());
}
catch (IOException e) {

    e.printStackTrace();
}
```

The resource is closed automatically.

---

# Syntax

```java
try (Resource resource = new Resource()) {

    // Use resource

} catch (Exception e) {

    // Handle exception
}
```

---

# Example: Reading a File

```java
import java.io.*;

public class Test {

    public static void main(String[] args) {

        try (BufferedReader reader =
                     new BufferedReader(
                             new FileReader("test.txt"))) {

            String line =
                    reader.readLine();

            System.out.println(line);

        } catch (IOException e) {

            e.printStackTrace();
        }
    }
}
```

Resource closes automatically after execution.

---

# How Does It Work?

Java internally converts:

```java
try (BufferedReader reader = ...)
```

into logic similar to:

```java
BufferedReader reader = ...;

try {

    // Use resource

} finally {

    if (reader != null) {

        reader.close();
    }
}
```

---

# Which Resources Can Be Used?

A resource must implement:

```java
AutoCloseable
```

or

```java
Closeable
```

interface.

---

# AutoCloseable Interface

```java
public interface AutoCloseable {

    void close() throws Exception;
}
```

Any class implementing this interface can be used inside Try-With-Resources.

---

# Common Resources

```java
FileInputStream
FileOutputStream
BufferedReader
BufferedWriter
Scanner
Connection
Statement
ResultSet
Socket
```

---

# Example with Multiple Resources

```java
try (
    FileInputStream input =
            new FileInputStream("input.txt");

    FileOutputStream output =
            new FileOutputStream("output.txt")
) {

    // Process files
}
catch (IOException e) {

    e.printStackTrace();
}
```

Resources are closed automatically.

---

# Resource Closing Order

Resources are closed in reverse order of creation.

Example:

```java
try (
    ResourceA a = new ResourceA();
    ResourceB b = new ResourceB();
)
```

Closing order:

```text
b.close()
a.close()
```

---

# Example

```java
class ResourceA
        implements AutoCloseable {

    @Override
    public void close() {

        System.out.println("A Closed");
    }
}
```

```java
class ResourceB
        implements AutoCloseable {

    @Override
    public void close() {

        System.out.println("B Closed");
    }
}
```

Usage:

```java
try (
    ResourceA a = new ResourceA();
    ResourceB b = new ResourceB()
) {

    System.out.println("Using Resources");
}
```

Output:

```text
Using Resources
B Closed
A Closed
```

---

# Custom Resource Example

```java
class DatabaseConnection
        implements AutoCloseable {

    public void connect() {

        System.out.println(
                "Connected");
    }

    @Override
    public void close() {

        System.out.println(
                "Connection Closed");
    }
}
```

Usage:

```java
try (DatabaseConnection db =
             new DatabaseConnection()) {

    db.connect();
}
```

Output:

```text
Connected
Connection Closed
```

---

# What Happens If an Exception Occurs?

Even if an exception occurs:

```java
try (
    BufferedReader reader =
            new BufferedReader(
                    new FileReader("test.txt"))
) {

    throw new RuntimeException();

}
```

The resource is still closed automatically.

---

# Suppressed Exceptions

Consider:

```java
try (
    Resource resource =
            new Resource()
) {

    throw new RuntimeException(
            "Main Exception");
}
```

If:

```java
close()
```

also throws an exception,

Java preserves both exceptions.

The exception from `close()` becomes a:

```text
Suppressed Exception
```

---

# Accessing Suppressed Exceptions

```java
catch (Exception e) {

    Throwable[] suppressed =
            e.getSuppressed();

    for(Throwable t : suppressed) {

        System.out.println(
                t.getMessage());
    }
}
```

---

# Java 9 Enhancement

Before Java 9:

```java
try (BufferedReader reader =
         new BufferedReader(
                 new FileReader("test.txt"))) {
}
```

---

Java 9 allows:

```java
BufferedReader reader =
        new BufferedReader(
                new FileReader("test.txt"));

try (reader) {

    System.out.println(
            reader.readLine());
}
```

Resource can be declared outside the try block.

---

# Try-With-Resources vs Finally Block

| Feature | Try-With-Resources | Finally Block |
|----------|-------------------|---------------|
| Automatic Resource Closing | ✅ Yes | ❌ No |
| Boilerplate Code | Less | More |
| Resource Leak Risk | Low | High |
| Readability | Better | Moderate |
| Exception Handling | Cleaner | Complex |
| Java Version | Java 7+ | All Versions |

---

# Real-World JDBC Example

Without Try-With-Resources:

```java
Connection con = null;

try {

    con = DriverManager.getConnection(...);

} finally {

    if(con != null) {

        con.close();
    }
}
```

---

With Try-With-Resources:

```java
try (
    Connection con =
            DriverManager.getConnection(...);

    PreparedStatement ps =
            con.prepareStatement(sql);

    ResultSet rs =
            ps.executeQuery()
) {

    while(rs.next()) {

        System.out.println(
                rs.getString(1));
    }
}
```

All resources are closed automatically.

---

# Advantages

### Automatic Resource Management

No need to manually call:

```java
close()
```

---

### Prevents Resource Leaks

Resources are always released.

---

### Cleaner Code

Less boilerplate.

---

### Better Exception Handling

Supports suppressed exceptions.

---

### Improved Readability

Code is concise and easier to maintain.

---

# Interview Trick Questions

## Q1: Which Interface Must a Resource Implement?

```java
AutoCloseable
```

or

```java
Closeable
```

---

## Q2: Does Try-With-Resources Execute `close()` If an Exception Occurs?

✅ Yes.

Resources are always closed.

---

## Q3: In What Order Are Multiple Resources Closed?

Reverse order.

Example:

```text
Resource3
Resource2
Resource1
```

---

## Q4: When Was Try-With-Resources Introduced?

```java
Java 7
```

---

## Q5: Can We Use Existing Variables in Try-With-Resources?

✅ Yes (Java 9+).

```java
BufferedReader reader = ...;

try(reader) {
}
```

---

# Key Interview Points

- Try-With-Resources was introduced in Java 7.
- It automatically closes resources when execution exits the try block.
- Resources must implement `AutoCloseable` or `Closeable`.
- Multiple resources can be declared in a single try statement.
- Resources are closed in reverse order of creation.
- It prevents resource leaks and reduces boilerplate code.
- Java automatically handles suppressed exceptions.
- Java 9 allows using effectively final resources declared outside the try block.

## One-Line Interview Answer

**Try-With-Resources is a Java 7 feature that automatically closes resources implementing `AutoCloseable` or `Closeable`, ensuring efficient resource management, cleaner code, and prevention of resource leaks.**

---

<h1 id="comparable-vs-comparator-in-java" style="text-decoration: underline;"> 34) Comparable vs Comparator in Java</h1>

One of the most frequently asked Java interview questions is:

> What is the difference between Comparable and Comparator?

Both are used for **sorting objects**, but they differ in how and where the sorting logic is defined.

---

# Why Do We Need Comparable and Comparator?

Suppose we have a list of employees:

```java
List<Employee> employees = List.of(
        new Employee(103, "John"),
        new Employee(101, "Alex"),
        new Employee(102, "David")
);
```

Java doesn't know how to sort custom objects.

To define sorting rules, we use:

```text
Comparable
Comparator
```

---

# Comparable

## Definition

`Comparable` is an interface present in:

```java
java.lang.Comparable
```

It is used to define the **natural ordering** of objects.

---

## Method

```java
int compareTo(T obj)
```

---

## Example

```java
class Employee
        implements Comparable<Employee> {

    private int id;

    Employee(int id) {

        this.id = id;
    }

    @Override
    public int compareTo(Employee other) {

        return this.id - other.id;
    }
}
```

---

## Sorting

```java
Collections.sort(employeeList);
```

Output:

```text
Sorted By Employee ID
```

---

# How compareTo() Works

```java
obj1.compareTo(obj2)
```

Returns:

| Return Value | Meaning |
|-------------|----------|
| Negative | Current object is smaller |
| Zero | Objects are equal |
| Positive | Current object is greater |

---

## Example

```java
10.compareTo(20)
```

Result:

```text
Negative Value
```

---

```java
20.compareTo(20)
```

Result:

```text
0
```

---

```java
30.compareTo(20)
```

Result:

```text
Positive Value
```

---

# Comparator

## Definition

`Comparator` is an interface present in:

```java
java.util.Comparator
```

It is used to define **custom sorting logic** outside the class.

---

## Method

```java
int compare(T o1, T o2)
```

---

# Example

```java
class Employee {

    private int id;
    private String name;

    Employee(int id,
             String name) {

        this.id = id;
        this.name = name;
    }

    public String getName() {

        return name;
    }
}
```

---

## Custom Comparator

```java
class NameComparator
        implements Comparator<Employee> {

    @Override
    public int compare(Employee e1,
                       Employee e2) {

        return e1.getName()
                 .compareTo(
                         e2.getName());
    }
}
```

---

## Sorting

```java
Collections.sort(
        employees,
        new NameComparator());
```

Output:

```text
Sorted By Name
```

---

# Comparable Example

```java
class Employee
        implements Comparable<Employee> {

    private int id;

    public Employee(int id) {

        this.id = id;
    }

    @Override
    public int compareTo(Employee other) {

        return this.id - other.id;
    }
}
```

---

```java
Collections.sort(employees);
```

Output:

```text
Sort By Employee ID
```

---

# Comparator Example

```java
class SalaryComparator
        implements Comparator<Employee> {

    @Override
    public int compare(Employee e1,
                       Employee e2) {

        return Double.compare(
                e1.getSalary(),
                e2.getSalary());
    }
}
```

---

```java
Collections.sort(
        employees,
        new SalaryComparator());
```

Output:

```text
Sort By Salary
```

---

# Java 8 Comparator Example

Instead of creating a separate class:

```java
employees.sort(

    (e1, e2) ->
        e1.getName()
          .compareTo(
                  e2.getName())
);
```

---

Using Method Reference:

```java
employees.sort(

    Comparator.comparing(
            Employee::getName)
);
```

Cleaner and more readable.

---

# Multiple Sorting Criteria

Suppose:

```java
Sort By Department
Then By Salary
```

Java 8:

```java
employees.sort(

    Comparator.comparing(
            Employee::getDepartment)

              .thenComparing(
                      Employee::getSalary)
);
```

---

# Comparable vs Comparator

| Feature | Comparable | Comparator |
|----------|-----------|-----------|
| Package | java.lang | java.util |
| Method | compareTo() | compare() |
| Number of Parameters | 1 | 2 |
| Sorting Logic Location | Inside Class | Outside Class |
| Natural Ordering | ✅ Yes | ❌ No |
| Multiple Sorting Criteria | ❌ Difficult | ✅ Easy |
| Modifies Existing Class | ✅ Yes | ❌ No |
| Reusable | Limited | High |
| Java 8 Lambda Support | ❌ No | ✅ Yes |

---

# Memory Representation

## Comparable

```text
Employee Class
      │
      ▼
compareTo()
```

Sorting logic is part of the class.

---

## Comparator

```text
Employee Class

NameComparator
SalaryComparator
AgeComparator
```

Sorting logic is separate.

---

# Real-World Example

Consider:

```java
Employee
```

Fields:

```java
id
name
salary
department
```

---

### Natural Ordering

```java
Sort By ID
```

Use:

```java
Comparable
```

---

### Alternate Sorting

```java
Sort By Name
Sort By Salary
Sort By Department
```

Use:

```java
Comparator
```

---

# Which One Should You Use?

### Use Comparable When

- There is one natural sorting order.
- Sorting logic belongs to the class.
- Objects are commonly sorted the same way.

Example:

```java
Employee By ID
Student By Roll Number
```

---

### Use Comparator When

- Multiple sorting criteria exist.
- You cannot modify the source class.
- Sorting requirements change frequently.

Example:

```java
Employee By Name
Employee By Salary
Employee By Department
```

---

# Interview Trick Questions

## Q1: Can a Class Have Both Comparable and Comparator?

✅ Yes.

```java
Comparable
```

for natural ordering.

```java
Comparator
```

for custom ordering.

---

## Q2: Which Is More Flexible?

✅ Comparator

Because multiple comparator implementations can be created.

---

## Q3: Which Interface Supports Lambda Expressions?

✅ Comparator

Example:

```java
employees.sort(
    (e1, e2) ->
        e1.getName()
          .compareTo(
                  e2.getName())
);
```

---

## Q4: Which Method Does Collections.sort() Use?

```java
Collections.sort(list);
```

Uses:

```java
compareTo()
```

---

```java
Collections.sort(list, comparator);
```

Uses:

```java
compare()
```

---

# Key Interview Points

- `Comparable` is used for natural/default sorting and defines the sorting logic inside the class.
- `Comparator` is used for custom sorting and defines the sorting logic outside the class.
- `Comparable` contains `compareTo()`, while `Comparator` contains `compare()`.
- A class can implement only one natural ordering using `Comparable`.
- Multiple sorting strategies can be created using `Comparator`.
- Java 8 introduced lambda expressions and utility methods like `Comparator.comparing()`.
- `Comparator` is generally preferred when multiple sorting criteria are required.

## One-Line Interview Answer

**Comparable is used to define the natural ordering of objects through the `compareTo()` method inside the class, whereas Comparator is used to define custom sorting logic outside the class through the `compare()` method and supports multiple sorting strategies.**

---

<h1 id="what-is-a-marker-interface-in-java" style="text-decoration: underline;"> 35) What is a Marker Interface in Java?</h1>

## Definition

A **Marker Interface** is an interface that contains **no methods and no fields**.

It is used to provide metadata or special information to the JVM or framework about a class.

Example:

```java
public interface Serializable {
}
```

The interface is empty, but implementing it gives special meaning to the class.

---

# Simple Definition

```text
A Marker Interface is an empty interface
used to mark a class with special behavior
or capabilities.
```

---

# Why Is It Called a Marker Interface?

Because it simply:

```text
Marks a Class
```

with additional information.

Example:

```java
class Employee
        implements Serializable {
}
```

Here, the class is marked as:

```text
Serializable
```

---

# Syntax

```java
interface MarkerInterface {
}
```

Example:

```java
interface Printable {
}
```

Implementing class:

```java
class Report
        implements Printable {
}
```

---

# Common Marker Interfaces in Java

### Serializable

```java
java.io.Serializable
```

Used for object serialization.

---

### Cloneable

```java
java.lang.Cloneable
```

Indicates an object can be cloned.

---

### Remote

```java
java.rmi.Remote
```

Used in Java RMI applications.

---

### RandomAccess

```java
java.util.RandomAccess
```

Indicates fast random access support.

---

# Example: Serializable Marker Interface

```java
import java.io.Serializable;

class Employee
        implements Serializable {

    private int id;
    private String name;
}
```

Now the object can be serialized.

---

## Without Serializable

```java
class Employee {

    private int id;
}
```

Serialization attempt:

```java
ObjectOutputStream out =
        new ObjectOutputStream(...);

out.writeObject(employee);
```

Output:

```text
java.io.NotSerializableException
```

---

# Example: Cloneable Marker Interface

```java
class Employee
        implements Cloneable {

    int id = 101;

    @Override
    protected Object clone()
            throws CloneNotSupportedException {

        return super.clone();
    }
}
```

Usage:

```java
Employee e1 =
        new Employee();

Employee e2 =
        (Employee) e1.clone();
```

Works successfully.

---

## Without Cloneable

```java
class Employee {

}
```

Attempt:

```java
e1.clone();
```

Output:

```text
CloneNotSupportedException
```

---

# Custom Marker Interface Example

Create marker interface:

```java
interface Auditable {
}
```

---

Implement it:

```java
class Employee
        implements Auditable {

}
```

---

Check at runtime:

```java
Employee emp =
        new Employee();

if(emp instanceof Auditable) {

    System.out.println(
            "Audit Enabled");
}
```

Output:

```text
Audit Enabled
```

---

# How Marker Interfaces Work

```text
Class
  │
  ▼
Implements Marker Interface
  │
  ▼
JVM / Framework Detects It
  │
  ▼
Special Behavior Enabled
```

---

# Real-World Example

## Serializable

```java
class Employee
        implements Serializable {
}
```

JVM understands:

```text
Object Can Be Serialized
```

---

## Cloneable

```java
class Employee
        implements Cloneable {
}
```

JVM understands:

```text
Object Can Be Cloned
```

---

# Marker Interface vs Normal Interface

## Normal Interface

Contains methods.

```java
interface Shape {

    void draw();
}
```

Implementation:

```java
class Circle
        implements Shape {

    public void draw() {

    }
}
```

---

## Marker Interface

Contains no methods.

```java
interface Serializable {
}
```

Implementation:

```java
class Employee
        implements Serializable {
}
```

Only provides metadata.

---

# Marker Interface vs Annotation

Modern Java often uses annotations instead of marker interfaces.

---

## Marker Interface

```java
interface Auditable {
}
```

Usage:

```java
class Employee
        implements Auditable {
}
```

---

## Annotation

```java
@interface Auditable {
}
```

Usage:

```java
@Auditable
class Employee {
}
```

---

# Comparison

| Feature | Marker Interface | Annotation |
|----------|-----------------|------------|
| Introduced | Early Java | Java 5 |
| Methods Allowed | No | Can Have Attributes |
| Type Checking | ✅ Compile Time | ❌ Runtime Mostly |
| Metadata Support | Limited | Rich |
| Flexibility | Lower | Higher |

---

# Advantages of Marker Interfaces

### Compile-Time Type Safety

```java
instanceof
```

checks are possible.

---

### Easy Identification

Frameworks can easily identify classes.

---

### JVM-Level Support

Used by core Java APIs like:

```java
Serializable
Cloneable
```

---

### Lightweight

No implementation required.

---

# Disadvantages of Marker Interfaces

### No Behavior

Cannot define methods.

---

### Limited Metadata

Can only indicate presence or absence.

---

### Annotations Are More Flexible

Modern applications prefer annotations.

---

# Interview Trick Questions

## Q1: Does a Marker Interface Contain Methods?

❌ No.

Example:

```java
interface Serializable {
}
```

---

## Q2: Name Common Marker Interfaces.

```java
Serializable
Cloneable
Remote
RandomAccess
```

---

## Q3: What Is the Main Purpose of a Marker Interface?

```text
Provide Metadata
Or
Mark A Class For Special Processing
```

---

## Q4: Which Is More Flexible—Marker Interface or Annotation?

✅ Annotation

Because annotations can store attributes and metadata.

---

## Q5: Why Is Serializable a Marker Interface?

Because implementing it informs the JVM that:

```text
Objects Of This Class
Can Be Serialized
```

---

# Key Interview Points

- A Marker Interface is an empty interface with no methods or fields.
- It is used to mark a class for special processing or behavior.
- Common examples are `Serializable`, `Cloneable`, `Remote`, and `RandomAccess`.
- The JVM or frameworks check for the presence of the marker interface and apply special logic.
- Marker interfaces provide compile-time type checking.
- Modern Java often prefers annotations for metadata because they are more flexible.
- Marker interfaces are still widely used in core Java APIs.

## One-Line Interview Answer

**A Marker Interface is an empty interface that provides metadata about a class and signals the JVM or frameworks to apply special behavior, such as serialization (`Serializable`) or cloning (`Cloneable`).**
---

<h1 id="what-is-clone-in-java" style="text-decoration: underline;"> 36) What is `clone()` in Java?</h1>

## Definition

The `clone()` method is used to create a copy of an existing object.

It belongs to the:

```java
java.lang.Object
```

class and creates a duplicate of the current object.

---

# Simple Definition

```text
clone() creates a new object
with the same state as the
existing object.
```

---

# Method Signature

```java
protected Object clone()
        throws CloneNotSupportedException
```

Defined in:

```java
java.lang.Object
```

---

# Why Use `clone()`?

Instead of manually copying fields:

```java
Employee e2 =
        new Employee();

e2.id = e1.id;
e2.name = e1.name;
```

We can create a copy using:

```java
Employee e2 =
        (Employee) e1.clone();
```

---

# Requirements for Cloning

To use `clone()`:

### 1. Implement `Cloneable`

```java
class Employee
        implements Cloneable {
}
```

---

### 2. Override `clone()`

```java
@Override
public Object clone()
        throws CloneNotSupportedException {

    return super.clone();
}
```

---

# Basic Example

```java
class Employee
        implements Cloneable {

    int id;
    String name;

    Employee(int id,
             String name) {

        this.id = id;
        this.name = name;
    }

    @Override
    public Object clone()
            throws CloneNotSupportedException {

        return super.clone();
    }
}
```

---

## Usage

```java
Employee e1 =
        new Employee(
                101,
                "John");

Employee e2 =
        (Employee) e1.clone();

System.out.println(
        e2.id);

System.out.println(
        e2.name);
```

Output:

```text
101
John
```

---

# Memory Representation

```text
e1 ──► Employee
       id=101
       name=John

e2 ──► Employee
       id=101
       name=John
```

Different objects:

```java
e1 == e2
```

Output:

```text
false
```

---

# What Happens Internally?

```java
super.clone()
```

creates:

```text
New Object
+
Copies All Field Values
```

This is called:

```text
Field-by-Field Copy
```

---

# Clone Creates Shallow Copy

By default:

```java
clone()
```

creates a:

```text
Shallow Copy
```

---

# Example of Shallow Copy

```java
class Address {

    String city;

    Address(String city) {

        this.city = city;
    }
}
```

---

```java
class Employee
        implements Cloneable {

    String name;
    Address address;

    @Override
    public Object clone()
            throws CloneNotSupportedException {

        return super.clone();
    }
}
```

---

Usage:

```java
Employee e2 =
        (Employee) e1.clone();
```

Memory:

```text
e1 ──────┐
         ▼
      Address

e2 ──────┘
```

Both objects share the same Address object.

---

# Problem with Shallow Copy

```java
e2.address.city =
        "Mumbai";
```

Now:

```java
System.out.println(
        e1.address.city);
```

Output:

```text
Mumbai
```

Because both objects share the same nested object.

---

# Deep Copy Using clone()

To avoid shared references:

```java
@Override
public Object clone()
        throws CloneNotSupportedException {

    Employee cloned =
            (Employee) super.clone();

    cloned.address =
            new Address(
                    this.address.city);

    return cloned;
}
```

Now nested objects are copied as well.

---

# Shallow Copy vs Deep Copy

| Feature | Shallow Copy | Deep Copy |
|----------|-------------|-----------|
| Parent Object Copied | ✅ Yes | ✅ Yes |
| Nested Objects Copied | ❌ No | ✅ Yes |
| References Shared | ✅ Yes | ❌ No |
| Memory Usage | Low | Higher |
| Side Effects | Possible | No |

---

# What Happens If Cloneable Is Not Implemented?

Example:

```java
class Employee {

}
```

Usage:

```java
Employee e2 =
        (Employee) e1.clone();
```

Output:

```text
CloneNotSupportedException
```

---

# Why Is `Cloneable` Needed?

`Cloneable` is a marker interface.

```java
interface Cloneable {
}
```

It tells JVM:

```text
This Object Supports Cloning
```

---

# Example

```java
class Employee
        implements Cloneable {
}
```

Now:

```java
super.clone()
```

works successfully.

---

# Alternative Ways to Copy Objects

Many developers avoid `clone()` and prefer:

---

## Copy Constructor

```java
public Employee(Employee other) {

    this.id = other.id;
    this.name = other.name;
}
```

Usage:

```java
Employee copy =
        new Employee(original);
```

---

## Builder Pattern

```java
Employee copy =
        Employee.builder()
                .id(emp.getId())
                .name(emp.getName())
                .build();
```

---

## Serialization-Based Copy

Useful for deep cloning complex objects.

---

# Advantages of `clone()`

### Quick Object Duplication

Creates a copy without manually copying fields.

---

### Built Into Java

Available through `Object` class.

---

### Useful for Prototype Pattern

Widely used in design patterns.

---

# Disadvantages of `clone()`

### Produces Shallow Copy

Nested objects are not copied automatically.

---

### Requires Cloneable

Without it:

```text
CloneNotSupportedException
```

---

### Type Casting Required

```java
(Employee) e1.clone();
```

---

### Difficult for Complex Objects

Deep cloning requires additional code.

---

# Real-World Example

Suppose:

```java
Employee template =
        new Employee(
                101,
                "Default User");
```

Create copies:

```java
Employee emp1 =
        (Employee) template.clone();

Employee emp2 =
        (Employee) template.clone();
```

Useful when creating similar objects repeatedly.

---

# clone() vs Copy Constructor

| Feature | clone() | Copy Constructor |
|----------|---------|------------------|
| Built Into Java | ✅ Yes | ❌ No |
| Uses Cloneable | ✅ Yes | ❌ No |
| Type Safe | ❌ No | ✅ Yes |
| Easy Deep Copy | ❌ No | ✅ Yes |
| Requires Casting | ✅ Yes | ❌ No |
| Modern Preference | Less | More |

---

# Interview Trick Questions

## Q1: Which Class Defines `clone()`?

```java
java.lang.Object
```

---

## Q2: What Type of Copy Does Default `clone()` Create?

```text
Shallow Copy
```

---

## Q3: What Happens If Cloneable Is Not Implemented?

```text
CloneNotSupportedException
```

---

## Q4: Is `Cloneable` a Marker Interface?

✅ Yes.

It contains no methods.

---

## Q5: Why Do Many Developers Avoid `clone()`?

Because:

```text
Complex
Produces Shallow Copy
Requires Casting
```

Copy constructors are usually preferred.

---

# Key Interview Points

- `clone()` is defined in the `java.lang.Object` class.
- It creates a copy of an existing object.
- The class must implement `Cloneable` to support cloning.
- Default `clone()` performs a shallow copy.
- Deep copy requires manual cloning of referenced objects.
- Without `Cloneable`, `CloneNotSupportedException` is thrown.
- `Cloneable` is a marker interface.
- Modern Java applications often prefer copy constructors or builders over `clone()`.

## One-Line Interview Answer

**The `clone()` method creates a copy of an existing object, and by default it performs a shallow copy. To use it, a class must implement the `Cloneable` marker interface and override the `clone()` method.**

---

<h1 id="what-are-default-methods-in-interfaces" style="text-decoration: underline;"> 37) What Are Default Methods in Interfaces?</h1>

## Definition

**Default Methods** are methods in an interface that have a method body (implementation).

They were introduced in:

```java
Java 8
```

using the `default` keyword.

---

# Simple Definition

```text
Default methods allow interfaces
to provide method implementations
without forcing implementing classes
to override them.
```

---

# Why Were Default Methods Introduced?

Before Java 8, interfaces could contain only:

```java
abstract methods
public static final variables
```

Example:

```java
interface Vehicle {

    void start();
}
```

If a new method was added:

```java
interface Vehicle {

    void start();

    void stop();
}
```

All implementing classes would break because they must implement `stop()`.

Default methods solve this problem.

---

# Syntax

```java
interface InterfaceName {

    default void methodName() {

        // implementation
    }
}
```

---

# Example

```java
interface Vehicle {

    default void start() {

        System.out.println(
                "Vehicle Started");
    }
}
```

Implementing class:

```java
class Car
        implements Vehicle {

}
```

Usage:

```java
Car car = new Car();

car.start();
```

Output:

```text
Vehicle Started
```

Even though `Car` does not implement `start()`.

---

# Overriding Default Methods

Implementing classes can override default methods.

Example:

```java
interface Vehicle {

    default void start() {

        System.out.println(
                "Vehicle Started");
    }
}
```

---

```java
class Car
        implements Vehicle {

    @Override
    public void start() {

        System.out.println(
                "Car Started");
    }
}
```

Output:

```text
Car Started
```

---

# Real-World Motivation

Suppose Java already has:

```java
interface List
```

with thousands of implementations.

When Java 8 introduced Streams:

```java
stream()
parallelStream()
```

Adding abstract methods would break all implementations.

Instead Java added:

```java
default Stream<E> stream()
```

allowing backward compatibility.

---

# Example with Multiple Default Methods

```java
interface Employee {

    default void login() {

        System.out.println(
                "Employee Login");
    }

    default void logout() {

        System.out.println(
                "Employee Logout");
    }
}
```

---

```java
class Developer
        implements Employee {
}
```

Usage:

```java
Developer dev =
        new Developer();

dev.login();
dev.logout();
```

Output:

```text
Employee Login
Employee Logout
```

---

# Default Method vs Abstract Method

## Abstract Method

```java
interface Vehicle {

    void start();
}
```

Must be implemented.

---

## Default Method

```java
interface Vehicle {

    default void start() {

        System.out.println(
                "Started");
    }
}
```

Implementation is optional.

---

# Multiple Inheritance Conflict

Consider:

```java
interface A {

    default void display() {

        System.out.println("A");
    }
}
```

---

```java
interface B {

    default void display() {

        System.out.println("B");
    }
}
```

---

```java
class Test
        implements A, B {

}
```

Compilation Error:

```text
Duplicate default methods
```

Java cannot decide which method to use.

---

# Resolving Conflict

The class must override the method.

```java
class Test
        implements A, B {

    @Override
    public void display() {

        System.out.println(
                "Custom Implementation");
    }
}
```

---

# Calling Specific Interface Default Method

You can invoke a specific interface's default method.

```java
class Test
        implements A, B {

    @Override
    public void display() {

        A.super.display();
        B.super.display();
    }
}
```

Output:

```text
A
B
```

---

# Default Methods and Object Class

Suppose:

```java
interface Vehicle {

    default String toString() {

        return "Vehicle";
    }
}
```

Compilation Error.

Why?

Because:

```java
toString()
```

already exists in:

```java
java.lang.Object
```

Interface default methods cannot override Object class methods.

---

# Practical Example

```java
interface Logger {

    default void log(String message) {

        System.out.println(
                "[LOG] " + message);
    }
}
```

---

```java
class Service
        implements Logger {

}
```

Usage:

```java
Service service =
        new Service();

service.log("Application Started");
```

Output:

```text
[LOG] Application Started
```

---

# Advantages of Default Methods

### Backward Compatibility

New methods can be added to interfaces without breaking existing implementations.

---

### Code Reuse

Common implementation can be shared.

---

### Reduced Boilerplate Code

Implementing classes need not write the same code repeatedly.

---

### Interface Evolution

Interfaces can evolve over time safely.

---

# Disadvantages of Default Methods

### Multiple Inheritance Conflicts

Two interfaces may provide the same default method.

---

### Increased Complexity

Interfaces now contain behavior as well as contracts.

---

### Potential Design Issues

Too many default methods can make interfaces harder to maintain.

---

# Default Methods vs Abstract Methods

| Feature | Default Method | Abstract Method |
|----------|----------------|----------------|
| Has Body | ✅ Yes | ❌ No |
| Requires Override | ❌ No | ✅ Yes |
| Introduced In | Java 8 | Java 1 |
| Supports Backward Compatibility | ✅ Yes | ❌ No |
| Uses `default` Keyword | ✅ Yes | ❌ No |

---

# Default Methods vs Static Methods

## Default Method

```java
default void show() {

}
```

Called using object.

```java
obj.show();
```

---

## Static Method

```java
static void show() {

}
```

Called using interface name.

```java
InterfaceName.show();
```

---

# Real-World Usage

Default methods are heavily used in Java APIs such as:

```java
Collection
List
Map
Iterable
Comparator
```

Examples:

```java
forEach()
removeIf()
stream()
parallelStream()
sort()
```

---

# Interview Trick Questions

## Q1: Can an Interface Have Implemented Methods?

✅ Yes.

Using:

```java
default
```

or

```java
static
```

methods.

---

## Q2: When Were Default Methods Introduced?

```java
Java 8
```

---

## Q3: Why Were Default Methods Introduced?

```text
Backward Compatibility
```

To allow adding new methods to interfaces without breaking existing implementations.

---

## Q4: Can Default Methods Be Overridden?

✅ Yes.

Implementing classes can override them.

---

## Q5: What Happens If Two Interfaces Have the Same Default Method?

```text
Compilation Error
```

The implementing class must override the method.

---

# Key Interview Points

- Default methods were introduced in Java 8.
- They allow interfaces to provide method implementations using the `default` keyword.
- Implementing classes are not required to override default methods.
- Their primary purpose is to provide backward compatibility when evolving interfaces.
- Default methods can be overridden by implementing classes.
- Multiple interfaces with the same default method create ambiguity that must be resolved by overriding.
- Widely used in Java Collections and Stream APIs.

## One-Line Interview Answer

**Default methods are interface methods introduced in Java 8 that contain implementations using the `default` keyword, allowing interfaces to evolve without breaking existing implementations and enabling code reuse.**

---

<h1 id="what-are-checked-vs-unchecked-exceptions-in-java" style="text-decoration: underline;"> 38) What Are Checked vs Unchecked Exceptions in Java?</h1>

## Definition

Exceptions in Java are broadly classified into two categories:

```text
1. Checked Exceptions
2. Unchecked Exceptions
```

The main difference is:

```text
Checked Exceptions
→ Checked at Compile Time

Unchecked Exceptions
→ Checked at Runtime
```

---

# Java Exception Hierarchy

```text
                    Throwable
                         │
          ┌──────────────┴──────────────┐
          │                             │
        Error                      Exception
                                        │
                        ┌───────────────┴───────────────┐
                        │                               │
                Checked Exceptions            RuntimeException
                                                       │
                                            Unchecked Exceptions
```

---

# Checked Exceptions

## Definition

A **Checked Exception** is an exception that the compiler checks at compile time.

The programmer must either:

```java
try-catch
```

or

```java
throws
```

the exception.

Otherwise, the code will not compile.

---

# Examples of Checked Exceptions

```java
IOException
SQLException
FileNotFoundException
ClassNotFoundException
InterruptedException
ParseException
```

---

# Example

```java
import java.io.FileReader;

public class Test {

    public static void main(String[] args) {

        FileReader file =
                new FileReader(
                        "data.txt");
    }
}
```

Compilation Error:

```text
Unhandled exception:
FileNotFoundException
```

---

# Solution 1: Using try-catch

```java
try {

    FileReader file =
            new FileReader(
                    "data.txt");

} catch (FileNotFoundException e) {

    e.printStackTrace();
}
```

---

# Solution 2: Using throws

```java
public static void main(String[] args)
        throws FileNotFoundException {

    FileReader file =
            new FileReader(
                    "data.txt");
}
```

---

# Why Are They Called Checked Exceptions?

Because the compiler checks:

```text
Have you handled this exception?
```

before allowing compilation.

---

# Unchecked Exceptions

## Definition

An **Unchecked Exception** is an exception that occurs at runtime and is not checked by the compiler.

Handling is optional.

---

# Examples of Unchecked Exceptions

```java
NullPointerException
ArithmeticException
ArrayIndexOutOfBoundsException
NumberFormatException
IllegalArgumentException
ClassCastException
```

All inherit from:

```java
RuntimeException
```

---

# Example

```java
public class Test {

    public static void main(String[] args) {

        int result =
                10 / 0;
    }
}
```

Compiles successfully.

Runtime Output:

```text
ArithmeticException
```

---

# Example: NullPointerException

```java
String name = null;

System.out.println(
        name.length());
```

Output:

```text
NullPointerException
```

Compiler does not complain.

---

# Why Are They Called Unchecked Exceptions?

Because the compiler does not verify whether they are handled.

```text
No Compile-Time Check
```

---

# Checked Exception Example

```java
import java.io.*;

public class Test {

    public static void main(String[] args) {

        try {

            FileReader file =
                    new FileReader(
                            "abc.txt");

        } catch (FileNotFoundException e) {

            System.out.println(
                    "File Not Found");
        }
    }
}
```

---

# Unchecked Exception Example

```java
public class Test {

    public static void main(String[] args) {

        String str = null;

        System.out.println(
                str.length());
    }
}
```

Compiles successfully but fails at runtime.

---

# Memory Trick

## Checked Exception

```text
Compiler Checks
```

Examples:

```java
IOException
SQLException
InterruptedException
```

---

## Unchecked Exception

```text
Programmer Checks
```

Examples:

```java
NullPointerException
ArithmeticException
NumberFormatException
```

---

# Checked vs Unchecked Exceptions

| Feature | Checked Exception | Unchecked Exception |
|----------|------------------|---------------------|
| Checked By Compiler | ✅ Yes | ❌ No |
| Checked At | Compile Time | Runtime |
| Must Handle | ✅ Yes | ❌ No |
| Parent Class | Exception | RuntimeException |
| Compilation Error If Ignored | ✅ Yes | ❌ No |
| Represents | Recoverable Conditions | Programming Errors |

---

# Examples Comparison

## Checked

```java
FileReader file =
        new FileReader(
                "test.txt");
```

Compiler forces handling.

---

## Unchecked

```java
int result =
        10 / 0;
```

Compiler allows execution.

Runtime failure occurs.

---

# Why Did Java Introduce Checked Exceptions?

Checked exceptions represent:

```text
Recoverable Problems
```

Examples:

```text
File Missing
Database Down
Network Failure
```

The caller can potentially recover.

---

# Why Are Unchecked Exceptions Not Forced?

Unchecked exceptions usually indicate:

```text
Programming Bugs
```

Examples:

```text
Null Pointer
Invalid Index
Division By Zero
```

These should be fixed in code rather than recovered from.

---

# Custom Checked Exception

```java
class InvalidAgeException
        extends Exception {

    public InvalidAgeException(
            String message) {

        super(message);
    }
}
```

Usage:

```java
throw new InvalidAgeException(
        "Age Must Be 18+");
```

Must be handled.

---

# Custom Unchecked Exception

```java
class InvalidAgeException
        extends RuntimeException {

    public InvalidAgeException(
            String message) {

        super(message);
    }
}
```

Handling is optional.

---

# Best Practices

## Use Checked Exceptions When

The caller can recover.

Examples:

```text
File Not Found
Database Connection Failure
Network Timeout
```

---

## Use Unchecked Exceptions When

The problem is due to programming mistakes.

Examples:

```text
Null Values
Invalid Arguments
Incorrect State
```

---

# Real-World Examples

## Checked Exception

```java
Connection connection =
        DriverManager.getConnection(url);
```

May throw:

```java
SQLException
```

Caller can retry or show an error message.

---

## Unchecked Exception

```java
String name = null;

name.length();
```

Throws:

```java
NullPointerException
```

Usually indicates a bug.

---

# Interview Trick Questions

## Q1: Are All Exceptions Checked?

❌ No.

Exceptions extending:

```java
RuntimeException
```

are unchecked.

---

## Q2: Is RuntimeException Checked?

❌ No.

It is an unchecked exception.

---

## Q3: Is IOException Checked?

✅ Yes.

Must be handled or declared.

---

## Q4: Can We Catch Unchecked Exceptions?

✅ Yes.

```java
try {

} catch (RuntimeException e) {

}
```

---

## Q5: Which Is Better?

Neither.

Use:

```text
Checked Exceptions
→ Recoverable Problems

Unchecked Exceptions
→ Programming Errors
```

---

# Key Interview Points

- Checked exceptions are verified by the compiler and must be handled or declared.
- Unchecked exceptions occur at runtime and are not checked by the compiler.
- Checked exceptions extend `Exception` (excluding `RuntimeException`).
- Unchecked exceptions extend `RuntimeException`.
- Checked exceptions represent recoverable conditions.
- Unchecked exceptions usually indicate programming mistakes.
- Examples of checked exceptions include `IOException`, `SQLException`, and `InterruptedException`.
- Examples of unchecked exceptions include `NullPointerException`, `ArithmeticException`, and `ArrayIndexOutOfBoundsException`.

## One-Line Interview Answer

**Checked exceptions are compile-time exceptions that must be handled or declared, whereas unchecked exceptions are runtime exceptions that are not enforced by the compiler and typically represent programming errors.**

---

<h1 id="difference-between-throw-and-throws" style="text-decoration: underline;"> 39) Difference between `throw` and `throws` </h1>

One of the most frequently asked Java interview questions is:

> What is the difference between `throw` and `throws`?

Although both are related to exception handling, they serve completely different purposes.

---

# Quick Definition

## `throw`

Used to explicitly throw an exception object.

```java
throw new Exception();
```

---

## `throws`

Used in a method signature to declare exceptions that a method may throw.

```java
public void readFile()
        throws IOException {
}
```

---

# Simple Explanation

```text
throw
→ Actually throws an exception

throws
→ Declares that a method may throw exceptions
```

---

# `throw` Keyword

## Purpose

Used to explicitly create and throw an exception.

---

## Syntax

```java
throw new ExceptionType(
        "Error Message");
```

---

## Example

```java
public class Test {

    public static void main(String[] args) {

        throw new RuntimeException(
                "Something went wrong");
    }
}
```

Output:

```text
Exception in thread "main"
java.lang.RuntimeException:
Something went wrong
```

---

# Throwing a Checked Exception

```java
throw new IOException(
        "File Not Found");
```

Compilation Error:

```text
Unhandled exception:
IOException
```

Must be handled or declared.

---

# Example

```java
public static void main(String[] args)
        throws IOException {

    throw new IOException(
            "File Missing");
}
```

Output:

```text
java.io.IOException:
File Missing
```

---

# `throws` Keyword

## Purpose

Used to declare exceptions that a method may throw.

---

## Syntax

```java
returnType methodName()
        throws ExceptionType {

}
```

---

## Example

```java
public void readFile()
        throws IOException {

    FileReader file =
            new FileReader(
                    "data.txt");
}
```

Meaning:

```text
This Method May Throw IOException
```

The caller must handle it.

---

# Example

```java
public void readFile()
        throws IOException {

}
```

Caller:

```java
try {

    readFile();

} catch (IOException e) {

    e.printStackTrace();
}
```

---

# How `throw` Works

```java
if(age < 18) {

    throw new IllegalArgumentException(
            "Age Must Be 18+");
}
```

Output:

```text
Exception Generated Immediately
```

---

# How `throws` Works

```java
public void validateAge(int age)
        throws Exception {

}
```

No exception is generated here.

It only informs the caller.

---

# Example Using Both Together

```java
public void validateAge(int age)
        throws Exception {

    if(age < 18) {

        throw new Exception(
                "Invalid Age");
    }
}
```

---

Explanation:

```text
throws
→ Declares Exception

throw
→ Actually Throws Exception
```

---

# Real-World Example

```java
public void withdraw(
        double amount)
        throws Exception {

    if(amount > balance) {

        throw new Exception(
                "Insufficient Balance");
    }
}
```

Here:

```java
throws Exception
```

declares the possibility.

---

```java
throw new Exception(...)
```

actually throws the exception.

---

# Multiple Exceptions with `throws`

```java
public void process()
        throws IOException,
               SQLException,
               ClassNotFoundException {

}
```

A method can declare multiple exceptions.

---

# Can We Throw Multiple Exceptions?

❌ No.

Only one exception object can be thrown at a time.

Example:

```java
throw new IOException();
```

or

```java
throw new SQLException();
```

---

# Custom Exception Example

## Custom Exception

```java
class InvalidAgeException
        extends Exception {

    public InvalidAgeException(
            String message) {

        super(message);
    }
}
```

---

## Using `throw`

```java
if(age < 18) {

    throw new InvalidAgeException(
            "Age Must Be 18+");
}
```

---

## Using `throws`

```java
public void validateAge(int age)
        throws InvalidAgeException {

}
```

---

# `throw` vs `throws`

| Feature | `throw` | `throws` |
|----------|----------|-----------|
| Purpose | Throws an exception | Declares an exception |
| Used With | Exception Object | Exception Class |
| Location | Inside Method | Method Signature |
| Number Allowed | One Exception Object | Multiple Exceptions |
| Generates Exception | ✅ Yes | ❌ No |
| Compile-Time Declaration | ❌ No | ✅ Yes |
| Followed By | `new Exception()` | `ExceptionClass` |

---

# Example Comparison

## Using `throw`

```java
throw new ArithmeticException(
        "Division By Zero");
```

Actually creates and throws exception.

---

## Using `throws`

```java
public void divide()
        throws ArithmeticException {

}
```

Only declares possibility.

---

# Flow Diagram

```text
Method
   │
   ▼
throws IOException
   │
   ▼
Method Executes
   │
   ▼
throw new IOException()
   │
   ▼
Exception Propagates
```

---

# Common Interview Examples

## Example 1

```java
public static void main(String[] args)
        throws Exception {

    throw new Exception(
            "Demo");
}
```

Output:

```text
Exception: Demo
```

---

## Example 2

```java
public static void test()
        throws IOException {

}
```

Output:

```text
No Exception Thrown
```

Only declaration exists.

---

# Interview Trick Questions

## Q1: Can `throw` Throw Multiple Exceptions?

❌ No.

Only one exception object at a time.

---

## Q2: Can `throws` Declare Multiple Exceptions?

✅ Yes.

```java
throws IOException,
       SQLException
```

---

## Q3: Is `throws` Mandatory for Unchecked Exceptions?

❌ No.

Example:

```java
NullPointerException
ArithmeticException
```

do not require declaration.

---

## Q4: Which Keyword Actually Creates the Exception?

✅ `throw`

Example:

```java
throw new Exception();
```

---

## Q5: Which Keyword Is Used in Method Signature?

✅ `throws`

Example:

```java
public void process()
        throws IOException {
}
```

---

# Key Interview Points

- `throw` is used to explicitly throw an exception object.
- `throws` is used to declare exceptions in a method signature.
- `throw` is followed by an exception object.
- `throws` is followed by exception class names.
- `throw` actually generates an exception.
- `throws` only informs callers about possible exceptions.
- A method can declare multiple exceptions using `throws`.
- Only one exception object can be thrown at a time using `throw`.

## One-Line Interview Answer

**`throw` is used to explicitly create and throw an exception object inside a method, whereas `throws` is used in a method signature to declare the exceptions that the method may throw.**

---

<h1 id="what-is-optional-in-java" style="text-decoration: underline;"> 40) What is `Optional` in Java?</h1>

## Definition

`Optional` is a container object introduced in **Java 8** that may or may not contain a non-null value.

It is used to avoid:

```java
NullPointerException (NPE)
```

and makes null handling more explicit and readable.

---

# Simple Definition

```text
Optional is a wrapper object
that represents the presence
or absence of a value.
```

---

# Why Was Optional Introduced?

Before Java 8, methods often returned:

```java
null
```

Example:

```java
public String getName() {

    return null;
}
```

Usage:

```java
String name =
        getName();

System.out.println(
        name.length());
```

Output:

```text
NullPointerException
```

---

# Solution Using Optional

```java
public Optional<String> getName() {

    return Optional.of(
            "John");
}
```

Usage:

```java
Optional<String> name =
        getName();

name.ifPresent(
        System.out::println);
```

Safer and more expressive.

---

# Package

```java
java.util.Optional
```

---

# Creating Optional Objects

## 1. `Optional.of()`

Used when value is definitely not null.

```java
Optional<String> name =
        Optional.of("John");
```

---

### Example

```java
System.out.println(
        name.get());
```

Output:

```text
John
```

---

### If Null Is Passed

```java
Optional.of(null);
```

Output:

```text
NullPointerException
```

---

# 2. `Optional.ofNullable()`

Used when value may be null.

```java
Optional<String> name =
        Optional.ofNullable(null);
```

No exception occurs.

---

### Example

```java
Optional<String> name =
        Optional.ofNullable(
                getName());
```

---

# 3. `Optional.empty()`

Creates an empty Optional.

```java
Optional<String> name =
        Optional.empty();
```

Represents:

```text
No Value Present
```

---

# Checking Value Presence

## `isPresent()`

```java
Optional<String> name =
        Optional.of("John");

if(name.isPresent()) {

    System.out.println(
            name.get());
}
```

Output:

```text
John
```

---

# `isEmpty()` (Java 11)

```java
if(name.isEmpty()) {

    System.out.println(
            "No Value");
}
```

---

# Retrieving Values

## `get()`

Returns value if present.

```java
Optional<String> name =
        Optional.of("John");

System.out.println(
        name.get());
```

Output:

```text
John
```

---

### Danger

```java
Optional.empty().get();
```

Output:

```text
NoSuchElementException
```

Avoid using `get()` without checking.

---

# `orElse()`

Returns default value if empty.

```java
Optional<String> name =
        Optional.empty();

String result =
        name.orElse("Guest");

System.out.println(result);
```

Output:

```text
Guest
```

---

# `orElseGet()`

Uses a supplier to generate default value.

```java
String result =
        name.orElseGet(
                () -> "Guest");
```

---

# Difference

```java
orElse()
```

Always evaluates the default value.

---

```java
orElseGet()
```

Evaluates only when Optional is empty.

---

# `orElseThrow()`

Throws exception if value is absent.

```java
String name =
        optional.orElseThrow(
                () ->
                    new RuntimeException(
                            "Name Not Found"));
```

---

# `ifPresent()`

Executes code only if value exists.

```java
Optional<String> name =
        Optional.of("John");

name.ifPresent(
        System.out::println);
```

Output:

```text
John
```

---

# Example

Without Optional:

```java
String name =
        getName();

if(name != null) {

    System.out.println(
            name.toUpperCase());
}
```

---

With Optional:

```java
Optional.ofNullable(
        getName())
        .ifPresent(
                value ->
                        System.out.println(
                                value.toUpperCase()));
```

Cleaner and safer.

---

# Transforming Values

## `map()`

Transforms contained value.

```java
Optional<String> name =
        Optional.of("john");
```

---

```java
Optional<String> upperCase =
        name.map(
                String::toUpperCase);
```

Output:

```text
JOHN
```

---

# Example

```java
Optional<String> result =
        Optional.of("John")
                .map(String::toUpperCase)
                .map(String::trim);
```

---

# `filter()`

Filters values.

```java
Optional<String> name =
        Optional.of("John");
```

---

```java
Optional<String> result =
        name.filter(
                n ->
                    n.startsWith("J"));
```

Output:

```text
Optional[John]
```

---

# Example

```java
Optional<String> result =
        Optional.of("John")
                .filter(
                        n ->
                            n.length() > 5);
```

Output:

```text
Optional.empty
```

---

# `flatMap()`

Used when mapping functions already return Optional.

---

Without flatMap:

```java
Optional<Optional<String>>
```

---

With flatMap:

```java
Optional<String>
```

---

Example:

```java
optional.flatMap(
        this::findName);
```

---

# Real-World Example

```java
public Optional<Employee>
findEmployee(int id) {

    return employeeRepository
            .findById(id);
}
```

Usage:

```java
Employee employee =
        findEmployee(101)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Employee Not Found"));
```

---

# Optional Processing Pipeline

```java
Optional.of("John")
        .map(String::toUpperCase)
        .filter(
                name ->
                        name.startsWith("J"))
        .ifPresent(
                System.out::println);
```

Output:

```text
JOHN
```

---

# Advantages of Optional

### Avoids NullPointerException

Most common benefit.

---

### Better API Design

Method signature clearly indicates:

```text
Value May Be Missing
```

---

### Improved Readability

Eliminates repetitive null checks.

---

### Functional Programming Support

Works seamlessly with:

```java
map()
filter()
flatMap()
```

---

### Encourages Explicit Null Handling

Developers are forced to think about missing values.

---

# Disadvantages of Optional

### Small Performance Overhead

Extra wrapper object.

---

### Not Intended for Fields

Avoid:

```java
class Employee {

    Optional<String> name;
}
```

Use normal fields instead.

---

### Not Serializable

Generally unsuitable for entity classes.

---

# Optional vs Null

| Feature | Optional | Null |
|----------|-----------|------|
| Null Safety | ✅ Yes | ❌ No |
| Readability | High | Low |
| NPE Risk | Low | High |
| Functional Operations | ✅ Yes | ❌ No |
| Explicit Missing Value | ✅ Yes | ❌ No |

---

# Best Practices

## Return Optional

Good:

```java
public Optional<Employee>
findEmployee(int id)
```

---

## Avoid Using Optional as Parameter

Bad:

```java
public void save(
        Optional<Employee> employee)
```

Prefer:

```java
public void save(
        Employee employee)
```

---

## Avoid get()

Bad:

```java
optional.get();
```

Prefer:

```java
optional.orElse(...)
```

or

```java
optional.orElseThrow(...)
```

---

# Interview Trick Questions

## Q1: When Was Optional Introduced?

```java
Java 8
```

---

## Q2: What Problem Does Optional Solve?

```text
NullPointerException
```

---

## Q3: Difference Between `of()` and `ofNullable()`?

### `of()`

```java
Optional.of(null)
```

Throws:

```text
NullPointerException
```

---

### `ofNullable()`

```java
Optional.ofNullable(null)
```

Creates:

```text
Optional.empty
```

---

## Q4: Is Optional a Replacement for Every Null?

❌ No.

Mostly intended for:

```java
Method Return Types
```

---

## Q5: What Happens If `get()` Is Called on an Empty Optional?

```text
NoSuchElementException
```

---

# Key Interview Points

- `Optional` was introduced in Java 8 to reduce `NullPointerException`.
- It is a container object that may or may not contain a value.
- Common factory methods are `of()`, `ofNullable()`, and `empty()`.
- Common retrieval methods are `get()`, `orElse()`, `orElseGet()`, and `orElseThrow()`.
- Functional methods include `map()`, `filter()`, `flatMap()`, and `ifPresent()`.
- Optional improves API design by explicitly indicating that a value may be absent.
- It is primarily recommended for method return types.
- Avoid using `get()` without checking value presence.

## One-Line Interview Answer

**`Optional` is a Java 8 container class that represents the presence or absence of a value, helping developers avoid `NullPointerException` and write cleaner, more expressive code.**

---

<h1 id="what-is-a-functional-interface" style="text-decoration: underline;"> 41) What is a functional interface?</h1>

## Definition

A **Functional Interface** is an interface that contains **exactly one abstract method**.

It was introduced in:

```java
Java 8
```

to support:

```text
Lambda Expressions
Method References
Functional Programming
```

---

# Simple Definition

```text
A Functional Interface is an interface
with exactly one abstract method,
which can be implemented using
a lambda expression.
```

---

# Why Was Functional Interface Introduced?

Before Java 8:

```java
Runnable runnable =
        new Runnable() {

            @Override
            public void run() {

                System.out.println(
                        "Running");
            }
        };
```

Required a lot of boilerplate code.

---

With Java 8:

```java
Runnable runnable =
        () -> System.out.println(
                "Running");
```

Cleaner and more readable.

---

# Syntax

```java
@FunctionalInterface
interface InterfaceName {

    void method();
}
```

---

# Example

```java
@FunctionalInterface
interface Greeting {

    void sayHello();
}
```

Implementation using lambda:

```java
Greeting greeting =
        () -> System.out.println(
                "Hello");
```

Usage:

```java
greeting.sayHello();
```

Output:

```text
Hello
```

---

# Rules of Functional Interface

A functional interface must have:

```java
Exactly One Abstract Method
```

---

### Valid Example

```java
@FunctionalInterface
interface Calculator {

    int add(
            int a,
            int b);
}
```

---

### Invalid Example

```java
@FunctionalInterface
interface Calculator {

    int add(
            int a,
            int b);

    int subtract(
            int a,
            int b);
}
```

Compilation Error:

```text
Multiple abstract methods found
```

---

# What About Default Methods?

Functional interfaces can have:

```java
default methods
```

---

Example:

```java
@FunctionalInterface
interface Greeting {

    void sayHello();

    default void welcome() {

        System.out.println(
                "Welcome");
    }
}
```

Valid Functional Interface.

---

# What About Static Methods?

Allowed.

Example:

```java
@FunctionalInterface
interface Greeting {

    void sayHello();

    static void info() {

        System.out.println(
                "Greeting Interface");
    }
}
```

Still valid.

---

# What About Object Class Methods?

Methods inherited from:

```java
java.lang.Object
```

do not count as abstract methods.

Example:

```java
@FunctionalInterface
interface Test {

    void execute();

    String toString();
}
```

Still valid.

---

# @FunctionalInterface Annotation

```java
@FunctionalInterface
```

is optional but recommended.

---

Benefits:

```text
Compile-Time Validation
Better Readability
Self Documentation
```

---

Example:

```java
@FunctionalInterface
interface Printer {

    void print();
}
```

If another abstract method is added:

```java
void scan();
```

Compilation Error occurs immediately.

---

# Functional Interface Without Annotation

Valid:

```java
interface Printer {

    void print();
}
```

Still a functional interface because it has one abstract method.

---

# Lambda Expression Example

Functional Interface:

```java
@FunctionalInterface
interface Calculator {

    int add(
            int a,
            int b);
}
```

---

Implementation:

```java
Calculator calculator =
        (a, b) -> a + b;
```

---

Usage:

```java
System.out.println(
        calculator.add(10, 20));
```

Output:

```text
30
```

---

# Method Reference Example

Functional Interface:

```java
@FunctionalInterface
interface Message {

    void print(
            String msg);
}
```

---

Implementation:

```java
Message message =
        System.out::println;
```

Usage:

```java
message.print("Hello");
```

Output:

```text
Hello
```

---

# Common Built-in Functional Interfaces

Java provides several functional interfaces in:

```java
java.util.function
```

---

## Predicate

Used for testing conditions.

```java
Predicate<Integer> even =
        n -> n % 2 == 0;
```

---

```java
System.out.println(
        even.test(10));
```

Output:

```text
true
```

---

## Function

Transforms one value into another.

```java
Function<String, Integer> length =
        str -> str.length();
```

---

```java
System.out.println(
        length.apply("Java"));
```

Output:

```text
4
```

---

## Consumer

Consumes data and returns nothing.

```java
Consumer<String> printer =
        System.out::println;
```

---

```java
printer.accept("Hello");
```

Output:

```text
Hello
```

---

## Supplier

Produces data.

```java
Supplier<String> supplier =
        () -> "Java";
```

---

```java
System.out.println(
        supplier.get());
```

Output:

```text
Java
```

---

## Runnable

One of the oldest functional interfaces.

```java
Runnable task =
        () -> System.out.println(
                "Task Running");
```

---

# Custom Functional Interface Example

```java
@FunctionalInterface
interface EmployeeValidator {

    boolean validate(
            String employeeId);
}
```

Implementation:

```java
EmployeeValidator validator =
        id -> id.startsWith("EMP");
```

Usage:

```java
System.out.println(
        validator.validate(
                "EMP101"));
```

Output:

```text
true
```

---

# Real-World Example

Sorting employees:

```java
employees.sort(
        (e1, e2) ->
                e1.getName()
                  .compareTo(
                          e2.getName()));
```

Lambda expression works because:

```java
Comparator
```

is a functional interface.

---

# Functional Interface vs Normal Interface

| Feature | Functional Interface | Normal Interface |
|----------|---------------------|------------------|
| Abstract Methods | Exactly 1 | Multiple Allowed |
| Lambda Support | ✅ Yes | ❌ No |
| Method Reference Support | ✅ Yes | ❌ No |
| @FunctionalInterface | Recommended | Not Applicable |
| Java 8 Feature | ✅ Yes | ❌ No |

---

# Advantages of Functional Interfaces

### Enables Lambda Expressions

Less code and better readability.

---

### Supports Functional Programming

Makes code more declarative.

---

### Improves Maintainability

Reduces anonymous class usage.

---

### Better Integration with Streams

Works seamlessly with:

```java
Stream API
```

---

### Encourages Reusable Behavior

Functions can be passed as arguments.

---

# Common Functional Interfaces in Java

| Interface | Method |
|------------|---------|
| Runnable | run() |
| Callable | call() |
| Comparator | compare() |
| Predicate | test() |
| Function | apply() |
| Consumer | accept() |
| Supplier | get() |

---

# Interview Trick Questions

## Q1: Can a Functional Interface Have Default Methods?

✅ Yes.

```java
default void method() {}
```

does not count as an abstract method.

---

## Q2: Can a Functional Interface Have Static Methods?

✅ Yes.

---

## Q3: Is `@FunctionalInterface` Mandatory?

❌ No.

It is optional but recommended.

---

## Q4: Can a Functional Interface Extend Another Interface?

✅ Yes.

Provided the resulting interface still has only one abstract method.

---

## Q5: Is `Comparator` a Functional Interface?

✅ Yes.

Because it contains one abstract method:

```java
compare()
```

---

# Key Interview Points

- A Functional Interface contains exactly one abstract method.
- Introduced in Java 8 to support lambda expressions and method references.
- The `@FunctionalInterface` annotation provides compile-time validation.
- Functional interfaces can contain default, static, and private methods.
- Common examples are `Runnable`, `Callable`, `Comparator`, `Predicate`, `Function`, `Consumer`, and `Supplier`.
- They are the foundation of Java's functional programming features and Stream API.
- Lambda expressions can only be assigned to functional interfaces.

## One-Line Interview Answer

**A Functional Interface is an interface with exactly one abstract method, introduced in Java 8 to support lambda expressions, method references, and functional programming concepts.**

---

<h1 id="what-are-lambda-expressions-in-java" style="text-decoration: underline;"> 42) What Are Lambda Expressions in Java?</h1>

## Definition

A **Lambda Expression** is a short and concise way to represent an anonymous function in Java.

It was introduced in:

```java
Java 8
```

primarily to support:

```text
Functional Programming
Functional Interfaces
Stream API
```

---

# Simple Definition

```text
A Lambda Expression is an
anonymous function that can be
passed around like an object.
```

It allows you to write behavior without creating a separate class.

---

# Why Were Lambda Expressions Introduced?

Before Java 8, implementing an interface required:

```java
Anonymous Inner Classes
```

Example:

```java
Runnable task =
        new Runnable() {

            @Override
            public void run() {

                System.out.println(
                        "Task Running");
            }
        };
```

A lot of boilerplate code.

---

# Lambda Solution

```java
Runnable task =
        () -> System.out.println(
                "Task Running");
```

Cleaner and easier to read.

---

# Syntax

```java
(parameters) -> expression
```

or

```java
(parameters) -> {

    // multiple statements
}
```

---

# Basic Example

Without Lambda:

```java
Runnable task =
        new Runnable() {

            @Override
            public void run() {

                System.out.println(
                        "Hello Java");
            }
        };
```

---

With Lambda:

```java
Runnable task =
        () -> System.out.println(
                "Hello Java");
```

---

# Anatomy of a Lambda Expression

Example:

```java
(a, b) -> a + b
```

Parts:

```text
(a, b)      → Parameters
   ->
Lambda Operator
a + b       → Body
```

---

# Lambda with No Parameters

```java
() -> System.out.println(
        "Hello");
```

---

# Lambda with One Parameter

```java
name -> System.out.println(
        name);
```

---

# Lambda with Multiple Parameters

```java
(a, b) -> a + b
```

---

# Lambda with Multiple Statements

```java
(a, b) -> {

    System.out.println(
            "Calculating");

    return a + b;
}
```

---

# Functional Interface Requirement

Lambda expressions work only with:

```java
Functional Interfaces
```

A functional interface contains:

```text
Exactly One Abstract Method
```

---

Example:

```java
@FunctionalInterface
interface Calculator {

    int add(
            int a,
            int b);
}
```

---

Using Lambda:

```java
Calculator calculator =
        (a, b) -> a + b;
```

---

Usage:

```java
System.out.println(
        calculator.add(
                10,
                20));
```

Output:

```text
30
```

---

# Example with Runnable

```java
Runnable task =
        () -> {

            System.out.println(
                    "Running...");
        };

task.run();
```

Output:

```text
Running...
```

---

# Example with Comparator

Before Java 8:

```java
Collections.sort(
        employees,
        new Comparator<Employee>() {

            @Override
            public int compare(
                    Employee e1,
                    Employee e2) {

                return e1.getName()
                         .compareTo(
                                 e2.getName());
            }
        });
```

---

With Lambda:

```java
employees.sort(

        (e1, e2) ->
                e1.getName()
                  .compareTo(
                          e2.getName())
);
```

Much cleaner.

---

# Type Inference

Java automatically determines parameter types.

Example:

```java
(a, b) -> a + b
```

Compiler infers types.

Equivalent to:

```java
(int a,
 int b) -> a + b
```

---

# Lambda with Return Value

```java
Calculator calculator =
        (a, b) -> a + b;
```

Output:

```text
Returns Sum
```

---

# Lambda with Block Body

```java
Calculator calculator =
        (a, b) -> {

            int result =
                    a + b;

            return result;
        };
```

---

# Lambda and Streams

One of the most common uses.

Example:

```java
List<String> names =
        List.of(
                "John",
                "Alex",
                "David");
```

---

Filter names:

```java
names.stream()
     .filter(
             name ->
                     name.startsWith("A"))
     .forEach(
             System.out::println);
```

Output:

```text
Alex
```

---

# Lambda and Predicate

```java
Predicate<Integer> even =
        n -> n % 2 == 0;
```

Usage:

```java
System.out.println(
        even.test(10));
```

Output:

```text
true
```

---

# Lambda and Function

```java
Function<String, Integer> length =
        str -> str.length();
```

Usage:

```java
System.out.println(
        length.apply(
                "Java"));
```

Output:

```text
4
```

---

# Lambda and Consumer

```java
Consumer<String> printer =
        msg -> System.out.println(
                msg);
```

Usage:

```java
printer.accept(
        "Hello");
```

Output:

```text
Hello
```

---

# Lambda and Supplier

```java
Supplier<String> supplier =
        () -> "Java";
```

Usage:

```java
System.out.println(
        supplier.get());
```

Output:

```text
Java
```

---

# Method Reference vs Lambda

Lambda:

```java
name ->
        System.out.println(name)
```

---

Method Reference:

```java
System.out::println
```

Both are equivalent.

---

# Variable Capture

Lambda can access:

```java
Final Variables
```

or

```java
Effectively Final Variables
```

---

Example:

```java
int number = 10;

Runnable task =
        () -> System.out.println(
                number);
```

Valid.

---

Invalid:

```java
int number = 10;

number++;

Runnable task =
        () -> System.out.println(
                number);
```

Compilation Error.

---

# Advantages of Lambda Expressions

### Less Boilerplate Code

Reduces anonymous inner class code.

---

### Improved Readability

Code becomes cleaner and easier to understand.

---

### Functional Programming Support

Enables functional-style programming.

---

### Better Collection Processing

Works seamlessly with Stream API.

---

### Easier Parallel Processing

Used extensively with:

```java
parallelStream()
```

---

# Disadvantages of Lambda Expressions

### Debugging Can Be Harder

Stack traces may be less intuitive.

---

### Overuse Reduces Readability

Complex lambdas can become difficult to maintain.

---

### Not Suitable for Large Logic Blocks

For complex logic, regular methods are often better.

---

# Anonymous Class vs Lambda

| Feature | Anonymous Class | Lambda Expression |
|----------|----------------|-------------------|
| Boilerplate Code | More | Less |
| Readability | Moderate | High |
| Introduced In | Java 1.1 | Java 8 |
| Functional Interface Required | ❌ No | ✅ Yes |
| Performance | Slightly Lower | Better |
| Supports Functional Programming | ❌ No | ✅ Yes |

---

# Real-World Example

Sorting Employees:

```java
employees.sort(
        (e1, e2) ->
                Double.compare(
                        e1.getSalary(),
                        e2.getSalary()));
```

Filtering Active Employees:

```java
employees.stream()
         .filter(
                 emp ->
                         emp.isActive())
         .forEach(
                 System.out::println);
```

---

# Interview Trick Questions

## Q1: Can Lambda Expressions Work Without Functional Interfaces?

❌ No.

They require:

```java
Exactly One Abstract Method
```

---

## Q2: Are Lambda Expressions Objects?

✅ Yes.

They are treated as instances of functional interfaces.

---

## Q3: Can Lambda Expressions Access Local Variables?

✅ Yes.

Only if they are:

```text
Final
or
Effectively Final
```

---

## Q4: Can a Lambda Expression Have Multiple Statements?

✅ Yes.

Using:

```java
{
   ...
}
```

block syntax.

---

## Q5: What Is the Main Purpose of Lambda Expressions?

```text
Reduce Boilerplate Code
And
Enable Functional Programming
```

---

# Key Interview Points

- Lambda Expressions were introduced in Java 8.
- They provide a concise way to represent anonymous functions.
- They work only with functional interfaces.
- Syntax uses the `->` operator.
- They reduce boilerplate code compared to anonymous inner classes.
- Lambda expressions are heavily used with Stream API and collections.
- They support functional programming concepts.
- Local variables accessed inside lambdas must be final or effectively final.

## One-Line Interview Answer

**A Lambda Expression is a concise way to represent an anonymous function in Java, introduced in Java 8, primarily used with functional interfaces to reduce boilerplate code and enable functional programming.**

---

<h1 id="when-to-use-abstract-class-and-when-to-use-interface-in-java" style="text-decoration: underline;"> 43) When to Use Abstract Class and When to Use Interface in Java?</h1>

One of the most frequently asked Java interview questions is:

> When should we use an Abstract Class and when should we use an Interface?

The answer depends on whether you need:

```text
Shared State + Common Implementation
                OR
A Contract / Capability
```

---

# Quick Rule

## Use Abstract Class When

```text
Classes are closely related
Need common state (fields)
Need common implementation
Need constructor support
```

Example:

```text
Vehicle
  ├── Car
  ├── Bike
  └── Truck
```

All vehicles share common properties.

---

## Use Interface When

```text
Need a contract
Need multiple inheritance
Unrelated classes share behavior
```

Example:

```text
Flyable
```

Can be implemented by:

```text
Bird
Aeroplane
Drone
```

---

# Abstract Class

## Definition

An abstract class is a class that:

```java
abstract class Vehicle {
}
```

cannot be instantiated and may contain:

- Abstract methods
- Concrete methods
- Instance variables
- Constructors

---

# Example

```java
abstract class Vehicle {

    protected String brand;

    public Vehicle(String brand) {

        this.brand = brand;
    }

    abstract void start();

    public void displayBrand() {

        System.out.println(brand);
    }
}
```

---

```java
class Car
        extends Vehicle {

    public Car(String brand) {

        super(brand);
    }

    @Override
    void start() {

        System.out.println(
                "Car Started");
    }
}
```

---

# Why Use Abstract Class?

Because:

```text
All Vehicles Have
Common State
Common Behavior
```

Example:

```java
brand
speed
fuelType
```

These belong in a parent abstract class.

---

# Interface

## Definition

An interface defines a contract that implementing classes must follow.

```java
interface Flyable {
}
```

---

# Example

```java
interface Flyable {

    void fly();
}
```

---

```java
class Bird
        implements Flyable {

    @Override
    public void fly() {

        System.out.println(
                "Bird Flying");
    }
}
```

---

```java
class Drone
        implements Flyable {

    @Override
    public void fly() {

        System.out.println(
                "Drone Flying");
    }
}
```

---

# Why Use Interface?

Because:

```text
Bird IS NOT A Drone
Drone IS NOT A Plane
```

But all can:

```text
Fly
```

Interface models capability.

---

# Real-World Example

## Abstract Class

```java
abstract class Employee {

    protected int employeeId;
    protected String name;

    public void login() {

        System.out.println(
                "Employee Login");
    }

    abstract double calculateSalary();
}
```

---

```java
class Developer
        extends Employee {

    @Override
    double calculateSalary() {

        return 100000;
    }
}
```

Common employee behavior exists.

---

# Interface Example

```java
interface TaxPayer {

    void payTax();
}
```

Implemented by:

```java
Employee
Company
Freelancer
```

These classes are unrelated but share a capability.

---

# When to Use Abstract Class

Use an abstract class when:

---

## 1. Classes Are Closely Related

Example:

```text
Vehicle
Car
Bike
Truck
```

---

## 2. Need Common Fields

```java
protected String name;
protected int id;
```

Interfaces cannot maintain instance state.

---

## 3. Need Constructors

```java
public Vehicle() {
}
```

Interfaces cannot have constructors.

---

## 4. Need Partial Implementation

```java
abstract void start();

void stop() {

}
```

Some methods common, some customizable.

---

## 5. Need Access Modifiers

```java
protected
private
public
```

Supported in abstract classes.

---

# When to Use Interface

Use an interface when:

---

## 1. Need a Contract

Example:

```java
interface PaymentProcessor {

    void processPayment();
}
```

---

## 2. Need Multiple Inheritance

Java doesn't support:

```java
class A extends B, C
```

But supports:

```java
class A
implements X, Y, Z
```

---

## 3. Unrelated Classes Share Behavior

Example:

```text
Bird
Airplane
Drone
```

All:

```text
Fly
```

---

## 4. Framework/API Design

Spring uses interfaces extensively.

Example:

```java
JpaRepository
CrudRepository
Runnable
Callable
Comparator
```

---

## 5. Need Loose Coupling

Programming to interfaces:

```java
PaymentService service =
        new CreditCardPayment();
```

instead of:

```java
CreditCardPayment service =
        new CreditCardPayment();
```

---

# Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|----------|---------------|------------|
| Inheritance Keyword | extends | implements |
| Multiple Inheritance | ❌ No | ✅ Yes |
| Constructors | ✅ Yes | ❌ No |
| Instance Variables | ✅ Yes | ❌ No |
| Abstract Methods | ✅ Yes | ✅ Yes |
| Concrete Methods | ✅ Yes | ✅ Yes (Default Methods) |
| Access Modifiers | All | Mostly Public |
| State Management | ✅ Yes | ❌ No |
| Best For | Common Base Class | Contract / Capability |

---

# Design Perspective

## Abstract Class

Represents:

```text
IS-A Relationship
```

Example:

```text
Car IS-A Vehicle
Bike IS-A Vehicle
```

---

## Interface

Represents:

```text
CAN-DO Relationship
```

Example:

```text
Bird CAN Fly
Drone CAN Fly
```

---

# Real Interview Example

### Abstract Class

```java
abstract class Animal {

    void eat() {

        System.out.println(
                "Eating");
    }

    abstract void sound();
}
```

---

```java
class Dog
        extends Animal {

    @Override
    void sound() {

        System.out.println(
                "Bark");
    }
}
```

---

### Interface

```java
interface Swimmable {

    void swim();
}
```

---

```java
class Fish
        implements Swimmable {

    @Override
    public void swim() {

        System.out.println(
                "Swimming");
    }
}
```

---

# Can We Use Both Together?

Yes.

This is common in enterprise applications.

Example:

```java
abstract class Employee {

    protected int id;
}
```

---

```java
interface TaxPayer {

    void payTax();
}
```

---

```java
class Developer
        extends Employee
        implements TaxPayer {

    @Override
    public void payTax() {

    }
}
```

Best of both worlds.

---

# Interview Trick Questions

## Q1: Can an Abstract Class Have Constructors?

✅ Yes.

---

## Q2: Can an Interface Have Constructors?

❌ No.

---

## Q3: Can an Interface Have Method Implementations?

✅ Yes.

Since Java 8:

```java
default methods
static methods
```

---

## Q4: Which Supports Multiple Inheritance?

✅ Interface

---

## Q5: Which Should Be Preferred in Enterprise Applications?

Generally:

```text
Interface for Contracts
Abstract Class for Shared Implementation
```

---

# Key Interview Points

- Use an abstract class when related classes share common state and behavior.
- Use an interface when defining a contract or capability.
- Abstract classes support constructors, instance variables, and partial implementations.
- Interfaces support multiple inheritance and loose coupling.
- Abstract classes represent an **IS-A** relationship.
- Interfaces represent a **CAN-DO** relationship.
- Enterprise applications often use both together.
- Prefer interfaces for flexibility and abstraction; use abstract classes for code reuse and shared state.

## One-Line Interview Answer

**Use an abstract class when multiple related classes share common state and implementation, and use an interface when you want to define a contract or capability that can be implemented by unrelated classes while supporting multiple inheritance and loose coupling.**

---

<h1 id="what-is-serialization-in-java" style="text-decoration: underline;"> 44) What is Serialization in Java?</h1>

## Definition

**Serialization** is the process of converting a Java object into a stream of bytes so that it can be:

- Saved to a file
- Sent over a network
- Stored in a database
- Transferred between JVMs

---

# Simple Definition

```text
Serialization converts an object
into a byte stream so it can be
stored or transmitted.
```

---

# Opposite Process

The reverse process is called:

```text
Deserialization
```

which converts the byte stream back into an object.

---

# Diagram

```text
Java Object
     │
     ▼
Serialization
     │
     ▼
Byte Stream
     │
     ▼
Stored / Sent
     │
     ▼
Deserialization
     │
     ▼
Java Object
```

---

# Why Do We Need Serialization?

Common use cases:

### Save Object State

```java
Employee Object
→ File
```

---

### Network Communication

```java
Client
→ Object
→ Server
```

---

### Caching

```java
Object
→ Redis
→ Retrieve Later
```

---

### Distributed Systems

```java
JVM 1
→ Serialize
→ Network
→ JVM 2
```

---

# Serializable Interface

To make a class serializable, it must implement:

```java
java.io.Serializable
```

Example:

```java
import java.io.Serializable;

class Employee
        implements Serializable {

    private int id;
    private String name;
}
```

---

# What is Serializable?

```java
public interface Serializable {
}
```

It is a:

```text
Marker Interface
```

because it contains no methods.

It simply tells JVM:

```text
This Object Can Be Serialized
```

---

# Serialization Example

## Employee Class

```java
import java.io.Serializable;

class Employee
        implements Serializable {

    private int id;
    private String name;

    public Employee(
            int id,
            String name) {

        this.id = id;
        this.name = name;
    }
}
```

---

## Serialize Object

```java
import java.io.*;

public class Test {

    public static void main(String[] args)
            throws Exception {

        Employee employee =
                new Employee(
                        101,
                        "John");

        FileOutputStream file =
                new FileOutputStream(
                        "employee.ser");

        ObjectOutputStream out =
                new ObjectOutputStream(
                        file);

        out.writeObject(employee);

        out.close();

        System.out.println(
                "Object Serialized");
    }
}
```

Output:

```text
Object Serialized
```

---

# Deserialization Example

```java
import java.io.*;

public class Test {

    public static void main(String[] args)
            throws Exception {

        FileInputStream file =
                new FileInputStream(
                        "employee.ser");

        ObjectInputStream in =
                new ObjectInputStream(
                        file);

        Employee employee =
                (Employee) in.readObject();

        in.close();

        System.out.println(
                "Object Deserialized");
    }
}
```

Output:

```text
Object Deserialized
```

---

# Important Classes

## Serialization

```java
ObjectOutputStream
```

Methods:

```java
writeObject()
```

---

## Deserialization

```java
ObjectInputStream
```

Methods:

```java
readObject()
```

---

# serialVersionUID

A serialized object contains a version identifier.

Example:

```java
private static final long
        serialVersionUID = 1L;
```

---

# Why Is It Needed?

Suppose:

Version 1:

```java
class Employee
        implements Serializable {

    int id;
}
```

---

Object serialized.

Later:

Version 2:

```java
class Employee
        implements Serializable {

    int id;
    String name;
}
```

Without matching versions:

```text
InvalidClassException
```

may occur during deserialization.

---

# Best Practice

Always define:

```java
private static final long
        serialVersionUID = 1L;
```

---

# transient Keyword

Sometimes fields should not be serialized.

Example:

```java
class Employee
        implements Serializable {

    private String name;

    transient String password;
}
```

---

During serialization:

```java
password
```

is ignored.

---

# Example

```java
Employee employee =
        new Employee();

employee.name =
        "John";

employee.password =
        "secret123";
```

After deserialization:

```java
name = John
password = null
```

---

# static Fields and Serialization

Static fields belong to the class, not the object.

Example:

```java
static String companyName;
```

They are **not serialized**.

---

# Serialization Memory View

Before Serialization:

```text
Employee Object
 ├── id = 101
 ├── name = John
 └── salary = 50000
```

---

After Serialization:

```text
101
John
50000
```

stored as bytes.

---

# What Happens If Serializable Is Not Implemented?

Example:

```java
class Employee {

}
```

Serialization:

```java
out.writeObject(employee);
```

Output:

```text
NotSerializableException
```

---

# Advantages of Serialization

### Persistent Storage

Save object state.

---

### Network Transfer

Send objects across systems.

---

### Easy Data Sharing

Between applications and JVMs.

---

### Supports Distributed Computing

Useful in microservices and clustering.

---

# Disadvantages of Serialization

### Performance Overhead

Converting objects to bytes takes time.

---

### Security Risks

Serialized data can be tampered with.

---

### Versioning Problems

Changes in class structure may break deserialization.

---

### Increased Memory Usage

Serialized data consumes storage.

---

# Serialization vs Deserialization

| Feature | Serialization | Deserialization |
|----------|--------------|----------------|
| Purpose | Object → Bytes | Bytes → Object |
| Stream Used | ObjectOutputStream | ObjectInputStream |
| Method | writeObject() | readObject() |
| Direction | JVM → Storage | Storage → JVM |

---

# Real-World Examples

### HTTP Session Replication

Web servers serialize session objects.

---

### Distributed Caching

Objects stored in:

```text
Redis
Hazelcast
Ehcache
```

---

### Messaging Systems

Objects transferred through:

```text
Kafka
RabbitMQ
ActiveMQ
```

---

### RMI (Remote Method Invocation)

Java objects sent across JVMs.

---

# Interview Trick Questions

## Q1: What Interface Is Required for Serialization?

```java
Serializable
```

---

## Q2: Is Serializable a Marker Interface?

✅ Yes.

Contains no methods.

---

## Q3: What Happens If Serializable Is Not Implemented?

```text
NotSerializableException
```

---

## Q4: Are Static Fields Serialized?

❌ No.

Static fields belong to the class.

---

## Q5: Are Transient Fields Serialized?

❌ No.

They are skipped.

---

## Q6: What Is serialVersionUID?

```text
Version Identifier
```

used during deserialization to verify compatibility.

---

## Q7: What Is the Opposite of Serialization?

```text
Deserialization
```

---

# Key Interview Points

- Serialization converts an object into a byte stream.
- Deserialization converts a byte stream back into an object.
- A class must implement `Serializable` to support serialization.
- `Serializable` is a marker interface.
- `ObjectOutputStream` is used for serialization.
- `ObjectInputStream` is used for deserialization.
- `transient` fields are not serialized.
- `static` fields are not serialized.
- `serialVersionUID` helps maintain version compatibility.
- If a class does not implement `Serializable`, a `NotSerializableException` is thrown.

## One-Line Interview Answer

**Serialization is the process of converting a Java object into a byte stream for storage or transmission, while deserialization reconstructs the object from that byte stream.**

---

<h1 id="difference-between-hashmap-and-concurrenthashmap-in-java" style="text-decoration: underline;"> 45) Difference Between `HashMap` and `ConcurrentHashMap` in Java</h1>

One of the most frequently asked Java concurrency interview questions is:

> What is the difference between `HashMap` and `ConcurrentHashMap`?

The key difference is:

```text
HashMap
→ Not Thread-Safe

ConcurrentHashMap
→ Thread-Safe
```

---

# Quick Definition

## HashMap

A non-synchronized implementation of the `Map` interface.

```java
Map<String, Integer> map =
        new HashMap<>();
```

Best suited for:

```text
Single-Threaded Applications
```

---

## ConcurrentHashMap

A thread-safe implementation of the `Map` interface designed for concurrent access.

```java
Map<String, Integer> map =
        new ConcurrentHashMap<>();
```

Best suited for:

```text
Multi-Threaded Applications
```

---

# Why HashMap Is Not Thread-Safe?

Consider:

```java
HashMap<Integer, String> map =
        new HashMap<>();
```

Two threads execute:

```java
Thread-1:
map.put(1, "A");
```

---

```java
Thread-2:
map.put(2, "B");
```

At the same time.

Result:

```text
Race Condition
Data Corruption
Lost Updates
Infinite Loop (older JDKs)
```

may occur.

---

# Example

```java
Map<Integer, String> map =
        new HashMap<>();
```

---

```java
Runnable task = () -> {

    for(int i = 0; i < 1000; i++) {

        map.put(i, "Value");
    }
};
```

Running multiple threads may produce unpredictable results.

---

# How ConcurrentHashMap Solves This?

```java
Map<Integer, String> map =
        new ConcurrentHashMap<>();
```

Internally it uses:

```text
Fine-Grained Synchronization
CAS Operations
Locking Only Required Portions
```

allowing multiple threads to work safely.

---

# Example

```java
Map<Integer, String> map =
        new ConcurrentHashMap<>();
```

---

```java
Runnable task = () -> {

    for(int i = 0; i < 1000; i++) {

        map.put(i, "Value");
    }
};
```

Multiple threads can update safely.

---

# Internal Working

## HashMap

```text
Array
  +
Linked List
  +
Red-Black Tree (Java 8+)
```

---

Memory:

```text
Bucket Array
    │
    ├── Node
    ├── Node
    └── Node
```

No synchronization.

---

# ConcurrentHashMap Internal Working

## Java 7

Used:

```text
Segment-Based Locking
```

---

Structure:

```text
Map
 ├── Segment 1
 ├── Segment 2
 ├── Segment 3
 └── Segment N
```

Only one segment locked at a time.

---

## Java 8+

Uses:

```text
CAS (Compare-And-Swap)
+
Synchronized Blocks
+
Bucket-Level Locking
```

No segment architecture.

This significantly improves performance.

---

# Null Key and Null Value Support

## HashMap

Allows:

```java
1 Null Key
Multiple Null Values
```

Example:

```java
map.put(null, "Admin");
map.put(1, null);
```

Valid.

---

## ConcurrentHashMap

Does NOT allow:

```java
null key
null value
```

Example:

```java
map.put(null, "Admin");
```

Throws:

```text
NullPointerException
```

---

# Why Null Is Not Allowed?

Suppose:

```java
map.get(key)
```

returns:

```java
null
```

Question:

```text
Key Not Found?
OR
Value Is Null?
```

In concurrent environments this ambiguity is dangerous.

Therefore:

```java
ConcurrentHashMap
```

disallows null.

---

# Iteration Behavior

## HashMap Iterator

Fail-Fast.

Example:

```java
for(String value :
        map.values()) {

    map.put(5, "New");
}
```

Output:

```text
ConcurrentModificationException
```

---

# ConcurrentHashMap Iterator

Fail-Safe (Weakly Consistent).

Example:

```java
for(String value :
        map.values()) {

    map.put(5, "New");
}
```

No exception.

Iteration continues safely.

---

# Performance Comparison

## Single Thread

```java
HashMap
```

is usually faster.

Reason:

```text
No Synchronization Overhead
```

---

## Multiple Threads

```java
ConcurrentHashMap
```

performs much better.

Reason:

```text
Optimized Concurrent Access
```

---

# Atomic Operations

ConcurrentHashMap provides atomic methods.

---

## putIfAbsent()

```java
map.putIfAbsent(
        "A",
        100);
```

Adds value only if key is absent.

---

## replace()

```java
map.replace(
        "A",
        200);
```

Atomically replaces value.

---

## computeIfAbsent()

```java
map.computeIfAbsent(
        "A",
        key -> 100);
```

Thread-safe computation.

---

# HashMap Does Not Provide Thread-Safe Atomic Methods

Example:

```java
if(!map.containsKey(key)) {

    map.put(key, value);
}
```

Not safe in multithreaded environments.

---

# ConcurrentHashMap Version

```java
map.putIfAbsent(
        key,
        value);
```

Safe and atomic.

---

# Example: Cache Implementation

Bad:

```java
Map<String, User> cache =
        new HashMap<>();
```

Used by many threads.

Risk:

```text
Race Conditions
```

---

Good:

```java
Map<String, User> cache =
        new ConcurrentHashMap<>();
```

Safe for concurrent access.

---

# HashMap vs Hashtable vs ConcurrentHashMap

| Feature | HashMap | Hashtable | ConcurrentHashMap |
|----------|----------|------------|------------------|
| Thread Safe | ❌ No | ✅ Yes | ✅ Yes |
| Performance | High | Low | High |
| Null Key | ✅ Yes | ❌ No | ❌ No |
| Null Value | ✅ Yes | ❌ No | ❌ No |
| Synchronization | None | Entire Map | Fine-Grained |
| Iterator | Fail-Fast | Fail-Fast | Fail-Safe |
| Recommended | Single Thread | Legacy | Multi-Threaded |

---

# HashMap vs ConcurrentHashMap

| Feature | HashMap | ConcurrentHashMap |
|----------|----------|------------------|
| Thread Safe | ❌ No | ✅ Yes |
| Synchronization | None | Fine-Grained |
| Null Key Allowed | ✅ Yes | ❌ No |
| Null Value Allowed | ✅ Yes | ❌ No |
| Iterator Type | Fail-Fast | Fail-Safe |
| Concurrent Reads | Unsafe | Safe |
| Concurrent Writes | Unsafe | Safe |
| Atomic Operations | ❌ No | ✅ Yes |
| Performance in Multithreading | Poor | Excellent |

---

# Real-World Usage

## Use HashMap

When:

```text
Single Thread
Local Variables
Temporary Data
```

Example:

```java
Map<Integer, String> students =
        new HashMap<>();
```

---

## Use ConcurrentHashMap

When:

```text
Shared Cache
Session Store
Multi-Threaded Services
Executor Framework
Microservices
```

Example:

```java
Map<String, User> cache =
        new ConcurrentHashMap<>();
```

---

# Interview Trick Questions

## Q1: Is HashMap Thread-Safe?

❌ No.

---

## Q2: Is ConcurrentHashMap Synchronized?

✅ Yes, internally.

But it uses:

```text
Fine-Grained Locking
```

instead of locking the entire map.

---

## Q3: Can ConcurrentHashMap Store Null Keys?

❌ No.

Throws:

```text
NullPointerException
```

---

## Q4: Which Iterator Is Fail-Fast?

```java
HashMap
```

---

## Q5: Which Iterator Is Fail-Safe?

```java
ConcurrentHashMap
```

---

## Q6: Which Is Faster in Single-Threaded Applications?

```java
HashMap
```

---

## Q7: Which Is Recommended for Multi-Threaded Applications?

```java
ConcurrentHashMap
```

---

# Key Interview Points

- `HashMap` is not thread-safe, while `ConcurrentHashMap` is thread-safe.
- `ConcurrentHashMap` uses fine-grained locking and CAS operations for better concurrency.
- `HashMap` allows one null key and multiple null values.
- `ConcurrentHashMap` does not allow null keys or values.
- `HashMap` iterators are fail-fast.
- `ConcurrentHashMap` iterators are fail-safe (weakly consistent).
- `ConcurrentHashMap` provides atomic operations like `putIfAbsent()` and `computeIfAbsent()`.
- Use `HashMap` for single-threaded applications and `ConcurrentHashMap` for multi-threaded applications.

## One-Line Interview Answer

**`HashMap` is a non-thread-safe map suitable for single-threaded environments, whereas `ConcurrentHashMap` is a thread-safe, high-performance map designed for concurrent access using fine-grained locking and atomic operations.**

---

<h1 id="difference-between-arraylist-and-linkedlist-in-java" style="text-decoration: underline;"> 46) Difference Between `ArrayList` and `LinkedList` in Java</h1>

One of the most frequently asked Java Collection interview questions is:

> What is the difference between `ArrayList` and `LinkedList`?

Both implement the:

```java
List
```

interface, but they use different internal data structures and have different performance characteristics.

---

# Quick Definition

## ArrayList

Stores elements using a:

```text
Dynamic Array
```

---

```java
List<String> list =
        new ArrayList<>();
```

Best for:

```text
Fast Random Access
Frequent Reads
```

---

## LinkedList

Stores elements using a:

```text
Doubly Linked List
```

---

```java
List<String> list =
        new LinkedList<>();
```

Best for:

```text
Frequent Insertions
Frequent Deletions
```

---

# Internal Data Structure

## ArrayList

```text
Index
 0   1   2   3
 ┌───┬───┬───┬───┐
 │ A │ B │ C │ D │
 └───┴───┴───┴───┘
```

Elements are stored in contiguous memory locations.

---

# LinkedList

```text
NULL
  │
  ▼
[A] ⇄ [B] ⇄ [C] ⇄ [D]
```

Each node contains:

```text
Data
Previous Pointer
Next Pointer
```

---

# Memory Representation

## ArrayList

```text
Array
 ├── A
 ├── B
 ├── C
 └── D
```

---

## LinkedList

```text
Node
 ├── Data
 ├── Prev
 └── Next
```

Extra memory is required for pointers.

---

# Adding Elements

## ArrayList

```java
list.add("A");
```

Average Complexity:

```text
O(1)
```

---

If internal array becomes full:

```text
New Bigger Array Created
Elements Copied
```

Cost:

```text
O(n)
```

---

# LinkedList

```java
list.add("A");
```

Complexity:

```text
O(1)
```

No resizing required.

---

# Accessing Elements

## ArrayList

```java
list.get(500);
```

Complexity:

```text
O(1)
```

Direct index access.

---

Memory:

```text
Address = Base + Index
```

---

# LinkedList

```java
list.get(500);
```

Complexity:

```text
O(n)
```

Must traverse nodes.

---

Example:

```text
Head
 ↓
A → B → C → D
```

To reach D, all previous nodes are visited.

---

# Insertion in Middle

Suppose:

```java
list.add(2, "X");
```

---

# ArrayList

Before:

```text
A B C D
```

After:

```text
A B X C D
```

Elements must shift.

Complexity:

```text
O(n)
```

---

# LinkedList

Only links change.

Before:

```text
A ⇄ B ⇄ C
```

After:

```text
A ⇄ B ⇄ X ⇄ C
```

Complexity:

```text
O(1)
```

(After reaching the position)

---

# Deletion

## ArrayList

```java
list.remove(2);
```

Remaining elements shift left.

Complexity:

```text
O(n)
```

---

# LinkedList

Only node references are updated.

Complexity:

```text
O(1)
```

(After locating the node)

---

# Iteration Performance

## ArrayList

Excellent cache locality.

```text
Fast Iteration
```

---

## LinkedList

Poor cache locality.

```text
Slower Iteration
```

Because nodes are scattered in memory.

---

# Memory Usage

## ArrayList

Stores only:

```text
Data
```

Memory efficient.

---

## LinkedList

Stores:

```text
Data
Previous Pointer
Next Pointer
```

Consumes more memory.

---

# Example

### ArrayList

```java
List<String> list =
        new ArrayList<>();

list.add("A");
list.add("B");
list.add("C");
```

---

Access:

```java
System.out.println(
        list.get(1));
```

Output:

```text
B
```

Fast operation.

---

# LinkedList Example

```java
List<String> list =
        new LinkedList<>();

list.add("A");
list.add("B");
list.add("C");
```

---

Access:

```java
System.out.println(
        list.get(1));
```

Output:

```text
B
```

But internally traversal occurs.

---

# Queue Operations

## LinkedList

Also implements:

```java
Deque
Queue
```

Supports:

```java
addFirst()
addLast()
removeFirst()
removeLast()
```

Efficiently.

---

Example:

```java
LinkedList<String> list =
        new LinkedList<>();

list.addFirst("A");
list.addLast("B");
```

---

# ArrayList Does Not Support Queue Operations Efficiently

Removing first element:

```java
list.remove(0);
```

Requires shifting.

Complexity:

```text
O(n)
```

---

# Performance Comparison

| Operation | ArrayList | LinkedList |
|------------|-----------|------------|
| Add at End | O(1) | O(1) |
| Add at Beginning | O(n) | O(1) |
| Insert in Middle | O(n) | O(1)* |
| Remove in Middle | O(n) | O(1)* |
| Get by Index | O(1) | O(n) |
| Search | O(n) | O(n) |
| Iteration | Faster | Slower |
| Memory Usage | Less | More |

`*` After locating the node.

---

# ArrayList vs LinkedList

| Feature | ArrayList | LinkedList |
|----------|-----------|------------|
| Internal Structure | Dynamic Array | Doubly Linked List |
| Random Access | Fast | Slow |
| Insertions | Slower | Faster |
| Deletions | Slower | Faster |
| Memory Consumption | Low | High |
| Cache Locality | Better | Poor |
| Iteration Speed | Faster | Slower |
| Queue Operations | Not Efficient | Efficient |

---

# Real-World Usage

## Use ArrayList When

```text
Frequent Reads
Random Access Needed
Rare Insertions/Deletions
```

Examples:

```text
Employee List
Product List
Customer List
```

---

## Use LinkedList When

```text
Frequent Insertions
Frequent Deletions
Queue/Deque Operations
```

Examples:

```text
Task Scheduler
Browser History
Undo/Redo Feature
```

---

# Interview Trick Questions

## Q1: Which Is Faster for `get(index)`?

✅ ArrayList

```text
O(1)
```

---

## Q2: Which Uses More Memory?

✅ LinkedList

Stores extra references.

---

## Q3: Which Is Better for Frequent Insertions?

✅ LinkedList

---

## Q4: Which Is Better for Frequent Reads?

✅ ArrayList

---

## Q5: Which Provides Better Cache Performance?

✅ ArrayList

---

## Q6: Which Implements Deque?

✅ LinkedList

---

## Q7: Which Is Used Most Often in Real Applications?

✅ ArrayList

Because read operations are usually more frequent than insertions and deletions.

---

# Key Interview Points

- `ArrayList` uses a dynamic array, while `LinkedList` uses a doubly linked list.
- `ArrayList` provides O(1) random access using indexes.
- `LinkedList` requires O(n) traversal to access an element by index.
- Insertions and deletions are generally faster in `LinkedList`.
- `ArrayList` consumes less memory and offers better cache locality.
- `LinkedList` consumes more memory due to node references.
- `ArrayList` is preferred for read-heavy applications.
- `LinkedList` is useful for queue, deque, and frequent insertion/deletion scenarios.

## One-Line Interview Answer

**`ArrayList` is backed by a dynamic array and provides fast random access, while `LinkedList` is backed by a doubly linked list and provides faster insertions and deletions but slower element access.**

---

<h1 id="difference-between-map-and-flatmap-in-java-streams" style="text-decoration: underline;"> 47) Difference Between `map()` and `flatMap()` in Java Streams</h1>

One of the most frequently asked Java 8 Stream API interview questions is:

> What is the difference between `map()` and `flatMap()`?

The key difference is:

```text
map()
→ Transforms each element into another element

flatMap()
→ Transforms and flattens nested structures into a single stream
```

---

# Quick Definition

## map()

Applies a function to each element and returns a new stream.

```java
stream.map(Function)
```

---

## flatMap()

Applies a function that returns a stream and then flattens all resulting streams into a single stream.

```java
stream.flatMap(Function)
```

---

# Simple Analogy

Suppose we have:

```text
Student → List of Subjects
```

---

Using `map()`:

```text
[
 [Java, SQL],
 [Spring, AWS]
]
```

(Stream of Lists)

---

Using `flatMap()`:

```text
[
 Java,
 SQL,
 Spring,
 AWS
]
```

(Single Flat Stream)

---

# map() Example

## Convert Names to Uppercase

```java
List<String> names =
        List.of(
                "john",
                "alex",
                "david");
```

---

```java
List<String> result =
        names.stream()
             .map(String::toUpperCase)
             .toList();
```

Output:

```text
[JOHN, ALEX, DAVID]
```

---

# How map() Works

```text
john  → JOHN
alex  → ALEX
david → DAVID
```

One input becomes one output.

---

# map() Visualization

```text
Input Stream
↓
[A, B, C]

map()
↓
[a, b, c]

Output Stream
```

---

# Another map() Example

```java
List<Integer> numbers =
        List.of(1, 2, 3, 4);
```

---

```java
List<Integer> squares =
        numbers.stream()
               .map(
                       n -> n * n)
               .toList();
```

Output:

```text
[1, 4, 9, 16]
```

---

# flatMap() Example

Suppose:

```java
List<List<String>> subjects =
        List.of(
                List.of(
                        "Java",
                        "SQL"),
                List.of(
                        "Spring",
                        "AWS"));
```

---

Using `map()`:

```java
subjects.stream()
        .map(
                list -> list.stream());
```

Result:

```text
Stream<Stream<String>>
```

Nested streams.

---

Using `flatMap()`:

```java
List<String> result =
        subjects.stream()
                .flatMap(
                        list ->
                                list.stream())
                .toList();
```

Output:

```text
[Java, SQL, Spring, AWS]
```

---

# How flatMap() Works

Before:

```text
[
 [Java, SQL],
 [Spring, AWS]
]
```

---

After:

```text
[
 Java,
 SQL,
 Spring,
 AWS
]
```

All nested collections are flattened.

---

# flatMap() Visualization

```text
Input
↓
[
 [A,B],
 [C,D]
]

flatMap()
↓
A
B
C
D

Output
↓
[A,B,C,D]
```

---

# map() vs flatMap() Return Types

## map()

```java
Stream<T>
    →
Stream<R>
```

Example:

```java
String
→
Integer
```

---

```java
names.stream()
     .map(String::length)
```

Output:

```text
[4, 5, 5]
```

---

# flatMap()

```java
Stream<T>
    →
Stream<Stream<R>>
```

becomes:

```java
Stream<R>
```

after flattening.

---

Example:

```java
students.stream()
        .flatMap(
                student ->
                        student.getSubjects()
                               .stream())
```

---

# Real-World Example

## Employee Skills

```java
class Employee {

    private List<String> skills;
}
```

---

Data:

```java
Employee1
→ [Java, SQL]

Employee2
→ [Spring, AWS]
```

---

Using map():

```java
employees.stream()
         .map(
                 Employee::getSkills)
```

Output:

```text
[
 [Java, SQL],
 [Spring, AWS]
]
```

---

Using flatMap():

```java
employees.stream()
         .flatMap(
                 employee ->
                         employee.getSkills()
                                 .stream())
```

Output:

```text
[
 Java,
 SQL,
 Spring,
 AWS
]
```

---

# Common Interview Example

## Split Words into Characters

```java
List<String> words =
        List.of(
                "Java",
                "SQL");
```

---

Using map():

```java
words.stream()
     .map(
             word ->
                     word.split(""));
```

Output:

```text
[
 [J,a,v,a],
 [S,Q,L]
]
```

---

Using flatMap():

```java
words.stream()
     .flatMap(
             word ->
                     Arrays.stream(
                             word.split("")))
     .toList();
```

Output:

```text
[J, a, v, a, S, Q, L]
```

---

# Another Example

## Extract Email Addresses

```java
List<Customer> customers;
```

Each customer has:

```java
List<String> emails;
```

---

Using map():

```java
customers.stream()
         .map(
                 Customer::getEmails)
```

Result:

```text
List<List<String>>
```

---

Using flatMap():

```java
customers.stream()
         .flatMap(
                 customer ->
                         customer.getEmails()
                                 .stream())
```

Result:

```text
List<String>
```

---

# Performance

## map()

Used when:

```text
One Input
→
One Output
```

---

## flatMap()

Used when:

```text
One Input
→
Multiple Outputs
```

and nested collections need flattening.

---

# map() vs flatMap()

| Feature | map() | flatMap() |
|----------|--------|-----------|
| Purpose | Transform Elements | Transform + Flatten |
| Output | Stream<R> | Stream<R> |
| Input → Output | One-to-One | One-to-Many |
| Nested Collections | Not Flattened | Flattened |
| Common Use | Convert Values | Flatten Lists/Streams |
| Complexity | Simple Transformation | Nested Structure Processing |

---

# Visual Comparison

## map()

```text
Input:
[A, B, C]

map()
↓

[a, b, c]
```

---

## flatMap()

```text
Input:
[
 [A,B],
 [C,D]
]

flatMap()
↓

[A,B,C,D]
```

---

# When to Use map()

Use when:

```text
Transforming Data
Converting Types
Formatting Values
Calculating Values
```

Examples:

```java
String → Uppercase
String → Length
Employee → Name
```

---

# When to Use flatMap()

Use when:

```text
Working With Nested Lists
Working With Nested Streams
Flattening Data Structures
Combining Multiple Streams
```

Examples:

```java
List<List<String>>
List<Set<String>>
List<Employee Skills>
```

---

# Interview Trick Questions

## Q1: Does map() Flatten Collections?

❌ No.

It preserves nesting.

---

## Q2: Does flatMap() Flatten Collections?

✅ Yes.

---

## Q3: Which Produces `Stream<Stream<T>>`?

```java
map()
```

when the mapping function returns a stream.

---

## Q4: Which Produces a Single Stream?

```java
flatMap()
```

---

## Q5: Which Is Used More With Nested Collections?

```java
flatMap()
```

---

# Key Interview Points

- `map()` transforms each element into another element.
- `flatMap()` transforms elements and flattens nested structures.
- `map()` performs one-to-one mapping.
- `flatMap()` performs one-to-many mapping and merges results.
- `map()` may create nested streams when the mapping function returns a stream.
- `flatMap()` converts nested streams into a single stream.
- Use `map()` for simple transformations.
- Use `flatMap()` when working with nested collections or streams.

## One-Line Interview Answer

**`map()` is used to transform each stream element into another value, while `flatMap()` is used to transform elements that produce multiple values (or streams) and flatten them into a single stream.**

---

<h1 id="what-is-a-race-condition-in-java" style="text-decoration: underline;"> 48) What is a Race Condition in Java?</h1>

## Definition

A **Race Condition** occurs when two or more threads access and modify shared data concurrently, and the final result depends on the order in which the threads execute.

In other words:

```text
Multiple Threads
+
Shared Resource
+
Uncontrolled Access
=
Race Condition
```

---

# Simple Definition

```text
A race condition occurs when
multiple threads compete to
read or modify shared data,
leading to unpredictable results.
```

---

# Why Is It Called a Race Condition?

Because multiple threads are:

```text
"Racing"
```

to access or update the same resource.

The thread that executes first affects the final outcome.

---

# Real-Life Example

Imagine a bank account:

```text
Balance = ₹1000
```

Two threads attempt to withdraw:

```text
Thread 1 → Withdraw ₹500
Thread 2 → Withdraw ₹700
```

at the same time.

Without proper synchronization:

```text
Incorrect Balance
Negative Balance
Lost Updates
```

can occur.

---

# Basic Example

```java
class Counter {

    int count = 0;

    public void increment() {

        count++;
    }
}
```

---

Two threads:

```java
Counter counter =
        new Counter();
```

---

```java
Thread t1 =
        new Thread(() -> {

            for(int i = 0;
                i < 1000;
                i++) {

                counter.increment();
            }
        });
```

---

```java
Thread t2 =
        new Thread(() -> {

            for(int i = 0;
                i < 1000;
                i++) {

                counter.increment();
            }
        });
```

---

Expected:

```text
2000
```

Actual:

```text
1875
1923
1991
```

Output may vary each run.

This is a race condition.

---

# Why Does It Happen?

The statement:

```java
count++;
```

looks like one operation but actually consists of:

```text
1. Read count
2. Increment value
3. Write value back
```

---

Suppose:

```text
count = 5
```

---

Thread 1:

```text
Read 5
```

---

Thread 2:

```text
Read 5
```

---

Thread 1:

```text
Increment → 6
Write → 6
```

---

Thread 2:

```text
Increment → 6
Write → 6
```

---

Expected:

```text
7
```

Actual:

```text
6
```

One update is lost.

---

# Race Condition Visualization

```text
Initial Count = 5

Thread 1
   Read 5
        │
        ▼
Thread 2
   Read 5
        │
        ▼
Thread 1
   Write 6
        │
        ▼
Thread 2
   Write 6

Final Value = 6
```

---

# Symptoms of Race Conditions

### Incorrect Results

```text
Wrong Counter Values
```

---

### Lost Updates

```text
Data Overwritten
```

---

### Inconsistent State

```text
Application Behavior Changes
```

---

### Difficult Debugging

```text
Works Sometimes
Fails Sometimes
```

---

# Common Places Where Race Conditions Occur

## Shared Variables

```java
count++;
```

---

## Collections

```java
HashMap
ArrayList
HashSet
```

used by multiple threads.

---

## Banking Systems

```text
Account Balance Updates
```

---

## Inventory Systems

```text
Stock Quantity Updates
```

---

## Session Management

```text
Shared User Sessions
```

---

# Example with HashMap

```java
Map<Integer, String> map =
        new HashMap<>();
```

---

Two threads:

```java
map.put(1, "A");
```

and

```java
map.put(2, "B");
```

simultaneously.

Possible results:

```text
Data Corruption
Lost Entries
Unexpected Behavior
```

---

# How to Prevent Race Conditions?

## 1. Synchronization

```java
synchronized void increment() {

    count++;
}
```

Only one thread can execute at a time.

---

Example:

```java
class Counter {

    int count = 0;

    synchronized void increment() {

        count++;
    }
}
```

Now:

```text
Thread-Safe
```

---

# 2. Atomic Classes

Java provides:

```java
AtomicInteger
AtomicLong
AtomicBoolean
```

---

Example:

```java
AtomicInteger count =
        new AtomicInteger();
```

---

```java
count.incrementAndGet();
```

Thread-safe without explicit synchronization.

---

# 3. Locks

Using:

```java
ReentrantLock
```

---

Example:

```java
Lock lock =
        new ReentrantLock();

lock.lock();

try {

    count++;

} finally {

    lock.unlock();
}
```

---

# 4. Concurrent Collections

Instead of:

```java
HashMap
```

use:

```java
ConcurrentHashMap
```

---

Instead of:

```java
ArrayList
```

use:

```java
CopyOnWriteArrayList
```

---

# 5. Immutability

Immutable objects cannot be modified.

Example:

```java
String
LocalDate
BigInteger
```

No race condition possible.

---

# Synchronization Example

Without Synchronization:

```java
count++;
```

Output:

```text
Unpredictable
```

---

With Synchronization:

```java
synchronized void increment() {

    count++;
}
```

Output:

```text
Correct Every Time
```

---

# Race Condition vs Deadlock

| Feature | Race Condition | Deadlock |
|----------|---------------|----------|
| Problem | Incorrect Data | Threads Stuck |
| Cause | Concurrent Modification | Lock Dependency |
| Application Runs | Yes | No |
| Result | Wrong Output | No Progress |
| Fix | Synchronization | Proper Lock Ordering |

---

# Race Condition vs Data Race

These terms are often used interchangeably, but technically:

---

## Data Race

Occurs when:

```text
Two Threads Access Same Variable
At Least One Write
No Synchronization
```

---

## Race Condition

A broader problem where outcome depends on thread timing.

---

# Real-World Example

## Ticket Booking System

Available Tickets:

```text
1
```

---

Two users book simultaneously.

Thread 1:

```text
Reads 1
```

Thread 2:

```text
Reads 1
```

---

Both reserve the ticket.

Result:

```text
2 Tickets Sold
```

for:

```text
1 Available Seat
```

Classic race condition.

---

# Interview Trick Questions

## Q1: Is `count++` Thread-Safe?

❌ No.

Because it consists of:

```text
Read
Modify
Write
```

operations.

---

## Q2: Can Race Conditions Occur in Single-Threaded Programs?

❌ No.

Race conditions require:

```text
Concurrent Execution
```

---

## Q3: Which Keyword Helps Prevent Race Conditions?

```java
synchronized
```

---

## Q4: Which Class Can Replace `int` for Thread-Safe Counters?

```java
AtomicInteger
```

---

## Q5: Is `HashMap` Safe Against Race Conditions?

❌ No.

Use:

```java
ConcurrentHashMap
```

instead.

---

# Key Interview Points

- A race condition occurs when multiple threads access shared data concurrently and the result depends on execution timing.
- It commonly occurs with shared mutable variables.
- Operations like `count++` are not atomic and can lead to race conditions.
- Symptoms include incorrect results, lost updates, and inconsistent application state.
- Race conditions can be prevented using synchronization, locks, atomic classes, concurrent collections, and immutability.
- `AtomicInteger` is a common solution for thread-safe counters.
- `ConcurrentHashMap` helps avoid race conditions in shared maps.
- Race conditions are one of the most common concurrency bugs in Java.

## One-Line Interview Answer

**A race condition occurs when multiple threads simultaneously access and modify shared data, causing the program's outcome to depend on the unpredictable order of thread execution, which can lead to inconsistent or incorrect results.**

---

<h1 id="what-are-atomic-classes-in-java" style="text-decoration: underline;"> 49) What Are Atomic Classes in Java?</h1>

## Definition

**Atomic Classes** are thread-safe classes provided by Java that allow atomic (indivisible) operations on single variables without using explicit synchronization.

They are available in:

```java
java.util.concurrent.atomic
```

package.

---

# Simple Definition

```text
Atomic Classes provide
lock-free, thread-safe operations
on variables using atomic actions.
```

---

# What Does Atomic Mean?

An operation is **atomic** if it:

```text
Completes Entirely
OR
Does Not Happen At All
```

No thread can see the operation in a partially completed state.

---

# Why Do We Need Atomic Classes?

Consider:

```java
int count = 0;

count++;
```

This looks like one operation but internally it is:

```text
1. Read count
2. Increment value
3. Write value back
```

---

In a multi-threaded environment:

```text
Thread 1 → Read 5
Thread 2 → Read 5
Thread 1 → Write 6
Thread 2 → Write 6
```

Expected:

```text
7
```

Actual:

```text
6
```

This is a:

```text
Race Condition
```

---

# Traditional Solution

```java
synchronized void increment() {

    count++;
}
```

Works correctly but introduces:

```text
Locking Overhead
Thread Blocking
Reduced Performance
```

---

# Better Solution

```java
AtomicInteger count =
        new AtomicInteger(0);

count.incrementAndGet();
```

Thread-safe without explicit synchronization.

---

# Package

```java
java.util.concurrent.atomic
```

---

# Common Atomic Classes

| Class | Purpose |
|---------|----------|
| AtomicInteger | Atomic integer operations |
| AtomicLong | Atomic long operations |
| AtomicBoolean | Atomic boolean operations |
| AtomicReference<T> | Atomic object reference |
| AtomicIntegerArray | Atomic integer array |
| AtomicLongArray | Atomic long array |
| AtomicStampedReference | Prevent ABA problem |
| AtomicMarkableReference | Atomic reference with mark |

---

# AtomicInteger Example

## Without AtomicInteger

```java
int count = 0;

count++;
```

Not thread-safe.

---

## With AtomicInteger

```java
AtomicInteger count =
        new AtomicInteger(0);
```

Increment:

```java
count.incrementAndGet();
```

---

Example:

```java
AtomicInteger counter =
        new AtomicInteger(0);

counter.incrementAndGet();

System.out.println(
        counter.get());
```

Output:

```text
1
```

---

# Common AtomicInteger Methods

## get()

Returns current value.

```java
counter.get();
```

---

## set()

Updates value.

```java
counter.set(100);
```

---

## incrementAndGet()

Increment then return value.

```java
counter.incrementAndGet();
```

Output:

```text
1
```

---

## getAndIncrement()

Return current value then increment.

```java
counter.getAndIncrement();
```

Output:

```text
0
```

Counter becomes:

```text
1
```

---

## decrementAndGet()

```java
counter.decrementAndGet();
```

---

## addAndGet()

```java
counter.addAndGet(10);
```

---

Example:

```java
AtomicInteger count =
        new AtomicInteger(5);

System.out.println(
        count.addAndGet(10));
```

Output:

```text
15
```

---

# AtomicLong Example

```java
AtomicLong totalAmount =
        new AtomicLong(1000);
```

---

```java
totalAmount.addAndGet(500);
```

Output:

```text
1500
```

---

# AtomicBoolean Example

```java
AtomicBoolean flag =
        new AtomicBoolean(false);
```

---

```java
flag.set(true);
```

---

```java
System.out.println(
        flag.get());
```

Output:

```text
true
```

---

# AtomicReference Example

Used for object references.

```java
AtomicReference<String> name =
        new AtomicReference<>("John");
```

---

```java
name.set("Alex");
```

---

```java
System.out.println(
        name.get());
```

Output:

```text
Alex
```

---

# How Atomic Classes Work?

Internally they use:

```text
CAS
(Compare-And-Swap)
```

operation.

---

# Compare-And-Swap (CAS)

CAS performs:

```text
Compare Current Value
If Match
→ Update Value
Else
→ Retry
```

---

Example:

```text
Current = 10
Expected = 10
New Value = 20
```

Result:

```text
Update Successful
```

---

If:

```text
Current = 15
Expected = 10
```

Result:

```text
Update Fails
Retry
```

---

# compareAndSet()

Most important atomic operation.

---

Example:

```java
AtomicInteger count =
        new AtomicInteger(10);
```

---

```java
boolean result =
        count.compareAndSet(
                10,
                20);
```

Output:

```text
true
```

Value becomes:

```text
20
```

---

# Example

```java
AtomicInteger count =
        new AtomicInteger(10);

boolean updated =
        count.compareAndSet(
                5,
                20);
```

Output:

```text
false
```

Value remains:

```text
10
```

---

# Atomic Classes vs Synchronization

## Synchronization

```java
synchronized void increment() {

    count++;
}
```

---

Characteristics:

```text
Uses Locks
Thread Blocking
Context Switching
```

---

## Atomic Classes

```java
counter.incrementAndGet();
```

---

Characteristics:

```text
Lock-Free
Non-Blocking
High Performance
```

---

# Comparison

| Feature | synchronized | Atomic Classes |
|----------|-------------|----------------|
| Thread Safe | ✅ Yes | ✅ Yes |
| Uses Locks | ✅ Yes | ❌ No |
| Blocking | ✅ Yes | ❌ No |
| Performance | Lower | Higher |
| Context Switching | More | Less |
| Scalability | Moderate | Better |

---

# Real-World Example

## Visitor Counter

Bad:

```java
int visitors = 0;

visitors++;
```

Race condition possible.

---

Good:

```java
AtomicInteger visitors =
        new AtomicInteger();
```

---

```java
visitors.incrementAndGet();
```

Thread-safe.

---

# Real-World Example

## API Request Counter

```java
AtomicLong requests =
        new AtomicLong();
```

---

Each request:

```java
requests.incrementAndGet();
```

Safe even with thousands of threads.

---

# Limitations of Atomic Classes

### Suitable for Single Variables

Good:

```java
AtomicInteger
```

---

Not ideal for:

```java
Multiple Variable Updates
```

---

Example:

```java
balance
transactionCount
```

must be updated together.

Atomic classes alone are insufficient.

---

Use:

```java
synchronized
Lock
```

instead.

---

# Atomic Classes vs Volatile

## Volatile

```java
volatile int count;
```

Provides:

```text
Visibility
```

only.

---

Not thread-safe for:

```java
count++;
```

---

## AtomicInteger

Provides:

```text
Visibility
+
Atomicity
```

---

# Volatile vs AtomicInteger

| Feature | volatile | AtomicInteger |
|----------|----------|---------------|
| Visibility | ✅ Yes | ✅ Yes |
| Atomic Operations | ❌ No | ✅ Yes |
| Thread Safe Increment | ❌ No | ✅ Yes |
| CAS Support | ❌ No | ✅ Yes |

---

# Interview Trick Questions

## Q1: Is `count++` Atomic?

❌ No.

It consists of:

```text
Read
Modify
Write
```

operations.

---

## Q2: Which Package Contains Atomic Classes?

```java
java.util.concurrent.atomic
```

---

## Q3: Do Atomic Classes Use Locks?

❌ No.

They use:

```text
CAS
(Compare-And-Swap)
```

---

## Q4: Which Is Faster?

```java
AtomicInteger
```

usually performs better than:

```java
synchronized
```

for simple counters.

---

## Q5: Can AtomicInteger Replace Synchronization Everywhere?

❌ No.

Only for operations involving a single variable.

---

## Q6: What Is the Most Common Atomic Class?

```java
AtomicInteger
```

---

# Key Interview Points

- Atomic Classes provide lock-free, thread-safe operations on variables.
- They are located in the `java.util.concurrent.atomic` package.
- Common classes include `AtomicInteger`, `AtomicLong`, `AtomicBoolean`, and `AtomicReference`.
- They internally use CAS (Compare-And-Swap) operations.
- Atomic classes are generally faster than synchronized blocks for simple operations.
- `incrementAndGet()` and `compareAndSet()` are commonly used methods.
- They help prevent race conditions without explicit locking.
- Atomic classes are best suited for single-variable thread-safe operations.

## One-Line Interview Answer

**Atomic Classes are lock-free, thread-safe utility classes in `java.util.concurrent.atomic` that use CAS (Compare-And-Swap) operations to perform atomic updates on variables without using explicit synchronization.**
---

<h1 id="jvm-vs-jre-vs-jdk-in-java" style="text-decoration: underline;"> 50) JVM vs JRE vs JDK in Java</h1>

One of the most frequently asked Core Java interview questions is:

> What is the difference between JVM, JRE, and JDK?

The relationship can be summarized as:

```text
JDK
 └── JRE
      └── JVM
```

or

```text
JDK = JRE + Development Tools
JRE = JVM + Core Libraries
JVM = Runtime Engine
```

---

# Quick Definitions

## JVM (Java Virtual Machine)

The JVM is an abstract machine that executes Java bytecode.

```text
Responsible For:
- Loading Classes
- Executing Bytecode
- Memory Management
- Garbage Collection
```

---

## JRE (Java Runtime Environment)

The JRE provides everything needed to run Java applications.

```text
Contains:
- JVM
- Core Java Libraries
- Supporting Files
```

---

## JDK (Java Development Kit)

The JDK provides everything needed to develop, compile, and run Java applications.

```text
Contains:
- JRE
- Development Tools
```

---

# Big Picture

```text
             JDK
 ┌─────────────────────────┐
 │                         │
 │        JRE              │
 │ ┌─────────────────────┐ │
 │ │        JVM          │ │
 │ └─────────────────────┘ │
 │                         │
 └─────────────────────────┘
```

---

# JVM (Java Virtual Machine)

## Definition

JVM is the runtime engine that executes Java bytecode.

Example:

```java
HelloWorld.class
```

is executed by:

```text
JVM
```

---

# Responsibilities of JVM

### Class Loading

Loads `.class` files.

```text
ClassLoader
```

---

### Bytecode Execution

Converts bytecode into machine instructions.

---

### Memory Management

Manages:

```text
Heap
Stack
Method Area
```

---

### Garbage Collection

Automatically removes unused objects.

---

### Security

Provides sandbox execution.

---

# JVM Workflow

```text
Java Source Code
       │
       ▼
 javac Compiler
       │
       ▼
   Bytecode (.class)
       │
       ▼
       JVM
       │
       ▼
 Machine Code
```

---

# Why JVM Is Important?

Because Java follows:

```text
Write Once
Run Anywhere (WORA)
```

The same bytecode can run on:

```text
Windows
Linux
macOS
```

provided a JVM exists.

---

# JRE (Java Runtime Environment)

## Definition

JRE is the environment required to run Java applications.

---

# Components of JRE

```text
JRE
├── JVM
├── Core Libraries
├── Runtime Classes
└── Supporting Files
```

---

# Example

Suppose you have:

```java
HelloWorld.class
```

To run it:

```bash
java HelloWorld
```

You need:

```text
JRE
```

---

# What JRE Does NOT Contain?

JRE does not include:

```text
javac
javadoc
jar
debugging tools
```

Therefore:

```text
Can Run Java
Cannot Develop Java
```

---

# JDK (Java Development Kit)

## Definition

JDK is a complete toolkit for Java developers.

---

# Components of JDK

```text
JDK
├── JRE
├── javac
├── java
├── jar
├── javadoc
├── jdb
└── Other Tools
```

---

# What JDK Provides?

### Compiler

```bash
javac
```

Converts:

```java
Hello.java
```

into:

```java
Hello.class
```

---

### Runtime

```bash
java
```

Runs applications.

---

### Documentation Tool

```bash
javadoc
```

Generates API documentation.

---

### Archiving Tool

```bash
jar
```

Creates JAR files.

---

### Debugger

```bash
jdb
```

Used for debugging.

---

# Example Workflow

## Step 1: Write Code

```java
public class Hello {

    public static void main(
            String[] args) {

        System.out.println(
                "Hello Java");
    }
}
```

---

## Step 2: Compile

```bash
javac Hello.java
```

Produces:

```text
Hello.class
```

Compiler comes from:

```text
JDK
```

---

## Step 3: Run

```bash
java Hello
```

Execution happens using:

```text
JRE → JVM
```

---

# Real-Life Analogy

Imagine:

```text
Java Program = Food Recipe
```

---

## JVM

```text
Chef
```

Actually cooks the food.

---

## JRE

```text
Kitchen
```

Provides chef and cooking equipment.

---

## JDK

```text
Kitchen + Recipe Writing Tools
```

Allows creating and cooking recipes.

---

# JVM vs JRE vs JDK

| Feature | JVM | JRE | JDK |
|----------|-----|-----|-----|
| Full Form | Java Virtual Machine | Java Runtime Environment | Java Development Kit |
| Purpose | Execute Bytecode | Run Java Programs | Develop + Run Java Programs |
| Contains JVM | N/A | ✅ Yes | ✅ Yes |
| Contains JRE | ❌ No | N/A | ✅ Yes |
| Compiler Included | ❌ No | ❌ No | ✅ Yes |
| Development Tools | ❌ No | ❌ No | ✅ Yes |
| Run Programs | ✅ Yes | ✅ Yes | ✅ Yes |
| Compile Programs | ❌ No | ❌ No | ✅ Yes |

---

# Hierarchy

```text
JDK
 ├── JRE
 │     ├── JVM
 │     └── Libraries
 │
 ├── javac
 ├── jar
 ├── javadoc
 └── jdb
```

---

# Which One Do Developers Install?

Typically:

```text
JDK
```

because it contains everything.

---

# Which One Does End User Need?

If only running Java applications:

```text
JRE
```

(Though modern Java distributions usually provide the JDK.)

---

# Example Commands

## Compile

```bash
javac Employee.java
```

Uses:

```text
JDK
```

---

## Run

```bash
java Employee
```

Uses:

```text
JRE → JVM
```

---

# Interview Trick Questions

## Q1: Can JVM Compile Java Code?

❌ No.

Compilation is done by:

```bash
javac
```

from the JDK.

---

## Q2: Can JRE Compile Java Programs?

❌ No.

JRE only runs programs.

---

## Q3: Does JDK Contain JRE?

✅ Yes.

---

## Q4: Does JRE Contain JVM?

✅ Yes.

---

## Q5: Can a Java Program Run Without JVM?

❌ No.

The JVM is responsible for executing bytecode.

---

## Q6: Which Component Enables "Write Once, Run Anywhere"?

✅ JVM

because platform-specific JVMs execute the same bytecode.

---

# Key Interview Points

- JVM executes Java bytecode and manages memory, class loading, and garbage collection.
- JRE provides the environment required to run Java applications.
- JDK provides tools required to develop, compile, and run Java applications.
- JDK contains JRE, and JRE contains JVM.
- `javac` compiler is available only in the JDK.
- JVM is responsible for Java's platform independence.
- JRE is sufficient for running applications but not for development.
- Developers generally install the JDK because it includes everything needed.

## One-Line Interview Answer

**JVM executes Java bytecode, JRE provides the runtime environment to run Java applications, and JDK provides the complete toolkit (JRE + development tools) required to develop, compile, and run Java applications.**

---

### Want a printable version?
If you want, I can also generate a **PDF-style** version (clean formatting) or split this into multiple posts (Core Java / Collections / Concurrency).
