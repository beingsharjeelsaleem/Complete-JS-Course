let form = document.querySelector("form");

let usernameInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let confirmPasswordInput = document.querySelector("#confirmPassword");

let usernameError = usernameInput.nextElementSibling;
let emailError = emailInput.nextElementSibling;
let passwordError = passwordInput.nextElementSibling;
let confirmPasswordError = confirmPasswordInput.nextElementSibling;

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let hasError = false;

  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  let username = usernameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();
  let confirmPassword = confirmPasswordInput.value.trim();

  if (username === "") {
    hasError = true;
    usernameError.textContent = "Username is required";
  }

  if (email === "") {
    hasError = true;
    emailError.textContent = "Email is required";
  } else {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Enter a valid email";
      hasError = true;
    }
  }

  if (password === "") {
    hasError = true;
    passwordError.textContent = "Password is required";
  } else {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      passwordError.textContent =
        "Password must be 8+ chars, uppercase, lowercase, number & symbol";
      hasError = true;
    }
  }

  if (confirmPassword === "") {
    hasError = true;
    confirmPasswordError.textContent = "Password is required";
  } else if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match";
    hasError = true;
  }

  if (!hasError) {
    form.reset();
    alert("Form submitted successfully");
  }
});
