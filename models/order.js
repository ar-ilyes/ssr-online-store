const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products:[{
        productDetail:{
            type:Object,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        }
    }],
    user:{
        name:{
            type:String,
            required:true,
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        }
    }
})

module.exports= mongoose.model("Order",orderSchema);


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const Order = sequelize.define('order',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull:false,
//         primaryKey:true,
//     }
// })
// module.exports=Order;