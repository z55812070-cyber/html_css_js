# Module 5: Additional Advanced Topics

This module covers specialized JavaScript topics such as network requests, storage, and web components.

## 1. Frames and windows
- **Popups and window methods:** Working with `window.open`, `window.close`.
- **Cross-window communication:** Communicating between different windows with `postMessage`.
- **The clickjacking attack:** Protecting your site from clickjacking.

## 2. Binary data, files
- **ArrayBuffer, binary arrays:** Managing raw binary data in JS.
- **TextDecoder and TextEncoder:** Converting binary data to and from strings.
- **Blob:** Creating and managing file-like data.
- **File and FileReader:** Working with files in the browser.

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

## 4. Storing data in the browser
- **Cookies, document.cookie:** Using client-side cookies.
- **LocalStorage, sessionStorage:** Storing key-value pairs persistently or per session.
- **IndexedDB:** A powerful database for storing large amounts of structured data.

## 5. Animation
- **Bezier curve:** Understanding the math behind animations.
- **CSS-animations:** Animating elements using CSS.
- **JavaScript animations:** Using JS to create complex, dynamic animations.

## 6. Web components
- **From the orbital height:** An overview of web components.
- **Custom elements:** Creating your own HTML tags.
- **Shadow DOM:** Encapsulating styles and scripts within elements.
- **Template element:** Reusing HTML structures.
- **Shadow DOM slots, composition:** Composing components with slots.
- **Shadow DOM styling:** Styling components with CSS.
- **Shadow DOM and events:** Handling events within and across shadow boundaries.

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
