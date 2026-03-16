import * as cartService from "./cart.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

const getMyCart = asyncHandler(async (req, res, next) => {
  const cart = await cartService.getCartByUser(req.user.id);

  res.status(200).json({
    success: true,
    cart,
  });
});

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const card = await cartService.addToCart(req.user.id, productId, quantity);

  res.status(201).json({
    success: true,
    message: "product create success",
    card,
  });
});

const removeProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await cartService.removeProduct(req.user.id, productId);

  res.status(200).json({
    success: true,
    message: "product removed",
    cart,
  });
});

const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await cartService.clearUserCart(req.user.id);

  res.status(200).json({
    success: true,
    message: "cart cleared success",
    cart,
  });
});

export { getMyCart, addToCart, removeProduct, clearCart };
