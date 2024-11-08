const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");

let categoryModel = connection.define("category", {
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
});

module.exports = categoryModel;
