const mongoose = require('mongoose');

const savedRandomFootballTweetsSchema = new mongoose.Schema({
    quote: {
        required: true,
        type: String
    },
    created: {
        type: Date
    }
});

module.exports = mongoose.model('savedRandomFootballTweets', savedRandomFootballTweetsSchema);
