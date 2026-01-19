// import Analysis from "../models/Analysis.model.js";
// import Project from "../models/Project.model.js";
// import ApiError from "../utils/ApiError.js";
// import { analyzeCodebase } from "../ai/codeAnalyzer.js";

// export const runAnalysis = async ({ projectId, userId }) => {
//   const project = await Project.findOne({ _id: projectId, user: userId });
//   if (!project) {
//     throw new ApiError(404, "Project not found");
//   }

//   const analysis = await Analysis.create({
//     project: projectId,
//     status: "processing",
//   });

//   // Async AI analysis
//   analyzeCodebase(projectId, analysis._id);

//   return analysis;
// };

// export const fetchAnalysis = async (projectId, userId) => {
//   const analysis = await Analysis.findOne({ project: projectId })
//     .populate("issues");

//   if (!analysis) {
//     throw new ApiError(404, "Analysis not found");
//   }

//   return analysis;
// };



// import Analysis from "../models/Analysis.model.js";
// import Project from "../models/Project.model.js";
// import ApiError from "../utils/ApiError.js";
// import { addAnalysisJob } from "../jobs/analysis.queue.js";

// export const runAnalysis = async ({ projectId, userId }) => {
//   const project = await Project.findOne({
//     _id: projectId,
//     user: userId,
//   });

//   if (!project) {
//     throw new ApiError(404, "Project not found");
//   }

//   // Create analysis record
//   const analysis = await Analysis.create({
//     project: projectId,
//     status: "processing",
//   });

//   // ✅ Push analysis job to queue (NON-BLOCKING)
//   await addAnalysisJob({
//     projectId,
//     analysisId: analysis._id,
//   });

//   return analysis;
// };

// export const fetchAnalysis = async (projectId, userId) => {
//   const analysis = await Analysis.findOne({ project: projectId });

//   if (!analysis) {
//     throw new ApiError(404, "Analysis not found");
//   }

//   return analysis;
// };


import Analysis from "../models/Analysis.model.js";
import Project from "../models/Project.model.js";
import ApiError from "../utils/ApiError.js";
import { addAnalysisJob } from "../jobs/analysis.queue.js";

export const runAnalysis = async ({ projectId, userId }) => {
  const project = await Project.findOne({ _id: projectId, user: userId });

  if (!project) throw new ApiError(404, "Project not found");

  const analysis = await Analysis.create({
    project: projectId,
    status: "processing",
    issues: [],
  });

  // Enqueue job with zip path
  await addAnalysisJob({
    projectId,
    analysisId: analysis._id,
    uploadedZipPath: project.path, // store uploaded zip path in Project model
  });

  return analysis;
};

export const fetchAnalysis = async (projectId, userId) => {

  projectId = projectId.trim();
  
  const analysis = await Analysis.findOne({ project: projectId });

  if (!analysis) throw new ApiError(404, "Analysis not found");

  return analysis;
};
