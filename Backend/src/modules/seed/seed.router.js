import express from "express";
import { seedDatabase } from "./seed.controller.js";

const seederRouter = express.Router();

// يمكنك لاحقاً إضافة Middleware الحماية هنا ليكون للأدمن فقط
seederRouter.post("/", seedDatabase);

export default seederRouter;
