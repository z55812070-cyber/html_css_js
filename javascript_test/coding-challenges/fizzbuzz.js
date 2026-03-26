/**
 * Challenge: FizzBuzz
 * Level: Beginner
 * 
 * Write a function that prints numbers from 1 to n.
 * - For multiples of 3, print "Fizz" instead of the number
 * - For multiples of 5, print "Buzz" instead of the number
 * - For multiples of both 3 and 5, print "FizzBuzz"
 * 
 * Example:
 * fizzBuzz(15) should return:
 * [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
 */

const assert = require('assert');

// ============================================
// TODO: Implement your solution here
// ============================================

function fizzBuzz(n) {
    // Your code here
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push('FizzBuzz');
        } else if (i % 3 === 0) {
            result.push('Fizz');
        } else if (i % 5 === 0) {
            result.push('Buzz');
        } else {
            result.push(i);
        }
    }
    
    return result;
}

// ============================================
// Test Cases
// ============================================

console.log('=== FizzBuzz Challenge Tests ===\n');

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

test('should handle n = 1', () => {
    assert.deepStrictEqual(fizzBuzz(1), [1]);
});

test('should handle n = 5', () => {
    assert.deepStrictEqual(fizzBuzz(5), [1, 2, 'Fizz', 4, 'Buzz']);
});

test('should handle n = 15', () => {
    const expected = [
        1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz',
        11, 'Fizz', 13, 14, 'FizzBuzz'
    ];
    assert.deepStrictEqual(fizzBuzz(15), expected);
});

test('should correctly identify multiples of 3', () => {
    const result = fizzBuzz(9);
    assert.strictEqual(result[2], 'Fizz');
    assert.strictEqual(result[5], 'Fizz');
    assert.strictEqual(result[8], 'Fizz');
});

test('should correctly identify multiples of 5', () => {
    const result = fizzBuzz(10);
    assert.strictEqual(result[4], 'Buzz');
    assert.strictEqual(result[9], 'Buzz');
});

test('should correctly identify multiples of 15', () => {
    const result = fizzBuzz(30);
    assert.strictEqual(result[14], 'FizzBuzz');
    assert.strictEqual(result[29], 'FizzBuzz');
});

test('should return array type', () => {
    assert.ok(Array.isArray(fizzBuzz(10)));
});

// ============================================
// Summary
// ============================================

console.log('\n=== Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
    console.log('\n🎉 All tests passed! Challenge completed!');
} else {
    console.log(`\n⚠️  ${failed} test(s) failed. Keep trying!`);
}

/*
// ============================================
// SOLUTION (Commented out - uncomment to see)
// ============================================

function fizzBuzz(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push('FizzBuzz');
        } else if (i % 3 === 0) {
            result.push('Fizz');
        } else if (i % 5 === 0) {
            result.push('Buzz');
        } else {
            result.push(i);
        }
    }
    
    return result;
}
*/
