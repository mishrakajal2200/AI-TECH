import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { handleUpload } from "../services/file.service.js";

export const uploadProject = asyncHandler(async (req, res) => {
  const project = await handleUpload({
    userId: req.user.id,
    file: req.file,
  });

  res
    .status(201)
    .json(new ApiResponse(201, project, "Project uploaded successfully"));
});
