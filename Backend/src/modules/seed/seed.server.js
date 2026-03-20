import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Product from "../products/product.model.js";

export const clearAndSeedDatabase = async () => {
  // 1. مسح البيانات القديمة بالكامل
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  // 2. تجهيز وإدخال المستخدمين
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

  // أخذ الـ ID الخاص بالأدمن لربطه بالمنتجات لاحقاً
  const adminId = createdUsers[0]._id;

  // 3. تجهيز وإدخال الأقسام (يجب إنشاء قسم رئيسي أولاً ثم الأقسام الفرعية)
  const mainCategory = await Category.create({
    name: "All Products",
    description: "Main store category",
    level: "main",
  });

  const subCategoriesData = [
    { name: "Audio & Headphones", level: "sub", parent: mainCategory._id },
    { name: "Smartphones & Tablets", level: "sub", parent: mainCategory._id },
    { name: "TV & Home Appliances", level: "sub", parent: mainCategory._id },
    { name: "Camera & Photo", level: "sub", parent: mainCategory._id },
    { name: "Computer & Laptop", level: "sub", parent: mainCategory._id },
  ];

  const createdSubCategories = await Category.insertMany(subCategoriesData);

  // دالة للحصول على الـ ID الخاص بالقسم الفرعي
  const getSubCategoryId = (name) =>
    createdSubCategories.find((c) => c.name === name)?._id;

  // 4. تجهيز وإدخال المنتجات (تم تعديل الأسماء لتطابق product.model.js)
  // ملاحظة: تم إزالة brand, rating, reviews لأنها غير موجودة في الـ Schema
  const productsData = [
    {
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
      price: 70,
      description: "High quality wireless earbuds with charging case.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 50,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Earbuds",
    },
    {
      name: "Samsung Electronics Samsung Galaxy S21 5G",
      price: 2300,
      description: "Latest 5G smartphone from Samsung with excellent camera.",
      categoryId: getSubCategoryId("Smartphones & Tablets"),
      createdBy: adminId,
      stock: 25,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Galaxy+S21",
    },
    {
      name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)",
      price: 360,
      description: "Durable high-speed HDMI cable for your TV and monitors.",
      categoryId: getSubCategoryId("TV & Home Appliances"),
      createdBy: adminId,
      stock: 100,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=HDMI+Cable",
    },
    {
      name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Case",
      price: 1200,
      description: "Professional tripod for cameras and video recording.",
      categoryId: getSubCategoryId("Camera & Photo"),
      createdBy: adminId,
      stock: 15,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Tripod",
    },
    {
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      price: 250,
      description: "All-in-one desktop computer perfect for office work.",
      categoryId: getSubCategoryId("Computer & Laptop"),
      createdBy: adminId,
      stock: 10,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Dell+Monitor",
    },
    {
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      price: 220,
      description: "Stunning 4K visual quality with built-in smart features.",
      categoryId: getSubCategoryId("TV & Home Appliances"),
      createdBy: adminId,
      stock: 30,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Smart+TV",
    },
  ];

  const createdProducts = await Product.insertMany(productsData);

  // 5. إرجاع النتيجة
  return {
    success: true,
    message: "Database seeded successfully! 🌱",
    usersCount: createdUsers.length,
    categoriesCount: createdSubCategories.length + 1, // الفرعية + 1 الرئيسي
    productsCount: createdProducts.length,
  };
};
