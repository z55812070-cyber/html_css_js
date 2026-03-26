# Module 5: Variables, Organization, and Practice Project

This final module focuses on best practices for organizing your CSS and provides a practice project to apply everything you've learned.

## Stage 10: Variables and Organization

### CSS Custom Properties (Variables)
- **CSS Variables:** Allow you to store and reuse values throughout your CSS (e.g., colors, fonts).
- Defined with `--` prefix and used with `var()`.

```css
:root {
  --main-color: #3498db;
}
.header {
  color: var(--main-color);
}
```

### Organizing Your CSS
- **BEM (Block, Element, Modifier):** A popular naming convention for CSS classes.
  - **Block:** A standalone component (e.g., `card`).
  - **Element:** A part of the block (e.g., `card__title`).
  - **Modifier:** A variation of the block or element (e.g., `card--highlighted`).
- **File Structure:** Divide your CSS into smaller, manageable files (e.g., `base.css`, `layout.css`, `components/card.css`).

## Stage 11: Practice Project

### Build a Responsive Card Component
Your task is to build a responsive card component that includes:
- **Typography:** Custom fonts and styles for the title and description.
- **Box Model:** Padding, margin, and borders to create the card's structure.
- **Layout:** Use Flexbox or CSS Grid to arrange elements within the card.
- **Responsive Design:** Media queries to adjust the card's layout on smaller screens.
- **Transitions:** Hover effects for the button or image.
- **CSS Variables:** For consistent colors and spacing.

### Example Card HTML Structure
```html
<div class="card">
  <img src="image.jpg" alt="Description" class="card__image">
  <div class="card__content">
    <h3 class="card__title">Card Title</h3>
    <p class="card__description">This is a description of the card's content.</p>
    <button class="card__button">Learn More</button>
  </div>
</div>
```

---

## What's Next?
Congratulations on completing the CSS Basics Course! You now have a solid foundation in CSS. Continue practicing by building projects and exploring advanced topics like CSS frameworks (e.g., Tailwind CSS, Bootstrap) and preprocessors (e.g., Sass).
