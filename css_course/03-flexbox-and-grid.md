# Module 3: Flexbox and CSS Grid

This module covers the two most powerful layout systems in modern CSS: Flexbox for one-dimensional layouts and CSS Grid for two-dimensional layouts.

> 💡 **Interactive Examples:** Open `module3-examples.html` in your browser to see all concepts in action with live demonstrations!

## Stage 6: Flexbox

### Flexbox Fundamentals
- **Flex Container:** The parent element that defines the flex context (using `display: flex;`).
- **Flex Items:** The children of the flex container.

#### Example: Basic Flexbox Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Fundamentals</title>
    <style>
        .flex-container {
            display: flex;
            background-color: #f0f0f0;
            padding: 20px;
            border: 2px solid #333;
        }
        
        .flex-item {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            margin: 10px;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
    </div>
</body>
</html>
```

### Container Properties

#### Example: flex-direction

```css
/* Row (default) - items arranged horizontally */
.container-row {
    display: flex;
    flex-direction: row;
}

/* Column - items arranged vertically */
.container-column {
    display: flex;
    flex-direction: column;
}

/* Row Reverse - items arranged horizontally in reverse order */
.container-row-reverse {
    display: flex;
    flex-direction: row-reverse;
}

/* Column Reverse - items arranged vertically in reverse order */
.container-column-reverse {
    display: flex;
    flex-direction: column-reverse;
}
```

#### Example: justify-content

```css
/* Flex Start - items aligned at the start */
.justify-start {
    display: flex;
    justify-content: flex-start;
}

/* Center - items centered along the main axis */
.justify-center {
    display: flex;
    justify-content: center;
}

/* Flex End - items aligned at the end */
.justify-end {
    display: flex;
    justify-content: flex-end;
}

/* Space Between - items evenly distributed with first at start and last at end */
.justify-space-between {
    display: flex;
    justify-content: space-between;
}

/* Space Around - items evenly distributed with equal space around them */
.justify-space-around {
    display: flex;
    justify-content: space-around;
}

/* Space Evenly - items evenly distributed with equal space between them */
.justify-space-evenly {
    display: flex;
    justify-content: space-evenly;
}
```

#### Example: align-items

```css
/* Stretch (default) - items stretch to fill container */
.align-stretch {
    display: flex;
    align-items: stretch;
    height: 200px;
}

/* Center - items centered along cross axis */
.align-center {
    display: flex;
    align-items: center;
    height: 200px;
}

/* Flex Start - items aligned at cross axis start */
.align-start {
    display: flex;
    align-items: flex-start;
    height: 200px;
}

/* Flex End - items aligned at cross axis end */
.align-end {
    display: flex;
    align-items: flex-end;
    height: 200px;
}

/* Baseline - items aligned along their baselines */
.align-baseline {
    display: flex;
    align-items: baseline;
}
```

#### Example: flex-wrap

```css
/* No Wrap (default) - items stay on one line */
.no-wrap {
    display: flex;
    flex-wrap: nowrap;
}

/* Wrap - items wrap onto multiple lines */
.wrap {
    display: flex;
    flex-wrap: wrap;
}

/* Wrap Reverse - items wrap in reverse order */
.wrap-reverse {
    display: flex;
    flex-wrap: wrap-reverse;
}
```

### Item Properties

#### Example: flex-grow, flex-shrink, flex-basis

```css
/* Flex Grow - item grows to fill available space */
.flex-grow-1 {
    flex-grow: 1; /* Grows proportionally */
}

.flex-grow-2 {
    flex-grow: 2; /* Grows twice as much as flex-grow: 1 */
}

/* Flex Shrink - item shrinks when space is limited */
.flex-shrink-0 {
    flex-shrink: 0; /* Won't shrink */
}

.flex-shrink-1 {
    flex-shrink: 1; /* Shrinks normally */
}

/* Flex Basis - initial size before growing/shrinking */
.flex-basis-200px {
    flex-basis: 200px;
}

/* Shorthand: flex: grow shrink basis */
.item-full {
    flex: 1 1 auto; /* Full flexibility */
}

.item-fixed {
    flex: 0 0 200px; /* Fixed at 200px, no grow/shrink */
}
```

#### Complete Example: Navigation Bar with Flexbox

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Navigation</title>
    <style>
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            padding: 15px 30px;
        }
        
        .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        
        .nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            padding: 10px 15px;
            transition: background-color 0.3s;
        }
        
        .nav-links a:hover {
            background-color: #555;
            border-radius: 5px;
        }
        
        .search-box {
            display: flex;
            gap: 10px;
        }
        
        .search-box input {
            padding: 8px;
            border: none;
            border-radius: 4px;
        }
        
        .search-box button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">MyWebsite</div>
        <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <div class="search-box">
            <input type="text" placeholder="Search...">
            <button>Go</button>
        </div>
    </nav>
</body>
</html>
```

## Stage 7: CSS Grid

### Grid Fundamentals
- **Grid Container:** The parent element that defines the grid context (using `display: grid;`).
- **Grid Items:** The children of the grid container.

#### Example: Basic Grid Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Fundamentals</title>
    <style>
        .grid-container {
            display: grid;
            background-color: #f0f0f0;
            padding: 20px;
            border: 2px solid #333;
        }
        
        .grid-item {
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
    </div>
</body>
</html>
```

### Container Properties

#### Example: grid-template-columns

```css
/* Fixed width columns */
.fixed-columns {
    display: grid;
    grid-template-columns: 200px 200px 200px;
}

/* Fractional units (fr) - flexible distribution */
.fractional-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
}

/* Mixed units */
.mixed-columns {
    display: grid;
    grid-template-columns: 200px 1fr 2fr; /* First fixed, others flexible */
}

/* Repeat notation */
.repeat-columns {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Four equal columns */
}

/* Auto-fit and auto-fill for responsive grids */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

#### Example: grid-template-rows

```css
/* Fixed height rows */
.fixed-rows {
    display: grid;
    grid-template-rows: 100px 150px 100px;
}

/* Fractional units for rows */
.fractional-rows {
    display: grid;
    grid-template-rows: 1fr 2fr 1fr; /* Middle row is twice as tall */
}

/* Auto rows */
.auto-rows {
    display: grid;
    grid-template-rows: auto 100px auto;
}
```

#### Example: gap

```css
/* Uniform gap */
.uniform-gap {
    display: grid;
    gap: 20px; /* Same gap for rows and columns */
}

/* Separate row and column gaps */
.separate-gaps {
    display: grid;
    row-gap: 15px;
    column-gap: 25px;
}

/* Shorthand: row-gap column-gap */
.shorthand-gap {
    display: grid;
    gap: 15px 25px; /* row-gap: 15px, column-gap: 25px */
}
```

#### Example: justify-items and align-items

```css
/* Justify Items (horizontal alignment within cells) */
.justify-items-start {
    display: grid;
    justify-items: start;
}

.justify-items-center {
    display: grid;
    justify-items: center;
}

.justify-items-end {
    display: grid;
    justify-items: end;
}

.justify-items-stretch {
    display: grid;
    justify-items: stretch; /* Default */
}

/* Align Items (vertical alignment within cells) */
.align-items-start {
    display: grid;
    align-items: start;
}

.align-items-center {
    display: grid;
    align-items: center;
}

.align-items-end {
    display: grid;
    align-items: end;
}

.align-items-stretch {
    display: grid;
    align-items: stretch; /* Default */
}
```

### Item Properties

#### Example: grid-column and grid-row

```css
/* Span multiple columns */
.span-two-columns {
    grid-column: span 2;
}

/* Specific start and end lines */
.column-1-to-3 {
    grid-column: 1 / 3; /* Starts at line 1, ends at line 3 */
}

/* Using -1 to indicate the last line */
.full-width {
    grid-column: 1 / -1; /* Spans entire width */
}

/* Span multiple rows */
.span-two-rows {
    grid-row: span 2;
}

/* Specific row placement */
.row-2-to-4 {
    grid-row: 2 / 4;
}

/* Combined column and row */
.large-item {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
}
```

#### Example: grid-area

```css
/* Named grid areas approach */
.container-with-names {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.main {
    grid-area: main;
}

.footer {
    grid-area: footer;
}

/* Shorthand: row-start / column-start / row-end / column-end */
.custom-area {
    grid-area: 2 / 2 / 4 / 4; /* Starts at row 2, col 2; ends at row 4, col 4 */
}
```

#### Complete Example: Page Layout with CSS Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            min-height: 100vh;
        }
        
        .grid-layout {
            display: grid;
            grid-template-areas: 
                "header header header"
                "nav main aside"
                "footer footer footer";
            grid-template-columns: 200px 1fr 250px;
            grid-template-rows: auto 1fr auto;
            gap: 20px;
            padding: 20px;
            min-height: 100vh;
        }
        
        .header {
            grid-area: header;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px;
        }
        
        .nav {
            grid-area: nav;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 8px;
        }
        
        .nav ul {
            list-style: none;
        }
        
        .nav li {
            margin-bottom: 15px;
        }
        
        .nav a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 10px;
            background-color: #34495e;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav a:hover {
            background-color: #4a6785;
        }
        
        .main {
            grid-area: main;
            background-color: #ecf0f1;
            padding: 30px;
            border-radius: 8px;
        }
        
        .content-card {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .aside {
            grid-area: aside;
            background-color: #3498db;
            color: white;
            padding: 20px;
            border-radius: 8px;
        }
        
        .widget {
            background: rgba(255,255,255,0.2);
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        
        .footer {
            grid-area: footer;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
        }
        
        /* Responsive Design */
        @media (max-width: 900px) {
            .grid-layout {
                grid-template-areas: 
                    "header header"
                    "nav main"
                    "footer footer";
                grid-template-columns: 200px 1fr;
            }
            
            .aside {
                display: none;
            }
        }
        
        @media (max-width: 600px) {
            .grid-layout {
                grid-template-areas: 
                    "header"
                    "nav"
                    "main"
                    "footer";
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="grid-layout">
        <header class="header">
            <h1>My Website</h1>
            <p>Powered by CSS Grid</p>
        </header>
        
        <nav class="nav">
            <h3>Navigation</h3>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        
        <main class="main">
            <div class="content-card">
                <h2>Welcome!</h2>
                <p>This is a complete page layout using CSS Grid. Notice how the layout responds to different screen sizes.</p>
            </div>
            
            <div class="content-card">
                <h3>Article Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            
            <div class="content-card">
                <h3>Another Article</h3>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </main>
        
        <aside class="aside">
            <h3>Sidebar</h3>
            <div class="widget">
                <h4>Widget 1</h4>
                <p>Some sidebar content here.</p>
            </div>
            <div class="widget">
                <h4>Widget 2</h4>
                <p>More useful information.</p>
            </div>
            <div class="widget">
                <h4>Widget 3</h4>
                <p>Even more content.</p>
            </div>
        </aside>
        
        <footer class="footer">
            <p>&copy; 2024 My Website. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
```

### Why use Grid vs Flexbox?

| Feature | Flexbox | CSS Grid |
|---------|---------|----------|
| **Dimensions** | One-dimensional (row OR column) | Two-dimensional (row AND column) |
| **Best For** | Navigation bars, card lists, centering content | Page layouts, complex grids, magazine-style designs |
| **Alignment** | Excellent for aligning items in one direction | Superior control over both rows and columns |
| **Content Flow** | Content-driven layout | Layout-driven content placement |
| **Browser Support** | Excellent | Excellent (IE10+ with some limitations) |

#### When to Use Each:

**Use Flexbox when:**
- You need to align items in a single row or column
- Building navigation bars or toolbars
- Creating card layouts that wrap
- Centering content horizontally and vertically
- Distributing space among items

**Use CSS Grid when:**
- Creating overall page layouts
- Building complex dashboard interfaces
- Designing magazine or newspaper-style layouts
- You need precise control over both rows and columns
- Creating responsive image galleries

#### Example: Combining Flexbox and Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox + Grid</title>
    <style>
        .page-layout {
            display: grid;
            grid-template-columns: 250px 1fr 300px;
            grid-template-rows: auto 1fr auto;
            gap: 20px;
            min-height: 100vh;
            padding: 20px;
        }
        
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: flex-start;
        }
        
        .card {
            flex: 1 1 200px; /* Grow, shrink, basis */
            max-width: 300px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .card-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .btn-primary {
            background-color: #4CAF50;
            color: white;
        }
        
        .btn-secondary {
            background-color: #f0f0f0;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="page-layout">
        <!-- Sidebar (Grid Item) -->
        <aside>
            <h3>Sidebar</h3>
            <p>Navigation menu here</p>
        </aside>
        
        <!-- Main Content (Grid Item with Flexbox cards) -->
        <main>
            <h2>Card Gallery</h2>
            <div class="card-container">
                <div class="card">
                    <div class="card-header">
                        <h4>Card 1</h4>
                        <span>★</span>
                    </div>
                    <p>Card content goes here...</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Save</button>
                        <button class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4>Card 2</h4>
                        <span>★</span>
                    </div>
                    <p>More card content...</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Save</button>
                        <button class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h4>Card 3</h4>
                        <span>★</span>
                    </div>
                    <p>Even more content...</p>
                    <div class="card-actions">
                        <button class="btn btn-primary">Save</button>
                        <button class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </main>
        
        <!-- Right Sidebar (Grid Item) -->
        <aside>
            <h3>Widgets</h3>
            <p>Additional content</p>
        </aside>
    </div>
</body>
</html>
```

---

## Practice Exercises

### Exercise 1: Flexbox Navigation Bar
Create a responsive navigation bar using Flexbox with:
- Logo on the left
- Navigation links in the center
- Search box and user profile on the right
- Mobile-friendly hamburger menu

### Exercise 2: CSS Grid Photo Gallery
Build a photo gallery using CSS Grid with:
- Different sized images (some span 2 columns, some 2 rows)
- Responsive design that adjusts columns based on screen size
- Hover effects on images

### Exercise 3: Dashboard Layout
Create a dashboard layout combining both Flexbox and Grid:
- Grid for the overall page structure (header, sidebar, main, footer)
- Flexbox for components within each section (cards, charts, widgets)
- Make it fully responsive

---

> 📁 **Files Created:** 
> - `module3-examples.html` - Complete interactive examples
> - `module3-examples.css` - Styling for all examples
> 
> Open these files in your browser to experiment with the code!
