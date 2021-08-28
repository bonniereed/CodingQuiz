//defining variables with query selectors from HTML
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var multipleEl = document.querySelector(".multipleChoice");
var scoreEl = document.querySelector("#results");
var score = document.querySelector("#score");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector("#reset-button");
var notice = document.querySelector("#large-notice");
var questionArea = document.querySelector("#questionArea");
var submitScore = document.querySelector(".save");
var finalScore = document.querySelector("#finalScore");
var actualTime = document.querySelector("actualTime");
var save = document.querySelector("#save");
var form = document.querySelector("#form");
//defining variables for use in code
var timer;
var timerCount = 60;
var questionNum = 0;
var scoreVal = 0;

//Hides form data until end of quiz
form.setAttribute("style", "visibility:hidden");

console.log(`init: scoreVal is ${scoreVal} and questionNum is ${questionNum}`);

// Array of questions and answers
var questions = [
  {
    questionText: "Inside which HTML element do we put the JavaScript?",
    answerValue: "B",
    choiceA: "&lt;javascript&gt;",
    choiceB: "&lt;script&gt;",
    choiceC: "&lt;scripting&gt;",
    choiceD: "&lt;js&gt;",
  },
  {
    questionText: "Which event occurs when the user clicks on an HTML element?",
    answerValue: "C",
    choiceA: "mouseover",
    choiceB: "onmouseclick",
    choiceC: "onclick",
    choiceD: "onchange",
  },
  {
    questionText: "What does HTML stand for?",
    answerValue: "B",
    choiceA: "Hyperlinks and Text Markup Language",
    choiceB: "Hyber Text Markup Language",
    choiceC: "Home Tool Markup Language",
    choiceD: "Hypo Text Makeup Language",
  },
  {
    questionText: "Which operator is used to assign a variable?",
    answerValue: "C",
    choiceA: "+",
    choiceB: "-",
    choiceC: "=",
    choiceD: "*",
  },
  {
    questionText: "Choose the correct HTML element for the largest heading:",
    answerValue: "D",
    choiceA: " &lt;h6&gt;",
    choiceB: " &lt;heading&gt;",
    choiceC: " &lt;head&gt;",
    choiceD: "&lt;h1&gt; ",
  },
  {
    questionText:
      "What is the correct HTML element for inserting a line break?",
    answerValue: "C",
    choiceA: "&lt;lb&gt;",
    choiceB: "&lt;pd&gt; ",
    choiceC: "&lt;br&gt; ",
    choiceD: "&lt;break&gt; ",
  },
  {
    questionText: "What does CSS stand for?",
    answerValue: "B",
    choiceA: "Colorful Style Sheets",
    choiceB: "Cascading Style Sheets",
    choiceC: "Creative Style Sheets",
    choiceD: "Computer Style Sheets",
  },
  {
    questionText: "Which HTML tag is used to define an internal style sheet?",
    answerValue: "D",
    choiceA: "&lt;attribute&gt;",
    choiceB: "&lt;script&gt;",
    choiceC: "&lt;css&gt;",
    choiceD: "&lt;style&gt;",
  },
  {
    questionText: "Which HTML attribute is used to define inline styles?",
    answerValue: "B",
    choiceA: "styles",
    choiceB: "style",
    choiceC: "font",
    choiceD: "class",
  },
  {
    questionText: "Which property is used to change the background color?",
    answerValue: "A",
    choiceA: "background-color",
    choiceB: "bgcolor",
    choiceC: "background-image",
    choiceD: "color",
  },
];

//function that cycles through each question and answer from the array listed above
function setStage() {
  choiceA.innerHTML = questions[questionNum].choiceA;
  choiceB.innerHTML = questions[questionNum].choiceB;
  choiceC.innerHTML = questions[questionNum].choiceC;
  choiceD.innerHTML = questions[questionNum].choiceD;
  questionArea.innerHTML = questions[questionNum].questionText;
  score.innerHTML = scoreVal;
  console.log(
    `Set Stage: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
  );
}
//function to fill question and answer boxes and prompts user to submit their score!
function gameOver() {
  choiceA.innerHTML = "🧁";
  choiceB.innerHTML = "🧁";
  choiceC.innerHTML = "🧁";
  choiceD.innerHTML = "🧁";
  questionArea.innerHTML = "Submit your score!";
  score.innerHTML = scoreVal;
  localSave();
  console.log(
    `Set Stage: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
  );
}

//function that verifies whether or not the answer given is correct
function checkAnswer(buttonPressed) {
  if (questionNum < questions.length) {
    //if statement that validates whether the answer is correct increments the score value and moves on the the next question.
    if (questions[questionNum].answerValue === buttonPressed) {
      console.log(
        `Check Answer Block 1: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
      );
      scoreVal++;
      questionNum++;
      setStage();
      //else statement that validates whether the answer is incorrect and subtracts 10 seconds from the timer and moves on to the next question.
    } else {
      console.log(
        `Check Answer Block 2: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
      );
      questionNum++;
      setStage();
    }
    //else statement to stop game and prompt use to submit their score to local storage!
  } else {
    if (questions[questionNum - 1].answerValue === buttonPressed) {
      scoreVal++;
      gameOver();
      console.log(
        `Check Answer Block 3: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
      );
    } else {
      gameOver();
    }
  }
}

// The startGame function is called when the start button is clicked
function startGame() {
  console.log(
    `Start Game: scoreVal is ${scoreVal} and questionNum is ${questionNum}`
  );
  // enableButtons();
  startTimer();
  // Prevents start button from being clicked when round is in progress
  // startButton.disabled = true;
  setStage();
}
//Function that sets the timer interval
function startTimer() {
  // Sets timer to decrement
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    //if statement that stops the timer when timer is set to greater than zero
    if (timerCount >= 0) {
      //If statement that stops the timer once the user reaches the end of the quiz
      if (questionNum >= questions.length && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        localSave();
        // disableButtons();
      }
    }
    //If statement that verifies if time has run out
    if (timerCount === 0) {
      // Clears interval
      localSave();
      clearInterval(timer);
      disableButtons();
    }
  }, 1000);
}
//function that shows the form to submit at the end of the quiz.
function localSave() {
  form.setAttribute("style", "visibility:visible");
}
//function that uses input to store local data including total score and initials
function setLocalStorage(event) {
  event.preventDefault();
  localStorage.setItem("Correct answers", scoreVal);
  localStorage.setItem("Initials", document.getElementById("initials").value);
}

//Function to disable buttons
function disableButtons() {
  choiceA.disabled = true;
  choiceB.disabled = true;
  choiceC.disabled = true;
  choiceD.disabled = true;
}
//Function to enable buttons
function enableButtons() {
  choiceA.disabled = false;
  choiceB.disabled = false;
  choiceC.disabled = false;
  choiceD.disabled = false;
}

//function that resets the game by refreshing the page
function resetGame() {
  location.reload();
}

// Attaches event listener to each button listed
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
save.addEventListener("click", function () {
  setLocalStorage(event);
});
choiceA.addEventListener("click", function () {
  checkAnswer("A");
});
choiceB.addEventListener("click", function () {
  checkAnswer("B");
});
choiceC.addEventListener("click", function () {
  checkAnswer("C");
});
choiceD.addEventListener("click", function () {
  checkAnswer("D");
});
