const mongoose = require('mongoose');

const savedReplyFootballTweetIdsSchema = new mongoose.Schema({
    tweetId: {
        required: true,
        type: String
    },
    created: {
        type: Date
    }
});

module.exports = mongoose.model('savedReplyFootballTweetIds', savedReplyFootballTweetIdsSchema);
