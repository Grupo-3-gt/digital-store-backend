const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryController");

router.post("/categoryCreate", categoryControllers.createCategory);
router.get("/categoryList", categoryControllers.listCategories);
// router.get("/category/:id", categoryControllers.categoryById);
router.put("/categoryUpdate/:id", categoryControllers.updateCategory);
router.delete("/category/:id", categoryControllers.deleteCategory);

module.exports = router;
