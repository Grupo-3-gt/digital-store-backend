const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");
const productModel = require("../models/productModel");

let productOptionModel = connection.define("product_options", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productModel,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 255],
        msg: "O título deve ter entre 1 e 255 caracteres.",
      },
    },
  },

  shape: {
    type: DataTypes.ENUM("square", "circle"),
    allowNull: true,
    defaultValue: "square",
  },

  radius: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  type: {
    type: DataTypes.ENUM("text", "color"),
    allowNull: true,
    defaultValue: "text",
  },

  values: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 255],
        msg: "Os valores devem ter entre 1 e 255 caracteres.",
      },
    },
  },
});

module.exports = productOptionModel;
