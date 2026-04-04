# Module 2: Intermediate Language

This module takes your knowledge of JavaScript to the next level by exploring data types, functions, and OOP in depth.

## 1. Data types in Depth
- **Methods of primitives:** Using methods like `.toString()`, `.toUpperCase()`, etc., on primitives.
- **Numbers:** Working with integers, floats, `Infinity`, `NaN`, and the `Math` library.
- **Strings:** Manipulating text, indexing, slicing, and interpolation.
- **Arrays:** Creating and managing ordered collections of items.
- **Array methods:** Using methods like `.map()`, `.filter()`, `.reduce()`, `.find()`, and `.sort()`.
- **Iterables:** Understanding the iteration protocol and `for...of` loops.
- **Map and Set:** Exploring these data structures for storing key-value pairs and unique values.
- **WeakMap and WeakSet:** Understanding their use cases for weak references.
- **Object.keys, values, entries:** Accessing an object's properties as arrays.
- **Destructuring assignment:** Easily extracting values from objects and arrays.
- **Date and time:** Working with the `Date` object and formatting.
- **JSON methods, toJSON:** Converting objects to JSON strings and back.

```javascript
// Methods of primitives
let num = 123;
console.log(num.toString()); // "123"
let str = "hello";
console.log(str.toUpperCase()); // "HELLO"
console.log(str.charAt(0)); // "h"

// Numbers
console.log(Infinity); // Infinity
console.log(NaN); // NaN (Not a Number)
console.log(Math.sqrt(16)); // 4
console.log(Math.random()); // Random number between 0 and 1
console.log(Number.MAX_VALUE); // Largest representable number
console.log(Number.isFinite(100)); // true
console.log(Number.isNaN(NaN)); // true

// Strings
let text = "JavaScript";
console.log(text[0]); // "J"
console.log(text.slice(0, 4)); // "Java"
console.log(text.substring(4, 10)); // "Script"
console.log(`${text} is awesome`); // "JavaScript is awesome"
console.log(text.split("").reverse().join("")); // "tpircSavaJ"

// Arrays
let fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
fruits.push("grape");
console.log(fruits); // ["apple", "banana", "orange", "grape"]
fruits.pop();
console.log(fruits.length); // 3

// Array methods
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
let evens = numbers.filter(n => n % 2 === 0); // [2, 4]
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15
let found = numbers.find(n => n > 3); // 4
let sorted = numbers.sort((a, b) => b - a); // [5, 4, 3, 2, 1]

// Iterables
let iterableArr = [10, 20, 30];
for (let item of iterableArr) {
  console.log(item); // 10, 20, 30
}

// Map and Set
let myMap = new Map();
myMap.set("name", "Alice");
myMap.set("age", 25);
console.log(myMap.get("name")); // "Alice"
console.log(myMap.size); // 2

let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Duplicate, ignored
console.log(mySet); // Set(2) {1, 2}

// WeakMap and WeakSet
let weakMap = new WeakMap();
let objKey = { id: 1 };
weakMap.set(objKey, "value");
// WeakMap keys are held weakly, eligible for GC when no other references

let weakSet = new WeakSet();
let objItem = { data: "test" };
weakSet.add(objItem);

// Object.keys, values, entries
let personObj = { name: "Bob", age: 30 };
console.log(Object.keys(personObj)); // ["name", "age"]
console.log(Object.values(personObj)); // ["Bob", 30]
console.log(Object.entries(personObj)); // [["name", "Bob"], ["age", 30]]

// Destructuring assignment
let [first, second] = [1, 2];
console.log(first); // 1
let { name: personName, age: personAge } = personObj;
console.log(personName); // "Bob"

// Date and time
let now = new Date();
console.log(now.getFullYear());
console.log(now.getMonth()); // 0-11
console.log(now.getDate()); // Day of month
console.log(now.toISOString()); // ISO format string

// JSON methods, toJSON
let jsonObj = { name: "Test", value: 123 };
let jsonString = JSON.stringify(jsonObj); // '{"name":"Test","value":123}'
let parsedObj = JSON.parse(jsonString); // { name: "Test", value: 123 }
```

## 2. Advanced working with functions
- **Recursion and stack:** Writing functions that call themselves.
- **Rest parameters and spread syntax:** Using `...args` for multiple arguments and `...arr` for spreading.
- **Variable scope, closure:** Understanding lexical environment and creating closures.
- **The old "var":** How `var` behaves differently from `let` and `const`.
- **Global object:** The `window` object in browsers and `global` in Node.js.
- **Function object, NFE:** Functions as first-class objects and named function expressions.
- **The "new Function" syntax:** Dynamically creating functions from strings.
- **Scheduling: setTimeout and setInterval:** Running code after a delay or repeatedly.
- **Decorators and forwarding, call/apply:** Modifying function behavior using wrappers.
- **Function binding:** Using `.bind()` to set the `this` value.
- **Arrow functions revisited:** Understanding their lack of `this`, `super`, and `arguments`.

```javascript
// Recursion and stack
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Rest parameters and spread syntax
function sumAll(...args) {
  return args.reduce((sum, n) => sum + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
let obj1 = { a: 1 };
let obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Variable scope, closure
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
let counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// The old "var"
function varExample() {
  if (true) {
    var x = 10; // Function-scoped, not block-scoped
  }
  console.log(x); // 10 (accessible outside block)
}

// Global object
console.log(typeof global); // "object" in Node.js
// In browser: console.log(typeof window); // "object"

// Function object, NFE
let myFunc = function greet(name) {
  return `Hello, ${name}`;
};
console.log(myFunc.name); // "greet"
console.log(myFunc.length); // 1 (number of parameters)

// The "new Function" syntax
let addFunc = new Function('a', 'b', 'return a + b');
console.log(addFunc(2, 3)); // 5

// Scheduling: setTimeout and setInterval
// setTimeout(() => console.log("After 1 second"), 1000);
// let intervalId = setInterval(() => console.log("Every second"), 1000);
// clearInterval(intervalId);

// Decorators and forwarding, call/apply
function loggingDecorator(func) {
  return function(...args) {
    console.log(`Calling with: ${args}`);
    return func.apply(this, args);
  };
}
let loggedAdd = loggingDecorator((a, b) => a + b);
console.log(loggedAdd(2, 3)); // Logs then returns 5

function sayHi() { console.log(this.name); }
let user = { name: "Alice" };
sayHi.call(user); // "Alice"
sayHi.apply(user); // "Alice"

// Function binding
let boundFunc = sayHi.bind(user);
boundFunc(); // "Alice"

// Arrow functions revisited
let arrowFunc = () => {
  // No own 'this', inherits from surrounding scope
  // No 'arguments' object
  // Cannot be used as constructors
};
```

## 3. Prototypes, inheritance
- **Prototypal inheritance:** The core mechanism of object inheritance in JS.
- **F.prototype:** Using constructor functions and their prototypes.
- **Native prototypes:** How built-in objects like `Array` and `Object` use prototypes.
- **Prototype methods, objects without __proto__:** Exploring advanced prototype manipulation.

```javascript
// Prototypal inheritance
let animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};
let rabbit = {
  jumps: true,
  __proto__: animal
};
console.log(rabbit.eats); // true (inherited)
rabbit.walk(); // "Animal walks" (inherited)

// F.prototype
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};
let myRabbit = new Rabbit("Bunny");
myRabbit.sayHi(); // "Hi, I'm Bunny"

// Native prototypes
console.log([].__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

// Adding method to native prototype (not recommended in production)
Array.prototype.first = function() {
  return this[0];
};
console.log([1, 2, 3].first()); // 1

// Prototype methods, objects without __proto__
let objNoProto = Object.create(null);
// objNoProto has no __proto__, cannot inherit
```

## 4. Classes
- **Class basic syntax:** Creating classes for structured OOP.
- **Class inheritance:** Using `extends` and `super` to inherit from parent classes.
- **Static properties and methods:** Defining methods and properties that belong to the class itself.
- **Private and protected properties and methods:** Encapsulating class state.
- **Extending built-in classes:** Inheriting from `Array`, `Map`, etc.
- **Class checking: "instanceof":** Verifying an object's class hierarchy.
- **Mixins:** Using mixins for multiple inheritance.

```javascript
// Class basic syntax
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
let p = new Person("Charlie", 35);
console.log(p.greet()); // "Hello, I'm Charlie"

// Class inheritance
class Employee extends Person {
  constructor(name, age, jobTitle) {
    super(name, age);
    this.jobTitle = jobTitle;
  }
  
  greet() {
    return `${super.greet()}, I'm a ${this.jobTitle}`;
  }
}
let emp = new Employee("Diana", 28, "Developer");
console.log(emp.greet()); // "Hello, I'm Diana, I'm a Developer"

// Static properties and methods
class MathUtils {
  static PI = 3.14159;
  
  static circleArea(radius) {
    return this.PI * radius * radius;
  }
}
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(5)); // 78.53975

// Private and protected properties and methods
class SecureData {
  #secretKey;
  
  constructor(key) {
    this.#secretKey = key;
  }
  
  getKey() {
    return this.#secretKey;
  }
}
let secure = new SecureData("abc123");
console.log(secure.getKey()); // "abc123"
// console.log(secure.#secretKey); // Error: Private field

// Extending built-in classes
class MyArray extends Array {
  last() {
    return this[this.length - 1];
  }
}
let myArr = new MyArray(1, 2, 3);
console.log(myArr.last()); // 3

// Class checking: "instanceof"
console.log(emp instanceof Employee); // true
console.log(emp instanceof Person); // true
console.log(emp instanceof Object); // true

// Mixins
let canEat = {
  eat() {
    console.log(`${this.name} is eating`);
  }
};
let canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

class Creature {}
Object.assign(Creature.prototype, canEat, canWalk);
let creature = new Creature();
creature.name = "Monster";
creature.eat(); // "Monster is eating"
creature.walk(); // "Monster is walking"
```
