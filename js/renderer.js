// =================================
// renderer.js
// 問題表示処理
// =================================



// 問題形式ごとの表示処理

const QuestionRenderer = {


    multiple_choice:
        renderMultipleChoice,


    fill_blank:
        renderFillBlank,


    word_order:
        renderWordOrder,


    error_correction:
        renderErrorCorrection

};







// =================================
// 問題全体表示
// =================================

function renderQuestion(){


    const question =
        getCurrentQuestion();



    if(!question){

        clearQuestionArea();

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




    clearFeedback();




    const renderer =
        QuestionRenderer[
            question.TYPE
        ];



    if(renderer){

        renderer(question);

    }
    else{

        showErrorMessage(
            "対応していない問題形式です"
        );

    }


}







// =================================
// multiple_choice
// =================================

function renderMultipleChoice(question){


    const area =
        document.getElementById(
            "answerArea"
        );


    area.innerHTML = "";



    for(
        let i = 1;
        i <= 4;
        i++
    ){


        const button =
            createAnswerButton(
                question[`CHOICE${i}`],
                ()=>{
                    checkAnswer(
                        question[`CHOICE${i}`]
                    );
                }
            );


        area.appendChild(
            button
        );

    }


}







// =================================
// fill_blank
// =================================

function renderFillBlank(){


    const area =
        document.getElementById(
            "answerArea"
        );


    area.innerHTML = `

        <input
            id="fillInput"
            class="answer-input"
            type="text"
            placeholder="答えを入力">

        <button id="fillButton">
            回答
        </button>

    `;



    document.getElementById(
        "fillButton"
    )
    .onclick = ()=>{


        const answer =
            document.getElementById(
                "fillInput"
            )
            .value;


        checkAnswer(answer);


    };


}







// =================================
// word_order
// =================================

function renderWordOrder(question){


    const area =
        document.getElementById(
            "answerArea"
        );



    const words =
        shuffleArray(
            question.QUESTION.split(" ")
        );



    area.innerHTML = `

        <div id="wordButtons"></div>

        <p>
            <span id="wordResult"></span>
        </p>

        <button id="wordReset">
            リセット
        </button>

        <button id="wordCheck">
            回答
        </button>

    `;



    const container =
        document.getElementById(
            "wordButtons"
        );



    let selected = [];



    words.forEach(word=>{


        const button =
            createAnswerButton(
                word,
                ()=>{


                    selected.push(word);


                    document.getElementById(
                        "wordResult"
                    )
                    .textContent =
                        selected.join(" ");


                }
            );


        container.appendChild(
            button
        );


    });




    document.getElementById(
        "wordReset"
    )
    .onclick = ()=>{


        selected = [];


        document.getElementById(
            "wordResult"
        )
        .textContent = "";


    };



    document.getElementById(
        "wordCheck"
    )
    .onclick = ()=>{


        checkAnswer(
            selected.join(" ")
        );


    };


}







// =================================
// error_correction
// =================================

function renderErrorCorrection(){


    const area =
        document.getElementById(
            "answerArea"
        );


    area.innerHTML = `

        <input
            id="correctInput"
            class="answer-input"
            type="text"
            placeholder="正しい文">

        <button id="correctButton">
            回答
        </button>

    `;



    document.getElementById(
        "correctButton"
    )
    .onclick = ()=>{


        const answer =
            document.getElementById(
                "correctInput"
            )
            .value;



        checkAnswer(answer);


    };


}







// =================================
// 共通ボタン作成
// =================================

function createAnswerButton(
    text,
    callback
){


    const button =
        document.createElement(
            "button"
        );



    button.textContent =
        text;



    button.onclick =
        callback;



    return button;

}







// =================================
// 表示クリア
// =================================

function clearQuestionArea(){


    document.getElementById(
        "questionText"
    )
    .textContent = "";



    document.getElementById(
        "answerArea"
    )
    .innerHTML = "";

}





function clearFeedback(){


    document.getElementById(
        "feedbackArea"
    )
    .textContent = "";



    document.getElementById(
        "explanationArea"
    )
    .textContent = "";

}
