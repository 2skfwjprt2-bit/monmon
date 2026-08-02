// =================================
// navigation.js
// 問題移動処理
// =================================





// =================================
// 次の問題
// =================================

function nextQuestion(){


    if(
        AppState.questions.length === 0
    ){

        return;

    }



    if(
        AppState.randomMode
    ){

        moveRandomQuestion();

    }
    else{


        if(
            AppState.currentIndex
            <
            AppState.questions.length - 1
        ){

            AppState.currentIndex++;

        }

    }



    renderQuestion();

    updateQuestionInfo();

}







// =================================
// 前の問題
// =================================

function previousQuestion(){


    if(
        AppState.currentIndex > 0
    ){

        AppState.currentIndex--;

    }

    resetAnswerArea();

    renderQuestion();

    updateQuestionInfo();

}







// =================================
// ランダム移動
// =================================

function moveRandomQuestion(){


    const length =
        AppState.questions.length;



    if(
        length <= 1
    ){

        return;

    }



    let next;



    do{


        next =
            Math.floor(
                Math.random()
                *
                length
            );


    }
    while(
        next === AppState.currentIndex
    );



    AppState.currentIndex =
        next;

}







// =================================
// ランダム設定変更
// =================================

function setRandomMode(value){


    AppState.randomMode =
        value;


}







// =================================
// 問題番号更新
// =================================

function updateQuestionInfo(){


    const number =
        document.getElementById(
            "questionNumber"
        );



    const total =
        AppState.questions.length;



    if(total === 0){

        number.textContent =
            "0 / 0";

        return;

    }



    number.textContent =

        `${AppState.currentIndex + 1} / ${total}`;

}

function resetAnswerArea(){

    document.getElementById(
        "feedbackArea"
    ).textContent = "";


    document.getElementById(
        "explanationArea"
    ).textContent = "";


}
