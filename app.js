if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express  = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// requiring routes
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const addProductRoutes = require("./routes/products");
const reviewRoutes = require("./routes/review");
const addresRoutes = require("./routes/address");

const User = require("./modals/user");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratagy = require("passport-local");
const Product = require("./modals/product");
const ExpressError = require("./utils/ExpressError");
const MongoStore = require('connect-mongo');

// Mongo store setup
const db_url = process.env.DB_URL;
const store = MongoStore.create({
  mongoUrl:db_url,
  crypto:{
      secret:process.env.SECRET
  },
  tuchAfter:24*3600

});
store.on("error",()=>{
  console.log("Error occured on Mongo session store",err);
})


sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUnintitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  };


app.use(session(sessionOptions));
app.use(flash());

// Setting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})



app.get("/",async(req,res,next)=>{
    let data = await Product.aggregate([{$sample:{size:5}}]);
    res.render("home.ejs",{data});
})
app.use("/",profileRoutes);
app.use("/",userRoutes);
app.use("/",cartRoutes);
app.use("/",addProductRoutes);
app.use("/",reviewRoutes);
app.use("/",addresRoutes);



app.use("*",async (req,res,next)=>{
    next(new ExpressError(404,"Page not exists"));
});
app.use((err,req,res,next)=>{
    let {statusCode = 400 , message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{statusCode,message});
})

async function main(){
    await mongoose.connect(process.env.DB_URL);
}
main()
.then(db => console.log('DB is connected'))
.catch(err => console.log(err.message));

app.listen(8080,()=>{
    console.log("App is listening on port 8080");
})