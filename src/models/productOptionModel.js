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
    validate: {
      isIn: {
        args: [["square", "circle"]],
        msg: "O formato deve ser 'square' ou 'circle'.",
      },
    },
  },

  radius: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: "O campoo 'radius' deve ser um número inteiro.",
      },
      min: {
        args: [0],
        msg: "O  campo 'radius' não pode ser negativo.",
      },
    },
  },

  type: {
    type: DataTypes.ENUM("text", "color"),
    allowNull: true,
    defaultValue: "text",
    validate: {
      isIn: {
        args: [["text", "color"]],
        msg: "O formato do campo /type/ deve ser 'text' ou 'color'.",
      },
    },
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
