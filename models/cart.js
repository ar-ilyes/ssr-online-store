const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull:false,
        primaryKey:true,
    }
})
module.exports=Cart;

// module.exports = class Cart{
//     static addProduct(product,price){
//         fs.readFile("./data/cart.json",(err,data)=>{
//             let cart = {products:[],price:0};
//             if(!err){
//                 cart = JSON.parse(data);
//             }
//                 let newcart=[];
//                 //let index=-1;
//                 let index=cart.products.findIndex((el)=>{
//                     return el.productData.id===product.id
//                 });
//                 newcart={...cart};
//                 newcart.price+=parseInt(price);
//                 if(index===-1){
//                     newcart.products.push({productData:product,qty:1});
//                 }else{
//                     let newproduct={...cart.products[index]};
//                     newproduct.qty++;
//                     newcart.products[index]=newproduct;
//                 }
//                 fs.writeFile("./data/cart.json",JSON.stringify(newcart),(err)=>{
//                     if(err){
//                         console.log(err);
//                     }
//                 })
            
//         })
//     }
//     static FetchAll(cb){
//         fs.readFile('./data/cart.json',(err,data)=>{
//             let products = [];
//             if(!err){
//                 products=JSON.parse(data).products;
//             }else{
//                 console.log(err);
//             }
//             cb(products);
//         })
//     }
//     static delete(id,cb){
//         fs.readFile('./data/cart.json',(err,data)=>{
//             let products = [];
//             let cart={products:[],price:0};
//             if(!err){
//                 cart=JSON.parse(data);
//                 products=cart.products;
//             }else{
//                 console.log(err);
//             }
//             let productInd=products.findIndex((el)=>{
//                 return el.productData.id!=id;
//             });
//             if(productInd>=0){
//             products[productInd].qty--;}
//             let newProductsList=products.filter((el)=>el.qty>0);
//             cart.products=newProductsList;
//             fs.writeFile('./data/cart.json',JSON.stringify(cart),(err)=>{
//                 if(err){
//                     console.log(err);
//                 }
//             })
//             cb();
//         })
//     }
// }