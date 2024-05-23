const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        _id:false
    },
    product:[
        {
            productId:{
                type:Schema.Types.ObjectId,
                ref:"Product",
            },
            size:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            },
            _id:false
        }
    ]
});

const Cart = mongoose.model("Cart",cartSchema);

module.exports = Cart;