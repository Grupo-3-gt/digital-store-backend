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
    validate: {
      isInt: { msg: "O user_id deve ser um número inteiro" },
      notNull: { msg: "O user_id é obrigatório" }, 
    },
  },

  street: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: "A rua não pode estar vazia" },
      len: { args: [1, 150], msg: "A rua deve ter entre 1 e 150 caracteres" }, 
    },
  },

  number: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: {
      notEmpty: { msg: "O número não pode estar vazio" },
      isNumeric: { msg: "O número do imóvel deve conter apenas números" }, 
      len: { args: [1, 6], msg: "O número deve ter entre 1 e 6 caracteres" }, 
    },
  },

  neighborhood: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: "O bairro não pode estar vazio" },
      len: { args: [1, 150], msg: "O bairro deve ter entre 1 e 150 caracteres" },
    },
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "A cidade não pode estar vazia" },
      len: { args: [1, 100], msg: "A cidade deve ter entre 1 e 100 caracteres" },
    },
  },

  cep: {
    type: DataTypes.STRING(8),
    allowNull: false,
    validate: {
      notEmpty: { msg: "O CEP não pode estar vazio" },
      isNumeric: { msg: "O CEP deve conter apenas números" },
      len: { args: [8, 8], msg: "O CEP deve ter exatamente 8 caracteres" }
    },
  },

  complement: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null,
    validate: {
      len: { args: [0, 150], msg: "O complemento deve ter no máximo 150 caracteres" },
    },
  },
});

module.exports = addressModel;
