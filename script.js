let todoList = document.getElementById("todo-list");
let taskCount = document.getElementById("task-count");

function updateTaskCount() {
  const visibleTasks = [...todoList.children].filter(li => li.style.display !== "none");
  taskCount.textContent = `Tasks: ${visibleTasks.length}`;
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button onclick="editTodo(this)" class="edit-btn"><i class="fas fa-edit"></i></button>
    <button onclick="deleteTodo(this)" class="delete-btn"><i class="fas fa-trash"></i></button>
  `;

  li.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON" && !e.target.closest("button")) {
      li.classList.toggle("completed");
    }
  });

  todoList.appendChild(li);
  input.value = "";
  updateTaskCount();
}

function deleteTodo(button) {
  const li = button.parentElement;
  todoList.removeChild(li);
  updateTaskCount();
}

function editTodo(button) {
  const li = button.parentElement;
  const taskSpan = li.querySelector(".task-text");
  const newTask = prompt("Edit your task:", taskSpan.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    taskSpan.textContent = newTask.trim();
  }
}

function clearAllTodos() {
  if (confirm("Clear all tasks?")) {
    todoList.innerHTML = "";
    updateTaskCount();
  }
}

function markAllDone() {
  const tasks = document.querySelectorAll("#todo-list li");
  tasks.forEach((task) => {
    task.classList.add("completed");
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function sortTasks() {
  const tasks = Array.from(todoList.children);
  tasks.sort((a, b) => {
    const taskA = a.querySelector(".task-text").textContent.toLowerCase();
    const taskB = b.querySelector(".task-text").textContent.toLowerCase();
    return taskA.localeCompare(taskB);
  });

  todoList.innerHTML = "";
  tasks.forEach((task) => todoList.appendChild(task));
}

function filterTasks() {
  const filterText = document.getElementById("search-input").value.toLowerCase();
  const tasks = todoList.getElementsByTagName("li");

  for (let task of tasks) {
    const text = task.querySelector(".task-text").textContent.toLowerCase();
    task.style.display = text.includes(filterText) ? "flex" : "none";
  }

  updateTaskCount();
}
