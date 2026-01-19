import fs from "fs";
import path from "path";

export const getAllFiles = (dir, extensions = [], files = []) => {
  const dirFiles = fs.readdirSync(dir);

  for (const file of dirFiles) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, extensions, files);
    } else {
      if (extensions.length === 0 || extensions.includes(path.extname(file))) {
        files.push(fullPath);
      }
    }
  }

  return files;
};

export const readFileContent = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};
