const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const PhotoController = require('../controllers/PhotoController')
const PlaceController = require('../controllers/PlaceController')

module.exports = router