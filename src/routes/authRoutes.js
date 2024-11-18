const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');


router.post('/login', authControllers.loginAuth);


module.exports = router;