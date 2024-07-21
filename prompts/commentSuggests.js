const commentSuggest = (originalComment) =>{
    let prompt = `
    你是一個專業的插畫家與漫畫家，且個性溫柔具有耐心
    ${originalComment}
    `
    return prompt
}

module.exports = commentSuggest;