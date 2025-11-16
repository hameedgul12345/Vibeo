import Reel from "../../models/reelModel.js";
import uploadOnCloudinary from "../../config/cloudinary.js";

/**
 * @desc Create a new Reel
 * @route POST /api/reel
 * @access Private
 */
const createReel = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    // ✅ Ensure file is a video
    const isVideo = req.file.mimetype.startsWith("video");
    if (!isVideo) {
      return res.status(400).json({ message: "Only video files are allowed for reels" });
    }

    console.log("📤 Uploading reel video to Cloudinary...");

    // ✅ Upload video to Cloudinary (handles large video files automatically)
    const uploadResult = await uploadOnCloudinary(req.file.path, req.file.mimetype);

    if (!uploadResult?.secure_url) {
      return res.status(500).json({ message: "Video upload failed" });
    }

    // ✅ Save reel to DB
    const reel = await Reel.create({
      author: userId,
      video: uploadResult.secure_url,
      caption,
      mediaType: "video",
    });

    // ✅ Populate author info for response
    const populatedReel = await Reel.findById(reel._id).populate(
      "author",
      "name userName profilePicture"
    );

    res.status(201).json({
      message: "🎥 Reel created successfully",
      reel: populatedReel,
    });
  } catch (error) {
    console.error("❌ Error creating reel:", error);
    res.status(500).json({
      message: "Server error while creating reel",
      error: error.message,
    });
  }
};

export default createReel;
