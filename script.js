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
// =================================

function loadQuestions(){

    const input =
        document.getElementById(
            "questionInput"
        ).value.trim();


    if(!input){

        showError(
            "問題データを入力してください"
        );

        return;

    }


    const result =
        parseQuestions(input);



    if(result.questions.length === 0){

        showError(
            "読み込める問題がありません"
        );

        return;

    }



    state.questions =
        result.questions;


    state.currentIndex = 0;

    state.correctCount = 0;

    state.answeredCount = 0;



    updateUI();

    renderQuestion();



    alert(
        `${state.questions.length}問読み込みました`
    );

}





// =================================
// 問題解析
// =================================

function parseQuestions(text){


    const blocks =
        text.split("END")
            .map(
                block => block.trim()
            )
            .filter(
                block => block !== ""
            );



    const questions = [];

    const errors = [];



    blocks.forEach(
        (block,index)=>{


            const lines =
                block.split("\n")
                     .map(
                        line=>line.trim()
                     )
                     .filter(
                        line=>line
                     );



            const data = {};



            lines.forEach(line=>{


                const separator =
                    line.indexOf(":");


                if(separator === -1){

                    return;

                }



                const key =
                    line
                    .substring(0,separator)
                    .trim();


                const value =
                    line
                    .substring(separator + 1)
                    .trim();



                data[key] = value;


            });



            const error =
                validateQuestion(
                    data,
                    index + 1
                );



            if(error){

                errors.push(error);

            }
            else{

                questions.push(data);

            }


        }
    );



    if(errors.length){

        showError(
            errors.join("\n")
        );

    }



    return {

        questions,
        errors

    };

}




// =================================
// 問題データチェック
// =================================

function validateQuestion(
    question,
    number
){


    if(!question.TYPE){

        return `${number}問目: TYPEがありません`;

    }



    if(!question.QUESTION){

        return `${number}問目: QUESTIONがありません`;

    }



    if(!question.ANSWER){

        return `${number}問目: ANSWERがありません`;

    }



    const allowedTypes = [

        "multiple_choice",
        "fill_blank",
        "word_order",
        "error_correction"

    ];



    if(
        !allowedTypes.includes(
            question.TYPE
        )
    ){

        return `${number}問目: 未対応のTYPEです (${question.TYPE})`;

    }



    if(
        question.TYPE === "multiple_choice"
    ){

        for(
            let i = 1;
            i <= 4;
            i++
        ){

            if(
                !question[`CHOICE${i}`]
            ){

                return `${number}問目: CHOICE${i}がありません`;

            }

        }

    }



    return null;

}





// =================================
// エラー表示
// =================================

function showError(message){


    const feedback =
        document.getElementById(
            "feedbackArea"
        );


    feedback.textContent =
        message;


    feedback.style.color =
        "red";

}


// =================================
// 出題表示
// =================================


// =================================
// 問題表示
// =================================

function renderQuestion(){

    const question =
        state.questions[state.currentIndex];


    if(!question){

        return;

    }



    document.getElementById(
        "questionText"
    ).textContent =
        question.QUESTION;



    document.getElementById(
        "questionLevel"
    ).textContent =
        question.LEVEL || "";



    document.getElementById(
        "feedbackArea"
    ).textContent =
        "";



    document.getElementById(
        "explanationArea"
    ).textContent =
        "";



    const handler =
        questionHandlers[
            question.TYPE
        ];



    if(handler){

        handler.render(
            question
        );

    }
    else{

        showError(
            "対応していない問題形式です"
        );

    }

}

// =================================
// multiple_choice表示
// =================================

function renderMultipleChoice(question){

    const area =
        document.getElementById(
            "answerArea"
        );


    area.innerHTML = "";



    for(let i = 1; i <= 4; i++){

        const button =
            document.createElement(
                "button"
            );


        button.textContent =
            question[`CHOICE${i}`];



        button.addEventListener(
            "click",
            ()=>{

                checkMultipleChoice(
                    question[`CHOICE${i}`],
                    question
                );

            }
        );



        area.appendChild(button);

    }

}





// =================================
// multiple_choice採点
// =================================

function checkMultipleChoice(
    answer,
    question
){


    const isCorrect =
        answer === question.ANSWER;



    if(isCorrect){

        state.correctCount++;

    }



    state.answeredCount++;



    showAnswerResult(
        isCorrect,
        question
    );



    disableAnswerButtons();

    updateUI();

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