// =================================
// result.js
// 結果表示処理
// =================================





// =================================
// 成績更新
// =================================

function updateResultUI(){


    const correct =
        document.getElementById(
            "correctCount"
        );


    const answered =
        document.getElementById(
            "answeredCount"
        );


    const accuracy =
        document.getElementById(
            "accuracy"
        );



    correct.textContent =
        AppState.correctCount;



    answered.textContent =
        AppState.answeredCount;



    accuracy.textContent =
        calculateAccuracy();

}







// =================================
// 最終結果表示
// =================================

function showResult(){


    const area =
        document.getElementById(
            "resultArea"
        );



    const text =
        document.getElementById(
            "finalResult"
        );



    const accuracy =
        calculateAccuracy();



    text.textContent =

        `全 ${AppState.answeredCount} 問中、
${AppState.correctCount} 問正解しました。

正答率：
${accuracy}`;



    area.classList.remove(
        "hidden"
    );


}
