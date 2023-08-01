const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    cart:{
        items:[{
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true,
            },
            qty:{
                type:Number,
                required:true,
            }
        }],
        price:{
            type:Number,
        }
    }
});
userSchema.methods.addCartItem = function(product){
    const productIndex = this.cart.items.findIndex((prod)=>{
        return prod.productId.toString()===product._id.toString();
    })
    if(productIndex<0){
        this.cart.items.push({productId:product._id,qty:1});
    }else{
        this.cart.items[productIndex].qty++;
    }
    return this.save();
}

userSchema.methods.deleteCartItem = function(product){
    const newItems = this.cart.items.filter((prod)=>{
        return prod.productId.toString()!==product._id.toString();
    })
    this.cart.items=newItems;
    return this.save();
}

const User=mongoose.model("User",userSchema);

module.exports=User;

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const User = sequelize.define("user",{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true,
//         allowNull:false
//     },
//     name:Sequelize.STRING,
//     email:Sequelize.STRING,
// },{
//     timeStamps:false,
// })
// module.exports=User;