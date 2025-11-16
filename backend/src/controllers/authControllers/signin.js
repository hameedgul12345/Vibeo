import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import generateToken from "../../config/generateToken.js";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    // ✅ Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Generate JWT token
    const token = generateToken(user._id);

    // ✅ Store token in HTTP-only cookie
    // ✅ Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ must be true when using sameSite: "none" — even on localhost (modern browsers allow this)
      sameSite: "none", // ✅ required if frontend (5173) and backend (5000) have different origins
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Send response
    res.status(200).json({
      message: "Signin successful!",
      user: {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Server error during signin.",
      error: error.message,
    });
  }
};

export default signin;
