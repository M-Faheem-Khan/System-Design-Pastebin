const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        default: 0, // 0 = never expire && >0 = expires in x
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { strict: false });

module.exports = mongoose.model("posts", postSchema);
// EOF