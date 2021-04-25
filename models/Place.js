const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    costToVisit: {
        type: Number,
        required: true
    },
    timeToVisit: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Place', placeSchema)