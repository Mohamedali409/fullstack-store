import Product from "./product.model.js";

export const getAllProducts = (
  filter = {},
  skip = 0,
  limit = 10,
  sortOption = { createdAt: -1 },
) => {
  return Product.find(filter)
    .populate({
      path: "categoryId",
      select: "name level parent",
    })
    .populate({
      path: "createdBy",
      select: "name email",
    })
    .skip(skip)
    .limit(limit)
    .sort(sortOption);
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
  return Product.findByIdAndDelete(productId);
};
