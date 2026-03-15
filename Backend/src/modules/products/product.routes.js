import express from "express";

import { protect } from "../../middlewares/auth.middleware.js";
import { restrictTo } from "../../middlewares/role.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  uploadImage,
} from "./product.controller.js";
import { uploadProductImage } from "../../middlewares/multer.js";

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:productId", getAllProduct);

productRouter.use(protect);

productRouter.post("/", restrictTo("Admin"), uploadProductImage, createProduct);

productRouter.put("/:productId", restrictTo("Admin"), updateProduct);

productRouter.delete("/:productId", restrictTo("Admin"), deleteProduct);

productRouter.post(
  "/",
  protect,
  restrictTo("Admin"),
  uploadProductImage,
  createProduct,
);

productRouter.post(
  "/:id/upload-image",
  protect,
  restrictTo("Admin"),
  uploadProductImage,
  uploadImage,
);

export default productRouter;
