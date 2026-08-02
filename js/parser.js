// =================================
// parser.js
// 問題データ解析
// =================================



const SupportedTypes = [

    "multiple_choice",

    "fill_blank",

    "word_order",

    "error_correction"

];





// =================================
// メイン解析
// =================================

function parseQuestionData(text){


    const result = {

        questions: [],

        errors: []

    };



    if(
        isEmpty(text)
    ){

        result.errors.push(
            "問題データが空です"
        );

        return result;

    }





    const blocks =
        text
        .split("END")
        .map(
            block =>
                block.trim()
        )
        .filter(
            block =>
                block !== ""
        );





    blocks.forEach(

        (block,index)=>{


            const question =
                parseSingleQuestion(
                    block
                );



            const errors =
                validateQuestion(
                    question,
                    index + 1
                );



            if(
                errors.length > 0
            ){

                result.errors.push(
                    ...errors
                );

            }
            else{

                result.questions.push(
                    question
                );

            }


        }

    );



    return result;

}







// =================================
// 1問解析
// =================================

function parseSingleQuestion(block){


    const question = {};



    const lines =
        block
        .split("\n")
        .map(
            line =>
                line.trim()
        )
        .filter(
            line =>
                line !== ""
        );




    lines.forEach(line=>{


        const index =
            line.indexOf(":");



        if(
            index === -1
        ){

            return;

        }



        const key =
            line
            .substring(
                0,
                index
            )
            .trim();



        const value =
            line
            .substring(
                index + 1
            )
            .trim();



        question[key] = value;


    });



    return question;

}







// =================================
// データチェック
// =================================

function validateQuestion(
    question,
    number
){


    const errors = [];



    if(
        !question.TYPE
    ){

        errors.push(
            `${number}問目: TYPEがありません`
        );

    }



    else if(
        !SupportedTypes.includes(
            question.TYPE
        )
    ){

        errors.push(
            `${number}問目: 不明なTYPEです (${question.TYPE})`
        );

    }





    if(
        !question.QUESTION
    ){

        errors.push(
            `${number}問目: QUESTIONがありません`
        );

    }




    if(
        !question.ANSWER
    ){

        errors.push(
            `${number}問目: ANSWERがありません`
        );

    }







    // 4択チェック

    if(
        question.TYPE ===
        "multiple_choice"
    ){


        for(
            let i = 1;
            i <= 4;
            i++
        ){

            if(
                !question[
                    `CHOICE${i}`
                ]
            ){

                errors.push(
                    `${number}問目: CHOICE${i}がありません`
                );

            }

        }


    }





    return errors;

}
