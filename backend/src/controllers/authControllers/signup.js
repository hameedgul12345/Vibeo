import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import generateToken from "../../config/generateToken.js";
const signup = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    // ✅ Validate inputs
    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Generate JWT token
    const token = generateToken(newUser._id);

    // ✅ Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access from JS
      secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
      sameSite: "none", // Required for cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Send response
    // res.status(201).json({
    //   message: "Signup successful!",
    //   user: {
    //     _id: newUser._id,
    //     name: newUser.name,
    //     userName: newUser.userName,
    //     email: newUser.email,
    //     profilePicture: newUser.profilePicture,
    //   },
    // });

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Server error during signup",
      error: error.message,
    });
  }
};

export default signup;
