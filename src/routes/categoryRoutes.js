const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryController");
const {
  middlewareCreateCategory,
  middlewareGetCategoryById,
  middlewareUpdateCategory,
} = require("../middleware/categoryMiddleware");
const { authMiddleware, adminCheckMiddleware } = require("../middleware/authMiddleware");

router.post("/categoryCreate", authMiddleware, adminCheckMiddleware, middlewareCreateCategory, categoryControllers.createCategory);
router.get("/categoryList", categoryControllers.listCategories);
router.get("/category/:id", middlewareGetCategoryById, categoryControllers.getCategoryById);
router.put("/categoryUpdate/:id", authMiddleware, adminCheckMiddleware, middlewareGetCategoryById, middlewareUpdateCategory, categoryControllers.updateCategory);
router.delete("/category/:id", authMiddleware, adminCheckMiddleware, middlewareGetCategoryById, categoryControllers.deleteCategory);

module.exports = router;
