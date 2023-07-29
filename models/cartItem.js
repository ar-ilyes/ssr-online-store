const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartitem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull:false,
        primaryKey:true,
    },
    qty:Sequelize.STRING,
})
module.exports=CartItem;