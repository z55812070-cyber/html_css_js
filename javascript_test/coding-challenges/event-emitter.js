/**
 * Challenge: Event Emitter
 * Level: Advanced
 * 
 * Implement an EventEmitter class that allows subscribing to events,
 * unsubscribing from events, and emitting events with optional data.
 * 
 * Methods to implement:
 * - on(event, callback): Subscribe to an event
 * - off(event, callback): Unsubscribe from an event
 * - emit(event, ...args): Emit an event with arguments
 * - once(event, callback): Subscribe to an event that only fires once
 * 
 * Example:
 * const emitter = new EventEmitter();
 * emitter.on('greet', (name) => console.log(`Hello, ${name}!`));
 * emitter.emit('greet', 'World'); // Logs: Hello, World!
 */

const assert = require('assert');

// ============================================
// TODO: Implement your solution here
// ============================================

class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }
    
    off(event, callback) {
        if (!this.events[event]) {
            return this;
        }
        this.events[event] = this.events[event].filter(cb => cb !== callback);
        return this;
    }
    
    emit(event, ...args) {
        if (!this.events[event]) {
            return false;
        }
        this.events[event].forEach(callback => {
            callback(...args);
        });
        return true;
    }
    
    once(event, callback) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            callback(...args);
        };
        this.on(event, wrapper);
        return this;
    }
}

// ============================================
// Test Cases
// ============================================

console.log('=== Event Emitter Challenge Tests ===\n');

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

test('should create an EventEmitter instance', () => {
    const emitter = new EventEmitter();
    assert.ok(emitter instanceof EventEmitter);
});

test('should subscribe to events with on()', () => {
    const emitter = new EventEmitter();
    let called = false;
    
    emitter.on('test', () => {
        called = true;
    });
    
    emitter.emit('test');
    assert.strictEqual(called, true);
});

test('should pass arguments to event callbacks', () => {
    const emitter = new EventEmitter();
    let receivedArgs = null;
    
    emitter.on('data', (...args) => {
        receivedArgs = args;
    });
    
    emitter.emit('data', 1, 2, 3);
    assert.deepStrictEqual(receivedArgs, [1, 2, 3]);
});

test('should unsubscribe from events with off()', () => {
    const emitter = new EventEmitter();
    let callCount = 0;
    
    function handler() {
        callCount++;
    }
    
    emitter.on('test', handler);
    emitter.emit('test');
    assert.strictEqual(callCount, 1);
    
    emitter.off('test', handler);
    emitter.emit('test');
    assert.strictEqual(callCount, 1); // Should not increase
});

test('should support once() for one-time listeners', () => {
    const emitter = new EventEmitter();
    let callCount = 0;
    
    emitter.once('test', () => {
        callCount++;
    });
    
    emitter.emit('test');
    assert.strictEqual(callCount, 1);
    
    emitter.emit('test');
    assert.strictEqual(callCount, 1); // Should not increase
});

test('should support multiple subscribers to the same event', () => {
    const emitter = new EventEmitter();
    let count1 = 0;
    let count2 = 0;
    
    emitter.on('test', () => count1++);
    emitter.on('test', () => count2++);
    
    emitter.emit('test');
    assert.strictEqual(count1, 1);
    assert.strictEqual(count2, 1);
});

test('should handle different events independently', () => {
    const emitter = new EventEmitter();
    let event1Called = false;
    let event2Called = false;
    
    emitter.on('event1', () => { event1Called = true; });
    emitter.on('event2', () => { event2Called = true; });
    
    emitter.emit('event1');
    assert.strictEqual(event1Called, true);
    assert.strictEqual(event2Called, false);
    
    emitter.emit('event2');
    assert.strictEqual(event2Called, true);
});

test('should return this for method chaining', () => {
    const emitter = new EventEmitter();
    
    const result = emitter.on('test', () => {});
    assert.strictEqual(result, emitter);
    
    const result2 = emitter.off('test', () => {});
    assert.strictEqual(result2, emitter);
    
    const result3 = emitter.once('test', () => {});
    assert.strictEqual(result3, emitter);
});

test('should handle emit with no subscribers gracefully', () => {
    const emitter = new EventEmitter();
    const result = emitter.emit('nonexistent');
    assert.strictEqual(result, false);
});

test('should allow removing specific callback among many', () => {
    const emitter = new EventEmitter();
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    
    function handler1() { count1++; }
    function handler2() { count2++; }
    function handler3() { count3++; }
    
    emitter.on('test', handler1);
    emitter.on('test', handler2);
    emitter.on('test', handler3);
    
    emitter.off('test', handler2);
    
    emitter.emit('test');
    assert.strictEqual(count1, 1);
    assert.strictEqual(count2, 0);
    assert.strictEqual(count3, 1);
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

class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return this;
    }
    
    off(event, callback) {
        if (!this.events[event]) {
            return this;
        }
        this.events[event] = this.events[event].filter(cb => cb !== callback);
        return this;
    }
    
    emit(event, ...args) {
        if (!this.events[event]) {
            return false;
        }
        this.events[event].forEach(callback => {
            callback(...args);
        });
        return true;
    }
    
    once(event, callback) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            callback(...args);
        };
        this.on(event, wrapper);
        return this;
    }
}
*/
