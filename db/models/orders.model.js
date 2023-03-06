const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

//create model

exports.Orders = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);
