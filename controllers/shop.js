const Product = require('../models/product');
const Cart = require("../models/cart");
const mongoose= require('mongoose');
const product = require('../models/product');
const Order = require("../models/order");
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((e)=>{console.log(e);});
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((e)=>{console.log(e)});
};

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .then((user)=>{
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products,
      });
    })
    .catch((err)=>{console.log(err);})
};

exports.postCart =(req,res,next)=>{
  let productId = req.body.prodId;
  Product.findById(productId)
    .then((product)=>{
      return req.user.addCartItem(product);
    })
    .then(()=>{
      res.redirect("/cart");
    })
    .catch(e=>console.log(e))
  
  // let fetchedCart;
  // req.user.getCart()
  //   .then((cart)=>{
  //     fetchedCart=cart;
  //     return cart.getProducts({where : {id : productId}})
  //   })
  //   .then((products)=>{
  //     let product=products[0];
  //     if(!product){
  //       return Product.findByPk(productId)
  //         .then((prod)=>{
  //           return fetchedCart.addProduct(prod,{through:{qty : 1}});
  //         })
  //         .catch((err)=>{
  //           console.log(err);
  //         })
  //     }else{
  //       let newQty =parseInt(product.cartitem.qty)+1;
  //       return fetchedCart.addProduct(product,{through:{qty : newQty }});
  //     }
  //   })
  //   .then(()=>{
  //     
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
}

exports.deleteCartItem = (req,res,next)=>{
  let id=req.body.productId;
  Product.findById(id)
      .then((product)=>{
        return req.user.deleteCartItem(product);
      })
      .then(()=>{
        res.redirect("/cart")
      })
      .catch((err)=>{
        console.log(err);
      })
}

exports.getOrders = (req, res, next) => {
  Order.find({"user.userId":req.user._id})
  .then((orders)=>{
    res.render("shop/orders",{
      path: '/orders',
      pageTitle: 'Orders',
      orders:orders,
    })})
    .catch(err=>console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.getProductDetails=(req,res,next)=>{
  Product.findById(req.params.productId)
      .then(product=>{
          res.render("shop/product-detail",{pageTitle:"details",product:product,path:`/product/${req.params.productId}`});
      })
      .catch((e)=>{console.log(e)});
}

exports.postCheckout=(req,res,next)=>{
  req.user.populate('cart.items.productId')
  .then((user)=>{
    let orderProducts=user.cart.items.map((p)=>{
      return {
        quantity:p.qty,
        productDetail:{...p.productId._doc},
      }
    })
    let order=new Order({
      user:{
        name:req.user.name,
        userId:req.user,
      },
      products:orderProducts,
    })
    return order.save();
  })
  .then((order)=>{
    console.log(order)
    req.user.cart.items=[];
    req.user.cart.price=0;
    return req.user.save();
  })
  .then(()=>{
    res.redirect("/orders");
  })
  .catch((err)=>{
    console.log(err);
  })
  // let fetchedCart;
  // req.user.getCart()
  //   .then((cart)=>{
  //     fetchedCart=cart;
  //     return cart.getProducts();
  //   })
  //   .then((products)=>{
  //     return products.forEach(product => {
  //       req.user.createOrder()
  //         .then((order)=>{
  //           return order.addProduct(product,{through:{qty:product.cartitem.qty}})
  //         })
  //         .catch(err=>console.log(err))
  //     });
  //   })
  //   .then(()=>{
  //     return fetchedCart.setProducts(null);
  //   })
  //   .then(()=>{
  //     res.redirect("/orders");
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
}