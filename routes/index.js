const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const PhotoController = require('../controllers/PhotoController')
const PlaceController = require('../controllers/PlaceController')

router.get('/places', PlaceController.getAllPlaces)
router.get('/places/:id', PlaceController.getPlaceDetailsById)
router.post('/places', PlaceController.createPlace)
router.put('places/:id', PlaceController.updatePlace)

router.get('/photos/:id', PhotoController.getPhotosForPlace)
router.post('/photos/:id', PhotoController.addPhotoForPlace)
router.delete('/photos/:id', PhotoController.removePhotoById)

router.get('/comments/:id', CommentController.getCommentsForPlace)
router.post('/comments/:id', CommentController.createCommentForPlace)
router.delete('/comments/:id', CommentController.markCommentNotProper)

module.exports = router