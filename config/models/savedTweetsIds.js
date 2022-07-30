const mongoose = require('mongoose');

const savedTweetsIdsSchema = new mongoose.Schema({
    tweetId: {
        required: true,
        type: String
    },
    created: {
        type: Date
    }
});

module.exports = mongoose.model('savedTweetsIds', savedTweetsIdsSchema);
