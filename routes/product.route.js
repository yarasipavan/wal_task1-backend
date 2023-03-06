//create mini express app
const express = require("express");
const productApp = express.Router();

//body parser
productApp.use(express.json());

let {
  createProduct,
  getProducts,
} = require("../controllers/product.controller");

//routes
productApp.get("/products", getProducts);
productApp.post("/product", createProduct);

module.exports = productApp;
