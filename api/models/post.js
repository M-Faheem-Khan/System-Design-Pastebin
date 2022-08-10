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
    uri: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Number,
        default: 0, // 0 = never expire && >0 = expires in x seconds
        required: true
    },
    visits: {
        type: Number,
        default: 1,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("posts", postSchema);
// EOF