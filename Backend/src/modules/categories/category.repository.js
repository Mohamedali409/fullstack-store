import Category from "./category.model.js";

// GET /categories
// GET /categories/:id
// POST /categories
// PUT /categories/:id
// DELETE /categories/:id

export const getAllCategory = () => {
  return Category.find({});
};

export const getCategoryById = (categoryId) => {
  return Category.findById(categoryId);
};

export const createCategory = (data) => {
  return Category.create(data);
};

export const updateCategoryById = (categoryId, data) => {
  return Category.findByIdAndUpdate(categoryId, data, { new: true });
};

export const deleteCategory = (categoryId) => {
  return Category.findByIdAndDelete(categoryId);
};
