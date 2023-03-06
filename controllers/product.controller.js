const sequelize = require("../db/db.config");
const expressAsyncHandler = require("express-async-handler");
//import model
const { Product } = require("../db/models/product.model");

exports.createProduct = expressAsyncHandler(async (req, res) => {
  await Product.create(req.body);
  res.send({ message: "Product Created" });
});

exports.getProducts = expressAsyncHandler(async (req, res) => {
  let products = await Product.findAll();
  res.send({ message: "All products", payload: products });
});
