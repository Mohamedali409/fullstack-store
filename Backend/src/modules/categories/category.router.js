import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";
import { restrictTo } from "../../middlewares/role.middleware.js";

const categoryRouter = express.Router();

// GET /categories
// GET /categories/:id
// POST /categories
// PUT /categories/:id
// DELETE /categories/:id

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getCategoryById);
categoryRouter.use(protect);

categoryRouter.post("/", restrictTo("Admin"), createCategory);
categoryRouter.put("/:categoryId", restrictTo("Admin"), updateCategory);
categoryRouter.delete("/:categoryId", restrictTo("Admin"), deleteCategory);

export default categoryRouter;
