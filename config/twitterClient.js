const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
})

module.exports = { client, cReadWrite: client.readWrite }