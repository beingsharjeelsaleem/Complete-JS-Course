let items = [];

for (let i = 1; i <= 60; i++) {
  items.push({ id: i, text: `Text: ${i}` });
}

let itemsPerPage = 6;
let currentPage = 1;

let totalPages = Math.ceil(items.length / itemsPerPage);

let dataContainer = document.querySelector("#data-container");
let pagesContainer = document.querySelector("#pages");
let prevBtn = document.querySelector("#prevBtn");
let nextBtn = document.querySelector("#nextBtn");

function showItems() {
  dataContainer.innerHTML = "";
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let paginatedItems = items.slice(startIndex, endIndex);

  paginatedItems.forEach((item) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.textContent = item.text;
    dataContainer.appendChild(card);
  });
}

console.log(items.length);

function showPageNumbers() {
  pagesContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let pagButton = document.createElement("button");
    pagButton.classList.add("page-number");
    pagButton.textContent = i;
    if (i === currentPage) {
      pagButton.classList.add("active");
    }
    pagesContainer.appendChild(pagButton);
    pagButton.addEventListener("click", () => {
      currentPage = i;
      update();
    });
  }
}

function update() {
  showItems();
  showPageNumbers();
}

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage += 1;
  }
  update();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
  }
  update();
});

update();
