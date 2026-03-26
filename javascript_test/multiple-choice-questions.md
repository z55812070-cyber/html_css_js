# JavaScript Multiple Choice Questions

## Beginner Level

### 1. What is the output of `typeof null`?
- A) "null"
- B) "undefined"
- C) "object" ✓
- D) "number"

**Explanation:** This is a known bug in JavaScript that has been kept for backward compatibility.

---

### 2. Which keyword creates a constant variable?
- A) `var`
- B) `let`
- C) `const` ✓
- D) `fixed`

---

### 3. What does `===` check?
- A) Only value equality
- B) Value and type equality ✓
- C) Reference equality only
- D) Assignment

---

### 4. What is the result of `"5" + 3`?
- A) 8
- B) "53" ✓
- C) NaN
- D) Error

**Explanation:** The `+` operator performs string concatenation when one operand is a string.

---

### 5. Which method adds an element to the end of an array?
- A) `pop()`
- B) `shift()`
- C) `push()` ✓
- D) `unshift()`

---

### 6. What is the output of `Boolean("")`?
- A) true
- B) false ✓
- C) undefined
- D) Error

---

### 7. How do you write a single-line comment in JavaScript?
- A) `/* comment */`
- B) `// comment` ✓
- C) `# comment`
- D) `-- comment`

---

### 8. What does `Array.length` return for `[1, 2, 3]`?
- A) 2
- B) 3 ✓
- C) 4
- D) undefined

---

### 9. Which is NOT a valid way to declare a function?
- A) `function foo() {}`
- B) `const foo = () => {}`
- C) `const foo = function() {}`
- D) `def foo() {}` ✓

---

### 10. What is the result of `0.1 + 0.2 === 0.3`?
- A) true
- B) false ✓
- C) undefined
- D) Error

**Explanation:** Due to floating-point precision issues in JavaScript.

---

## Intermediate Level

### 11. What is a closure?
- A) A function that returns another function
- B) A function with access to its outer scope even after the outer function has returned ✓
- C) A method to close browser windows
- D) A way to end loops early

---

### 12. What does the `map()` method return?
- A) A single value
- B) A new array with transformed elements ✓
- C) The original array modified
- D) A boolean

---

### 13. What is the purpose of `bind()`?
- A) To connect two arrays
- B) To create a new function with a specific `this` context ✓
- C) To bind event listeners
- D) To combine objects

---

### 14. What will `console.log(!!"hello")` output?
- A) "hello"
- B) true ✓
- C) false
- D) Error

---

### 15. What is hoisting?
- A) Moving code to the server
- B) JavaScript's behavior of moving declarations to the top of their scope ✓
- C) Lifting DOM elements
- D) Async code execution

---

### 16. What does the spread operator `...` do?
- A) Creates a rest parameter
- B) Expands iterables into individual elements ✓
- C) Spreads errors across the console
- D) Both A and B ✓

---

### 17. What is the difference between `let` and `var`?
- A) `let` is function-scoped, `var` is block-scoped
- B) `let` is block-scoped, `var` is function-scoped ✓
- C) There is no difference
- D) `var` cannot be reassigned

---

### 18. What does `Promise.all()` do?
- A) Runs promises sequentially
- B) Waits for all promises to resolve or any to reject ✓
- C) Races promises against each other
- D) Cancels all promises

---

### 19. What is the output of `[1, 2, 3].reduce((a, b) => a + b)`?
- A) [1, 2, 3]
- B) 6 ✓
- C) [6]
- D) Error

---

### 20. What does `Object.freeze()` do?
- A) Stops all object methods
- B) Makes an object immutable ✓
- C) Deletes all properties
- D) Converts object to JSON

---

## Advanced Level

### 21. What is the event loop?
- A) A loop that processes events in the DOM
- B) JavaScript's mechanism for handling async operations ✓
- C) A debugging tool
- D) A type of infinite loop

---

### 22. What is the purpose of `Symbol()`?
- A) To create unique identifiers for object properties ✓
- B) To represent mathematical symbols
- C) To create CSS icons
- D) To mark deprecated code

---

### 23. What does a Proxy allow you to do?
- A) Route network requests
- B) Intercept and customize fundamental operations on objects ✓
- C) Create secure connections
- D) Cache API responses

---

### 24. What is the microtask queue?
- A) A queue for small tasks
- B) A queue for Promise callbacks and mutation observer callbacks ✓
- C) A queue for setTimeout callbacks
- D) A queue for network requests

---

### 25. What is currying?
- A) Adding spices to functions
- B) Transforming a function with multiple arguments into a sequence of nested functions ✓
- C) Running functions in parallel
- D) Optimizing function performance

---

### 26. What does `Reflect` provide?
- A) A way to mirror objects
- B) Methods for interceptable JavaScript operations ✓
- C) Debugging reflection tools
- D) Object cloning utilities

---

### 27. What is the Temporal Dead Zone (TDZ)?
- A) A place where time stops
- B) The period between entering scope and variable declaration where let/const can't be accessed ✓
- C) A debugging mode
- D) Async waiting period

---

### 28. What does `WeakMap` differ from `Map`?
- A) It's slower
- B) It holds weak references to keys, allowing garbage collection ✓
- C) It can only store numbers
- D) It's synchronous only

---

### 29. What is the purpose of `async/await`?
- A) To make code run faster
- B) To write asynchronous code that looks synchronous ✓
- C) To wait for user input
- D) To delay code execution

---

### 30. What does the `??` (nullish coalescing) operator do?
- A) Returns the first truthy value
- B) Returns the right operand when left is null or undefined ✓
- C) Combines two null values
- D) Checks if both values are null

---

## Answer Key

| Question | Answer | Question | Answer | Question | Answer |
|----------|--------|----------|--------|----------|--------|
| 1 | C | 11 | B | 21 | B |
| 2 | C | 12 | B | 22 | A |
| 3 | B | 13 | B | 23 | B |
| 4 | B | 14 | B | 24 | B |
| 5 | C | 15 | B | 25 | B |
| 6 | B | 16 | D | 26 | B |
| 7 | B | 17 | B | 27 | B |
| 8 | B | 18 | B | 28 | B |
| 9 | D | 19 | B | 29 | B |
| 10 | B | 20 | B | 30 | B |

---

## Scoring Guide

- **Beginner (1-10):** 
  - 8-10 correct: Ready for intermediate topics
  - 5-7 correct: Review fundamentals
  - Below 5: Study beginner concepts more

- **Intermediate (11-20):**
  - 8-10 correct: Ready for advanced topics
  - 5-7 correct: Practice more with intermediate concepts
  - Below 5: Review intermediate topics

- **Advanced (21-30):**
  - 8-10 correct: Strong advanced knowledge
  - 5-7 correct: Good understanding, keep learning
  - Below 5: Focus on advanced JavaScript concepts
