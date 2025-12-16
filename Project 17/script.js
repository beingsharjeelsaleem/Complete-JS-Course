const searchForm = document.querySelector("#searchForm");
const loading = document.querySelector("#loading");
const recipeContainer = document.querySelector("#recipeContainer");
let allRecipes = [];

async function getRecipe() {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/`);

    if (!response.ok) {
      throw new Error("No Recipe Found! Try Again");
    }

    const recipeData = await response.json();
    allRecipes = recipeData.recipes;

    showRecipe(allRecipes);
  } catch (error) {
    recipeContainer.innerHTML = error;
  } finally {
    loading.style.display = "none";
  }
}

function showRecipe(recipe) {
  recipeContainer.innerHTML = "";
  if (recipe.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found</p>";
    return;
  }

  recipe.forEach((recipeItem) => {
    console.log(recipeItem);

    const recipeCard = document.createElement("div");
    recipeCard.classList.add("card");

    const recipeImg = document.createElement("img");
    recipeImg.src = recipeItem.image;
    recipeImg.alt = `${recipeItem.name} Image`;

    const recipeTitle = document.createElement("div");
    recipeTitle.classList.add("card-title");
    recipeTitle.textContent = recipeItem.name;

    const recipeSubTitle = document.createElement("div");
    recipeSubTitle.classList.add("card-subtitle");
    recipeSubTitle.textContent = recipeItem.cuisine;

    recipeContainer.appendChild(recipeCard);
    recipeCard.append(recipeImg, recipeTitle, recipeSubTitle);
  });
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let searchInput = document
    .querySelector("#searchInput")
    .value.toLowerCase()
    .trim();

  if (!searchInput) {
    alert("please fillout the field before submitting the form");
    return;
  }

  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchInput)
  );

  showRecipe(filteredRecipes);
  searchForm.reset();
});
getRecipe();
