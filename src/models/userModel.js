const { DataTypes } = require ('sequelize');
const connection = require('../config/database/connection');


let userModel = connection.define('users', {
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    cpf:{
        type: DataTypes.STRING(11),
        allowNull: false,
        unique:true,
        validate: {
            len: [11, 11],
            isNumeric: true
        }
    },

    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    phone:{
        type: DataTypes.STRING(15),
        allowNull: false,
        validade: {
            len: [10, 15],
            isNumeric: true
        }
    },

    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validade: {
            len: [8, 15]
        }
    },
});

module.exports = userModel
