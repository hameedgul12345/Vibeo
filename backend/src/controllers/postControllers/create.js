// import Post from "../../models/postModel.js";
// import uploadOnCloudinary from "../../config/cloudinary.js";
// import User from "../../models/userModel.js";

// const create = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const userId = req.userID;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized: User not logged in" });
//     }

//     let mediaUrl = null;
//     let mediaType = null;

//     if (req.file) {
//   const uploadResult = await uploadOnCloudinary(req.file.path, req.file.mimetype);
//   mediaUrl = uploadResult.secure_url;
// }


//     const post = await Post.create({
//       caption,
//       mediaType,
//       media: mediaUrl,
//       author: userId,
//     });

//     const user = await User.findById(userId);
//     user.posts.push(post._id);
//     await user.save();

//     const populatedPost = await Post.findById(post._id).populate(
//       "author",
//       "name userName profilePicture"
//     );

//     res.status(201).json({
//       message: "Post created successfully",
//       post: populatedPost,
//     });
//   } catch (error) {
//     console.error("Error while creating post:", error);
//     res.status(500).json({
//       message: "Server error while creating post",
//       error: error.message,
//     });
//   }
// };

// export default create;


import Post from "../../models/postModel.js";
import uploadOnCloudinary from "../../config/cloudinary.js";
import User from "../../models/userModel.js";

const create = async (req, res) => {
  try {
    const { caption, mediaType: clientMediaType } = req.body;
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    let mediaUrl = null;
    let mediaType = clientMediaType || null;

    // ✅ Check and upload file
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.buffer, req.file.mimetype);
      mediaUrl = uploadResult.secure_url;
      console.log(mediaUrl)

      // ✅ Auto-detect mediaType from mimetype if not sent by frontend
      if (!mediaType) {
        if (req.file.mimetype.startsWith("video")) {
          mediaType = "video";
        } else if (req.file.mimetype.startsWith("image")) {
          mediaType = "image";
        } else {
          mediaType = "unknown";
        }
      }
    }

    // ✅ Validation before saving
    if (!mediaType) {
      return res.status(400).json({ message: "Media type is required" });
    }

    const post = await Post.create({
      caption,
      mediaType,
      media: mediaUrl,
      author: userId,
    });

    const user = await User.findById(userId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name userName profilePicture"
    );

    res.status(201).json({
      message: "✅ Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("❌ Error while creating post:", error);
    res.status(500).json({
      message: "Server error while creating post",
      error: error.message,
    });
  }
};

export default create;
