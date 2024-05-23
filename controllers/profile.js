const User = require("../modals/user");
module.exports.renderProfilePage = async(req,res,next)=>{
    res.render("profile/profile.ejs");
}

module.exports.renderEditprofileForm = async(req,res,next)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    res.render("profile/Editprofile.ejs",{user});
}

module.exports.updateProfile = async(req,res,next)=>{
    let {id} = req.params;
    const {age,gender} = req.body;
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        await User.findByIdAndUpdate(id,{
            age,
            gender,
            filename:req.file.filename,
            profile:req.file.path
        });
    }
    else{
        await User.findByIdAndUpdate(id,{
            age,
            gender,
        });
    }
    req.flash("success","Profile updated");
    res.redirect("/profile");
}