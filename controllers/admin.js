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
const product = new Product({ title, imageUrl, price, description });
product.save()
  .then((prod) => {
    res.redirect('/');
  })
  .catch((err) => {
    res.status(500).send("Failed to save product.");
  });
};

exports.getEditProduct =(req,res,next)=>{
  const productId=req.params.prodId;
  let editing = req.query.edit;
  if(editing==="true"){
    editing=true;
  }else if(editing==="false"){
    editing=false;
  }
  Product.findById(productId)
    .then((product)=>{
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
  Product.findById(id)
    .then((product)=>{
      product.title=title;
      product.price=price;
      product.description=description;
      product.imageUrl=imageUrl;
      return product.save();
    })
    .then(()=>{res.redirect('/admin/products');})
    .catch((err)=>{console.log(err)});
  
};

exports.deleteProduct = (req,res,next)=>{
  const id = req.body.id;
  Product.deleteOne({_id:id})
      .then(()=>{
        res.redirect('/admin/products');
      })
      .catch((err)=>{console.log(err)});
}

exports.getProducts = (req, res, next) => {
  Product.find()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err)=>{console.log(err);});
};
