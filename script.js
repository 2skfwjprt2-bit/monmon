// =================================
// ドイツ語クイズアプリ
// Step1: 基本構造
// =================================



// =================================
// アプリ状態管理
// =================================

const state = {

    // 読み込んだ問題
    questions: [],

    // 現在の問題番号
    currentIndex: 0,

    // ランダム出題
    randomMode: false,

    // 正解数
    correctCount: 0,

    // 回答済み数
    answeredCount: 0

};



// =================================
// 初期化
// =================================

function init(){

    setupEvents();

    updateUI();

}



// =================================
// イベント設定
// =================================

function setupEvents(){


    const loadButton =
        document.getElementById("loadButton");


    const nextButton =
        document.getElementById("nextButton");


    const previousButton =
        document.getElementById("previousButton");


    const randomMode =
        document.getElementById("randomMode");



    loadButton.addEventListener(
        "click",
        loadQuestions
    );



    nextButton.addEventListener(
        "click",
        nextQuestion
    );



    previousButton.addEventListener(
        "click",
        previousQuestion
    );



    randomMode.addEventListener(
        "change",
        changeRandomMode
    );

}



// =================================
// 問題読み込み
// （Step2で実装）
// =================================

function loadQuestions(){

    console.log(
        "問題読み込み予定"
    );

}



// =================================
// 問題解析
// （Step2で実装）
// =================================

function parseQuestions(text){

    console.log(
        "問題解析予定"
    );


    return [];

}



// =================================
// 出題表示
// =================================

function renderQuestion(){

    console.log(
        "問題表示予定"
    );

}



// =================================
// UI更新
// =================================

function updateUI(){


    document.getElementById(
        "questionCount"
    ).textContent =
        state.questions.length;



    document.getElementById(
        "correctCount"
    ).textContent =
        state.correctCount;



    updateQuestionNumber();


}



// =================================
// 問題番号更新
// =================================

function updateQuestionNumber(){


    const number =
        document.getElementById(
            "questionNumber"
        );


    number.textContent =
        `問題 ${state.currentIndex + 1} / ${state.questions.length}`;

}



// =================================
// 問題切替
// =================================

function nextQuestion(){


    if(
        state.currentIndex <
        state.questions.length - 1
    ){

        state.currentIndex++;

        renderQuestion();

    }

}



function previousQuestion(){


    if(
        state.currentIndex > 0
    ){

        state.currentIndex--;

        renderQuestion();

    }

}



// =================================
// ランダム設定
// =================================

function changeRandomMode(event){


    state.randomMode =
        event.target.checked;


}



// =================================
// 採点
// （Step3以降で実装）
// =================================

function checkAnswer(){

    console.log(
        "採点予定"
    );

}



// =================================
// 結果表示
// =================================

function showResult(){

    console.log(
        "結果表示予定"
    );

}



// =================================
// 問題形式管理
// =================================

const questionHandlers = {


    multiple_choice: {

        render:
            renderMultipleChoice,

        check:
            checkMultipleChoice

    },


    fill_blank: {

        render:
            renderFillBlank,

        check:
            checkFillBlank

    },


    word_order: {

        render:
            renderWordOrder,

        check:
            checkWordOrder

    },


    error_correction: {

        render:
            renderErrorCorrection,

        check:
            checkErrorCorrection

    }


};



// =================================
// 各問題形式
// （後で実装）
// =================================

function renderMultipleChoice(){}

function checkMultipleChoice(){}



function renderFillBlank(){}

function checkFillBlank(){}



function renderWordOrder(){}

function checkWordOrder(){}



function renderErrorCorrection(){}

function checkErrorCorrection(){}




// =================================
// 開始
// =================================

init();