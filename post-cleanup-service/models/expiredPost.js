const mongoose = require('mongoose');

const expiredPostSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    expiresOn: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("expiredPosts", expiredPostSchema);
// EOF