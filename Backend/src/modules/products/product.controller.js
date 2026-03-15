import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as productService from "./product.service.js";

const getAllProduct = asyncHandler(async (req, res) => {
  const data = await productService.getAllProducts(req.query);

  res.status(200).json({
    success: true,
    data,
  });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const product = await productService.getProductById(req.params.productId);

  res.status(200).json({
    success: true,
    message: "This product by id ",
    product: product,
  });
});

const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, categoryId } = req.body;

  const createdBy = req.user.id;

  const data = { name, description, price, categoryId, createdBy };
  const product = await productService.createProduct(data);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    productData: product,
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.updateProduct(
    req.params.productId,
    req.body,
  );

  req.status(200).json({
    success: true,
    productData: product,
  });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.deleteProduct(req.params.productId);

  res.status(204).json({
    success: true,
  });
});

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Image is required", 400);
  }

  const product = await productService.updateProduct(
    req.params.id,

    { image: req.file.path },
  );

  res.status(200).json({
    success: true,
    product,
  });
});

export {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
