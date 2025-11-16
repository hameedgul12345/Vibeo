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

const upload = multer({ storage: multer.memoryStorage() });
export default upload;
