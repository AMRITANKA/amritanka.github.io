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


<h1 style="text-decoration: underline;">4) Why can’t we override a static method?</h1>

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

<h1 style="text-decoration: underline;"> 5) What is Dynamic Method Dispatch?</h1>

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

<h1 style="text-decoration: underline;">6) What is Java Classpath?</h1>

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

<h1 style="text-decoration: underline;">7) What does the `volatile` keyword do?</h1>

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

<h1 style="text-decoration: underline;">8) When does `finally` not execute?<h1>

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
