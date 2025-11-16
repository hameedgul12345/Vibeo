// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (filePath) => {
//   if (!filePath) throw new Error("File path is required for upload");

//   try {
//     const fileStats = fs.statSync(filePath);
//     const fileSizeInMB = fileStats.size / (1024 * 1024);

//     let result;

//     // ✅ Use upload_large for files >10MB (like long videos)
//     if (fileSizeInMB > 10) {
//       result = await cloudinary.uploader.upload_large(filePath, {
//         resource_type: "auto",
//         chunk_size: 6 * 1024 * 1024, // upload in 6MB chunks
//       });
//     } else {
//       // ✅ Normal upload for smaller files
//       result = await cloudinary.uploader.upload(filePath, {
//         resource_type: "auto",
//       });
//     }

//     // Delete file from local storage after successful upload
//     fs.unlinkSync(filePath);
//     return result;
//   } catch (error) {
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     console.error("Cloudinary upload error:", error);
//     throw error;
//   }
// };

// export default uploadOnCloudinary;



// //For Disk Storage and Compression
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads image/video to Cloudinary.
 * - Compresses large images using Sharp.
 * - Uses upload_large() for videos > 10MB.
 */
const uploadOnCloudinary = async (filePath, mimetype) => {
  if (!filePath) throw new Error("File path is required for upload");

  try {
    let processedPath = filePath;

    // ✅ 1. If image, compress it before uploading
    if (mimetype && mimetype.startsWith("image/")) {
      const compressedPath = `uploads/compressed-${Date.now()}.jpg`;
      await sharp(filePath)
        .resize({ width: 1080 }) // resize width for web
        .jpeg({ quality: 80 }) // reduce quality to 80%
        .toFile(compressedPath);
      fs.unlinkSync(filePath); // remove original file
      processedPath = compressedPath;
    }

    // ✅ 2. If video, use upload_large for files > 10MB
    let uploadResult;
    const stats = fs.statSync(processedPath);
    const isVideo = mimetype && mimetype.startsWith("video/");
    const fileSizeMB = stats.size / (1024 * 1024);

    if (isVideo && fileSizeMB > 10) {
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          processedPath,
          {
            resource_type: "video",
            chunk_size: 6_000_000, // 6 MB chunks
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
    } else {
      // ✅ Normal upload for images and small videos
      uploadResult = await cloudinary.uploader.upload(processedPath, {
        resource_type: "auto",
      });
    }

    // ✅ Clean up file after upload
    if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);

    return uploadResult;
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;



// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = (fileBuffer, mimetype) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: mimetype.startsWith("video") ? "video" : "image",
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );

//     streamifier.createReadStream(fileBuffer).pipe(uploadStream);
//   });
// };

// export default uploadOnCloudinary;
