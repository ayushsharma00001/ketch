const Address = require("../modals/address");
const User = require("../modals/user");


module.exports.renderSetAddressPage = async(req,res,next)=>{
    res.render("address/setAddress.ejs");
};

module.exports.postAddress = async(req,res,next)=>{
    var newAddress = new Address(req.body.address);
    newAddress.user = req.user;
    newAddress = await newAddress.save();
    req.user.address = newAddress;
    await req.user.save();
    req.flash("success","Address is set!");
    res.redirect("/profile");

};

module.exports.showAddress = async (req,res,next)=>{
    const {userId} = req.params;
    const user = await User.findById(userId).populate("address");
    res.render("address/address.ejs",{user});
};

module.exports.editAddress = async (req,res,next)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    await Address.findByIdAndUpdate(user.address,req.body.address);
    req.flash("success","Address updated!");
    res.redirect(`/address/${userId}`);
};