const Product = require("../modals/product");
module.exports.renderAddProductForm = async(req,res,next)=>{
    res.render("products/addProduct.ejs");
}

module.exports.postProduct = async(req,res,next)=>{
    const files = req.files;
    const {product} = req.body;
    var addedProduct = new Product(product);
    addedProduct.img.push(files.img1[0].path);
    addedProduct.img.push(files.img2[0].path);
    addedProduct.img.push(files.img3[0].path);
    await addedProduct.save();
    res.redirect("/");
}

module.exports.renderAllProductsPage = async (req,res,next)=>{
    let data = await Product.find({});
    res.render("products/products.ejs",{data});
}

module.exports.showParticularProduct  = async (req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate({path:"review",populate:{path:"author"}});
    const oproducts = await Product.aggregate([{$sample:{size:5}}]);
    res.render("products/showProduct.ejs",{product,oproducts});
}

module.exports.renderEditProductForm = async(req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/editForm.ejs",{product});
}

module.exports.updateProduct = async (req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body.product);
    res.redirect(`/products/${id}`);
}

module.exports.deleteProduct = async(req,res,next)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success","Product SuccessFully deleted");
    res.redirect('/products');
}