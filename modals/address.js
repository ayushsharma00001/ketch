const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        maxLength:10,
        minLength:10
    }
});

const Address = mongoose.model("Address",addressSchema);

module.exports = Address;