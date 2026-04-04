# Module 4: Browser: Document, Events, Interfaces

This module covers how JavaScript interacts with the browser to manage documents, events, and user interfaces.

## 1. Document (DOM)
- **Browser environment, specs:** The DOM, CSSOM, and the HTML standard.
- **DOM tree:** Nodes, elements, and the document structure.
- **Walking the DOM:** Navigating between nodes (parent, children, siblings).
- **Searching: getElement*, querySelector*:** Finding elements in the document.
- **Node properties: type, tag and contents:** Accessing node properties and `innerHTML`.
- **Attributes and properties:** Understanding the difference between HTML attributes and DOM properties.
- **Modifying the document:** Creating, inserting, and deleting elements.
- **Styles and classes:** Manipulating element styles with `classList` and `style`.
- **Element size and scrolling:** Accessing dimensions and scroll offsets.
- **Window sizes and scrolling:** Managing window-level sizes and scroll positions.
- **Coordinates:** Finding the relative and absolute positions of elements.

```javascript
// Browser environment - These examples run in browser console
// DOM tree - document is the root
console.log(document.nodeType); // 9 (DOCUMENT_NODE)
console.log(document.documentElement.tagName); // "HTML"

// Walking the DOM
let html = document.documentElement;
console.log(html.parentNode === document); // true
console.log(html.childNodes.length); // Number of child nodes
console.log(html.children.length); // Number of element children
console.log(html.firstChild, html.lastChild);
console.log(html.nextElementSibling); // null (html is root)

// Searching: getElement*, querySelector*
let elemById = document.getElementById("myId");
let elemsByClass = document.getElementsByClassName("myClass");
let elemsByTag = document.getElementsByTagName("div");
let firstMatch = document.querySelector(".myClass");
let allMatches = document.querySelectorAll(".myClass");

// Node properties: type, tag and contents
let div = document.createElement("div");
div.innerHTML = "<p>Hello <strong>World</strong></p>";
console.log(div.nodeType); // 1 (ELEMENT_NODE)
console.log(div.nodeName); // "DIV"
console.log(div.innerHTML); // "<p>Hello <strong>World</strong></p>"
console.log(div.textContent); // "Hello World"

// Attributes and properties
let input = document.createElement("input");
input.setAttribute("value", "test"); // HTML attribute
input.value = "changed"; // DOM property
console.log(input.getAttribute("value")); // "test"
console.log(input.value); // "changed"

// Modifying the document
let newElem = document.createElement("li");
newElem.textContent = "New item";
document.querySelector("ul").appendChild(newElem);

let textNode = document.createTextNode("Some text");
document.body.appendChild(textNode);

newElem.remove(); // Remove element

// Styles and classes
div.classList.add("active");
div.classList.remove("hidden");
div.classList.toggle("visible");
div.style.color = "red";
div.style.fontSize = "16px";

// Element size and scrolling
let rect = div.getBoundingClientRect();
console.log(rect.width, rect.height, rect.top, rect.left);
console.log(div.offsetWidth, div.offsetHeight);
console.log(div.scrollWidth, div.scrollHeight);
console.log(div.scrollTop, div.scrollLeft);

// Window sizes and scrolling
console.log(window.innerWidth, window.innerHeight);
console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
window.scrollTo(0, 100); // Scroll to position
console.log(window.scrollX, window.scrollY);

// Coordinates
let coords = div.getBoundingClientRect();
console.log("Viewport coords:", coords.left, coords.top);
let pageCoords = {
  left: coords.left + window.scrollX,
  top: coords.top + window.scrollY
};
console.log("Page coords:", pageCoords.left, pageCoords.top);
```

## 2. Introduction to Events
- **Introduction to browser events:** Handling common events like `click`, `submit`, etc.
- **Bubbling and capturing:** Understanding the phases of event propagation.
- **Event delegation:** Handling multiple events efficiently at the parent level.
- **Browser default actions:** Preventing or modifying default browser behavior.
- **Dispatching custom events:** Creating and firing your own events.

```javascript
// Introduction to browser events
let button = document.querySelector("button");
button.addEventListener("click", function(event) {
  console.log("Button clicked!", event.target);
});

// Bubbling and capturing
document.querySelector("form").addEventListener("click", function(e) {
  console.log("Form clicked (bubbles up)");
}, false); // false = bubbling phase

document.querySelector("form").addEventListener("click", function(e) {
  console.log("Form clicked (capturing)");
}, true); // true = capturing phase

// Event delegation
document.querySelector("ul").addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log("List item clicked:", e.target.textContent);
  }
});

// Browser default actions
let link = document.querySelector("a");
link.addEventListener("click", function(e) {
  e.preventDefault(); // Prevent navigation
  console.log("Navigation prevented");
});

// Dispatching custom events
let customEvent = new CustomEvent("myCustomEvent", {
  detail: { message: "Hello from custom event" }
});
document.addEventListener("myCustomEvent", function(e) {
  console.log(e.detail.message);
});
document.dispatchEvent(customEvent);
```

## 3. UI Events
- **Mouse events:** Detailed mouse interactions (`mousedown`, `mouseup`, etc.).
- **Moving the mouse: mouseover/out, mouseenter/leave:** Tracking movement.
- **Drag'n'Drop with mouse events:** Creating custom drag and drop functionality.
- **Pointer events:** Handling various pointer types (mouse, touch, pen).
- **Keyboard: keydown and keyup:** Detecting key presses and modifiers.
- **Scrolling:** Listening to scroll events and optimizing performance.

```javascript
// Mouse events
let elem = document.querySelector("#myElement");
elem.addEventListener("click", e => console.log("Click", e.clientX, e.clientY));
elem.addEventListener("dblclick", e => console.log("Double click"));
elem.addEventListener("mousedown", e => console.log("Mouse down"));
elem.addEventListener("mouseup", e => console.log("Mouse up"));
elem.addEventListener("contextmenu", e => {
  e.preventDefault();
  console.log("Right click");
});

// Moving the mouse: mouseover/out, mouseenter/leave
elem.addEventListener("mouseover", e => console.log("Mouse over", e.relatedTarget));
elem.addEventListener("mouseout", e => console.log("Mouse out", e.relatedTarget));
elem.addEventListener("mouseenter", e => console.log("Mouse entered (no bubble)"));
elem.addEventListener("mouseleave", e => console.log("Mouse left (no bubble)"));

// Drag'n'Drop with mouse events
let draggable = document.querySelector("#draggable");
let isDragging = false;

draggable.addEventListener("mousedown", e => {
  isDragging = true;
  draggable.setCapture && draggable.setCapture();
});

document.addEventListener("mousemove", e => {
  if (isDragging) {
    draggable.style.left = e.pageX - draggable.offsetWidth / 2 + "px";
    draggable.style.top = e.pageY - draggable.offsetHeight / 2 + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  draggable.releaseCapture && draggable.releaseCapture();
});

// Pointer events (unified mouse/touch/pen)
elem.addEventListener("pointerdown", e => {
  console.log("Pointer type:", e.pointerType);
  console.log("Pressure:", e.pressure);
});

// Keyboard: keydown and keyup
document.addEventListener("keydown", e => {
  console.log("Key pressed:", e.key, "Code:", e.code);
  console.log("Modifiers:", e.ctrlKey, e.shiftKey, e.altKey);
  if (e.key === "Enter") e.preventDefault();
});

document.addEventListener("keyup", e => {
  console.log("Key released:", e.key);
});

// Scrolling
window.addEventListener("scroll", () => {
  console.log("Scrolled to:", window.scrollY);
}, { passive: true }); // passive for better performance
```

## 4. Forms, controls
- **Form properties and methods:** Accessing forms and their elements.
- **Focusing: focus/blur:** Handling element focus and blur.
- **Events: change, input, cut, copy, paste:** Reacting to user input.
- **Forms: event and method submit:** Managing form submission.

```javascript
// Form properties and methods
let form = document.querySelector("form");
console.log(form.elements.length); // Number of form controls
console.log(form.elements[0].name); // First element's name
console.log(form.querySelector("[name=username]")); // Get by name

// Focusing: focus/blur
let input = document.querySelector("input");
input.focus();
input.blur();

input.addEventListener("focus", () => console.log("Focused"));
input.addEventListener("blur", () => console.log("Blurred"));

// Events: change, input, cut, copy, paste
input.addEventListener("input", e => {
  console.log("Input changed:", e.target.value);
});

input.addEventListener("change", e => {
  console.log("Change committed:", e.target.value);
});

input.addEventListener("paste", e => {
  console.log("Text pasted");
});

// Forms: event and method submit
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent actual submission
  console.log("Form submitted");
  
  // Manual form data collection
  let formData = new FormData(form);
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
  
  // Or submit programmatically
  // form.submit();
});
```

## 5. Document and resource loading
- **Page: DOMContentLoaded, load, beforeunload, unload:** Handling page lifecycle.
- **Scripts: async, defer:** Optimizing script loading.
- **Resource loading: onload and onerror:** Reacting to external asset loading.

```javascript
// Page lifecycle events
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
});

window.addEventListener("load", () => {
  console.log("All resources (images, styles) loaded");
});

window.addEventListener("beforeunload", (e) => {
  // Ask for confirmation before leaving
  e.preventDefault();
  e.returnValue = "";
});

window.addEventListener("unload", () => {
  console.log("Page unloading");
});

// Scripts: async, defer (in HTML)
// <script src="script.js"></script> - blocks parsing
// <script async src="script.js"></script> - loads async, executes immediately
// <script defer src="script.js"></script> - loads async, executes after DOM

// Resource loading: onload and onerror
let img = document.createElement("img");
img.src = "image.jpg";
img.onload = () => console.log("Image loaded");
img.onerror = () => console.log("Image failed to load");

let script = document.createElement("script");
script.src = "external.js";
script.onload = () => console.log("Script loaded");
script.onerror = () => console.log("Script failed to load");
document.head.appendChild(script);
```

## 6. Miscellaneous
- **Mutation observer:** Observing changes in the DOM.
- **Selection and Range:** Manipulating text selection and ranges.
- **Event loop: microtasks and macrotasks:** Understanding how tasks are scheduled.

```javascript
// Mutation observer
let observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log("Mutation type:", mutation.type);
    console.log("Added nodes:", mutation.addedNodes.length);
    console.log("Removed nodes:", mutation.removedNodes.length);
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true
});

// Stop observing when done
// observer.disconnect();

// Selection and Range
let selection = window.getSelection();
console.log("Selected text:", selection.toString());

if (selection.rangeCount > 0) {
  let range = selection.getRangeAt(0);
  console.log("Range start:", range.startOffset);
  console.log("Range end:", range.endOffset);
  
  // Create a range programmatically
  let newRange = document.createRange();
  newRange.selectNodeContents(document.body);
}

// Event loop: microtasks and macrotasks
console.log("Script start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise 1"));
Promise.resolve().then(() => console.log("Promise 2"));

console.log("Script end");

// Output order:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```
