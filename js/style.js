// =================================
// state.js
// アプリ状態管理
// =================================


const AppState = {


    // -----------------------------
    // 問題データ
    // -----------------------------

    questions: [],


    // 現在表示している問題番号

    currentIndex: 0,



    // -----------------------------
    // 出題設定
    // -----------------------------

    randomMode: false,



    // -----------------------------
    // 成績
    // -----------------------------

    correctCount: 0,


    answeredCount: 0,



    // 問題ごとの回答履歴

    answerHistory: [],



    // -----------------------------
    // アプリ設定
    // -----------------------------

    settings: {

        saveData: true

    }

};





// =================================
// 状態リセット
// =================================


function resetQuizState(){


    AppState.currentIndex = 0;


    AppState.correctCount = 0;


    AppState.answeredCount = 0;


    AppState.answerHistory = [];


}





// =================================
// 問題取得
// =================================


function getCurrentQuestion(){


    return AppState.questions[
        AppState.currentIndex
    ] || null;


}
