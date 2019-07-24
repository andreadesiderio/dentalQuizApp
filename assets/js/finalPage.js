'use strict'

score = localStorage.getItem('score');

function renderResult(){
$('main').prepend(`<h1>Final Score : ${score}/10<h1>`);
checkScore(score);
}
    
function checkScore(score){
        let message;
        let secondMessage;
    if (score == 10){
        message = 'Perfect Score! You watch out dental field, here you come!';
        secondMessage = 'Try again for another perferct score.';
    } 
    else if (score < 10 && score >= 7){
        message = 'Good job! You will be a dental termonology expert in no time!'
        secondMessage = 'Try again for a perferct score.'
    }
    else if (score < 7 && score >= 4){
        message = 'Not bad for a beginer. Keep practicing and you will be a dental termonology expert in no time!'
        secondMessage = 'Try again for a perferct score.'
    }
    else if (score < 4){
        message = 'Better study more! Keep practicing and you will be a dental termonology expert in no time!'
        secondMessage = 'Try again for a perferct score.'
    }
    renderFinalMesage(message, secondMessage)
}

function renderFinalMesage(message, secondMessage){
    $('#finalMessage').html(message);
    $('#promptMessage').html(secondMessage);
}

// function renderFinalPage(){
//     renderFinalScore();
// }


//  $(renderFinalPage);