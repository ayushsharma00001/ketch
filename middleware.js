const Review = require("./modals/review");
const User = require("./modals/user");

module.exports.isLoggedinForLogin = async(req,res,next)=>{
    if(req.isAuthenticated()){
        req.flash("error","You are already Logged in...");
        res.redirect("/");
    }
    else{
        next();
    }
}

module.exports.isLoggedin = async(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","Login to continue..");
        return res.redirect("/login");
    }
}

module.exports.isAuthenticUser = async(req,res,next)=>{
    const {id} = req.params;
    if(req.user && req.user._id.equals(id)){
        next();
    }
    else{
        req.flash("error","You are not permitted to access this page!");
        res.redirect("/");
    }
}
module.exports.isOwnerOfCart = async(req,res,next)=>{
    const {cartId} = req.params;
    if(req.user && req.user.cart.equals(cartId)){
        next();
    }
    else{
        req.flash("error","You are not permitted to access this page!");
        return res.redirect("/");
    }
}

module.exports.isAdmin = async(req,res,next)=>{
    if(req.user && req.user.access == "admin"){
        next();
    }
    else{
        req.flash("error","You are not admin...");
        res.redirect("/");
    }
}


module.exports.isAuthor = async(req,res,next)=>{
    var {reviewId,productId} = req.params;
    let review = await Review.findById(reviewId)
    if(review.author.equals(req.user._id)){
        next();
    }
    else{
        req.flash("error","You can't delete this Review");
        res.redirect(`/products/${productId}`);
    }

}


module.exports.canViewAddress = async(req,res,next)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    if(req.user._id.equals(user._id)){
        next();
    }
    else{
        req.flash("error","You can'nt access someone elses address!");
        res.redirect("/");
    }
}