import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { register, login, getProfile } from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const user = await register(req.body);
  res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const data = await login(req.body);
  res.status(200).json(new ApiResponse(200, data, "Login successful"));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user.id);
  res.status(200).json(new ApiResponse(200, user));
});
