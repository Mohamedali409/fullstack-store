import fs from "fs";
import path from "path";
import slugify from "slugify";
import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Product from "../products/product.model.js";

export const clearAndSeedDatabase = async () => {
  console.log("⏳ Starting Database Seeding...");

  // 1️⃣ تفريغ قاعدة البيانات القديمة
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log("✅ Cleared old data");

  // 2️⃣ إنشاء المستخدمين (Admin & User)
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

  const createdUsers = await User.insertMany(usersData);
  const adminId = createdUsers[0]._id;

  // 3️⃣ بيانات الـ 21 منتج بالكامل
  const productsRawData = [
    // --- المجموعة الأولى ---
    {
      name: "4k uhd led smart tv with chromecast built in",
      price: 499,
      description:
        "Experience stunning 4K UHD resolution with built-in Chromecast for easy streaming.",
      categoryName: "TV & Home Appliances",
      stock: 20,
    },
    {
      name: "amazon basics high speed hdmi cable",
      price: 15,
      description:
        "High-Speed HDMI Cable (18 Gbps, 4K/60Hz) for clear video and audio.",
      categoryName: "Electronics Accessories",
      stock: 150,
    },
    {
      name: "dell optiplex 7000x7480 all in one computer monitor",
      price: 850,
      description:
        "Powerful all-in-one desktop computer, perfect for office and home use.",
      categoryName: "Computer & Laptop",
      stock: 15,
    },
    {
      name: "high speed wifi router",
      price: 65,
      description:
        "Dual-band high speed WiFi router for seamless gaming and streaming.",
      categoryName: "Computer & Networking",
      stock: 40,
    },
    {
      name: "polaroid 57 inch photovideo tripod",
      price: 45,
      description:
        "Professional 57-inch tripod with deluxe carrying case for cameras and phones.",
      categoryName: "Camera & Photo",
      stock: 35,
    },
    {
      name: "portable washing machine 11lbs capacity",
      price: 120,
      description:
        "Compact and portable washing machine with 11lbs capacity, ideal for small spaces.",
      categoryName: "Home Appliances",
      stock: 10,
    },
    {
      name: "tozo t6 true wireless earbuds bluetooth headphones",
      price: 35,
      description:
        "True wireless earbuds with touch control, wireless charging case, and IPX8 waterproof rating.",
      categoryName: "Audio & Headphones",
      stock: 80,
    },
    {
      name: "wired over ear gaming headphones with usb",
      price: 25,
      description:
        "Comfortable over-ear gaming headphones with noise-canceling microphone and USB connection.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 60,
    },
    // --- المجموعة الثانية (اللي حللناها من الصور الـ Hash) ---
    {
      name: "Ergonomic Gaming Chair",
      price: 180,
      description:
        "High back ergonomic gaming chair with lumbar support and adjustable armrests.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 25,
    },
    {
      name: "Professional DSLR Camera",
      price: 1200,
      description:
        "High-resolution professional DSLR camera for stunning photography.",
      categoryName: "Camera & Photo",
      stock: 12,
    },
    {
      name: "Retro Handheld Game Console",
      price: 50,
      description:
        "Portable retro gaming console with hundreds of classic games.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 100,
    },
    {
      name: "Smart Home Security Camera",
      price: 85,
      description:
        "1080p HD smart home security camera with night vision and two-way audio.",
      categoryName: "Smart Home Devices",
      stock: 45,
    },
    {
      name: "Black Smartwatch Fitness Tracker",
      price: 60,
      description:
        "Waterproof smartwatch with heart rate monitor, sleep tracker, and step counter.",
      categoryName: "Wearable Technology",
      stock: 75,
    },
    {
      name: "Xbox Wireless Controller White",
      price: 65,
      description:
        "Official Xbox wireless controller with textured grip and Bluetooth.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 55,
    },
    {
      name: "VR Headset Advanced All In One",
      price: 299,
      description:
        "Immersive all-in-one virtual reality headset with built-in storage.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 18,
    },
    {
      name: "Silver Thin and Light Laptop",
      price: 999,
      description:
        "Premium ultra-thin laptop with high-performance processor and long battery life.",
      categoryName: "Computer & Laptop",
      stock: 22,
    },
    {
      name: "Nintendo Switch Console",
      price: 299,
      description:
        "Play at home or on the go with this versatile gaming console.",
      categoryName: "Gaming Consoles & Accessories",
      stock: 30,
    },
    // --- المجموعة الثالثة (المتبقية من الصور الأولى) ---
    {
      name: "Samsung Electronics Samsung Galexy S21 5G",
      price: 799,
      description:
        "Unlocked Android smartphone with pro-grade camera and 8K video.",
      categoryName: "Smartphones & Tablets",
      stock: 40,
    },
    {
      name: "JBL FLIP 4",
      price: 75,
      description:
        "Waterproof portable Bluetooth speaker with powerful stereo sound.",
      categoryName: "Audio & Headphones",
      stock: 65,
    },
    {
      name: "Barrel Carburetor Carb",
      price: 110,
      description: "High-performance replacement barrel carburetor.",
      categoryName: "Automotive Parts",
      stock: 15,
    },
    {
      name: "iPhone 11",
      price: 499,
      description:
        "Apple iPhone 11 with Liquid Retina HD display and dual-camera system.",
      categoryName: "Smartphones & Tablets",
      stock: 50,
    },
  ];

  // 4️⃣ إنشاء القسم الرئيسي والأقسام الفرعية ديناميكياً
  const mainCategory = await Category.create({
    name: "All Products",
    description: "Main store category",
    level: "main",
  });

  const uniqueCategoryNames = [
    ...new Set(productsRawData.map((p) => p.categoryName)),
  ];

  const subCategoriesData = uniqueCategoryNames.map((name) => ({
    name: name,
    level: "sub",
    parent: mainCategory._id,
  }));

  const createdSubCategories = await Category.insertMany(subCategoriesData);
  console.log("✅ Created Categories dynamically");

  const getSubCategoryId = (name) =>
    createdSubCategories.find((c) => c.name === name)?._id;

  // 5️⃣ قراءة الصور من فولدر uploads/products
  const imagesFolder = path.join(process.cwd(), "uploads", "products");
  const imageFiles = fs.existsSync(imagesFolder)
    ? fs.readdirSync(imagesFolder)
    : [];

  // 6️⃣ ربط المنتجات بالصور من الفولدر
  const finalProducts = productsRawData.map((product) => {
    // بنحول اسم المنتج لـ kebab-case عشان نطابقه مع الصور
    const slugName = slugify(product.name, { lower: true, strict: true });

    // بنجيب كل الصور اللي بتبدأ باسم المنتج
    const productImages = imageFiles.filter((file) =>
      file.toLowerCase().startsWith(slugName),
    );

    // الصورة اللي فيها -1 تبقى هي الغلاف، لو مفيش بناخد أول صورة
    const mainImageFile =
      productImages.find((file) => file.includes("-1")) || productImages[0];

    // باقي الصور تتحط في الـ Gallery
    const galleryImages = productImages
      .filter((file) => file !== mainImageFile)
      .map((file) => `/uploads/products/${file}`);

    return {
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      categoryId: getSubCategoryId(product.categoryName),
      createdBy: adminId,
      image: mainImageFile ? `/uploads/products/${mainImageFile}` : "",
      images: galleryImages,
    };
  });

  // 7️⃣ إدخال المنتجات في الداتا بيز
  const createdProducts = await Product.insertMany(finalProducts);
  console.log("✅ Products seeded and images linked successfully!");

  return {
    success: true,
    message: "Database seeded successfully from uploads/products!",
    usersCount: createdUsers.length,
    categoriesCount: createdSubCategories.length + 1,
    productsCount: createdProducts.length,
  };
};
