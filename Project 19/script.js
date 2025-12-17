const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Which element has the chemical symbol O?",
    options: ["Gold", "Oxygen", "Osmium", "Iron"],
    answer: "Oxygen",
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Horse", "Cheetah", "Leopard"],
    answer: "Cheetah",
  },
  {
    question: "Which country invented paper?",
    options: ["India", "Egypt", "China", "Greece"],
    answer: "China",
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Saturn",
  },
  {
    question: "What is the boiling point of water at sea level (°C)?",
    options: ["90", "95", "100", "105"],
    answer: "100",
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    answer: "Portuguese",
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Power Unit",
      "Core Processing Utility",
      "Central Program Unit",
    ],
    answer: "Central Processing Unit",
  },
  {
    question: "Which organ pumps blood through the body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    answer: "Heart",
  },
  {
    question: "How many degrees are in a right angle?",
    options: ["45", "60", "90", "180"],
    answer: "90",
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Iron", "Mercury", "Aluminum", "Silver"],
    answer: "Mercury",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    answer: "Mount Everest",
  },
  {
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945",
  },
];

let startScreen = document.querySelector("#startScreen");
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let quizScreen = document.querySelector("#quizScreen");
let resultScreen = document.querySelector("#resultScreen");
let questionText = document.querySelector("#questionText");
let optionsContainer = document.querySelector("#options");
let nextBtn = document.querySelector("#nextBtn");
let index = Math.floor(Math.random() * quizQuestions.length);
let selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || [];
let scoreText = document.querySelector("#scoreText");
let currentSelected = null;

function saveToStorage(selectedAnsObj) {
  selectedAnswers.push(selectedAnsObj);
  localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
}

startBtn.addEventListener("click", () => {
  localStorage.clear();
  selectedAnswers = [];
  quizQuestions.sort(() => Math.random() - 0.5);
  index = 0;
  quizScreen.classList.remove("hidden");
  startScreen.classList.add("hidden");
  loadQuestions();
});

restartBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function loadQuestions() {
  optionsContainer.innerHTML = "";
  currentSelected = null;
  let singleQuiz = quizQuestions[index];

  singleQuiz.options.forEach((quizOption) => {
    let optionButton = document.createElement("button");
    optionButton.classList.add("option");
    optionButton.textContent = quizOption;
    questionText.textContent = singleQuiz.question;
    optionsContainer.appendChild(optionButton);

    optionButton.addEventListener("click", (e) => {
      document
        .querySelectorAll(".option")
        .forEach((btn) => btn.classList.remove("selected"));
      e.target.classList.add("selected");
      currentSelected = e.target.textContent;
    });
  });
}

nextBtn.addEventListener("click", () => {
  if (!currentSelected) {
    alert("Please select an answer!");
    return;
  }
  let singleQuiz = quizQuestions[index];

  saveToStorage({
    question: singleQuiz.question,
    answer: currentSelected,
    condition: currentSelected === singleQuiz.answer ? "right" : "wrong",
  });

  index++;

  if (index < quizQuestions.length) {
    loadQuestions();
  } else {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    let correctCount = selectedAnswers.filter(
      (item) => item.condition === "right"
    ).length;
    scoreText.textContent = `${correctCount} / ${selectedAnswers.length}`;
  }
});
