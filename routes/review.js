const express = require("express");
const router = express.Router();
const Review = require("../modals/review");
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../modals/product");
const {isLoggedin, isAuthor} = require("../middleware");
const { createReview, deleteReview } = require("../controllers/review");


router.post("/product/:productId/review",isLoggedin,wrapAsync(createReview));

router.delete("/product/:productId/review/:reviewId",isLoggedin,isAuthor,wrapAsync(deleteReview));


module.exports = router;


