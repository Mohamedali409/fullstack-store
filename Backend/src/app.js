import express from "express";
import path from "path";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { errorHandling } from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.router.js";
import categoryRouter from "./modules/categories/category.router.js";
import productRouter from "./modules/products/product.routes.js";
import logger from "./middlewares/logger.middleware.js";
import cartRouter from "./modules/card/cart.router.js";
import seederRouter from "./modules/seed/seed.router.js";
import supportRouter from "./modules/support/support.router.js";

//user router
// category router
// product router

const app = express();

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(morgan("dev"));
app.use(logger);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 60 * 60 },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/seed", seederRouter);
app.use("/api/support", supportRouter);

//Error handling middleware
app.use(errorHandling);

export default app;
