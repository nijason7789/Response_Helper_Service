const moreComments = (previousRecommendation) => {
    let prompt = `
    以上幾個我都不是很滿意，可以再幫我產出三個嗎？
    您之前給我的建議 Comments 如下: ${previousRecommendation}
    `
    return prompt
}

module.exports = moreComments;