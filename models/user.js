var mongoose= require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose");
var UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    avatar: String,
    info:String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: {type:Boolean, default:false},
    contributor:{
       id: {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
            
        },
        username:String
    }
    
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",UserSchema);