let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteTask(index);

      li.appendChild(taskText);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      list.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("newTask");
  const taskText = input.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText });
    input.value = "";
    saveAndRender();
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveAndRender();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(document.getElementById("search").value);
}

document.getElementById("search").addEventListener("input", (e) => {
  renderTasks(e.target.value);
});

// Initial render
renderTasks();
