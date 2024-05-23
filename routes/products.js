const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../modals/product.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { isAdmin } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { renderAddProductForm, postProduct, renderAllProductsPage, showParticularProduct, renderEditProductForm, updateProduct, deleteProduct } = require("../controllers/products.js");
const upload = multer({storage});

router.route("/addProduct")
.get(isAdmin,wrapAsync(renderAddProductForm))
.post(isAdmin,upload.fields([{name:"img1"},{name:"img2"},{name:"img3"}]),wrapAsync(postProduct));

router.get("/products",wrapAsync(renderAllProductsPage));

router.route("/products/:id")
.get(wrapAsync(showParticularProduct))
.delete(wrapAsync(deleteProduct));


router.route("/products/:id/edit")
.get(wrapAsync(renderEditProductForm))
.put(wrapAsync(updateProduct))
module.exports = router;