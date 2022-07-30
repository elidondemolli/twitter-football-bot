const { cReadWrite } = require("../config/twitterClient");
const savedRandomFootballTweets = require('../config/models/savedRandomFootballTweets')
const { checkIfFootballRandomQuote } = require('../utils/checkIfExistsDatabase');
const fs = require('fs');
const { scrapePrntScr, replaceBase64Text, imgType } = require("../scraping/scrape");

const randomFootballTweet = fs.readFileSync(require.resolve("../twitterBotContent/quotes.txt")).toString().split("\n");

const tweetSleepImage = async () => {
    try {    
        const mediaId = await cReadWrite.v1.uploadMedia(require.resolve('../images/sleep.jpg'));
        await cReadWrite.v1.tweet('good night guys', { media_ids: mediaId });
    } catch (error) {
        console.log('sleepImageError', error);
    }
}

const tweetMorningImage = async () => {
    try {
        const mediaId = await cReadWrite.v1.uploadMedia(require.resolve('../images/woke_up.jpg'));
        await cReadWrite.v1.tweet('good morning', { media_ids: mediaId });
    } catch (error) {
        console.log('morningImageError', error);
    }
}

const tweetRandomFootballStuff = async () => {
    try {
        const quote = randomFootballTweet[Math.floor(Math.random() * randomFootballTweet.length)]
        if(await checkIfFootballRandomQuote(savedRandomFootballTweets, quote)) {
            await cReadWrite.v2.tweet(quote);
            await savedRandomFootballTweets.create({ quote: quote });
            console.log('tweetRandomFootballStuff tweeted');
        } else {
            console.log('tweetRandomFootballStuff already tweeted, trying again...');
            await tweetRandomFootballStuff();
        }
    } catch (error) {
        console.log('tweetRandomFootballStuff', error)
    }
}

const tweetImg = async () => {
    const scrapedImage = await scrapePrntScr();
    const mediaId = await cReadWrite.v1.uploadMedia(Buffer.from(replaceBase64Text(scrapedImage), 'base64'),
        { mimeType: imgType(scrapedImage.substring(0, 16)) });
    await cReadWrite.v1.tweet('random screenshots from different screenshot apps', { media_ids: mediaId })
}



module.exports = { tweetMorningImage, tweetSleepImage, tweetRandomFootballStuff, tweetImg }
