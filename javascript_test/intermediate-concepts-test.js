/**
 * JavaScript Intermediate Concepts Test
 * Covers: Arrays, Objects, Closures, Prototypes, Classes, Advanced Functions
 */

const assert = require('assert');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`✓ ${description}`);
        passed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
        failed++;
    }
}

console.log('=== Intermediate Concepts Test ===\n');

// ============================================
// Section 1: Arrays and Array Methods
// ============================================

test('should create and manipulate arrays', () => {
    const arr = [1, 2, 3];
    arr.push(4);
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
    
    arr.pop();
    assert.deepStrictEqual(arr, [1, 2, 3]);
    
    arr.unshift(0);
    assert.deepStrictEqual(arr, [0, 1, 2, 3]);
    
    arr.shift();
    assert.deepStrictEqual(arr, [1, 2, 3]);
});

test('should use map method', () => {
    const numbers = [1, 2, 3, 4];
    const doubled = numbers.map(n => n * 2);
    assert.deepStrictEqual(doubled, [2, 4, 6, 8]);
});

test('should use filter method', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const evens = numbers.filter(n => n % 2 === 0);
    assert.deepStrictEqual(evens, [2, 4, 6]);
});

test('should use reduce method', () => {
    const numbers = [1, 2, 3, 4];
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    assert.strictEqual(sum, 10);
});

test('should use find and findIndex', () => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    
    const found = users.find(u => u.id === 2);
    assert.strictEqual(found.name, 'Bob');
    
    const index = users.findIndex(u => u.id === 3);
    assert.strictEqual(index, 2);
});

test('should use sort method', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    const sorted = [...numbers].sort((a, b) => a - b);
    assert.deepStrictEqual(sorted, [1, 1, 2, 3, 4, 5, 6, 9]);
});

test('should use some and every', () => {
    const numbers = [2, 4, 6, 8];
    assert.strictEqual(numbers.some(n => n > 5), true);
    assert.strictEqual(numbers.every(n => n % 2 === 0), true);
    assert.strictEqual(numbers.every(n => n > 5), false);
});

// ============================================
// Section 2: Objects and Destructuring
// ============================================

test('should destructure objects', () => {
    const person = { name: 'John', age: 30, city: 'NYC' };
    const { name, age } = person;
    assert.strictEqual(name, 'John');
    assert.strictEqual(age, 30);
});

test('should destructure arrays', () => {
    const colors = ['red', 'green', 'blue'];
    const [first, second] = colors;
    assert.strictEqual(first, 'red');
    assert.strictEqual(second, 'green');
});

test('should use rest and spread syntax', () => {
    const nums = [1, 2, 3, 4, 5];
    const [first, ...rest] = nums;
    assert.strictEqual(first, 1);
    assert.deepStrictEqual(rest, [2, 3, 4, 5]);
    
    const combined = [...nums, 6, 7];
    assert.deepStrictEqual(combined, [1, 2, 3, 4, 5, 6, 7]);
});

test('should spread objects', () => {
    const defaults = { theme: 'light', lang: 'en' };
    const userPrefs = { theme: 'dark' };
    const config = { ...defaults, ...userPrefs };
    assert.deepStrictEqual(config, { theme: 'dark', lang: 'en' });
});

test('should use Object.keys, values, entries', () => {
    const obj = { a: 1, b: 2, c: 3 };
    assert.deepStrictEqual(Object.keys(obj), ['a', 'b', 'c']);
    assert.deepStrictEqual(Object.values(obj), [1, 2, 3]);
    assert.deepStrictEqual(Object.entries(obj), [['a', 1], ['b', 2], ['c', 3]]);
});

// ============================================
// Section 3: Closures and Scope
// ============================================

test('should understand closure', () => {
    function createCounter() {
        let count = 0;
        return function() {
            count++;
            return count;
        };
    }
    
    const counter = createCounter();
    assert.strictEqual(counter(), 1);
    assert.strictEqual(counter(), 2);
    assert.strictEqual(counter(), 3);
});

test('should handle lexical scope', () => {
    const outer = 'global';
    
    function outerFunc() {
        const middle = 'outer';
        
        function innerFunc() {
            const inner = 'inner';
            return `${outer}-${middle}-${inner}`;
        }
        
        return innerFunc();
    }
    
    assert.strictEqual(outerFunc(), 'global-outer-inner');
});

test('should handle var vs let in loops', () => {
    // Using var - creates function scope
    var varArr = [];
    for (var i = 0; i < 3; i++) {
        varArr.push(function() { return i; });
    }
    assert.strictEqual(varArr[0](), 3); // All return 3
    
    // Using let - creates block scope
    let letArr = [];
    for (let j = 0; j < 3; j++) {
        letArr.push(function() { return j; });
    }
    assert.strictEqual(letArr[0](), 0);
    assert.strictEqual(letArr[1](), 1);
    assert.strictEqual(letArr[2](), 2);
});

// ============================================
// Section 4: this and Binding
// ============================================

test('should understand this context', () => {
    const obj = {
        value: 42,
        getValue: function() {
            return this.value;
        }
    };
    assert.strictEqual(obj.getValue(), 42);
});

test('should use bind method', () => {
    const obj = { value: 10 };
    
    function getValue() {
        return this.value;
    }
    
    const boundFn = getValue.bind(obj);
    assert.strictEqual(boundFn(), 10);
});

test('should use call and apply', () => {
    function greet(greeting, punctuation) {
        return `${greeting}, ${this.name}${punctuation}`;
    }
    
    const person = { name: 'Alice' };
    
    assert.strictEqual(greet.call(person, 'Hello', '!'), 'Hello, Alice!');
    assert.strictEqual(greet.apply(person, ['Hi', '?']), 'Hi, Alice?');
});

// ============================================
// Section 5: Prototypes
// ============================================

test('should understand prototype chain', () => {
    const animal = {
        eats: true,
        walk() {
            return 'Animal walks';
        }
    };
    
    const rabbit = {
        jumps: true
    };
    
    rabbit.__proto__ = animal;
    
    assert.strictEqual(rabbit.eats, true);
    assert.strictEqual(rabbit.walk(), 'Animal walks');
    assert.strictEqual(rabbit.jumps, true);
});

test('should use Object.create', () => {
    const proto = {
        greet() {
            return `Hello, ${this.name}`;
        }
    };
    
    const obj = Object.create(proto);
    obj.name = 'Bob';
    
    assert.strictEqual(obj.greet(), 'Hello, Bob');
});

// ============================================
// Section 6: Classes
// ============================================

test('should create classes', () => {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        
        speak() {
            return `${this.name} makes a sound`;
        }
    }
    
    const dog = new Animal('Dog');
    assert.strictEqual(dog.name, 'Dog');
    assert.strictEqual(dog.speak(), 'Dog makes a sound');
});

test('should extend classes', () => {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        
        speak() {
            return `${this.name} makes a sound`;
        }
    }
    
    class Dog extends Animal {
        speak() {
            return `${this.name} barks`;
        }
    }
    
    const myDog = new Dog('Rex');
    assert.strictEqual(myDog.speak(), 'Rex barks');
    assert.strictEqual(myDog instanceof Animal, true);
    assert.strictEqual(myDog instanceof Dog, true);
});

test('should use static methods', () => {
    class MathUtils {
        static add(a, b) {
            return a + b;
        }
    }
    
    assert.strictEqual(MathUtils.add(5, 3), 8);
});

test('should use private fields', () => {
    class Counter {
        #count = 0;
        
        increment() {
            this.#count++;
        }
        
        getCount() {
            return this.#count;
        }
    }
    
    const counter = new Counter();
    counter.increment();
    counter.increment();
    assert.strictEqual(counter.getCount(), 2);
});

// ============================================
// Section 7: Map, Set, WeakMap, WeakSet
// ============================================

test('should use Map', () => {
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    
    assert.strictEqual(map.get('key1'), 'value1');
    assert.strictEqual(map.size, 2);
    assert.strictEqual(map.has('key2'), true);
});

test('should use Set', () => {
    const set = new Set([1, 2, 2, 3, 3, 3]);
    assert.strictEqual(set.size, 3);
    assert.strictEqual(set.has(2), true);
    assert.strictEqual(set.has(4), false);
});

test('should use WeakMap', () => {
    const weakMap = new WeakMap();
    const obj = { id: 1 };
    weakMap.set(obj, 'data');
    
    assert.strictEqual(weakMap.get(obj), 'data');
});

// ============================================
// Section 8: Date and JSON
// ============================================

test('should work with Date', () => {
    const date = new Date('2024-01-01');
    assert.strictEqual(date.getFullYear(), 2024);
    assert.strictEqual(date.getMonth(), 0); // January is 0
    assert.strictEqual(date.getDate(), 1);
});

test('should use JSON methods', () => {
    const obj = { name: 'Test', value: 123 };
    const jsonStr = JSON.stringify(obj);
    const parsed = JSON.parse(jsonStr);
    
    assert.deepStrictEqual(parsed, obj);
});

// ============================================
// Summary
// ============================================

console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed === 0) {
    console.log('\n🎉 All tests passed!');
} else {
    console.log(`\n⚠️  ${failed} test(s) failed.`);
    process.exit(1);
}

/*
// ============================================
// ANSWER KEY (for reference)
// ============================================
// All answers are embedded in the test assertions above.
*/
