const path = require('path');
const mongoose = require('mongoose');


// const User= require("./models/user");
// const Product = require("./models/product");
// const Cart =require("./models/cart");
// const CartItem=require("./models/cartItem");
// const Order=require("./models/order");
// const OrderItem = require("./models/orderItem");

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//     (req,res,next)=>{
//     User.findByPk(1)
//     .then((user)=>{
//         req.user=user;
//         next();
//     })
//     .catch((err)=>{console.log(err)})
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// //one-to-many : user and created products
// User.hasMany(Product);
// Product.belongsTo(User);
// //one-to-one : user and cart
// User.hasOne(Cart);
// Cart.belongsTo(User);
// //many-to-many : product and cart
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});
// //one-to-many : user and order
// User.hasMany(Order);
// Order.belongsTo(User);
// //many-to-many : order and products
// Order.belongsToMany(Product,{through:OrderItem});
// Product.belongsToMany(Order,{through:OrderItem});

app.use(errorController.get404);
mongoose.connect("mongodb+srv://ilyesDB:15022004@cluster0.9uivabz.mongodb.net/market?retryWrites=true&w=majority")
    .then(()=>{
        app.listen(3000);
    })
    .catch(e=>console.log(e))

// let fetchedUser;
// sequelize.sync()
//     .then(result =>{
//         return User.findByPk(1);
//     })
//     .then((user)=>{
//         if(!user){
//             return User.create({
//                 name:"ilyes",
//                 email:"arailyesarbet@gmail.com"
//             })
//         }else{
//             return user
//         }
//     })
//     .then((user)=>{
//         fetchedUser=user;
//         return user.getCart();
//     })
//     .then((cart)=>{
//         if(!cart){
//             return fetchedUser.createCart()
//         }
//         return cart;
//     })
//     .then(()=>{
//     })
//     .catch((err)=>{console.log(err)});
