let colorBox = document.querySelector("#colorBox");
let currentColor = document.querySelector("#currentColor");
let flipBtn = document.querySelector("#flipBtn");
function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor.padStart(6, "0");
}
function updateColorInColorBox() {
  let hexColor = getRandomHexColor();
  colorBox.style.background = hexColor;
  currentColor.textContent = hexColor;
}
flipBtn.addEventListener("click", updateColorInColorBox);
