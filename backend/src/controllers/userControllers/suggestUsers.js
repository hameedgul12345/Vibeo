import User from "../../models/userModel.js";

const suggestUsers = async (req, res) => {
  try {
    const userID = req.userID;

    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get current user with following list
    const currentUser = await User.findById(userID).select("following");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Users to exclude: myself + people I already follow
    const excludeUsers = [userID, ...currentUser.following];

    // Find users NOT IN excludeUsers
    const users = await User.find({
      _id: { $nin: excludeUsers },
    }).select("-password -email -bio -createdAt -updatedAt -__v");

    res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error fetching suggested users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default suggestUsers;
