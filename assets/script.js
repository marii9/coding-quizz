var timeEl = document.querySelector("h2.time");
var  secondsLeft = 50;
var scoreEl = document.querySelector("#score");



var introEl = document.querySelector("#intro");



var questionsEl = document.querySelector("#questions");

var questionEl = document.querySelector("#question");
var questionCount = 0;

var yaynayEl = document.querySelector("#yaynay");


var finalEl = document.querySelector("#final");

var initialsInput = document.querySelector("#initials");


var  highscoresEl = document.querySelector("#highscores");

var scoreListEl = document.querySelector("#score-list");

var scoreList = [];



var startBtn = document.querySelector("#start");

var ansBtn = document.querySelectorAll("button.ansBtn")

var ans1Btn = document.querySelector("#answer1");

var ans2Btn = document.querySelector("#answer2");

var ans3Btn = document.querySelector("#answer3");

var ans4Btn = document.querySelector("#answer4");

var submitScrBtn = document.querySelector("#submit-score");

var goBackBtn = document.querySelector("#goback");

var clearScrBtn = document.querySelector("#clearscores");

var viewScrBtn = document.querySelector("#view-scores");


var questions = [ 
    {
        
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
       
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "2"
    },
    {
       
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2 "
    },
    {
       
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];





function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}


function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}


function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}


function checkAnswer(event) {
    event.preventDefault();

    
    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

    
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    
    if (questionCount < questions.length) {
        questionCount++;
    }
    
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (var i = 0; i < scoreList.length; i++) {
       var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

  
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    
   var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}


function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}


startBtn.addEventListener("click", startQuiz);


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


submitScrBtn.addEventListener("click", addScore);


goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 50;
    timeEl.textContent = `Time:${secondsLeft}s`;
});


clearScrBtn.addEventListener("click", clearScores);


viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("There are no scores currently :(");
    }
});