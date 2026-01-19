// import analysisQueue from "./jobs/analysis.queue.js";
// import logger from "./config/logger.js";
// import { analyzeCodebase } from "./ai/codeAnalyzer.js";

// import dotenv from "dotenv";
// dotenv.config();

// console.log("🚀 Worker started. Listening for analysis jobs...");

// analysisQueue.process(async (job) => {
//   const { projectId, analysisId, uploadedZipPath } = job.data;

//   logger.info(`🔍 Starting analysis for project ${projectId}`);

//   // Analyze codebase (extract zip, run AI detection)
//   await analyzeCodebase(projectId, analysisId, uploadedZipPath);

//   logger.info(`✅ Analysis completed for project ${projectId}`);
// });



// // 1️⃣ Load environment variables FIRST
// import dotenv from "dotenv";
// dotenv.config();

// // 2️⃣ Now import modules that use env variables
// import analysisQueue from "./jobs/analysis.queue.js";
// import logger from "./config/logger.js";
// import { analyzeCodebase } from "./ai/codeAnalyzer.js";

// console.log("🚀 Worker started. Listening for analysis jobs...");

// // 3️⃣ Process jobs
// analysisQueue.process(async (job) => {
//   const { projectId, analysisId, uploadedZipPath } = job.data;

//   logger.info(`🔍 Starting analysis for project ${projectId}`);

//   // Analyze codebase (extract zip, run AI detection)
//   await analyzeCodebase(projectId, analysisId, uploadedZipPath);

//   logger.info(`✅ Analysis completed for project ${projectId}`);
// });

// import path from "path";
// import dotenv from "dotenv";

// dotenv.config({
//   path: path.resolve(process.cwd(), ".env"),
// });

// import mongoose from "mongoose";
// import analysisQueue from "./jobs/analysis.queue.js";
// import logger from "./config/logger.js";
// import env from "./config/env.js";
// import { analyzeCodebase } from "./ai/codeAnalyzer.js";

// // ✅ Connect MongoDB (VERY IMPORTANT)
// await mongoose.connect(env.MONGO_URI, {
//   dbName: env.DB_NAME,
// });

// logger.info("🚀 Worker connected to MongoDB");
// logger.info("🚀 Worker started. Listening for analysis jobs...");

// analysisQueue.process(async (job) => {
//   const { projectId, analysisId, uploadedZipPath } = job.data;

//   logger.info(`🔍 Starting analysis for project ${projectId}`);

//   await analyzeCodebase(projectId, analysisId, uploadedZipPath);

//   logger.info(`✅ Analysis completed for project ${projectId}`);
// });


import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import mongoose from "mongoose";
import analysisQueue from "./jobs/analysis.queue.js";
import logger from "./config/logger.js";
import env from "./config/env.js";
import { analyzeCodebase } from "./ai/codeAnalyzer.js";

// Connect to MongoDB
await mongoose.connect(env.MONGO_URI, { dbName: env.DB_NAME });
logger.info("🚀 Worker connected to MongoDB");
logger.info("🚀 Worker started. Listening for analysis jobs...");

// Process each analysis job
analysisQueue.process(async (job) => {
  const { projectId, analysisId, uploadedZipPath } = job.data;

  logger.info(`🔍 Starting analysis for project ${projectId}`);

  // Run your AI code analysis logic
  await analyzeCodebase(projectId, analysisId, uploadedZipPath);

  logger.info(`✅ Analysis completed for project ${projectId}`);
});
