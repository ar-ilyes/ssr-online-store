const express= require("express");
const path =require("path");
const {products}=require("./admin.js");
const router = express.Router();
router.get('/',(req,res,next)=>{
    res.render("shop",{title:"shop",products:products,path:"/"});
})
module.exports=router;