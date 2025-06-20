// const multer = require("multer");
// const path = require("path");

// // Configuration du stockage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now();
//     const originalName = file.originalname.replace(/\s+/g, "_");
//     const extension = path.extname(originalName);
//     const basename = path.basename(originalName, extension);
//     cb(null, `${timestamp}-${basename}${extension}`);
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Vérifie/Crée le dossier uploads
const uploadDir = "src/public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "_");
    const extension = path.extname(originalName);
    const basename = path.basename(originalName, extension);
    cb(null, `${timestamp}-${basename}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accepte seulement certaines extensions
  const allowedTypes = [".jpg", ".jpeg", ".png", ".gif"];
  const extension = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non supporté"), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;