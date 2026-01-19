// import fs from "fs";
// import path from "path";
// import { detectTechDebt } from "./techDebtDetector.js";
// import Analysis from "../models/Analysis.model.js";

// const getAllFiles = (dir, files = []) => {
//   const dirFiles = fs.readdirSync(dir);

//   for (const file of dirFiles) {
//     const fullPath = path.join(dir, file);

//     if (fs.statSync(fullPath).isDirectory()) {
//       getAllFiles(fullPath, files);
//     } else if (/\.(js|ts|jsx|tsx)$/.test(file)) {
//       files.push(fullPath);
//     }
//   }

//   return files;
// };

// export const analyzeCodebase = async (projectId, analysisId) => {
//   const projectPath = `uploads/${projectId}`;
//   const files = getAllFiles(projectPath);

//   const issues = [];

//   for (const filePath of files) {
//     const code = fs.readFileSync(filePath, "utf-8");

//     const detectedIssues = await detectTechDebt({
//       code,
//       filePath,
//     });

//     issues.push(...detectedIssues);
//   }

//   await Analysis.findByIdAndUpdate(analysisId, {
//     status: "completed",
//     issues,
//   });
// };


import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";
import AdmZip from "adm-zip";
import { detectTechDebt } from "./techDebtDetector.js";
import Analysis from "../models/Analysis.model.js";

const getAllFiles = async (dir, files = []) => {
  const dirFiles = await fsPromises.readdir(dir);

  for (const file of dirFiles) {
    const fullPath = path.join(dir, file);
    const stat = await fsPromises.stat(fullPath);

    if (stat.isDirectory()) {
      await getAllFiles(fullPath, files);
    } else if (/\.(js|ts|jsx|tsx)$/.test(file)) {
      files.push(fullPath);
    }
  }

  return files;
};

export const analyzeCodebase = async (projectId, analysisId, uploadedZipPath) => {
  const extractPath = `uploads/${projectId}`;
  if (!fs.existsSync(extractPath)) fs.mkdirSync(extractPath, { recursive: true });

  // Extract zip
  const zip = new AdmZip(uploadedZipPath);
  zip.extractAllTo(extractPath, true);

  const files = await getAllFiles(extractPath);
  const issues = [];

  for (const filePath of files) {
    const code = await fsPromises.readFile(filePath, "utf-8");
    const detectedIssues = await detectTechDebt({ code, filePath });
    if (Array.isArray(detectedIssues)) issues.push(...detectedIssues);
  }

  await Analysis.findByIdAndUpdate(
    analysisId,
    { status: "completed", issues, updatedAt: new Date() },
    { new: true }
  );
};
