# Module 5: Additional Advanced Topics

This module covers specialized JavaScript topics such as network requests, storage, and web components.

## 1. Frames and windows
- **Popups and window methods:** Working with `window.open`, `window.close`.
- **Cross-window communication:** Communicating between different windows with `postMessage`.
- **The clickjacking attack:** Protecting your site from clickjacking.

```javascript
// Popups and window methods (browser only)
let newWin = window.open("https://example.com", "_blank", "width=600,height=400");
// Close popup
// newWin.close();

// Access popup properties
console.log(newWin.innerWidth, newWin.innerHeight);

// Cross-window communication
// In parent window:
let popup = window.open("child.html");
window.addEventListener("message", (event) => {
  console.log("Received from child:", event.data);
});
popup.postMessage("Hello from parent", "https://example.com");

// In child window (child.html):
// window.opener.postMessage("Hello from child", "https://parent.com");
// window.addEventListener("message", (event) => { ... });

// The clickjacking attack - Protection via X-Frame-Options header
// Server should send: X-Frame-Options: DENY or SAMEORIGIN
```

## 2. Binary data, files
- **ArrayBuffer, binary arrays:** Managing raw binary data in JS.
- **TextDecoder and TextEncoder:** Converting binary data to and from strings.
- **Blob:** Creating and managing file-like data.
- **File and FileReader:** Working with files in the browser.

```javascript
// ArrayBuffer, binary arrays
let buffer = new ArrayBuffer(8); // 8 bytes
let view = new Uint8Array(buffer);
view[0] = 255;
view[1] = 128;
console.log(view.length); // 8

let int32View = new Int32Array(buffer);
int32View[0] = 12345;

// Typed arrays
let uint8 = new Uint8Array([1, 2, 3]);
let uint16 = new Uint16Array([1000, 2000]);
let float32 = new Float32Array([1.5, 2.5]);

// TextDecoder and TextEncoder
let encoder = new TextEncoder();
let encoded = encoder.encode("Hello"); // Uint8Array
console.log(encoded); // [72, 101, 108, 108, 111]

let decoder = new TextDecoder();
let decoded = decoder.decode(encoded); // "Hello"

// Blob
let blob = new Blob(["Hello, world!"], { type: "text/plain" });
console.log(blob.size); // 13
console.log(blob.type); // "text/plain"

// Create blob URL for download
let blobUrl = URL.createObjectURL(blob);
// <a href="{blobUrl}" download="file.txt">Download</a>
URL.revokeObjectURL(blobUrl); // Clean up

// File and FileReader (browser only)
// <input type="file" id="fileInput">
let fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  console.log(file.name, file.size, file.type);
  
  let reader = new FileReader();
  reader.onload = (event) => {
    console.log("File content:", event.target.result);
  };
  reader.readAsText(file);
  // reader.readAsDataURL(file); // For images
  // reader.readAsArrayBuffer(file); // For binary
});
```

## 3. Network requests
- **Fetch:** The modern Fetch API for making AJAX requests.
- **FormData:** Managing form data for submission.
- **Fetch: Download progress:** Tracking and displaying download progress.
- **Fetch: Abort:** Canceling pending network requests.
- **Fetch: Cross-Origin Requests:** Understanding CORS and its implications.
- **Fetch API:** Exploring advanced fetch features.
- **URL objects:** Creating and manipulating URLs easily.
- **XMLHttpRequest:** Understanding the older way to make network requests.
- **Resumable file upload:** Implementing long-running file uploads.
- **Long polling:** A classic way to handle real-time updates.
- **WebSocket:** Efficient, bi-directional communication over a single connection.
- **Server Sent Events:** Real-time server-to-client notifications.

```javascript
// Fetch - Basic GET request
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

// Fetch with POST
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Alice", age: 30 })
})
  .then(response => response.json())
  .then(data => console.log(data));

// FormData
let formData = new FormData();
formData.append("username", "john_doe");
formData.append("email", "john@example.com");

fetch("https://api.example.com/register", {
  method: "POST",
  body: formData
});

// Fetch: Download progress
fetch("https://example.com/large-file.zip")
  .then(response => {
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    
    return reader.read().then(function process({ done, value }) {
      if (done) return;
      receivedLength += value.length;
      console.log(`Progress: ${(receivedLength / contentLength * 100).toFixed(2)}%`);
      return reader.read().then(process);
    });
  });

// Fetch: Abort
let controller = new AbortController();
let signal = controller.signal;

fetch("https://api.example.com/slow-endpoint", { signal })
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request aborted");
    }
  });

// Abort after 5 seconds
setTimeout(() => controller.abort(), 5000);

// Fetch: Cross-Origin Requests (CORS)
// Server must include headers like:
// Access-Control-Allow-Origin: https://yourdomain.com
// Access-Control-Allow-Methods: GET, POST

// URL objects
let url = new URL("https://example.com:8080/path/page?query=test#hash");
console.log(url.protocol); // "https:"
console.log(url.host); // "example.com:8080"
console.log(url.pathname); // "/path/page"
console.log(url.search); // "?query=test"
console.log(url.hash); // "#hash"
console.log(url.searchParams.get("query")); // "test"
url.searchParams.append("new", "value");
console.log(url.toString());

// XMLHttpRequest (legacy)
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data", true);
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.onerror = () => console.error("Request failed");
xhr.send();

// WebSocket
let ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = () => {
  console.log("Connected");
  ws.send("Hello Server!");
};

ws.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

ws.onclose = () => {
  console.log("Disconnected");
};

// Server Sent Events (SSE)
let eventSource = new EventSource("/stream");

eventSource.onmessage = (event) => {
  console.log("SSE message:", event.data);
};

eventSource.onerror = () => {
  console.log("SSE error");
  eventSource.close();
};
```

## 4. Storing data in the browser
- **Cookies, document.cookie:** Using client-side cookies.
- **LocalStorage, sessionStorage:** Storing key-value pairs persistently or per session.
- **IndexedDB:** A powerful database for storing large amounts of structured data.

```javascript
// Cookies, document.cookie
// Set cookie
document.cookie = "username=John; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Get all cookies
console.log(document.cookie);

// Delete cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

// LocalStorage
localStorage.setItem("theme", "dark");
let theme = localStorage.getItem("theme"); // "dark"
console.log(localStorage.key(0)); // Get first key
console.log(localStorage.length); // Number of items
localStorage.removeItem("theme");
localStorage.clear();

// Store objects
let user = { name: "Alice", age: 30 };
localStorage.setItem("user", JSON.stringify(user));
let retrievedUser = JSON.parse(localStorage.getItem("user"));

// SessionStorage (cleared when tab closes)
sessionStorage.setItem("tempData", "temporary value");
let temp = sessionStorage.getItem("tempData");
sessionStorage.removeItem("tempData");

// IndexedDB
let request = indexedDB.open("MyDatabase", 1);

request.onerror = (event) => {
  console.error("Database error:", event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  let db = event.target.result;
  let objectStore = db.createObjectStore("users", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
};

request.onsuccess = (event) => {
  let db = event.target.result;
  
  // Add data
  let transaction = db.transaction(["users"], "readwrite");
  let store = transaction.objectStore("users");
  store.add({ id: 1, name: "Alice", email: "alice@example.com" });
  
  // Get data
  let getRequest = store.get(1);
  getRequest.onsuccess = () => {
    console.log("Retrieved:", getRequest.result);
  };
  
  // Query by index
  let index = store.index("name");
  let nameRequest = index.get("Alice");
  nameRequest.onsuccess = () => {
    console.log("Found by name:", nameRequest.result);
  };
};
```

## 5. Animation
- **Bezier curve:** Understanding the math behind animations.
- **CSS-animations:** Animating elements using CSS.
- **JavaScript animations:** Using JS to create complex, dynamic animations.

```javascript
// Bezier curve calculation (simplified)
function bezier(t, p0, p1, p2, p3) {
  let u = 1 - t;
  return Math.pow(u, 3) * p0 + 
         3 * Math.pow(u, 2) * t * p1 + 
         3 * u * Math.pow(t, 2) * p2 + 
         Math.pow(t, 3) * p3;
}

// CSS-animations (via JavaScript control)
let elem = document.querySelector("#animated");
elem.style.transition = "all 0.5s ease-in-out";
elem.style.transform = "translateX(100px) rotate(45deg)";

// Listen for animation end
elem.addEventListener("transitionend", () => {
  console.log("Animation complete");
});

// Keyframe animations
elem.style.animation = "slide 2s infinite alternate";

// JavaScript animations
function animate({ duration, draw, timing }) {
  let start = performance.now();
  
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    
    let progress = timing(timeFraction);
    draw(progress);
    
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// Example usage
animate({
  duration: 2000,
  timing(timeFraction) {
    return timeFraction; // Linear
    // return Math.pow(timeFraction, 2); // Ease-in
    // return 1 - Math.pow(1 - timeFraction, 2); // Ease-out
  },
  draw(progress) {
    elem.style.width = progress * 200 + "px";
  }
});

// Animation with requestAnimationFrame
let box = document.getElementById("box");
let pos = 0;

function frame() {
  if (pos >= 200) return;
  pos++;
  box.style.left = pos + "px";
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

## 6. Web components
- **From the orbital height:** An overview of web components.
- **Custom elements:** Creating your own HTML tags.
- **Shadow DOM:** Encapsulating styles and scripts within elements.
- **Template element:** Reusing HTML structures.
- **Shadow DOM slots, composition:** Composing components with slots.
- **Shadow DOM styling:** Styling components with CSS.
- **Shadow DOM and events:** Handling events within and across shadow boundaries.

```javascript
// Custom elements
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; color: blue; }
        .content { padding: 10px; }
      </style>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
  
  static get observedAttributes() {
    return ["title"];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
  }
  
  connectedCallback() {
    console.log("MyElement added to page");
  }
  
  disconnectedCallback() {
    console.log("MyElement removed from page");
  }
}

customElements.define("my-element", MyElement);

// Usage in HTML:
// <my-element title="Hello">Content here</my-element>

// Template element
let template = document.getElementById("my-template");
let clone = template.content.cloneNode(true);
document.body.appendChild(clone);

// Shadow DOM styling with :host and ::slotted
// :host - styles the custom element itself
// ::slotted(p) - styles slotted paragraph elements

// Shadow DOM and events
// Events bubble through shadow DOM by default
// Use composed: true to cross shadow boundary
let customEvent = new CustomEvent("my-event", {
  bubbles: true,
  composed: true // Allows event to cross shadow boundary
});
this.dispatchEvent(customEvent);
```

## 7. Regular expressions
- **Patterns and flags:** Basic regexp syntax and flags (g, i, m).
- **Character classes:** Matching sets of characters (\d, \w, \s).
- **Unicode: flag "u" and class \p{...}:** Advanced character matching.
- **Anchors: string start ^ and end $:** Matching at the boundaries.
- **Multiline mode of anchors ^ $, flag "m":** Matching over multiple lines.
- **Word boundary: \b:** Matching at word boundaries.
- **Escaping, special characters:** Handling special characters like `.`, `*`, `?`.
- **Sets and ranges [...]:** Custom character sets and ranges.
- **Quantifiers +, *, ? and {n}:** Matching varying amounts of characters.
- **Greedy and lazy quantifiers:** Understanding the difference in matching behavior.
- **Capturing groups:** Grouping parts of the pattern and accessing them.
- **Backreferences in pattern: \N and \k<name>:** Reusing captured groups in the same pattern.
- **Alternation (OR) |:** Matching one pattern or another.
- **Lookahead and lookbehind:** Matching based on what's before or after.
- **Catastrophic backtracking:** Avoiding performance pitfalls in regex.
- **Sticky flag "y", searching at position:** Optimized searching at a given position.
- **Methods of RegExp and String:** Using `.test()`, `.exec()`, `.match()`, `.replace()`, etc.

```javascript
// Patterns and flags
let re1 = /hello/i; // Case-insensitive
let re2 = /hello/g; // Global (find all matches)
let re3 = /hello/gi; // Combined flags
let re4 = new RegExp("hello", "gi"); // Dynamic creation

// Character classes
/\d/.test("5"); // true (digit)
/\w/.test("a"); // true (word char: a-z, A-Z, 0-9, _)
/\s/.test(" "); // true (whitespace)
/\D/.test("a"); // true (non-digit)
/\W/.test(" "); // true (non-word)
/\S/.test("a"); // true (non-whitespace)

// Unicode: flag "u" and class \p{...}
let unicodeRe = /\p{L}/u; // Any letter from any language
unicodeRe.test("α"); // true (Greek alpha)
/\p{Emoji}/u.test("😀"); // true

// Anchors: string start ^ and end $
/^hello/.test("hello world"); // true
/world$/.test("hello world"); // true
/^hello$/.test("hello"); // true
/^hello$/.test("hello world"); // false

// Multiline mode of anchors ^ $, flag "m"
let multiRe = /^start/gm;
multiRe.test("first line\nstart here\nanother line"); // true

// Word boundary: \b
/\bword\b/.test("a word here"); // true
/\bword\b/.test("awordhere"); // false

// Escaping, special characters
/\./.test("."); // true (literal dot)
/\*/.test("*"); // true (literal asterisk)
/\\/.test("\\"); // true (literal backslash)

// Sets and ranges [...]
/[aeiou]/.test("a"); // true (vowel)
/[0-9]/.test("5"); // true (digit)
/[a-zA-Z]/.test("M"); // true (letter)
/[^0-9]/.test("a"); // true (non-digit, negated set)

// Quantifiers +, *, ? and {n}
/a+/.test("aaa"); // true (one or more)
/a*/.test(""); // true (zero or more)
/a?/.test("a"); // true (zero or one)
/a{3}/.test("aaa"); // true (exactly 3)
/a{2,4}/.test("aaa"); // true (between 2 and 4)
/a{2,}/.test("aaaa"); // true (2 or more)

// Greedy and lazy quantifiers
/<.+>/.exec("<div>content</div>"); // ["<div>content</div>"] (greedy)
/<.+?>/.exec("<div>content</div>"); // ["<div>"] (lazy)

// Capturing groups
let match = /(\\d{2})-(\\d{2})-(\\d{4})/.exec("12-31-2024");
console.log(match[0]); // "12-31-2024" (full match)
console.log(match[1]); // "12" (month)
console.log(match[2]); // "31" (day)
console.log(match[3]); // "2024" (year)

// Named capturing groups
let namedMatch = /(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/.exec("12-31-2024");
console.log(namedMatch.groups.month); // "12"
console.log(namedMatch.groups.day); // "31"

// Backreferences in pattern
/(\\w+) \\1/.test("hello hello"); // true (repeated word)
/(?<word>\w+) \k<word>/.test("hello hello"); // true (named backreference)

// Alternation (OR) |
/cat|dog/.test("I have a cat"); // true
/gr(a|e)y/.test("grey"); // true

// Lookahead and lookbehind
/\d+(?=px)/.test("100px"); // true (matches 100, requires "px" after)
/(?<=\$)\d+/.test("Price: $50"); // true (matches 50, requires "$" before)
/(?!un)\w+/.test("happy"); // true (negative lookahead)

// Sticky flag "y", searching at position
let stickyRe = /world/y;
stickyRe.lastIndex = 6;
stickyRe.test("hello world"); // true

// Methods of RegExp and String
let regex = /is/gi;
regex.test("This is a test"); // true

let execResult = /(\d+)/.exec("Year 2024");
console.log(execResult); // ["2024", "2024"]

let str = "A1 B2 C3";
console.log(str.match(/\d/g)); // ["1", "2", "3"]
console.log(str.matchAll(/(\w)(\d)/g)); // Iterator with all matches

console.log(str.search(/\d/)); // 1 (index of first digit)
console.log(str.replace(/\d/g, "X")); // "AX BX CX"
console.log(str.replaceAll("A", "Z")); // "Z1 B2 C3"
console.log(str.split(" ")); // ["A1", "B2", "C3"]
```
