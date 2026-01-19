import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { chatWithCodebase } from "../services/ai.service.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const { message, projectId } = req.body;

  const reply = await chatWithCodebase({
    message,
    projectId,
    userId: req.user.id,
  });

  res.status(200).json(new ApiResponse(200, reply));
});
