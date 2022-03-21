let questions = [
    {
        "question": "Welche Mannschaft hat 1993, 1994 und 1996 das American Football Superbowl gewonnen?",
        "answer-1": "Seattle Seahawks",
        "answer-2": "Baltimore Ravens",
        "answer-3": "Dallas Cowboys",
        "answer-4": "Green Bay Packers",
        "right-answer": 3
    },
    {
        "question": "Welches Sportspiel hat James Naismith 1891 erfunden?",
        "answer-1": "Basketball",
        "answer-2": "Tennis",
        "answer-3": "Volleyball",
        "answer-4": "Fußball",
        "right-answer": 1
    },
    {
        "question": "Wie viele Spieler gibt es in einem olympischen Curling-Team?",
        "answer-1": "Vier",
        "answer-2": "Fünf",
        "answer-3": "Acht",
        "answer-4": "Zwei",
        "right-answer": 1
    },
    {
        "question": "Der Kanadier Connor McDavid ist ein aufstrebender Star in welchem ​​Sport?",
        "answer-1": "Eishockey",
        "answer-2": "Motoball",
        "answer-3": "Mixed Martial Arts",
        "answer-4": "American Football",
        "right-answer": 1
    },
    {
        "question": "Wo fanden 1930 die Commonwealth Games statt?",
        "answer-1": "Texas, USA",
        "answer-2": "Melbourne, Australia",
        "answer-3": "Birmingham, England",
        "answer-4": "Hamilton, Kanada",
        "right-answer": 4
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let soundSuccess = new Audio('sounds/success.mp3');
let soundDanger = new Audio('sounds/danger.mp3');
let soundEnd = new Audio('sounds/end.mp3');


function init() {
    document.getElementById('question-number').innerHTML = questions.length;
    showNext();
}


function showNext() {
    if (gameIsOver()) {
        showEndscreen();
    }
    else {
        showQuestion();
    }
    progressBar();
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showQuestion() {
    enableAnswers();
    let question = questions[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('question').innerHTML = question["question"];
    document.getElementById('answer-1').innerHTML = question["answer-1"];
    document.getElementById('answer-2').innerHTML = question["answer-2"];
    document.getElementById('answer-3').innerHTML = question["answer-3"];
    document.getElementById('answer-4').innerHTML = question["answer-4"];
}


function showEndscreen() {
    soundEnd.play();
    document.getElementById('endscreen').style = '';
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('endscreen-question-number').innerHTML = questions.length;
    document.getElementById('right-answers-number').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/Group 5.png';
}


function answer(selection) {
    if (rightAnswerSelected(selection)) {
        answerRight(selection);
    }
    else {
        answerFalse(selection);
    }
    document.getElementById('next-button').disabled = false;
    disableAnswers();
}


function rightAnswerSelected(selection) {
    let question = questions[currentQuestion];
    return selection == question["right-answer"];
}


function progressBar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


function answerRight(selection) {
    soundSuccess.play();
    document.getElementById('card-answer-' + selection).classList.add('bg-success');
    rightQuestions++;
}


function answerFalse(selection) {
    soundDanger.play();
    let question = questions[currentQuestion];
    document.getElementById('card-answer-' + selection).classList.add('bg-danger');
    document.getElementById('card-answer-' + question["right-answer"]).classList.add('bg-success');
}


function nextQuestion() {
    currentQuestion++;
    showNext();
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
}


function resetAnswerButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('card-answer-' + i).classList.remove('bg-danger');
        document.getElementById('card-answer-' + i).classList.remove('bg-success');
    }
}


function enableAnswers() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('card-answer-' + i).disabled = false;
    }
}


function disableAnswers() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('card-answer-' + i).disabled = true;
    }
}


function restartGame() {
    document.getElementById('header-image').src = 'img/card-pic.jpg';
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('endscreen').style = 'display: none';
    document.getElementById('question-body').style = '';
    init();
}