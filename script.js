document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();

    // Add event listener to task input
    document.getElementById('task-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    // Get the task input value
    var taskInput = document.getElementById('task-input');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create a new task item
        var taskList = document.getElementById('task-list');
        var taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        // Create task text span
        var taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;

        // Create task actions span
        var taskActionsSpan = document.createElement('span');
        taskActionsSpan.innerHTML = '<button onclick="editTask(this)">Edit</button> ' +
                                    '<button onclick="deleteTask(this)">Delete</button> ' +
                                    '<button onclick="toggleCompleted(this)">Done</button>';

        // Append task text and actions to task item
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(taskActionsSpan);

        // Append task item to task list
        taskList.appendChild(taskItem);

        // Clear the task input
        taskInput.value = '';

        // Save tasks to local storage
        saveTasks();
    }
}

function editTask(editButton) {
    var taskTextSpan = editButton.parentElement.previousElementSibling;
    var newTaskText = prompt('Edit task:', taskTextSpan.textContent);

    if (newTaskText !== null) {
        taskTextSpan.textContent = newTaskText;
        saveTasks();
    }
}

function deleteTask(deleteButton) {
    var taskItem = deleteButton.parentElement.parentElement;
    taskItem.remove();
    saveTasks();
}

function toggleCompleted(doneButton) {
    var taskItem = doneButton.parentElement.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById('task-list').innerHTML;
    localStorage.setItem('tasks', taskList);
}

function loadTasks() {
    var taskList = localStorage.getItem('tasks');
    if (taskList !== null) {
        document.getElementById('task-list').innerHTML = taskList;
    }
}
