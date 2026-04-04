// ============================================================
// JAVASCRIPT COURSE - COMPLETE EXAMPLES
// ============================================================

// ============================================================
// MODULE 1: BEGINNER FUNDAMENTALS
// ============================================================

// -----------------------------------------------------------
// SECTION 1: INTRODUCTION
// -----------------------------------------------------------

// What is JavaScript? - Examples shown throughout this file
// Manuals: ECMAScript spec at https://tc39.es/ecma262/
// MDN Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript
// Code Editor: VS Code with extensions like ESLint, Prettier
// Developer Console: Press F12 in browser, go to Console tab

// -----------------------------------------------------------
// SECTION 2: JAVASCRIPT FUNDAMENTALS
// -----------------------------------------------------------

// Hello, world!
console.log("Hello, world!");
// alert("Hello, world!"); // In browser only - commented out for Node.js

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
  console.log("While:", i);
  i++;
}

do {
  console.log("Do-while:", i);
  i++;
} while (i < 4);

for (let j = 0; j < 3; j++) {
  console.log("For:", j);
}

// The "switch" statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("End of week");
    break;
  default:
    console.log("Midweek");
}

// Functions
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"

// Function expressions
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(4, 5)); // 20

// Arrow functions, the basics
const add = (a, b) => a + b;
console.log(add(3, 7)); // 10

const square = n => n * n;
console.log(square(5)); // 25

// -----------------------------------------------------------
// SECTION 3: OBJECTS - THE BASICS
// -----------------------------------------------------------

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
console.log(obj1.value); // 2 (changed!)

// Proper copying
let obj3 = { value: 1 };
let obj4 = { ...obj3 }; // Spread operator
let obj5 = Object.assign({}, obj3); // Object.assign
obj5.value = 3;
console.log(obj3.value); // 1 (unchanged)

// Garbage collection
// JavaScript automatically frees memory when objects are unreachable
let temp = { data: "temporary" };
temp = null; // Now the object can be garbage collected

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
let person1 = new Person("Alice", 25);
console.log(person1.greet()); // "Hi, I'm Alice"

// Optional chaining '?.'
let nestedObj = { user: { profile: { name: "Test" } } };
console.log(nestedObj.user?.profile?.name); // "Test"
console.log(nestedObj.missing?.field); // undefined (no error)

// Symbol type
let idSymbol = Symbol("id");
let entity = {
  [idSymbol]: 123,
  name: "Entity"
};
console.log(entity[idSymbol]); // 123

// Object to primitive conversion
let objWithConversion = {
  valueOf() {
    return 100;
  },
  toString() {
    return "100";
  }
};
console.log(objWithConversion + 50); // 150 (uses valueOf)

// ============================================================
// MODULE 2: INTERMEDIATE LANGUAGE
// ============================================================

// -----------------------------------------------------------
// SECTION 1: DATA TYPES IN DEPTH
// -----------------------------------------------------------

// Methods of primitives
let str = "hello";
console.log(str.toUpperCase()); // "HELLO"
console.log(str.charAt(0)); // "h"
console.log((123).toString()); // "123"

// Numbers
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Infinity); // Infinity
console.log(NaN); // NaN (Not a Number)
console.log(Math.sqrt(16)); // 4
console.log(Math.random()); // Random number between 0 and 1
console.log(Math.round(3.7)); // 4
console.log(Math.floor(3.7)); // 3
console.log(Math.ceil(3.2)); // 4

// Strings
let greeting = "Hello, World!";
console.log(greeting[0]); // "H"
console.log(greeting.slice(0, 5)); // "Hello"
console.log(greeting.substring(7, 12)); // "World"
console.log(greeting.includes("World")); // true
console.log(greeting.startsWith("Hello")); // true
console.log(greeting.endsWith("!")); // true
console.log(`Template literal: ${greeting}`); // Template literal

// Arrays
let fruits = ["apple", "banana", "orange"];
fruits.push("grape"); // Add to end
fruits.pop(); // Remove from end
fruits.unshift("mango"); // Add to start
fruits.shift(); // Remove from start
console.log(fruits.length); // 3

// Array methods
let numbers = [1, 2, 3, 4, 5];

// map - transform each element
let doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
let evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulate to single value
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// find - first element that passes test
let found = numbers.find(n => n > 3);
console.log(found); // 4

// sort - sort array
let unsorted = [3, 1, 4, 1, 5];
unsorted.sort((a, b) => a - b);
console.log(unsorted); // [1, 1, 3, 4, 5]

// Iterables
let iterableArray = [1, 2, 3];
for (let item of iterableArray) {
  console.log(item); // 1, 2, 3
}

// Map and Set
let myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
console.log(myMap.get("key1")); // "value1"
console.log(myMap.has("key2")); // true

let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Duplicate, ignored
console.log(mySet.size); // 2

// WeakMap and WeakSet
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "data");
// When obj is garbage collected, the entry is removed automatically

let weakSet = new WeakSet();
weakSet.add(obj);
// Similar automatic cleanup

// Object.keys, values, entries
let sampleObj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(sampleObj)); // ["a", "b", "c"]
console.log(Object.values(sampleObj)); // [1, 2, 3]
console.log(Object.entries(sampleObj)); // [["a", 1], ["b", 2], ["c", 3]]

// Destructuring assignment
let [first, second] = [10, 20];
console.log(first, second); // 10, 20

let { name: userName, age: userAge } = { name: "Bob", age: 30 };
console.log(userName, userAge); // Bob, 30

// Date and time
let now = new Date();
console.log(now.getFullYear());
console.log(now.getMonth()); // 0-11
console.log(now.getDate()); // Day of month
console.log(now.toISOString()); // ISO format

// JSON methods, toJSON
let jsonObj = { name: "Test", value: 123 };
let jsonString = JSON.stringify(jsonObj);
console.log(jsonString); // '{"name":"Test","value":123}'
let parsedObj = JSON.parse(jsonString);
console.log(parsedObj.name); // "Test"

// -----------------------------------------------------------
// SECTION 2: ADVANCED WORKING WITH FUNCTIONS
// -----------------------------------------------------------

// Recursion and stack
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Rest parameters and spread syntax
function sumAll(...args) {
  return args.reduce((a, b) => a + b, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

// Variable scope, closure
function createCounter() {
  let count = 0; // Private variable
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
  console.log(x); // 10 (accessible outside if block)
}

// Global object
// console.log(window); // In browser - commented out for Node.js
// console.log(global); // In Node.js - commented out to avoid confusion

// Function object, NFE (Named Function Expression)
let myFunc = function namedFunc(x) {
  return namedFunc(x - 1) + x;
};

// The "new Function" syntax
let dynamicFunc = new Function('a', 'b', 'return a + b');
console.log(dynamicFunc(5, 3)); // 8

// Scheduling: setTimeout and setInterval (commented out to avoid hanging)
// setTimeout(() => {
//   console.log("Executes after 1 second");
// }, 1000);

// let intervalId = setInterval(() => {
//   console.log("Executes every 2 seconds");
// }, 2000);
// clearInterval(intervalId); // To stop

// Decorators and forwarding, call/apply
function loggingDecorator(func) {
  return function(...args) {
    console.log("Calling with:", args);
    return func.apply(this, args);
  };
}

function original(a, b) {
  return a + b;
}
let loggedFunc = loggingDecorator(original);
console.log(loggedFunc(2, 3)); // Logs then returns 5

// Function binding
let boundFunc = original.bind(null, 10);
console.log(boundFunc(5)); // 15

// Arrow functions revisited
let objWithArrow = {
  value: 42,
  getValue: () => {
    // Arrow functions don't have their own 'this'
    // This will NOT work as expected
    return this.value; // undefined
  },
  getValueRegular: function() {
    return this.value; // 42
  }
};

// -----------------------------------------------------------
// SECTION 3: PROTOTYPES, INHERITANCE
// -----------------------------------------------------------

// Prototypal inheritance
let animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

let rabbit = {
  jumps: true
};
rabbit.__proto__ = animal; // rabbit inherits from animal
rabbit.walk(); // "Animal walks"

// F.prototype
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function() {
  console.log(`${this.name} says woof!`);
};
let myDog = new Dog("Rex");
myDog.bark(); // "Rex says woof!"

// Native prototypes
console.log([].constructor === Array); // true
console.log({}.constructor === Object); // true

// Prototype methods, objects without __proto__
let objNoProto = Object.create(null);
// objNoProto has no prototype chain

// -----------------------------------------------------------
// SECTION 4: CLASSES
// -----------------------------------------------------------

// Class basic syntax
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  
  drive() {
    console.log(`${this.brand} is driving`);
  }
}
let myCar = new Car("Toyota");
myCar.drive(); // "Toyota is driving"

// Class inheritance
class ElectricCar extends Car {
  constructor(brand, batterySize) {
    super(brand); // Call parent constructor
    this.batterySize = batterySize;
  }
  
  charge() {
    console.log(`${this.brand} is charging`);
  }
}
let tesla = new ElectricCar("Tesla", "100kWh");
tesla.drive(); // "Tesla is driving"
tesla.charge(); // "Tesla is charging"

// Static properties and methods
class MathUtils {
  static PI = 3.14159;
  
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.add(5, 3)); // 8

// Private and protected properties and methods
class BankAccount {
  #balance = 0; // Private property
  
  deposit(amount) {
    this.#balance += amount;
  }
  
  getBalance() {
    return this.#balance;
  }
}
let account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // Error!

// Extending built-in classes
class MyArray extends Array {
  sum() {
    return this.reduce((a, b) => a + b, 0);
  }
}
let myArr = new MyArray(1, 2, 3);
console.log(myArr.sum()); // 6

// Class checking: "instanceof"
console.log(tesla instanceof ElectricCar); // true
console.log(tesla instanceof Car); // true

// Mixins
let sayHiMixin = {
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  },
  sayBye() {
    console.log(`Bye from ${this.name}`);
  }
};

class PersonWithMixin {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(PersonWithMixin.prototype, sayHiMixin);
let personWithMixin = new PersonWithMixin("Alice");
personWithMixin.sayHi(); // "Hi, I'm Alice"

// ============================================================
// MODULE 3: ASYNC AND ADVANCED JS
// ============================================================

// -----------------------------------------------------------
// SECTION 1: ERROR HANDLING
// -----------------------------------------------------------

// Error handling, "try...catch"
try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("Error occurred:", error.message);
} finally {
  console.log("This always runs");
}

function riskyOperation() {
  throw new Error("Something went wrong!");
}

// Custom errors, extending Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
try {
  throw new ValidationError("Invalid input");
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Validation failed:", err.message);
  }
}

// -----------------------------------------------------------
// SECTION 2: PROMISES, ASYNC/AWAIT
// -----------------------------------------------------------

// Introduction: callbacks
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}
fetchDataCallback(data => console.log(data));

// Promise
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
    // reject("Failed!");
  }, 1000);
});

promise.then(result => {
  console.log(result); // "Success!"
});

// Promises chaining
promise
  .then(result => `${result} - Step 2`)
  .then(result => `${result} - Step 3`)
  .then(console.log); // "Success! - Step 2 - Step 3"

// Error handling with promises
promise
  .then(result => {
    throw new Error("Chain error");
  })
  .catch(err => console.error("Caught:", err.message));

// Promise API
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [1, 2, 3]
});

Promise.race([p1, p2, p3]).then(first => {
  console.log("First resolved:", first); // 1
});

Promise.allSettled([p1, Promise.reject("err"), p3]).then(results => {
  console.log(results); // All results with status
});

// Promisification
function loadScript(src, callback) {
  // Traditional callback-based
}

function loadScriptPromise(src) {
  return new Promise((resolve, reject) => {
    // Implementation
  });
}

// Microtasks (commented out - async timing)
// Promise.resolve().then(() => {
//   console.log("Microtask runs before setTimeout");
// });
// setTimeout(() => console.log("Macrotask"), 0);

// Async/await
async function asyncFunction() {
  try {
    let result = await promise;
    console.log("Async result:", result);
    return result;
  } catch (error) {
    console.error("Async error:", error);
  }
}
asyncFunction();

// -----------------------------------------------------------
// SECTION 3: GENERATORS, ADVANCED ITERATION
// -----------------------------------------------------------

// Generators
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

let gen = numberGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3

// Async iteration and generators
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
}

(async () => {
  for await (let num of asyncGenerator()) {
    console.log(num);
  }
})();

// -----------------------------------------------------------
// SECTION 4: MODULES
// -----------------------------------------------------------

// Modules, introduction (would be in separate files)
// export.js:
// export const name = "Module";
// export function greet() { return "Hello"; }
// export default function main() {}

// import.js:
// import { name, greet } from './export.js';
// import main from './export.js';

// Dynamic imports (commented out - requires actual module file)
// (async () => {
//   const module = await import('./module.js');
//   module.default();
// })();

// -----------------------------------------------------------
// SECTION 5: MISCELLANEOUS FEATURES
// -----------------------------------------------------------

// Proxy and Reflect
let target = { name: "Target" };
let handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};
let proxy = new Proxy(target, handler);
console.log(proxy.name); // Logs then returns "Target"
proxy.name = "New Target"; // Logs

// Eval: run a code string
eval("let x = 5; console.log(x)"); // 5
// Note: eval is dangerous, avoid using in production

// Currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function addThree(a, b, c) {
  return a + b + c;
}
let curriedAdd = curry(addThree);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// Reference Type (this context loss)
let objRef = {
  value: 42,
  getValue() { return this.value; }
};
let standalone = objRef.getValue;
console.log(standalone()); // undefined (lost this)
console.log(objRef.getValue()); // 42

// BigInt
let hugeNumber = 123456789012345678901234567890n;
console.log(hugeNumber + 1n); // 123456789012345678901234567891n

// Unicode, String internals
let unicodeStr = "Hello 🌍";
console.log(unicodeStr.length); // 8 (emoji is 2 code units)
console.log([...unicodeStr].length); // 7 (actual characters)

// WeakRef and FinalizationRegistry
let weakRef = new WeakRef({ data: "temporary" });
// The object may be garbage collected at any time

let registry = new FinalizationRegistry(heldValue => {
  console.log("Object cleaned up:", heldValue);
});

// ============================================================
// MODULE 4: BROWSER - DOCUMENT, EVENTS, INTERFACES
// ============================================================

// -----------------------------------------------------------
// SECTION 1: DOCUMENT (DOM)
// -----------------------------------------------------------

// Browser environment, specs
// DOM - Document Object Model
// CSSOM - CSS Object Model
// HTML Standard

// DOM tree
// document.documentElement - <html>
// document.body - <body>
// document.head - <head>

// Walking the DOM
// element.parentNode
// element.children
// element.firstChild, element.lastChild
// element.nextSibling, element.previousSibling

// Searching: getElement*, querySelector*
// document.getElementById('myId')
// document.getElementsByClassName('myClass')
// document.getElementsByTagName('div')
// document.querySelector('.myClass')
// document.querySelectorAll('div.class')

// Node properties: type, tag and contents
// node.nodeType (1=element, 3=text)
// node.nodeName, node.tagName
// node.innerHTML, node.textContent

// Attributes and properties
// element.getAttribute('href')
// element.setAttribute('href', '#')
// element.href (property)

// Modifying the document
// document.createElement('div')
// element.append(), element.prepend()
// element.before(), element.after()
// element.remove()

// Styles and classes
// element.classList.add('active')
// element.classList.remove('active')
// element.classList.toggle('active')
// element.style.color = 'red'

// Element size and scrolling
// element.clientWidth, element.clientHeight
// element.scrollWidth, element.scrollHeight
// element.scrollTop, element.scrollLeft

// Window sizes and scrolling
// window.innerWidth, window.innerHeight
// window.scrollTo(0, 100)
// window.scrollBy(0, 50)

// Coordinates
// element.getBoundingClientRect()
// Returns: { top, right, bottom, left, width, height }

// -----------------------------------------------------------
// SECTION 2: INTRODUCTION TO EVENTS
// -----------------------------------------------------------

// Introduction to browser events
// element.addEventListener('click', handler)
// element.addEventListener('submit', handler)

// Bubbling and capturing
// element.addEventListener('click', handler, true) // capturing
// element.addEventListener('click', handler, false) // bubbling (default)

// Event delegation
// document.querySelector('#parent').addEventListener('click', (e) => {
//   if (e.target.matches('.child')) {
//     // Handle child click
//   }
// });

// Browser default actions
// e.preventDefault() - Stop default behavior

// Dispatching custom events
// let event = new CustomEvent('myEvent', { detail: { data: 123 } });
// element.dispatchEvent(event);

// -----------------------------------------------------------
// SECTION 3: UI EVENTS
// -----------------------------------------------------------

// Mouse events
// click, dblclick, mousedown, mouseup, mousemove
// element.addEventListener('click', (e) => {
//   console.log(e.clientX, e.clientY);
// });

// Moving the mouse: mouseover/out, mouseenter/leave
// mouseover/mouseout - fire when entering/leaving element AND children
// mouseenter/mouseleave - only when entering/leaving element itself

// Drag'n'Drop with mouse events
// dragstart, drag, dragend, dragover, drop

// Pointer events
// pointerdown, pointerup, pointermove (unified for mouse, touch, pen)

// Keyboard: keydown and keyup
// document.addEventListener('keydown', (e) => {
//   console.log(e.key, e.code, e.ctrlKey, e.shiftKey);
// });

// Scrolling
// window.addEventListener('scroll', () => {
//   console.log(window.scrollY);
// });

// -----------------------------------------------------------
// SECTION 4: FORMS, CONTROLS
// -----------------------------------------------------------

// Form properties and methods
// form.elements
// form.submit()
// form.reset()

// Focusing: focus/blur
// input.focus()
// input.blur()
// input.addEventListener('focus', handler)
// input.addEventListener('blur', handler)

// Events: change, input, cut, copy, paste
// input.addEventListener('input', (e) => {
//   console.log(e.target.value);
// });
// input.addEventListener('change', handler);

// Forms: event and method submit
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   // Process form
// });

// -----------------------------------------------------------
// SECTION 5: DOCUMENT AND RESOURCE LOADING
// -----------------------------------------------------------

// Page: DOMContentLoaded, load, beforeunload, unload
// document.addEventListener('DOMContentLoaded', () => {
//   // DOM is ready
// });
// window.addEventListener('load', () => {
//   // All resources loaded
// });
// window.addEventListener('beforeunload', (e) => {
//   // Warn before leaving
// });

// Scripts: async, defer
// <script src="script.js"></script> - blocks parsing
// <script src="script.js" async></script> - loads async, executes immediately
// <script src="script.js" defer></script> - loads async, executes after DOM

// Resource loading: onload and onerror
// img.onload = () => console.log('Image loaded');
// img.onerror = () => console.log('Image failed');

// -----------------------------------------------------------
// SECTION 6: MISCELLANEOUS
// -----------------------------------------------------------

// Mutation observer
// let observer = new MutationObserver((mutations) => {
//   mutations.forEach(m => console.log(m));
// });
// observer.observe(element, { childList: true, subtree: true });

// Selection and Range
// let selection = window.getSelection();
// let range = document.createRange();

// Event loop: microtasks and macrotasks
// Microtasks: Promise callbacks, queueMicrotask
// Macrotasks: setTimeout, setInterval, I/O, UI rendering

// ============================================================
// MODULE 5: ADDITIONAL ADVANCED TOPICS
// ============================================================

// -----------------------------------------------------------
// SECTION 1: FRAMES AND WINDOWS
// -----------------------------------------------------------

// Popups and window methods
// let newWindow = window.open('https://example.com', '_blank');
// newWindow.close();

// Cross-window communication
// window.postMessage('message', 'https://target-origin.com');
// window.addEventListener('message', (event) => {
//   console.log(event.data);
// });

// The clickjacking attack
// Protection: X-Frame-Options header, CSP frame-ancestors

// -----------------------------------------------------------
// SECTION 2: BINARY DATA, FILES
// -----------------------------------------------------------

// ArrayBuffer, binary arrays
let buffer = new ArrayBuffer(8);
let view = new Uint8Array(buffer);
view[0] = 255;

// TextDecoder and TextEncoder
let encoder = new TextEncoder();
let encoded = encoder.encode("Hello");
let decoder = new TextDecoder();
let decoded = decoder.decode(encoded);

// Blob
let blob = new Blob(["Hello, World!"], { type: "text/plain" });

// File and FileReader
// let fileInput = document.querySelector('input[type="file"]');
// fileInput.addEventListener('change', (e) => {
//   let file = e.target.files[0];
//   let reader = new FileReader();
//   reader.onload = () => console.log(reader.result);
//   reader.readAsText(file);
// });

// -----------------------------------------------------------
// SECTION 3: NETWORK REQUESTS
// -----------------------------------------------------------

// Fetch
// fetch('https://api.example.com/data')
//   .then(response => response.json())
//   .then(data => console.log(data));

// FormData
// let formData = new FormData();
// formData.append('username', 'john');
// formData.append('password', 'secret');
// fetch('/login', { method: 'POST', body: formData });

// Fetch: Download progress
// fetch(url)
//   .then(response => {
//     const reader = response.body.getReader();
//     // Read chunks and track progress
//   });

// Fetch: Abort
// let controller = new AbortController();
// fetch(url, { signal: controller.signal });
// controller.abort(); // Cancel request

// Fetch: Cross-Origin Requests (CORS)
// Server must send: Access-Control-Allow-Origin: *

// URL objects
let url = new URL('https://example.com/path?query=1');
console.log(url.hostname); // example.com
console.log(url.searchParams.get('query')); // 1

// XMLHttpRequest (older method)
// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/data');
// xhr.onload = () => console.log(xhr.response);
// xhr.send();

// WebSocket
// let ws = new WebSocket('ws://example.com/socket');
// ws.onopen = () => ws.send('Hello');
// ws.onmessage = (e) => console.log(e.data);

// Server Sent Events
// let evtSource = new EventSource('/stream');
// evtSource.onmessage = (e) => console.log(e.data);

// -----------------------------------------------------------
// SECTION 4: STORING DATA IN THE BROWSER
// -----------------------------------------------------------

// Cookies, document.cookie
// document.cookie = "username=John; expires=Thu, 18 Dec 2025 12:00:00 UTC";

// LocalStorage, sessionStorage (browser only)
// localStorage.setItem('key', 'value');
// let stored = localStorage.getItem('key');
// localStorage.removeItem('key');
// localStorage.clear();

// sessionStorage.setItem('temp', 'data'); // Cleared when tab closes

// IndexedDB (complex, full example would be longer)
// let request = indexedDB.open('MyDatabase', 1);
// request.onupgradeneeded = (e) => {
//   let db = e.target.result;
//   db.createObjectStore('users', { keyPath: 'id' });
// };

// -----------------------------------------------------------
// SECTION 5: ANIMATION
// -----------------------------------------------------------

// Bezier curve
// Mathematical formula for smooth animations

// CSS-animations
// @keyframes slide {
//   from { transform: translateX(0); }
//   to { transform: translateX(100px); }
// }
// element.style.animation = 'slide 1s ease-in-out';

// JavaScript animations
// function animate(duration, draw) {
//   let start = performance.now();
//   requestAnimationFrame(function animate(time) {
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;
//     draw(timeFraction);
//     if (timeFraction < 1) requestAnimationFrame(animate);
//   });
// }

// -----------------------------------------------------------
// SECTION 6: WEB COMPONENTS
// -----------------------------------------------------------

// Custom elements
// class MyElement extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.innerHTML = '<p>Hello from Shadow DOM</p>';
//   }
// }
// customElements.define('my-element', MyElement);

// Shadow DOM, slots, styling, events
// See custom elements example above

// Template element
// <template id="my-template"><div>Content</div></template>
// let template = document.getElementById('my-template');
// let clone = template.content.cloneNode(true);

// -----------------------------------------------------------
// SECTION 7: REGULAR EXPRESSIONS
// -----------------------------------------------------------

// Patterns and flags
let regex = /hello/gi; // g=global, i=case-insensitive

// Character classes
console.log(/\d/.test("5")); // true (digit)
console.log(/\w/.test("a")); // true (word character)
console.log(/\s/.test(" ")); // true (whitespace)

// Unicode: flag "u" and class \p{...}
console.log(/\p{L}/u.test("é")); // true (any letter)

// Anchors: string start ^ and end $
console.log(/^Hello/.test("Hello World")); // true
console.log(/World$/.test("Hello World")); // true

// Multiline mode of anchors ^ $, flag "m"
let multiline = /^Start/m;

// Word boundary: \b
console.log(/\bword\b/.test("a word here")); // true

// Escaping, special characters
console.log(/\./.test(".")); // true (literal dot)

// Sets and ranges [...]
console.log(/[aeiou]/.test("e")); // true (vowel)
console.log(/[0-9]/.test("5")); // true (digit)

// Quantifiers +, *, ? and {n}
console.log(/a+/.test("aaa")); // true (one or more)
console.log(/a*/.test("")); // true (zero or more)
console.log(/a?/.test("a")); // true (zero or one)
console.log(/a{2}/.test("aa")); // true (exactly 2)

// Greedy and lazy quantifiers
console.log("<div>content</div>".match(/<.*>/)); // Greedy: whole string
console.log("<div>content</div>".match(/<.*?>/)); // Lazy: <div>

// Capturing groups
let match = "John Doe".match(/(\w+) (\w+)/);
console.log(match[1]); // John
console.log(match[2]); // Doe

// Backreferences in pattern
console.log(/(\w+)\s+\1/.test("hello hello")); // true

// Alternation (OR) |
console.log(/cat|dog/.test("dog")); // true

// Lookahead and lookbehind
console.log(/(?=\d)\d+/.exec("123")); // Positive lookahead
console.log(/(?<=\$)\d+/.exec("$100")); // Positive lookbehind

// Sticky flag "y", searching at position
let stickyRegex = /world/y;
stickyRegex.lastIndex = 6;
console.log(stickyRegex.test("hello world")); // true

// Methods of RegExp and String
let testRegex = /test/;
console.log(testRegex.test("this is a test")); // true
console.log(testRegex.exec("this is a test")); // ["test"]
console.log("test string".match(/test/)); // ["test"]
console.log("test test".replace(/test/, "replacement")); // "replacement test"
console.log("test test".replaceAll(/test/g, "replacement")); // "replacement replacement"

// ============================================================
// END OF EXAMPLES
// ============================================================
