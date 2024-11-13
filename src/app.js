const express = require ('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require ('./routes/categoryRoutes')

app.use(userRoutes, categoryRoutes)

module.exports = app ;