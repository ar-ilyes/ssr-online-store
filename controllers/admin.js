const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save()
    .then(()=>{res.redirect('/');})
    .catch((err)=>{console.log(err)});
  
};

exports.getEditProduct =(req,res,next)=>{
  const productId=req.params.prodId;
  let editing = req.query.edit;
  if(editing==="true"){
    editing=true;
  }else if(editing==="false"){
    editing=false;
  }
  Product.FindById(productId)
    .then((data)=>{
      let product=data[0][0]
      res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing:editing,
        product:product,
      });
    })
    .catch((err)=>{console.log(err);})
}

exports.postEditProduct = (req, res, next) => {
  const id=req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id,title, imageUrl, description, price);
  product.save()
  .then(()=>{res.redirect('/admin/products');})
  .catch((err)=>{console.log(err)});
  
};

exports.deleteProduct = (req,res,next)=>{
  const id = req.body.id;
  Product.delete(id)
    .then(()=>{res.redirect('/admin/products');})
    .catch((err)=>{console.log(err)});
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(data => {
      let products=data[0]
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((err)=>{console.log(err);});
};
