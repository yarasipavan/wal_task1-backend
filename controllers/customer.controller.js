const sequelize = require("../db/db.config");
const expressAsyncHandler = require("express-async-handler");

//import models
const { Customer } = require("../db/models/customer.model");
const { Product } = require("../db/models/product.model");
const { Reviews } = require("../db/models/reviews.model");
const { Orders } = require("../db/models/orders.model");
const { Address } = require("../db/models/address.model");

//assocciations
//reviews table junction
Customer.Product = Product.belongsToMany(Customer, {
  through: Reviews,
  foreignKey: { name: "customer_id" },
});
Product.Customer = Customer.belongsToMany(Product, {
  through: Reviews,
  foreignKey: { name: "product_id" },
});

//orders table junction
Customer.ProductO = Product.belongsToMany(Customer, {
  through: Orders,
  foreignKey: { name: "customer_id" },
});

Product.CustomerO = Customer.belongsToMany(Product, {
  through: Orders,
  foreignKey: { name: "product_id" },
});

//customer address association
Customer.Address = Customer.hasOne(Address, {
  foreignKey: { name: "customer_id" },
});

////
////
//controllers

// create customer
exports.createCustomer = expressAsyncHandler(async (req, res) => {
  await Customer.create(req.body);
  res.send({ message: "Customer Created" });
});

//get customers
exports.getCustomers = expressAsyncHandler(async (req, res) => {
  let customers = await Customer.findAll();
  res.send({ message: "All Customers", payload: customers });
});

//write review
exports.write_review = expressAsyncHandler(async (req, res) => {
  await Reviews.create(req.body, {
    include: [{ association: Customer.Product }],
  });
  res.send({ message: "Thanks For review" });
});

exports.create_review = expressAsyncHandler(async (req, res) => {
  await Reviews.create(req.body, {
    include: [{ association: Customer.Product, model: Reviews }],
  });
  res.send({ message: "Thank you fro your review" });
});

//get reviews
exports.get_reviews = expressAsyncHandler(async (req, res) => {
  let reviews = await Reviews.findAll({
    where: { customer_id: req.params.cust_id },
  });

  // reviews.map((review) => delete review.customer_id);
  // console.log(reviews);
  let result = {};
  result.customer_id = req.params.cust_id;
  result.review = reviews;

  res.send(result);
});

//make order
exports.make_order = expressAsyncHandler(async (req, res) => {
  let order_details = await Orders.create(req.body, {
    include: [{ association: Customer.ProductO }],
  });
  res.send({ message: "Order Placed", payload: order_details });
});

//get orders

exports.get_orders = expressAsyncHandler(async (req, res) => {
  let customer_id = req.params.cust_id;
  let orders = await Orders.findAll({ where: { customer_id: customer_id } });
  if (orders.length == 0) {
    let customer = await Customer.findAll({
      where: { customer_id: customer_id },
    });
    if (customer.length == 0) {
      res.send({ message: "There is no Customer with that id" });
    } else {
      res.send({ message: "There is no orders by this Id" });
    }
  } else res.send({ message: "All Orders", payload: orders });
});

//add address
exports.add_address = expressAsyncHandler(async (req, res) => {
  //if customer already exist then add the address in address table
  //check whether the customer is exist
  let [customer] = await Customer.findAll({
    where: {
      customer_email: req.body.customer_email,
    },
  });

  if (customer) {
    // req.body.address.customer_id = customer.customer_id;
    let address = await Address.create(req.body.address);

    customer.setAddress(address);
    res.send({ message: "Address is added " });
  }

  //else create customer and address
  else {
    const t = sequelize.transaction();
    try {
      await Customer.create(
        req.body,
        {
          include: [{ association: Customer.Address }],
        },
        { transaction: t }
      );
      res.send({ message: "Customer created and address is also added" });
    } catch (err) {
      await t.rollback();
    }
  }
});

//get address by customer id

exports.get_address = expressAsyncHandler(async (req, res) => {
  let [address] = await Address.findAll({
    where: { customer_id: req.params.cust_id },
  });

  res.send({ message: "Address", payload: address });
});
