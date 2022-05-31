const express = require('express');
const router = express.Router();

const { Like, Dislike } = require("../Models/Features")



router.post('/getLikes', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
        // console.info(variable)

    }else {
        variable = {commentId: req.body.commentId}
        // console.info(variable)
    }

        Like.find(variable)
            .exec((likes,err) => {
                if(err){return res.status(400).send(err)}
                return res.status(200).json({success:true, likes})
            })
})

router.post('/getDislikes', (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
        // console.info(variable)
    }else {
        variable = {commentId: req.body.commentId}
        // console.info(variable)
    }
    
    Dislike.find(variable)
    .exec((disLikes,err) => {
        if(err){return res.status(400).send(err)}
        return res.status(200).json({success:true,disLikes})
    })
})

router.post('/upLike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
        // console.info(variable)

    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
        // console.info(variable)
    }

    const like = new Like(variable)
        like.save((err,likeResult) => {
            if(err){return res.json({success:false,err})}

            Dislike.findOneAndDelete(variable)
            .exec((err,disLikeResult) => {
                if(err){return res.status(400).json({success:false,err})}
                else{
                return res.status(200).json({success:true})
                    // console.info(disLikeResult)
                }
            })
        })
})

router.post('/unLike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err){
            return res.status(400).json({success: false, err}),
                console.error(err)
            }else{
                return res.status(200).json({success: true})
                // console.info(result)
            }
        })
})

router.post('/unDislike', (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
        // console.info(variable)
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
        // console.info(variable)
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err){
            return res.status(400).json({success:false,err}),
                console.error(err)
        }else {
            return res.status(200).json({success:true})
            // console.info(result)
        }
    })
})

router.post("/upDisLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
                // console.info(likeResult)
            })
    })


})


module.exports = router;