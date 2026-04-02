# Module 2: Typography, Color, and Positioning

This module covers the core concepts used to style text and control the layout of elements on a page.

## Stage 4: Typography and Color

### Typography
- **font-family:** Specifies the font for an element.
- **font-size:** Sets the size of the font (e.g., `px`, `rem`, `em`).
- **font-weight:** Sets the thickness of the font (e.g., `normal`, `bold`).
- **line-height:** Sets the height of a line of text.
- **text-align:** Aligns text within its container (e.g., `left`, `center`, `right`).

### Color and Backgrounds
- **color:** Sets the color of text.
- **background-color:** Sets the background color of an element.
- **background-image:** Sets an image as the background.
- **Color Values:** You can use color names (e.g., `red`), hex codes (e.g., `#ff0000`), or RGB/HSL values.

## Stage 5: Display and Positioning

### The display Property
- **block:** Takes up the full width available and starts on a new line.
- **inline:** Takes up only as much width as necessary and does not start on a new line.
- **inline-block:** Like inline elements but can have set width and height.

### Positioning
- **static:** The default value; follows the normal document flow.
- **relative:** Positioned relative to its normal position.
- **absolute:** Positioned relative to its nearest positioned ancestor.
- **fixed:** Positioned relative to the browser window (stays in place when scrolling).
- **sticky:** Toggles between relative and fixed positioning depending on the scroll position.

### z-index
- Controls the stack order of elements (which element is in front of another).
- Only works on positioned elements (not `static`).

### HTML Positioning Example

The following example demonstrates the different positioning values:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Positioning Example</title>
    <style>
        .container {
            position: relative;
            width: 400px;
            height: 300px;
            border: 2px solid #333;
            margin: 20px;
            background-color: #f0f0f0;
        }

        .static-box {
            position: static;
            background-color: lightblue;
            padding: 10px;
            margin: 5px;
        }

        .relative-box {
            position: relative;
            top: 20px;
            left: 30px;
            background-color: lightgreen;
            padding: 10px;
            margin: 5px;
        }

        .absolute-box {
            position: absolute;
            top: 50px;
            right: 30px;
            background-color: lightcoral;
            padding: 10px;
        }

        .fixed-box {
            position: fixed;
            bottom: 10px;
            right: 10px;
            background-color: gold;
            padding: 10px;
        }

        .sticky-box {
            position: sticky;
            top: 0;
            background-color: lavender;
            padding: 10px;
        }

        .z-index-example {
            position: absolute;
            width: 100px;
            height: 100px;
        }

        .back {
            background-color: rgba(255, 0, 0, 0.5);
            top: 80px;
            left: 80px;
            z-index: 1;
        }

        .front {
            background-color: rgba(0, 0, 255, 0.5);
            top: 100px;
            left: 100px;
            z-index: 2;
        }
    </style>
</head>
<body>
    <h1>CSS Positioning Examples</h1>

    <div class="container">
        <p class="static-box">Static (default position)</p>
        <p class="relative-box">Relative (offset from normal position)</p>
        <p class="absolute-box">Absolute (relative to container)</p>
    </div>

    <div style="height: 200vh;">
        <p class="sticky-box">Sticky (sticks to top when scrolling)</p>
        <p>Scroll down to see the sticky box in action...</p>
    </div>

    <div class="container">
        <div class="z-index-example back"></div>
        <div class="z-index-example front"></div>
    </div>
    <p class="fixed-box">Fixed (stays in viewport)</p>
</body>
</html>
```
