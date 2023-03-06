const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

//create model

exports.Reviews = sequelize.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    review_desc: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);
