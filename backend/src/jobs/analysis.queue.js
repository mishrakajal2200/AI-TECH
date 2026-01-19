// import Queue from "bull";
// import env from "../config/env.js";
// import logger from "../config/logger.js";
// import { analyzeCodebase } from "../ai/codeAnalyzer.js";

// const analysisQueue = new Queue("analysis-queue", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379,
//   },
// });

// analysisQueue.process(async (job) => {
//   const { projectId, analysisId } = job.data;

//   logger.info(`🔍 Starting analysis for project ${projectId}`);

//   await analyzeCodebase(projectId, analysisId);

//   logger.info(`✅ Analysis completed for project ${projectId}`);
// });

// export const addAnalysisJob = async ({ projectId, analysisId }) => {
//   await analysisQueue.add(
//     { projectId, analysisId },
//     {
//       attempts: 3,
//       backoff: 5000,
//       removeOnComplete: true,
//     }
//   );
// };

// export default analysisQueue;


// import Queue from "bull";
// import env from "../config/env.js";
// import logger from "../config/logger.js";
// import { analyzeCodebase } from "../ai/codeAnalyzer.js";

// const analysisQueue = new Queue("analysis-queue", {
//   redis: {
//     host: "127.0.0.1",
//     port: 6379,
//   },
// });

// // Only add jobs here. Worker will process separately
// export const addAnalysisJob = async ({ projectId, analysisId }) => {
//   await analysisQueue.add(
//     { projectId, analysisId },
//     {
//       attempts: 3,
//       backoff: 5000,
//       removeOnComplete: true,
//     }
//   );
// };

// export default analysisQueue;


import Queue from "bull";
import env from "../config/env.js";

const analysisQueue = new Queue("analysis-queue", {
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
});

export const addAnalysisJob = async ({ projectId, analysisId, uploadedZipPath }) => {
  await analysisQueue.add(
    { projectId, analysisId, uploadedZipPath },
    {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    }
  );
};

export default analysisQueue;