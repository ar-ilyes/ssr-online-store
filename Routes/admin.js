const express= require("express");
const path =require("path");
const router = express.Router();
let products=[];
router.get('/add-product',(req,res,next)=>{
    res.render("add-product",{title:"Add Product",path:"/admin/add-product"})
})
router.post('/add-product',(req,res,next)=>{
    products.push(req.body);
    res.redirect("/");
})
module.exports={router,products};