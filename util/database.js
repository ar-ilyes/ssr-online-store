const Sequelize = require('sequelize');

const sequelize = new Sequelize('emarket','root','15022004',{
    dialect:"mysql",
    host:"localhost",
});
module.exports=sequelize;