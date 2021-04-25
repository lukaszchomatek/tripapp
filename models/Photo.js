const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: "Place"
    }
})

module.exports = mongoose.model('Photo', photoSchema)