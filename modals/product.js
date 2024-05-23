const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    s:{
        type:Number
    },
    m:{
        type:Number
    },
    l:{
        type:Number
    },
    price:{
        type:Number,
        required:true,
        minimum:0
    },
    img:[
        {
            type:String,
            required:true
        },
        required=true
    ],
    genre:[
        {
            type:String,
        }
    ],
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]

});


productSchema.post("findOneAndDelete",async (product)=>{
    if(product){
        await Review.deleteMany({_id:{$in:product.review}});
    }
})



const Product = mongoose.model("Product",productSchema);

module.exports = Product;