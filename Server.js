if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express"),
    mongoose = require("mongoose"),
    User = require("./Models/User-model"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    
    app.use(require("express-session")({
    secret: process.env.REACT_APP_SESSION_SECRET || 'ABHDSAKIWHRHKAJSDNDA',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Commented out because I don't really know if the routes belong here.
// I'm not used to this frontend/backend setup


// app.get("/",function(req, res){
//    res.render("./views/home.ejs"); 
// });

// app.get("/Home", isLoggedIn, function(req, res){
//     res.render("./views/secret.ejs");
// });

// app.get("/register", function(req, res){
//     res.render("./views/register.ejs");
// });

// // handling user sign up
// app.post("/register", function(req, res){
//     // console.log(req.body.username);
//     // console.log(req.body.password);
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("./views/register.ejs");
//         }
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/secret");
//         });
//     });
// });

// // Login Form
// app.get("/login", function(req, res){
//     res.render("./views/login.ejs");
// });

// // Login Logic
// // middleware
// app.post("/login", passport.authenticate("local",{
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }), function(req, res){
    
// });

// // Logout
// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });

// // check isLoggedIn
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
// function isLoggedOut(req, res, next){
//     if(!req.isAuthenticated()){return next();}
//     res.redirect("/home")
// }

const port = process.env.PORT || 4000;

app.listen(port, function(){
    console.log(`P3 backend server running started on ${port}`)
});

    