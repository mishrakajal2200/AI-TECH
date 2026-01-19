import express from "express";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import { uploadProject } from "../controllers/upload.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  uploadProject
);

export default router;
