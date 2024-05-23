const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    access:{
        type:String,
        default:"customer",
        enum:["admin","customer","deliverer"]
    },
    profile:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
    },
    filename:{
        type:String
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    },
    address:{
        type:Schema.Types.ObjectId,
        ref:"Address"
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);

module.exports = User;