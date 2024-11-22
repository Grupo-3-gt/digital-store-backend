const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const addressRoutes = require("./routes/addressRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(userRoutes, categoryRoutes, addressRoutes, authRoutes, productRoutes);

module.exports = app;
