import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import currentUser from "../controllers/userControllers/currentUser.js";
import suggestUsers from "../controllers/userControllers/suggestUsers.js";
import editUser from "../controllers/userControllers/editUser.js";
import getProfile from "../controllers/userControllers/getProfile.js";
import followUser from "../controllers/userControllers/followUser.js";
import getSuggestedUserProfile from "../controllers/userControllers/getSuggestedUserProfile.js";
import upload from "../middlewares/multer.js";
import { recentUsers } from "../controllers/userControllers/getRecentUser.js";
const router = express.Router();


// routes/userRoutes.js
router.get("/currentUser", isAuthenticated, currentUser);

router.get("/suggestUsers", isAuthenticated, suggestUsers);

router.put("/editUser", isAuthenticated,upload.single("profilePicture"), editUser);
// router.get("/profile/:userName",isAuthenticated, getProfile);/ ✅ Get profile by user ID
router.get("/profile/:id", isAuthenticated, getProfile);
router.get("/recentUsers",isAuthenticated,recentUsers);
// Route to get suggested user profile
router.get("/suggestedProfile/:username",isAuthenticated, getSuggestedUserProfile);
router.put("/follow/:userId", isAuthenticated, followUser);


export default router;