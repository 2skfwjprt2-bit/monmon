// =================================
// state.js
// 修正版
// =================================


const AppState = {

    questions: [],

    currentIndex: 0,

    randomMode: false,

    correctCount: 0,

    answeredCount: 0,

    answerHistory: []

};




// クイズ結果だけリセット

function resetQuizResult(){

    AppState.currentIndex = 0;

    AppState.correctCount = 0;

    AppState.answeredCount = 0;

    AppState.answerHistory = [];

}




function getCurrentQuestion(){

    return AppState.questions[
        AppState.currentIndex
    ] || null;

}
