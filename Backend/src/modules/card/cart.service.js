import AppError from "../../utils/AppError.js";
import * as cartRepository from "./cart.repository.js";
import * as productRepository from "../products/product.repository.js";
import Cart from "./cart.model.js";

export const getCartByUser = async (userId) => {
  let cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createCart({
      userId,
      items: [],
    });
  }

  return cart;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  const productIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );

  if (productIndex > -1) {
    const newQuantity = cart.items[productIndex].quantity + quantity;
    cart.items[productIndex].quantity = newQuantity < 1 ? 1 : newQuantity;
  } else {
    cart.items.push({ productId, quantity: quantity < 1 ? 1 : quantity });
  }

  await cart.save();

  await cart.populate("items.productId");

  return cart;
};

export const removeProduct = async (userId, productId) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const updatedCart = await cartRepository.removeProductFromCart(
    cart._id,
    productId,
  );

  await updatedCart.save();
  await updatedCart.populate("items.productId");

  return updatedCart;
};

export const clearUserCart = async (userId) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const clearedCart = await cartRepository.clearCart(cart._id);

  await clearedCart.save();
  await clearedCart.populate("items.productId");

  return clearedCart;
};
