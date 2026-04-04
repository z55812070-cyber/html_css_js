# Module 3: Async and Advanced JS

This module covers advanced JavaScript features like error handling, asynchronous programming, and modules.

## 1. Error handling
- **Error handling, "try...catch":** Safely executing code and catching exceptions.
- **Custom errors, extending Error:** Creating your own error classes.

```javascript
// Error handling, "try...catch"
try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error.message);
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
  throw new ValidationError("Invalid input provided");
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Validation failed:", err.message);
  }
}
```

## 2. Promises, async/await
- **Introduction: callbacks:** Understanding the classic way to handle asynchronous code.
- **Promise:** Introduction to the `Promise` object and state transitions.
- **Promises chaining:** Using `.then()` to handle sequential tasks.
- **Error handling with promises:** Using `.catch()` for error propagation.
- **Promise API:** Working with `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, etc.
- **Promisification:** Converting callback-based functions to return promises.
- **Microtasks:** Understanding the microtask queue and its relationship with the event loop.
- **Async/await:** Using the `async` and `await` keywords for more readable asynchronous code.

```javascript
// Introduction: callbacks
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data loaded");
  }, 1000);
}
fetchData((err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

// Promise
let promise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Success!");
  } else {
    reject("Failed!");
  }
});
promise.then(result => console.log(result));

// Promises chaining
Promise.resolve(1)
  .then(n => n * 2)
  .then(n => n + 3)
  .then(result => console.log(result)); // 5

// Error handling with promises
Promise.reject(new Error("Oops!"))
  .catch(err => console.error("Caught:", err.message));

// Promise API
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.reject(new Error("Failed"));

Promise.all([p1, p2])
  .then(values => console.log("All:", values)); // [1, 2]

Promise.allSettled([p1, p2, p3])
  .then(results => console.log("All settled:", results));

Promise.race([p1, p2])
  .then(first => console.log("Race winner:", first)); // 1

// Promisification
function loadScript(src, callback) {
  // Simulated async operation
  setTimeout(() => callback(null, `Loaded ${src}`), 100);
}

function promisifyLoadScript(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Microtasks
Promise.resolve().then(() => console.log("Microtask 1"));
setTimeout(() => console.log("Macrotask"), 0);
Promise.resolve().then(() => console.log("Microtask 2"));
// Output order: Microtask 1, Microtask 2, Macrotask

// Async/await
async function asyncFunction() {
  try {
    let result = await promise;
    console.log("Async result:", result);
  } catch (error) {
    console.error("Async error:", error);
  }
}
asyncFunction();

async function fetchMultiple() {
  let [res1, res2] = await Promise.all([p1, p2]);
  console.log(res1, res2);
}
```

## 3. Generators, advanced iteration
- **Generators:** Functions that yield multiple values over time.
- **Async iteration and generators:** Iterating over asynchronous data streams.

```javascript
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

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (let num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Async iteration and generators
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (let num of asyncGenerator()) {
    console.log("Async gen:", num);
  }
})();
```

## 4. Modules
- **Modules, introduction:** Exporting and importing code between files.
- **Export and Import:** Using `export`, `export default`, and `import`.
- **Dynamic imports:** Dynamically loading modules with `import()`.

```javascript
// Modules - Example exports (would be in separate files)
// mathUtils.js:
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export default function multiply(a, b) { return a * b; }

// main.js:
// import multiply, { PI, add } from './mathUtils.js';
// console.log(PI, add(2, 3), multiply(2, 3));

// Dynamic imports
async function loadModule() {
  const module = await import('./mathUtils.js');
  console.log(module.add(5, 3));
}
```

## 5. Miscellaneous Features
- **Proxy and Reflect:** Using proxies for metaprogramming and observation.
- **Eval: run a code string:** Executing strings of JavaScript code.
- **Currying:** Transforming functions with multiple arguments into a sequence of nested functions.
- **Reference Type:** Understanding how `this` is lost in some calls.
- **BigInt:** Representing integers larger than `2^53 - 1`.
- **Unicode, String internals:** Understanding how strings are represented.
- **WeakRef and FinalizationRegistry:** Advanced memory management features.

```javascript
// Proxy and Reflect
let target = { name: "Target", age: 30 };
let handler = {
  get(obj, prop) {
    console.log(`Getting ${prop}`);
    return Reflect.get(obj, prop);
  },
  set(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
};
let proxy = new Proxy(target, handler);
console.log(proxy.name); // Logs "Getting name", then "Target"
proxy.age = 31; // Logs "Setting age to 31"

// Eval: run a code string (use sparingly!)
let code = "2 + 2";
let result = eval(code); // 4

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

function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6

// Reference Type - losing 'this'
let obj = {
  name: "MyObject",
  getName() {
    return this.name;
  }
};
let func = obj.getName;
console.log(func()); // undefined (lost 'this')
console.log(func.call(obj)); // "MyObject" (restored 'this')

// BigInt
let bigInt = 123456789012345678901234567890n;
let anotherBig = BigInt("98765432109876543210");
console.log(bigInt + anotherBig);

// Unicode, String internals
let emoji = "😀";
console.log(emoji.codePointAt(0)); // 128512
console.log(String.fromCodePoint(128512)); // "😀"
let unicodeStr = "\u{1F600}"; // Same as emoji
console.log(unicodeStr);

// WeakRef and FinalizationRegistry
let weakRef = new WeakRef({ data: "temporary" });
let registry = new FinalizationRegistry(heldValue => {
  console.log("Object finalized:", heldValue);
});
let objToTrack = { id: 1 };
registry.register(objToTrack, "obj-1");
objToTrack = null; // Eligible for GC
```
