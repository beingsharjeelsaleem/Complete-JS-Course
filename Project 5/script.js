let todoForm = document.querySelector("#todoForm");
let savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
let taskList = document.querySelector("#taskList");

function saveToLocalStorage(task) {
  savedTasks.push(task);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
}

function createTasks() {
  taskList.innerHTML = "";
  savedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task;

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      let updated = prompt("Edit your task:", task);
      if (!updated) return;
      let newTasks = [];
      savedTasks.filter((t) => {
        if (t === task) {
          newTasks.push(updated);
        } else {
          newTasks.push(t);
        }
      });
      savedTasks = newTasks;
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

      createTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      savedTasks = savedTasks.filter((savedT) => savedT !== task);
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

      createTasks();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskList.appendChild(li);
    li.appendChild(span);
    li.appendChild(actions);
  });
}

todoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let taskInput = document.querySelector("#taskInput").value;

  saveToLocalStorage(taskInput);

  todoForm.reset();

  createTasks();
});
createTasks();
