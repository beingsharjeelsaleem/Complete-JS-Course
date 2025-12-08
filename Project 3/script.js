let num1 = document.querySelector("#num1");
let num2 = document.querySelector("#num2");
let addBtn = document.querySelector("#addBtn");
let subBtn = document.querySelector("#subBtn");
let mulBtn = document.querySelector("#mulBtn");
let divBtn = document.querySelector("#divBtn");
let result = document.querySelector("#result");

function calculateTotals(e) {
  let floatValue = parseFloat(num1.value);
  let floatValue2 = parseFloat(num2.value);

  if (e.target.id === "addBtn") {
    result.textContent = floatValue + floatValue2;
  } else if (e.target.id === "subBtn") {
    result.textContent = floatValue - floatValue2;
  } else if (e.target.id === "mulBtn") {
    result.textContent = floatValue * floatValue2;
  } else if (e.target.id === "divBtn") {
    result.textContent = floatValue / floatValue2;
  }
}

addBtn.addEventListener("click", calculateTotals);
subBtn.addEventListener("click", calculateTotals);
mulBtn.addEventListener("click", calculateTotals);
divBtn.addEventListener("click", calculateTotals);
