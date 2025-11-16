import User from "../../models/userModel.js";
import sendMail from "../../config/mailer.js";

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 🧩 1️⃣ Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 🧩 2️⃣ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🧩 3️⃣ Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000); // 👉 4 digits only

    // 🧩 4️⃣ Save OTP and expiry
    user.resetOTP = otp.toString();
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // expires in 10 mins
    user.isVerified = false;
    await user.save();

    // 🧩 5️⃣ Send OTP
    const sent = await sendMail(email, otp);

    if (!sent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    // 🧩 6️⃣ Success response
    return res.status(200).json({ message: "4-digit OTP sent to your email" });

  } catch (error) {
    console.error("❌ Send OTP error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default sendOTP;
