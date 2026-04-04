# Task Manager App

A feature-rich task management application with drag-and-drop functionality, local storage persistence, and advanced filtering.

## 🎯 Learning Objectives

- DOM manipulation and event handling
- LocalStorage for data persistence
- Array methods (filter, map, reduce, sort)
- Form handling and validation
- Modal windows
- Date manipulation
- Event delegation

## 📋 Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Priority levels (Low, Medium, High)
- ✅ Due dates with overdue indicators
- ✅ Filter tasks by status and priority
- ✅ Search functionality
- ✅ Drag and drop reordering
- ✅ Local storage persistence
- ✅ Dark/Light theme
- ✅ Task statistics dashboard

## 🛠️ Concepts Applied

### HTML
- Semantic structure
- Form elements and validation
- Template literals for dynamic content
- Data attributes for state management

### CSS
- CSS Grid and Flexbox layouts
- Custom properties for theming
- Transitions and animations
- Responsive design
- BEM naming convention

### JavaScript
- DOM selection and manipulation
- Event listeners and delegation
- LocalStorage API
- Array methods (filter, map, sort, reduce)
- Date object manipulation
- Debouncing for search
- Module pattern for code organization

## 📁 Files Included

- `index.html` - Application structure
- `style.css` - Complete styling with theme support
- `script.js` - Full application logic
- `README.md` - Documentation

## 🚀 Getting Started

1. Open `index.html` in your browser
2. Start adding tasks!
3. Your tasks will persist even after closing the browser

## 💡 Key Features Explained

### Task Creation
- Click "Add Task" button or use the quick add form
- Set title, description, priority, and due date
- Tasks are automatically saved to localStorage

### Task Management
- Click checkbox to toggle completion
- Click edit icon to modify task details
- Click delete icon to remove task
- Drag tasks to reorder them

### Filtering & Search
- Filter by: All, Active, Completed
- Filter by priority: Low, Medium, High
- Real-time search through task titles

### Statistics Dashboard
- Total tasks count
- Completed vs pending
- Completion percentage
- Overdue tasks warning

## 🎨 Customization Ideas

- Add categories/tags for tasks
- Implement recurring tasks
- Add task attachments
- Create multiple task lists
- Add collaboration features
- Integrate with calendar APIs

## 📊 Code Highlights

### LocalStorage Implementation
```javascript
// Save tasks
localStorage.setItem('tasks', JSON.stringify(tasks));

// Load tasks
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```

### Event Delegation
```javascript
taskList.addEventListener('click', (e) => {
    const taskElement = e.target.closest('.task');
    if (!taskElement) return;
    
    // Handle different actions
    if (e.target.classList.contains('task__checkbox')) {
        toggleTask(taskElement.dataset.id);
    }
});
```

### Array Methods
```javascript
// Filter tasks
const filteredTasks = tasks.filter(task => {
    return task.status === 'active';
});

// Sort by priority
const sortedTasks = tasks.sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
});
```

---

**Next Steps:** Try adding a backend with Node.js and a database, or implement real-time sync across devices!
