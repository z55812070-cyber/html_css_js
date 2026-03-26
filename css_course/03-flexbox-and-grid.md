# Module 3: Flexbox and CSS Grid

This module covers the two most powerful layout systems in modern CSS: Flexbox for one-dimensional layouts and CSS Grid for two-dimensional layouts.

## Stage 6: Flexbox

### Flexbox Fundamentals
- **Flex Container:** The parent element that defines the flex context (using `display: flex;`).
- **Flex Items:** The children of the flex container.

### Container Properties
- **flex-direction:** Determines the direction of items (`row`, `column`, etc.).
- **justify-content:** Aligns items along the main axis (e.g., `flex-start`, `center`, `space-between`).
- **align-items:** Aligns items along the cross axis (e.g., `stretch`, `center`, `flex-start`).
- **flex-wrap:** Allows items to wrap onto multiple lines (`nowrap`, `wrap`).

### Item Properties
- **flex-grow:** Specifies how much an item should grow relative to others.
- **flex-shrink:** Specifies how much an item should shrink relative to others.
- **flex-basis:** Sets the initial main size of a flex item.

## Stage 7: CSS Grid

### Grid Fundamentals
- **Grid Container:** The parent element that defines the grid context (using `display: grid;`).
- **Grid Items:** The children of the grid container.

### Container Properties
- **grid-template-columns:** Defines the columns of the grid (e.g., `repeat(3, 1fr)`).
- **grid-template-rows:** Defines the rows of the grid.
- **gap:** Sets the spacing between rows and columns.
- **justify-items / align-items:** Aligns items within their grid cells.

### Item Properties
- **grid-column / grid-row:** Specifies the starting and ending lines for an item.
- **grid-area:** Can be used to name a grid area or as a shorthand for grid-row-start / grid-column-start / grid-row-end / grid-column-end.

### Why use Grid vs Flexbox?
- **Flexbox:** Best for one-dimensional layouts (a single row OR column).
- **CSS Grid:** Best for two-dimensional layouts (rows AND columns together).
