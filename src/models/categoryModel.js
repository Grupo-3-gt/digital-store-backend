const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");

let categoryModel = connection.define("category", {
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O campo nome não pode estar vazio",
      },
      len: {
        args: [1, 150],
        msg: "O campo nome deve ter entre 1 e 150 caracteres",
      },
    },
  },

  slug: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O campo slug não pode estar vazio",
      },
      len: {
        args: [1, 150],
        msg: "O campo slug deve ter entre 1 e 150 caracteres",
      },
    },
  },

  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    validate: {
      isIn: {
        args: [[true, false]],
        msg: "O campo use_in_menu deve ser verdadeiro ou falso",
      },
    },
  },
});

module.exports = categoryModel;

