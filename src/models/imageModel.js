const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('../models/productModel');

let productImageModel = connection.define('product_images', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productModel,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 255],
        msg: "O caminho deve ter entre 1 e 255 caracteres."
      }
    }
  },
});

module.exports = productImageModel;
