let taskForm = document.querySelector("#taskForm");
let taskInput = document.querySelector("#taskInput");

let todoColumn = document.querySelector("#todo");
let doingColumn = document.querySelector("#doing");
let doneColumn = document.querySelector("#done");
let count = 0;

let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedCardId = null;

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function createTaskCard() {
  todoColumn.innerHTML = "";
  doingColumn.innerHTML = "";
  doneColumn.innerHTML = "";

  allTasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("draggable", "true");
    card.dataset.id = task.id;

    const cardTitle = document.createElement("div");
    cardTitle.className = "card-title";
    cardTitle.textContent = task.taskVal;

    const cardMeta = document.createElement("div");
    cardMeta.className = "card-meta";
    cardMeta.textContent = "Drag me";

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "small danger";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      allTasks = allTasks.filter((t) => t.id !== task.id);
      updateLocalStorage();
      createTaskCard();
    });

    card.addEventListener("dragstart", () => {
      draggedCardId = task.id;
    });

    card.append(cardTitle, cardMeta, cardActions);
    cardActions.appendChild(deleteBtn);

    if (task.category === "todo") todoColumn.appendChild(card);
    if (task.category === "doing") doingColumn.appendChild(card);
    if (task.category === "done") doneColumn.appendChild(card);
  });
  updateCounts();
}

function updateCounts() {
  document.querySelector("#todoCount").textContent =
    todoColumn.querySelectorAll(".card").length;

  document.querySelector("#doingCount").textContent =
    doingColumn.querySelectorAll(".card").length;

  document.querySelector("#doneCount").textContent =
    doneColumn.querySelectorAll(".card").length;
}

function enableDragAndDrop(column, categoryName) {
  column.addEventListener("dragover", (e) => e.preventDefault());

  column.addEventListener("drop", () => {
    const task = allTasks.find((t) => t.id === draggedCardId);

    let columnCount = column.querySelectorAll(".count");

    if (!task) return;

    task.category = categoryName;
    updateLocalStorage();
    createTaskCard();
  });
}

enableDragAndDrop(todoColumn, "todo");
enableDragAndDrop(doingColumn, "doing");
enableDragAndDrop(doneColumn, "done");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskValue = taskInput.value.trim();
  if (!taskValue) {
    alert("Please enter a task");
    return;
  }

  allTasks.push({
    id: Date.now().toString(),
    taskVal: taskValue,
    category: "todo",
  });

  updateLocalStorage();
  createTaskCard();
  taskForm.reset();
});

createTaskCard();
