//mini express

const express = require("express");
const customerApp = express.Router();
// const sequelize = require("../db/db.config");

//body parser
customerApp.use(express.json());

let {
  createCustomer,
  getCustomers,
  write_review,
  create_review,
  get_reviews,
  make_order,
  get_orders,
  add_address,
  get_address,
} = require("../controllers/customer.controller");

//routes
customerApp.post("/customer", createCustomer);
customerApp.get("/customers", getCustomers);
customerApp.post(
  "/customer-review/customer-id/:cust_id/product-id/:prod_id",
  write_review
);

customerApp.get("/customer-id/:cust_id/reviews", get_reviews);

customerApp.post("/customer-review", create_review);

//make order
customerApp.post("/customer-order", make_order);

//get order by customerId
customerApp.get("/customer-orders/:cust_id", get_orders);

//add address
customerApp.post("/add-address", add_address);

//get address
customerApp.get("/address/customer_id/:cust_id", get_address);

module.exports = customerApp;
