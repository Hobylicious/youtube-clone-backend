if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Testing the routes for logging in here first. We can move them around later
// const authController = require('./tempRoutes4Testing/tempRoutes')
// app.use('/users', authController)

const express = require("express"),
    mongoose = require("mongoose"),
    User = require("./Models/User-model"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    app = express(),
    path = require("path"),
    expressPath = require("express-path")

    app.set('view engine', 'ejs')
      // const routes = []
    // app.set('views', path.join(__dirname, '/tempRoutes4Testing'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(require("express-session")({
    secret: process.env.REACT_APP_SESSION_SECRET || 'ABHDSAKIWHRHKAJSDNDA',
    resave: false,
    saveUninitialized: false
      }));
    
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




// Commented out because I don't really know if the routes belong here.
// I'm not used to this frontend/backend setup


app.get("/",function(req, res){
   res.render("Home.ejs")
})

app.get("/Home", isLoggedIn, function(req, res){
    res.render("Secret.ejs");
})

app.get("/register", function(req, res){
    res.render("Register.ejs");
})

// handling user sign up
app.post("/register", function(req, res){
    // console.log(req.body.username);
    // console.log(req.body.password);
    User.create(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("Register.ejs")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("Secret")
        })
    })
})

// // Login Form
app.get("/login", function(req, res){
    res.render("login.ejs")
})

// // Login Logic
// // middleware
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
  console.log(req,res)
    })

// Logout
app.get("/logout", function(req, res){
    req.logout()
    res.redirect("/")
})

// check isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}
function isLoggedOut(req, res, next){
    if(!req.isAuthenticated()){return next();}
    res.redirect("/home")
}

const port = process.env.PORT || 4000;

app.listen(port, function(){
    console.log(`P3 backend server running started on ${port}`)
});

    