const Product = require("../modals/product");
const Review = require("../modals/review");


module.exports.createReview = async(req,res,next)=>{
    const {productId} = req.params;
    const product = await Product.findById(productId);
    let newReview = new Review(req.body.review);
    product.review.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await product.save();
    req.flash("success","Review created");
    res.redirect(`/products/${productId}`);
}

module.exports.deleteReview = async (req,res,next)=>{
    var {productId , reviewId} = req.params;
    await Product.findByIdAndUpdate(productId,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/products/${productId}`);
}