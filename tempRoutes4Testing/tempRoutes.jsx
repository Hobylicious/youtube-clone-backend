// // ===================
// //     ROUTES
// // ===================

// const express = require('express'),
//     router = express.Router()




// router.get("/",function(req, res){
//    res.render("./Login.ejs"); 
// });

// // app.get("/Home", isLoggedIn, function(req, res){
// //     res.render("./views/secret.ejs");
// // });

// // app.get("/register", function(req, res){
// //     res.render("./views/register.ejs");
// // });

// // // handling user sign up
// // app.post("/register", function(req, res){
// //     // console.log(req.body.username);
// //     // console.log(req.body.password);
// //     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
// //         if(err){
// //             console.log(err);
// //             return res.render("./views/register.ejs");
// //         }
// //         passport.authenticate("local")(req, res, function(){
// //             res.redirect("/secret");
// //         });
// //     });
// // });

// // // Login Form
// // app.get("/login", function(req, res){
// //     res.render("./views/login.ejs");
// // });

// // // Login Logic
// // // middleware
// // app.post("/login", passport.authenticate("local",{
// //     successRedirect: "/secret",
// //     failureRedirect: "/login"
// // }), function(req, res){
    
// // });

// // // Logout
// // app.get("/logout", function(req, res){
// //     req.logout();
// //     res.redirect("/");
// // });

// // // check isLoggedIn
// // function isLoggedIn(req, res, next){
// //     if(req.isAuthenticated()){
// //         return next();
// //     }
// //     res.redirect("/login");
// // }
// // function isLoggedOut(req, res, next){
// //     if(!req.isAuthenticated()){return next();}
// //     res.redirect("/home")
// // }

// module.exports = router;