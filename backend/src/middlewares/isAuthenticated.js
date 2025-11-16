import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const isAuthenticated = (req, res, next) => {
  // console.log("👉 Cookies received:", req.cookies.token);

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorised,no token" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userID = verifiedToken.userID;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Not authorised,token failed" });
  }
};

export default isAuthenticated;
