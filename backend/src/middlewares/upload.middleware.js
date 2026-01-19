import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/temp";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".zip"];
  if (!allowedTypes.includes(path.extname(file.originalname).toLowerCase())) {
    return cb(new Error("Only ZIP files are allowed"), false);
  }
  cb(null, true);
};

const uploadMiddleware = multer({ storage, fileFilter });

export default uploadMiddleware;
