// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "Tony Stark is....",
        imgSrc: "img/iron_man.png",
        choiceA: "Iron Man",
        choiceB: "Thor",
        choiceC: "War Machine",
        correct: "A"
    }, {
        question: "How did Steve Rogers become Captain America?",
        imgSrc: "img/captain_america.png",
        choiceA: "From a radioactive spider",
        choiceB: "From a super soldier serum",
        choiceC: "From a gamma explosion",
        correct: "B"
    }, {
        question: "Who does Bruce Banner turn into?",
        imgSrc: "img/hulk.png",
        choiceA: "Thor",
        choiceB: "Abomination",
        choiceC: "Hulk",
        correct: "C"
    }, {
        question: "What is Black Widow's real name?",
        imgSrc: "img/black_widow.png",
        choiceA: "Claire Voyant",
        choiceB: "Natasha Romanoff",
        choiceC: "Yelena Belova",
        correct: "B"
    }, {
        question: "Where does Thor come from?",
        imgSrc: "img/thor.png",
        choiceA: "Asgard",
        choiceB: "Alfheim",
        choiceC: "Jotunheim",
        correct: "A"
    }, {
        question: "Who is Clint Barton better known as?",
        imgSrc: "img/hawkeye.png",
        choiceA: "Goliath",
        choiceB: "Hawkeye",
        choiceC: "Ronin",
        correct: "B"
    }, {
        question: "Who is Sam Wilson?",
        imgSrc: "img/falcon.png",
        choiceA: "Black Panther",
        choiceB: "Falcon",
        choiceC: "War Machine",
        correct: "B"
    }, {
        question: "Who created Vision in Avengers: Age of Ultron?",
        imgSrc: "img/vision.png",
        choiceA: "Tony Stark",
        choiceB: "Hank Pym",
        choiceC: "Bruce Banner",
        correct: "A"
    }, {
        question: "Where does T'Challa (Black Panther) come from?",
        imgSrc: "img/black_panther.png",
        choiceA: "Wakanda",
        choiceB: "Latervia",
        choiceC: "Symkaria",
        correct: "A"
    }, {
        question: "Who is this hero?",
        imgSrc: "img/war_machine.png",
        choiceA: "Ant-Man",
        choiceB: "Iron Man",
        choiceC: "War Machine",
        correct: "C"
    }, {
        question: "What is Spider-Man's memorable quote",
        imgSrc: "img/spider-man.png",
        choiceA: "I Can Do This All Day!",
        choiceB: "With Great Power Comes Great Responsibility",
        choiceC: "Genius, Billionaire, Playboy, Philanthropist",
        correct: "B"
    }, {
        question: "Where does Carol Danvers (Captain Marvel) get her powers from?",
        imgSrc: "img/captain_marvel.png",
        choiceA: "The Chitauri",
        choiceB: "The Kree",
        choiceC: "The Skrulls",
        correct: "B"
    }, {
        question: "Who is the orignal Ant-Man?",
        imgSrc: "img/ant-man.png",
        choiceA: "Hank Pym",
        choiceB: "Scott Lang",
        choiceC: "Eric O'Grady",
        correct: "A"
    }, {
        question: "What is Doctor Strange's main alias?",
        imgSrc: "img/doctor_strange.png",
        choiceA: "Master of the Mystic Arts",
        choiceB: "Master of Black Magic",
        choiceC: "Sorcerer Supreme",
        correct: "C"
    }, {
        question: "Who is the orignal Wasp?",
        imgSrc: "img/wasp.png",
        choiceA: "Hope Pym",
        choiceB: "Janet van Dyne",
        choiceC: "Nadia van Dyne",
        correct: "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
