// Initialise DOM elements
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionsContainer = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const feedbackMessage = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const highscoresLink = document.getElementById("highscores");
const submitMessageElement = document.getElementById("submit-message");

// Initialise variables
let currentQuestionIndex = 0;
let secondsLeft = 60;
let score = 0;
let timerInterval;

// Initialise sound variables
const audioCorrect = new Audio("assets/sfx/correct.wav");
const audioWrong = new Audio("assets/sfx/incorrect.wav");

// Event listener to start quiz
startButton.addEventListener("click", startQuiz);

// Start game
function startQuiz() {
  startTimer();
  setQuestion();
  setScore();
}

// Set the questions
function setQuestion() {
  startScreen.classList.add("hide");
  questionsContainer.classList.remove("hide");
  feedbackMessage.classList.remove("hide");

  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.innerText = currentQuestion.question;
  choicesContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    choicesContainer.appendChild(button);

    button.addEventListener("click", () => selectAnswer(option));
  });
}

// Select an answer
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  currentQuestionIndex++;

  if (selectedOption === currentQuestion.answer) {
    feedbackMessage.textContent = "Correct!";
    audioCorrect.play();
  } else {
    feedbackMessage.textContent = "Wrong!";
    audioWrong.play();
    secondsLeft -= 10;

    if (secondsLeft <= 0) {
      secondsLeft = 1;
    }
  }

  setScore();

  if (currentQuestionIndex < questions.length) {
    setQuestion();
  } else {
    timerElement.textContent = secondsLeft;
    questionsContainer.classList.add("hide");
    feedbackMessage.classList.add("hide");
    endScreen.classList.remove("hide");
    clearInterval(timerInterval);
  }
}

// Timer
function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      setScore();
      questionsContainer.classList.add("hide");
      feedbackMessage.classList.add("hide");
      endScreen.classList.remove("hide");
    }
  }, 1000);
}

// Set the score based on the seconds left from the timer
function setScore() {
  score = secondsLeft;
  finalScoreElement.textContent = score;
}

// Set submit info into local storage
function submit() {
  const userInitials = initialsInput.value.toUpperCase();
  const storedScores = localStorage.getItem("score");
  let oldScoreList;

  if (storedScores !== null) {
    oldScoreList = JSON.parse(storedScores);
  } else {
    oldScoreList = [];
  }

  if (userInitials === "") {
    submitMessageElement.textContent = "Please enter your initials";
  } else {
    submitMessageElement.textContent = "Successfully submitted";
    oldScoreList.push({
      initials: userInitials,
      score: score,
    });

    // Prevent user from submitting more than once
    submitButton.disabled = true;

    // Redirect to highscores page
    setTimeout(function () {
      window.location.href = "highscores.html";
    }, 1000);
  }

  localStorage.setItem("score", JSON.stringify(oldScoreList));
}

// Event listener for 'submit' button
submitButton.addEventListener("click", submit);
