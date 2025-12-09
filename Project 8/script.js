const countdownForm = document.querySelector("#countdownForm");
const targetDateInput = document.querySelector("#targetDate");
const timerDisplay = document.querySelector("#timer");

let countDownInterval;
function getRemainingTime(targetDate) {
  countDownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countDownInterval);
      timerDisplay.textContent = "Time's UP";
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

countdownForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const targetDate = new Date(targetDateInput.value).getTime();

  if (isNaN(targetDate)) {
    alert("please enter valid date");
    return;
  }

  getRemainingTime(targetDate);
  targetDateInput.disabled = true;
});
