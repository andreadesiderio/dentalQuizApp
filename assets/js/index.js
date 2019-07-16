'use strict'
const questions = [
    {
        question:'What are back teeth called?',
        answerChoices:[
            {answer: 'anterior teeth', correct: false},
            {answer: 'distal teeth', correct: false},
            {answer: 'postal teeth', correct: false},
            {answer: 'posterior teeth', correct: true}
        ]
    },    
   {  
        question:'What are front teeth called?',
        answerChoices:[
            {answer: 'posterior teeth', correct: false},
            {answer: 'antique teeth', correct: false},
            {answer: 'mesial teeth', correct: false},
            {answer: 'anterior teeth', correct: true}
        ]
   },     
    {  
        question:'How many permanent (adult) teeth are there in a full set?',
        answerChoices:[
            {answer: '18', correct: false},
            {answer: '21', correct: false},
            {answer: '40', correct: false},
            {answer: '32', correct: true},
        ]
    },          
    {  
        question:'How many primary (child) teeth are there in a full set?',
        answerChoices:[
            {answer: '10', correct: false},
            {answer: '12', correct: false},
            {answer: '30', correct: false},
            {answer: '20', correct: true}
        ]
    },
    {   
        question:'What is the upper jaw\'s arch called?',
        answerChoices:[
            {answer: 'mandibular ach', correct: false},
            {answer: 'high arch', correct: false},
            {answer: 'maximo arch', correct: false}, 
            {answer: 'maxillary arch', correct: true}
        ]
    },    
    {
        question:'What is the lower jaw\'s arch called?',
        answerChoices:[
            {answer: 'maxillary ach', correct: false},
            {answer: 'gateway arch', correct: false},
            {answer: 'dentition arch', correct: false},
            {answer: 'mandibular arch', correct: true}
        ]
    },  
    {   
        question:'How is each primary (child) tooth identified?',
        answerChoices:[
            {answer: 'by fractional numbers', correct: false},
            {answer: 'by negative numbers', correct: false},
            {answer: 'by roman numerals', correct: false},
            {answer: 'by letters of the alphabet', correct: true}
        ]
    },   
    {    
        question:'How is each permanent (adult) tooth identified?',
        answerChoices:[
            {answer: 'by hieroglyphics', correct: false},
            {answer: 'by letters of the alphabet', correct: false},
            {answer: 'by roman numerals', correct: false},
            {answer: 'by numbers', correct: true} 
                      ]
    },
    {  
        question:'What are the surface names for anterior teeth?',
        answerChoices:[
            {answer: 'front, back, right, left, top', correct: false},
            {answer: 'surface1, surface2, surface3, surface4, surface5', correct: false},
            {answer: 'posterior, anterior, inside, outside', correct: false},
            {answer: 'mesial, lingual, incisal, distal, facial', correct: true}
        ]
    },
    {    
        question:'What are the surface names for posterior teeth?',
        answerChoices:[
            {answer: 'front, back, right, left, top', correct: false},
            {answer: 'surface1, surface2, surface3, surface6, surface7', correct: false},
            {answer: 'posterior, anterior, inside, outside', correct: false},
            {answer: 'mesial, lingual, occlusal, distal, buccal', correct: true}
        ]
    }                                               
];
// localStorage.removeItem('score');
let questionNumber = 0;
let score = 0;
let possibleAnswers = [];


function renderQuestionNumber(){
    $('.js-pageNumber').html(`Question: ${questionNumber + 1} / 10`);
    $('.js-heading').html(`Question ${questionNumber + 1}`);
}

function renderQuestion(){
    $('.js-question').html(questions[questionNumber].question);
}

    function renderCurrentScore(){
    $('.js-currentScore').html(`Score: ${score} / 10`);
}

function renderAnswerChoices(){
     for (let i = 0; i < questions[questionNumber].answerChoices.length; i ++){
         let value = questions[questionNumber].answerChoices[i].answer;
         let answerChoice = `<label aria-pressed="false"><input class="answerChoice" type="radio" name="anwserChoice" value="${value}" required><span>${value}</span></label>`;
         possibleAnswers.push(answerChoice); 
     }
     return possibleAnswers.sort((a,b) => 0.5 - Math.random());
}

function renderAnswers(){
    $('#form').append(renderAnswerChoices());
    $('#form').append(`<div class="buttonContainer"> 
    <button class="submitButton">Submit</button></div>`);
    handleFormSubmit();   
}

function retrieveValue(){
    let choice = document.querySelectorAll('.answerChoice');
    for (let i = 0; i < choice.length; i ++){
         if (choice[i].checked){
              return choice[i].value;
         }  
    }
}

function handleFormSubmit(){
    $('#form').on('submit', function (event){
        event.preventDefault();
        let val = retrieveValue();
        checkIfTrue(val);
        $('#form').off('submit');
        $('#form').empty();
    })
}

function checkIfTrue(val){
    let correct = questions[questionNumber].answerChoices.find(item => item.correct == true);
    let correctAnswer = correct.answer;
    provideFeedBack(correctAnswer, val);

}

function provideFeedBack(correctAnswer, val){
    //add image
    $('.js-messageContainer').toggleClass('hidden');
    correctAnswer == val ?
    sayItsCorrect(val)  : sayItsWrong(val);
    }
     

function sayItsCorrect(val){
    questionNumber ++;
    $('.js-feedback').html(`Your Answer: "${val}" is Correct!`);
   score ++;
   localStorage.setItem('score', score);
    checkQuestionNumber();
}




function sayItsWrong(val){
    questionNumber ++;
    $('.js-feedback').html(`Your Answer: "${val}" is Wrong!`);
    checkQuestionNumber();
}

function checkQuestionNumber(){
    if (questionNumber < 10 ){
         $('.js-nextPageButton').on('click', renderNextQuestion)
        }
         else{
            $('.js-nextPageButton').off('click');
             $('.buttonContainerNextPage').html('<a class="finalButton" href="resultPage.html"><button>Final Score</button></a>');
        }
}

function renderNextQuestion(){
    $('.js-nextPageButton').off('click');
    $('.js-messageContainer').toggleClass('hidden');
    possibleAnswers = [];
    handleQuestionPage ();
}

function handleQuestionPage(){
    renderQuestionNumber();
    renderCurrentScore();
    renderQuestion();
    renderAnswers();
}

$(handleQuestionPage);