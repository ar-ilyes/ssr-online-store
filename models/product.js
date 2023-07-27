const fs = require('fs');
const path = require('path');
const db = require("../util/database");

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id){
      return db.execute("UPDATE store SET title = ?, price = ?, description= ? ,imageUrl= ?  WHERE id=?",[this.title,this.price,this.description,this.imageUrl,this.id])
    }else{
      return db.execute("INSERT INTO store (title, price, description, imageUrl) VALUES (?, ?, ?,?)",[this.title,this.price,this.description,this.imageUrl]);
    }
  }

  static delete(id){
    return db.execute("DELETE FROM store WHERE id=?",[id]);
  }

  static fetchAll(cb) {
    return db.execute("SELECT * FROM store");
    // .then((data)=>{
    //   cb(data[0])
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }


  static FindById(id,cb){
    return db.execute("SELECT * FROM store WHERE id=?",[id]);
    // .then((data)=>{
    //   cb(data[0][0])
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }
};
