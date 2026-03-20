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
  // 1. التأكد من وجود المنتج
  const product = await productRepository.getProductById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  // 2. جلب السلة (بدون populate في البداية عشان نعرف نقارن الـ IDs صح)
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  // 3. البحث عن المنتج (استخدام toString() مهم جداً هنا)
  const productIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );

  if (productIndex > -1) {
    // المنتج موجود -> حدث الكمية
    // تأكد أننا لا نسمح بكمية أقل من 1
    const newQuantity = cart.items[productIndex].quantity + quantity;
    cart.items[productIndex].quantity = newQuantity < 1 ? 1 : newQuantity;
  } else {
    // المنتج غير موجود -> ضيفه لأول مرة
    // إذا كانت الكمية المرسلة سالبة (نقصان) لمنتج غير موجود أصلاً، نعتبرها 1
    cart.items.push({ productId, quantity: quantity < 1 ? 1 : quantity });
  }

  // 4. حفظ التعديلات
  await cart.save();

  // 5. عمل populate عشان الـ Frontend يشوف بيانات المنتج
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
