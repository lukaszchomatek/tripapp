const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    dateOfVisit : {
        type: Date,
        required: true
    },
    commentDate: {
        type: Date,
        required: true
    },
    proper: {
        type: Boolean,
        required: true,
        default: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "Place"
    }
})

module.exports = mongoose.model('Comment', commentSchema)