const { json } = require('express');
const fs = require('fs');

const getProducts=(cb)=>{
    fs.readFile("./public/data/products.json", (err, data) => {
        let products=[];
        if (err) {
            console.log(err);
        } else {
            products = JSON.parse(data);
            cb(products);
        }
    })
}


module.exports=class Product{
    constructor(title,desc){
        this.title=title;
        this.desc=desc;
    }
    save(){
        fs.readFile("./public/data/products.json",(err,data)=>{
            getProducts((products)=>{
                products.push(this);
                    fs.writeFile("./public/data/products.json",JSON.stringify(products),(err)=>{
                        console.log(err);
                    })
            })
        })
    }
    static FetchAll(cb){
        getProducts(cb);
    }
}