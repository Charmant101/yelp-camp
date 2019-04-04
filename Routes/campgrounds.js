 var express= require("express");
 var router=  express.Router();
 var Campground= require("../models/campgrounds");
 var middleware = require("../middleware");
 var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
 
 
 // INDEX: TO DISPLAY ALL CAMPGROUNDS
router.get("/", function(req,res){
        Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/Index",{campgrounds:allCampgrounds}); 
        }
    });
     
    });
    // NEW: DISPLAYS FORM TO MAKE A NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});
    // CREATE: ADD NEW CAMPGROUND TO DATABASE
router.post("/", middleware.isLoggedIn, function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var cost = req.body.cost;
        var contributor={
            id:         req.user._id,
            username: req.user.username
 };
        
geocoder.geocode(req.body.location, function (err, data) {
if (err || !data.length) {
req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
var lat = data[0].latitude;
var lng = data[0].longitude;
var location = data[0].formattedAddress;
var newCampground ={name: name,image:image, description:desc,contributor:contributor,cost:cost,location:location,lat:lat,lng:lng};
Campground.create(newCampground,function(err,newlyCreated){
if(err){
            req.flash("error", "Oops something went wrong");
            console.log(err);
        } else{
                console.log("newlyCreated");
                req.flash("Success","new Campground created");
                res.redirect("/campgrounds");  
            }
        });
        
        
    });
});
    //SHOW-shows more information about one campground
    router.get("/:id", function(req, res) {
        Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
            if(err){
                console.log(err);
            } else{
                console.log(foundCampground);
                // console.log(JSON.stringify(foundCampground));
               res.render("campgrounds/show", {campground: foundCampground, page:"campgrounds"});   
            }
        });
     });
    //  EDIT CAMPGROUNDS
    router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
                    Campground.findById(req.params.id, function(err, editCampground){
                             res.render("campgrounds/edit",{campground:editCampground} );
                        
                 });
            });
        
        
        
    
    // UPDATE CAMPGROUNDS
    router.put("/:id",middleware.checkCampgroundOwnership,function(req, res) {
        geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
            if(err){
                res.redirect("/campgrounds");
            } else{
                    req.flash("success", "campground successfully updated");
                    res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});
    
    // DESTROY ROUTE
    router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
       Campground.findByIdAndRemove(req.params.id, function(err){
           if(err){
               res.redirect("/campgrounds");
           } else{
                    req.flash("success", "Campground Deleted");
                    res.redirect("/campgrounds");
           }
       });
    });
     
    
     module.exports= router;
     