const path = require('path');
const sequelize =require("./util/database");

const User= require("./models/user");
const Product = require("./models/product");

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
app.use(
    (req,res,next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user=user;
        next();
    })
    .catch((err)=>{console.log(err)})
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

User.hasMany(Product);
Product.belongsTo(User);

app.use(errorController.get404);
sequelize.sync()
    .then(result =>{
        return User.findByPk(1);
    })
    .then((user)=>{
        if(!user){
            return User.create({
                name:"ilyes",
                email:"arailyesarbet@gmail.com"
            })
        }else{
            return user
        }
    })
    .then((user)=>{
        console.log(user);
        app.listen(3000);
    })
    .catch((err)=>{console.log(err)});


