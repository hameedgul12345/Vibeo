import Post from "../../models/postModel.js";

const getAll = async (req, res) => {
  try {
    // Fetch all posts, newest first
    const posts = await Post.find()
      .populate("author", "name userName profilePicture")
      .sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({
      message: "Server error while fetching posts",
      error: error.message,
    });
  }
};

export default getAll;
