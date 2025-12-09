let form = document.querySelector("form");
let taskList = document.querySelector("#taskList");

function createTasks(task) {
  console.log(task);
  let li = document.createElement("li");
  li.textContent = task;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (t) => {
    let taskToRemove = t.target.closest("li");
    taskToRemove.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let taskInput = document.querySelector("#taskInput").value;

  if (!taskInput) {
    alert("please fill the task before submitting");
    return;
  }

  createTasks(taskInput);

  form.reset();
});
