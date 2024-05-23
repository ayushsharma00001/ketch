const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();
const Address = require("../modals/address");
const { isLoggedin, canViewAddress } = require("../middleware");
const User = require("../modals/user");

const addressControllers = require("../controllers/address");

router.get("/setAddress",isLoggedin,wrapAsync(addressControllers.renderSetAddressPage));


router.post("/setAddress/:userId",isLoggedin,wrapAsync(addressControllers.postAddress));


router.get("/address/:userId",isLoggedin,canViewAddress,wrapAsync(addressControllers.showAddress));

router.put("/editAddress/:userId",isLoggedin,wrapAsync(addressControllers.editAddress));



module.exports = router;