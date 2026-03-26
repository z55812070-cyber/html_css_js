/**
 * JavaScript Async Programming Test
 * Covers: Callbacks, Promises, Async/Await, Error Handling, Microtasks
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

async function asyncTest(description, fn) {
    try {
        await fn();
        console.log(`✓ ${description}`);
        passed++;
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(`  Error: ${error.message}`);
        failed++;
    }
}

console.log('=== Async Programming Test ===\n');

// ============================================
// Section 1: Callbacks
// ============================================

test('should understand callback pattern', () => {
    function fetchData(callback) {
        setTimeout(() => {
            callback(null, 'data');
        }, 0);
    }
    
    // Note: This test verifies the pattern, actual async execution tested below
    assert.strictEqual(typeof fetchData, 'function');
});

test('should handle callback errors', () => {
    function operationWithError(callback) {
        callback(new Error('Something went wrong'), null);
    }
    
    // Verify error is passed correctly
    operationWithError((err, result) => {
        assert.strictEqual(err.message, 'Something went wrong');
        assert.strictEqual(result, null);
    });
});

// ============================================
// Section 2: Promises
// ============================================

asyncTest('should create and resolve promises', async () => {
    const promise = new Promise((resolve) => {
        resolve('success');
    });
    
    const result = await promise;
    assert.strictEqual(result, 'success');
});

asyncTest('should reject promises', async () => {
    const promise = new Promise((resolve, reject) => {
        reject(new Error('failed'));
    });
    
    try {
        await promise;
        throw new Error('Should have rejected');
    } catch (error) {
        assert.strictEqual(error.message, 'failed');
    }
});

asyncTest('should chain promises with then', async () => {
    const result = await Promise.resolve(5)
        .then(x => x * 2)
        .then(x => x + 3);
    
    assert.strictEqual(result, 13);
});

asyncTest('should handle promise errors with catch', async () => {
    const result = await Promise.reject(new Error('test error'))
        .catch(err => err.message);
    
    assert.strictEqual(result, 'test error');
});

asyncTest('should use Promise.all', async () => {
    const results = await Promise.all([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ]);
    
    assert.deepStrictEqual(results, [1, 2, 3]);
});

asyncTest('should use Promise.race', async () => {
    const result = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
        Promise.resolve('fast')
    ]);
    
    assert.strictEqual(result, 'fast');
});

asyncTest('should use Promise.allSettled', async () => {
    const results = await Promise.allSettled([
        Promise.resolve(1),
        Promise.reject(new Error('error'))
    ]);
    
    assert.strictEqual(results[0].status, 'fulfilled');
    assert.strictEqual(results[0].value, 1);
    assert.strictEqual(results[1].status, 'rejected');
});

asyncTest('should use Promise.any', async () => {
    const result = await Promise.any([
        Promise.reject(new Error('fail1')),
        Promise.resolve('success'),
        Promise.reject(new Error('fail2'))
    ]);
    
    assert.strictEqual(result, 'success');
});

// ============================================
// Section 3: Async/Await
// ============================================

asyncTest('should use async/await syntax', async () => {
    async function getData() {
        return 'async data';
    }
    
    const result = await getData();
    assert.strictEqual(result, 'async data');
});

asyncTest('should handle async errors with try/catch', async () => {
    async function failingFunction() {
        throw new Error('async error');
    }
    
    try {
        await failingFunction();
        throw new Error('Should have thrown');
    } catch (error) {
        assert.strictEqual(error.message, 'async error');
    }
});

asyncTest('should await multiple promises sequentially', async () => {
    const delay = (ms, value) => new Promise(resolve => 
        setTimeout(() => resolve(value), ms)
    );
    
    const start = Date.now();
    const a = await delay(50, 'a');
    const b = await delay(50, 'b');
    const elapsed = Date.now() - start;
    
    assert.strictEqual(a, 'a');
    assert.strictEqual(b, 'b');
    assert.ok(elapsed >= 90, 'Should take at least 90ms (sequential)');
});

asyncTest('should await multiple promises in parallel', async () => {
    const delay = (ms, value) => new Promise(resolve => 
        setTimeout(() => resolve(value), ms)
    );
    
    const start = Date.now();
    const [a, b] = await Promise.all([
        delay(50, 'a'),
        delay(50, 'b')
    ]);
    const elapsed = Date.now() - start;
    
    assert.strictEqual(a, 'a');
    assert.strictEqual(b, 'b');
    assert.ok(elapsed < 90, 'Should take less than 90ms (parallel)');
});

// ============================================
// Section 4: Error Handling
// ============================================

asyncTest('should use try/catch/finally', async () => {
    let finallyCalled = false;
    
    try {
        throw new Error('test');
    } catch (e) {
        assert.strictEqual(e.message, 'test');
    } finally {
        finallyCalled = true;
    }
    
    assert.strictEqual(finallyCalled, true);
});

asyncTest('should create custom errors', async () => {
    class CustomError extends Error {
        constructor(message) {
            super(message);
            this.name = 'CustomError';
        }
    }
    
    try {
        throw new CustomError('custom message');
    } catch (e) {
        assert.strictEqual(e.name, 'CustomError');
        assert.strictEqual(e.message, 'custom message');
    }
});

// ============================================
// Section 5: Microtasks and Event Loop
// ============================================

asyncTest('should understand microtask queue', async () => {
    const order = [];
    
    setTimeout(() => order.push('timeout'), 0);
    
    Promise.resolve().then(() => {
        order.push('promise');
    });
    
    order.push('sync');
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10));
    
    assert.strictEqual(order[0], 'sync');
    assert.strictEqual(order[1], 'promise');
    assert.strictEqual(order[2], 'timeout');
});

asyncTest('should use queueMicrotask', async () => {
    const order = [];
    
    queueMicrotask(() => order.push('microtask'));
    order.push('sync');
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    assert.strictEqual(order[0], 'sync');
    assert.strictEqual(order[1], 'microtask');
});

// ============================================
// Section 6: Promisification
// ============================================

asyncTest('should promisify callback functions', async () => {
    function readFileCallback(path, callback) {
        setTimeout(() => {
            callback(null, `content of ${path}`);
        }, 0);
    }
    
    function promisify(fn) {
        return function(...args) {
            return new Promise((resolve, reject) => {
                fn(...args, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        };
    }
    
    const readFilePromise = promisify(readFileCallback);
    const content = await readFilePromise('/test/file.txt');
    assert.strictEqual(content, 'content of /test/file.txt');
});

// ============================================
// Section 7: Generators
// ============================================

test('should understand generator functions', () => {
    function* numberGenerator() {
        yield 1;
        yield 2;
        yield 3;
    }
    
    const gen = numberGenerator();
    assert.deepStrictEqual(gen.next(), { value: 1, done: false });
    assert.deepStrictEqual(gen.next(), { value: 2, done: false });
    assert.deepStrictEqual(gen.next(), { value: 3, done: false });
    assert.deepStrictEqual(gen.next(), { value: undefined, done: true });
});

test('should pass values to generators', () => {
    function* echo() {
        const first = yield 'first';
        const second = yield first;
        return second;
    }
    
    const gen = echo();
    gen.next();
    assert.deepStrictEqual(gen.next('hello'), { value: 'hello', done: false });
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
