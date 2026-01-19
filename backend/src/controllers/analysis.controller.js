// import asyncHandler from "../utils/asyncHandler.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import {
//   runAnalysis,
//   fetchAnalysis,
// } from "../services/analysis.service.js";

// export const startAnalysis = asyncHandler(async (req, res) => {
//   const { projectId } = req.params;

//   const analysis = await runAnalysis({
//     projectId,
//     userId: req.user.id,
//   });

//   res
//     .status(202)
//     .json(new ApiResponse(202, analysis, "Analysis started"));
// });

// export const getAnalysisByProject = asyncHandler(async (req, res) => {
//   const { projectId } = req.params;

//   const analysis = await fetchAnalysis(projectId, req.user.id);

//   res.status(200).json(new ApiResponse(200, analysis));
// });


import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { runAnalysis, fetchAnalysis } from "../services/analysis.service.js";


export const startAnalysis = asyncHandler(async (req, res) => {
  let { projectId } = req.params;

  projectId = projectId.trim(); // 🔥 FIX newline issue

  const analysis = await runAnalysis({
    projectId,
    userId: req.user.id,
  });

  res.status(202).json(
    new ApiResponse(202, analysis, "Analysis started")
  );
});


export const getAnalysisByProject = asyncHandler(async (req, res) => {
  let { projectId } = req.params;

  projectId = projectId.trim();

  const analysis = await fetchAnalysis(projectId, req.user.id);

  res.status(200).json(new ApiResponse(200, analysis, "Analysis fetched"));
});
