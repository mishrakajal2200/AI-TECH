import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  startAnalysis,
  getAnalysisByProject,
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.post("/start/:projectId", authMiddleware, startAnalysis);
router.get("/:projectId", authMiddleware, getAnalysisByProject);

export default router;
