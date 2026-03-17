import Category from "./category.model.js";

// Get all (مع filter)
export const getAllCategory = (filter = {}) => {
  return Category.find(filter);
};

// Get main categories + subCategories (populate)
export const getMainCategoriesWithSubs = () => {
  return Category.find({ level: "main" }).populate("subCategories");
};

// Get by ID
export const getCategoryById = (categoryId) => {
  return Category.findById(categoryId);
};

// Create
export const createCategory = (data) => {
  return Category.create(data);
};

// Update
export const updateCategoryById = (categoryId, data) => {
  return Category.findByIdAndUpdate(categoryId, data, { new: true });
};

// Delete
export const deleteCategory = (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};
