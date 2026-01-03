let passwordOutput = document.querySelector("#passwordOutput");
let copyBtn = document.querySelector("#copyBtn");
let lengthInput = document.querySelector("#lengthInput");
let useUpper = document.querySelector("#useUpper");
let useLower = document.querySelector("#useLower");
let useNumber = document.querySelector("#useNumber");
let useSymbol = document.querySelector("#useSymbol");
let strengthFill = document.querySelector("#strengthFill");
let generateBtn = document.querySelector("#generateBtn");
let resetBtn = document.querySelector("#resetBtn");
let msg = document.querySelector("#msg");
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numberChars = "0123456789";
let symbolChars = "!@#$%^&*()_+-={}[]<>?";

function getRandomChar(chars) {
  let random = Math.floor(Math.random() * chars.length);
  return chars[random];
}

function buildAllowedChars() {
  let allowed = "";

  if (useUpper.checked) allowed += upperChars;
  if (useLower.checked) allowed += lowerChars;
  if (useNumber.checked) allowed += numberChars;
  if (useSymbol.checked) allowed += symbolChars;

  return allowed;
}

function generatePassword() {
  msg.textContent = "";

  let length = Number(lengthInput.value);
  let allowedChars = buildAllowedChars();

  if (allowedChars.length === 0) {
    msg.textContent = "kuch to select kro";
    passwordOutput.value = "";
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    password += getRandomChar(allowedChars);
  }

  passwordOutput.value = password;
  updateStrength(password);
}

function updateStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (useUpper.checked) score++;
  if (useNumber.checked) score++;
  if (useSymbol.checked) score++;

  if (score <= 1) {
    strengthText.textContent = "Weak";
    strengthFill.style.width = "25%";
  } else if (score <= 3) {
    strengthText.textContent = "Medium";
    strengthFill.style.width = "60%";
  } else {
    strengthText.textContent = "Strong";
    strengthFill.style.width = "100%";
  }
}

function copyText() {
  let textToCopy = passwordOutput.value;

  if (!textToCopy || textToCopy === "Click Generate") {
    msg.textContent = "Generate a password first";
    return;
  }

  navigator.clipboard.writeText(textToCopy);
  msg.textContent = "Copied!";
}

function resetPassword() {
  lengthInput.value = 12;
  lengthValue.textContent = 12;

  useUpper.checked = true;
  useLower.checked = true;
  useNumber.checked = true;
  useSymbol.checked = false;

  passwordOutput.value = "Click Generate";
  strengthText.textContent = "-";
  strengthFill.style.width = "0%";
  msg.textContent = "";
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyText);
resetBtn.addEventListener("click", resetPassword);
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});
