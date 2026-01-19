import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Token invalid or expired"));
  }
};

export default authMiddleware;
