import express from "express";
import { seedDatabase } from "./seed.controller.js";

const seederRouter = express.Router();

seederRouter.post("/", seedDatabase);

export default seederRouter;
