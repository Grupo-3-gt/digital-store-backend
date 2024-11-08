const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");

let productModel = connection.define("products", {
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  slug: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  description: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = productModel;
