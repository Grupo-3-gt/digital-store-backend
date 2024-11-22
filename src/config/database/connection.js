const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config()

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DRIVER,
        dialectOptions: {
            ssl:{
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    }
)


module.exports = connection;