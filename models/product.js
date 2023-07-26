const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        let index=products.findIndex((el)=>{
          return el.id==this.id;
        });
        products[index]=this;
      }else{
        this.id=(Math.random()*100).toString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static delete(id){
    getProductsFromFile((products)=>{
      let newProductsList = products.filter(el=>el.id!=id);
      fs.writeFile(p, JSON.stringify(newProductsList), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static FindById(id,cb){
    getProductsFromFile(products=>{
      products.map((el)=>{
        if(el.id===id){
          cb(el);
        }
      })
    })
  }
};
