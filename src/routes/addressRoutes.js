const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressControllers");
const { middlewareGetUserById } = require("../middleware/usersMiddlewares");


router.post("/addressCreate/:id", middlewareGetUserById, addressController.createNewAddress);

router.get("/addressList", addressController.addressList);

router.get("/address/:id", addressController.findAddressById);

router.put("/addressUpdate/:id", addressController.addressUpdate);

router.delete("/addressDelete/:id", addressController.deleteAddressById);


module.exports = router;
