const Place = require('../models/Place')
const Comment = require('../models/Comment')

exports.getCommentsForPlace = async (req, res) => {
    const place = req.body.place;
    try {
        let commentsForPlace = await Comment.find({
            place : place._id
        })
        res.json(commentsForPlace)
    } catch (err) {
        res.status(404).json({
            message: "No comments found for place" + place._id
        })
    }
}

exports.createCommentForPlace = async (req, res) => {
    let place = req.body.place
    let newComment = new Comment({
        nick: req.body.nick,
        title: req.body.title,
        content: req.body.content,
        rate: req.body.rate,
        dateOfVisit: req.body.dateOfVisit,
        commentDate: new Date(),
        proper: true,
        place: place._id
    })

    try {
        const addedComment = await newComment.save()
        res.status(201).json(addedComment)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
}

exports.markCommentNotProper = (req, res) => {
    res.sendStatus(500);
}

