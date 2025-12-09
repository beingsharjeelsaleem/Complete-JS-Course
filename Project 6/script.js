const noteForm = document.querySelector("#noteForm");
let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
let notesContainer = document.querySelector("#notesContainer");

function saveToLocalStorage(obj) {
  savedNotes.push(obj);
  localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
}

function renderNotes() {
  notesContainer.innerHTML = "";
  savedNotes.forEach((note) => {
    console.log(note.createdAt);
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    const noteTitle = document.createElement("h3");
    noteTitle.classList.add("note-title");
    noteTitle.textContent = note.title;

    const noteText = document.createElement("p");
    noteText.classList.add("note-text");
    noteText.textContent = note.desc;

    const noteFooter = document.createElement("div");
    noteFooter.classList.add("note-footer");

    const noteDate = document.createElement("span");
    noteDate.classList.add("note-date");

    const createdAtDate = new Date(note.createdAt).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();

    if (createdAtDate === todayDate) {
      noteDate.textContent = `Saved: Today`;
    } else {
      noteDate.textContent = `Saved: ${note.createdAt}`;
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-note-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      savedNotes = savedNotes.filter((n) => n !== note);
      renderNotes();
      localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
    });

    noteFooter.appendChild(noteDate);
    noteFooter.appendChild(deleteBtn);

    notesContainer.appendChild(noteCard);
    noteCard.appendChild(noteTitle);
    noteCard.appendChild(noteText);
    noteCard.appendChild(noteFooter);
  });
}

noteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let noteTitle = document.querySelector("#noteTitle").value;
  let noteBody = document.querySelector("#noteBody").value;

  saveToLocalStorage({
    id: Date.now(),
    title: noteTitle,
    desc: noteBody,
    createdAt: new Date().toLocaleString(),
  });
  noteForm.reset();
  renderNotes();
});
renderNotes();
