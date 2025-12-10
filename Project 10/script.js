let weatherForm = document.querySelector("#weatherForm");
let temp = document.querySelector("#temp");
let condition = document.querySelector("#condition");
let errorMessage = document.querySelector("#errorMessage");

const apiKey = "5ce6f848e3b54b50b26234516250912";

function getWeatherUpdate(city) {
  const api = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  temp.textContent = "";
  condition.textContent = "";
  errorMessage.style.display = "none";

  fetch(api)
    .then((rawdata) => rawdata.json())
    .then((data) => {
      if (data.error) {
        errorMessage.style.display = "initial";
        errorMessage.textContent = data.error.message;
        return;
      }

      errorMessage.style.display = "none";

      temp.textContent = `${data.current.temp_c}°C`;
      condition.textContent = data.current.condition.text;
    })
    .catch((err) => {
      errorMessage.style.display = "initial";
      errorMessage.textContent = "Something went wrong. Try again!";
    });
}
weatherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let cityName = document.querySelector("#cityName").value.trim();

  if (!cityName) {
    alert("Kindly fill out the city name before submitting.");
    return;
  }

  getWeatherUpdate(cityName);

  weatherForm.reset();
  document.querySelector("#cityName").focus();
});
