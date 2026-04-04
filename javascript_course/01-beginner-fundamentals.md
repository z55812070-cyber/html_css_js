# Module 1: Beginner Fundamentals

This module covers the core concepts of JavaScript, providing a solid foundation for your learning journey.

## 1. Introduction
- **What is JavaScript?** A high-level, interpreted scripting language used for web development.
- **Manuals and specifications:** ECMAScript (the standard) and MDN (the documentation).
- **Code editors:** Using VS Code and other editors for writing JS.
- **Developer console:** How to run and debug code directly in the browser.

```javascript
// What is JavaScript? - High-level, interpreted scripting language
// Manuals: ECMAScript spec at https://tc39.es/ecma262/
// MDN Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript
// Code Editor: VS Code with extensions like ESLint, Prettier
// Developer Console: Press F12 in browser, go to Console tab

console.log("JavaScript runs in browsers and Node.js");
```

## 2. JavaScript Fundamentals
- **Hello, world!** Your first script using `alert` and `console.log`.
- **The modern mode, "use strict":** Enabling modern JS features and better error checking.
- **Variables:** Declaring variables with `let`, `const`, and the old `var`.
- **Data types:** The 8 basic types: number, bigint, string, boolean, null, undefined, object, and symbol.
- **Interaction:** Interacting with users using `alert`, `prompt`, and `confirm`.
- **Type Conversions:** Understanding how JS converts between strings, numbers, and booleans.
- **Basic operators, maths:** Arithmetics (+, -, *, /), remainder (%), and exponentiation (**).
- **Comparisons:** Comparing values with `>`, `<`, `>=`, `<=`, `==`, and `===`.
- **Conditional branching:** Using `if`, `else if`, `else`, and the ternary operator `?`.
- **Logical operators:** Combining conditions with `||` (OR), `&&` (AND), and `!` (NOT).
- **Nullish coalescing operator '??':** Providing default values for null/undefined.
- **Loops: while and for:** Iterating over code with `while`, `do...while`, and `for` loops.
- **The "switch" statement:** A multi-way branch for comparing a value against multiple options.
- **Functions:** Declaring and calling reusable blocks of code.
- **Function expressions:** Treating functions as values.
- **Arrow functions, the basics:** A concise way to write functions.

```javascript
// Hello, world!
console.log("Hello, world!");
// alert("Hello, world!"); // In browser only

// The modern mode, "use strict"
"use strict";
// Without "use strict", you can assign to undeclared variables
// With it, you get an error - helps catch bugs

// Variables
let name = "Alice";      // Can be reassigned
const age = 25;          // Cannot be reassigned
var oldStyle = "legacy"; // Old way, function-scoped (avoid using)

// Data types (8 basic types)
let num = 42;                    // number
let bigNum = 12345678901234567890n; // bigint
let text = "Hello";              // string
let isActive = true;             // boolean
let empty = null;                // null (intentional absence)
let notDefined = undefined;      // undefined (not assigned)
let person = { name: "Bob" };    // object
let uniqueId = Symbol("id");     // symbol

// Interaction (browser only)
// alert("Message");
// let userInput = prompt("Enter something:", "default");
// let confirmed = confirm("Are you sure?");

// Type Conversions
let strNum = "123";
let convertedNum = Number(strNum);  // 123
let boolFromStr = Boolean("hello"); // true
let strFromNum = String(456);       // "456"

// Basic operators, maths
let a = 10, b = 3;
console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1 (remainder)
console.log(a ** b); // 1000 (exponentiation)

// Comparisons
console.log(5 > 3);   // true
console.log(5 < 3);   // false
console.log(5 >= 5);  // true
console.log(5 <= 4);  // false
console.log(5 == "5");  // true (loose equality, type coercion)
console.log(5 === "5"); // false (strict equality, no coercion)

// Conditional branching
let score = 85;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// Ternary operator
let grade = score >= 60 ? "Pass" : "Fail";

// Logical operators
let x = true, y = false;
console.log(x || y); // true (OR)
console.log(x && y); // false (AND)
console.log(!x);     // false (NOT)

// Nullish coalescing operator '??'
let defaultValue = null ?? "default"; // "default"
let actualValue = "real" ?? "default"; // "real"
// Unlike ||, ?? only treats null and undefined as falsy

// Loops: while and for
let i = 0;
while (i < 3) {
  console.log("While loop:", i);
  i++;
}

for (let j = 0; j < 3; j++) {
  console.log("For loop:", j);
}

// do...while loop
let k = 0;
do {
  console.log("Do-while:", k);
  k++;
} while (k < 3);

// The "switch" statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("End of work week");
    break;
  default:
    console.log("Regular day");
}

// Functions
function greet(personName) {
  return `Hello, ${personName}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"

// Function expressions
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20

// Arrow functions, the basics
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

const square = n => n * n;
console.log(square(4)); // 16
```

## 3. Objects: the basics
- **Objects:** Creating key-value pairs to store complex data.
- **Object references and copying:** Understanding how objects are stored and copied by reference.
- **Garbage collection:** How JavaScript automatically manages memory.
- **Object methods, "this":** Adding functions to objects and using the `this` keyword.
- **Constructor, operator "new":** Creating multiple similar objects using constructors.
- **Optional chaining '?.':** Safely accessing nested object properties.
- **Symbol type:** Creating unique identifiers for object properties.
- **Object to primitive conversion:** How JS converts objects to strings or numbers.

```javascript
// Objects
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};
console.log(user.name); // "John"
console.log(user["age"]); // 30

// Object references and copying
let obj1 = { value: 1 };
let obj2 = obj1; // Reference copy, not value copy
obj2.value = 2;
console.log(obj1.value); // 2 (changed because same reference)

// Proper copying with Object.assign or spread
let original = { a: 1, b: 2 };
let copy = { ...original };
copy.a = 10;
console.log(original.a); // 1 (unchanged)

// Garbage collection
// JS automatically frees memory when objects are no longer referenced
let temp = { data: "temporary" };
temp = null; // Now eligible for garbage collection

// Object methods, "this"
let calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  },
  getValue() {
    return this.value;
  }
};
calculator.add(5).add(3);
console.log(calculator.getValue()); // 8

// Constructor, operator "new"
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Hi, I'm ${this.name}`;
  };
}
let alice = new Person("Alice", 25);
console.log(alice.greet()); // "Hi, I'm Alice"

// Optional chaining '?.'
let nestedObj = { user: { address: { city: "NYC" } } };
console.log(nestedObj.user?.address?.city); // "NYC"
console.log(nestedObj.user?.phone?.number); // undefined (no error)

// Symbol type
let idSym = Symbol("identifier");
let objWithSymbol = {
  [idSym]: 12345,
  name: "Test"
};
console.log(objWithSymbol[idSym]); // 12345

// Object to primitive conversion
let obj = {
  valueOf() {
    return 100;
  },
  toString() {
    return "objectAsString";
  }
};
console.log(obj + 5); // 105 (uses valueOf)
console.log(`Result: ${obj}`); // "Result: objectAsString" (uses toString)
```
