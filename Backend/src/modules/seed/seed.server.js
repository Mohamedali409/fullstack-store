import fs from "fs";
import path from "path";
import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Product from "../products/product.model.js";

export const clearAndSeedDatabase = async () => {
  // 1️⃣ حذف البيانات القديمة
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  // 2️⃣ إنشاء المستخدمين
  const usersData = [
    {
      name: "Admin User",
      email: "admin@alyshope.com",
      password: "password123",
      confirmPassword: "password123",
      role: "Admin",
    },
    {
      name: "Normal User",
      email: "user@alyshope.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    },
  ];

  const createdUsers = [];
  for (const userData of usersData) {
    const user = await User.create(userData);
    createdUsers.push(user);
  }
  const adminId = createdUsers[0]._id;

  // 3️⃣ إنشاء التصنيف الرئيسي
  const mainCategory = await Category.create({
    name: "All Products",
    description: "Main store category",
    level: "main",
  });

  // 4️⃣ إنشاء التصنيفات الفرعية
  const subCategoriesData = [
    { name: "Audio & Headphones", level: "sub", parent: mainCategory._id },
    { name: "Smartphones & Tablets", level: "sub", parent: mainCategory._id },
    { name: "TV & Home Appliances", level: "sub", parent: mainCategory._id },
    { name: "Camera & Photo", level: "sub", parent: mainCategory._id },
    { name: "Computer & Laptop", level: "sub", parent: mainCategory._id },
    {
      name: "Gaming Consoles & Accessories",
      level: "sub",
      parent: mainCategory._id,
    },
    { name: "Wearable Technology", level: "sub", parent: mainCategory._id },
    { name: "Smart Home Devices", level: "sub", parent: mainCategory._id },
  ];

  const createdSubCategories = await Category.insertMany(subCategoriesData);

  const getSubCategoryId = (name) =>
    createdSubCategories.find((c) => c.name === name)?._id;

  // 5️⃣ قراءة صور من مجلد seed
  const imagesFolder = path.join(process.cwd(), "uploads", "seed");
  const imageFiles = fs.existsSync(imagesFolder)
    ? fs.readdirSync(imagesFolder)
    : [];

  // 6️⃣ إنشاء المنتجات
  const productsData = [
    {
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
      price: 70,
      description: "High quality wireless earbuds with charging case.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 50,
    },
    {
      name: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
      price: 348,
      description:
        "Industry-leading noise canceling with Dual Noise Sensor technology.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 30,
    },
    {
      name: "Apple AirPods Pro (2nd Generation)",
      price: 249,
      description:
        "Rich audio quality, active noise cancellation, and personalized spatial audio.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 100,
    },
    // هنا ممكن تضيف باقي المنتجات بنفس الطريقة...
  ];

  // توزيع الصور على المنتجات
  const productsWithImages = productsData.map((product, index) => {
    const imageFile = imageFiles[index % imageFiles.length];
    return {
      ...product,
      image: imageFile ? `/uploads/seed/${imageFile}` : "",
    };
  });

  const createdProducts = await Product.insertMany(productsWithImages);

  return {
    success: true,
    message: "Database seeded successfully with images!",
    usersCount: createdUsers.length,
    categoriesCount: createdSubCategories.length + 1,
    productsCount: createdProducts.length,
  };
};
