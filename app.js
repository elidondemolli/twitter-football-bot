const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const connectDB = require('./config/databse');
const { tweetSleepImage, tweetMorningImage, tweetRandomFootballStuff } = require('./twitterServices/botTweet');
const { botReplies, botMentioned, botRandomFootball } = require('./twitterServices/botReply');
const { botRetweets } = require('./twitterServices/botRetweet');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('<h1>football twitter bot</h1>')
});

cron.schedule('*/15 * * * *', () => {
    console.log('botRandomFootball Started')
    botRandomFootball();
});

cron.schedule('*/30 * * * *', () => {
    console.log('botRetweets Started')
    botRetweets();
});

cron.schedule('*/15 * * * *', () => {
    console.log('botReplies Started')
    botReplies();
});

cron.schedule('*/30 * * * *', () => {
    console.log('botMentioned Started')
    botMentioned();
});

cron.schedule('35 1 * * *', () => {
    console.log('sleep Started')
    tweetSleepImage()
});

cron.schedule('35 8 * * *', () => {
    console.log('morning Started')
    tweetMorningImage()
});

cron.schedule('4 17 * * *', () => {
    console.log('tweetRandomFootballStuff Started')
    tweetRandomFootballStuff();
});

app.listen(process.env.PORT, () => console.log(`Server running at ${PORT}`))
