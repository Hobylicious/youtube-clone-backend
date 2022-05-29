const mongoose = require("mongoose")
const Schema = mongoose.Schema

var UserSchema = new Schema({  

    username: {
        type:String,
    },
    password: {
        type: String
    }
})


const User = mongoose.model('users', UserSchema);
module.exports = { User }
