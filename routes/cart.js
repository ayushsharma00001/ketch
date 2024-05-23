const express = require("express");
const router = express.Router({mergeParams:true});
const mongoose = require("mongoose");
const Cart = require("../modals/cart");
const { isLoggedin, isAuthenticUser, isOwnerOfCart } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const { renderCartPage, updateInCart, modifyCart } = require("../controllers/cart");

router.get("/cart/:userId/:cartId",isLoggedin,isOwnerOfCart,wrapAsync(renderCartPage));
router.post("/cart/:productId",isLoggedin,wrapAsync(updateInCart));

router.put("/cart/:cartId/:productId",isLoggedin,isOwnerOfCart,wrapAsync(modifyCart));


module.exports = router;