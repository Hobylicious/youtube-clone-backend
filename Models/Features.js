const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User-model');
const Comment = mongoose.model('Comment', commentSchema);
const Dislike = mongoose.model('Dislike', dislikeSchema);
const Subscriber = mongoose.model("Subscriber", subscriberSchema);
const Like = mongoose.model('Like', likeSchema);
const Video = mongoose.model('Video', videoSchema);


const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, { timestamps: true })

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   videoId: {
       type: Schema.Types.ObjectId,
       ref: 'Video'
   }

}, { timestamps: true })

const dislikeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   videoId: {
       type: Schema.Types.ObjectId,
       ref: 'Video'
   }

}, { timestamps: true })

const subscriberSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    filePath : {
        type: String,
    },
    category: String,
    views: {
        type: Number,
        default: 0 
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true })


module.exports = { Subscriber }
module.exports = { Comment }
module.exports = { Dislike }
module.exports = { Like }
module.exports = { Video }