/**
 * Challenge: Debounce Function
 * Level: Intermediate
 * 
 * Implement a debounce function that delays invoking the provided function
 * until after `wait` milliseconds have elapsed since the last time the
 * debounced function was invoked.
 * 
 * Example:
 * const debouncedFn = debounce(() => console.log('executed'), 1000);
 * debouncedFn(); // Will wait 1000ms before executing
 * debouncedFn(); // Resets the timer
 * debouncedFn(); // Resets the timer again
 * // After 1000ms from the last call, the function executes once
 */

const assert = require('assert');

// ============================================
// TODO: Implement your solution here
// ============================================

function debounce(func, wait) {
    let timeout;
    
    return function(...args) {
        const context = this;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// ============================================
// Test Cases
// ============================================

console.log('=== Debounce Challenge Tests ===\n');

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

test('should return a function', () => {
    const debounced = debounce(() => {}, 100);
    assert.strictEqual(typeof debounced, 'function');
});

test('should delay function execution', (done) => {
    return new Promise((resolve) => {
        let executed = false;
        const debounced = debounce(() => {
            executed = true;
            resolve();
        }, 50);
        
        debounced();
        
        assert.strictEqual(executed, false, 'Should not execute immediately');
        
        setTimeout(() => {
            assert.strictEqual(executed, true, 'Should execute after delay');
        }, 100);
    });
});

test('should cancel previous calls', (done) => {
    return new Promise((resolve) => {
        let callCount = 0;
        const debounced = debounce(() => {
            callCount++;
        }, 50);
        
        debounced();
        debounced();
        debounced();
        
        setTimeout(() => {
            assert.strictEqual(callCount, 1, 'Should only execute once');
            resolve();
        }, 100);
    });
});

test('should preserve this context', (done) => {
    return new Promise((resolve) => {
        const obj = {
            value: 42,
            method: null
        };
        
        obj.method = debounce(function() {
            assert.strictEqual(this.value, 42, 'Should preserve this context');
            resolve();
        }, 50);
        
        obj.method();
        
        setTimeout(() => {}, 100);
    });
});

test('should pass arguments to the function', (done) => {
    return new Promise((resolve) => {
        let receivedArgs = null;
        const debounced = debounce((...args) => {
            receivedArgs = args;
            resolve();
        }, 50);
        
        debounced(1, 2, 3);
        
        setTimeout(() => {
            assert.deepStrictEqual(receivedArgs, [1, 2, 3]);
        }, 100);
    });
});

test('should reset timer on each call', (done) => {
    return new Promise((resolve) => {
        let callCount = 0;
        const debounced = debounce(() => {
            callCount++;
        }, 30);
        
        debounced();
        
        setTimeout(() => {
            debounced();
        }, 20);
        
        setTimeout(() => {
            debounced();
        }, 40);
        
        setTimeout(() => {
            assert.strictEqual(callCount, 0, 'Should not have executed yet');
        }, 60);
        
        setTimeout(() => {
            assert.strictEqual(callCount, 1, 'Should execute once after final call');
            resolve();
        }, 100);
    });
});

// ============================================
// Summary
// ============================================

console.log('\nNote: Some tests are async and may take a moment to complete.\n');
console.log('=== Summary ===');
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

function debounce(func, wait) {
    let timeout;
    
    return function(...args) {
        const context = this;
        
        clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
*/
