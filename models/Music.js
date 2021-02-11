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
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;