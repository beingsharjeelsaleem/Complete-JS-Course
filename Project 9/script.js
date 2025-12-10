function updateClock() {
  let clockDisplay = document.querySelector("#clock");
  let dateDisplay = document.querySelector("#date");

  let timeNow = new Date();

  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let seconds = timeNow.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let currentDate = timeNow.toLocaleDateString();

  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  dateDisplay.textContent = `Current Date: ${currentDate}`;
}

setInterval(() => {
  updateClock();
}, 1000);
