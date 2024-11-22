const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productsControllers");
const { authMiddleware, adminCheckMiddleware } = require("../middleware/authMiddleware");

router.post("/products", authMiddleware, adminCheckMiddleware, productControllers.createProduct);
router.get("/products", productControllers.listProducts);
router.get("/products/:id", productControllers.getProductById);
router.delete("/products/:id", authMiddleware, adminCheckMiddleware, productControllers.deleteProduct);

module.exports = router;
