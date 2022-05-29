// Load any env variables at the start
process.env.NODE_ENV === 'production'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const User = require("./Models/User-model")
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
    
// Everyone is an admin on this cluster right now
// usernames: Brian, Francis, Shindano 
// password: Brian1, Francis1, Shindano1
// MONGO_URI="mongodb+srv://<username>:<password>@cluster0.zrdag.mongodb.net/db-name?retryWrites=true&w=majority"

// Connecting to MongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(conn => console.log(`Mongodb Connected on ${conn.connections[0].name}`))
.catch(err => console.error(err))


        
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/video', require('./routes/video'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))
// app.use('/api/subscribe', require('./routes/subscribe'))

// I have all subscriber content commented out, no routes for it either yet. 
 // I'm more concerned with getting likes and comments working

// if(process.env.NODE_ENV === 'production'){
//     app.get("*", (req, res) => {
//         let reactPath = path.join(__dirname,'..','youtube-clone-frontend','public','index.html') 
//             // console.log(reactPath)
//             res.sendFile(reactPath)
//                 console.log(req,res)
//     })
// }

// ^^ Not sure we need that function. I'm going off a repo from github
// and it looks like he preloaded static content. I'm going to leave it for now 
// in case it ends up being important. I changed it around to work for
// our two repos as long as you have them both in the same folder. 
    
const PORT = process.env.PORT || 4001

app.listen(`${PORT}`, () => {
    console.log(`app running on ${PORT}`)
})
  











    