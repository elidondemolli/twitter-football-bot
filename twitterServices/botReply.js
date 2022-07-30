const { cReadWrite } = require("../config/twitterClient");
const { checkIf } = require("../utils/checkIfExistsDatabase");
const { subtractHours, sleep } = require('../utils/date')
const savedReplyFootballTweetIds = require('../config/models/savedReplyFootballTweetIds')
const savedTweetsIds = require('../config/models/savedTweetsIds')
const savedRepliesIds = require('../config/models/savedRepliesIds')
const fs = require('fs')

const MY_ID = 'YOUR BOT TWITTER ID'
const randomContent = fs.readFileSync(require.resolve("../twitterBotContent/quotes.txt")).toString().split("\n");
const randomContentbotFootballTwitter = fs.readFileSync(require.resolve("../twitterBotContent/randomFootballTweet.txt")).toString().split("\n");
const randomContentReplyTwitter = fs.readFileSync(require.resolve("../twitterBotContent/botReplies.txt")).toString().split("\n");

const botReplies = async () => {
    const startTime = subtractHours(6, new Date()).toISOString();
    const result = await cReadWrite.v2.search('football quotes OR mourinho OR messi -RT', { start_time: startTime, "tweet.fields": ['conversation_id', 'id', 'context_annotations'] });
    for await (const tweet of result) {
        try {
            if(await checkIf(savedTweetsIds, tweet.id)) {
                await cReadWrite.v2.reply(randomContent[Math.floor(Math.random() * randomContent.length)], tweet.id)
                await savedTweetsIds.create({tweetId: tweet.id})
                await sleep(10000);
            } else {
                console.log('botReplies Same ID')
            }
        } catch (error) {
            console.log('botReplies', error);
        }
    }
}

const botMentioned = async () => {
    const startTime = subtractHours(1, new Date()).toISOString();
    const tweetsOfbot = await cReadWrite.v2.userMentionTimeline(MY_ID, { start_time: startTime, "tweet.fields": 'in_reply_to_user_id' });
    for await (const tweet of tweetsOfbot) {
        try {
            if(await checkIf(savedRepliesIds, tweet.id)) {
                await cReadWrite.v2.reply(
                    randomContentReplyTwitter[Math.floor(Math.random() * randomContentReplyTwitter.length)],
                    tweet.id,
                );
                console.log('Replied!')
                await savedRepliesIds.create({tweetId: tweet.id})
                await sleep(10000)
            } else {
                console.log('botMentioned Same ID')
            }
        } catch (error) {
            console.log('botMentioned', error)
        }
    }
}

const botRandomFootball = async () => {
    const startTime = subtractHours(6, new Date()).toISOString();
    const result = await cReadWrite.v2.search('football OR messi OR ronaldo OR real madrid -is:retweet', { start_time: startTime, "tweet.fields": ['conversation_id', 'id', 'context_annotations'] });
    for await (const tweet of result) {
        try {
            if(await checkIf(savedReplyFootballTweetIds, tweet.id)) {
                await cReadWrite.v2.reply(randomContentbotFootballTwitter[Math.floor(Math.random() * randomContentbotFootballTwitter.length)], tweet.id)
                console.log("Replied to this tweet: ", tweet?.text)
                await savedReplyFootballTweetIds.create({ tweetId: tweet.id })
                await sleep(10000);
            } else {
                console.log('botRandomFootball Same ID')
            }
        } catch (error) {
            console.log('botRandomFootball', error);
        }
    }
}

module.exports = { botRandomFootball, botReplies, botMentioned }
