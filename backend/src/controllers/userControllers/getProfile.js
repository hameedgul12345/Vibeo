
import User from "../../models/userModel.js";
const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;

    // Find user by username
    const userProfile = await User.findOne({ username: userName }).select("-password");

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user profile
    res.status(200).json({ message: "User profile fetched successfully", user: userProfile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getProfile;
