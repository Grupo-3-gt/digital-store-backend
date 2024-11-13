const express = require ('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes')

app.use(userRoutes);

app.use(addressRoutes);

module.exports = app ;