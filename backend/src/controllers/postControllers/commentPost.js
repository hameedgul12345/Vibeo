import Post from "../../models/postModel.js";

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.userID;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      author: userId, // ✅ FIXED FIELD NAME
      text: text.trim(),
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("author", "name userName profilePicture")
      .populate("comments.author", "name userName profilePicture"); // ✅ FIXED POPULATE PATH

    res.status(200).json({
      message: "Comment added successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default addComment;
