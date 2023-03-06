//import sequelize
const sequelize = require("../db.config");

//import DataTypes
const { DataTypes } = require("sequelize");

//define model
exports.Address = sequelize.define(
  "address",
  {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);
