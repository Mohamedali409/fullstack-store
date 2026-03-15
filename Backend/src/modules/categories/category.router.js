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

categoryRouter.use(protect);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getCategoryById);

categoryRouter.use(restrictTo("Admin"));
categoryRouter.post("/", createCategory);
categoryRouter.put("/:categoryId", updateCategory);
categoryRouter.delete("/:categoryId", deleteCategory);

export default categoryRouter;
