const express = require ('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require ('./routes/categoryRoutes')
const addressRoutes = require('./routes/addressRoutes')


app.use(userRoutes, categoryRoutes, addressRoutes);


module.exports = app ;