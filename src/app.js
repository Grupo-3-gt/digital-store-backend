const express = require ('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')

app.use(userRoutes, productRoutes)

module.exports = app ;