import express from "express";
import signup from "../controllers/authControllers/signup.js";
import signin from "../controllers/authControllers/signin.js";
import signout from "../controllers/authControllers/signout.js";
import sendOTP from "../controllers/authControllers/sendOTP.js";
import verifyOTP from "../controllers/authControllers/verifyOTP.js";
import resetPassword from "../controllers/authControllers/resetPassword.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/signin',signin)
router.post('/signout',signout)

// 🔹 Forgot password flow
router.post("/send-otp", sendOTP); // no need for auth — user might have forgotten password
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);


export default router;
