let textInput = document.querySelector("#textInput");
let charCount = document.querySelector("#charCount");
let wordCount = document.querySelector("#wordCount");
let remaining = document.querySelector("#remaining");
let fill = document.querySelector("#fill");
let msg = document.querySelector("#msg");
let chars = 0;
let typed = 0;
let words = 0;
let max = 200;
remaining.textContent = max;

textInput.addEventListener("input", (e) => {
  chars = textInput.value.replace(/\s/g, "").length;

  if (chars > max) {
    textInput.value = textInput.value.slice(0, -1);
    chars = textInput.value.replace(/\s/g, "").length;
  }

  typed = chars;
  charCount.textContent = typed;
  maxChars = max - chars;
  remaining.textContent = maxChars;

  let percent = (chars / max) * 100;
  if (percent > 100) percent = 100;

  fill.style.width = percent + "%";

  chars >= max ? (msg.textContent = "Limit reached") : (msg.textContent = "");

  const wordsArray = textInput.value.trim().split(/\s+/);
  words = textInput.value.trim() === "" ? 0 : wordsArray.length;
  wordCount.textContent = words;
});
