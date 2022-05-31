// Load any env variables at the start
process.env.NODE_ENV === 'production'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const session = require("express-session")
const cors = require("cors")

// Configure middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser("changeToDotENV"))
// app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    // We can change when we deploy
    credentials: true,
  })
);
app.use(
  session({
    secret: "changeToDotENV",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize())
app.use(passport.session())

// Everyone is an admin on this cluster right now
// usernames: Brian, Francis, Shindano 
// password: Brian1, Francis1, Shindano1
// MONGO_URI="mongodb+srv://<username>:<password>@cluster0.zrdag.mongodb.net/Accounts?retryWrites=true&w=majority"

// Connecting to MongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(conn => console.log(`Mongodb Connected on ${conn.connections[0].name}`))
.catch(err => console.error(err))

const User = require("./Models/User-model")
require("./passport-config")(passport);

app.use('/api/user', require('./routes/auth'))
app.use('/api/video', require('./routes/video'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))
// app.use('/api/subscribe', require('./routes/subscribe'))

const PORT = process.env.PORT || 4001

app.listen(`${PORT}`, () => {
    console.log(`app running on ${PORT}`)
})
  











    