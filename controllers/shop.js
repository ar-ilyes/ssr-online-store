const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findAll()
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
  Cart.FetchAll((products)=>{
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products,
    });
  })
};

exports.postCart =(req,res,next)=>{
  let productId = req.body.prodId;
  Product.findByPk(productId)
    .then((product)=>{
      Cart.addProduct(product,product.price);
      res.redirect("/cart");
    })
    .catch((e)=>{console.log(e)});
}

exports.deleteCartItem = (req,res,next)=>{
  let id=req.body.id;
  Cart.delete(id,()=>{res.redirect("/cart")});
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.getProductDetails=(req,res,next)=>{
  Product.findByPk(req.params.productId)
      .then(product=>{
          res.render("shop/product-detail",{pageTitle:"details",product:product,path:`/product/${req.params.productId}`});
      })
      .catch((e)=>{console.log(e)});
}