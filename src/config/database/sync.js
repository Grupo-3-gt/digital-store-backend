const connection = require('../database/connection');
require('../../models/userModel');
require("../../models/addressModel");
require("../../models/productModel");
require("../../models/imageModel");
require("../../models/categoryModel");
require("../../models/productCategoryModel");
require("../../models/productOptionModel");

(async () => {
    try {

        await connection.authenticate();

        await connection.sync({ alter: true});

    } catch (error) {
        console.error('Erro ao conectar ou sincronizar com o banco de dados:', error)
    } finally {
        await connection.close();
        console.log('Conexão com o banco de dados encerrada. ')
    }
})();