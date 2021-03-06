const mongoose = require("mongoose");
const Schema = mongoose.Schema

const musicSchema = Schema({
    title: {
        type: String,
        required: true
    },
    audio: {
        type: Object,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;