/**
 * JavaScript Beginner Fundamentals Test
 * Covers: Variables, Data Types, Operators, Conditionals, Loops, Functions
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

console.log('=== Beginner Fundamentals Test ===\n');

// ============================================
// Section 1: Variables and Data Types
// ============================================

test('should declare variables with let and const', () => {
    let changeable = 10;
    const unchangeable = 20;
    changeable = 15;
    assert.strictEqual(changeable, 15);
    assert.strictEqual(unchangeable, 20);
});

test('should identify different data types', () => {
    assert.strictEqual(typeof 42, 'number');
    assert.strictEqual(typeof 'hello', 'string');
    assert.strictEqual(typeof true, 'boolean');
    assert.strictEqual(typeof undefined, 'undefined');
    assert.strictEqual(typeof null, 'object'); // Note: This is a known JS quirk
    assert.strictEqual(typeof {}, 'object');
    assert.strictEqual(typeof [], 'object');
    assert.strictEqual(typeof Symbol('id'), 'symbol');
});

test('should convert between types', () => {
    assert.strictEqual(Number('42'), 42);
    assert.strictEqual(String(42), '42');
    assert.strictEqual(Boolean('hello'), true);
    assert.strictEqual(Boolean(''), false);
    assert.strictEqual(Number(''), 0);
    assert.strictEqual(Number('abc'), NaN);
});

// ============================================
// Section 2: Operators
// ============================================

test('should perform basic arithmetic', () => {
    assert.strictEqual(5 + 3, 8);
    assert.strictEqual(10 - 4, 6);
    assert.strictEqual(3 * 7, 21);
    assert.strictEqual(15 / 3, 5);
    assert.strictEqual(17 % 5, 2);
    assert.strictEqual(2 ** 3, 8);
});

test('should use comparison operators', () => {
    assert.strictEqual(5 > 3, true);
    assert.strictEqual(5 < 3, false);
    assert.strictEqual(5 >= 5, true);
    assert.strictEqual(5 <= 4, false);
    assert.strictEqual(5 == '5', true);  // loose equality
    assert.strictEqual(5 === '5', false); // strict equality
    assert.strictEqual(5 !== '5', true);
});

test('should use logical operators', () => {
    assert.strictEqual(true && false, false);
    assert.strictEqual(true || false, true);
    assert.strictEqual(!true, false);
    assert.strictEqual(!false, true);
    assert.strictEqual(null ?? 'default', 'default');
    assert.strictEqual(0 ?? 'default', 0);
});

// ============================================
// Section 3: Conditionals
// ============================================

test('should use if-else statements', () => {
    let result;
    const value = 10;
    
    if (value > 15) {
        result = 'large';
    } else if (value > 5) {
        result = 'medium';
    } else {
        result = 'small';
    }
    
    assert.strictEqual(result, 'medium');
});

test('should use ternary operator', () => {
    const age = 20;
    const canVote = age >= 18 ? 'yes' : 'no';
    assert.strictEqual(canVote, 'yes');
});

test('should use switch statement', () => {
    const day = 'Monday';
    let message;
    
    switch (day) {
        case 'Monday':
            message = 'Start of week';
            break;
        case 'Friday':
            message = 'End of week';
            break;
        default:
            message = 'Midweek';
    }
    
    assert.strictEqual(message, 'Start of week');
});

// ============================================
// Section 4: Loops
// ============================================

test('should use for loop', () => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
        sum += i;
    }
    assert.strictEqual(sum, 15);
});

test('should use while loop', () => {
    let count = 0;
    while (count < 3) {
        count++;
    }
    assert.strictEqual(count, 3);
});

test('should use do-while loop', () => {
    let count = 0;
    do {
        count++;
    } while (count < 0);
    assert.strictEqual(count, 1);
});

// ============================================
// Section 5: Functions
// ============================================

test('should declare and call functions', () => {
    function greet(name) {
        return `Hello, ${name}!`;
    }
    assert.strictEqual(greet('World'), 'Hello, World!');
});

test('should use function expressions', () => {
    const multiply = function(a, b) {
        return a * b;
    };
    assert.strictEqual(multiply(4, 5), 20);
});

test('should use arrow functions', () => {
    const add = (a, b) => a + b;
    assert.strictEqual(add(3, 7), 10);
    
    const square = x => x * x;
    assert.strictEqual(square(5), 25);
});

test('should handle default parameters', () => {
    function greet(name = 'Guest') {
        return `Hello, ${name}!`;
    }
    assert.strictEqual(greet(), 'Hello, Guest!');
    assert.strictEqual(greet('Alice'), 'Hello, Alice!');
});

// ============================================
// Section 6: Objects Basics
// ============================================

test('should create object literals', () => {
    const person = {
        name: 'John',
        age: 30,
        greet: function() {
            return `Hi, I'm ${this.name}`;
        }
    };
    
    assert.strictEqual(person.name, 'John');
    assert.strictEqual(person.age, 30);
    assert.strictEqual(person.greet(), 'Hi, I\'m John');
});

test('should access object properties', () => {
    const obj = { key: 'value' };
    assert.strictEqual(obj.key, 'value');
    assert.strictEqual(obj['key'], 'value');
});

test('should use optional chaining', () => {
    const user = { profile: { name: 'Alice' } };
    assert.strictEqual(user?.profile?.name, 'Alice');
    assert.strictEqual(user?.address?.city, undefined);
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
// Each test verifies expected JavaScript behavior.
*/
