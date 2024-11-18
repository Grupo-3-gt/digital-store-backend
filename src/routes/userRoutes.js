const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const {
  middlewareCreateUser,
  middlewareGetUserById,
  middlewareUpdadeUser,
} = require("../middleware/usersMiddlewares");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post(
  "/userCreate",
  middlewareCreateUser,
  usersControllers.createNewUser
);
router.get("/user/:id", middlewareGetUserById, usersControllers.findUserById);
router.delete(
  "/user/:id",
  authMiddleware,
  middlewareGetUserById,
  usersControllers.deleteUserById
);
router.put(
  "/userUpdate/:id",
  authMiddleware,
  middlewareGetUserById,
  middlewareUpdadeUser,
  usersControllers.userUpdate
);

module.exports = router;
