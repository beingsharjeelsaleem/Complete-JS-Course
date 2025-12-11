let loader = document.querySelector("#loader");
let imageContainer = document.querySelector("#imageContainer");
let loadBtn = document.querySelector("#loadBtn");

async function getImageData() {
  try {
    loader.style.display = "flex";
    imageContainer.style.display = "none";
    const response = await fetch("https://picsum.photos/600/400");

    if (!response.ok) {
      throw new Error("No image found");
    }

    imageContainer.innerHTML = "";

    let loadedImg = document.createElement("img");
    loadedImg.classList.add("loadedImage");
    loadedImg.src = response.url;

    loadedImg.onload = () => {
      loader.style.display = "none";
      imageContainer.style.display = "flex";
      imageContainer.appendChild(loadedImg);
    };
  } catch (error) {
    imageContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
    loader.style.display = "none";
    console.log(error);
  }
}

loadBtn.addEventListener("click", getImageData);

getImageData();
