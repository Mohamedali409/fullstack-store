import express from "express";
import { userLogin, userRegister } from "./auth.controller.js";
import passport from "../../middlewares/Passport.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ success: true, token, user: req.user });
  },
);

export default authRouter;
