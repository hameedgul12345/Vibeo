// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Folder to save files
//   },
//   filename: function (req, file, cb) {
//     // Example: file-1234567890.jpg
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;


import multer from "multer";

// Use memory storage for serverless environments
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;




// import multer from "multer";

// const storage = multer.memoryStorage(); // <— in-memory instead of disk

// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
// });

// export default upload;
