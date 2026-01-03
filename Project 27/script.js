let themeToggle = document.querySelector("#themeToggle");
let modeText = document.querySelector("#modeText");
let savedTheme = document.querySelector("#savedTheme");

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.checked = true;
    modeText.textContent = "Light Mode";
    savedTheme.textContent = "Light";
  } else {
    document.body.classList.remove("light");
    themeToggle.checked = false;
    modeText.textContent = "Dark Mode";
    savedTheme.textContent = "Dark";
  }
}

function saveToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

function loadTheme() {
  let theme = localStorage.getItem("theme");

  if (theme) {
    applyTheme(theme);
  } else {
    applyTheme("dark");
  }
}

themeToggle.addEventListener("change", function () {
  if (themeToggle.checked) {
    applyTheme("light");
    saveToLocalStorage("Light");
  } else {
    applyTheme("dark");
    saveToLocalStorage("Dark");
  }
});

loadTheme();
