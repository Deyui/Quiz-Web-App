const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the name of the towns' mascot?",
        choice1: 'Tippy',
        choice2: 'Anko',
        choice3: 'Kigumin',
        choice4: 'Beatrice',
        answer: 3,
    },
    {
        question:
            "Which of the following coffee or tea did not inspire a character name?",
        choice1: "Jogmaya",
        choice2: "Columbian ",
        choice3: "Thé des Alizés",
        choice4: "Mandheling Coffee",
        answer: 2,
    },
    {
        question: "How many times was Sharo inebriated with coffee?",
        choice1: "1 time",
        choice2: "2 times",
        choice3: "3 times",
        choice4: "4 times",
        answer: 4,
    },
    {
        question: "What was the thing that Cocoa mistook as a lion on Chino's wood-carved photo frame?",
        choice1: 'Sunflower',
        choice2: 'Tiger',
        choice3: 'Dandelions',
        choice4: 'Sun',
        answer: 3,
    },
    {
        question: "How tall is Rize?",
        choice1: '159 cm',
        choice2: '160 cm',
        choice3: '161 cm',
        choice4: '163 cm',
        answer: 2,
    },
    {
        question: "Because of whom did Chiya start making strange menú names?",
        choice1: 'Aoyama Blue Mountain',
        choice2: "Chiya's Grandmother",
        choice3: 'Kirima Syaro',
        choice4: "Chino's Grandfather",
        answer: 3,
    },
    {
        question: "In the back cover of Volume 1, who is the character the 2nd from left?",
        choice1: 'Cocoa',
        choice2: "Chino",
        choice3: 'Rize',
        choice4: "Chiya",
        answer: 3,
    },
    {
        question: "In S1 Ep 4, what were Cocoa's score on her Japanese test?",
        choice1: '32',
        choice2: "7",
        choice3: '18',
        choice4: "23",
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
var WRONG = 0;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || WRONG >= 100){
      //go to end pages
      return window.location.assign("index.html");
    }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() *availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedName = e.target.className;
    const str1 = "divs";
    const selectedAnswer = selectedChoice.dataset["number"];


    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    var element = document.getElementsByClassName("choice-text")[currentQuestion.answer-1];
    var divs0 = document.getElementById("pink");
    var divs1 = document.getElementById("blue");
    var divs2 = document.getElementById("purple");
    var divs3 = document.getElementById("green");
    var divstwo = document.getElementsByClassName("choice-prefix");
    var two = document.getElementsByClassName("choice-prefix")[currentQuestion.answer-1];


    if(selectedAnswer != currentQuestion.answer) {
      WRONG ++;
      element.classList.add("correct");
      divs0.classList.add('newclass');
      divs1.classList.add('newclass');
      divs2.classList.add('newclass');
      divs3.classList.add('newclass');
      for (var i = 0; i < 4; i++){
        divstwo[i].classList.add('newclass');
      }
      element.parentElement.classList.remove('newclass');
      two.classList.remove('newclass');
    }

    selectedChoice.classList.add(classToApply);

    setTimeout( () => {
      selectedChoice.classList.remove(classToApply);
      element.classList.remove("correct");
      divs0.classList.remove('newclass');
      divs1.classList.remove('newclass');
      divs2.classList.remove('newclass');
      divs3.classList.remove('newclass');
      for (var i = 0; i < 4; i++){
        divstwo[i].classList.remove('newclass');
      }
      getNewQuestion();
    }, 500);
  });
});

startGame();
