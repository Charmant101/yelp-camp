// REQUIRED VARIABLES
 require('dotenv').config();
var express         = require("express");
var App             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var passport        = require("passport");
var localStrategy   = require("passport-local");
var flash           = require("connect-flash");
// var moment = require('moment');
App.locals.moment = require('moment');
var User            = require("./models/user");
var Campground      = require("./models/campgrounds");
var Comment         = require("./models/comments");
var methodOverride  = require("method-override");
var seedDB          = require("./seed");

// TO REQUIRE CREATED ROUTES
var commentRoutes   =require("./Routes/comments");
var campgroundRoutes= require("./Routes/campgrounds");
var authRoutes       = require("./Routes/Auth");
//YELP APP VARIABLE TRIGGERS 
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:/Yelp_camp',{ useNewUrlParser: true });
App.use(bodyParser.urlencoded({extended:true}));
App.set("view engine","ejs");
// moment().format();
App.use(express.static(__dirname + "/public"));
App.use(methodOverride("_method"));
App.use(flash());

// TO SEED DATA INTO DATABASE. 
// seedDB();


// PASSWORD CONFIGURATION
App.use(require("express-session")({
    secret:"Dele is one madass developer",
    resave:false,
    saveUninitialized:false
}));
App.use(passport.initialize());
App.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// MIDDLEWARE DESIGNED TO TOGGLE BETWEEN AUTHENTICATION STATES I.E IF USER IS LOGGED IN OR OUT OR NEEDS SIGNING UP.........JAVASCRIPT LOGIC IS RESIDENT ON THE HEADER EJS ON PARTIALS
App.use(function(req,res,next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

App.use(authRoutes);
App.use("/campgrounds",campgroundRoutes);
App.use("/campgrounds/:id/comments",commentRoutes);


                
                
    App.listen(process.env.PORT,process.env.IP, function(){
    console.log("The yelp camp server is working");
    });