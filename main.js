'use strict';

const placeForWarning = document.querySelector('.button');

const option1 = document.querySelector('.option1'),
option2 = document.querySelector('.option2'),
option3 = document.querySelector('.option3'),
option4 = document.querySelector('.option4'),
optionsElements = document.querySelectorAll('.option');

const question = document.querySelector('#question'), 
numberOfQuestion = document.querySelector('#number-of-question'), 
numberOfAllQuestions = document.querySelector('#number-of-all-questions'); 

let indexOfQuestion, 
indexOfPage = 0; 

const answersTracker = document.querySelector('#answers-tracker'); 

const btnNext  = document.querySelector('#btn-next');
let btnPress;
const warning = document.createElement('div');

let score = 0; 

const overModal = document.querySelector('.quiz-over-modal'),
      correctAnswer = document.querySelector('#correct-answer'),
      numberOfAllQestions2 = document.querySelector('#number-of-all-questions-2'),
      btnTryAgain = document.querySelector('#btn-try-again');

const questions = [
    {
        question: 'What was the name of the prince who baptized Kievan Rus?',
        options: [
            'Princess Olga',
            'Volodymyr Monomakh',
            'Volodymyr the Great',
            'Yaroslav the Wise'
        ],
        rightAnswer: 2
    },
    {
        question: 'In what year was the Act of Independence of Ukraine adopted?',
        options: [
            '2001',
            '1991',
            '1998',
            '1996'
        ],
        rightAnswer: 1
    },
    {
        question: 'In what year was the Ukrainian Insurgent Army created?',
        options: [
            '2007',
            '2014',
            '1939',
            '1942'
        ],
        rightAnswer: 3
    }, 
    {
        question: 'Which of Taras Shevchenko works was translated into 147 languages?',
        options: [
            'Kobzar',
            'The Caucasus',
            'A Dream',
            'I Was Thirteen'
        ],
        rightAnswer: 0
    },
];
numberOfAllQuestions.textContent = questions.length;

const load = () => {
    question.textContent = questions[indexOfQuestion].question;

    option1.textContent = questions[indexOfQuestion].options[0];
    option2.textContent = questions[indexOfQuestion].options[1];
    option3.textContent = questions[indexOfQuestion].options[2];
    option4.textContent = questions[indexOfQuestion].options[3];

    numberOfQuestion.textContent = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswer = []; 

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswer.length > 0){
            completedAnswer.forEach(item => {
                if(item == randomNumber) {
                    hitDublicate = true;
                }
            });
            if(hitDublicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        } else {
            indexOfQuestion = randomNumber;
                load();
        }
    }
    completedAnswer.push(indexOfQuestion);
};
const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');  
    }
    btnPress = true;
    disabledOptions();
};
const disabledOptions = () => {
    optionsElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};
optionsElements.forEach(elem => {
    elem.addEventListener('click', event => checkAnswer(event));

});
const enableOption = () => {
    optionsElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};
const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.append(div);
    });
};
const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};
const validate = () => {
    if(!btnPress) {
        warning.classList.add('warning');
        warning.textContent = 'Потрібно вибрати один із варіантів(';
        placeForWarning.append(warning);
        setTimeout(() => warning.remove(), 1500);
    } else {
        enableOption();
        randomQuestion();
        btnPress = false;
    }
};
const quizOver = () => {
    overModal.classList.add('active');
    correctAnswer.textContent = score;
    numberOfAllQestions2.textContent = questions.length;
        for (let i = 0; i < completedAnswer.length; i++) {
            delete completedAnswer[i];
        }
        indexOfPage = 0;
        randomQuestion();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate(); 
});

document.addEventListener('DOMContentLoaded', () => {
    randomQuestion();
    answerTracker();
});


