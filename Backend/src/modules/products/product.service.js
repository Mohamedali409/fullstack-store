import AppError from "../../utils/AppError.js";
import * as productRepository from "./product.repository.js";

export const getAllProducts = async (query) => {
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 1;
  const skip = (page - 1) * limit;

  const filter = {};

  if (query.category) {
    filter.categoryId = query.category;
  }

  if (query.search) {
    filter.name = { $regex: query.search, $options: "i" };
  }

  const product = await productRepository.getAllProducts(filter, skip, limit);
  const total = await productRepository.countProducts(filter);

  return {
    product,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getProductById = async (productId) => {
  const product = await productRepository.getProductById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const createProduct = async (data) => {
  const newProduct = await productRepository.createProduct(data);
  return newProduct;
};
export const updateProduct = async (productId, data) => {
  const product = await productRepository.updateProduct(productId, data);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
};

export const deleteProduct = async (productId) => {
  const product = await productRepository.deleteProduct(productId);

  if (!product) {
    throw new AppError("Product not found");
  }

  return true;
};
