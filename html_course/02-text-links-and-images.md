# Module 2: Text, Links, and Images

This module focuses on the core elements used to display text, navigate between pages, and add visual elements like images and lists.

## Stage 3: Text and Headings

### Headings (h1 to h6)
- HTML provides six levels of headings, with `<h1>` being the most important and `<h6>` the least.
- Headings help browsers, users, and search engines understand the structure of your content.

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Sub-section Title</h3>
```

### Paragraphs and Formatting
- **`<p>`:** Used to define paragraphs of text.
- **`<br>`:** Inserts a single line break without starting a new paragraph.
- **`<strong>`:** Highlights text as being of strong importance (typically bolded).
- **`<em>`:** Highlights text with emphasis (typically italicized).
- **`<span>`:** A generic inline container for phrasing content.

## Stage 4: Links and Images

### Anchor Tags (Links)
- Links are created using the `<a>` tag with the `href` attribute.
- **`href`:** Specifies the URL or destination of the link.
- **`target="_blank"`:** Opens the link in a new tab.

```html
<a href="https://example.com" target="_blank">Visit Example</a>
```

### Relative vs Absolute Paths
- **Absolute Path:** The full URL (e.g., `https://example.com/page.html`).
- **Relative Path:** A path relative to the current file (e.g., `./images/photo.jpg`).

### Adding Images
- The `<img>` tag is used to embed images.
- **`src`:** The source path to the image file.
- **`alt`:** Alternative text for accessibility and when images fail to load.

```html
<img src="logo.png" alt="Company Logo">
```

## Stage 5: Lists

### Unordered Lists (ul)
- Used for lists of items where the order doesn't matter (typically bulleted).
- Each item is defined with an `<li>` tag.

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
```

### Ordered Lists (ol)
- Used for lists of items where the order matters (typically numbered).

```html
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>
```

### Nested Lists
- You can place lists inside other list items to create complex structures.

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
      <li>Oranges</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrots</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```

You can also nest ordered lists inside unordered lists or vice versa:

```html
<ol>
  <li>Step 1: Preparation
    <ul>
      <li>Gather ingredients</li>
      <li>Preheat oven</li>
    </ul>
  </li>
  <li>Step 2: Cooking
    <ul>
      <li>Mix ingredients</li>
      <li>Bake for 30 minutes</li>
    </ul>
  </li>
</ol>
```