let grid = document.querySelector("#grid");
let loader = document.querySelector("#loader");

let isLoading = false;
let limit = 15;
let page = 1;

async function loadImages() {
  if (isLoading) return;
  loader.style.display = "block";
  isLoading = true;
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );

    const data = await response.json();
    console.log(data);

    data.forEach((img) => {
      let card = document.createElement("div");
      card.className = "card";

      let image = document.createElement("img");
      image.src = img.download_url;

      card.appendChild(image);
      grid.appendChild(card);
    });
    page++;
  } catch (error) {
    console.log(error);
  }
  isLoading = false;
  loader.style.display = "none";
}

function handleScroll() {
  let scrollTop = window.scrollY;
  let windowHeight = window.innerHeight;
  let fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight) {
    loadImages();
  }
}

window.addEventListener("scroll", handleScroll);

loadImages();
