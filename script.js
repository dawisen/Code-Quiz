    // function nextQuestion() {
    //     if (questionIndex < questions.length) {
    //         questionIndex++;
    //     }
    //     $("#main").html(questions[questionIndex]);
    //     $("#answerbtn").click(function () {
    //         console.log(3);
    //         nextQuestion();
    //         console.log(4);
    //     });
    
    //     console.log("index num = ", questionIndex);
    // }


// Added these div classes to organize the question contents \\
/* <div class="question"></div>
<ul class="choiceList"></ul>
<div class="quizMessage"></div>
<div class="result"></div> */

$(document).ready(function () {
    //variables
    var currentQuestion = 0;
    var correctAnswers = 0;
    var timer = 60;
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
            question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
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
        }
    ];
    var mySelectedAnswer = [];

    // Function that starts the quiz onclick
    $("#startbtn").click(function () {
        $("#timer").text("Timer: " + 60);
        startTimer();
        displayCurrentQuestion();
        
        if (currentQuestion < questions.length) {
            $(".choiceList").on("click", "button.answerBtn", function () {
                console.log(currentQuestion);
                var val = $(".answerBtn").val(); //val is the index num. of the currentQuestion answer choice
                currentQuestion++;
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                mySelectedAnswer[currentQuestion] = val;
                displayCurrentQuestion();     
                });
        }
        else {
            displayScore();
            $("#timer").html("You scored: " + correctAnswers);
            // quizOver = true;
        }

    });
    // When you click an answer button, it takes you to the next question
  
    function startTimer() {
        setInterval(function () {
            timer--;
            if (timer >= 0) {
                $("#timer").text("Timer: " + timer); //selecting this div class + setting the text
            }                                        // and showing timer counting down   
            if (timer === 0) {
                displayScore();
                $("#timer").html(
                    "You scored: " + correctAnswers + " out of: " + questions.length
                );
            }
            if (timer === 0) {
                clearInterval(timer);
            }
            
        }, 1000);
       
    }

    function displayCurrentQuestion() {
        var question = questions[currentQuestion].question;
        var questionClass = $(".question");
        var choiceList = $(".choiceList");
        var numChoices = questions[currentQuestion].choices.length;
            //hide the quiz descrip/start button content when they press start
        $(".default").hide();
            // Set the questionClass text to the current question
            $(questionClass).text(question);
            // Remove all current <li> elements (if any)
            $(choiceList).find("li").remove();
            var choice;
	
	
            for (index = 0; index < numChoices; index++) {
                choice = questions[currentQuestion].choices[index];
		
                if (mySelectedAnswer[currentQuestion] == index) {
                    $('<li><button type="button" value= ' + index + ' class="answerBtn">' + choice + '</button></li>').appendTo(choiceList);
                }
                else {
                    $('<li><button type="button" value= ' + index + ' class="answerBtn">' + choice + '</button></li>').appendTo(choiceList);
                }
            }
    
    }

    
    function displayScore() {
        $(".result").text("You scored: " + correctAnswers + " points");
        // $(document).find(".container-fluid > .result").show();
    }

    


})


function hideScore() 
    {
    $(".result").hide();
    }

function resetQuiz()
    {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    }