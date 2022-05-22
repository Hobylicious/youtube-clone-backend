const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
   displayName: String,
        
    username: {
        type:String,
        trim:true,
        unique: 1 ,
        required:true
    },
    password: {
        type: String,
        required:true
    }, 
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: String
    }
})


// const User = mongoose.model("User", UserSchema)
UserSchema.plugin(passportLocalMongoose)
module.exports = /*{User},*/ mongoose.model('User', UserSchema)