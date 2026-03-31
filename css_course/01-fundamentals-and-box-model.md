# Module 1: Fundamentals and Box Model

This module covers the core concepts of CSS, from how it works with HTML to the foundational box model.

## Stage 1: CSS Fundamentals

### What is CSS?
- **CSS (Cascading Style Sheets):** A stylesheet language used to describe the presentation of a document written in a markup language like HTML.
- It controls the layout, colors, fonts, and overall visual appearance of a web page.

### Linking CSS to HTML
There are three ways to add CSS to your HTML:
1.  **External CSS:** Using a `<link>` tag in the `<head>` section.
2.  **Internal CSS:** Using a `<style>` tag in the `<head>` section.
3.  **Inline CSS:** Using the `style` attribute directly on an HTML element.

### The Cascade
- The "Cascading" in CSS refers to the rules that determine which styles are applied when there's a conflict.
- It considers factors like **Importance**, **Specificity**, and **Source Order**.

## Stage 2: Selectors and Specificity

### Basic Selectors
- **Element Selector:** Targets all elements of a certain type (e.g., `p { color: red; }`).
- **Class Selector:** Targets elements with a specific class (e.g., `.my-class { ... }`).
- **ID Selector:** Targets a single element with a specific ID (e.g., `#my-id { ... }`).

### Advanced Selectors
- **Pseudo-classes:** Define a special state of an element (e.g., `:hover`, `:active`).
- **Pseudo-elements:** Style a specific part of an element (e.g., `::before`, `::after`).
- **Combinators:** Explain the relationship between selectors (e.g., descendant selector ` `, child selector `>`).

### Specificity
- A weight that is applied to a given CSS declaration, determined by the number of each selector type in the matching selector.
- ID selectors have higher specificity than class selectors, which have higher specificity than element selectors.

## Stage 3: Box Model

### The Parts of the Box
Every element in HTML is represented as a rectangular box. The box model consists of:
- **Content:** The actual text or image.
- **Padding:** Clear space around the content.
- **Border:** A border that goes around the padding and content.
- **Margin:** Clear space outside the border.

### box-sizing: border-box
- By default, the width and height you set for an element only apply to the content box.
- `box-sizing: border-box;` includes padding and border in the element's total width and height, making it much easier to manage layouts.

### Block Elements vs Inline Elements

#### Block Elements
- **Definition:** Block-level elements always start on a new line and take up the full width available (stretching out to the left and right as far as possible).
- **Behavior:** They create "blocks" that stack vertically by default.
- **Examples:** `<div>`, `<p>`, `<h1>` through `<h6>`, `<ul>`, `<li>`, `<section>`, `<header>`, `<footer>`.
- **Styling:** You can set width, height, margin, and padding on all sides, and they will be respected.

#### Inline Elements
- **Definition:** Inline elements do not start on a new line; they only take up as much width as necessary.
- **Behavior:** They flow within the content and sit alongside other inline elements on the same line.
- **Examples:** `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<code>`.
- **Styling:** Setting width and height has no effect. Vertical margins and padding may affect layout but won't push other elements away vertically.

#### Key Differences
| Feature | Block Elements | Inline Elements |
|---------|---------------|-----------------|
| Line Break | Starts on a new line | Does not start on a new line |
| Width | Takes full available width | Takes only necessary width |
| Width/Height | Can be set | Cannot be set (ignored) |
| Margin/Padding | All sides work fully | Horizontal works fully; vertical may not affect surrounding elements |
| Use Case | Layout structure, sections, paragraphs | Styling text, links, small elements within content |

#### Example
```html
<!-- Block elements stack vertically -->
<div>This is a div (block)</div>
<p>This is a paragraph (block)</p>

<!-- Inline elements sit on the same line -->
<p>This is a <span>span (inline)</span> and an <a href="#">link (inline)</a> in a paragraph.</p>
```
