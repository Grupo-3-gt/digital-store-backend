const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const { middlewareCreateUser, middlewareGetUserById, middlewareUpdadeUser } = require('../middleware/usersMiddlewares');


router.post('/userCreate', middlewareCreateUser, usersControllers.createNewUser);
router.get('/userList', usersControllers.userList);
router.get('/user/:id', middlewareGetUserById, usersControllers.findUserById);
router.delete('/user/:id', middlewareGetUserById, usersControllers.deleteUserById);
router.put('/userUpdate/:id', middlewareGetUserById, middlewareUpdadeUser, usersControllers.userUpdate);

module.exports = router;
