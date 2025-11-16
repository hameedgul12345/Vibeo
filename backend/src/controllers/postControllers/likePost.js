import Post from "../../models/postModel.js";
import {io} from "../../socket/socket.js"
const likePost = async (req, res) => {
  try {
    const userId = req.userID; // from isAuthenticated middleware
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    await post.save();

    io.emit("postLiked",{
      postID:post._id,
      likes:post.likes
    })

    // ✅ Return only updated likes array
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Server error while liking post" });
  }
};

export default likePost;
