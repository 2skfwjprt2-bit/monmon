// =================================
// app.js
// アプリ起動・制御
// =================================





// =================================
// 初期化
// =================================

function initApp(){


    setupEvents();


    updateUI();


}







// =================================
// イベント登録
// =================================

function setupEvents(){



    // 読み込み

    document
    .getElementById(
        "loadButton"
    )
    .addEventListener(
        "click",
        loadQuestions
    );





    // 次へ

    document
    .getElementById(
        "nextButton"
    )
    .addEventListener(
        "click",
        nextQuestion
    );





    // 前へ

    document
    .getElementById(
        "previousButton"
    )
    .addEventListener(
        "click",
        previousQuestion
    );





    // ランダム

    document
    .getElementById(
        "randomMode"
    )
    .addEventListener(
        "change",
        event=>{

            setRandomMode(
                event.target.checked
            );

        }
    );





    // 結果

    document
    .getElementById(
        "resultButton"
    )
    .addEventListener(
        "click",
        showResult
    );



}







// =================================
// 問題読み込み
// =================================

function loadQuestions(){



    const input =

        document
        .getElementById(
            "questionInput"
        )
        .value;





    const result =

        parseQuestionData(
            input
        );





    if(
        result.errors.length > 0
    ){


        showErrorMessage(
            result.errors.join("\n")
        );


    }
    else{


        clearErrorMessage();


    }





    AppState.questions =
        result.questions;



    resetQuizState();



    updateUI();



    renderQuestion();



    showLoadMessage(
        AppState.questions.length
    );


}







// =================================
// 起動
// =================================


window.addEventListener(

    "DOMContentLoaded",

    initApp

);
