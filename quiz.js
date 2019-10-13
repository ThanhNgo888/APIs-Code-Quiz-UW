const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;//score starts at zero
let questionCounter = 0;//what question r u on
let availableQuestions = [];

let questions = [];
fetch("question.json")
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(loadedQuestions =>{
        console.log(loadedQuestions);
    });

// Constants
const CORRECT_BONUS =10;
const MAX_QUESTIONS =3;

startGame = () =>{
    questionCounter = 0;//make sure start at 0
    score = 0;

    //copy in all the questions from the questions array
    //put it in availableQuestions array
    //take this array spread out each of its items and
    //put them into a new array
    availableQuestions = [...questions];
    //console.log(availableQuestions);

    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);

        //go to the end page 
        return window.location.assign("/end.html");
    }

    questionCounter++;
    // progessText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    //progressText.innerText = 'Question ${questionCounter}/${MAX_QUESTIONS}';


    //questionCounterText.innerText = "${questionCounter}/${MAX_QUESTIONS}";
    progressText.innerText = "Question" + questionCounter + "/" + MAX_QUESTIONS;

    //Update the progress bar
    progressBarFull.style.width = '${(questionCounter / MAX_QUESTIONS) * 100)}%';


    //Math.random() => will give a decimal number between 0 and 1
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        //console.log(e.target);
        if(!acceptingAnswers)return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // const classToApply = 'incorrect';
        //     if(selectedAnswer == currentQuestion.answer){
        //         classToApply = 'correct';
        //     }

        const classToApply = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect';
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        // console.log(selectedAnswer == currentQuestion.answer);
        console.log(classToApply);

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    }
startGame();

