const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");
const productModel = require("./productModel");

let productImageModel = connection.define("product_images", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productModel,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },

  path: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O path não pode estar vazio.",
      },
      len: {
        args: [1],
        msg: "O campo 'path' deve ter pelo menos 1 caractere.",
      },
    },
  },
});

module.exports = productImageModel;
