import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  generateFix,
  applyFix,
} from "../controllers/fix.controller.js";

const router = express.Router();

router.post("/generate/:issueId", authMiddleware, generateFix);
router.post("/apply/:fixId", authMiddleware, applyFix);

export default router;
