 var express= require("express");
 var router=  express.Router();
 var passport= require("passport");
 var User= require("../models/user");
  var middleware = require("../middleware");

router.get("/", function(req,res){
    res.render("landing");
    });

                // ==========================
                // AUTHENTICATION ROUTES
                // ===========================
             //  REGISTER OR SIGN UP ROUTE   
router.get("/register", function(req, res) {
        res.render("register");
    });
    //  REGISTER OR SIGN UP ROUTE LOGIC
router.post("/register", function(req, res) {
            var newUser = new User({
                username:req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                avatar: req.body.avatar,
                info: req.body.info,
                email: req.body.email
                
            });
            if(req.body.admincode ==="Oladele1234"){
                newUser.isAdmin= true;
            }
            User.register(newUser, req.body.password,function(err,user){
            if(err){
                    console.log(err);
                    return res.render("register", {error: err.message});
                    } 
            passport.authenticate("local")(req,res,function(){
                req.flash("success", "Welcome to YelpCamp " +  user.username);
                res.redirect("/campgrounds");
            });
        });
    });
    
    // BASIC LOGIN ROUTE
  router.get("/login",function(req, res) {
             res.render("login",{page:"login"});
    });
    // HANDLING OF LOGIN LOGIC
  router.post("/login", passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res) {
       req.flash("success","You are successfully logged in" + currentUser.username);
    });
    //==================================
    // LOGOUT LOGIC
    router.get("/logout", function(req, res) {
        req.flash("success","You are successfully logged out");
        req.logout(); 
        res.redirect("/campgrounds");
    });
    
    // USER PROFILE LOGIC
    router.get("/users/:id", function(req, res) {
        User.findById(req.params.id, function(err,foundUser){
         if(err){
                    req.flash("error", "Oops something went wrong");
                    res.redirect("/campgrounds");
             
         }   else{
                    res.render("users/show",{user:foundUser});
         }
        });
    });
    
    // TO EDIT USER PROFILE
     router.get("/users/:id/edit", function(req, res) {
        User.findById(req.params.id, function(err,editProfile){
            if(err){
                req.flash("error","oops something went wrong");
            } else{
                res.render("users/edit", {user:editProfile});
            }
        });
    });
    //  TO UPDATE USER PROFILE CHANGES
    router.put("/users/:id", function(req,res){
       User.findByIdAndUpdate(req.params.id,req.body.user, function(err,updatedUser){
           if(err){
               req.flash("error", "errror occcured");
              return res.redirect("back");
           }else {
               req.flash("success","profile updated");
               res.redirect("/users/" + req.params.id);
           }
       });
    });
    // TO POSSIBLY DELETE USER PROFILE
    router.delete("/users/:id", function(req,res){
  User.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "an error occurred");
          res.redirect("/campgrounds");
      } else{
          req.flash("success", "profile successfully deleted");
           res.redirect("/campgrounds");
      }
  });
    });
   
        
         module.exports= router;
    