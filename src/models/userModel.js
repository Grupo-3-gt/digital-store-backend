const { DataTypes } = require("sequelize");
const connection = require("../config/database/connection");

let userModel = connection.define("users", {
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: { msg: "O first_name não pode estar vazio" } },
  },

  surname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: { msg: "O surname não pode estar vazio" } },
  },

  cpf: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "O CPF não pode estar vazio" },
      isNumeric: { msg: "O CPF deve conter apenas números" },
      len: { args: [11, 11], msg: "O CPF deve ter 11 dígitos" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "O email não pode estar vazio" },
      isEmail: { msg: "Formato de email inválido" },
    },
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "O telefone não pode estar vazio" },
      isNumeric: { msg: "O telefone deve conter apenas números" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "A senha não pode estar vazia" },
    },
  },
});

module.exports = userModel;
