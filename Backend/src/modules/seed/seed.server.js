import User from "../users/user.model.js";
import Category from "../categories/category.model.js";
import Product from "../products/product.model.js";

export const clearAndSeedDatabase = async () => {
  // 1. مسح البيانات القديمة
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  // 2. إضافة المستخدمين
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

  // 3. إضافة الأقسام (الرئيسي والفرعية)
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
    // الأقسام الجديدة
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

  // 4. إضافة المنتجات
  const productsData = [
    // --- Audio & Headphones ---
    {
      name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
      price: 70,
      description: "High quality wireless earbuds with charging case.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 50,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=TOZO+Earbuds",
    },
    {
      name: "Sony WH-1000XM4 Wireless Noise Canceling Headphones",
      price: 348,
      description:
        "Industry-leading noise canceling with Dual Noise Sensor technology.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 30,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Sony+WH-1000XM4",
    },
    {
      name: "Apple AirPods Pro (2nd Generation)",
      price: 249,
      description:
        "Rich audio quality, active noise cancellation, and personalized spatial audio.",
      categoryId: getSubCategoryId("Audio & Headphones"),
      createdBy: adminId,
      stock: 100,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=AirPods+Pro",
    },

    // --- Smartphones & Tablets ---
    {
      name: "Samsung Galaxy S21 5G",
      price: 800,
      description: "Latest 5G smartphone from Samsung with excellent camera.",
      categoryId: getSubCategoryId("Smartphones & Tablets"),
      createdBy: adminId,
      stock: 25,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Galaxy+S21",
    },
    {
      name: "Apple iPhone 14 Pro Max",
      price: 1099,
      description: "Dynamic Island, 48MP Main camera, and A16 Bionic chip.",
      categoryId: getSubCategoryId("Smartphones & Tablets"),
      createdBy: adminId,
      stock: 40,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=iPhone+14+Pro",
    },
    {
      name: "Apple iPad Air (5th Generation)",
      price: 599,
      description:
        "10.9-inch Liquid Retina display, M1 chip, 12MP front/back camera.",
      categoryId: getSubCategoryId("Smartphones & Tablets"),
      createdBy: adminId,
      stock: 60,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=iPad+Air",
    },

    // --- TV & Home Appliances ---
    {
      name: "Amazon Basics High-Speed HDMI Cable",
      price: 15,
      description: "Durable high-speed HDMI cable for your TV and monitors.",
      categoryId: getSubCategoryId("TV & Home Appliances"),
      createdBy: adminId,
      stock: 200,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=HDMI+Cable",
    },
    {
      name: "TCL 55-Inch 4K UHD LED Smart Roku TV",
      price: 320,
      description: "Stunning 4K visual quality with built-in smart features.",
      categoryId: getSubCategoryId("TV & Home Appliances"),
      createdBy: adminId,
      stock: 15,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=TCL+Smart+TV",
    },
    {
      name: "Dyson V11 Cordless Vacuum Cleaner",
      price: 599,
      description: "Powerful cleaning on floors and carpets.",
      categoryId: getSubCategoryId("TV & Home Appliances"),
      createdBy: adminId,
      stock: 10,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Dyson+Vacuum",
    },

    // --- Camera & Photo ---
    {
      name: "Polaroid 57-Inch Photo/Video Tripod",
      price: 35,
      description: "Professional tripod for cameras and video recording.",
      categoryId: getSubCategoryId("Camera & Photo"),
      createdBy: adminId,
      stock: 45,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Tripod",
    },
    {
      name: "Canon EOS Rebel T7 DSLR Camera",
      price: 479,
      description: "Ideal for beginners, comes with 18-55mm lens.",
      categoryId: getSubCategoryId("Camera & Photo"),
      createdBy: adminId,
      stock: 12,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Canon+EOS",
    },
    {
      name: "GoPro HERO11 Black",
      price: 399,
      description: "Waterproof Action Camera with 5.3K60 Ultra HD Video.",
      categoryId: getSubCategoryId("Camera & Photo"),
      createdBy: adminId,
      stock: 25,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=GoPro+HERO11",
    },

    // --- Computer & Laptop ---
    {
      name: "Dell Optiplex 7000 All-in-One Computer",
      price: 850,
      description: "All-in-one desktop computer perfect for office work.",
      categoryId: getSubCategoryId("Computer & Laptop"),
      createdBy: adminId,
      stock: 8,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Dell+AIO",
    },
    {
      name: "Apple 2020 MacBook Air Laptop M1 Chip",
      price: 899,
      description: "13” Retina Display, 8GB RAM, 256GB SSD Storage.",
      categoryId: getSubCategoryId("Computer & Laptop"),
      createdBy: adminId,
      stock: 20,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=MacBook+Air",
    },
    {
      name: "Logitech MX Master 3S Wireless Mouse",
      price: 99,
      description: "Ultrafast scrolling, ergonomic, 8000 DPI.",
      categoryId: getSubCategoryId("Computer & Laptop"),
      createdBy: adminId,
      stock: 75,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=MX+Master+3S",
    },
    {
      name: "Keychron K2 Wireless Mechanical Keyboard",
      price: 79,
      description: "Compact wireless mechanical keyboard with RGB.",
      categoryId: getSubCategoryId("Computer & Laptop"),
      createdBy: adminId,
      stock: 35,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Keychron+K2",
    },

    // --- Gaming Consoles & Accessories ---
    {
      name: "PlayStation 5 Console",
      price: 499,
      description: "Next-gen gaming console with lightning-fast loading.",
      categoryId: getSubCategoryId("Gaming Consoles & Accessories"),
      createdBy: adminId,
      stock: 15,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=PlayStation+5",
    },
    {
      name: "Xbox Series X",
      price: 499,
      description: "The fastest, most powerful Xbox ever.",
      categoryId: getSubCategoryId("Gaming Consoles & Accessories"),
      createdBy: adminId,
      stock: 12,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Xbox+Series+X",
    },
    {
      name: "Nintendo Switch OLED Model",
      price: 349,
      description: "7-inch OLED screen, 64GB internal storage.",
      categoryId: getSubCategoryId("Gaming Consoles & Accessories"),
      createdBy: adminId,
      stock: 22,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Nintendo+Switch",
    },

    // --- Wearable Technology ---
    {
      name: "Apple Watch Series 8",
      price: 399,
      description:
        "Advanced health sensors, crash detection, always-on display.",
      categoryId: getSubCategoryId("Wearable Technology"),
      createdBy: adminId,
      stock: 30,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Apple+Watch",
    },
    {
      name: "Garmin Forerunner 245 Music",
      price: 249,
      description: "GPS running smartwatch with music and advanced dynamics.",
      categoryId: getSubCategoryId("Wearable Technology"),
      createdBy: adminId,
      stock: 18,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Garmin+Watch",
    },

    // --- Smart Home Devices ---
    {
      name: "Echo Dot (5th Gen) Smart Speaker",
      price: 49,
      description: "Our best sounding Echo Dot yet, with Alexa.",
      categoryId: getSubCategoryId("Smart Home Devices"),
      createdBy: adminId,
      stock: 80,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Echo+Dot",
    },
    {
      name: "Philips Hue Smart Bulb Starter Kit",
      price: 129,
      description: "Color changing smart LED bulbs with bridge.",
      categoryId: getSubCategoryId("Smart Home Devices"),
      createdBy: adminId,
      stock: 25,
      image: "https://placehold.co/300x300/f3f4f6/6b7280?text=Philips+Hue",
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
