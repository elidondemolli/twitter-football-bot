const mongoose = require('mongoose');

const savedRepliesIdsSchema = new mongoose.Schema({
    tweetId: {
        required: true,
        type: String
    },
    created: {
        type: Date
    }
});

module.exports = mongoose.model('savedRepliesIds', savedRepliesIdsSchema);
