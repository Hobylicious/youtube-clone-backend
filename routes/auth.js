const express = require('express')
const router = express.Router()
const passport = require('passport');
const User = require('../Models/User-model')

//Routes
router.get("/",function(req, res){
   res.render("home")
})

router.get("/secretOrWhereverOurHomePageIs", isLoggedIn, function(req, res){
    res.render("secretOrWhereverOurHomePageIs")
})

router.get("/register", function(req, res){
    res.render("register")
})

// Handling user sign up
router.post("/register", function(req, res){
   console.log(req.body.username)
    console.log(req.body.password)
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        // passport.authenticate("local")(req, res, function(){
            res.redirect("/login")
        // });
    });
});

// Login Form
router.get("/login", function(req, res){
    res.render("login")
})

// Login Middleware
router.post("/login", passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}), function(req, res){
    console.log(User)
})

// Logout
router.get("/logout", function(req, res){
    req.logout()
    res.redirect("/login")
})

// check isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router;

