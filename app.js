const express = require("express");
const path =require("path");
const bp = require("body-parser");
const app = express();
app.set("view engine","ejs");
app.set("views","views");
const adminRouter =require("./Routes/admin");
const shopRouter = require("./Routes/shop");

const errorController=require("./controllers/error");

app.use(bp.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))

app.use('/admin',adminRouter.router);
app.use(shopRouter);
app.use(errorController.page404);

app.listen(3000);