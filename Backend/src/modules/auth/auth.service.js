import AppError from "../../utils/AppError.js";
import { generateToken } from "../../utils/jwt.js";
import * as userRepository from "../users/user.repository.js";

export const createNewUser = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);

  if (user) {
    throw new AppError("Email is already in use", 409);
  }

  const newUser = await userRepository.createUser(data);
  // await newUser.save();

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmailAndSelectPassword(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  return { user, token };
};
