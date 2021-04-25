const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const PhotoController = require('../controllers/PhotoController')
const PlaceController = require('../controllers/PlaceController')

router.get('/places', PlaceController.getAllPlaces)
router.get('/places/:id',PlaceController.getPlaceByID, PlaceController.getPlaceDetailsById)
router.post('/places', PlaceController.createPlace)
router.put('/places/:id',PlaceController.getPlaceByID, PlaceController.updatePlace)

router.get('/photos/:id',PlaceController.getPlaceByID, PhotoController.getPhotosForPlace)
router.post('/photos/:id',PlaceController.getPlaceByID, PhotoController.addPhotoForPlace)
router.delete('/photos/:id', PhotoController.removePhotoById)

router.get('/comments/:id',PlaceController.getPlaceByID, CommentController.getCommentsForPlace)
router.post('/comments/:id',PlaceController.getPlaceByID, CommentController.createCommentForPlace)
router.delete('/comments/:id', CommentController.markCommentNotProper)

module.exports = router