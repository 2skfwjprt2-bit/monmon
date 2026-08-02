// =================================
// checker.js
// 採点処理
// =================================



// =================================
// 問題形式ごとの採点
// =================================

const QuestionChecker = {


    multiple_choice:
        checkMultipleChoice,


    fill_blank:
        checkFillBlank,


    word_order:
        checkWordOrder,


    error_correction:
        checkErrorCorrection

};







// =================================
// 共通回答処理
// =================================

function checkAnswer(answer){


    const question =
        getCurrentQuestion();



    if(!question){

        return;

    }



    const checker =
        QuestionChecker[
            question.TYPE
        ];



    if(!checker){

        return;

    }



    const result =
        checker(
            answer,
            question
        );



    finishAnswer(
        result,
        question
    );

}







// =================================
// multiple_choice
// =================================

function checkMultipleChoice(
    answer,
    question
){


    return normalizeAnswer(answer)
        ===
        normalizeAnswer(
            question.ANSWER
        );


}







// =================================
// fill_blank
// =================================

function checkFillBlank(
    answer,
    question
){


    return normalizeAnswer(answer)
        ===
        normalizeAnswer(
            question.ANSWER
        );


}







// =================================
// word_order
// =================================

function checkWordOrder(
    answer,
    question
){


    return normalizeAnswer(answer)
        ===
        normalizeAnswer(
            question.ANSWER
        );


}







// =================================
// error_correction
// =================================

function checkErrorCorrection(
    answer,
    question
){


    return normalizeAnswer(answer)
        ===
        normalizeAnswer(
            question.ANSWER
        );


}







// =================================
// 結果処理
// =================================

function finishAnswer(
    correct,
    question
){


    AppState.answeredCount++;



    if(correct){

        AppState.correctCount++;

    }



    AppState.answerHistory.push({

        index:
            AppState.currentIndex,

        correct

    });



    showFeedback(
        correct,
        question
    );



    updateScoreUI();



    disableAnswerArea();

}







// =================================
// フィードバック表示
// =================================

function showFeedback(
    correct,
    question
){


    const feedback =
        document.getElementById(
            "feedbackArea"
        );



    if(correct){


        feedback.textContent =
            "⭕ 正解！";


        feedback.className =
            "feedback correct";


    }
    else{


        feedback.textContent =
            "❌ 不正解";


        feedback.className =
            "feedback wrong";


    }




    document.getElementById(
        "explanationArea"
    )
    .textContent =

        "正解: "
        +
        question.ANSWER
        +
        "\n\n"
        +
        (
            question.EXPLANATION
            ||
            ""
        );

}







// =================================
// 回答欄停止
// =================================

function disableAnswerArea(){


    const buttons =
        document.querySelectorAll(
            "#answerArea button"
        );



    buttons.forEach(
        button=>{

            button.disabled =
                true;

        }
    );


}







// =================================
// 答え比較用
// =================================

function normalizeAnswer(text){


    if(!text){

        return "";

    }



    return text

        .trim()

        .toLowerCase()

        .replace(
            /\s+/g,
            " "
        );

}
