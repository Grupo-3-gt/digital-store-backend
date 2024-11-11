const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');
const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')

let productCategoryModel = connection.define('product_categories', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: productModel,
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: categoryModel,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  primaryKey: false,
});

module.exports = productCategoryModel;
