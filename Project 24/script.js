let grid = document.querySelector("#grid");
let lightbox = document.querySelector("#lightbox");
let closeBtn = document.querySelector("#closeBtn");
let prevBtn = document.querySelector("#prevBtn");
let bigImg = document.querySelector("#bigImg");
let nextBtn = document.querySelector("#nextBtn");
let currentIndex = 0;
let thumbs = [];

async function showRandomImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=40"
    );

    if (!response.ok) {
      throw new Error("Images Not Found");
    }

    const data = await response.json();
    const randomizeImages = data.sort(() => 0.5 - Math.random());
    const limitImages = randomizeImages.slice(0, 6);
    grid.innerHTML = "";
    limitImages.forEach((image, idx) => {
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.setAttribute("data-index", idx);

      const img = document.createElement("img");
      img.src = image.download_url;
      img.alt = "Image 6";

      thumb.appendChild(img);

      grid.appendChild(thumb);
    });

    thumbs = document.querySelectorAll(".thumb img");
  } catch (error) {
    grid.innerHTML = error;
  }
}

function openLightbox(index) {
  lightbox.classList.remove("hidden");
  currentIndex = index;
  bigImg.src = thumbs[currentIndex].src;
}

function showNext() {
  currentIndex++;
  if (currentIndex > thumbs.length - 1) {
    currentIndex = 0;
  }
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = thumbs.length - 1;
  }
  openLightbox(currentIndex);
}

function closeLightbox() {
  lightbox.classList.add("hidden");
}

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);
document.addEventListener("keydown", (evt) => {
  if (lightbox.classList.contains("hidden")) return;

  if (evt.key === "Escape") {
    closeLightbox();
  }

  if (evt.key === "ArrowLeft") {
    showPrev();
  }

  if (evt.key === "ArrowRight") {
    showNext();
  }
});

grid.addEventListener("click", (evt) => {
  let thumbBox = evt.target.closest(".thumb");
  if (!thumbBox) return;
  let index = thumbBox.dataset.index;
  openLightbox(index);
});

showRandomImages();
