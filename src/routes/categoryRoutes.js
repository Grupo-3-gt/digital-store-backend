const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryController");
const {
  middlewareCreateCategory,
  middlewareGetCategoryById,
  middlewareUpdateCategory,
} = require("../middleware/categoryMiddleware");

router.post("/categoryCreate", middlewareCreateCategory, categoryControllers.createCategory);
router.get("/categoryList", categoryControllers.listCategories);
router.get("/category/:id", middlewareGetCategoryById, categoryControllers.getCategoryById);
router.put("/categoryUpdate/:id", middlewareGetCategoryById, middlewareUpdateCategory, categoryControllers.updateCategory);
router.delete("/category/:id", middlewareGetCategoryById, categoryControllers.deleteCategory);

module.exports = router;
