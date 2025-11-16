import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";

// GET /api/user/profile/:username
const getSuggestedUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
   const user = await User.findOne({ userName: username })
  .select("-password")
  .populate("posts"); // populate posts

if (!user) return res.status(404).json({ message: "User not found" });

res.status(200).json({ user });

  } catch (err) {
    console.error("Error fetching suggested user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default getSuggestedUserProfile;
