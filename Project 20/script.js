let timeDisplay = document.querySelector("#timeDisplay");
let startBtn = document.querySelector("#startBtn");
let pauseBtn = document.querySelector("#pauseBtn");
let resetBtn = document.querySelector("#resetBtn");
let lapBtn = document.querySelector("#lapBtn");
let lapsContainer = document.querySelector("#laps");
let lapCount = 0;

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timeInterval = null;

startBtn.addEventListener("click", function () {
  if (timeInterval) return;

  timeInterval = setInterval(() => {
    milliseconds++;

    if (milliseconds >= 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    timeDisplay.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }:${milliseconds >= 10 ? milliseconds : "0" + milliseconds}`;
  }, 10);
});

pauseBtn.addEventListener("click", function () {
  clearInterval(timeInterval);
  timeInterval = null;
});

resetBtn.addEventListener("click", function () {
  clearInterval(timeInterval);
  timeInterval = null;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  timeDisplay.textContent = `${minutes >= 10 ? minutes : "0" + minutes}:${
    seconds >= 10 ? seconds : "0" + seconds
  }:${milliseconds >= 10 ? milliseconds : "0" + milliseconds}`;
});

lapBtn.addEventListener("click", function () {
  if (!timeInterval) return;

  lapCount++;

  let lap = document.createElement("div");
  lap.textContent = `Lap ${lapCount} — ${timeDisplay.textContent}`;
  lapsContainer.appendChild(lap);
});
