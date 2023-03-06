const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

//create model

exports.Product = sequelize.define(
  "products",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);
