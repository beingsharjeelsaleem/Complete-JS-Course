let countDisplay = document.querySelector("#countDisplay");
let incrementBtn = document.querySelector("#incrementBtn");
let decrementBtn = document.querySelector("#decrementBtn");
let resetBtn = document.querySelector("#resetBtn");

countDisplay.textContent = 0;
let counter = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") incrementBtn.click();
  if (e.key === "ArrowDown") decrementBtn.click();
  if (e.key === "Escape") resetBtn.click();
});

incrementBtn.addEventListener("click", () => {``
  counter++;
  countDisplay.textContent = counter;
});

decrementBtn.addEventListener("click", () => {
  if (counter > 0) {
    counter--;
    countDisplay.textContent = counter;
  }
});

resetBtn.addEventListener("click", () => {
  counter = 0;
  countDisplay.textContent = counter;
});
