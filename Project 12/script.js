let searchForm = document.querySelector("#searchForm");
let countryContainer = document.querySelector("#countryContainer");
let searchBtn = document.querySelector("#searchBtn");
countryContainer.textContent = "Search the country name to get the results";

async function getCountryData(country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const countryData = await response.json();

    const exactCountry = countryData.find(
      (item) => item.name.common.toLowerCase() === country.toLowerCase()
    );

    if (country === "israel" || country === "Israel") {
      return;
    }

    if (!exactCountry) {
      throw new Error("Exact match not found");
    }

    countryContainer.innerHTML = "";

    let countryCard = document.createElement("div");
    countryCard.className = "country-card";

    let countryFlag = document.createElement("img");
    countryFlag.className = "flag";
    countryFlag.src = exactCountry.flags.png;
    countryFlag.alt = "country flag";

    let countryName = document.createElement("h2");
    countryName.className = "country-name";
    countryName.textContent = exactCountry.name.common;

    let countryInfo = document.createElement("div");
    countryInfo.className = "info";

    let countryCapital = document.createElement("p");
    countryCapital.innerHTML = `<strong>Capital:</strong> ${exactCountry.capital}`;

    let countryRegion = document.createElement("p");
    countryRegion.innerHTML = `<strong>Region:</strong> ${exactCountry.region}`;

    let countryPopulation = document.createElement("p");
    countryPopulation.innerHTML = `<strong>Population:</strong> ${exactCountry.population.toLocaleString()}`;

    countryContainer.appendChild(countryCard);
    countryInfo.appendChild(countryCapital);
    countryInfo.appendChild(countryRegion);
    countryInfo.appendChild(countryPopulation);

    countryCard.appendChild(countryFlag);
    countryCard.appendChild(countryName);
    countryCard.appendChild(countryInfo);
  } catch (error) {
    console.log(error);
    countryContainer.innerHTML = "Invalid Country! Please Try Again Later";
  }
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault(0);

  let searchInput = document.querySelector("#searchInput").value;

  if (searchInput.trim() === "") {
    alert("please fillout the field before submitting the form");
  }

  getCountryData(searchInput);

  searchForm.reset();
});
