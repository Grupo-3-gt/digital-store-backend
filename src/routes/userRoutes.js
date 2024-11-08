const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');


router.post('/userCreate', usersControllers.createNewUser);
router.get('/userList', usersControllers.userList);
router.put('/userUpdate/:id', usersControllers.userUpdate);

module.exports = router;
