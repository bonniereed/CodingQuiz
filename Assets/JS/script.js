
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var choiceD = document.querySelector("#choiceD");
var multipleEl = document.querySelector(".multipleChoice")
var scoreEl= document.querySelector("#results")
var score = document.querySelector("#score");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector("#reset-button");
var notice = document.querySelector("#large-notice")
var questionArea = document.querySelector("#questionArea");
var submitScore =document.querySelector(".save");
var studentInitials = document.querySelector("#initials");
var finalScore = document.querySelector("#finalScore");
var save = document.querySelector("#save");
var timer;
var timerCount = 60;
var questionNum = 0;
var scoreVal = 0;

console.log(`init: scoreVal is ${scoreVal} and questionNum is ${questionNum}`)


// Array of words the user will guess
var questions = [
  {
    "questionText": "Inside which HTML element do we put the JavaScript?",
    "answerValue": "B",
    "choiceA": "&lt;javascript&gt;",
    "choiceB": "&lt;script&gt;",
    "choiceC": "&lt;scripting&gt;",
    "choiceD": "&lt;js&gt;"
  },
  {
    "questionText": "Which event occurs when the user clicks on an HTML element?",
    "answerValue": "C",
    "choiceA": "mouseover",
    "choiceB": "onmouseclick",
    "choiceC": "onclick",
    "choiceD": "onchange"
  },
  {
    "questionText": "What does HTML stand for?",
    "answerValue": "B",
    "choiceA": "Hyperlinks and Text Markup Language",
    "choiceB": "Hyber Text Markup Language",
    "choiceC": "Home Tool Markup Language",
    "choiceD": "Hypo Text Makeup Language"
  },
  {
    "questionText": "Which operator is used to assign a variable?",
    "answerValue": "C",
    "choiceA": "+",
    "choiceB": "-",
    "choiceC": "=",
    "choiceD": "*"
  },
  {
    "questionText": "Choose the correct HTML element for the largest heading:",
    "answerValue": "D",
    "choiceA": " &lt;h6&gt;",
    "choiceB": " &lt;heading&gt;",
    "choiceC": " &lt;head&gt;",
    "choiceD": "&lt;h1&gt; "
  },
  {
    "questionText": "What is the correct HTML element for inserting a line break?",
    "answerValue": "C",
    "choiceA": "&lt;lb&gt;",
    "choiceB": "&lt;pd&gt; ",
    "choiceC": "&lt;br&gt; ",
    "choiceD": "&lt;break&gt; "
  },
  {
    "questionText": "What does CSS stand for?",
    "answerValue": "B",
    "choiceA": "Colorful Style Sheets",
    "choiceB": "Cascading Style Sheets",
    "choiceC": "Creative Style Sheets",
    "choiceD": "Computer Style Sheets"
  },
  {
    "questionText": "Which HTML tag is used to define an internal style sheet?",
    "answerValue": "D",
    "choiceA": "&lt;attribute&gt;",
    "choiceB": "&lt;script&gt;",
    "choiceC": "&lt;css&gt;",
    "choiceD": "&lt;style&gt;"
  },
  {
    "questionText": "Which HTML attribute is used to define inline styles?",
    "answerValue": "B",
    "choiceA": "styles",
    "choiceB": "style",
    "choiceC": "font",
    "choiceD": "class"
  },
  {
    "questionText": "Which property is used to change the background color?",
    "answerValue": "A",
    "choiceA": "background-color",
    "choiceB": "bgcolor",
    "choiceC": "background-image",
    "choiceD": "color"
  }

]

function setStage(){
  choiceA.innerHTML=questions[questionNum].choiceA;
  choiceB.innerHTML=questions[questionNum].choiceB;
  choiceC.innerHTML=questions[questionNum].choiceC;
  choiceD.innerHTML=questions[questionNum].choiceD;
  questionArea.innerHTML=questions[questionNum].questionText;
  score.innerHTML=scoreVal;
  console.log(`Set Stage: scoreVal is ${scoreVal} and questionNum is ${questionNum}`)
}

function checkAnswer(buttonPressed) {
  if (questionNum <= questions.length) {
    if (questions[questionNum].answerValue === buttonPressed) {
      console.log(`Check Answer Block 1: scoreVal is ${scoreVal} and questionNum is ${questionNum}`)
      scoreVal++;
      questionNum++;
      setStage();
    }
  }else {
    console.log(`Check Answer Block 2: scoreVal is ${scoreVal} and questionNum is ${questionNum}`)
    totalScore();
  }
}

// The startGame function is called when the start button is clicked
function startGame() {
  console.log(`Start Game: scoreVal is ${scoreVal} and questionNum is ${questionNum}`)
  // enableButtons();
  startTimer();
  // Prevents start button from being clicked when round is in progress
  // startButton.disabled = true;
  setStage();
}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (questionNum >= questions.length && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        // disableButtons();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // disableButtons();
    }
  }, 1000);
}

function disableButtons() {
  choiceA.disabled = true;
  choiceB.disabled = true;
  choiceC.disabled = true;
  choiceD.disabled = true;
}
function enableButtons() {
  choiceA.disabled = false;
  choiceB.disabled = false;
  choiceC.disabled = false;
  choiceD.disabled = false;
}

function saveLastGrade() {
  // Save related form data as an object
  var studentGrade = {
    initials: initials.value,
    score: finalScore.value,
  };
}
  function renderLastGrade() {
    // Use JSON.parse() to convert text to JavaScript object
    var lastGrade = JSON.parse(localStorage.getItem("finalScore"));
    // Check if data is returned, if not exit out of the function
    if (lastGrade !== null) {
    document.getElementById("initials").innerHTML = lastGrade.student;
    document.getElementById("finalScore").innerHTML = lastGrade.grade;
    } else {
      return;
    }
  }
  
  save.addEventListener("click", function(event) {
  event.preventDefault();
  saveLastGrade();
  renderLastGrade();
  });

function resetGame() {
  // Resets win and loss counts by refreshing the page
  location.reload();
}
// Attaches event listener to button
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame); 
choiceA.addEventListener("click", function(){checkAnswer("A")});
choiceB.addEventListener("click", function(){checkAnswer("B")});
choiceC.addEventListener("click", function(){checkAnswer("C")});
choiceD.addEventListener("click", function(){checkAnswer("D")});
