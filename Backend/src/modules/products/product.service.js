import AppError from "../../utils/AppError.js";
import * as productRepository from "./product.repository.js";

import * as categoryRepository from "../categories/category.repository.js";

export const getAllProducts = async (query) => {
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  let filter = {};

  if (query.subcategory) {
    filter.categoryId = query.subcategory;
  } else if (query.category) {
    const subs = await categoryRepository.getAllCategory({
      parent: query.category,
    });

    const subIds = subs.map((el) => el._id);

    filter.categoryId = { $in: subIds };
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
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
  const category = await categoryRepository.getCategoryById(data.categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (category.level !== "sub") {
    throw new AppError("Product must belong to subcategory", 400);
  }

  return await productRepository.createProduct(data);
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
