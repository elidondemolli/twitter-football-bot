const checkIf = async (collection, id) => {
    const result = await collection.findOne({ tweetId: id })
    if(result) {
        return false
    } else {
        return true
    }
}

const checkIfFootballRandomQuote = async (collection, content) => {
    const result = await collection.findOne({ quote: content });
    if(result) {
        return false;
    } else {
        return true;
    }
}

module.exports = { checkIf, checkIfFootballRandomQuote }
