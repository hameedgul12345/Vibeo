import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body; // ✅ match frontend

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required." });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("❌ Reset Password Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during password reset." });
  }
};

export default resetPassword;
