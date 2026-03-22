import express from "express";
import { submitSupportMessage } from "./support.controller.js";

const supportRouter = express.Router();

supportRouter.post("/", submitSupportMessage);

export default supportRouter;
