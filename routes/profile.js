const express  = require("express");
const User = require("../modals/user");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { isLoggedin, isAuthenticUser } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { renderProfilePage, renderEditprofileForm, updateProfile } = require("../controllers/profile.js");
const upload = multer({storage});

router.get("/profile",wrapAsync(renderProfilePage));

router.route("/profile/:id")
.get(isLoggedin,isAuthenticUser,wrapAsync(renderEditprofileForm))
.put(isLoggedin,isAuthenticUser,upload.single("profile"),wrapAsync(updateProfile));


module.exports = router;