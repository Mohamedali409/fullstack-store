import Product from "./product.model.js";

export const getAllProducts = (filter, skip, limit) => {
  return Product.find(filter)
    .populate("categoryId", "name")
    .populate("createdBy", "name email")
    .skip(skip)
    .limit(limit);
};

export const countProducts = (filter) => {
  return Product.countDocuments(filter);
};

export const getProductById = (productId) => {
  return Product.findById(productId)
    .populate("categoryId", "name")
    .populate("createdBy", "name email");
};

export const createProduct = async (data) => {
  return await Product.create(data);
};
export const updateProduct = (productId, data) => {
  return Product.findByIdAndUpdate(productId, data, { new: true });
};

export const deleteProduct = (productId) => {
  return Product.findByIdAndUpdate(productId);
};
