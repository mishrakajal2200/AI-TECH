

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