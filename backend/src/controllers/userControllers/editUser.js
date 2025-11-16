// import uploadOnCloudinary from "../../config/cloudinary.js";
// import User from "../../models/userModel.js";

// const editUser = async (req, res) => {
//   try {
//     const { name, userName, bio } = req.body;
//     const userId = req.user.id;

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the new username is already taken by another user
//     const existingUser = await User.findOne({ userName });
//     if (existingUser && existingUser._id.toString() !== userId) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

// let profilePicture;

//      if(req.file){
//         profilePicture= uploadOnCloudinary(req.file.path);
//         user.profilePicture = profilePicture.secure_url;
//      }

//     // Update fields if provided
//     user.name = name || user.name;
//     user.userName = userName || user.userName;
//     user.bio = bio || user.bio;

//     // Save updated user
//     const updatedUser = await user.save();

//     // Respond with updated user
//     res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export default editUser;

import uploadOnCloudinary from "../../config/cloudinary.js";
import User from "../../models/userModel.js";

const editUser = async (req, res) => {
  try {
    const { name, userName, bio } = req.body;
    const userId = req.userID;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new username is already taken by another user
    const existingUser = await User.findOne({ userName });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Username already taken" });
    }

    if (req.file) {
      const profilePicture = await uploadOnCloudinary(req.file.path);
      if (profilePicture && profilePicture.secure_url) {
        user.profilePicture = profilePicture.secure_url;
      }
    }

    // Update fields if provided
    user.name = name || user.name;
    user.userName = userName || user.userName;
    user.bio = bio || user.bio;

    // Save updated user
    const updatedUser = await user.save();

    // Respond with updated user
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default editUser;
