let searchInput = document.querySelector("#searchInput");
let movieContainer = document.querySelector("#movieContainer");
let loader = document.querySelector("#loader");
movieContainer.innerHTML = "Search for the movie to show up";

apiKey = "3deba3e5";

async function getMovie(movie) {
  try {
    loader.style.display = "flex";
    movieContainer.style.display = "none";
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`
    );
    if (!response.ok) {
      throw new Error(movieData.Error);
    }

    const movieData = await response.json();

    movieContainer.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    const img = document.createElement("img");
    img.classList.add("movie-poster");
    img.src = movieData.Search[0].Poster;
    img.alt = `${movieData.Search[0].Title} Poster`;

    img.onload = () => {
      loader.style.display = "none";
      movieContainer.style.display = "flex";
    };

    const details = document.createElement("div");
    details.classList.add("movie-details");

    const title = document.createElement("div");
    title.classList.add("movie-title");
    title.textContent = movieData.Search[0].Title;

    const year = document.createElement("div");
    year.classList.add("movie-year");
    year.textContent = movieData.Search[0].Year;

    movieContainer.appendChild(card);
    details.appendChild(title);
    details.appendChild(year);
    card.appendChild(img);
    card.appendChild(details);
  } catch (error) {
    loader.style.display = "none";
    movieContainer.style.display = "flex";
    movieContainer.innerHTML = error;
  }
}

function debounce(fnc, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fnc(...args);
    }, delay);
  };
}

searchInput.addEventListener(
  "input",
  debounce(function () {
    getMovie(searchInput.value);
  }, 500)
);
