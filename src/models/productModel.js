const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");
const productImageModel = require("./imageModel")
const productOptionsModel = require("./productOptionModel");
const categoryModel = require("./categoryModel");
const productCategoryModel = require("./productCategoryModel");

let productModel = connection.define("products", {
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 150],
        msg: "O nome deve ter entre 1 e 150 caracteres.",
      },
    },
  },

  slug: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 150],
        msg: "O slug deve ter entre 1 e 150 caracteres.",
      },
    },
  },

  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    // validate: {
    //   min: {
    //     args: 0,
    //     msg: "O estoque não pode ser negativo.",
    //   },
    // },
  },

  description: {
    type: DataTypes.STRING(150),
    allowNull: true,
    validate: {
      len: {
        args: [0, 150],
        msg: "A descrição deve ter no máximo 150 caracteres.",
      },
    },
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "O preço deve ser um número válido.",
      },
      min: {
        args: [0],
        msg: "O preço não pode ser negativo.",
      },
    },
  },

  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      isFloat: {
        msg: "O preço com desconto deve ser um número válido.",
      },
      min: {
        args: [0],
        msg: "O preço com desconto não pode ser negativo.",
      },
    },
  },
});

productModel.hasMany(productCategoryModel, {
  foreignKey: "product_id",
  as: "category_ids",
});

productModel.hasMany(productImageModel, {
  foreignKey: "product_id",
  as: "images",
});

productModel.hasMany(productOptionsModel, {
  foreignKey: "product_id",
  as: "options",
});

module.exports = productModel;
