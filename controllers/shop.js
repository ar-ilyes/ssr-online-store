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
  req.user.getCart()
    .then((cart)=>{
      return cart.getProducts();
    })
    .then((products)=>{
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
  let fetchedCart;
  req.user.getCart()
    .then((cart)=>{
      fetchedCart=cart;
      return cart.getProducts({where : {id : productId}})
    })
    .then((products)=>{
      let product=products[0];
      if(!product){
        return Product.findByPk(productId)
          .then((prod)=>{
            return fetchedCart.addProduct(prod,{through:{qty : 1}});
          })
          .catch((err)=>{
            console.log(err);
          })
      }else{
        let newQty =parseInt(product.cartitem.qty)+1;
        return fetchedCart.addProduct(product,{through:{qty : newQty }});
      }
    })
    .then(()=>{
      res.redirect("/cart");
    })
    .catch((err)=>{
      console.log(err);
    })
}

exports.deleteCartItem = (req,res,next)=>{
  let id=req.body.productId;
  let fetchedCart;
  req.user.getCart()
      .then((cart)=>{
        fetchedCart=cart;
        return cart.getProducts({where : {id:id}})
      })
      .then((products)=>{
        let product=products[0];
        if(product.cartitem.qty>1){
          let newQty=product.cartitem.qty-1;
          return fetchedCart.addProduct(product,{through:{qty:newQty}});
        }else{
          return fetchedCart.removeProduct(product);
        }
      }).then(()=>{
        res.redirect("/cart")
      })
      .catch((err)=>{
        console.log(err);
      })
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