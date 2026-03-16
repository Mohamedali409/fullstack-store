import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getMyCart,
  removeProduct,
} from "./cart.controller.js";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.get("/", getMyCart);
cartRouter.post("/", addToCart);

cartRouter.delete("/:productId", removeProduct);
cartRouter.delete("/", clearCart);

export default cartRouter;
