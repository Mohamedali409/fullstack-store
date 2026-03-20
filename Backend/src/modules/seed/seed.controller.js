import asyncHandler from "../../utils/asyncHandler.js";
import * as seederService from "./seed.server.js";

const seedDatabase = asyncHandler(async (req, res, next) => {
  const seededDataStats = await seederService.clearAndSeedDatabase();

  res.status(201).json({
    success: true,
    message: "Database seeded successfully! 🌱",
    data: seededDataStats,
  });
});

export { seedDatabase };
