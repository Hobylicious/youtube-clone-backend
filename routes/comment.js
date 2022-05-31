const express = require('express');
const router = express.Router();
const { Comment } = require("../Models/Features")

router.post('/getComments', (req, res) => {
    Comment.find({"postID": req.body.videoId})
        .populate('writer')
        .exec((comments,err) => {
            if(err){
                return res.send(err).status(400),
                console.error(err)
            }if(comments){
                res.status(200).json({success: true, comments})
                // console.log(comments)
            }
        })
})

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)
        comment.save((err,comment) => {
            if(err){
                 return res.json({success: false, err}),
                 console.error(err)
            }
            Comment.find({"_id": comment._id})
                .populate('writer')
                .exec((err,result) => {
                    if(err){ 
                    return res.json({success: false, err})
                    }else{
                    return res.status(200).json({success: true, result})
                        // console.info(result)
                    }
                })
        })
})

module.exports = router;