const express = require ('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require ('./routes/categoryRoutes')
const addressRoutes = require('./routes/addressRoutes')
const authRoutes = require('./routes/authRoutes')


app.use(userRoutes, categoryRoutes, addressRoutes, authRoutes);


module.exports = app ;