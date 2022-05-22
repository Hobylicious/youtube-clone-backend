const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

var User = new mongoose.Schema({
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
    }
})

User.plugin(passportLocalMongoose);

let User = mongoose.model("User", User)
module.exports = {User}