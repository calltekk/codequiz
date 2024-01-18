// Initialize DOM elements
const highscoresElement = document.getElementById("highscores");
const clearButton = document.getElementById("clear");

// Check results from local storage
function getResults() {
  const storedResults = localStorage.getItem("score");

  if (storedResults !== null) {
    const resultsArray = JSON.parse(storedResults);
    displayHighscores(resultsArray);
  }
}

// Display results as list items
function displayHighscores(resultsArray) {
  resultsArray.forEach(function (result) {
    const listItem = document.createElement("li");
    listItem.textContent = `Name: ${result.initials} / Score: ${result.score}`;
    highscoresElement.appendChild(listItem);
  });
}

// Clear local storage and scoreboard
function clearResults() {
  localStorage.clear();

  if (highscoresElement) {
    while (highscoresElement.firstChild) {
      highscoresElement.removeChild(highscoresElement.firstChild);
    }
  }
}

// Call results and add event listener to 'clear button'
getResults();
clearButton.addEventListener("click", clearResults);
