import fs from "fs";
import path from "path";
import unzipper from "unzipper";
import Project from "../models/Project.model.js";
import ApiError from "../utils/ApiError.js";

export const handleUpload = async ({ userId, file }) => {
  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  const project = await Project.create({
    user: userId,
    name: file.originalname,
    status: "uploaded",
  });

  const extractPath = `uploads/${project._id}`;

  fs.createReadStream(file.path)
    .pipe(unzipper.Extract({ path: extractPath }));

  return project;
};
