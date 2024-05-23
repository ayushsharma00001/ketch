const Cart = require("../modals/cart");

module.exports.renderCartPage = async (req,res,next)=>{
    const {cartId} = req.params;
    const cart = await Cart.findById(cartId).populate("product.productId");
    res.render("cart/cart.ejs",{cart});
}

module.exports.updateInCart = async (req,res,next)=>{
    const {productId} = req.params;
    const {size,quantity} = req.body;
    let cart = await Cart.findById(req.user.cart);
    cart.product.push({productId,size,quantity});
    cart = await Cart.findByIdAndUpdate(req.user.cart,cart);
    req.flash("success","Item added to cart");
    res.redirect(`/products/${productId}`);

}

module.exports.modifyCart = async (req,res,next)=>{
    const {cartId,productId} = req.params;
    const cart = await Cart.findByIdAndUpdate(cartId,{$pull:{product:{productId}}});
    res.redirect(`/cart/${req.user._id}/${req.user.cart}`);
}