import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createFix,
  applyFixToProject,
} from "../services/fix.service.js";

export const generateFix = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const fix = await createFix(issueId, req.user.id);

  res
    .status(201)
    .json(new ApiResponse(201, fix, "Fix generated successfully"));
});

export const applyFix = asyncHandler(async (req, res) => {
  const { fixId } = req.params;

  const result = await applyFixToProject(fixId, req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, result, "Fix applied successfully"));
});
