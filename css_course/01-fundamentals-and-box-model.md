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
