let expenseForm = document.querySelector("#expenseForm");
let savedList = JSON.parse(localStorage.getItem("savedList")) || [];
let transactionList = document.querySelector("#transactionList");
let balance = 0;
let totalBalance = document.querySelector("#totalBalance");
totalBalance.textContent = `$${balance}`;

function saveToLocalStorage(obj) {
  savedList.push(obj);
  localStorage.setItem("savedList", JSON.stringify(savedList));
}

function balanceUpdater() {
  total = 0;

  savedList.forEach((item) => {
    let itemPrice = Number(item.transactionAmount);

    if (item.transactionType === "expense") {
      total -= itemPrice;
    } else if (item.transactionType === "income") {
      total += itemPrice;
    }
  });

  totalBalance.textContent = `+$${total.toFixed(2)}`;
}

function renderTransactionCards() {
  transactionList.innerHTML = "";
  savedList.forEach((transaction) => {
    const transactionItem = document.createElement("div");
    transactionItem.classList.add(
      "transaction-item",
      transaction.transactionType
    );

    const transactionText = document.createElement("span");
    transactionText.classList.add("transaction-text");
    transactionText.textContent = transaction.transactionDescription;

    const transactionAmount = document.createElement("span");
    transactionAmount.classList.add("transaction-amount");
    transactionAmount.textContent = `${
      transaction.transactionType === "income" ? "+" : "-"
    }$${transaction.transactionAmount}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      savedList = savedList.filter((sl) => sl !== transaction);
      renderTransactionCards();
      localStorage.setItem("savedList", JSON.stringify(savedList));
      balanceUpdater();
    });

    transactionList.appendChild(transactionItem);
    transactionItem.appendChild(transactionText);
    transactionItem.appendChild(transactionAmount);
    transactionItem.appendChild(deleteBtn);
  });
  balanceUpdater();
}

expenseForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let transactionDescription = document.querySelector(
    "#transactionDescription"
  ).value;
  let transactionAmount = document.querySelector("#transactionAmount").value;
  let transactionType = document.querySelector("#transactionType").value;

  if (!transactionDescription || !transactionAmount || !transactionType) {
    alert("Kindly fill all the fields before submitting the form");
  }

  saveToLocalStorage({
    transactionDescription,
    transactionAmount,
    transactionType,
  });

  expenseForm.reset();
  renderTransactionCards();
  balanceUpdater();
});
renderTransactionCards();
