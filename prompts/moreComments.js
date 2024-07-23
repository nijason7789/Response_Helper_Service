const moreComments = (needMoreComments) => {
    let prompt = `
    以上幾個我都不是很滿意，可以再幫我產出三個嗎？
    您之前給我的建議 Comments 如下: ${needMoreComments}
    ====
    ${needMoreComments} API 欄位之解釋如下:

    originalComment: 初始讀者留言；
    Suggestion_1: 由 gpt 產生的三個留言中的第一個；
    Suggestion_2: 由 gpt 產生的三個留言中的第二個；
    Suggestion_3: 由 gpt 產生的三個留言中的第三個；

    ====

    回復的格式請遵循以下 json format，且在回覆時請以讀者留言的語言進行回復:
    
    {
        "translation_0":"Traditional Chinese translation of original comment",
        "suggestion_1":"comment suggestions example1 ~~",
        "translation_1":"Traditional Chinese translation of suggestion1 ~~",
        "suggestion_2":"comment suggestions example2 ~~",
        "translation_2":"Traditional Chinese translation of suggestion2 ~~",
        "suggestion_3":"comment suggestions example3 ~~",
        "translation_3":"Traditional Chinese translation of suggestion3 ~~ "
    }
    `
    return prompt
}

export default moreComments