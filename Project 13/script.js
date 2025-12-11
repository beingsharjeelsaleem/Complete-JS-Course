let jokeContainer = document.querySelector("#jokeContainer");
let generateBtn = document.querySelector("#generateBtn");

async function getRandomJokes() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
      throw new Error("No joke Found");
    }

    const joke = await response.json();

    jokeContainer.innerHTML = "";

    const jokeCard = document.createElement("div");
    jokeCard.className = "joke-card";

    const setupDiv = document.createElement("div");
    setupDiv.className = "setup";
    setupDiv.textContent = joke.setup;

    const dividerDiv = document.createElement("div");
    dividerDiv.className = "divider";

    const punchlineDiv = document.createElement("div");
    punchlineDiv.className = "punchline";
    punchlineDiv.textContent = joke.punchline;

    jokeContainer.appendChild(jokeCard);
    jokeCard.appendChild(setupDiv);
    jokeCard.appendChild(dividerDiv);
    jokeCard.appendChild(punchlineDiv);
  } catch (error) {
    console.log(error);
  }
}

generateBtn.addEventListener("click", getRandomJokes);

getRandomJokes();
