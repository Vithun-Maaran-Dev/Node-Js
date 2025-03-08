import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure Directory Exists
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          const uploadPath = path.resolve("public", "ResumesCollection");
          if (!fs.existsSync(uploadPath)) {
               fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
     },
     filename: (req, file, cb) => {
          const updatedFileName = Date.now() + "-" + file.originalname;
          cb(null, updatedFileName);
     },
});

// Validate File Type (Only PDFs Allowed)
const fileFilter = (req, file, cb) => {
     if (file.mimetype === "application/pdf") {
          cb(null, true);
     } else {
          cb(new Error("Only PDF files are allowed!"), false);
     }
};

// Initialize Multer
const upload = multer({
     storage: storage,
     fileFilter: fileFilter,
     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB Limit
});

export { upload };