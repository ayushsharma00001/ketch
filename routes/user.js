const express  = require("express");
const router = express.Router();
const User = require("../modals/user");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const passport = require("passport");
const { isLoggedinForLogin } = require("../middleware");
const Cart = require("../modals/cart");
const wrapAsync = require("../utils/wrapAsync");
const { renderSignupForm, registerUser, loginUser, renderLoginPage, logoutUser } = require("../controllers/user");

router.route("/signup")
.get(wrapAsync(renderSignupForm))
.post(wrapAsync(registerUser));

router.route("/login")
.get(isLoggedinForLogin,wrapAsync(renderLoginPage))
.post(isLoggedinForLogin,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(loginUser));


router.get("/logout",wrapAsync(logoutUser))




module.exports = router;