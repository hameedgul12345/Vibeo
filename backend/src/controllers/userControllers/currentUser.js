import User from "../../models/userModel.js";

const currentUser = async(req, res) => {
  try {
    const userID = req.userID;
    const user =await  User.findById(userID).select("-password").populate("posts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res
      .status(500)
      .json({
        message: "Server error fetching current user",
        error: error.message,
      });
  }
};

export default currentUser;
