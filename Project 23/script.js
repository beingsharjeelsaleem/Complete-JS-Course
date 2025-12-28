let timeLeftEl = document.querySelector("#timeLeft");
let wpmEl = document.querySelector("#wpm");
let accuracyEl = document.querySelector("#accuracy");
let textBoxEl = document.querySelector("#textBox");
let typingInput = document.querySelector("#typingInput");
let startBtn = document.querySelector("#startBtn");
let resetBtn = document.querySelector("#resetBtn");
let messageEl = document.querySelector("#message");
let words = [];
let wordIndex = 0;
let running = false;
let timer = null;
let secondsTotal = 60;
let secondsLeft = secondsTotal;
let typedWords = 0;
let correctWords = 0;

let paragraphs = [
  "Typing is a skill that improves with practice and patience. Focus on accuracy first then speed.",
  "JavaScript helps you build interactive websites. Start small build projects and learn step by step.",
  "A good developer tests often fixes bugs calmly and improves code a little every day.",
  "Consistency beats intensity. Practice typing daily and track your progress over time.",
  "Learning to code is like learning a language. You get better by writing and reading every day.",
];

function showRandomText() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function showText(text) {
  words = text.split(" ");
  textBoxEl.innerHTML = "";

  words.forEach((word) => {
    let span = document.createElement("span");
    span.classList.add("word");
    span.textContent = word;
    textBoxEl.appendChild(span);
    textBoxEl.appendChild(document.createTextNode(" "));
  });

  wordIndex = 0;
  highlightWord();
}

function highlightWord() {
  let allWords = document.querySelectorAll(".word");

  allWords.forEach((word) => {
    word.classList.remove("active");
  });

  allWords[wordIndex] ? allWords[wordIndex].classList.add("active") : null;
}

function startTest() {
  if (running) return;

  running = true;
  typingInput.disabled = false;
  typingInput.value = "";
  typingInput.focus();
  messageEl.textContent = "Type ONE word then press Space";

  timer = setInterval(() => {
    secondsLeft--;
    timeLeftEl.textContent = secondsLeft;

    secondsLeft <= 0 ? finishTest() : null;
  }, 1000);
}

function finishTest() {
  clearInterval(timer);
  timer = null;
  running = false;
  typingInput.disabled = true;
  typingInput.value = "";
  messageEl.textContent = "Finished. Press Reset to try again.";
  updateScore();
  // show time used when the test finishes
  let timeUsed = secondsTotal - secondsLeft;
  timeLeftEl.textContent = timeUsed;
}

function updateScore() {
  let timeUsed = secondsTotal - secondsLeft;

  let minutesUsed = timeUsed / 60;
  let wpm = 0;

  if (minutesUsed > 0) {
    wpm = typedWords / minutesUsed;
  }

  let accuracy = 0;
  if (typedWords > 0) {
    accuracy = (correctWords / typedWords) * 100;
  }

  wpmEl.textContent = Math.floor(wpm);
  accuracyEl.textContent = Math.floor(accuracy) + "%";
}

function resetTest() {
  clearInterval(timer);
  timer = null;
  running = false;
  typingInput.disabled = true;
  typedWords = 0;
  correctWords = 0;
  typingInput.value = "";
  messageEl.textContent = "Press Start to begin";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0%";
  secondsLeft = secondsTotal;
  timeLeftEl.textContent = secondsLeft;
  // use existing functions to show a new random text
  showText(showRandomText());
}

typingInput.addEventListener("input", () => {
  if (!running) return;

  let value = typingInput.value;

  if (value.endsWith(" ")) {
    let typed = value.trim();
    let target = words[wordIndex];

    typedWords++;

    let allWords = document.querySelectorAll(".word");

    if (typed === target) {
      correctWords++;
      allWords[wordIndex].classList.add("correct");
    } else {
      allWords[wordIndex].classList.add("wrong");
    }

    wordIndex++;
    highlightWord();
    typingInput.value = "";

    updateScore();

    if (wordIndex >= words.length) {
      finishTest();
    }
  }
});

resetBtn.addEventListener("click", resetTest);
startBtn.addEventListener("click", startTest);

showText(showRandomText());
timeLeftEl.textContent = secondsLeft;
