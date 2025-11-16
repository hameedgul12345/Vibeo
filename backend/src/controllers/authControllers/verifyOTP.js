import User from "../../models/userModel.js";

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 🧩 1️⃣ Validate input
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // 🧩 2️⃣ Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🧩 3️⃣ Check if OTP matches
    if (user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🧩 4️⃣ Check expiry
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // 🧩 5️⃣ Mark user as verified
    user.isVerified = true;
    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // 🧩 6️⃣ Response
    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("❌ Verify OTP error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyOTP;
