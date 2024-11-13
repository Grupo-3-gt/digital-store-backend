const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productsControllers')


router.post('/products',  productControllers.createProduct);

module.exports = router;