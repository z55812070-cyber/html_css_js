# Module 3: Tables and Forms

This module covers how to represent structured data using tables and how to gather user input through forms.

## Stage 6: Tables

### Basic Table Structure
Tables are created using the `<table>` tag, with several nested elements to define rows and cells.

```html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
    </tr>
  </tbody>
</table>
```

### Table Breakdown
- **`<table>`:** The main container for the table.
- **`<thead>`:** Groups header content in a table.
- **`<tbody>`:** Groups the main body content of the table.
- **`<tr>`:** Defines a single row.
- **`<th>`:** Defines a header cell (typically bold and centered).
- **`<td>`:** Defines a data cell.
- **`colspan`:** Allows a cell to span across multiple columns.
- **`rowspan`:** Allows a cell to span across multiple rows.

### `colspan` Example
Use `colspan` when one cell should take up more than one column.

```html
<table>
  <tr>
    <th>Quarter</th>
    <th>Sales</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>Q1</td>
    <td>$10,000</td>
    <td>Normal growth</td>
  </tr>
  <tr>
    <td colspan="2">Total (Q1 + Q2)</td>
    <td>$25,000</td>
  </tr>
</table>
```

### `rowspan` Example
Use `rowspan` when one cell should cover multiple rows.

```html
<table>
  <tr>
    <th>Team</th>
    <th>Member</th>
  </tr>
  <tr>
    <td rowspan="2">Frontend</td>
    <td>Alice</td>
  </tr>
  <tr>
    <td>Bob</td>
  </tr>
</table>
```

## Stage 7: Forms

### Gathering User Input
Forms are created using the `<form>` element. Inside the form, you can use various input types to collect data.

```html
<form action="/submit-data" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Log In</button>
</form>
```

### Essential Form Elements
- **`<form>`:** The root element for creating a form.
- **`<label>`:** Provides a description for a form element.
- **`<input>`:** A generic input field.
  - **`type="text"`:** A single-line text input.
  - **`type="password"`:** A password field (characters are hidden).
  - **`type="email"`:** Validates input as an email address.
  - **`type="checkbox"`:** A box that can be checked or unchecked.
  - **`type="radio"`:** A radio button (only one in a group can be selected).
- **`<select>`:** A drop-down menu.
- **`<textarea>`:** A multi-line text input.
- **`<button>`:** A button used to submit or reset the form.
- **`action`:** Specifies the URL where the form data will be sent.
- **`method`:** Specifies the HTTP method used to send the data (usually `GET` or `POST`).
