import Story from "../../models/storyModel.js";
import uploadOnCloudinary from "../../config/cloudinary.js";

/**
 * @desc Create a new story (replaces old one if exists)
 * @route POST /api/story
 * @access Private
 */
const createStory = async (req, res) => {
  try {
    const userId = req.userID;
    const { caption } = req.body;

    // 🛑 Check authentication
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // 🛑 Check file presence
    if (!req.file) {
      return res.status(400).json({ message: "No media file provided" });
    }

    // ✅ Check if user already has a story
    const existingStory = await Story.findOne({ author: userId });

    if (existingStory) {
      console.log("🗑️ Deleting old story before uploading new one...");
      await Story.findByIdAndDelete(existingStory._id);
    }

    // Determine media type
    const isVideo = req.file.mimetype.startsWith("video");
    const mediaType = isVideo ? "video" : "image";

    console.log(`📤 Uploading ${mediaType} to Cloudinary...`);

    // ✅ Upload to Cloudinary
    const uploadResult = await uploadOnCloudinary(req.file.path, req.file.mimetype);

    if (!uploadResult?.secure_url) {
      return res.status(500).json({ message: "Failed to upload story media" });
    }

    // ✅ Create new story
    const story = await Story.create({
      author: userId,
      media: uploadResult.secure_url,
      mediaType,
      caption,
    });

    // ✅ Populate author details
    const populatedStory = await Story.findById(story._id).populate(
      "author",
      "name userName profilePicture"
    );

    res.status(201).json({
      message: "Story created successfully (old story replaced)",
      story: populatedStory,
    });
  } catch (error) {
    console.error("❌ Error creating story:", error);
    res.status(500).json({
      message: "Server error while creating story",
      error: error.message,
    });
  }
};

export default createStory;
