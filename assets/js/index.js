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
}

function renderCurrentScore(){
    $('.js-currentScore').html(`Score: ${score} / 10`);
}

function renderAnswerChoices(){
     for (let i = 0; i < questions[questionNumber].answerChoices.length; i ++){
         let choice = questions[questionNumber].answerChoices[i].answer;
         possibleAnswers.push(choice); 
     }
    return possibleAnswers.sort((a,b) => 0.5 - Math.random());
}

function renderForm(){
    let choices = renderAnswerChoices();
    $('.formContainer').html(`
    <form>
    <legend class="questionContainer">
    ${questions[questionNumber].question}
    </legend>
    <label for="input1"><input class="answerChoice" id="input1" type="radio" name="anwserChoice" value="${choices[0]}" required>${choices[0]}</label>
    <label for="input2"><input class="answerChoice" id="input2" type="radio" name="anwserChoice" value="${choices[1]}" required>${choices[1]}</label>
    <label for="input3"><input class="answerChoice" id="input3" type="radio" name="anwserChoice" value="${choices[2]}" required>${choices[2]}</label>
    <label for="input4"><input class="answerChoice" id="input4" type="radio" name="anwserChoice" value="${choices[3]}" required>${choices[3]}</label>
    <button class="submitButton">Submit</button>
    </form>
    `);
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
    $('form').on('submit', function (event){
        event.preventDefault();
        let chosen = retrieveValue();
        checkIfTrue(chosen);
        $('form').off('submit');
        $('form').empty();
    })
}

function checkIfTrue(chosen){
    let correct = questions[questionNumber].answerChoices.find(item => item.correct == true);
    let correctAnswer = correct.answer;
    provideFeedBack(correctAnswer, chosen);

}

function provideFeedBack(correctAnswer, chosen){
    //add image
    $('.buttonContainerNext').html('<button class="js-nextButton">Next</button>');
    $('.js-messageContainer').toggleClass('hidden');
    correctAnswer == chosen ?
     sayItsCorrect(chosen)  : sayItsWrong(chosen, correctAnswer);
    }
     

function sayItsCorrect(chosen){
    score ++;
    questionNumber ++;
    renderCurrentScore();
    $('.js-feedback').html(`Your Answer: <span class= "correctAnswer"> "${chosen}" </span> is Correct!`);
    checkQuestionNumber();
}

function sayItsWrong(chosen, correctAnswer){
    questionNumber ++;
    $('.js-feedback').html(`Your Answer: <span class="wrongAnswer"> "${chosen}" </span> is Wrong! <br> The correct answer is <span class="correctAnswer"> "${correctAnswer}" </span>.`);
    checkQuestionNumber();
}

function checkQuestionNumber(){
    if (questionNumber < 10 ){
         $('.js-nextButton').on('click', renderNextQuestion);
        }
         else{
            $('.js-nextButton').on('click', renderResult);
        }
}


function renderNextQuestion(){
    $('.js-nextButton').off('click');
    $('.js-messageContainer').toggleClass('hidden');
    possibleAnswers = [];
    handleQuestionPage ();
}

function renderResult(){
    $('.js-nextButton').off('click');
    $('main').prepend(`<h1 class="resultHeading">Final Score : ${score}/10<h1>`);
    checkScore(score);
    }
        
function checkScore(score){
    let message;
    let secondMessage = 'Try again for a perferct score.';
        if (score == 10){
            message = 'Perfect Score! You watch out dental field, here you come!';
            secondMessage = 'Try again for another perferct score.';
        } 
        else if (score < 10 && score >= 7){
            message = 'Good job! You will be a dental termonology expert in no time!';
        }
        else if (score < 7 && score >= 4){
            message = 'Not bad for a beginer. Keep practicing and you will be a dental termonology expert in no time!';
        }
        else if (score < 4){
            message = 'Better study more! Keep practicing and you will be a dental termonology expert in no time!';
        }
    renderFinalMesage(message, secondMessage)
}
    
function renderFinalMesage(message, secondMessage){
    $('.js-feedback').html(`${message}</br>${secondMessage}`);
    $('.buttonContainerNext').html('<button class="js-TryAgainButton">Try Again</button>');
    $('.js-TryAgainButton').on('click', handleTryAgain);
}

function handleTryAgain(){
    $('.messageContainer').toggleClass('hidden');
    $('.js-TryAgainButton').off('click');
    renewPage();
}

function renewPage(){
    $('.resultHeading').remove();
    questionNumber = 0 ;
    possibleAnswers = [];
    score = 0;
    handleQuestionPage();
}

function handleQuestionPage(){
    renderQuestionNumber();
    renderCurrentScore();
    renderForm();
}

$(handleQuestionPage);