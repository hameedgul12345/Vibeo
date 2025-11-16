// src/controllers/authControllers/signout.js
const signout = async (req, res) => {
  try {
    // Clear JWT cookie
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // true in production
    //   sameSite: "strict",
    // });

    // return res.status(200).json({
    //   message: "User signed out successfully.",
    // });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("Signout error:", error);
    return res.status(500).json({
      message: "Server error during signout.",
      error: error.message,
    });
  }
};

export default signout;
