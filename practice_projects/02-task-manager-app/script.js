// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.render();
        this.loadTheme();
    }

    cacheElements() {
        this.elements = {
            taskList: document.getElementById('task-list'),
            addTaskBtn: document.getElementById('add-task-btn'),
            emptyAddTaskBtn: document.getElementById('empty-add-task-btn'),
            modal: document.getElementById('task-modal'),
            modalClose: document.getElementById('modal-close'),
            cancelBtn: document.getElementById('cancel-btn'),
            taskForm: document.getElementById('task-form'),
            modalTitle: document.getElementById('modal-title'),
            taskId: document.getElementById('task-id'),
            taskTitle: document.getElementById('task-title'),
            taskDescription: document.getElementById('task-description'),
            taskPriority: document.getElementById('task-priority'),
            taskDueDate: document.getElementById('task-due-date'),
            searchInput: document.getElementById('search-input'),
            statusFilter: document.getElementById('status-filter'),
            priorityFilter: document.getElementById('priority-filter'),
            themeToggle: document.getElementById('theme-toggle'),
            totalTasks: document.getElementById('total-tasks'),
            completedTasks: document.getElementById('completed-tasks'),
            pendingTasks: document.getElementById('pending-tasks'),
            overdueTasks: document.getElementById('overdue-tasks'),
            emptyState: document.getElementById('empty-state')
        };
    }

    bindEvents() {
        this.elements.addTaskBtn.addEventListener('click', () => this.openModal());
        this.elements.emptyAddTaskBtn.addEventListener('click', () => this.openModal());
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        this.elements.cancelBtn.addEventListener('click', () => this.closeModal());
        this.elements.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.elements.modal.querySelector('.modal__overlay').addEventListener('click', () => this.closeModal());
        
        // Event delegation for task actions
        this.elements.taskList.addEventListener('click', (e) => this.handleTaskClick(e));
        
        // Filters and search
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        this.elements.statusFilter.addEventListener('change', () => this.render());
        this.elements.priorityFilter.addEventListener('change', () => this.render());
        
        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    openModal(taskId = null) {
        if (taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                this.elements.modalTitle.textContent = 'Edit Task';
                this.elements.taskId.value = task.id;
                this.elements.taskTitle.value = task.title;
                this.elements.taskDescription.value = task.description;
                this.elements.taskPriority.value = task.priority;
                this.elements.taskDueDate.value = task.dueDate;
            }
        } else {
            this.elements.modalTitle.textContent = 'Add New Task';
            this.elements.taskForm.reset();
            this.elements.taskId.value = '';
        }
        this.elements.modal.classList.add('active');
        this.elements.taskTitle.focus();
    }

    closeModal() {
        this.elements.modal.classList.remove('active');
        this.elements.taskForm.reset();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const taskId = this.elements.taskId.value;
        const taskData = {
            title: this.elements.taskTitle.value.trim(),
            description: this.elements.taskDescription.value.trim(),
            priority: this.elements.taskPriority.value,
            dueDate: this.elements.taskDueDate.value,
            createdAt: new Date().toISOString()
        };

        if (taskId) {
            this.updateTask(taskId, taskData);
        } else {
            this.createTask(taskData);
        }
        
        this.closeModal();
    }

    createTask(taskData) {
        const task = {
            id: this.generateId(),
            ...taskData,
            status: 'active',
            completedAt: null
        };
        
        this.tasks.unshift(task);
        this.save();
        this.render();
    }

    updateTask(taskId, taskData) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...taskData };
            this.save();
            this.render();
        }
    }

    toggleTaskStatus(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            const task = this.tasks[index];
            task.status = task.status === 'active' ? 'completed' : 'active';
            task.completedAt = task.status === 'completed' ? new Date().toISOString() : null;
            this.save();
            this.render();
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.save();
            this.render();
        }
    }

    handleTaskClick(e) {
        const taskElement = e.target.closest('.task');
        if (!taskElement) return;
        
        const taskId = taskElement.dataset.id;

        if (e.target.classList.contains('task__checkbox')) {
            this.toggleTaskStatus(taskId);
        } else if (e.target.closest('.edit-btn')) {
            this.openModal(taskId);
        } else if (e.target.closest('.delete-btn')) {
            this.deleteTask(taskId);
        }
    }

    handleSearch(e) {
        this.render();
    }

    getFilteredTasks() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const statusFilter = this.elements.statusFilter.value;
        const priorityFilter = this.elements.priorityFilter.value;

        return this.tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
                                task.description.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
            const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
            
            return matchesSearch && matchesStatus && matchesPriority;
        });
    }

    isOverdue(dueDate) {
        if (!dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        return due < today;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        const overdue = this.tasks.filter(t => 
            t.status === 'active' && this.isOverdue(t.dueDate)
        ).length;

        this.elements.totalTasks.textContent = total;
        this.elements.completedTasks.textContent = completed;
        this.elements.pendingTasks.textContent = pending;
        this.elements.overdueTasks.textContent = overdue;
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        this.updateStats();

        if (filteredTasks.length === 0) {
            this.elements.emptyState.style.display = 'block';
            this.elements.taskList.innerHTML = '';
            this.elements.taskList.appendChild(this.elements.emptyState);
            return;
        }

        this.elements.emptyState.style.display = 'none';
        
        this.elements.taskList.innerHTML = filteredTasks.map(task => {
            const overdue = task.status === 'active' && this.isOverdue(task.dueDate);
            return `
                <div class="task ${task.status === 'completed' ? 'task--completed' : ''}" data-id="${task.id}">
                    <input type="checkbox" class="task__checkbox" ${task.status === 'completed' ? 'checked' : ''}>
                    
                    <div class="task__content">
                        <h3 class="task__title">${this.escapeHtml(task.title)}</h3>
                        ${task.description ? `<p class="task__description">${this.escapeHtml(task.description)}</p>` : ''}
                        <div class="task__meta">
                            <span class="task__priority priority-${task.priority}">${task.priority.toUpperCase()}</span>
                            ${task.dueDate ? `
                                <span class="task__due-date ${overdue ? 'task__due-date--overdue' : ''}">
                                    ${overdue ? '⚠️ Overdue: ' : '📅 Due: '} ${this.formatDate(task.dueDate)}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="task__actions">
                        <button class="task__btn edit-btn" title="Edit">✏️</button>
                        <button class="task__btn delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.elements.themeToggle.querySelector('.theme-icon');
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
