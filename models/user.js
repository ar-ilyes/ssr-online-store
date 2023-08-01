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