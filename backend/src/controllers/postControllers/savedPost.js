import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";

const savedPost = async (req, res) => {
  try {
    const userId = req.userID; // ✅ from authentication middleware
    const { postId } = req.params; // ✅ post ID from frontend

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if post already saved
    const isSaved = user.saved.includes(postId);

    if (isSaved) {
      // Remove post from saved
      user.saved = user.saved.filter((id) => id.toString() !== postId);
      await user.save();
      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      // Add post to saved
      user.saved.push(postId);
      await user.save();
      return res.status(200).json({ message: "Post saved successfully" });
    }
  } catch (error) {
    console.error("Error while saving post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default savedPost;
