const input = document.querySelector(".input");
const submit = document.querySelector(".add");
const deleteAll = document.querySelector(".delete-all");
const tasksDiv = document.querySelector(".tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

submit.addEventListener("click", () => {
  if (input.value.trim()) {
    const task = { id: Date.now(), title: input.value.trim(), completed: false };
    tasks.push(task);
    updateLocalStorage();
    renderTasks();
    input.value = "";
  }
});

deleteAll.addEventListener("click", () => {
  tasks = [];
  updateLocalStorage();
  renderTasks();
});

tasksDiv.addEventListener("click", (e) => {
  const taskId = e.target.closest(".task")?.dataset.id;
  if (!taskId) return;

  if (e.target.classList.contains("del")) {
    tasks = tasks.filter(task => task.id != taskId);
  } else if (e.target.classList.contains("task")) {
    tasks = tasks.map(task => task.id == taskId ? { ...task, completed: !task.completed } : task);
  }

  updateLocalStorage();
  renderTasks();
});

function renderTasks() {
  tasksDiv.innerHTML = tasks.map(task => `
    <div class="task ${task.completed ? "done" : ""}" data-id="${task.id}">
      ${task.title}
      <span class="del">Delete</span>
    </div>
  `).join("");
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
