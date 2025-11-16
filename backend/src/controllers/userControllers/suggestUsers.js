import User from "../../models/userModel.js";
const suggestUsers = async (req, res) => {
  try {
    const userID = req.userID; // Extracted from middleware after verifying token

    if (!userID) {
      return res.status(401).json({ message: "Unauthorized. No user ID found." });
    }

    // ✅ Find all users except the logged-in one
    const users = await User.find({ _id: { $ne: userID } })
      .select("-password -email -bio -createdAt -updatedAt -__v");

    res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error fetching suggested users:", error);
    res.status(500).json({ message: "Internal server error while fetching suggested users." });
  }
};

export default suggestUsers;
