import AppError from "../../utils/AppError.js";
import * as categoryRepository from "./category.repository.js";

// Get All (Main + Sub)
export const getAllCategories = async () => {
  const categories = await categoryRepository.getMainCategoriesWithSubs();

  return categories;
};

// Get By ID
export const getCategoryById = async (categoryId) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Invalid Category", 404);
  }

  return category;
};

// Create
export const createCategory = async (data) => {
  const { name, description, level, parent } = data;

  if (!level) {
    throw new AppError("Level is required", 400);
  }

  if (level === "main") {
    if (parent) {
      throw new AppError("Main category cannot have parent", 400);
    }
  }

  if (level === "sub") {
    if (!parent) {
      throw new AppError("Sub category must have parent", 400);
    }

    const parentCategory = await categoryRepository.getCategoryById(parent);

    if (!parentCategory) {
      throw new AppError("Parent not found", 404);
    }

    if (parentCategory.level !== "main") {
      throw new AppError("Parent must be main category", 400);
    }
  }

  return await categoryRepository.createCategory({
    name,
    description,
    level,
    parent: level === "sub" ? parent : null,
  });
};

// Update
export const updateCategory = async (categoryId, data) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return await categoryRepository.updateCategoryById(categoryId, data);
};

// Delete
export const deleteCategory = async (categoryId) => {
  const category = await categoryRepository.getCategoryById(categoryId);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.deleteCategory(categoryId);
  return true;
};
