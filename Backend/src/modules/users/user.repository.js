import User from "./user.model.js";

export const getUserByEmail = (email) => {
  return User.findOne({ email });
};
export const getUserByEmailAndSelectPassword = (email) => {
  return User.findOne({ email }).select("+password");
};

export const createUser = (data) => {
  return User.create(data);
};

//updateUser
//deleteUser
