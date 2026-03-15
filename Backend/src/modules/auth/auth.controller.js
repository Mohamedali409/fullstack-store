import asyncHandler from "../../utils/asyncHandler.js";
import * as authService from "./auth.service.js";

const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const data = { name, email, password, confirmPassword };

  const newUser = await authService.createNewUser(data);

  // exclude password
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

  // exclude password
  const { password: pwd, ...userData } = user.toObject();

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: userData,
    token,
  });
});

export { userRegister, userLogin };
