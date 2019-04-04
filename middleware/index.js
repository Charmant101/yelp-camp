var Campground= require("../models/campgrounds");
var Comment=    require("../models/comments");
var User = require("../models/user");

// all middleware goes here
var middlewareObj= {};

middlewareObj.checkCampgroundOwnership= function(req,res,next){
    if(req.isAuthenticated()){
                              Campground.findById(req.params.id, function(err, editCampground){
                              if(err){
                                      req.flash("error", "Campground not found");
                                      res.redirect("back");
                            } 
                    else{
                         // does user own campground???
                         if(editCampground.contributor.id.equals(req.user._id) || req.user.isAdmin){
                             next();
                         } else{
                                req.flash("error","You need Permission to do that");
                                res.redirect("back");
                         }
                       
                 }
            }); 
        }
        else{
              req.flash("error", "You need to be Logged in to do that"); 
             res.redirect("back");
            }
     };
    
    middlewareObj.checkCommentOwnership = function(req,res,next){
                 if(req.isAuthenticated()){
                         Comment.findById(req.params.comment_id, function(err, editComment){
                         if(err){
                                 res.redirect("back");
                                } else{
                                     // does user own comment???
                                     if(editComment.contributor.id.equals(req.user._id) || req.user.isAdmin){
                                         next();
                                     } else{
                                            req.flash("error", "You dont have Permission to do that");
                                            res.redirect("back");
                                     }
                                   
                             }
                        }); 
                    }
                    else{
                         req.flash("error", "You need to be logged in to do that");
                         res.redirect("back");
                        }
                 };
                 
                 
    middlewareObj.checkProfileOwnership= function(req,res,next){
    if(req.isAuthenticated()){
                              User.findById(req.params.user_id, function(err, editProfile){
                              if(err){
                                      req.flash("error", "error");
                                      res.redirect("back");
                            } 
                    else{
                         // does user own the info???
                         if(editProfile.contributor.id.equals(req.user._id) || req.user.isAdmin){
                             next();
                         } else{
                                req.flash("error","You need Permission to do that");
                                res.redirect("back");
                         }
                       
                 }
            }); 
        }
        else{
              req.flash("error", "You need to be Logged in to do that"); 
             res.redirect("back");
            }
     };
    
                 
    middlewareObj.isLoggedIn =   function(req,res,next){
                    if(req.isAuthenticated()){
                            return next();
                        }
                        req.flash("error", "You need to be logged in to do that");
                        res.redirect("/login");
                    };
                







module.exports= middlewareObj;