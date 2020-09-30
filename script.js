$(document).ready(function () {
  //variables
  var currentQuestion = 0;
  var correctAnswers = 0;
  var timer = 60;
  var clock;
  var questions = [
    {
      question: "1. How do you write 'Hello' in an alert box?",
      choices: [
        "msg('Hello')",
        "msgBox('Hello');",
        "alertBox('Hello');",
        "alert('Hello');",
      ],
      correctAnswer: 3,
    },
    {
      question: "2. How do you empty an array in JavaScript?",
      choices: [
        "arrayList[]",
        "arrayList(0)",
        "arrayList.length=0",
        "arrayList.len(0)",
      ],
      correctAnswer: 2,
    },
    {
      question:
        "3. What function to add an element at the begining of an array and one at the end?",
      choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
      correctAnswer: 1,
    },
    {
      question:
        "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
      choices: ["undefined", "0", "prints nothing", "Syntax error"],
      correctAnswer: 0,
    },
    {
      question:
        "5. What would following code return? console.log(typeof typeof 1);",
      choices: ["string", "number", "Syntax error", "undefined"],
      correctAnswer: 0,
    },
    {
      question: "6. Which software company developed JavaScript?",
      choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
      correctAnswer: 1,
    },
  ];

  // Function that starts the quiz onclick
  $("#startbtn").click(function () {
    clock = startTimer();
    initGame();
  });

  function initGame() {
    askQuestion();
  }

  function askQuestion() {
    clearScreen();
    if (currentQuestion >= questions.length) {
      endGameAndDisplayScore();
      return;
    }
    displayQuestion(currentQuestion);
    console.log("This is the ask question: " + currentQuestion);
    getAnswerForQuestion(currentQuestion);
  }

  function getAnswerForQuestion() {
    console.log("get answer : " + currentQuestion);
    // $(".choiceList").on("click", "button.answerBtn", function () {
    $(".answerBtn").click(function () {
      var val = $(this).val(); //val is the index num. of the currentQuestion answer choice
      if (val == questions[currentQuestion].correctAnswer) {
        correctAnswers++;
      }
      console.log("this is the current question " + currentQuestion);
      currentQuestion++;
      askQuestion();
    });
  }

  function displayQuestion() {
    console.log("display " + currentQuestion);
    var question = questions[currentQuestion].question;
    $(".question").text(question);
    $(".question").show();
    displayChoicesForQuestion(currentQuestion);
  }

  function clearScreen() {
    //hide the quiz descrip/start button content when they press start
    $(".default").hide();
    $(".question").hide();
    // Remove all current <li> elements (if any)
    $(".choiceList").find("li").remove(); 
  }

  function displayChoicesForQuestion() {
    // display choices
    var numChoices = questions[currentQuestion].choices.length;
    var choice;
    for (var index = 0; index < numChoices; index++) {
      choice = questions[currentQuestion].choices[index];
      choiceList = $(".choiceList");
      $(
        '<li><button type="button" value= ' +
          index +
          ' class="answerBtn">' +
          choice +
          "</button></li>"
      ).appendTo(choiceList);
    }
  }

  function endGameAndDisplayScore() {
    clearInterval(clock);
    displayScore();
    $("#timer").html("0");
  }

  function startTimer() {
    $("#timer").text("Timer: " + 60);
    clock = setInterval(function () {
      timer--;
      if (timer >= 0) {
        $("#timer").text("Timer: " + timer); //selecting this div class + setting the text
      } // and showing timer counting down
      if (timer === 0) {
        displayScore();
        $("#timer").html("0");
        clearInterval(timer);
      }
    }, 1000);
    return clock;
  }

    function displayScore() {
    var finalScore = correctAnswers * 10;
        $(".result").text("You scored: " + finalScore + " points");
        showSubmit();
    }

});




function hideScore() {
  $(".result").hide();
}

function resetQuiz() {
  correctAnswers = 0;
  hideScore();
}

function showSubmit() {
    var submitForm = $("<div class='initialForm'><form><label>Initials: </label><input type='text' id='initials'><br><br><input type='submit'></form></div>");
    $('.result').append(submitForm);
    $("form").submit(function (event) {
      event.preventDefault();
        var initials = $("input").val();
        console.log(initials);
      if (initials.length === 2 && isNaN(initials) === true) {
          showHighscorePage();
      } else {
        return;
      }
    });
}

function showHighscorePage() {
    $(".default").hide();
    $(".question").hide();
    $(".result").hide();
    
    console.log(finalScore);
    result = {initials, finalScore};

    highscore = [];

    highscore.push(result);

    highscore.sort(function (a, b) {
      return a.finalScore - b.finalScore;
    });

    let hsTable = $("#highscores");

    window.localStorage.setItem("highscore", JSON.stringify(highscore));

    let retrievedScores = JSON.parse(window.localStorage.getItem("highscore"));

    for (let i = 0; i < 5; i++) {
      hsTable.innerHTML +=
        "<tr><td>" +
        retrievedScores[i].initials +
        "</td><td>" +
        retrievedScores[i].finalScore +
        "</td></tr>";
    }
}

// let result = { userName: initials, score: finalScore };

// let highscore = [];

// highscore.push(result);

// highscore.sort(function (a, b) {
//   return a.finalScore - b.finalScore;
// });

// let hsTable = $("#highscores");

// window.localStorage.setItem("highscore", JSON.stringify(highscore));

// let retrievedScores = JSON.parse(window.localStorage.getItem("highscore"));

// for (let i = 0; i < 5; i++) {
//   hsTable.innerHTML +=
//     "<tr><td>" +
//     retrievedScores[i].userName +
//     "</td><td>" +
//     retrievedScores[i].score +
//     "</td></tr>";
// }


// CLEAR STORAGE \\
// localStorage.clear();