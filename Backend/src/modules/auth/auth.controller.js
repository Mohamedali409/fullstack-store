import asyncHandler from "../../utils/asyncHandler.js";
import * as authService from "./auth.service.js";
import { generateToken } from "../../utils/jwt.js"; // استدعاء دالة التوكن بتاعتك

const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const data = { name, email, password, confirmPassword };

  const newUser = await authService.createNewUser(data);

  const { password: pwd, ...userData } = newUser.toObject();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: userData,
  });
});

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser(email, password);

  const { password: pwd, ...userData } = user.toObject();
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: userData,
    token,
  });
});
// ... (باقي الكود بتاعك فوق زي ما هو)
const googleCallback = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const token = generateToken(user);
  // هنا بنرجعه للفرونت إند (5173) ونديله التوكن
  res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
});

export { userRegister, userLogin, googleCallback };
