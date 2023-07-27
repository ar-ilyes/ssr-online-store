const Product = require("../models/product");
exports.getAddProduct=(req,res,next)=>{
    res.render("add-product",{title:"Add Product",path:"/admin/add-product"})
}
exports.postProduct=(req,res,next)=>{
    let prod = new Product(req.body.title,req.body.desc);
    prod.save()
        .then(()=>{res.redirect("/");})
        .catch((e)=>{console.log(e)});
}
exports.GetAllProducts=(req,res,next)=>{
    Product.FetchAll()
        .then(data=>{ 
            let products=data[0]
            res.render("shop",{title:"shop",products:products,path:"/"});
        })
        .catch((e)=>{console.log(e);});
};
