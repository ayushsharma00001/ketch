const Cart = require("../modals/cart");
const User = require("../modals/user");
module.exports.renderSignupForm = async (req,res,next)=>{
    res.render("authentication/signup.ejs");
}

module.exports.registerUser = async (req,res,next)=>{
    try{
        let {username,password,email,access} = req.body;
        const newUser = new User({email:email,username:username,access:access});
        const registeredUser = await User.register(newUser,password);
        const registeredUserCart = new Cart({
            user:registeredUser._id
        });
        let registeredUserCartid = await registeredUserCart.save();
        registeredUser.cart = registeredUserCartid._id;
        await User.findByIdAndUpdate(registeredUser._id , registeredUser);

        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            else{
                req.flash("success","Welcome to Ketch");
                res.redirect("/");
            }
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginPage = async(req,res,next)=>{
    res.render("authentication/login.ejs");
}

module.exports.loginUser = async(req,res,next)=>{
    req.flash("success","You've logged in!");
    res.redirect("/");
};

module.exports.logoutUser = async (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success","You've logged out!");
            res.redirect("/");
        }
    })
}