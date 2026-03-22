import express from "express";
import { userLogin, userRegister, googleCallback } from "./auth.controller.js";
import passport from "../../middlewares/Passport.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login?error=failed",
  }),
  googleCallback,
);

export default authRouter;
