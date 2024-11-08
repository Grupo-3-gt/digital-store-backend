const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");
const userModel = require("./userModel");

let addressModel = connection.define("address", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: userModel,
      key: "id",
    },
  },

  street: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  number: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },

  neighborhood: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },

  complement: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
});

module.exports = addressModel;
