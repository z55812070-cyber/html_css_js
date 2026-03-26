# Module 4: Responsive Design and Animations

This module covers how to create websites that look great on any device and how to add visual interest through animations and transitions.

## Stage 8: Responsive Design

### What is Responsive Design?
- The approach of building websites that adapt to different screen sizes and devices.
- Focuses on flexible layouts, flexible images, and media queries.

### Media Queries
- **Media Queries:** CSS feature that allows you to apply styles based on the device's characteristics (e.g., width, orientation).
- **Breakpoints:** The screen widths where the layout changes (e.g., `480px`, `768px`, `1024px`).

```css
@media screen and (max-width: 600px) {
  .sidebar {
    display: none;
  }
}
```

### Relative Units
- **rem:** Relative to the root font size.
- **em:** Relative to the font size of its nearest parent.
- **vw (viewport width):** 1vw is 1% of the viewport width.
- **vh (viewport height):** 1vh is 1% of the viewport height.

## Stage 9: Transitions and Animations

### Transitions
- **transition:** Allows you to change property values smoothly over a given duration.
- **Properties:** `property`, `duration`, `timing-function`, `delay`.

```css
.button {
  transition: background-color 0.3s ease-in-out;
}
.button:hover {
  background-color: blue;
}
```

### Animations
- **@keyframes:** Defines the keyframes of an animation.
- **animation:** Shorthand for applying the animation to an element.

```css
@keyframes slide-in {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
.element {
  animation: slide-in 1s forwards;
}
```

### Transforms
- **transform:** Allows you to modify the shape, size, and position of an element (e.g., `rotate`, `scale`, `translate`).
- Often used with transitions and animations for better performance.
