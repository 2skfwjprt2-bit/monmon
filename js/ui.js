// =================================
// ui.js
// UI更新処理
// =================================





// =================================
// 全体UI更新
// =================================

function updateUI(){


    updateQuestionInfo();


    updateQuestionCount();


    updateResultUI();


}







// =================================
// 問題数表示
// =================================

function updateQuestionCount(){


    const count =
        document.getElementById(
            "questionCount"
        );


    count.textContent =
        AppState.questions.length;


}







// =================================
// エラー表示
// =================================

function showErrorMessage(message){


    const error =
        document.getElementById(
            "errorMessage"
        );



    error.textContent =
        message;


}







// =================================
// エラー削除
// =================================

function clearErrorMessage(){


    const error =
        document.getElementById(
            "errorMessage"
        );



    error.textContent =
        "";


}







// =================================
// ロード完了表示
// =================================

function showLoadMessage(count){


    clearErrorMessage();



    const message =

        `${count}問読み込みました`;



    const error =
        document.getElementById(
            "errorMessage"
        );



    error.style.color =
        "green";


    error.textContent =
        message;


}
