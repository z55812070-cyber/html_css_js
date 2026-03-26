/**
 * JavaScript Advanced Topics Test
 * Covers: Modules, Regular Expressions, Network, Storage, Proxies, etc.
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

console.log('=== Advanced Topics Test ===\n');

// ============================================
// Section 1: Regular Expressions
// ============================================

test('should match patterns with regex', () => {
    const regex = /hello/;
    assert.strictEqual(regex.test('hello world'), true);
    assert.strictEqual(regex.test('goodbye'), false);
});

test('should use character classes', () => {
    const digitRegex = /\d+/;
    assert.strictEqual(digitRegex.test('abc123'), true);
    
    const wordRegex = /\w+/;
    assert.ok(wordRegex.test('hello'));
    
    const spaceRegex = /\s+/;
    assert.ok(spaceRegex.test('hello world'));
});

test('should use quantifiers', () => {
    const zeroOrMore = /a*/;
    assert.ok(zeroOrMore.test(''));
    assert.ok(zeroOrMore.test('aaa'));
    
    const oneOrMore = /a+/;
    assert.strictEqual(oneOrMore.test(''), false);
    assert.ok(oneOrMore.test('aaa'));
    
    const exactlyThree = /a{3}/;
    assert.ok(exactlyThree.test('aaa'));
});

test('should use anchors', () => {
    const startsWith = /^hello/;
    assert.ok(startsWith.test('hello world'));
    assert.strictEqual(startsWith.test('say hello'), false);
    
    const endsWith = /world$/;
    assert.ok(endsWith.test('hello world'));
    assert.strictEqual(endsWith.test('world war'), false);
});

test('should use capturing groups', () => {
    const emailRegex = /(\w+)@(\w+\.\w+)/;
    const match = emailRegex.exec('user@example.com');
    assert.strictEqual(match[0], 'user@example.com');
    assert.strictEqual(match[1], 'user');
    assert.strictEqual(match[2], 'example.com');
});

test('should use replace with regex', () => {
    const text = 'Hello World';
    const result = text.replace(/World/, 'JavaScript');
    assert.strictEqual(result, 'Hello JavaScript');
});

test('should use global and case-insensitive flags', () => {
    const text = 'Hello hello HELLO';
    const matches = text.match(/hello/gi);
    assert.strictEqual(matches.length, 3);
});

test('should use lookaheads', () => {
    const positiveLookahead = /x(?=y)/;
    assert.ok(positiveLookahead.test('xy'));
    assert.strictEqual(positiveLookahead.test('xz'), false);
    
    const negativeLookahead = /x(?!y)/;
    assert.ok(negativeLookahead.test('xz'));
    assert.strictEqual(negativeLookahead.test('xy'), false);
});

// ============================================
// Section 2: Proxy and Reflect
// ============================================

test('should create a Proxy', () => {
    const target = { name: 'John' };
    const handler = {
        get(obj, prop) {
            return prop in obj ? obj[prop] : 'Property not found';
        }
    };
    
    const proxy = new Proxy(target, handler);
    assert.strictEqual(proxy.name, 'John');
    assert.strictEqual(proxy.age, 'Property not found');
});

test('should intercept property setting with Proxy', () => {
    const logs = [];
    const target = {};
    const handler = {
        set(obj, prop, value) {
            logs.push(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };
    
    const proxy = new Proxy(target, handler);
    proxy.name = 'Alice';
    
    assert.strictEqual(logs.length, 1);
    assert.strictEqual(logs[0], 'Setting name to Alice');
    assert.strictEqual(proxy.name, 'Alice');
});

test('should use Reflect', () => {
    const obj = { name: 'Test', value: 42 };
    
    assert.strictEqual(Reflect.get(obj, 'name'), 'Test');
    assert.strictEqual(Reflect.get(obj, 'value'), 42);
    
    Reflect.set(obj, 'newProp', 'newValue');
    assert.strictEqual(obj.newProp, 'newValue');
});

// ============================================
// Section 3: Symbols
// ============================================

test('should create unique symbols', () => {
    const sym1 = Symbol('id');
    const sym2 = Symbol('id');
    
    assert.notStrictEqual(sym1, sym2);
    assert.strictEqual(typeof sym1, 'symbol');
});

test('should use symbols as object keys', () => {
    const id = Symbol('id');
    const obj = {
        [id]: 123,
        name: 'Test'
    };
    
    assert.strictEqual(obj[id], 123);
    assert.strictEqual(Object.keys(obj).length, 1); // Symbol keys not enumerable
});

test('should use well-known symbols', () => {
    const iterable = {
        [Symbol.iterator]() {
            let step = 0;
            return {
                next() {
                    step++;
                    if (step <= 3) {
                        return { value: step, done: false };
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };
    
    const values = [...iterable];
    assert.deepStrictEqual(values, [1, 2, 3]);
});

// ============================================
// Section 4: BigInt
// ============================================

test('should create BigInt values', () => {
    const bigNum = BigInt(9007199254740991);
    assert.strictEqual(typeof bigNum, 'bigint');
    
    const literalBig = 123456789012345678901234567890n;
    assert.ok(literalBig > Number.MAX_SAFE_INTEGER);
});

test('should perform arithmetic with BigInt', () => {
    const a = 10n;
    const b = 3n;
    
    assert.strictEqual(a + b, 13n);
    assert.strictEqual(a - b, 7n);
    assert.strictEqual(a * b, 30n);
    assert.strictEqual(a / b, 3n);
    assert.strictEqual(a % b, 1n);
});

// ============================================
// Section 5: Currying
// ============================================

test('should curry functions', () => {
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
    
    function add(a, b, c) {
        return a + b + c;
    }
    
    const curriedAdd = curry(add);
    assert.strictEqual(curriedAdd(1, 2, 3), 6);
    assert.strictEqual(curriedAdd(1)(2, 3), 6);
    assert.strictEqual(curriedAdd(1)(2)(3), 6);
});

// ============================================
// Section 6: WeakRef and FinalizationRegistry
// ============================================

test('should create WeakRef', () => {
    const obj = { data: 'test' };
    const weakRef = new WeakRef(obj);
    
    const derefed = weakRef.deref();
    assert.ok(derefed);
    assert.strictEqual(derefed.data, 'test');
});

test('should use FinalizationRegistry', () => {
    let finalized = false;
    const registry = new FinalizationRegistry(() => {
        finalized = true;
    });
    
    const obj = { id: 1 };
    registry.register(obj, 'cleanup info');
    
    // Note: Finalization is non-deterministic
    // This test verifies the API exists and can be called
    assert.ok(registry instanceof FinalizationRegistry);
});

// ============================================
// Section 7: Iterators and Generators
// ============================================

test('should create custom iterators', () => {
    const range = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
            this.current = this.from;
            return this;
        },
        next() {
            if (this.current <= this.to) {
                return { value: this.current++, done: false };
            }
            return { value: undefined, done: true };
        }
    };
    
    const values = [...range];
    assert.deepStrictEqual(values, [1, 2, 3, 4, 5]);
});

test('should use yield* for delegation', () => {
    function* genA() {
        yield 1;
        yield 2;
    }
    
    function* genB() {
        yield* genA();
        yield 3;
    }
    
    const values = [...genB()];
    assert.deepStrictEqual(values, [1, 2, 3]);
});

// ============================================
// Section 8: URL API
// ============================================

test('should create URL objects', () => {
    const url = new URL('https://example.com:8080/path?query=value#hash');
    
    assert.strictEqual(url.protocol, 'https:');
    assert.strictEqual(url.hostname, 'example.com');
    assert.strictEqual(url.port, '8080');
    assert.strictEqual(url.pathname, '/path');
    assert.strictEqual(url.search, '?query=value');
    assert.strictEqual(url.hash, '#hash');
});

test('should manipulate URL search params', () => {
    const url = new URL('https://example.com?foo=bar');
    
    url.searchParams.append('baz', 'qux');
    assert.strictEqual(url.search, '?foo=bar&baz=qux');
    
    url.searchParams.delete('foo');
    assert.strictEqual(url.search, '?baz=qux');
    
    assert.strictEqual(url.searchParams.get('baz'), 'qux');
});

// ============================================
// Section 9: Encoding APIs
// ============================================

test('should use TextEncoder', () => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode('Hello');
    
    assert.ok(encoded instanceof Uint8Array);
    assert.strictEqual(encoded.length, 5);
});

test('should use TextDecoder', () => {
    const decoder = new TextDecoder();
    const encoded = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    const decoded = decoder.decode(encoded);
    
    assert.strictEqual(decoded, 'Hello');
});

// ============================================
// Section 10: Object Advanced Features
// ============================================

test('should define properties with descriptors', () => {
    const obj = {};
    
    Object.defineProperty(obj, 'readonly', {
        value: 42,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    assert.strictEqual(obj.readonly, 42);
    
    // Try to change - should fail silently or throw in strict mode
    const originalValue = obj.readonly;
    obj.readonly = 100;
    assert.strictEqual(obj.readonly, originalValue);
});

test('should freeze objects', () => {
    const obj = { name: 'Test' };
    Object.freeze(obj);
    
    assert.ok(Object.isFrozen(obj));
    
    obj.name = 'Changed';
    assert.strictEqual(obj.name, 'Test');
});

test('should seal objects', () => {
    const obj = { name: 'Test' };
    Object.seal(obj);
    
    assert.ok(Object.isSealed(obj));
    
    obj.name = 'Changed';
    assert.strictEqual(obj.name, 'Changed'); // Can modify existing
    
    obj.newProp = 'New';
    assert.strictEqual(obj.newProp, undefined); // Cannot add new
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
