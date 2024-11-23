const { DataTypes } = require('sequelize');
const connection = require('../config/database/connection');

let productCategoryModel = connection.define('product_categories', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },

  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  primaryKey: false,
});

module.exports = productCategoryModel;
