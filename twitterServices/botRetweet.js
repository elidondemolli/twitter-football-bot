const { cReadWrite } = require("../config/twitterClient");
const { subtractHours, sleep } = require('../utils/date')
const MY_ID = 'YOUR BOT TWITTER ID'

const botRetweets = async () => {
    const startTime = subtractHours(1, new Date()).toISOString();
    const result = await cReadWrite.v2.search('football OR messi OR ronaldo OR barcelona OR real madrid -RT', { start_time: startTime });
    for await (const tweet of result) {
        try {
            await cReadWrite.v2.retweet(MY_ID, tweet.id)
            await sleep(10000);
        } catch (error) {
            console.log('retweet bot', error);
        }
    }
}

module.exports = { botRetweets }
