import User from "../../models/userModel.js";

// ✅ Follow or Unfollow user
const followUser = async (req, res) => {
  try {
    const currentUserId = req.userID; // Logged-in user (from middleware)
    const { userId } = req.params; // The user to follow/unfollow

    if (currentUserId === userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = currentUser.following.includes(userId);

    if (alreadyFollowing) {
      // ✅ Unfollow logic
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userId
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );
      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        message: "User unfollowed successfully",
        currentUser,
        targetUser,
      });
    } else {
      // ✅ Follow logic
      currentUser.following.push(userId);
      targetUser.followers.push(currentUserId);
      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        message: "User followed successfully",
        currentUser,
        targetUser,
      });
    }
  } catch (error) {
    console.error("❌ Error in followUser:", error);
    res.status(500).json({
      message: "Server error while following user",
      error: error.message,
    });
  }
};

export default followUser;
