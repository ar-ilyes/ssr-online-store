const Product = require("../models/product");
exports.getAddProduct=(req,res,next)=>{
    res.render("add-product",{title:"Add Product",path:"/admin/add-product"})
}
exports.postProduct=(req,res,next)=>{
    let prod = new Product(req.body.title,req.body.desc);
    prod.save();
    res.redirect("/");
}
exports.GetAllProducts=(req,res,next)=>{
    Product.FetchAll(products=>{ res.render("shop",{title:"shop",products:products,path:"/"});});
};