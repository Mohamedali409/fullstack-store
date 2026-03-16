import Cart from "./cart.model.js";

export const getCartByUser = (userId) => {
  return Cart.findOne({ userId }).populate("items.productId");
};

export const createCart = (data) => {
  return Cart.create(data);
};

export const updateCart = (cartId, data) => {
  return Cart.findByIdAndUpdate(cartId, data, { new: true });
};

export const clearCart = (cartId) => {
  return Cart.findByIdAndUpdate(cartId, { items: [] }, { new: true });
};

export const removeProductFromCart = (cartId, productId) => {
  return Cart.findByIdAndUpdate(
    cartId,
    { $pull: { items: { productId } } },
    { new: true },
  ).populate("items.productId");
};

export const addProductToCart = (cardId, item) => {
  return Cart.findByIdAndUpdate(
    cardId,
    { $push: { items: item } },
    { new: true },
  );
};
