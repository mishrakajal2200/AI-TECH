import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return { user, token };
};

// export const login = async ({ email, password }) => {
//   const user = await User.findOne({ email }).select("+password");;
//   if (!user) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const token = generateToken(user._id);

//   return { user, token };
// };

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  user.password = undefined; // ✅ IMPORTANT

  return { user, token };
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};
