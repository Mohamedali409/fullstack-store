// import AppError from "../../utils/AppError.js";
// import * as categoryRepository from "./category.repository.js";

// // GET /categories
// // GET /categories/:id
// // POST /categories
// // PUT /categories/:id
// // DELETE /categories/:id

// export const getAllCategories = async () => {
//   const categories = await categoryRepository.getAllCategory();
//   if (categories.length === 0) {
//     return [];
//   }

//   return categories;
// };

// export const getCategoryById = async (categoryId) => {
//   const category = await categoryRepository.getCategoryById(categoryId);

//   if (!category) {
//     throw new AppError("Invalid Category", 404);
//   }

//   return category;
// };

// export const createCategory = async (data) => {
//   const existing = await categoryRepository.getAllCategory({ name: data.name });
//   if (existing.length) throw new AppError("Category name already exists", 409);
//   const category = await categoryRepository.createCategory(data);

//   return category;
// };

// export const updateCategory = async (categoryId, data) => {
//   const category = await categoryRepository.getCategoryById(categoryId);

//   if (!category) {
//     throw new AppError("Not found this category", 404);
//   }

//   const updateCategory = await categoryRepository.updateCategoryById(
//     categoryId,
//     data,
//   );

//   return updateCategory;
// };

// export const deleteCategory = async (categoryId) => {
//   const category = await categoryRepository.getCategoryById(categoryId);

//   if (!category) {
//     throw new AppError("Not found this category");
//   }

//   await categoryRepository.deleteCategory(categoryId);
//   return true;
// };

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
