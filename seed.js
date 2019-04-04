var mongoose= require("mongoose");
var Campground= require("./models/campgrounds");
var Comment= require("./models/comments");
var data=[
            {
           name: "Sleepy Hollow",
           image:"https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=500&q=60",
           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut placerat nisl. Nunc lacinia, quam sed ultricies mollis, tortor mi egestas ligula, sed mollis dolor justo ac tortor. Aliquam pharetra, est nec pretium condimentum, felis quam fermentum leo, non lacinia massa erat a est. Donec tincidunt velit quis lacus dignissim, quis lobortis nisi molestie. Quisque rutrum maximus dolor quis molestie. Fusce facilisis, magna vitae auctor vestibulum, dui mi interdum turpis, eget tincidunt est urna ac dui. Duis efficitur felis eu euismod efficitur. Curabitur nibh velit, consequat sit amet mattis at, molestie nec ligula. Morbi lobortis orci quis velit rutrum aliquam."
        },
        {
            name:"Open skies",
            image:"https://images.unsplash.com/photo-1541067018303-3754d076063c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b91a093441c321e86d1d643af2f418e&auto=format&fit=crop&w=500&q=60",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut placerat nisl. Nunc lacinia, quam sed ultricies mollis, tortor mi egestas ligula, sed mollis dolor justo ac tortor. Aliquam pharetra, est nec pretium condimentum, felis quam fermentum leo, non lacinia massa erat a est. Donec tincidunt velit quis lacus dignissim, quis lobortis nisi molestie. Quisque rutrum maximus dolor quis molestie. Fusce facilisis, magna vitae auctor vestibulum, dui mi interdum turpis, eget tincidunt est urna ac dui. Duis efficitur felis eu euismod efficitur. Curabitur nibh velit, consequat sit amet mattis at, molestie nec ligula. Morbi lobortis orci quis velit rutrum aliquam."
        },
        {
            name: "Foggy range",
            image:"https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06d92f647a2937af54f658e199c3d990&auto=format&fit=crop&w=500&q=60",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut placerat nisl. Nunc lacinia, quam sed ultricies mollis, tortor mi egestas ligula, sed mollis dolor justo ac tortor. Aliquam pharetra, est nec pretium condimentum, felis quam fermentum leo, non lacinia massa erat a est. Donec tincidunt velit quis lacus dignissim, quis lobortis nisi molestie. Quisque rutrum maximus dolor quis molestie. Fusce facilisis, magna vitae auctor vestibulum, dui mi interdum turpis, eget tincidunt est urna ac dui. Duis efficitur felis eu euismod efficitur. Curabitur nibh velit, consequat sit amet mattis at, molestie nec ligula. Morbi lobortis orci quis velit rutrum aliquam."
        }
    ];
function seedDB(){
        //Remove all campgrounds
        Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("campgrounds removed");
        // add/create new campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                    } else{
                        console.log("added new campground");
                        // Add comments to campground
                        Comment.create(
                            {
                             text: "lovely scenery,great getaway",
                             contributor:"Ayo Korede"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("New comment");
                                }
                        });
                    }
            });
        });
    });
    }
    
module.exports= seedDB;
