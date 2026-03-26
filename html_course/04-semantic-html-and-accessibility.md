# Module 4: Semantic HTML and Accessibility

This module covers the use of semantic elements to provide meaning to your web structure and how to ensure your content is accessible to all users.

## Stage 8: Semantic HTML

### What is Semantic HTML?
- Semantic HTML elements clearly describe their meaning in a human- and machine-readable way.
- They help with SEO (Search Engine Optimization), accessibility, and developer readability.

### Key Semantic Elements
- **`<header>`:** Represents introductory content, typically a group of introductory or navigational aids.
- **`<nav>`:** Defines a set of navigation links.
- **`<main>`:** Specifies the main content of the document (should be unique).
- **`<article>`:** Represents a self-contained composition (e.g., blog post).
- **`<section>`:** Defines a thematic grouping of content.
- **`<aside>`:** Defines content aside from the main content (e.g., sidebar).
- **`<footer>`:** Represents a footer for its nearest sectioning content.

```html
<body>
  <header>
    <h1>Website Logo</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Post Title</h2>
      <p>Content...</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
</body>
```

## Stage 9: Accessibility (a11y)

### Why Accessibility Matters
- Ensuring your website is usable by as many people as possible, including those with disabilities.
- It's not just about screen readers; it also includes keyboard navigation and color contrast.

### Key Accessibility Features
- **ARIA Roles:** Accessible Rich Internet Applications (ARIA) roles provide additional meaning for screen readers.
- **Alt Text:** Always provide descriptive `alt` text for images.
- **Lang Attribute:** Set the language of your document (e.g., `<html lang="en">`).
- **Valid HTML:** Use well-structured and valid HTML to ensure consistent behavior across browsers and assistive technologies.
- **W3C Validator:** Use tools like the W3C Markup Validation Service to check your HTML for errors.

### Screen Readers
- Screen readers are software that reads out the content of a web page to users who are blind or have low vision. Semantic HTML and ARIA roles are crucial for their effectiveness.
