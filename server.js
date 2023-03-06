//create express app
const express = require("express");
const app = express();

//config dotenv
require("dotenv").config();

// assign port
let port = 4000 || process.env.PORT;

//listen the server
app.listen(port, () => console.log(`Server Started at PORT No.: ${port} `));

//db

//import db sequelize
const sequelize = require("./db/db.config");

//check connection
sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log("Error While DB Connection", err);
  });

//apis
//import routes
const customerAPI = require("./routes/customer.route");
const productAPI = require("./routes/product.route");

//assign apis
app.use("/customer-api", customerAPI);
app.use("/product-api", productAPI);

// // import models
// const { Customer } = require("./db/models/customer.model");
// const { Product } = require("./db/models/product.model");
// const { Orders } = require("./db/models/orders.model");
// const { Reviews } = require("./db/models/reviews.model");

//create tables
sequelize.sync();

//invalid path handler
app.use("*", (req, res, next) => {
  res.send({ message: "Invalid Path" });
});
//error handler
app.use((err, req, res, next) => {
  console.log(err), res.send({ Error: err.message });
});
