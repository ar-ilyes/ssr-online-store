const fs = require("fs");

module.exports = class Cart{
    static addProduct(id,price){
        fs.readFile("./data/cart.json",(err,data)=>{
            let cart = {products:[],price:0};
            if(!err){
                cart = JSON.parse(data);
            }
                let newcart=[];
                //let index=-1;
                let index=cart.products.findIndex((el)=>{
                    return el.id===id
                });
                newcart={...cart};
                newcart.price+=parseInt(price);
                if(index===-1){
                    newcart.products.push({id:id,qty:1});
                }else{
                    let newproduct={...cart.products[index]};
                    newproduct.qty++;
                    newcart.products[index]=newproduct;
                }
                fs.writeFile("./data/cart.json",JSON.stringify(newcart),(err)=>{
                    if(err){
                        console.log(err);
                    }
                })
            
        })
    }
}