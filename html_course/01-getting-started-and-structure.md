# Module 1: Getting Started and Structure

This module covers the initial stages of learning HTML, from understanding what it is to building the core structure of a web page.

## Stage 1: Getting Started

### What is HTML?
- **HTML (HyperText Markup Language):** The standard markup language for creating web pages.
- **Hypertext:** Text that contains links to other text.
- **Markup Language:** A way to structure and format text using tags.

### How Browsers Work
- Browsers (like Chrome, Firefox, Safari) read HTML files and render them as visual web pages.
- The process involves parsing HTML, building the DOM (Document Object Model), and applying styles.

### Your First HTML Page
- To create a web page, you need a simple text editor (like VS Code, Notepad, or TextEdit).
- Save your file with a `.html` extension (e.g., `index.html`).

## Stage 2: Document Structure

### The Essential Boilerplate
Every HTML5 document should follow this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

### Key Elements Breakdown
- **`<!DOCTYPE html>`:** Tells the browser that this is an HTML5 document.
- **`<html>`:** The root element of an HTML page.
- **`<head>`:** Contains meta-information about the page (not visible to users).
- **`<meta charset="UTF-8">`:** Specifies the character encoding for the document.
- **`<meta name="viewport">`:** Ensures the page is responsive on different devices.
- **`<title>`:** Sets the title shown in the browser tab.
- **`<body>`:** Contains the visible content of the page.
