import asyncHandler from "../../utils/asyncHandler.js";

import * as categoryService from "./category.service.js";

const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json({
    success: true,
    message: "All Categories",
    categoryData: categories,
  });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryById(categoryId);

  res.status(200).json({
    success: true,
    categoryData: category,
  });
});

// const createCategory = asyncHandler(async (req, res, next) => {
//   const { name, description } = req.body;

//   const data = { name, description };
//   const category = await categoryService.createCategory(data);

//   res.status(201).json({
//     success: true,
//     message: "Category create successfully",
//     categoryData: category,
//   });
// });

const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description, level, parent } = req.body;

  const data = { name, description, level, parent };

  const category = await categoryService.createCategory(data);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    categoryData: category,
  });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await categoryService.updateCategory(
    req.params.categoryId,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Category update successfully",
    categoryData: category,
  });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  await categoryService.deleteCategory(req.params.categoryId);
  res.status(204).json({
    success: true,
    categoryData: null,
  });
});

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
