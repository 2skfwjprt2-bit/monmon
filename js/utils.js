// =================================
// utils.js
// 共通処理
// =================================





// =================================
// 配列シャッフル
// =================================

function shuffleArray(array){

    const result = [...array];


    for(
        let i = result.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;

}







// =================================
// 正答率計算
// =================================

function calculateAccuracy(){

    if(
        AppState.answeredCount === 0
    ){

        return "0%";

    }



    const rate =
        (
            AppState.correctCount /
            AppState.answeredCount
        )
        *
        100;



    return (
        Math.round(rate)
        +
        "%"
    );

}







// =================================
// HTMLエスケープ
// =================================
// ユーザー入力を安全に表示する

function escapeHTML(text){


    if(
        typeof text !== "string"
    ){

        return "";

    }


    return text

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}







// =================================
// 空文字チェック
// =================================

function isEmpty(value){

    return (
        !value ||
        value.trim() === ""
    );

}







// =================================
// 待機処理
// =================================

function wait(ms){

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}
