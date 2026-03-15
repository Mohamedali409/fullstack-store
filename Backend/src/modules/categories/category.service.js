import AppError from "../../utils/AppError.js";
import * as categoryRepository from "./category.repository.js";

// GET /categories
// GET /categories/:id
// POST /categories
// PUT /categories/:id
// DELETE /categories/:id

export const getAllCategories = async () => {
  const categories = await categoryRepository.getAllCategory();
  if (categories.length === 0) {
    return [];
  }

  return categories;
};

export const getCategoryById = async (categoryId) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Invalid Category", 404);
  }

  return category;
};

export const createCategory = async (data) => {
  const existing = await categoryRepository.getAllCategory({ name: data.name });
  if (existing.length) throw new AppError("Category name already exists", 409);
  const category = await categoryRepository.createCategory(data);

  return category;
};

export const updateCategory = async (categoryId, data) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Not found this category", 404);
  }

  const updateCategory = await categoryRepository.updateCategoryById(
    categoryId,
    data,
  );

  return updateCategory;
};

export const deleteCategory = async (categoryId) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Not found this category");
  }

  await categoryRepository.deleteCategory(categoryId);
  return true;
};
